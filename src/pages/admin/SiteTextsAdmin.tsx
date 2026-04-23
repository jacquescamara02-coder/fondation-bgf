import { useEffect, useState } from "react";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type SiteText = { id: string; key: string; label: string; value: string; section: string };

const SiteTextsAdmin = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<SiteText[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ key: "", label: "", value: "", section: "general" });
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_texts").select("*").order("section").order("label");
    setItems(data ?? []);
    setDrafts(Object.fromEntries((data ?? []).map((t) => [t.id, t.value])));
    setLoading(false);
  };

  useEffect(() => { document.title = "Textes du site — Admin BGF"; load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("site_texts").insert(form);
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Texte créé" });
    setOpen(false); setForm({ key: "", label: "", value: "", section: "general" });
    load();
  };

  const update = async (t: SiteText) => {
    await supabase.from("site_texts").update({ value: drafts[t.id] }).eq("id", t.id);
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

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <AdminPageHeader
        title="Textes du site"
        description="Modifiez les textes éditoriaux affichés sur les pages publiques."
        actions={<Button onClick={() => setOpen(true)} className="bg-gradient-gold text-accent-foreground"><Plus className="w-4 h-4" /> Ajouter</Button>}
      />

      {loading ? (
        <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>
      ) : items.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-10 bg-card border border-border rounded-2xl">
          Aucun texte. Créez un texte personnalisable (ex: <code>hero_title</code>, <code>about_intro</code>).
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([section, texts]) => (
            <div key={section} className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-serif font-bold text-primary mb-3 capitalize">{section}</h3>
              <div className="space-y-4">
                {texts.map((t) => (
                  <div key={t.id} className="border-t border-border first:border-0 pt-4 first:pt-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <Label className="text-xs">{t.label} <code className="text-muted-foreground ml-1">{t.key}</code></Label>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => update(t)}><Save className="w-3.5 h-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(t)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                      </div>
                    </div>
                    <Textarea
                      value={drafts[t.id] ?? ""}
                      onChange={(e) => setDrafts({ ...drafts, [t.id]: e.target.value })}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouveau texte</DialogTitle></DialogHeader>
          <form onSubmit={create} className="space-y-3">
            <div><Label>Clé technique</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="hero_title" required /></div>
            <div><Label>Libellé</Label><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Titre principal Hero" required /></div>
            <div><Label>Section</Label><Input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="general" /></div>
            <div><Label>Valeur</Label><Textarea value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} rows={3} required /></div>
            <Button type="submit" className="w-full bg-gradient-gold text-accent-foreground">Créer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SiteTextsAdmin;