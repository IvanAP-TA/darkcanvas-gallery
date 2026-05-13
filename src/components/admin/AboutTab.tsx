import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAboutContent,
  updateAboutContent,
  uploadImage,
} from "@/lib/supabase";
import type { AboutContent, AboutSection } from "@/types/artwork";
import { Trash2, Plus, Upload } from "lucide-react";

const LANGS: { code: "en" | "it" | "es" | "zh"; label: string }[] = [
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
];

const blankTextSection = (): AboutSection => ({
  key: `section-${Date.now()}`,
  kind: "text",
  title_en: "", title_it: "", title_es: "", title_zh: "",
  body_en: "", body_it: "", body_es: "", body_zh: "",
});

const blankListSection = (): AboutSection => ({
  key: `section-${Date.now()}`,
  kind: "list",
  title_en: "", title_it: "", title_es: "", title_zh: "",
  items: [],
});

export default function AboutTab() {
  const [content, setContent] = useState<AboutContent>({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const c = await fetchAboutContent();
        setContent({ portrait_url: c?.portrait_url, sections: c?.sections ?? [] });
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateSection = (idx: number, patch: Partial<AboutSection>) => {
    setContent((c) => ({
      ...c,
      sections: c.sections.map((s, i) => (i === idx ? { ...s, ...patch } : s)),
    }));
  };

  const addTextSection = () =>
    setContent((c) => ({ ...c, sections: [...c.sections, blankTextSection()] }));

  const addListSection = () =>
    setContent((c) => ({ ...c, sections: [...c.sections, blankListSection()] }));

  const setKind = (idx: number, kind: "text" | "list") =>
    updateSection(idx, { kind });

  const updateItem = (sIdx: number, iIdx: number, lang: "en" | "it" | "es" | "zh", value: string) => {
    setContent((c) => ({
      ...c,
      sections: c.sections.map((s, i) => {
        if (i !== sIdx) return s;
        const items = [...(s.items ?? [])];
        items[iIdx] = { ...items[iIdx], [lang]: value };
        return { ...s, items };
      }),
    }));
  };

  const addItem = (sIdx: number) =>
    setContent((c) => ({
      ...c,
      sections: c.sections.map((s, i) =>
        i === sIdx ? { ...s, items: [...(s.items ?? []), {}] } : s
      ),
    }));

  const removeItem = (sIdx: number, iIdx: number) =>
    setContent((c) => ({
      ...c,
      sections: c.sections.map((s, i) =>
        i === sIdx
          ? { ...s, items: (s.items ?? []).filter((_, j) => j !== iIdx) }
          : s
      ),
    }));

  const moveItem = (sIdx: number, iIdx: number, dir: -1 | 1) =>
    setContent((c) => ({
      ...c,
      sections: c.sections.map((s, i) => {
        if (i !== sIdx) return s;
        const items = [...(s.items ?? [])];
        const j = iIdx + dir;
        if (j < 0 || j >= items.length) return s;
        [items[iIdx], items[j]] = [items[j], items[iIdx]];
        return { ...s, items };
      }),
    }));

  const removeSection = (idx: number) =>
    setContent((c) => ({ ...c, sections: c.sections.filter((_, i) => i !== idx) }));

  const moveSection = (idx: number, dir: -1 | 1) => {
    setContent((c) => {
      const next = [...c.sections];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return c;
      [next[idx], next[j]] = [next[j], next[idx]];
      return { ...c, sections: next };
    });
  };

  const handlePortraitUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadImage(file, "about");
      setContent((c) => ({ ...c, portrait_url: url }));
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateAboutContent(content);
      toast({ title: "Saved", description: "About page updated" });
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xs">Portrait image</Label>
        <div className="flex items-center gap-3 mt-1">
          {content.portrait_url && (
            <img
              src={content.portrait_url}
              alt=""
              className="w-24 h-24 object-cover rounded border"
            />
          )}
          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded hover:bg-muted">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading…" : "Upload portrait"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handlePortraitUpload(f);
              }}
            />
          </label>
          <Input
            value={content.portrait_url ?? ""}
            placeholder="or paste URL"
            onChange={(e) => setContent({ ...content, portrait_url: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-medium">Sections</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={addTextSection}>
              <Plus className="w-4 h-4 mr-1" /> Text section
            </Button>
            <Button size="sm" variant="outline" onClick={addListSection}>
              <Plus className="w-4 h-4 mr-1" /> List section
            </Button>
          </div>
        </div>

        {content.sections.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No sections yet. Click <em>Add section</em>.
          </p>
        )}

        {content.sections.map((section, idx) => {
          const kind = section.kind ?? "text";
          return (
            <div key={idx} className="border rounded p-4 space-y-3 bg-card">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {kind}
                  </span>
                  <Input
                    value={section.key}
                    onChange={(e) => updateSection(idx, { key: e.target.value })}
                    placeholder="section key (slug)"
                    className="max-w-xs"
                  />
                  <select
                    value={kind}
                    onChange={(e) => setKind(idx, e.target.value as "text" | "list")}
                    className="border rounded px-2 py-1 text-sm bg-background"
                  >
                    <option value="text">Text</option>
                    <option value="list">List</option>
                  </select>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => moveSection(idx, -1)}>
                    ↑
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => moveSection(idx, 1)}>
                    ↓
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeSection(idx)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              {/* Title row (always per-language) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {LANGS.map((lang) => (
                  <Input
                    key={lang.code}
                    placeholder={`Title (${lang.code})`}
                    value={(section as any)[`title_${lang.code}`] ?? ""}
                    onChange={(e) =>
                      updateSection(idx, {
                        [`title_${lang.code}`]: e.target.value,
                      } as any)
                    }
                  />
                ))}
              </div>

              {kind === "text" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {LANGS.map((lang) => (
                    <div key={lang.code} className="space-y-1 border-l-2 pl-3 border-muted">
                      <div className="text-xs font-medium opacity-70">{lang.label}</div>
                      <Textarea
                        rows={4}
                        placeholder={`Body (${lang.code})`}
                        value={(section as any)[`body_${lang.code}`] ?? ""}
                        onChange={(e) =>
                          updateSection(idx, {
                            [`body_${lang.code}`]: e.target.value,
                          } as any)
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {kind === "list" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Items</Label>
                    <Button size="sm" variant="outline" onClick={() => addItem(idx)}>
                      <Plus className="w-4 h-4 mr-1" /> Add item
                    </Button>
                  </div>
                  {(section.items ?? []).length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No items. Click <em>Add item</em>.
                    </p>
                  )}
                  {(section.items ?? []).map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="border rounded p-2 space-y-2 bg-background"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          #{iIdx + 1}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => moveItem(idx, iIdx, -1)}
                          >
                            ↑
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => moveItem(idx, iIdx, 1)}
                          >
                            ↓
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(idx, iIdx)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {LANGS.map((lang) => (
                          <Input
                            key={lang.code}
                            placeholder={`${lang.label} (English is fallback)`}
                            value={(item as any)[lang.code] ?? ""}
                            onChange={(e) =>
                              updateItem(idx, iIdx, lang.code, e.target.value)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save About page"}
        </Button>
      </div>
    </div>
  );
}
