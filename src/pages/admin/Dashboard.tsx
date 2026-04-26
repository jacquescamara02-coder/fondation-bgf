import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase, MessageSquareQuote, Newspaper, Images, Layers, Type,
  ArrowRight, ExternalLink, Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type Counts = {
  poles: number; testimonials: number; articles: number;
  gallery: number; sections: number; texts: number;
};

const tiles = [
  { key: "poles" as const, to: "/admin/poles", label: "Pôles", icon: Briefcase, hint: "Activités & domaines" },
  { key: "sections" as const, to: "/admin/sections", label: "Sections d'accueil", icon: Layers, hint: "Blocs personnalisés" },
  { key: "testimonials" as const, to: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote, hint: "Avis clients" },
  { key: "articles" as const, to: "/admin/articles", label: "Articles", icon: Newspaper, hint: "Actualités" },
  { key: "texts" as const, to: "/admin/site-texts", label: "Textes & infos légales", icon: Type, hint: "Hero, à propos, légales…" },
  { key: "gallery" as const, to: "/admin/gallery", label: "Galerie", icon: Images, hint: "Photos publiques" },
];

const Dashboard = () => {
  const [counts, setCounts] = useState<Counts>({
    poles: 0, testimonials: 0, articles: 0, gallery: 0, sections: 0, texts: 0,
  });

  useEffect(() => {
    document.title = "Tableau de bord — Admin BGF";
    (async () => {
      const [p, t, a, g, s, x] = await Promise.all([
        supabase.from("poles").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("articles").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
        supabase.from("home_sections").select("*", { count: "exact", head: true }),
        supabase.from("site_texts").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        poles: p.count ?? 0,
        testimonials: t.count ?? 0,
        articles: a.count ?? 0,
        gallery: g.count ?? 0,
        sections: s.count ?? 0,
        texts: x.count ?? 0,
      });
    })();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Administration</div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-1">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Contrôlez l'intégralité du site : pôles, sections d'accueil personnalisées, textes éditoriaux, informations légales, témoignages, articles et galerie.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href="/" target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4" /> Voir le site
          </a>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map(({ key, to, label, icon: Icon, hint }) => (
          <Link
            key={key}
            to={to}
            className="group bg-card border border-border rounded-2xl p-5 hover:border-accent/50 hover:shadow-soft transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4 text-3xl font-bold font-serif text-primary">{counts[key]}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
            <div className="text-xs text-muted-foreground mt-1">{hint}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
            <Plus className="w-4 h-4 text-accent" /> Actions rapides
          </h2>
          <div className="mt-4 space-y-2">
            <Link to="/admin/sections" className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary text-sm transition-colors">
              <span>Ajouter une nouvelle section sur l'accueil</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
            <Link to="/admin/poles" className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary text-sm transition-colors">
              <span>Créer ou modifier un pôle d'activité</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
            <Link to="/admin/site-texts" className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary text-sm transition-colors">
              <span>Modifier les textes du site & infos légales</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
            <Link to="/admin/articles" className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary text-sm transition-colors">
              <span>Publier un nouvel article</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Bonnes pratiques</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Les modifications de textes apparaissent en direct sur le site, sans rechargement.</li>
            <li>• Pour ajouter un bloc inédit sur l'accueil, utilisez <strong className="text-foreground">Sections d'accueil</strong>.</li>
            <li>• Mettez les contenus en brouillon (œil) pour les masquer avant publication.</li>
            <li>• Toutes les images sont stockées de façon sécurisée et publique.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
