import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-community.jpg";
import ecosystemImg from "@/assets/hero-ecosystem.jpg";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  { src: heroImg, alt: "Communautés centrafricaines au lever du soleil" },
  { src: ecosystemImg, alt: "Écosystème des pôles de la Fondation BGF" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
  <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden">
    {slides.map((s, i) => (
      <img
        key={s.src}
        src={s.src}
        alt={s.alt}
        width={1920}
        height={1280}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out",
          i === current ? "opacity-100" : "opacity-0"
        )}
      />
    ))}
    <div className="absolute inset-0 bg-gradient-hero" />

    <div className="relative container-pro pt-32 pb-20 text-primary-foreground animate-fade-up">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-6">
        <ShieldCheck className="w-4 h-4 text-accent" />
        <span className="text-xs font-medium tracking-wide uppercase">RCCM CA/BG/2025B413 — République Centrafricaine</span>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] max-w-4xl text-balance">
        Bâtir un avenir <span className="gradient-text italic">durable</span> pour la Centrafrique
      </h1>

      <p className="mt-8 max-w-2xl text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
        La Fondation Babadjo Groupe & Frère agit au cœur des communautés à travers une approche multisectorielle :
        santé, expertise, mobilité, agropastorale, immobilier et pharmacie.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#poles"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-accent-foreground font-semibold shadow-gold hover:scale-105 transition-transform"
        >
          Découvrir nos pôles <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
        >
          Devenir partenaire
        </a>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
        {[
          { k: "7", v: "Pôles d'intervention" },
          { k: "99", v: "Ans d'engagement" },
          { k: "100%", v: "Vision multisectorielle" },
          { k: "RCA", v: "Zone d'action" },
        ].map((s) => (
          <div key={s.v} className="border-l-2 border-accent/70 pl-4">
            <div className="font-serif text-3xl md:text-4xl font-bold text-accent">{s.k}</div>
            <div className="text-xs md:text-sm text-primary-foreground/75 uppercase tracking-wider mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === current ? "w-10 bg-accent" : "w-4 bg-primary-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  </section>
  );
};

export default Hero;
