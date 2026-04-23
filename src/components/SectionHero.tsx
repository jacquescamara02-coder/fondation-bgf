import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface SectionHeroProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}

const SectionHero = ({ eyebrow, title, accent, description }: SectionHeroProps) => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-navy text-primary-foreground overflow-hidden">
    <div
      aria-hidden
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
    />
    <div className="container-pro relative">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-primary-foreground/75 hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à l'accueil
      </Link>
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
          {eyebrow}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
          {title}{" "}
          {accent && <em className="gradient-text not-italic">{accent}</em>}
        </h1>
        {description && (
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  </section>
);

export default SectionHero;