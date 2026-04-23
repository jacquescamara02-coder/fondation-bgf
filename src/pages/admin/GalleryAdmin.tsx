import { useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ImageUpload from "@/components/admin/ImageUpload";

type G = { id: string; title: string | null; description: string | null; image_url: string; category: string | null; display_order: number; published: boolean };
const empty: Omit<G, "id"> = { title: "", description: "", image_url: "", category: "", display_order: 0, published: true };

const GalleryAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<G[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<G | null>(null);
  const [form, setForm] = useState<Omit<G, "id">>(empty);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("gallery").select("*").order("display_order");
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { document.title = "Galerie — Admin BGF"; load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) { toast({ title: "Image requise", variant: "destructive" }); return; }
    const { error } = editing
      ? await supabase.from("gallery").update(form).eq("id", editing.id)
      : await supabase.from("gallery").insert(form);
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    toast({ title: editing ? "Image mise à jour" : "Image ajoutée" });
    setOpen(false); load();
  };

  const remove = async (g: G) => {
    if (!confirm("Supprimer cette image ?")) return;
    await supabase.from("gallery").delete().eq("id", g.id);
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <AdminPageHeader
        title="Galerie d'images"
        description="Téléversez et gérez les photos de la galerie publique."
        actions={<Button onClick={() => { setEditing(null); setForm(empty); setOpen(true); }} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Ajouter une image</Button>}
      />

      {loading ? (
        <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
      ) : items.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-10 bg-card border border-border rounded-2xl">Aucune image. Ajoutez la première.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((g) => (
            <div key={g.id} className="group relative bg-card border border-border rounded-xl overflow-hidden">
              <img src={g.image_url} alt={g.title ?? ""} className="w-full aspect-square object-cover" />
              <div className="p-3">
                <div className="text-sm font-medium truncate">{g.title || "Sans titre"}</div>
                {g.category && <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{g.category}</div>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => { setEditing(g); setForm(g); setOpen(true); }}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button size="icon" variant="destructive" onClick={() => remove(g)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Modifier" : "Nouvelle"} image</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-3">
            <div><Label>Image</Label><ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url ?? "" })} folder="gallery" /></div>
            <div><Label>Titre</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Catégorie</Label><Input value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Événements, Pôles..." /></div>
            <div><Label>Description</Label><Textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
            <div><Label>Ordre</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">Enregistrer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryAdmin;