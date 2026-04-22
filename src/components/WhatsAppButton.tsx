import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/23670402020?text=Bonjour%20Fondation%20BGF%2C%20je%20souhaite%20obtenir%20des%20informations."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Nous contacter sur WhatsApp"
    className="fixed bottom-6 right-6 z-50 group"
  >
    <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
    <span className="relative flex items-center gap-2 bg-whatsapp text-whatsapp-foreground rounded-full pl-4 pr-5 py-3.5 shadow-xl hover:scale-105 transition-transform">
      <MessageCircle className="w-6 h-6" strokeWidth={2} fill="currentColor" />
      <span className="hidden sm:inline font-semibold text-sm">WhatsApp</span>
    </span>
  </a>
);

export default WhatsAppButton;
