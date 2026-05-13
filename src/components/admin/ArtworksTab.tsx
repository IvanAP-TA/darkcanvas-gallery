import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  fetchArtworksDB,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  uploadImage,
  type ArtworkDB,
} from "@/lib/supabase";
import { invalidateArtworksCache } from "@/data/artworks";
import { Trash2, Pencil, Plus, X, Upload } from "lucide-react";

type Lang = "en" | "it" | "es" | "zh";
const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
];

type FormState = {
  id: string | null;
  slug: string;
  title: string;
  year: number;
  technique: string;
  theme: string;
  dimensions: string;
  descriptions: Record<Lang, string>;
  image_url: string;
  detail_images: string[];
  saatchi_url: string;
  featured: boolean;
  sort_order: number;
};

const emptyDescriptions = (): Record<Lang, string> => ({
  en: "", it: "", es: "", zh: "",
});

const emptyForm = (): FormState => ({
  id: null,
  slug: "",
  title: "",
  year: new Date().getFullYear(),
  technique: "Oil on Canvas",
  theme: "",
  dimensions: "",
  descriptions: emptyDescriptions(),
  image_url: "",
  detail_images: [],
  saatchi_url: "",
  featured: false,
  sort_order: 0,
});

export default function ArtworksTab() {
  const [items, setItems] = useState<ArtworkDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [uploading, setUploading] = useState<"main" | "detail" | null>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchArtworksDB();
      setItems(data);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    const maxSort = items.reduce((m, a) => Math.max(m, a.sort_order ?? 0), 0);
    setForm({ ...emptyForm(), sort_order: maxSort + 10 });
    setDialogOpen(true);
  };

  const openEdit = (a: ArtworkDB) => {
    setForm({
      id: a.id,
      slug: a.slug ?? "",
      title: a.title,
      year: a.year,
      technique: a.technique,
      theme: a.theme,
      dimensions: a.dimensions,
      descriptions: {
        en: ((a as any).descriptions?.en) || a.description || "",
        it: ((a as any).descriptions?.it) || "",
        es: ((a as any).descriptions?.es) || "",
        zh: ((a as any).descriptions?.zh) || "",
      },
      image_url: a.image_url,
      detail_images: Array.isArray(a.detail_images) ? a.detail_images : [],
      saatchi_url: a.saatchi_url ?? "",
      featured: !!a.featured,
      sort_order: a.sort_order ?? 0,
    });
    setDialogOpen(true);
  };

  const handleMainUpload = async (file: File) => {
    try {
      setUploading("main");
      const url = await uploadImage(file, "paintings");
      setForm((f) => ({ ...f, image_url: url }));
      toast({ title: "Uploaded", description: "Main image uploaded" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const handleDetailUpload = async (files: FileList) => {
    try {
      setUploading("detail");
      const urls: string[] = [];
      for (const f of Array.from(files)) {
        urls.push(await uploadImage(f, "paintings/detail"));
      }
      setForm((f) => ({ ...f, detail_images: [...f.detail_images, ...urls] }));
      toast({ title: "Uploaded", description: `${urls.length} detail image(s) added` });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const removeDetailImage = (idx: number) =>
    setForm((f) => ({
      ...f,
      detail_images: f.detail_images.filter((_, i) => i !== idx),
    }));

  const handleSave = async () => {
    if (!form.title || !form.image_url) {
      toast({
        title: "Validation",
        description: "Title and main image are required",
        variant: "destructive",
      });
      return;
    }
    const payload = {
      slug: form.slug.trim() || null,
      title: form.title.trim(),
      year: Number(form.year),
      technique: form.technique.trim(),
      theme: form.theme.trim(),
      dimensions: form.dimensions.trim(),
      // Keep both: jsonb for multilang + legacy single string (= EN fallback)
      descriptions: form.descriptions,
      description: form.descriptions.en.trim(),
      image_url: form.image_url.trim(),
      detail_images: form.detail_images,
      saatchi_url: form.saatchi_url.trim() || null,
      featured: form.featured,
      sort_order: Number(form.sort_order) || 0,
    };

    try {
      if (form.id) {
        await updateArtwork(form.id, payload as any);
        toast({ title: "Saved", description: "Artwork updated" });
      } else {
        await createArtwork(payload as any);
        toast({ title: "Created", description: "Artwork added" });
      }
      invalidateArtworksCache();
      setDialogOpen(false);
      await load();
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (a: ArtworkDB) => {
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    try {
      await deleteArtwork(a.id);
      invalidateArtworksCache();
      toast({ title: "Deleted", description: a.title });
      await load();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="p-6 text-center">Loading artworks…</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-medium">{items.length} artworks</h2>
        <Button onClick={openCreate} size="sm">
          <Plus className="w-4 h-4 mr-1" /> New artwork
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-3 rounded border p-2 bg-card"
          >
            <img
              src={a.image_url}
              alt={a.title}
              className="w-16 h-16 object-cover rounded flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{a.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                {a.year} · {a.technique}
                {a.featured && " · ⭐"}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button size="icon" variant="ghost" onClick={() => openEdit(a)} aria-label="Edit">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(a)}
                aria-label="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit artwork" : "New artwork"}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Title *">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>
            <Field label="Slug (URL, optional)">
              <Input
                value={form.slug}
                placeholder="auto from title if empty"
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </Field>
            <Field label="Year">
              <Input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 0 })}
              />
            </Field>
            <Field label="Sort order (lower = first)">
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                }
              />
            </Field>
            <Field label="Technique">
              <Input
                value={form.technique}
                onChange={(e) => setForm({ ...form, technique: e.target.value })}
              />
            </Field>
            <Field label="Theme">
              <Input
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value })}
              />
            </Field>
            <Field label="Dimensions" className="sm:col-span-2">
              <Input
                value={form.dimensions}
                placeholder="e.g. 80 x 60 cm"
                onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
              />
            </Field>
            <Field label="Saatchi Art URL" className="sm:col-span-2">
              <Input
                value={form.saatchi_url}
                placeholder="https://..."
                onChange={(e) => setForm({ ...form, saatchi_url: e.target.value })}
              />
            </Field>
            <Field label="Description (per language)" className="sm:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {LANGS.map((lang) => (
                  <div key={lang.code} className="space-y-1 border-l-2 pl-3 border-muted">
                    <div className="text-xs font-medium opacity-70">{lang.label}</div>
                    <Textarea
                      rows={5}
                      value={form.descriptions[lang.code]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          descriptions: {
                            ...form.descriptions,
                            [lang.code]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                English is used as fallback when other languages are empty.
              </p>
            </Field>

            <Field label="Main image *" className="sm:col-span-2">
              <div className="flex items-center gap-3">
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt=""
                    className="w-20 h-20 object-cover rounded border"
                  />
                )}
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-muted">
                  <Upload className="w-4 h-4" />
                  {uploading === "main" ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleMainUpload(f);
                    }}
                  />
                </label>
                <Input
                  value={form.image_url}
                  placeholder="or paste URL"
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                />
              </div>
            </Field>

            <Field label="Detail images (gallery)" className="sm:col-span-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {form.detail_images.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={url}
                      alt=""
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeDetailImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      aria-label="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="cursor-pointer w-20 h-20 border-2 border-dashed rounded flex items-center justify-center hover:bg-muted">
                  <Plus className="w-6 h-6" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const fs = e.target.files;
                      if (fs && fs.length) handleDetailUpload(fs);
                    }}
                  />
                </label>
              </div>
              {uploading === "detail" && (
                <p className="text-xs text-muted-foreground">Uploading…</p>
              )}
            </Field>

            <Field label="" className="sm:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={form.featured}
                  onCheckedChange={(c) => setForm({ ...form, featured: c === true })}
                />
                <span>Featured on home page</span>
              </label>
            </Field>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{form.id ? "Save changes" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      {label && <Label className="mb-1 block text-xs">{label}</Label>}
      {children}
    </div>
  );
}

// Trigger reference (kept to silence unused warnings for DialogTrigger if needed)
export const _trigger = DialogTrigger;
