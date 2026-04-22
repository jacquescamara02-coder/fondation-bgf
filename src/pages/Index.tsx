import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Values from "@/components/Values";
import Poles from "@/components/Poles";
import Ecosystem from "@/components/Ecosystem";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const stored = sessionStorage.getItem("scrollToHash");
    const hash = stored || window.location.hash.replace("#", "");
    if (hash) {
      sessionStorage.removeItem("scrollToHash");
      // Wait for layout
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Values />
      <Poles />
      <Ecosystem />
      <Testimonials />
      <Faq />
      <Contact />
      <MapSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
