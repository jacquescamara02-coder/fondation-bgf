import { Target, Eye, Sparkles } from "lucide-react";
import { useSiteTexts } from "@/hooks/useSiteTexts";

const About = () => {
  const { t } = useSiteTexts();
  const cards = [
    { icon: Eye, title: "Vision", text: t("about_vision", "Contribuer à l'émergence de communautés résilientes, inclusives, autonomes et en bonne santé.") },
    { icon: Target, title: "Mission", text: t("about_mission", "Promouvoir l'amélioration durable des conditions de vie et l'accès aux services essentiels.") },
    { icon: Sparkles, title: "Approche", text: t("about_approche", "Multisectorielle, basée sur les besoins, orientée résultats et profondément partenariale.") },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-soft">
    <div className="container-pro">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t("about_eyebrow", "Présentation institutionnelle")}</div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
            {t("about_title", "Une organisation multisectorielle au service du progrès.")}
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{t("about_paragraph_1", "")}</p>
          <p>{t("about_paragraph_2", "")}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {cards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-shadow border-t-4 border-accent group"
          >
            <div className="w-14 h-14 rounded-xl bg-accent-soft flex items-center justify-center mb-5 group-hover:bg-gradient-gold transition-all">
              <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" strokeWidth={1.7} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default About;
