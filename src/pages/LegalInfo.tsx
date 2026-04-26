import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Building2, FileText, Landmark, CreditCard, Globe2 } from "lucide-react";
import { useSiteTexts } from "@/hooks/useSiteTexts";

const Card = ({
  icon: Icon,
  title,
  rows,
}: {
  icon: typeof Building2;
  title: string;
  rows: { label: string; value: string }[];
}) => (
  <article className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border-t-4 border-accent">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center">
        <Icon className="w-6 h-6 text-accent" strokeWidth={1.7} />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{title}</h2>
    </div>
    <dl className="divide-y divide-border">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
          <dt className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">{r.label}</dt>
          <dd className="md:col-span-2 text-base text-foreground font-medium break-words">{r.value}</dd>
        </div>
      ))}
    </dl>
  </article>
);

const LegalInfo = () => {
  const { t } = useSiteTexts();

  const identityRows = [
    { label: "Raison sociale", value: t("legal_raison_sociale", "Fondation Babadjo Groupe & Frère (BGF)") },
    { label: "RCCM", value: t("legal_rccm", "—") },
    { label: "NIF", value: t("legal_nif", "—") },
    { label: "NIU", value: t("legal_niu", "—") },
    { label: "Siège social", value: t("legal_siege", "Bangui, République Centrafricaine") },
  ];
  const bankRows = [
    { label: "Banque", value: t("legal_banque", "—") },
    { label: "Numéro de compte", value: t("legal_compte", "—") },
    { label: "IBAN", value: t("legal_iban", "—") },
    { label: "Code SWIFT / BIC", value: t("legal_swift", "—") },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SectionHero
        eyebrow="Informations légales"
        title="Coordonnées"
        accent="légales & bancaires"
        description="Toutes les informations administratives, fiscales et bancaires de la Fondation BGF, en toute transparence."
      />

      <section className="py-20 md:py-28">
        <div className="container-pro grid lg:grid-cols-2 gap-8">
          <Card icon={Building2} title="Identité juridique" rows={identityRows} />
          <Card icon={CreditCard} title="Coordonnées bancaires" rows={bankRows} />
        </div>

        <div className="container-pro mt-16">
          <div className="bg-gradient-soft rounded-2xl p-8 md:p-12 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-primary-foreground" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3">
                  {t("legal_transparence_title", "Transparence & conformité")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("legal_transparence_text", "")}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground">
                    <Landmark className="w-4 h-4 text-accent" /> Organisation enregistrée
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-foreground">
                    <Globe2 className="w-4 h-4 text-accent" /> {t("legal_siege", "Bangui, RCA")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default LegalInfo;
