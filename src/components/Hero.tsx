import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-community.jpg";
import { ArrowRight, ChevronDown, Search } from "lucide-react";

const poleSuggestions: { title: string; tag: string }[] = [
  { title: "Santé Maternelle et Infantile", tag: "À but non lucratif" },
  { title: "Cabinet BGF Consulting", tag: "Expertise" },
  { title: "Automobile", tag: "Mobilité & Logistique" },
  { title: "Import-Export", tag: "Commerce & Logistique" },
  { title: "Agropastorale", tag: "Développement rural" },
  { title: "Immobilière", tag: "Cadre de vie" },
  { title: "Pharmacie", tag: "Santé publique" },
];

const titleWords = ["Bâtir", "un", "avenir"];
const accentWord = "durable";
const tailWords = ["pour", "la", "Centrafrique"];

const stats = [
  { k: "7", v: "Pôles d'intervention" },
  { k: "24/7", v: "Engagement continu" },
  { k: "100%", v: "Vision multisectorielle" },
  { k: "RCA", v: "Zone d'action" },
];

const Particles = () => {
  // 18 particles with deterministic but varied positions/timings
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    left: `${(i * 53) % 100}%`,
    bottom: `${(i * 17) % 40}%`,
    size: 3 + ((i * 7) % 6),
    duration: 8 + ((i * 3) % 10),
    delay: (i * 0.6) % 10,
    opacity: 0.35 + ((i * 13) % 40) / 100,
  }));

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent animate-float-particle blur-[1px]"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setMounted(true);
  }, []);

  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? poleSuggestions.filter(
        (p) =>
          p.title.toLowerCase().includes(normalized) ||
          p.tag.toLowerCase().includes(normalized),
      )
    : poleSuggestions;

  const goToPoles = () => {
    const el = document.getElementById("poles");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Ken Burns background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Communautés centrafricaines au lever du soleil"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Floating gold particles */}
      <Particles />

      {/* Subtle radial accent glow */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
      />

      <div className="relative container-pro pt-32 pb-24 text-primary-foreground w-full">
        {/* Search bar (replaces badge) */}
        <div
          className="relative max-w-xl mb-8 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToPoles();
            }}
            role="search"
            aria-label="Rechercher un pôle d'intervention"
            className="group relative flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/25 backdrop-blur-md shadow-elegant focus-within:border-accent/70 focus-within:bg-primary-foreground/15 transition-all"
          >
            <Search className="w-4 h-4 text-accent shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un pôle : santé, automobile, agropastorale…"
              className="flex-1 bg-transparent outline-none text-sm md:text-[15px] text-primary-foreground placeholder:text-primary-foreground/55 py-1.5"
              aria-label="Rechercher un pôle"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-gold text-accent-foreground text-xs md:text-sm font-semibold shadow-gold hover:scale-[1.03] transition-transform"
            >
              Explorer
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-2 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60 pr-1">
              Accès rapide
            </span>
            {(normalized ? matches : poleSuggestions.slice(0, 4)).slice(0, 4).map((p) => (
              <a
                key={p.title}
                href="#poles"
                onClick={() => goToPoles()}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/8 hover:bg-primary-foreground/14 border border-primary-foreground/15 text-primary-foreground/85 text-xs font-medium transition-all"
              >
                <span className="truncate max-w-[170px]">{p.title}</span>
                <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
            {normalized && matches.length === 0 && (
              <span className="text-xs text-primary-foreground/65 px-1">
                Aucun résultat, appuyez sur Explorer pour voir tous les pôles.
              </span>
            )}
          </div>
        </div>

        {/* Animated headline (word reveal) */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] max-w-4xl text-balance">
          {mounted &&
            titleWords.map((w, i) => (
              <span
                key={`t-${i}`}
                className="animate-word-reveal mr-3 md:mr-5"
                style={{ animationDelay: `${0.2 + i * 0.12}s` }}
              >
                {w}
              </span>
            ))}
          {mounted && (
            <span
              className="animate-word-reveal italic mr-3 md:mr-5"
              style={{ animationDelay: `${0.2 + titleWords.length * 0.12}s` }}
            >
              <span className="text-shimmer">{accentWord}</span>
            </span>
          )}
          {mounted &&
            tailWords.map((w, i) => (
              <span
                key={`b-${i}`}
                className="animate-word-reveal mr-3 md:mr-5"
                style={{ animationDelay: `${0.2 + (titleWords.length + 1 + i) * 0.12}s` }}
              >
                {w}
              </span>
            ))}
        </h1>

        <p
          className="mt-8 max-w-2xl text-lg md:text-xl text-primary-foreground/85 leading-relaxed animate-fade-up"
          style={{ animationDelay: "1.2s" }}
        >
          La Fondation Babadjo Groupe & Frère agit au cœur des communautés à travers une approche multisectorielle :
          santé, expertise, mobilité, agropastorale, immobilier et pharmacie.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-4 animate-fade-up"
          style={{ animationDelay: "1.4s" }}
        >
          <a
            href="#poles"
            className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-accent-foreground font-semibold shadow-gold hover:scale-105 transition-transform animate-glow-pulse overflow-hidden"
          >
            <span className="relative z-10">Découvrir nos pôles</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 hover:border-primary-foreground/70 transition-all backdrop-blur-sm"
          >
            Devenir partenaire
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
          {stats.map((s, i) => (
            <div
              key={s.v}
              className="border-l-2 border-accent/70 pl-4 animate-count-pop hover:border-accent hover:translate-x-1 transition-all"
              style={{ animationDelay: `${1.6 + i * 0.15}s` }}
            >
              <div className="font-serif text-3xl md:text-4xl font-bold text-accent">{s.k}</div>
              <div className="text-xs md:text-sm text-primary-foreground/75 uppercase tracking-wider mt-1">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Faire défiler"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary-foreground/70 hover:text-accent transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <ChevronDown className="w-5 h-5 animate-scroll-hint" />
      </a>
    </section>
  );
};

export default Hero;
