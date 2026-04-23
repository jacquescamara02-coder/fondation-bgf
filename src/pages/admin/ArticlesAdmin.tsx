import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ImageUpload from "@/components/admin/ImageUpload";

type A = { id: string; slug: string; title: string; excerpt: string | null; content: string; cover_image: string | null; published: boolean; published_at: string | null };
const empty: Omit<A, "id"> = { slug: "", title: "", excerpt: "", content: "", cover_image: null, published: false, published_at: null };

const ArticlesAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<A[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<A | null>(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { document.title = "Articles — Admin BGF"; load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      published_at: form.published && !form.published_at ? new Date().toISOString() : form.published_at,
    };
    const { error } = editing
      ? await supabase.from("articles").update(payload).eq("id", editing.id)
      : await supabase.from("articles").insert(payload);
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    toast({ title: editing ? "Article mis à jour" : "Article créé" });
    setOpen(false); load();
  };

  const togglePublish = async (a: A) => {
    await supabase.from("articles").update({
      published: !a.published,
      published_at: !a.published ? new Date().toISOString() : a.published_at,
    }).eq("id", a.id);
    load();
  };

  const remove = async (a: A) => {
    if (!confirm(`Supprimer "${a.title}" ?`)) return;
    await supabase.from("articles").delete().eq("id", a.id);
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <AdminPageHeader
        title="Articles & Actualités"
        description="Publiez des articles sur les actions de la fondation."
        actions={<Button onClick={() => { setEditing(null); setForm(empty); setOpen(true); }} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Nouvel article</Button>}
      />

      {loading ? (
        <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
      ) : (
        <div className="space-y-3">
          {items.length === 0 && <div className="text-center text-sm text-muted-foreground py-10 bg-card border border-border rounded-2xl">Aucun article.</div>}
          {items.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              {a.cover_image ? <img src={a.cover_image} alt="" className="w-16 h-16 object-cover rounded" /> : <div className="w-16 h-16 bg-secondary rounded" />}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground truncate">{a.title}</div>
                <div className="text-xs text-muted-foreground truncate">{a.excerpt ?? a.slug}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${a.published ? "bg-accent-soft text-accent" : "bg-secondary text-muted-foreground"}`}>
                {a.published ? "Publié" : "Brouillon"}
              </span>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => togglePublish(a)}>{a.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                <Button size="icon" variant="ghost" onClick={() => { setEditing(a); setForm(a); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(a)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Modifier" : "Nouvel"} article</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Slug (URL)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></div>
              <div className="flex items-end gap-2">
                <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Publié</label>
              </div>
            </div>
            <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div><Label>Résumé</Label><Textarea value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
            <div><Label>Contenu</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} required /></div>
            <div><Label>Image de couverture</Label><ImageUpload value={form.cover_image} onChange={(url) => setForm({ ...form, cover_image: url })} folder="articles" /></div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">Enregistrer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticlesAdmin;