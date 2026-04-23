import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ImageUpload from "@/components/admin/ImageUpload";

type Pole = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
};

const empty: Omit<Pole, "id"> = {
  slug: "", tag: "", title: "", description: "", image_url: null, display_order: 0, published: true,
};

const PolesAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Pole[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pole | null>(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("poles").select("*").order("display_order");
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { document.title = "Pôles — Admin BGF"; load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p: Pole) => { setEditing(p); setForm(p); setOpen(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.title || !form.tag || !form.description) {
      toast({ title: "Champs requis", variant: "destructive" });
      return;
    }
    const payload = { ...form };
    const { error } = editing
      ? await supabase.from("poles").update(payload).eq("id", editing.id)
      : await supabase.from("poles").insert(payload);
    if (error) {
      toast({ title: "Échec", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Pôle mis à jour" : "Pôle créé" });
    setOpen(false);
    load();
  };

  const togglePublish = async (p: Pole) => {
    await supabase.from("poles").update({ published: !p.published }).eq("id", p.id);
    load();
  };

  const remove = async (p: Pole) => {
    if (!confirm(`Supprimer "${p.title}" ?`)) return;
    const { error } = await supabase.from("poles").delete().eq("id", p.id);
    if (error) toast({ title: "Échec", description: error.message, variant: "destructive" });
    else { toast({ title: "Supprimé" }); load(); }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <AdminPageHeader
        title="Pôles d'activité"
        description="Créez, modifiez et publiez les pôles affichés sur le site."
        actions={<Button onClick={openNew} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Nouveau pôle</Button>}
      />

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">Aucun pôle. Créez le premier.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead className="w-20">Ordre</TableHead>
                <TableHead className="w-24">Statut</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.image_url ? <img src={p.image_url} alt="" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-secondary rounded" />}
                  </TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.tag}</TableCell>
                  <TableCell>{p.display_order}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-accent-soft text-accent" : "bg-secondary text-muted-foreground"}`}>
                      {p.published ? "Publié" : "Brouillon"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => togglePublish(p)}>{p.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(p)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Modifier" : "Nouveau"} pôle</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Slug (URL)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="sante-maternelle" /></div>
              <div><Label>Ordre</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            </div>
            <div><Label>Tag</Label><Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="À but non lucratif" /></div>
            <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} /></div>
            <div><Label>Image</Label><ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="poles" /></div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">{editing ? "Mettre à jour" : "Créer"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PolesAdmin;