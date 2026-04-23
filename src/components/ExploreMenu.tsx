import { Link } from "react-router-dom";
import { Compass, Handshake, Sparkles, LayoutGrid, Mail, ArrowUpRight } from "lucide-react";

const items = [
  {
    to: "/poles",
    icon: Compass,
    title: "Découvrir nos pôles",
    desc: "Explorez les 8 pôles d'expertise de la Fondation BGF.",
  },
  {
    to: "/contact",
    icon: Handshake,
    title: "Devenir partenaire",
    desc: "Rejoignez nos partenaires institutionnels et stratégiques.",
  },
  {
    to: "/engagements",
    icon: Sparkles,
    title: "Nos engagements",
    desc: "Six valeurs fortes qui guident chacune de nos décisions.",
  },
  {
    to: "/vue-ensemble",
    icon: LayoutGrid,
    title: "Vue d'ensemble",
    desc: "Notre identité, notre mission et notre écosystème intégré.",
  },
  {
    to: "/contact",
    icon: Mail,
    title: "Nous contacter",
    desc: "Formulaire, avis, FAQ et localisation à Bangui.",
  },
];

const ExploreMenu = () => (
  <section id="explore" className="py-24 md:py-32 bg-background">
    <div className="container-pro">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
          Explorez la Fondation
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
          Choisissez votre <em className="gradient-text not-italic">parcours</em>.
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Naviguez à travers nos univers : pôles d'activités, engagements, vue d'ensemble et contact.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={title}
            to={to}
            className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant border border-border hover:border-accent/50 transition-all overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-accent-soft flex items-center justify-center mb-5 group-hover:bg-gradient-gold transition-all">
                <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.7} />
              </div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-primary leading-tight">
                  {title}
                </h3>
                <ArrowUpRight
                  className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:rotate-45 transition-all shrink-0 mt-1"
                  strokeWidth={2}
                />
              </div>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ExploreMenu;