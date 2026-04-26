import { useEffect, useState } from "react";
import { Plus, Save, Trash2, Loader2, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ImageUpload from "@/components/admin/ImageUpload";

type SiteText = {
  id: string;
  key: string;
  label: string;
  value: string;
  section: string;
  image_url: string | null;
};

const sectionLabels: Record<string, { label: string; description: string }> = {
  hero: { label: "Page d'accueil — Bandeau principal", description: "Titre, recherche, libellés du Hero affiché en haut de la page d'accueil." },
  about: { label: "Page d'accueil — À propos", description: "Présentation institutionnelle (vision, mission, approche)." },
  footer: { label: "Pied de page", description: "Tagline, ville, sous-titre du logo." },
  legal: { label: "Informations légales", description: "Identité juridique, coordonnées bancaires et bloc transparence." },
  contact: { label: "Contact", description: "Email, téléphone, WhatsApp, adresse." },
  general: { label: "Autres textes", description: "Textes personnalisés sans section dédiée." },
};

const sectionsOrder = ["hero", "about", "footer", "legal", "contact", "general"];

const SiteTextsAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<SiteText[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ key: "", label: "", value: "", section: "general" });
  const [drafts, setDrafts] = useState<Record<string, { value: string; image_url: string | null }>>({});

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_texts").select("*").order("section").order("label");
    const list = (data ?? []) as SiteText[];
    setItems(list);
    setDrafts(Object.fromEntries(list.map((t) => [t.id, { value: t.value, image_url: t.image_url }])));
    setLoading(false);
  };

  useEffect(() => { document.title = "Textes & infos légales — Admin BGF"; load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("site_texts").insert(form);
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Texte créé" });
    setOpen(false); setForm({ key: "", label: "", value: "", section: "general" });
    load();
  };

  const update = async (t: SiteText) => {
    const draft = drafts[t.id];
    const { error } = await supabase
      .from("site_texts")
      .update({ value: draft.value, image_url: draft.image_url })
      .eq("id", t.id);
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Mis à jour" });
    load();
  };

  const remove = async (t: SiteText) => {
    if (!confirm(`Supprimer "${t.label}" ?`)) return;
    await supabase.from("site_texts").delete().eq("id", t.id);
    load();
  };

  const grouped = items.reduce<Record<string, SiteText[]>>((acc, t) => {
    (acc[t.section] ??= []).push(t);
    return acc;
  }, {});
  const sections = sectionsOrder.filter((s) => grouped[s]?.length).concat(
    Object.keys(grouped).filter((s) => !sectionsOrder.includes(s))
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <AdminPageHeader
        title="Textes & informations légales"
        description="Modifiez en direct tous les textes éditoriaux du site, ainsi que les coordonnées légales et bancaires."
        actions={<Button onClick={() => setOpen(true)} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Ajouter un texte</Button>}
      />

      {loading ? (
        <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
      ) : sections.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-10 bg-card border border-border rounded-2xl">
          Aucun texte. Créez votre premier texte personnalisable.
        </div>
      ) : (
        <Tabs defaultValue={sections[0]}>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1">
            {sections.map((s) => (
              <TabsTrigger key={s} value={s} className="flex-1 text-xs">
                {sectionLabels[s]?.label.split("—").pop()?.trim() ?? s}
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((s) => (
            <TabsContent key={s} value={s} className="mt-4">
              <div className="bg-card border border-border rounded-2xl p-5 md:p-6">
                <div className="mb-4 pb-4 border-b border-border">
                  <h3 className="font-serif font-bold text-primary text-lg">{sectionLabels[s]?.label ?? s}</h3>
                  {sectionLabels[s]?.description && (
                    <p className="text-xs text-muted-foreground mt-1">{sectionLabels[s].description}</p>
                  )}
                </div>
                <div className="space-y-5">
                  {grouped[s].map((t) => (
                    <div key={t.id} className="border-t border-border first:border-0 pt-4 first:pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">
                          {t.label}
                          <code className="text-[10px] text-muted-foreground ml-2 font-normal">{t.key}</code>
                        </Label>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => update(t)} title="Enregistrer">
                            <Save className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => remove(t)} title="Supprimer">
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={drafts[t.id]?.value ?? ""}
                        onChange={(e) => setDrafts({ ...drafts, [t.id]: { ...drafts[t.id], value: e.target.value } })}
                        rows={(drafts[t.id]?.value ?? "").length > 100 ? 4 : 2}
                      />
                      <details className="mt-2">
                        <summary className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1.5 hover:text-foreground">
                          <ImageIcon className="w-3.5 h-3.5" />
                          {drafts[t.id]?.image_url ? "Image associée" : "Ajouter une image (optionnel)"}
                        </summary>
                        <div className="mt-2">
                          <ImageUpload
                            value={drafts[t.id]?.image_url}
                            onChange={(url) => setDrafts({ ...drafts, [t.id]: { ...drafts[t.id], image_url: url } })}
                            folder="texts"
                          />
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouveau texte</DialogTitle></DialogHeader>
          <form onSubmit={create} className="space-y-3">
            <div><Label>Clé technique (unique)</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="ex: cta_donation_title" required /></div>
            <div><Label>Libellé</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Titre du bouton de don" required /></div>
            <div>
              <Label>Section</Label>
              <select
                value={form.section}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {Object.entries(sectionLabels).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div><Label>Valeur</Label><Textarea value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} rows={3} required /></div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">Créer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SiteTextsAdmin;
