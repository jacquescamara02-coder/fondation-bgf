import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import MapSection from "@/components/MapSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionHero from "@/components/SectionHero";

const ContactPage = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <SectionHero
      eyebrow="Nous contacter"
      title="Échangeons sur votre"
      accent="projet."
      description="Formulaire, avis clients, questions fréquentes et localisation : tout ce qu'il vous faut pour entrer en relation avec la FONDATION BGF."
    />
    <Contact />
    <Testimonials />
    <Faq />
    <MapSection />
    <Footer />
    <WhatsAppButton />
  </main>
);

export default ContactPage;