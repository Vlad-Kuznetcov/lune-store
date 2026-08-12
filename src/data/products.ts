import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    article: "AR-001",
    name: "Срібна каблучка Aurora",
    category: "rings",
    price: 1490,
    image: "/images/test.jpg",
    available: true,
    sizes: ["48", "50", "52", "54", "56", "58", "60"],

    description:
      "Стильна прикраса, яка стане витонченим акцентом у будь-якому образі. Лаконічний дизайн і благородний блиск срібла роблять її ідеальним вибором як для себе, так і на подарунок.",

    details: [
      {
        label: "Матеріал",
        value: "Срібло S925 ALE",
      },
      {
        label: "Вставка",
        value: "Кубічний цирконій",
      },
      {
        label: "Стиль",
        value: "Pandora",
      },
    ],
  },
  {
    id: 2,
    name: "Сережки Luna",
    article: "ER-002",
    category: "earrings",
    price: 990,
    image: "/images/2.jpg",
    available: true,
    description:
      "Стильна прикраса, яка стане витонченим акцентом у будь-якому образі. Лаконічний дизайн і благородний блиск срібла роблять її ідеальним вибором як для себе, так і на подарунок.",

    details: [
      {
        label: "Матеріал",
        value: "Срібло S925 ALE",
      },
      {
        label: "Вставка",
        value: "Кубічний цирконій",
      },
      {
        label: "Стиль",
        value: "Pandora",
      },
    ],
  },
  {
    id: 3,
    name: "Браслет Stella",
    article: "BR-003",
    category: "bracelets",
    price: 1790,
    image: "/images/3.jpg",
    available: true,
    description:
      "Стильна прикраса, яка стане витонченим акцентом у будь-якому образі. Лаконічний дизайн і благородний блиск срібла роблять її ідеальним вибором як для себе, так і на подарунок.",

    details: [
      {
        label: "Матеріал",
        value: "Срібло S925 ALE",
      },
      {
        label: "Вставка",
        value: "Кубічний цирконій",
      },
      {
        label: "Стиль",
        value: "Pandora",
      },
    ],
  },
  {
    id: 4,
    name: "Ланцюжок Nova",
    article: "CH-004",
    category: "chains",
    price: 1290,
    image: "/images/4.jpg",
    available: true,
    description:
      "Стильна прикраса, яка стане витонченим акцентом у будь-якому образі. Лаконічний дизайн і благородний блиск срібла роблять її ідеальним вибором як для себе, так і на подарунок.",

    details: [
      {
        label: "Матеріал",
        value: "Срібло S925 ALE",
      },
      {
        label: "Вставка",
        value: "Кубічний цирконій",
      },
      {
        label: "Стиль",
        value: "Pandora",
      },
    ],
  },
];
