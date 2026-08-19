import { supabase } from "./supabase";

export const testSupabase = async () => {
  const { data, error } = await supabase.from("products").select("*");

  console.log("PRODUCTS:", data);
  console.log("ERROR:", error);
};
