import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtworksTab from "@/components/admin/ArtworksTab";
import GalleryTab from "@/components/admin/GalleryTab";
import AboutTab from "@/components/admin/AboutTab";
import SettingsTab from "@/components/admin/SettingsTab";

interface AdminPanelProps {
  onClose?: () => void;
}

export function AdminPanel(_: AdminPanelProps) {
  return (
    <div className="p-4 sm:p-6">
      <Tabs defaultValue="artworks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="artworks">Artworks</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="settings">Site</TabsTrigger>
        </TabsList>
        <TabsContent value="artworks"><ArtworksTab /></TabsContent>
        <TabsContent value="gallery"><GalleryTab /></TabsContent>
        <TabsContent value="about"><AboutTab /></TabsContent>
        <TabsContent value="settings"><SettingsTab /></TabsContent>
      </Tabs>
    </div>
  );
}

// --- Legacy code removed; lives now in admin/ArtworksTab.tsx ---
function _legacy_removed() {
  return null;
}
/* removed legacy body
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    technique: "",
    theme: "",
    dimensions: "",
    description: "",
    imageUrl: "",
    saatchiUrl: "",
  });

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const { fetchArtworks } = await import("@/data/artworks");
      const data = await fetchArtworks();
      setArtworks(data);
    } catch (error) {
      console.error("Error loading artworks:", error);
      toast({
        title: "Error",
        description: "Failed to load artworks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadArtworkImage(file);
      setFormData((prev) => ({ ...prev, imageUrl: url }));
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.imageUrl) {
      toast({
        title: "Error",
        description: "Title and image are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const artworkData: any = {
        title: formData.title,
        year: formData.year,
        technique: formData.technique,
        theme: formData.theme,
        dimensions: formData.dimensions,
        description: formData.description,
        image_url: formData.imageUrl,
        saatchi_url: formData.saatchiUrl,
      };

      if (editingId) {
        await updateArtwork(editingId, artworkData);
        toast({
          title: "Success",
          description: "Artwork updated successfully",
        });
      } else {
        await createArtwork(artworkData);
        toast({
          title: "Success",
          description: "Artwork created successfully",
        });
      }

      resetForm();
      setIsDialogOpen(false);
      await loadArtworks();
    } catch (error) {
      console.error("Error saving artwork:", error);
      toast({
        title: "Error",
        description: "Failed to save artwork",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setFormData({
      title: artwork.title,
      year: artwork.year,
      technique: artwork.technique,
      theme: artwork.theme,
      dimensions: artwork.dimensions,
      description: artwork.description,
      imageUrl: artwork.imageUrl,
      saatchiUrl: artwork.saatchiUrl || "",
    });
    setEditingId(artwork.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await deleteArtwork(id);
        toast({
          title: "Success",
          description: "Artwork deleted successfully",
        });
        await loadArtworks();
      } catch (error) {
        console.error("Error deleting artwork:", error);
        toast({
          title: "Error",
          description: "Failed to delete artwork",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      year: new Date().getFullYear(),
      technique: "",
      theme: "",
      dimensions: "",
      description: "",
      imageUrl: "",
      saatchiUrl: "",
    });
    setEditingId(null);
    setImageFile(null);
  };

  if (loading) {
    return <div className="p-6">Loading artworks...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Artwork Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              Add New Artwork
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Artwork" : "Add New Artwork"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Artwork title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        year: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Technique</label>
                  <Input
                    value={formData.technique}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        technique: e.target.value,
                      }))
                    }
                    placeholder="e.g., Oil on Canvas"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Theme</label>
                  <Input
                    value={formData.theme}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, theme: e.target.value }))
                    }
                    placeholder="e.g., Surrealism"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Dimensions</label>
                  <Input
                    value={formData.dimensions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dimensions: e.target.value,
                      }))
                    }
                    placeholder="e.g., 80 x 60 cm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Saatchi URL</label>
                  <Input
                    value={formData.saatchiUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        saatchiUrl: e.target.value,
                      }))
                    }
                    placeholder="Saatchi Art URL"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Artwork description"
                    rows={4}
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Image *</label>
                  <div className="space-y-2">
                    {formData.imageUrl && (
                      <div className="relative w-32 h-32">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setImageFile(e.target.files[0]);
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                      disabled={uploading}
                      className="text-sm"
                    />
                    {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading || !formData.imageUrl}>
                  {editingId ? "Update" : "Create"} Artwork
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No artworks yet. Create your first one!</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Technique</TableHead>
                <TableHead>Theme</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artworks.map((artwork) => (
                <TableRow key={artwork.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      {artwork.title}
                    </div>
                  </TableCell>
                  <TableCell>{artwork.year}</TableCell>
                  <TableCell>{artwork.technique}</TableCell>
                  <TableCell>{artwork.theme}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(artwork)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(artwork.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
*/
