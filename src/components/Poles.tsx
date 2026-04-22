import sante from "@/assets/pole-sante-maternelle.jpg";
import consulting from "@/assets/pole-consulting-bgf.jpg";
import auto from "@/assets/pole-automobile-bgf.jpg";
import importExp from "@/assets/pole-import-export-bgf.jpg";
import agro from "@/assets/pole-agro.jpg";
import immo from "@/assets/pole-immobiliere-bgf.jpg";
import pharma from "@/assets/pole-pharma.jpg";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Heart, Target, Compass, HandHeart, Sparkles, CheckCircle2 } from "lucide-react";

type Pole = {
  img: string;
  tag: string;
  title: string;
  desc: string;
  details?: {
    intro: string[];
    beneficiaires?: string[];
    beneficiairesLabel?: string;
    objectifs: string[];
    approche: string[];
    approcheIntro?: string;
    valeurAjoutee?: string[];
    engagement?: string;
    positionnement?: string;
  };
};

const poles: Pole[] = [
  {
    img: sante,
    tag: "À but non lucratif",
    title: "Santé Maternelle et Infantile",
    desc: "Programme social prioritaire entièrement à but non lucratif, dédié à l'amélioration de la santé des mères et des enfants à travers une approche intégrée.",
    details: {
      intro: [
        "Ce programme prioritaire de la FONDATION BGF est entièrement à but non lucratif et dédié à l'amélioration de la santé des mères et des enfants.",
        "Il repose sur une approche intégrée combinant prévention, soins, accompagnement et assistance sociale, afin de répondre aux besoins des populations les plus vulnérables.",
        "Dans ce cadre, la fondation met en œuvre des actions solidaires de dotations gratuites au profit des publics cibles, en particulier ceux vivant dans des situations de précarité. Ces interventions visent à réduire les inégalités d'accès aux soins et à renforcer le bien-être des familles.",
      ],
      beneficiaires: [
        "Les femmes enceintes",
        "Les femmes allaitantes",
        "Les jeunes filles en âge de procréer",
      ],
      objectifs: [
        "Réduire la mortalité maternelle et infantile",
        "Améliorer la qualité des soins néonataux et obstétricaux",
        "Promouvoir la santé reproductive et familiale",
        "Renforcer l'accès équitable aux services de santé pour les populations vulnérables",
        "Mettre en place des programmes de distribution gratuite de kits et intrants essentiels (soins, hygiène, nutrition)",
        "Sensibiliser les communautés aux bonnes pratiques de santé maternelle et infantile",
      ],
      approche: [
        "Actions communautaires et campagnes de sensibilisation",
        "Appui aux structures de santé",
        "Distribution gratuite de matériels et produits essentiels",
        "Partenariats avec institutions publiques et organisations internationales",
      ],
      engagement:
        "La FONDATION BGF s'engage à garantir un impact durable en plaçant la mère et l'enfant au cœur de ses priorités, dans une logique de solidarité, équité et dignité humaine.",
    },
  },
  {
    img: consulting,
    tag: "Expertise",
    title: "Cabinet BGF Consulting",
    desc: "Pôle d'expertise stratégique en santé publique, nutrition et développement des systèmes de santé, au service des institutions et partenaires.",
    details: {
      intro: [
        "Le Cabinet BGF Consulting est le pôle d'expertise stratégique de la FONDATION BGF, spécialisé en santé publique, nutrition et développement des systèmes de santé.",
        "Il s'appuie sur une expertise multidisciplinaire de haut niveau couvrant la santé publique et communautaire, la nutrition et la sécurité alimentaire, l'évaluation, l'analyse des besoins et les audits hospitaliers, la recherche scientifique en santé, ainsi que la mise en place et l'optimisation de structures sanitaires performantes.",
        "Le cabinet accompagne les institutions publiques, ONG, partenaires techniques et financiers ainsi que les gouvernements dans la conception, la mise en œuvre et l'évaluation de programmes de santé à fort impact.",
      ],
      beneficiairesLabel: "Domaines d'expertise",
      beneficiaires: [
        "Analyse des besoins sanitaires et nutritionnels",
        "Évaluation de projets et programmes de santé",
        "Audit des hôpitaux et des structures sanitaires",
        "Renforcement des systèmes de santé",
        "Recherche opérationnelle et scientifique en santé",
        "Appui à la mise en place de structures sanitaires performantes",
        "Audit, conseil et accompagnement des bailleurs de fonds",
        "Enquêtes sanitaires et nutritionnelles",
        "Formation en prévention et promotion de la santé",
      ],
      objectifs: [
        "Fournir une expertise technique de haut niveau en santé publique et nutrition",
        "Améliorer la performance et la qualité des services de santé",
        "Renforcer les capacités institutionnelles et opérationnelles",
        "Accompagner les partenaires dans la prise de décision basée sur les données",
        "Contribuer à l'élaboration de politiques et stratégies sanitaires efficaces",
        "Garantir la qualité, la transparence et l'impact des financements santé",
      ],
      approcheIntro: "Le Cabinet adopte une approche rigoureuse fondée sur :",
      approche: [
        "Les données probantes (evidence-based)",
        "Les standards internationaux (OMS, UNICEF, etc.)",
        "Une forte orientation terrain et opérationnelle",
        "Une collaboration étroite avec les parties prenantes",
      ],
      valeurAjoutee: [
        "Expertise technique reconnue",
        "Approche intégrée santé–nutrition",
        "Expérience en contextes fragiles et à ressources limitées",
        "Capacité à travailler avec des partenaires internationaux",
      ],
    },
  },
  {
    img: auto,
    tag: "Mobilité & Logistique",
    title: "Automobile",
    desc: "Solution complète de mobilité et de logistique : flotte de véhicules 4x4 pour institutions, ONG, administrations et entreprises.",
    details: {
      intro: [
        "Le pôle Automobile de la FONDATION BGF incarne une solution complète de mobilité et de logistique adaptée aux contextes opérationnels exigeants, notamment en République Centrafricaine.",
        "Nous disposons d'une gamme variée de véhicules 4x4 de tout type, destinés à la location et à la mise à disposition opérationnelle, au service des institutions internationales, ONG et partenaires techniques et financiers, administrations publiques, entreprises et particuliers.",
        "Avec une expertise de plus de 5 ans, le pôle Automobile s'est imposé comme une référence nationale en matière de fiabilité, disponibilité et qualité de service, notamment dans les zones à accès difficile.",
      ],
      beneficiairesLabel: "Services proposés",
      beneficiaires: [
        "Location de véhicules 4x4 (courte et longue durée)",
        "Mise à disposition avec ou sans chauffeur",
        "Transport logistique et missions terrain",
        "Appui aux opérations humanitaires et projets de développement",
      ],
      objectifs: [
        "Fournir des services de transport sécurisés, fiables et adaptés aux terrains difficiles",
        "Améliorer la mobilité des acteurs humanitaires, institutionnels et économiques",
        "Soutenir les opérations logistiques sur l'ensemble du territoire",
        "Garantir une disponibilité continue des véhicules pour les missions critiques",
        "Offrir des solutions flexibles et professionnelles aux partenaires",
      ],
      approcheIntro: "Notre clientèle couvre l'ensemble des acteurs nationaux et internationaux :",
      approche: [
        "Institutions internationales",
        "ONG et partenaires techniques et financiers",
        "Administrations publiques (État)",
        "Entreprises et particuliers",
      ],
      valeurAjoutee: [
        "Flotte de véhicules 4x4 adaptés aux réalités locales",
        "Plus de 5 ans d'expérience terrain",
        "Fiabilité reconnue par les partenaires",
        "Réactivité et flexibilité opérationnelle",
        "Connaissance approfondie du contexte centrafricain",
      ],
      positionnement:
        "Aujourd'hui, FONDATION BGF AUTOMOBILE est considérée comme une référence en République Centrafricaine dans le domaine de la mobilité et du transport professionnel.",
    },
  },
  {
    img: importExp,
    tag: "Commerce & Logistique",
    title: "Import-Export",
    desc: "Fourniture de biens et services dans tous les domaines, avec rapidité, fiabilité et un réseau de partenaires nationaux et internationaux.",
    details: {
      intro: [
        "Le pôle Import-Export de la FONDATION BGF est spécialisé dans la fourniture de biens et services dans tous les domaines, avec un engagement fort en matière de rapidité, fiabilité et sérieux en République Centrafricaine.",
        "Grâce à un réseau de partenaires nationaux et internationaux, ce secteur assure la livraison de produits diversifiés adaptés aux besoins des institutions internationales, ONG, partenaires techniques et financiers, administrations publiques, entreprises et particuliers.",
        "Le pôle se positionne comme un facilitateur clé des échanges commerciaux et logistiques, capable de répondre efficacement aux demandes dans des délais optimisés.",
      ],
      beneficiairesLabel: "Services proposés",
      beneficiaires: [
        "Importation et exportation de biens divers",
        "Approvisionnement multisectoriel (santé, logistique, équipements, etc.)",
        "Livraison rapide sur l'ensemble du territoire",
        "Gestion logistique et coordination des commandes",
        "Appui aux projets humanitaires et institutionnels",
      ],
      objectifs: [
        "Développer et sécuriser les échanges commerciaux internationaux",
        "Assurer la fourniture rapide et fiable de biens dans tous les secteurs",
        "Faciliter la logistique et la chaîne d'approvisionnement",
        "Promouvoir les produits locaux sur les marchés internationaux",
        "Répondre aux besoins spécifiques des partenaires avec professionnalisme",
      ],
      approcheIntro: "Notre clientèle couvre l'ensemble des acteurs nationaux et internationaux :",
      approche: [
        "Institutions internationales",
        "ONG et partenaires techniques et financiers",
        "Administrations publiques",
        "Entreprises et particuliers",
      ],
      valeurAjoutee: [
        "Capacité à livrer dans tous les domaines",
        "Service rapide, fiable et professionnel",
        "Connaissance du contexte et du marché en RCA",
        "Réseau de partenaires locaux et internationaux",
        "Flexibilité et adaptation aux besoins des clients",
      ],
      positionnement:
        "Aujourd'hui, FONDATION BGF IMPORT-EXPORT est reconnue pour son efficacité, sa réactivité et son sérieux, faisant d'elle un acteur de confiance en République Centrafricaine dans le domaine du commerce et de la logistique.",
    },
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
    desc: "Développement de logements modernes, accessibles et durables, contribuant à l'amélioration du cadre de vie.",
    details: {
      intro: [
        "Le pôle Immobilière de la FONDATION BGF œuvre pour le développement de logements modernes, accessibles et durables, contribuant ainsi à l'amélioration du cadre de vie des populations.",
        "À travers une approche responsable et structurée, ce pôle conçoit, réalise et gère des infrastructures pensées pour répondre aux besoins d'habitat d'aujourd'hui tout en anticipant les enjeux d'urbanisation de demain.",
      ],
      objectifs: [
        "Construire et gérer des infrastructures modernes",
        "Favoriser l'accès au logement",
        "Participer à l'urbanisation durable",
      ],
      approche: [],
    },
  },
  {
    img: pharma,
    tag: "Santé publique",
    title: "Pharmacie",
    desc: "Promotion de l'accès aux produits pharmaceutiques essentiels et services liés à la santé.",
  },
];

