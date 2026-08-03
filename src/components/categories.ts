import { Circle, Gem, Heart, Link2, Sparkles } from "lucide-react";

export const categories = [
  {
    id: "rings",
    title: "Каблучки",
    icon: Gem,
  },
  {
    id: "earrings",
    title: "Сережки",
    icon: Sparkles,
  },
  {
    id: "chains",
    title: "Ланцюжки",
    icon: Link2,
  },
  {
    id: "bracelets",
    title: "Браслети",
    icon: Circle,
  },
  {
    id: "pendants",
    title: "Підвіски",
    icon: Heart,
  },
] as const;
