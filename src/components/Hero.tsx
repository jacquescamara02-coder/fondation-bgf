import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-community.jpg";
import { ArrowRight, Menu, Search, Compass, LayoutGrid, Sparkles, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { to: "/poles", icon: Compass, label: "Nos pôles", desc: "8 pôles d'expertise" },
  { to: "/vue-ensemble", icon: LayoutGrid, label: "Vue d'ensemble", desc: "Identité & mission" },
  { to: "/engagements", icon: Sparkles, label: "Nos engagements", desc: "Six valeurs fortes" },
  { to: "/contact", icon: Mail, label: "Nous contacter", desc: "Formulaire, FAQ, avis" },
];

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
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

      <div className="relative container-pro pt-32 pb-24 text-primary-foreground w-full flex flex-col items-center text-center">
        {/* Search bar (replaces badge) */}
        <div
          className="relative w-full max-w-xl mb-12 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goToPoles();
              setFocused(false);
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
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Rechercher un pôle : santé, automobile, agropastorale…"
              className="flex-1 bg-transparent outline-none text-sm md:text-[15px] text-primary-foreground placeholder:text-primary-foreground/55 py-1.5 text-left"
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

          {focused && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 max-w-3xl animate-fade-up">
              {matches.slice(0, 4).map((p) => (
                <a
                  key={p.title}
                  href="#poles"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    goToPoles();
                    setFocused(false);
                  }}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-foreground/8 hover:bg-primary-foreground/14 border border-primary-foreground/15 text-primary-foreground/85 text-xs font-medium transition-all"
                >
                  <span className="truncate max-w-[170px]">{p.title}</span>
                  <ArrowRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
              {matches.length === 0 && (
                <span className="text-xs text-primary-foreground/65 px-1">
                  Aucun résultat, appuyez sur Explorer pour voir tous les pôles.
                </span>
              )}
            </div>
          )}
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
      </div>

      {/* Scroll hint */}
      {/* Floating menu pill */}
      <a
        href="#about"
        aria-label="Ouvrir le menu de navigation"
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/25 hover:border-accent/60 shadow-elegant transition-all"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-gold text-accent-foreground shadow-gold group-hover:scale-105 transition-transform">
          <Menu className="w-4 h-4" strokeWidth={2.2} />
        </span>
        <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] font-semibold text-primary-foreground">
          Menu
        </span>
        <span className="hidden md:inline-block w-px h-4 bg-primary-foreground/25" />
        <span className="hidden md:inline text-[11px] tracking-wide text-primary-foreground/65 group-hover:text-accent transition-colors">
          Explorer la fondation
        </span>
      </a>
    </section>
  );
};

export default Hero;
