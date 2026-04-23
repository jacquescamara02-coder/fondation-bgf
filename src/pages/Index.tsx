import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SocialLinks from "@/components/SocialLinks";
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
      <SocialLinks />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
