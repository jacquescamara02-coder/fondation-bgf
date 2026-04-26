import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, Loader2, Lock, Mail, User as UserIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-bgf.png";

const signinSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(6, "6 caractères minimum").max(72),
});

const signupSchema = z.object({
  display_name: z.string().trim().min(2, "Nom trop court").max(80),
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Espace Admin — Fondation BGF";
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signinSchema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Connexion échouée", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Bienvenue", description: "Connexion réussie." });
    navigate("/admin");
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signupSchema.safeParse({
      display_name: fd.get("display_name"),
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast({ title: "Erreur", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: { display_name: parsed.data.display_name },
      },
    });
    if (error) {
      setLoading(false);
      toast({ title: "Inscription échouée", description: error.message, variant: "destructive" });
      return;
    }
    if (!data.session) {
      setLoading(false);
      toast({
        title: "Vérifiez votre email",
        description: "Confirmez votre adresse pour activer votre compte admin.",
      });
      return;
    }
    setLoading(false);
    toast({ title: "Compte créé", description: "Bienvenue dans votre espace." });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>

        <div className="bg-card rounded-3xl shadow-elegant border border-border overflow-hidden">
          <div className="px-8 pt-8 pb-4 text-center border-b border-border bg-gradient-to-b from-secondary/30 to-transparent">
            <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-soft p-2 ring-1 ring-black/5">
              <img src={logo} alt="Fondation BGF" className="w-full h-full object-contain" />
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">
              Espace Administrateur
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary mt-1">
              Fondation BGF
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Gérez le contenu de votre site en toute sécurité
            </p>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="px-8 pt-6 pb-8">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="signin">Se connecter</TabsTrigger>
              <TabsTrigger value="signup">S'inscrire</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignin} className="space-y-4">
                <Field id="si-email" name="email" type="email" label="Email" icon={Mail} placeholder="vous@exemple.com" />
                <Field id="si-password" name="password" type="password" label="Mot de passe" icon={Lock} placeholder="••••••••" />
                <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-accent-foreground hover:opacity-90 shadow-gold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Se connecter"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Pas de compte ?{" "}
                  <button type="button" onClick={() => setTab("signup")} className="text-accent hover:underline font-medium">
                    S'inscrire
                  </button>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <Field id="su-name" name="display_name" type="text" label="Nom complet" icon={UserIcon} placeholder="Jean Dupont" />
                <Field id="su-email" name="email" type="email" label="Email" icon={Mail} placeholder="vous@exemple.com" />
                <Field id="su-password" name="password" type="password" label="Mot de passe" icon={Lock} placeholder="8 caractères minimum" />
                <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-accent-foreground hover:opacity-90 shadow-gold">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Créer mon compte"}
                </Button>
                <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
                  Après création, l'accès au tableau de bord doit être autorisé par un administrateur.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  id, name, type, label, icon: Icon, placeholder,
}: {
  id: string; name: string; type: string; label: string;
  icon: React.ComponentType<{ className?: string }>; placeholder?: string;
}) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-xs font-medium text-foreground">{label}</Label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input id={id} name={name} type={type} placeholder={placeholder} required className="pl-10" />
    </div>
  </div>
);

export default Auth;