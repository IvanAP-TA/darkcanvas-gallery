import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  fetchGalleryPhotosDB,
  createGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
  uploadImage,
  type GalleryPhotoDB,
} from "@/lib/supabase";
import { Trash2, Pencil, Plus, Upload } from "lucide-react";

type Form = {
  id: string | null;
  image_url: string;
  title: string;
  description: string;
  sort_order: number;
};
const empty = (): Form => ({
  id: null,
  image_url: "",
  title: "",
  description: "",
  sort_order: 0,
});

export default function GalleryTab() {
  const [items, setItems] = useState<GalleryPhotoDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(empty());
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchGalleryPhotosDB();
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
    const maxSort = items.reduce((m, p) => Math.max(m, p.sort_order ?? 0), 0);
    setForm({ ...empty(), sort_order: maxSort + 10 });
    setOpen(true);
  };

  const openEdit = (p: GalleryPhotoDB) => {
    setForm({
      id: p.id,
      image_url: p.image_url,
      title: p.title,
      description: p.description,
      sort_order: p.sort_order,
    });
    setOpen(true);
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadImage(file, "gallery");
      setForm((f) => ({ ...f, image_url: url }));
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.image_url) {
      toast({ title: "Validation", description: "Image is required", variant: "destructive" });
      return;
    }
    const payload = {
      image_url: form.image_url,
      title: form.title.trim(),
      description: form.description.trim(),
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      if (form.id) {
        await updateGalleryPhoto(form.id, payload as any);
      } else {
        await createGalleryPhoto(payload as any);
      }
      toast({ title: "Saved" });
      setOpen(false);
      await load();
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (p: GalleryPhotoDB) => {
    if (!window.confirm("Delete this photo?")) return;
    try {
      await deleteGalleryPhoto(p.id);
      toast({ title: "Deleted" });
      await load();
    } catch (err: any) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{items.length} photos</h2>
        <Button size="sm" onClick={openCreate}>
          <Plus className="w-4 h-4 mr-1" /> Add photo
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((p) => (
          <div key={p.id} className="rounded border bg-card overflow-hidden">
            <img
              src={p.image_url}
              alt={p.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <div className="p-2">
              <div className="text-sm font-medium truncate">{p.title || "Untitled"}</div>
              <div className="flex justify-end gap-1 mt-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(p)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit photo" : "New photo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Image *</Label>
              <div className="flex items-center gap-3 mt-1">
                {form.image_url && (
                  <img
                    src={form.image_url}
                    alt=""
                    className="w-20 h-20 object-cover rounded border"
                  />
                )}
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-muted">
                  <Upload className="w-4 h-4" />
                  {uploading ? "Uploading…" : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUpload(f);
                    }}
                  />
                </label>
              </div>
            </div>
            <div>
              <Label className="text-xs">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs">Sort order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{form.id ? "Save" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
