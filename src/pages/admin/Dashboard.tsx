import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MessageSquareQuote, Newspaper, Images, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Counts = { poles: number; testimonials: number; articles: number; gallery: number };

const tiles = [
  { key: "poles" as const, to: "/admin/poles", label: "Pôles", icon: Briefcase },
  { key: "testimonials" as const, to: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote },
  { key: "articles" as const, to: "/admin/articles", label: "Articles", icon: Newspaper },
  { key: "gallery" as const, to: "/admin/gallery", label: "Galerie", icon: Images },
];

const Dashboard = () => {
  const [counts, setCounts] = useState<Counts>({ poles: 0, testimonials: 0, articles: 0, gallery: 0 });

  useEffect(() => {
    document.title = "Tableau de bord — Admin BGF";
    (async () => {
      const [p, t, a, g] = await Promise.all([
        supabase.from("poles").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("articles").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        poles: p.count ?? 0,
        testimonials: t.count ?? 0,
        articles: a.count ?? 0,
        gallery: g.count ?? 0,
      });
    })();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Administration</div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mt-1">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Gérez le contenu de votre site Fondation BGF : pôles, témoignages, articles, textes éditoriaux et galerie d'images.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map(({ key, to, label, icon: Icon }) => (
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
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-card border border-border rounded-2xl p-6">
        <h2 className="font-serif text-lg font-bold text-primary">Bien démarrer</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Importez vos pôles existants depuis la section <strong className="text-foreground">Pôles</strong>.</li>
          <li>• Ajoutez vos premiers témoignages clients pour les afficher sur la page d'accueil.</li>
          <li>• Publiez des articles d'actualité depuis la section <strong className="text-foreground">Articles</strong>.</li>
          <li>• Personnalisez les textes principaux du site (Hero, À propos…) sans toucher au code.</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;