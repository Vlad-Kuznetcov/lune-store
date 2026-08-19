import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useProducts } from "../../hooks/useProducts";
import Container from "../../components/ui/Container";

export const AdminPage = () => {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Стан форми входу
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Перевіряємо, чи є активна сесія при завантаженні
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

  // Хендлер входу
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

  // Вихід з системи
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading) {
    return <div className="py-20 text-center">Перевірка доступу...</div>;
  }

  // ЯКЩО НЕ АВТОРИЗОВАНИЙ — ПОКАЗУЄМО ФОРМУ ВХОДУ
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

  // ЯКЩО АВТОРИЗОВАНИЙ — ПОКАЗУЄМО АДМІНКУ
  return <AdminContent onLogout={handleLogout} />;
};

// Функція генерації артикулів за вашими правилами
const generateArticle = (category: string) => {
  // Словник префіксів для кожної категорії
  const prefixes: Record<string, string> = {
    rings: "AR",
    earrings: "ER",
    bracelets: "BR",
    chains: "CH",
    pendants: "PE",
  };

  // Беремо потрібний префікс або за замовчуванням 'LU' (Lune)
  const prefix = prefixes[category] || "LU";

  // Генеруємо випадкове 4-значне число від 1000 до 9999
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${prefix}-${randomNumber}`;
};

// Окремий компонент адмінки з формою товару
const AdminContent = ({ onLogout }: { onLogout: () => void }) => {
  const { products, loading } = useProducts();

  const [name, setName] = useState("");
  const [article, setArticle] = useState("");
  const [category, setCategory] = useState("rings");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("");
  const [material, setMaterial] = useState("Срібло S925 ALE");
  const [gem, setGem] = useState("Кубічний цирконій");
  const [style, setStyle] = useState("Pandora");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `items/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, file);

    if (uploadError) return null;

    const { data } = supabase.storage.from("products").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !price) return alert("Заповніть ціну та виберіть фото");

    setSubmitting(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      if (!imageUrl) throw new Error("Помилка завантаження фото");

      // Якщо артикул не вказано вручну — генеруємо автоматично
      const finalArticle = article.trim() || generateArticle(category);

      const parsedSizes = sizes ? sizes.split(",").map((s) => s.trim()) : [];
      const details = [
        { label: "Матеріал", value: material },
        { label: "Вставка", value: gem },
        { label: "Стиль", value: style },
      ];

      const { error } = await supabase.from("products").insert([
        {
          name,
          article: finalArticle,
          category,
          price: Number(price),
          image: imageUrl,
          available: true,
          sizes: parsedSizes,
          description,
          details,
        },
      ]);

      if (error) throw error;

      alert("Товар успішно додано!");
      window.location.reload();
    } catch (err: any) {
      alert(`Помилка: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити товар?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) window.location.reload();
  };

  return (
    <section className="min-h-screen bg-zinc-50 py-12">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900">Адмін-панель</h1>
          <button
            onClick={onLogout}
            className="rounded bg-zinc-200 px-4 py-2 text-sm font-medium transition hover:bg-zinc-300"
          >
            Вийти
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Форма */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2"
          >
            <h2 className="mb-4 text-xl font-semibold">Новий товар</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Назва</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Артикул{" "}
                  <span className="text-xs text-zinc-400">
                    (авто, якщо порожньо)
                  </span>
                </label>
                <input
                  type="text"
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                  placeholder="Автоматично"
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Категорія
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded border bg-white p-2"
                >
                  <option value="rings">Каблучки (rings)</option>
                  <option value="earrings">Сережки (earrings)</option>
                  <option value="bracelets">Браслети (bracelets)</option>
                  <option value="chains">Ланцюжки (chains)</option>
                  <option value="pendants">Підвіски (pendants)</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Ціна (грн)
                </label>
                <input
                  required
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Розміри (через кому)
              </label>
              <input
                type="text"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="w-full rounded border p-2"
                placeholder="48, 50, 52"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Опис</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-24 w-full rounded border p-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 border-t pt-2">
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Матеріал
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full rounded border p-1 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">
                  Вставка
                </label>
                <input
                  type="text"
                  value={gem}
                  onChange={(e) => setGem(e.target.value)}
                  className="w-full rounded border p-1 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Стиль</label>
                <input
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded border p-1 text-sm"
                />
              </div>
            </div>

            <div className="border-t pt-2">
              <label className="mb-1 block text-sm font-medium">
                Зображення товару
              </label>
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-zinc-800 disabled:bg-zinc-400"
            >
              {submitting ? "Збереження..." : "Додати товар"}
            </button>
          </form>

          {/* Список */}
          <div className="h-fit rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
              Товари ({products.length})
            </h2>
            {loading && <p>Завантаження...</p>}
            <div className="max-h-[600px] space-y-4 overflow-y-auto">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-zinc-500">{item.price} грн</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Видалити
                  </button>
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
