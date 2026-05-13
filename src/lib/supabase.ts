import { createClient } from "@supabase/supabase-js";
import type { AboutContent, SiteSettings } from "@/types/artwork";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Supabase client. `null` if env vars are missing — every helper below
 * checks `requireClient()` before issuing a request, so the app degrades
 * gracefully to its static fallback data instead of crashing.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null;

export const isSupabaseConfigured = () => !!supabase;

function requireClient() {
  if (!supabase) throw new Error("Supabase not configured");
  return supabase;
}

// ---------------------------------------------------------------------
// DB row shapes (snake_case, mirror Postgres exactly)
// ---------------------------------------------------------------------
export interface ArtworkDB {
  id: string;
  slug: string | null;
  title: string;
  year: number;
  technique: string;
  theme: string;
  dimensions: string;
  description: string;
  image_url: string;
  detail_images: string[];
  saatchi_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryPhotoDB {
  id: string;
  image_url: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// AUTH (Supabase email/password)
// =====================================================================
export async function signIn(email: string, password: string) {
  const client = requireClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const client = requireClient();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function getCurrentSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// =====================================================================
// ARTWORKS
// =====================================================================
export async function fetchArtworksDB(): Promise<ArtworkDB[]> {
  const client = requireClient();
  const { data, error } = await client
    .from("artworks")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as ArtworkDB[];
}

export async function createArtwork(
  artwork: Omit<ArtworkDB, "id" | "created_at" | "updated_at">
) {
  const client = requireClient();
  const { data, error } = await client.from("artworks").insert([artwork]).select();
  if (error) throw error;
  return data[0] as ArtworkDB;
}

export async function updateArtwork(id: string, artwork: Partial<ArtworkDB>) {
  const client = requireClient();
  const { data, error } = await client
    .from("artworks")
    .update(artwork)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0] as ArtworkDB;
}

export async function deleteArtwork(id: string) {
  const client = requireClient();
  const { error } = await client.from("artworks").delete().eq("id", id);
  if (error) throw error;
}

// =====================================================================
// GALLERY
// =====================================================================
export async function fetchGalleryPhotosDB(): Promise<GalleryPhotoDB[]> {
  const client = requireClient();
  const { data, error } = await client
    .from("gallery_photos")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as GalleryPhotoDB[];
}

export async function createGalleryPhoto(
  photo: Omit<GalleryPhotoDB, "id" | "created_at" | "updated_at">
) {
  const client = requireClient();
  const { data, error } = await client.from("gallery_photos").insert([photo]).select();
  if (error) throw error;
  return data[0] as GalleryPhotoDB;
}

export async function updateGalleryPhoto(id: string, photo: Partial<GalleryPhotoDB>) {
  const client = requireClient();
  const { data, error } = await client
    .from("gallery_photos")
    .update(photo)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0] as GalleryPhotoDB;
}

export async function deleteGalleryPhoto(id: string) {
  const client = requireClient();
  const { error } = await client.from("gallery_photos").delete().eq("id", id);
  if (error) throw error;
}

// =====================================================================
// ABOUT (singleton)
// =====================================================================
export async function fetchAboutContent(): Promise<AboutContent | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("about_content")
    .select("content")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return (data?.content ?? null) as AboutContent | null;
}

export async function updateAboutContent(content: AboutContent) {
  const client = requireClient();
  const { error } = await client
    .from("about_content")
    .update({ content })
    .eq("id", 1);
  if (error) throw error;
}

// =====================================================================
// SITE SETTINGS (singleton)
// =====================================================================
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_settings")
    .select("settings")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return (data?.settings ?? null) as SiteSettings | null;
}

export async function updateSiteSettings(settings: SiteSettings) {
  const client = requireClient();
  const { error } = await client
    .from("site_settings")
    .update({ settings })
    .eq("id", 1);
  if (error) throw error;
}

// =====================================================================
// IMAGE UPLOAD
// =====================================================================
export async function uploadImage(file: File, folder = "paintings") {
  const client = requireClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await client.storage
    .from("artwork-images")
    .upload(filePath, file, { cacheControl: "31536000", upsert: false });
  if (error) throw error;

  const { data } = client.storage.from("artwork-images").getPublicUrl(filePath);
  return data.publicUrl;
}

// Backward-compatible alias used by older code paths
export const uploadArtworkImage = (file: File) => uploadImage(file, "paintings");

