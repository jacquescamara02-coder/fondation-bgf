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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ImageUpload from "@/components/admin/ImageUpload";
import StringListEditor from "@/components/admin/StringListEditor";

type PoleDetails = {
  intro?: string[];
  beneficiairesLabel?: string;
  beneficiaires?: string[];
  objectifs?: string[];
  domaines?: string[];
  approcheIntro?: string;
  approche?: string[];
  services?: string[];
  valeurAjoutee?: string[];
  impact?: string[];
  positionnement?: string;
  engagement?: string;
};

type Pole = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
  details: PoleDetails | null;
};

const emptyDetails: PoleDetails = {
  intro: [], beneficiairesLabel: "", beneficiaires: [], objectifs: [],
  domaines: [], approcheIntro: "", approche: [], services: [],
  valeurAjoutee: [], impact: [], positionnement: "", engagement: "",
};

const empty: Omit<Pole, "id"> = {
  slug: "", tag: "", title: "", description: "", image_url: null,
  display_order: 0, published: true, details: emptyDetails,
};

const PolesAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Pole[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pole | null>(null);
  const [form, setForm] = useState<Omit<Pole, "id">>(empty);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("poles").select("*").order("display_order");
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    setItems((data ?? []) as unknown as Pole[]);
    setLoading(false);
  };

  useEffect(() => { document.title = "Pôles — Admin BGF"; load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...empty, details: { ...emptyDetails }, display_order: items.length + 1 });
    setOpen(true);
  };
  const openEdit = (p: Pole) => {
    setEditing(p);
    setForm({ ...p, details: { ...emptyDetails, ...(p.details ?? {}) } });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.title || !form.tag || !form.description) {
      toast({ title: "Champs requis manquants", description: "Slug, titre, tag et description sont obligatoires.", variant: "destructive" });
      return;
    }
    // Strip empty arrays/strings from details
    const cleanDetails: PoleDetails = {};
    Object.entries(form.details ?? {}).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        const filtered = v.filter((s) => s.trim());
        if (filtered.length) (cleanDetails as Record<string, unknown>)[k] = filtered;
      } else if (typeof v === "string" && v.trim()) {
        (cleanDetails as Record<string, unknown>)[k] = v.trim();
      }
    });

    const payload = { ...form, details: cleanDetails };
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

  const move = async (p: Pole, dir: -1 | 1) => {
    const idx = items.findIndex((x) => x.id === p.id);
    const swap = items[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("poles").update({ display_order: swap.display_order }).eq("id", p.id),
      supabase.from("poles").update({ display_order: p.display_order }).eq("id", swap.id),
    ]);
    load();
  };

  const remove = async (p: Pole) => {
    if (!confirm(`Supprimer "${p.title}" ?`)) return;
    const { error } = await supabase.from("poles").delete().eq("id", p.id);
    if (error) toast({ title: "Échec", description: error.message, variant: "destructive" });
    else { toast({ title: "Supprimé" }); load(); }
  };

  const updDet = <K extends keyof PoleDetails>(key: K, v: PoleDetails[K]) =>
    setForm({ ...form, details: { ...(form.details ?? {}), [key]: v } });

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <AdminPageHeader
        title="Pôles d'activité"
        description="Créez, modifiez et publiez les pôles affichés sur le site, avec toutes leurs sous-sections."
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
                <TableHead className="w-28">Ordre</TableHead>
                <TableHead className="w-24">Statut</TableHead>
                <TableHead className="w-40 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.image_url ? <img src={p.image_url} alt="" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-secondary rounded" />}
                  </TableCell>
                  <TableCell className="font-medium">{p.title}<div className="text-xs text-muted-foreground">/{p.slug}</div></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.tag}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => move(p, -1)} className="h-7 w-7"><ArrowUp className="w-3.5 h-3.5" /></Button>
                      <Button size="icon" variant="ghost" disabled={i === items.length - 1} onClick={() => move(p, 1)} className="h-7 w-7"><ArrowDown className="w-3.5 h-3.5" /></Button>
                    </div>
                  </TableCell>
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
        <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Modifier" : "Nouveau"} pôle</DialogTitle></DialogHeader>
          <form onSubmit={save} className="space-y-4">
            <Tabs defaultValue="general">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="content">Contenu détaillé</TabsTrigger>
                <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Slug (URL)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="sante-maternelle" required /></div>
                  <div><Label>Ordre d'affichage</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
                </div>
                <div><Label>Tag (badge)</Label><Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="À but non lucratif" required /></div>
                <div><Label>Titre</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                <div><Label>Description courte (carte d'accueil)</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required /></div>
                <div><Label>Image principale</Label><ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="poles" /></div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                  Publié sur le site
                </label>
              </TabsContent>

              <TabsContent value="content" className="space-y-5 pt-4">
                <StringListEditor
                  label="Introduction (paragraphes)"
                  values={form.details?.intro ?? []}
                  onChange={(v) => updDet("intro", v)}
                  placeholder="Un paragraphe d'introduction…"
                  multiline
                />
                <div className="space-y-2 border-t border-border pt-4">
                  <Label>Libellé du bloc bénéficiaires/services</Label>
                  <Input
                    value={form.details?.beneficiairesLabel ?? ""}
                    onChange={(e) => updDet("beneficiairesLabel", e.target.value)}
                    placeholder="Bénéficiaires prioritaires / Services proposés / Domaines d'expertise"
                  />
                </div>
                <StringListEditor
                  label="Bénéficiaires / services (puces)"
                  values={form.details?.beneficiaires ?? []}
                  onChange={(v) => updDet("beneficiaires", v)}
                  placeholder="Une entrée par puce"
                />
                <StringListEditor
                  label="Objectifs"
                  values={form.details?.objectifs ?? []}
                  onChange={(v) => updDet("objectifs", v)}
                  placeholder="Un objectif"
                />
                <StringListEditor
                  label="Domaines d'intervention"
                  values={form.details?.domaines ?? []}
                  onChange={(v) => updDet("domaines", v)}
                  placeholder="Un domaine"
                />
                <div className="space-y-2 border-t border-border pt-4">
                  <Label>Intro de l'approche</Label>
                  <Input
                    value={form.details?.approcheIntro ?? ""}
                    onChange={(e) => updDet("approcheIntro", e.target.value)}
                    placeholder="Le cabinet adopte une approche…"
                  />
                </div>
                <StringListEditor
                  label="Approche / clientèle (puces)"
                  values={form.details?.approche ?? []}
                  onChange={(v) => updDet("approche", v)}
                />
                <StringListEditor
                  label="Services (optionnel)"
                  values={form.details?.services ?? []}
                  onChange={(v) => updDet("services", v)}
                />
              </TabsContent>

              <TabsContent value="conclusion" className="space-y-5 pt-4">
                <StringListEditor
                  label="Valeur ajoutée"
                  values={form.details?.valeurAjoutee ?? []}
                  onChange={(v) => updDet("valeurAjoutee", v)}
                />
                <StringListEditor
                  label="Impact attendu"
                  values={form.details?.impact ?? []}
                  onChange={(v) => updDet("impact", v)}
                />
                <div className="space-y-2 border-t border-border pt-4">
                  <Label>Positionnement (encart sombre)</Label>
                  <Textarea
                    value={form.details?.positionnement ?? ""}
                    onChange={(e) => updDet("positionnement", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notre engagement (encart sombre)</Label>
                  <Textarea
                    value={form.details?.engagement ?? ""}
                    onChange={(e) => updDet("engagement", e.target.value)}
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">
              {editing ? "Mettre à jour" : "Créer le pôle"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PolesAdmin;
