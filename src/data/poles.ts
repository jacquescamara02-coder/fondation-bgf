import sante from "@/assets/pole-sante-maternelle.jpg";
import consulting from "@/assets/pole-consulting-bgf.jpg";
import auto from "@/assets/pole-automobile-bgf.jpg";
import importExp from "@/assets/pole-import-export-bgf.jpg";
import agro from "@/assets/pole-agropastorale-bgf.jpg";
import immo from "@/assets/pole-immobiliere-bgf.jpg";
import pharma from "@/assets/pole-pharma.jpg";

export type PoleDetails = {
  intro: string[];
  beneficiaires?: string[];
  beneficiairesLabel?: string;
  objectifs: string[];
  approche: string[];
  approcheIntro?: string;
  valeurAjoutee?: string[];
  engagement?: string;
  positionnement?: string;
  domaines?: string[];
  services?: string[];
  impact?: string[];
};

export type Pole = {
  slug: string;
  img: string;
  tag: string;
  title: string;
  desc: string;
  details?: PoleDetails;
};

export const poles: Pole[] = [
  {
    slug: "sante-maternelle-infantile",
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
    slug: "cabinet-bgf-consulting",
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
    slug: "automobile",
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
    slug: "import-export",
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
    slug: "agropastorale",
    img: agro,
    tag: "Développement rural",
    title: "Agropastorale",
    desc: "Levier stratégique pour le développement économique, la sécurité alimentaire et la valorisation des filières agricoles, avec une expertise en élevage halal.",
    details: {
      intro: [
        "Le pôle Agropastorale de la FONDATION BGF constitue un levier stratégique pour le développement économique, la sécurité alimentaire et la valorisation des filières agricoles en République Centrafricaine.",
        "Il intervient dans la promotion de l'agriculture durable et de l'élevage, avec une attention particulière portée à la mise en place de systèmes d'élevage respectant les normes halal, garantissant qualité, traçabilité et conformité aux exigences religieuses et sanitaires.",
        "À travers une approche intégrée, ce pôle accompagne les producteurs, éleveurs, coopératives et partenaires dans le développement d'activités agropastorales durables, génératrices de revenus et adaptées aux réalités locales.",
      ],
      beneficiairesLabel: "Services proposés",
      beneficiaires: [
        "Fourniture d'intrants agricoles et d'équipements d'élevage",
        "Appui technique aux éleveurs et coopératives",
        "Mise en place de fermes agropastorales intégrées",
        "Développement de chaînes de valeur halal (production → transformation → distribution)",
        "Formation en bonnes pratiques d'élevage et en normes halal",
        "Accompagnement de projets agricoles et pastoraux",
      ],
      objectifs: [
        "Promouvoir des pratiques agricoles durables et résilientes",
        "Renforcer la sécurité alimentaire et nutritionnelle",
        "Développer et structurer la filière élevage halal",
        "Améliorer la productivité et la qualité des productions animales",
        "Soutenir les producteurs et éleveurs locaux",
        "Favoriser l'autonomisation économique des communautés",
      ],
      domaines: [
        "Agriculture (cultures vivrières, maraîchage, production végétale)",
        "Élevage (bovin, ovin, caprin, avicole)",
        "Filière élevage halal (production, transformation, distribution)",
        "Sécurité alimentaire et nutrition",
        "Chaînes de valeur agricoles et pastorales",
      ],
      approcheIntro: "Le pôle adopte une approche :",
      approche: [
        "Participative et communautaire",
        "Respectueuse des normes sanitaires et halal",
        "Orientée vers la durabilité et la résilience",
        "Intégrant les dimensions économiques, sociales et culturelles",
      ],
      valeurAjoutee: [
        "Intégration de la filière élevage halal dans une approche professionnelle",
        "Connaissance du contexte rural en RCA",
        "Capacité d'intervention en zones rurales et enclavées",
        "Approche intégrée agriculture–élevage–nutrition",
        "Contribution à la sécurité alimentaire et aux marchés locaux",
      ],
      impact: [
        "Amélioration de la production agricole et animale",
        "Développement d'une filière halal structurée et compétitive",
        "Augmentation des revenus des ménages ruraux",
        "Renforcement de la sécurité alimentaire",
        "Création d'opportunités économiques durables",
      ],
      positionnement:
        "La FONDATION BGF AGROPASTORALE se positionne comme un acteur innovant et structurant du développement rural en République Centrafricaine, notamment à travers la promotion de la filière halal, répondant à une demande croissante du marché.",
    },
  },
  {
    slug: "immobiliere",
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
    slug: "pharmacie",
    img: pharma,
    tag: "Santé publique",
    title: "Pharmacie",
    desc: "Promotion de l'accès aux produits pharmaceutiques essentiels et services liés à la santé.",
    details: {
      intro: [
        "Le pôle Pharmacie de la FONDATION BGF œuvre pour faciliter l'accès aux produits pharmaceutiques essentiels et aux services liés à la santé en République Centrafricaine.",
        "Il contribue à renforcer la disponibilité, la qualité et l'accessibilité des médicaments pour les populations, en particulier les plus vulnérables.",
      ],
      objectifs: [
        "Garantir un accès continu aux médicaments essentiels",
        "Assurer la qualité et la traçabilité des produits pharmaceutiques",
        "Soutenir les structures de santé en approvisionnement",
        "Promouvoir le bon usage des médicaments",
      ],
      approche: [
        "Approvisionnement fiable et conforme aux normes",
        "Collaboration avec les acteurs de santé publique",
        "Sensibilisation et information des populations",
      ],
    },
  },
];

export const getPoleBySlug = (slug: string) => poles.find((p) => p.slug === slug);