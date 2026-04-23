import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type T = { id: string; name: string; role: string | null; text: string; rating: number; published: boolean; display_order: number };
const empty: Omit<T, "id"> = { name: "", role: "", text: "", rating: 5, published: true, display_order: 0 };

const TestimonialsAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { document.title = "Témoignages — Admin BGF"; load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = editing
      ? await supabase.from("testimonials").update(form).eq("id", editing.id)
      : await supabase.from("testimonials").insert(form);
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    toast({ title: editing ? "Mis à jour" : "Témoignage ajouté" });
    setOpen(false); load();
  };

  const remove = async (t: T) => {
    if (!confirm(`Supprimer le témoignage de ${t.name} ?`)) return;
    await supabase.from("testimonials").delete().eq("id", t.id);
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <AdminPageHeader
        title="Témoignages"
        description="Gérez les avis clients affichés sur le site."
        actions={<Button onClick={() => { setEditing(null); setForm(empty); setOpen(true); }} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Ajouter</Button>}
      />

      {loading ? (
        <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.length === 0 && <div className="col-span-full text-center text-sm text-muted-foreground py-10">Aucun témoignage.</div>}
          {items.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                </div>
                <div className="flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}</div>
              </div>
              <p className="text-sm text-foreground/80 line-clamp-3">{t.text}</p>
              <div className="mt-3 flex justify-end gap-1">
                <Button size="icon" variant="ghost" onClick={() => { setEditing(t); setForm(t); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(t)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Modifier" : "Nouveau"} témoignage</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div><Label>Nom</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div><Label>Rôle / Fonction</Label><Input value={form.role ?? ""} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            <div><Label>Témoignage</Label><Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} required /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Note (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
              <div><Label>Ordre</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            </div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">Enregistrer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsAdmin;