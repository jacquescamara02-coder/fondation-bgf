import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePoles } from "@/hooks/usePoles";

const Poles = () => {
  const { poles } = usePoles();
  return (
    <section id="poles" className="py-24 md:py-32 bg-background">
      <div className="container-pro">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              Domaines d'intervention
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
              Sept pôles spécialisés, <em className="gradient-text not-italic">une vision</em> intégrée.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-lg">
            Une architecture pensée pour répondre globalement aux enjeux de santé, mobilité, approvisionnement, développement rural et habitat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poles.map((p, i) => (
            <Link
              key={p.slug}
              to={`/poles/${p.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all duration-500 ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
              aria-label={`Découvrir le pôle ${p.title}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
                  {p.tag}
                </span>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-2xl font-bold text-primary leading-tight">{p.title}</h3>
                  <span className="shrink-0 w-10 h-10 -mt-1 -mr-1 rounded-full bg-accent-soft group-hover:bg-accent text-accent group-hover:text-accent-foreground flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-gold">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" strokeWidth={2.2} />
                  </span>
                </div>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors">
                  Découvrir le pôle
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Poles;
