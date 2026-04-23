import { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Briefcase, MessageSquareQuote, Newspaper,
  Type, Images, LogOut, Loader2, ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-bgf.png";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Vue d'ensemble" },
  { to: "/admin/poles", icon: Briefcase, label: "Pôles" },
  { to: "/admin/testimonials", icon: MessageSquareQuote, label: "Témoignages" },
  { to: "/admin/articles", icon: Newspaper, label: "Articles" },
  { to: "/admin/site-texts", icon: Type, label: "Textes du site" },
  { to: "/admin/gallery", icon: Images, label: "Galerie" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-soft">
          <h2 className="font-serif text-2xl font-bold text-primary">Accès refusé</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Vous êtes connecté(e), mais votre compte n'a pas les droits administrateur.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={signOut} variant="outline">Se déconnecter</Button>
            <Button asChild className="bg-gradient-gold text-accent-foreground"><Link to="/">Accueil</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 flex">
      <aside className="w-64 bg-card border-r border-border flex flex-col sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-white p-1 ring-1 ring-black/5">
            <img src={logo} alt="BGF" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-serif font-bold text-primary text-sm leading-tight">Fondation BGF</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Admin</div>
          </div>
        </Link>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Voir le site
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
          <div className="px-3 pt-1 text-[10px] text-muted-foreground truncate">
            {user?.email}
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;