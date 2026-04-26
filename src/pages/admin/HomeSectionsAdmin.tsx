import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ImageUpload from "@/components/admin/ImageUpload";

type Section = {
  id: string;
  key: string;
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_url: string | null;
  layout: string;
  display_order: number;
  published: boolean;
};

const layouts = [
  { value: "text-image", label: "Texte + Image (gauche/droite)" },
  { value: "image-text", label: "Image + Texte (image à gauche)" },
  { value: "centered", label: "Texte centré (sans image)" },
  { value: "banner", label: "Bannière pleine largeur (image de fond)" },
];

const empty: Omit<Section, "id"> = {
  key: "", eyebrow: "", title: "", subtitle: "", content: "",
  image_url: null, cta_label: "", cta_url: "", layout: "text-image",
  display_order: 0, published: true,
};

const HomeSectionsAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Section | null>(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("home_sections").select("*").order("display_order");
    setItems((data ?? []) as Section[]);
    setLoading(false);
  };

  useEffect(() => { document.title = "Sections d'accueil — Admin BGF"; load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, display_order: items.length + 1, key: `section_${Date.now().toString(36)}` });
    setOpen(true);
  };
  const openEdit = (s: Section) => { setEditing(s); setForm(s); setOpen(true); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.key || !form.title) {
      toast({ title: "Champs requis", description: "Clé technique et titre obligatoires.", variant: "destructive" });
      return;
    }
    const { error } = editing
      ? await supabase.from("home_sections").update(form).eq("id", editing.id)
      : await supabase.from("home_sections").insert(form);
    if (error) {
      toast({ title: "Échec", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Section mise à jour" : "Section créée" });
    setOpen(false);
    load();
  };

  const togglePublish = async (s: Section) => {
    await supabase.from("home_sections").update({ published: !s.published }).eq("id", s.id);
    load();
  };

  const move = async (s: Section, dir: -1 | 1) => {
    const idx = items.findIndex((x) => x.id === s.id);
    const swap = items[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("home_sections").update({ display_order: swap.display_order }).eq("id", s.id),
      supabase.from("home_sections").update({ display_order: s.display_order }).eq("id", swap.id),
    ]);
    load();
  };

  const remove = async (s: Section) => {
    if (!confirm(`Supprimer la section "${s.title}" ?`)) return;
    await supabase.from("home_sections").delete().eq("id", s.id);
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <AdminPageHeader
        title="Sections d'accueil"
        description="Créez et organisez vos propres blocs sur la page d'accueil. Glissez l'ordre, choisissez la mise en page, ajoutez une image et un bouton d'action."
        actions={<Button onClick={openNew} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Nouvelle section</Button>}
      />

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Aucune section personnalisée pour l'instant. Cliquez sur "Nouvelle section" pour ajouter un bloc à la page d'accueil.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Mise en page</TableHead>
                <TableHead className="w-28">Ordre</TableHead>
                <TableHead className="w-24">Statut</TableHead>
                <TableHead className="w-40 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s, i) => (
                <TableRow key={s.id}>
                  <TableCell>
                    {s.image_url ? <img src={s.image_url} alt="" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-secondary rounded" />}
                  </TableCell>
                  <TableCell className="font-medium">{s.title}<div className="text-xs text-muted-foreground">{s.key}</div></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{layouts.find((l) => l.value === s.layout)?.label ?? s.layout}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => move(s, -1)} className="h-7 w-7"><ArrowUp className="w-3.5 h-3.5" /></Button>
                      <Button size="icon" variant="ghost" disabled={i === items.length - 1} onClick={() => move(s, 1)} className="h-7 w-7"><ArrowDown className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.published ? "bg-accent-soft text-accent" : "bg-secondary text-muted-foreground"}`}>
                      {s.published ? "Publié" : "Brouillon"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => togglePublish(s)}>{s.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(s)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Modifier" : "Nouvelle"} section</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Clé technique (unique)</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} required /></div>
              <div>
                <Label>Mise en page</Label>
                <Select value={form.layout} onValueChange={(v) => setForm({ ...form, layout: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {layouts.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Surtitre (eyebrow)</Label><Input value={form.eyebrow ?? ""} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} placeholder="Notre démarche" /></div>
            <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div><Label>Sous-titre</Label><Input value={form.subtitle ?? ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></div>
            <div><Label>Contenu</Label><Textarea value={form.content ?? ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} /></div>
            <div><Label>Image</Label><ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="sections" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Bouton — libellé</Label><Input value={form.cta_label ?? ""} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} placeholder="En savoir plus" /></div>
              <div><Label>Bouton — lien</Label><Input value={form.cta_url ?? ""} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} placeholder="/poles ou https://…" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 items-end">
              <div><Label>Ordre</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
              <label className="flex items-center gap-2 text-sm pb-2">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Publié sur le site
              </label>
            </div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">
              {editing ? "Mettre à jour" : "Créer la section"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeSectionsAdmin;
