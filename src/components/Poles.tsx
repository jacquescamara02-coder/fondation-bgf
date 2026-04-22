import sante from "@/assets/pole-sante.jpg";
import consulting from "@/assets/pole-consulting.jpg";
import auto from "@/assets/pole-auto.jpg";
import importExp from "@/assets/pole-import.jpg";
import agro from "@/assets/pole-agro.jpg";
import immo from "@/assets/pole-immo.jpg";
import pharma from "@/assets/pole-pharma.jpg";
import { ArrowUpRight } from "lucide-react";

const poles = [
  {
    img: sante,
    tag: "À but non lucratif",
    title: "Santé Maternelle & Infantile",
    desc: "Programme social prioritaire pour la santé, la protection et le bien-être des mères, nouveau-nés, nourrissons et enfants.",
  },
  {
    img: consulting,
    tag: "Expertise",
    title: "Cabinet BGF Consulting",
    desc: "Évaluations sanitaires, études, analyses fiables et accompagnement des bailleurs, institutions et partenaires.",
  },
  {
    img: auto,
    tag: "Logistique",
    title: "Automobile",
    desc: "Flotte de véhicules 4x4 destinée à la location pour les opérations de terrain, programmes humanitaires et institutions.",
  },
  {
    img: importExp,
    tag: "Approvisionnement",
    title: "Import-Export",
    desc: "Facilitateur fiable et stratégique pour les besoins d'urgence comme pour les approvisionnements réguliers.",
  },
  {
    img: agro,
    tag: "Développement rural",
    title: "Agropastorale",
    desc: "Autonomisation économique, création d'emplois ruraux et renforcement de la résilience des communautés.",
  },
  {
    img: immo,
    tag: "Cadre de vie",
    title: "Immobilière",
    desc: "Habitat, infrastructures et développement immobilier pour une construction et gestion responsable.",
  },
  {
    img: pharma,
    tag: "Santé publique",
    title: "Pharmacie",
    desc: "Promotion de l'accès aux produits pharmaceutiques essentiels et services liés à la santé.",
  },
];

const Poles = () => (
  <section id="poles" className="py-24 md:py-32 bg-background">
    <div className="container-pro">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Domaines d'intervention</div>
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
          <article
            key={p.title}
            className={`group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-elegant transition-all duration-500 ${
              i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
            }`}
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
                <ArrowUpRight className="w-5 h-5 text-accent shrink-0 group-hover:rotate-45 transition-transform" />
              </div>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Poles;
