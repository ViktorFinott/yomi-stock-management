import { supabase } from "./supabase"

export async function getInventory() {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("name")

  if (error) {
    console.error(error)
    return []
  }

  return data
}
