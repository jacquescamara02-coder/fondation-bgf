import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Ecosystem from "@/components/Ecosystem";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHero from "@/components/SectionHero";

const Overview = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <SectionHero
      eyebrow="Vue d'ensemble"
      title="Une organisation multisectorielle au service du"
      accent="progrès."
      description="Découvrez l'identité, la vision, la mission et l'écosystème intégré qui font de la FONDATION BGF un acteur clé du développement en République Centrafricaine."
    />
    <About />
    <Ecosystem />
    <Footer />
    <WhatsAppButton />
  </main>
);

export default Overview;