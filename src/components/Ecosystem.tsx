import ecosystemImg from "@/assets/ecosystem-bgf.jpeg";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Ecosystem = () => (
  <section id="ecosysteme" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

    <div className="container-pro relative">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
          Vue d'ensemble
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance mb-6">
          Un <em className="gradient-text not-italic">écosystème intégré</em> au service du développement.
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          La FONDATION BGF rassemble huit pôles d'expertise complémentaires, articulés autour d'une vision commune : générer un impact durable en République Centrafricaine 🇨🇫.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-4 md:-inset-8 bg-gradient-gold opacity-10 blur-3xl rounded-full" />
        <div className="relative bg-card rounded-3xl p-6 md:p-10 shadow-elegant border border-border">
          <img
            src={ecosystemImg}
            alt="Écosystème de la Fondation BGF — Pharmacie, Immobilière, Automobile, Logistique, Santé maternelle et infantile, Agropastorale, Import-Export, Cabinet Consulting"
            className="w-full h-auto object-contain rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          to="/poles"
          className="group relative inline-flex items-center gap-5 px-8 py-6 md:px-10 md:py-7 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant hover:border-accent/50 transition-all"
          aria-label="Voir les 8 pôles d'activités"
        >
          <div className="text-left">
            <div className="font-serif text-4xl md:text-5xl font-bold gradient-text leading-none mb-2">
              8
            </div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
              Pôles d'activités
            </div>
          </div>
          <span className="w-12 h-12 rounded-full bg-accent-soft group-hover:bg-accent text-accent group-hover:text-accent-foreground flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-gold">
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" strokeWidth={2.2} />
          </span>
        </Link>
      </div>

      <div className="mt-16 flex flex-col items-center text-center">
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-6">
          Discutons ensemble de votre projet et explorons les synergies possibles avec notre écosystème.
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-accent-foreground font-semibold text-base shadow-gold hover:scale-[1.03] transition-transform"
        >
          Nous contacter maintenant
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default Ecosystem;