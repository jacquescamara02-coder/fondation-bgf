import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePoles } from "@/hooks/usePoles";

const PolesIndex = () => {
  const { poles } = usePoles();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = "Nos 8 pôles d'activités — Fondation BGF";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

        <div className="container-pro relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/85 hover:text-accent transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Écosystème intégré
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground leading-tight text-balance">
              Nos <span className="gradient-text">8 pôles</span> d'activités
            </h1>
            <p className="mt-5 text-primary-foreground/85 text-lg leading-relaxed max-w-2xl">
              Découvrez l'ensemble de nos domaines d'expertise, articulés autour d'une vision commune : générer un impact durable en République Centrafricaine.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container-pro py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poles.map((p, i) => (
            <Link
              key={p.slug}
              to={`/poles/${p.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all duration-500 flex flex-col"
              aria-label={`Découvrir le pôle ${p.title}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
                  {p.tag}
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-[10px] font-bold tracking-wider border border-primary-foreground/20">
                  0{i + 1}
                </span>
              </div>
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-2xl font-bold text-primary leading-tight">{p.title}</h3>
                  <span className="shrink-0 w-10 h-10 -mt-1 -mr-1 rounded-full bg-accent-soft group-hover:bg-accent text-accent group-hover:text-accent-foreground flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-gold">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" strokeWidth={2.2} />
                  </span>
                </div>
                <p className="text-muted-foreground text-[15px] leading-relaxed flex-1">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors">
                  Voir les détails
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/30 py-16 md:py-20">
        <div className="container-pro max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
            Un projet, une collaboration ou une question ?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Échangeons sur la manière dont nos pôles peuvent répondre à vos enjeux.
          </p>
          <Link
            to="/#contact"
            onClick={() => sessionStorage.setItem("scrollToHash", "contact")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-accent-foreground font-semibold shadow-gold hover:scale-[1.03] transition-transform"
          >
            Nous contacter
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default PolesIndex;