const Poles = () => {
  const [activePole, setActivePole] = useState<Pole | null>(null);

  return (
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
                {p.details ? (
                  <button
                    type="button"
                    onClick={() => setActivePole(p)}
                    aria-label={`En savoir plus sur ${p.title}`}
                    className="shrink-0 w-10 h-10 -mt-1 -mr-1 rounded-full bg-accent-soft hover:bg-accent text-accent hover:text-accent-foreground flex items-center justify-center transition-all hover:scale-110 hover:shadow-gold"
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" strokeWidth={2.2} />
                  </button>
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-accent shrink-0 group-hover:rotate-45 transition-transform" />
                )}
              </div>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{p.desc}</p>
              {p.details && (
                <button
                  type="button"
                  onClick={() => setActivePole(p)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/btn"
                >
                  Lire la description complète
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>

    <Dialog open={!!activePole} onOpenChange={(open) => !open && setActivePole(null)}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-card">
        {activePole?.details && (
          <>
            <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
              <img
                src={activePole.img}
                alt={activePole.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider mb-3">
                  {activePole.tag}
                </span>
                <DialogHeader className="space-y-0">
                  <DialogTitle className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground leading-tight text-left">
                    {activePole.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-8">
              <DialogDescription asChild>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  {activePole.details.intro.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </DialogDescription>

              {activePole.details.beneficiaires && (
                <div className="bg-accent-soft/40 border-l-4 border-accent rounded-r-xl p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <HandHeart className="w-5 h-5 text-accent" strokeWidth={2} />
                    <h4 className="font-serif text-lg font-bold text-primary">
                      {activePole.details.beneficiairesLabel ?? "Bénéficiaires prioritaires"}
                    </h4>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {activePole.details.beneficiaires.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-accent" strokeWidth={2} />
                  <h4 className="font-serif text-xl font-bold text-primary">Objectifs</h4>
                </div>
                <ul className="grid md:grid-cols-2 gap-3">
                  {activePole.details.objectifs.map((o) => (
                    <li key={o} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 text-[15px] text-foreground leading-snug">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activePole.details.approche.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Compass className="w-5 h-5 text-accent" strokeWidth={2} />
                    <h4 className="font-serif text-xl font-bold text-primary">
                      {activePole.title === "Automobile" || activePole.title === "Import-Export"
                        ? "Clientèle"
                        : activePole.title === "Cabinet BGF Consulting"
                        ? "Approche"
                        : "Approche d'intervention"}
                    </h4>
                  </div>
                  {activePole.details.approcheIntro && (
                    <p className="text-[15px] text-muted-foreground mb-3">
                      {activePole.details.approcheIntro}
                    </p>
                  )}
                  <ul className="space-y-2.5">
                    {activePole.details.approche.map((a) => (
                      <li key={a} className="flex items-start gap-3 text-[15px] text-foreground">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-accent shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activePole.details.valeurAjoutee && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-accent" strokeWidth={2} />
                    <h4 className="font-serif text-xl font-bold text-primary">Valeur ajoutée</h4>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {activePole.details.valeurAjoutee.map((v) => (
                      <li
                        key={v}
                        className="flex items-start gap-3 p-3 rounded-lg border border-accent/30 bg-accent-soft/30 text-[15px] text-foreground"
                      >
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activePole.details.engagement && (
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/90 p-6 md:p-7 text-primary-foreground">
                  <Heart className="absolute -top-4 -right-4 w-28 h-28 text-accent/20" strokeWidth={1.2} />
                  <div className="relative">
                    <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">Notre engagement</div>
                    <p className="text-base md:text-lg leading-relaxed text-primary-foreground/95">
                      {activePole.details.engagement}
                    </p>
                  </div>
                </div>
              )}

              {activePole.details.positionnement && (
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/90 p-6 md:p-7 text-primary-foreground">
                  <Heart className="absolute -top-4 -right-4 w-28 h-28 text-accent/20" strokeWidth={1.2} />
                  <div className="relative">
                    <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">Positionnement</div>
                    <p className="text-base md:text-lg leading-relaxed text-primary-foreground/95">
                      {activePole.details.positionnement}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
    </section>
  );
};

export default Poles;
