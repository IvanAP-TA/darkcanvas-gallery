import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  fetchSiteSettings,
  updateSiteSettings,
  uploadImage,
} from "@/lib/supabase";
import type { SiteSettings } from "@/types/artwork";
import { Upload } from "lucide-react";

const LANGS: { code: "en" | "it" | "es" | "zh"; label: string }[] = [
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
];

export default function SettingsTab() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const s = await fetchSiteSettings();
        setSettings(s ?? {});
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleHeroUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadImage(file, "hero");
      setSettings((s) => ({ ...s, hero_image_url: url }));
      toast({
        title: "Uploaded",
        description: "Remember to also set the thumbnail or srcset.",
      });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSiteSettings(settings);
      toast({ title: "Saved", description: "Site settings updated" });
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const setIntro = (lang: "en" | "it" | "es" | "zh", value: string) =>
    setSettings((s) => ({
      ...s,
      home_intro: { ...(s.home_intro ?? {}), [lang]: value },
    }));

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <section className="space-y-3">
        <h3 className="font-medium">Home — Hero image</h3>
        <p className="text-xs text-muted-foreground">
          Used on the landing page. For best performance, also set a smaller
          thumbnail and a responsive srcset (the page preloads both).
        </p>

        <div className="flex items-center gap-3">
          {settings.hero_image_url && (
            <img
              src={settings.hero_image_url}
              alt=""
              className="w-24 h-16 object-cover rounded border"
            />
          )}
          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-muted">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading…" : "Upload hero"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleHeroUpload(f);
              }}
            />
          </label>
        </div>

        <div>
          <Label className="text-xs">Hero image URL (large, 1600w)</Label>
          <Input
            value={settings.hero_image_url ?? ""}
            onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-xs">Hero thumbnail URL (mobile, 600w)</Label>
          <Input
            value={settings.hero_image_thumb_url ?? ""}
            onChange={(e) =>
              setSettings({ ...settings, hero_image_thumb_url: e.target.value })
            }
          />
        </div>
        <div>
          <Label className="text-xs">Hero srcset</Label>
          <Input
            placeholder="/paintings/9-thumb.webp 600w, /paintings/9-1600.webp 1600w"
            value={settings.hero_srcset ?? ""}
            onChange={(e) => setSettings({ ...settings, hero_srcset: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-xs">Hero sizes</Label>
          <Input
            placeholder="(max-width: 768px) 100vw, 1600px"
            value={settings.hero_sizes ?? ""}
            onChange={(e) => setSettings({ ...settings, hero_sizes: e.target.value })}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-medium">Home — Intro text (optional override)</h3>
        <p className="text-xs text-muted-foreground">
          Leave empty to use the default translation. Provide one entry per language.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LANGS.map((lang) => (
            <div key={lang.code}>
              <Label className="text-xs">{lang.label}</Label>
              <Textarea
                rows={3}
                value={settings.home_intro?.[lang.code] ?? ""}
                onChange={(e) => setIntro(lang.code, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
