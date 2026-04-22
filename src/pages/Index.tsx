import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Values from "@/components/Values";
import Poles from "@/components/Poles";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Values />
      <Poles />
      <Testimonials />
      <Contact />
      <MapSection />
      <Faq />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
