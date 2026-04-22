import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Qu'est-ce que la Fondation BGF ?",
    a: "La Fondation Babadjo Groupe & Frère (BGF) est une organisation multisectorielle basée à Bangui, engagée dans le développement social, sanitaire et économique de la République Centrafricaine à travers plusieurs pôles d'activités complémentaires.",
  },
  {
    q: "Quels sont les pôles d'activités de la Fondation BGF ?",
    a: "La Fondation intervient à travers plusieurs pôles : Import-Export, Agropastorale, Immobilière, Pharmacie, ainsi que des activités de conseil et d'accompagnement institutionnel.",
  },
  {
    q: "Comment collaborer avec la Fondation BGF ?",
    a: "Institutions publiques, ONG, agences des Nations Unies, bailleurs de fonds, entreprises privées ou particuliers peuvent nous contacter via le formulaire ci-dessus, par e-mail ou par téléphone. Notre équipe répond sous 48 heures ouvrées.",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Notre siège est à Bangui (RCA). Nous opérons sur l'ensemble du territoire centrafricain et nous appuyons sur un réseau de partenaires locaux et internationaux pour mener nos missions.",
  },
  {
    q: "Comment soutenir ou financer un projet de la Fondation ?",
    a: "Vous pouvez nous écrire directement pour discuter d'un partenariat, d'un financement ou d'un don. Nos coordonnées bancaires (ECOBANK, IBAN, SWIFT) sont disponibles dans le pied de page du site.",
  },
  {
    q: "La Fondation BGF est-elle officiellement enregistrée ?",
    a: "Oui. La Fondation est enregistrée en République Centrafricaine — RCCM : CA/BG/2025B413, NIF : M 365907 Y 001, NIU : 236 20 25M71156W.",
  },
];

const Faq = () => (
  <section id="faq" className="py-24 md:py-32 bg-background">
    <div className="container-pro">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Questions fréquentes</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-6">
            Tout ce que vous devez <em className="gradient-text not-italic">savoir</em>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Vous ne trouvez pas la réponse à votre question ? Notre équipe se tient à votre disposition pour échanger.
          </p>
        </div>

        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border last:border-b-0"
              >
                <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-primary hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);

export default Faq;