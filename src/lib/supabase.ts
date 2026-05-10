import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
// If not, create a dummy client that will fail gracefully
export const supabase = 
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Types per le operazioni
export interface ArtworkDB {
  id: string;
  title: string;
  year: number;
  technique: string;
  theme: string;
  dimensions: string;
  description: string;
  image_url: string;
  saatchi_url: string;
  created_at: string;
  updated_at: string;
}

// Funzioni per gestire i quadri
export async function fetchArtworks() {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createArtwork(artwork: Omit<ArtworkDB, "id" | "created_at" | "updated_at">) {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  const { data, error } = await supabase
    .from("artworks")
    .insert([artwork])
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateArtwork(id: string, artwork: Partial<ArtworkDB>) {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  const { data, error } = await supabase
    .from("artworks")
    .update(artwork)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteArtwork(id: string) {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  const { error } = await supabase
    .from("artworks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Upload immagini
export async function uploadArtworkImage(file: File) {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }
  
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `paintings/${fileName}`;

  const { error } = await supabase.storage
    .from("artwork-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("artwork-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
