import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Values from "@/components/Values";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHero from "@/components/SectionHero";

const Engagements = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <SectionHero
      eyebrow="Nos engagements"
      title="Six valeurs au cœur de"
      accent="notre action."
      description="La FONDATION BGF s'appuie sur un socle de valeurs solides qui guident chaque décision, chaque mission et chaque collaboration."
    />
    <Values />
    <Footer />
    <WhatsAppButton />
  </main>
);

export default Engagements;