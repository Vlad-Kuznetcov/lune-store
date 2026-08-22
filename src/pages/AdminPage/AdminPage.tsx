import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/product";
import type { ProductCategory } from "../../types/category";
import Container from "../../components/ui/Container";

type FormState = {
  name: string;
  article: string;
  category: ProductCategory;
  price: number | "";
  description: string;
  sizes: string;
  material: string;
  gem: string;
  style: string;
  available: boolean;
  isNew: boolean;
  isPopular: boolean;
};

const emptyForm: FormState = {
  name: "",
  article: "",
  category: "rings",
  price: "",
  description: "",
  sizes: "",
  material: "Срібло S925 ALE",
  gem: "Кубічний цирконій",
  style: "Pandora",
  available: true,
  isNew: false,
  isPopular: false,
};

const generateArticle = (category: string) => {
  const prefixes: Record<string, string> = {
    rings: "AR",
    earrings: "ER",
    bracelets: "BR",
    chains: "CH",
    pendants: "PE",
  };

  const prefix = prefixes[category] || "LU";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${prefix}-${randomNumber}`;
};

const getDetailsValue = (product: Product, label: string, fallback = "") => {
  return (
    product.details?.find((detail) => detail.label === label)?.value ?? fallback
  );
};

const AdminPage = () => {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("Невірний email або пароль");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading) {
    return <div className="py-20 text-center">Перевірка доступу...</div>;
  }

  if (!session) {
    return (
      <section className="flex min-h-[70vh] items-center bg-zinc-50 py-20">
        <Container>
          <div className="mx-auto max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-center text-2xl font-bold">
              Вхід в Адмін-панель
            </h1>

            {loginError && (
              <p className="mb-4 rounded bg-red-50 p-3 text-center text-sm text-red-600">
                {loginError}
              </p>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>

                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border p-2.5 focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Пароль</label>

                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border p-2.5 focus:border-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-zinc-800"
              >
                Увійти
              </button>
            </form>
          </div>
        </Container>
      </section>
    );
  }

  return <AdminContent onLogout={handleLogout} />;
};

const AdminContent = ({ onLogout }: { onLogout: () => void }) => {
  const { products, loading, error, refetch } = useProducts();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isEditing = Boolean(editingProduct);

  const updateForm = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingProduct(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const filePath = `items/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      return null;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(filePath);

    return data.publicUrl;
  };

  const deleteImageFromStorage = async (imageUrl: string) => {
    try {
      const marker = "/storage/v1/object/public/products/";

      const index = imageUrl.indexOf(marker);

      if (index === -1) return;

      const filePath = imageUrl.slice(index + marker.length);

      await supabase.storage.from("products").remove([filePath]);
    } catch (error) {
      console.error("Не вдалося видалити старе фото:", error);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      article: product.article,
      category: product.category,
      price: product.price,
      description: product.description || "",
      sizes: product.sizes?.join(", ") || "",
      material: getDetailsValue(product, "Матеріал", "Срібло S925 ALE"),
      gem: getDetailsValue(product, "Вставка", "Кубічний цирконій"),
      style: getDetailsValue(product, "Стиль", "Pandora"),
      available: product.available,
      isNew: product.isNew ?? false,
      isPopular: product.isPopular ?? false,
    });

    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Вкажіть назву товару");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("Вкажіть коректну ціну");
      return;
    }

    if (!isEditing && !imageFile) {
      alert("Виберіть фото товару");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = editingProduct?.image || "";

      // Завантажуємо нове фото, якщо воно вибране
      if (imageFile) {
        const uploadedImage = await uploadImage(imageFile);

        if (!uploadedImage) {
          throw new Error("Не вдалося завантажити зображення");
        }

        imageUrl = uploadedImage;
      }

      const finalArticle =
        form.article.trim() || generateArticle(form.category);

      const parsedSizes = form.sizes
        ? form.sizes
            .split(",")
            .map((size) => size.trim())
            .filter(Boolean)
        : [];

      const details = [
        {
          label: "Матеріал",
          value: form.material.trim(),
        },
        {
          label: "Вставка",
          value: form.gem.trim(),
        },
        {
          label: "Стиль",
          value: form.style.trim(),
        },
      ];

      const productData = {
        name: form.name.trim(),
        article: finalArticle,
        category: form.category,
        price: Number(form.price),
        image: imageUrl,
        available: form.available,
        sizes: parsedSizes,
        description: form.description.trim(),
        details,
        is_new: form.isNew,
        is_popular: form.isPopular,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) {
          throw error;
        }

        // Якщо поставили нове фото — старе можно видалити
        if (
          imageFile &&
          editingProduct.image &&
          editingProduct.image !== imageUrl
        ) {
          await deleteImageFromStorage(editingProduct.image);
        }

        alert("Товар успішно оновлено!");
      } else {
        const { error } = await supabase.from("products").insert(productData);

        if (error) {
          throw error;
        }

        alert("Товар успішно додано!");
      }

      resetForm();
      await refetch();
    } catch (err: any) {
      console.error(err);

      alert(`Помилка: ${err.message || "Невідома помилка"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (
      !confirm(
        `Видалити товар "${product.name}"?\n\nЦю дію неможливо скасувати.`,
      )
    ) {
      return;
    }

    setDeletingId(product.id);

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        throw error;
      }

      if (product.image) {
        await deleteImageFromStorage(product.image);
      }

      if (editingProduct?.id === product.id) {
        resetForm();
      }

      await refetch();
    } catch (err: any) {
      console.error(err);

      alert(`Не вдалося видалити товар: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleAvailable = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({
        available: !product.available,
      })
      .eq("id", product.id);

    if (error) {
      alert(`Помилка: ${error.message}`);
      return;
    }

    await refetch();
  };

  const toggleNew = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({
        is_new: !(product.isNew ?? false),
      })
      .eq("id", product.id);

    if (error) {
      alert(`Помилка: ${error.message}`);
      return;
    }

    await refetch();
  };

  const togglePopular = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({
        is_popular: !(product.isPopular ?? false),
      })
      .eq("id", product.id);

    if (error) {
      alert(`Помилка: ${error.message}`);
      return;
    }

    await refetch();
  };

  return (
    <section className="min-h-screen bg-zinc-50 py-12">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.25em] text-zinc-400 uppercase">
              LUNÉ
            </p>

            <h1 className="mt-1 text-3xl font-semibold text-zinc-900">
              Адмін-панель
            </h1>
          </div>

          <button
            onClick={onLogout}
            className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium transition hover:bg-zinc-300"
          >
            Вийти
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm xl:col-span-2"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {isEditing ? "Редагування товару" : "Новий товар"}
                </h2>

                {isEditing && editingProduct && (
                  <p className="mt-1 text-sm text-zinc-500">
                    ID: {editingProduct.id}
                  </p>
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium transition hover:bg-zinc-200"
                >
                  Скасувати
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* NAME */}
              <div>
                <label className="mb-1 block text-sm font-medium">Назва</label>

                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 p-2.5 outline-none focus:border-zinc-900"
                />
              </div>

              {/* ARTICLE */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Артикул
                </label>

                <input
                  type="text"
                  value={form.article}
                  onChange={(e) => updateForm("article", e.target.value)}
                  placeholder="Автоматично"
                  className="w-full rounded-lg border border-zinc-200 p-2.5 outline-none focus:border-zinc-900"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Категорія
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    updateForm("category", e.target.value as ProductCategory)
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white p-2.5 outline-none focus:border-zinc-900"
                >
                  <option value="rings">Каблучки</option>
                  <option value="earrings">Сережки</option>
                  <option value="bracelets">Браслети</option>
                  <option value="chains">Ланцюжки</option>
                  <option value="pendants">Підвіски</option>
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Ціна, грн
                </label>

                <input
                  required
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) =>
                    updateForm(
                      "price",
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full rounded-lg border border-zinc-200 p-2.5 outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            {/* SIZES */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">Розміри</label>

              <input
                type="text"
                value={form.sizes}
                onChange={(e) => updateForm("sizes", e.target.value)}
                placeholder="48, 50, 52, 54, 56"
                className="w-full rounded-lg border border-zinc-200 p-2.5 outline-none focus:border-zinc-900"
              />

              <p className="mt-1 text-xs text-zinc-400">
                Якщо розмірів немає — залиште поле порожнім.
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">Опис</label>

              <textarea
                required
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                className="h-32 w-full resize-none rounded-lg border border-zinc-200 p-2.5 outline-none focus:border-zinc-900"
              />
            </div>

            {/* DETAILS */}
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <h3 className="mb-4 font-medium">Характеристики</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">
                    Матеріал
                  </label>

                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => updateForm("material", e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 p-2 outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">
                    Вставка
                  </label>

                  <input
                    type="text"
                    value={form.gem}
                    onChange={(e) => updateForm("gem", e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 p-2 outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500">
                    Стиль
                  </label>

                  <input
                    type="text"
                    value={form.style}
                    onChange={(e) => updateForm("style", e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 p-2 outline-none focus:border-zinc-900"
                  />
                </div>
              </div>
            </div>

            {/* SWITCHES */}
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <h3 className="mb-4 font-medium">Налаштування</h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-3">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) => updateForm("available", e.target.checked)}
                    className="h-4 w-4"
                  />

                  <span className="text-sm">🟢 В наявності</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-3">
                  <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => updateForm("isNew", e.target.checked)}
                    className="h-4 w-4"
                  />

                  <span className="text-sm">✨ Новинка</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-3">
                  <input
                    type="checkbox"
                    checked={form.isPopular}
                    onChange={(e) => updateForm("isPopular", e.target.checked)}
                    className="h-4 w-4"
                  />

                  <span className="text-sm">⭐ Популярний</span>
                </label>
              </div>
            </div>

            {/* IMAGE */}
            <div className="mt-6 border-t border-zinc-100 pt-6">
              <label className="mb-2 block text-sm font-medium">
                Зображення товару
              </label>

              {isEditing && editingProduct?.image && !imageFile && (
                <div className="mb-4 flex items-center gap-4 rounded-xl bg-zinc-50 p-3">
                  <img
                    src={editingProduct.image}
                    alt={editingProduct.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium">Поточне фото</p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Виберіть нове, якщо потрібно його замінити.
                    </p>
                  </div>
                </div>
              )}

              <input
                required={!isEditing}
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-xl bg-zinc-900 py-3.5 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {submitting
                ? "Збереження..."
                : isEditing
                  ? "Зберегти зміни"
                  : "Додати товар"}
            </button>
          </form>

          {/* PRODUCTS */}
          <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Товари</h2>

              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
                {products.length}
              </span>
            </div>

            {loading && (
              <p className="py-8 text-center text-sm text-zinc-500">
                Завантаження...
              </p>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && products.length === 0 && (
              <p className="py-8 text-center text-sm text-zinc-500">
                Товарів поки немає
              </p>
            )}

            <div className="max-h-[700px] space-y-3 overflow-y-auto pr-1">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`rounded-xl border p-3 transition ${
                    editingProduct?.id === product.id
                      ? "border-zinc-900 bg-zinc-50"
                      : "border-zinc-200"
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {product.name}
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-500">
                        {product.article}
                      </p>

                      <p className="mt-1 font-semibold">
                        {product.price.toLocaleString("uk-UA")} ₴
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleAvailable(product)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                        product.available
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.available ? "🟢 В наявності" : "🔴 Немає"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleNew(product)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                        product.isNew
                          ? "bg-purple-100 text-purple-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      ✨ Новинка
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePopular(product)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                        product.isPopular
                          ? "bg-amber-100 text-amber-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      ⭐ Популярний
                    </button>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(product)}
                      className="flex-1 rounded-lg bg-zinc-100 py-2 text-xs font-medium transition hover:bg-zinc-200"
                    >
                      ✏️ Редагувати
                    </button>

                    <button
                      type="button"
                      disabled={deletingId === product.id}
                      onClick={() => handleDelete(product)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      {deletingId === product.id ? "..." : "🗑️"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdminPage;
