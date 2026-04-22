import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Aïssa Bangoura",
    role: "Responsable programme — ONG Internationale",
    text: "La Fondation BGF a démontré un professionnalisme remarquable lors de notre dernière mission de santé maternelle. Une équipe rigoureuse, à l'écoute et profondément engagée.",
  },
  {
    name: "Jean-Pierre Mboutou",
    role: "Directeur, Agence onusienne",
    text: "Un partenaire de confiance pour la logistique de terrain. Leur flotte 4x4 et leur réactivité ont fait la différence sur nos opérations en zones reculées.",
  },
  {
    name: "Mariam Touré",
    role: "Bailleur de fonds régional",
    text: "La transparence et la rigueur de la Fondation BGF dans la gestion de nos financements en font un acteur incontournable du développement en RCA.",
  },
  {
    name: "Bernard Kossi",
    role: "Entrepreneur, Bangui",
    text: "L'accompagnement du Cabinet BGF Consulting a transformé notre vision stratégique. Des analyses fines, des conseils concrets, des résultats mesurables.",
  },
  {
    name: "Sœur Élisabeth Ndoma",
    role: "Centre de santé communautaire",
    text: "Grâce au programme Santé Maternelle, nos mères et nouveau-nés bénéficient d'un suivi de qualité. Un engagement social qui change réellement des vies.",
  },
  {
    name: "Patrick Yaouba",
    role: "Coordinateur projet, ONG locale",
    text: "Leur approche multisectorielle est unique en RCA. Une fondation qui comprend les enjeux du terrain et qui agit avec impact.",
  },
];

const Card = ({ t }: { t: typeof testimonials[number] }) => (
  <div className="shrink-0 w-[340px] md:w-[420px] mx-3 bg-card rounded-2xl shadow-soft border border-border/60 p-7 flex flex-col">
    <Quote className="w-9 h-9 text-accent/40 mb-4" strokeWidth={1.5} />
    <p className="text-foreground/85 leading-relaxed text-[15px] mb-6 flex-1">"{t.text}"</p>
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </div>
    <div className="border-t border-border pt-4">
      <div className="font-serif font-bold text-primary">{t.name}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
    </div>
  </div>
);

const Testimonials = () => {
  const loop = [...testimonials, ...testimonials];
  return (
    <section id="avis" className="py-24 md:py-32 bg-gradient-soft overflow-hidden">
      <div className="container-pro mb-14">
        <div className="max-w-3xl text-center mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Avis clients</div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
            Ils nous accordent leur <em className="gradient-text not-italic">confiance</em>.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">
            Partenaires institutionnels, ONG, bailleurs et bénéficiaires témoignent de l'impact de notre engagement.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee w-max">
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
