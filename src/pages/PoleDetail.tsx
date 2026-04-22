import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Compass, HandHeart, Heart, Layers, Sparkles, Target, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPoleBySlug, poles } from "@/data/poles";

const PoleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const pole = slug ? getPoleBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (pole) {
      document.title = `${pole.title} — Fondation BGF`;
    }
  }, [pole]);

  const navigateToHash = (hash: string) => (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    // else: let Link navigate to "/", and the home page will load at top.
    // We'll set the hash so a small effect can scroll after navigation.
    sessionStorage.setItem("scrollToHash", hash);
  };

  if (!pole) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="container-pro py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-primary mb-4">Pôle introuvable</h1>
          <p className="text-muted-foreground mb-8">Le pôle demandé n'existe pas.</p>
          <Link
            to="/#poles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux pôles
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const d = pole.details;
  const otherPoles = poles.filter((p) => p.slug !== pole.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={pole.img} alt={pole.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/85 to-primary/70" />
        </div>
        <div className="container-pro relative">
          <Link
            to="/#poles"
            onClick={navigateToHash("poles")}
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/85 hover:text-accent transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux pôles
          </Link>
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider mb-4">
            {pole.tag}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground leading-tight max-w-4xl">
            {pole.title}
          </h1>
          <p className="mt-5 text-primary-foreground/90 text-lg max-w-3xl leading-relaxed">{pole.desc}</p>
        </div>
      </section>

      {/* Body */}
      <section className="container-pro py-16 md:py-20 max-w-5xl">
        {d ? (
          <div className="space-y-12">
            {d.intro.length > 0 && (
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {d.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {d.beneficiaires && (
              <div className="bg-accent-soft/40 border-l-4 border-accent rounded-r-xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <HandHeart className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="font-serif text-2xl font-bold text-primary">
                    {d.beneficiairesLabel ?? "Bénéficiaires prioritaires"}
                  </h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {d.beneficiaires.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.objectifs.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Target className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Objectifs</h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {d.objectifs.map((o) => (
                    <li key={o} className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 text-[15px] text-foreground leading-snug">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.domaines && d.domaines.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Layers className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Domaines d'intervention</h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {d.domaines.map((x) => (
                    <li key={x} className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 text-[15px] text-foreground leading-snug">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.approche.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Compass className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                    {pole.title === "Automobile" || pole.title === "Import-Export"
                      ? "Clientèle"
                      : "Approche"}
                  </h2>
                </div>
                {d.approcheIntro && (
                  <p className="text-[15px] text-muted-foreground mb-4">{d.approcheIntro}</p>
                )}
                <ul className="space-y-2.5">
                  {d.approche.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-[15px] text-foreground">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.valeurAjoutee && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Valeur ajoutée</h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {d.valeurAjoutee.map((v) => (
                    <li key={v} className="flex items-start gap-3 p-4 rounded-lg border border-accent/30 bg-accent-soft/30 text-[15px] text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.impact && d.impact.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Impact attendu</h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {d.impact.map((it) => (
                    <li key={it} className="flex items-start gap-3 p-4 rounded-lg border border-accent/30 bg-accent-soft/30 text-[15px] text-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {d.engagement && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-7 md:p-9 text-primary-foreground">
                <Heart className="absolute -top-4 -right-4 w-32 h-32 text-accent/20" strokeWidth={1.2} />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">Notre engagement</div>
                  <p className="text-base md:text-lg leading-relaxed text-primary-foreground/95">{d.engagement}</p>
                </div>
              </div>
            )}

            {d.positionnement && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-7 md:p-9 text-primary-foreground">
                <Heart className="absolute -top-4 -right-4 w-32 h-32 text-accent/20" strokeWidth={1.2} />
                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">Positionnement</div>
                  <p className="text-base md:text-lg leading-relaxed text-primary-foreground/95">{d.positionnement}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">Description détaillée à venir.</p>
        )}

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            to="/#contact"
            onClick={navigateToHash("contact")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-accent-foreground font-semibold shadow-gold hover:scale-[1.03] transition-transform"
          >
            Échanger sur ce pôle
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/#poles"
            onClick={navigateToHash("poles")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-muted/50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Voir tous les pôles
          </Link>
        </div>
      </section>

      {/* Other poles */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container-pro">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">Découvrir d'autres pôles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherPoles.map((p) => (
              <Link
                key={p.slug}
                to={`/poles/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg font-bold text-primary leading-tight">{p.title}</h3>
                    <ArrowUpRight className="w-5 h-5 text-accent shrink-0 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default PoleDetail;