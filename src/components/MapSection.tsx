import { MapPin } from "lucide-react";

const MapSection = () => (
  <section id="localisation" className="py-24 md:py-32 bg-secondary/30">
    <div className="container-pro">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Nous trouver</div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance mb-5">
          Notre <em className="gradient-text not-italic">localisation</em>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Avenue Barthelemy Boganda, Centre-ville, face Pharmacie PALOMA, Bangui — République Centrafricaine.
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden shadow-elegant border border-border bg-card">
        <iframe
          title="Localisation Fondation BGF — Bangui"
          src="https://www.google.com/maps?q=Avenue+Barthelemy+Boganda,+Bangui,+Central+African+Republic&output=embed"
          width="100%"
          height="480"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full"
        />
        <a
          href="https://www.google.com/maps/search/?api=1&query=Avenue+Barthelemy+Boganda+Bangui"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-5 right-5 inline-flex items-center gap-2 bg-card/95 backdrop-blur px-4 py-2.5 rounded-full text-sm font-semibold text-primary shadow-elegant hover:bg-card transition-colors"
        >
          <MapPin className="w-4 h-4 text-accent" strokeWidth={2} />
          Itinéraire
        </a>
      </div>
    </div>
  </section>
);

export default MapSection;