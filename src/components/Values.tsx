import { HandHeart, Award, Lightbulb, ShieldCheck, TrendingUp, MapPin } from "lucide-react";

const values = [
  { icon: HandHeart, title: "Solidarité", desc: "L'humain au centre de chaque action, attention particulière aux plus vulnérables." },
  { icon: Award, title: "Professionnalisme", desc: "Rigueur, sérieux et respect des standards de qualité dans chaque intervention." },
  { icon: Lightbulb, title: "Innovation", desc: "Solutions modernes, adaptées et évolutives face aux défis du contexte local." },
  { icon: ShieldCheck, title: "Intégrité", desc: "Transparence, responsabilité, éthique et redevabilité institutionnelle." },
  { icon: TrendingUp, title: "Impact durable", desc: "Résultats concrets, mesurables et pérennes, pour une transformation positive." },
  { icon: MapPin, title: "Proximité", desc: "Connaissance du terrain, écoute et collaboration avec les communautés." },
];

const Values = () => (
  <section id="valeurs" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

    <div className="container-pro relative">
      <div className="max-w-3xl mb-16">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Nos engagements</div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
          Six valeurs qui orientent chacune de <em className="gradient-text not-italic">nos décisions</em>.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10 rounded-2xl overflow-hidden border border-primary-foreground/10">
        {values.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-primary p-8 hover:bg-primary-glow transition-colors group">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent transition-colors">
              <Icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.8} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Values;
