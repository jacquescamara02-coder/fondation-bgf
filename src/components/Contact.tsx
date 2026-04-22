import { Mail, Phone, MapPin, Building2 } from "lucide-react";

const Contact = () => (
  <section id="contact" className="py-24 md:py-32 bg-background">
    <div className="container-pro">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">Contact & Coordonnées</div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance mb-8">
            Construisons ensemble un <em className="gradient-text not-italic">impact durable</em>.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Que vous soyez une institution publique, une ONG, une agence des Nations Unies, un bailleur de fonds, une entreprise privée ou un particulier — notre équipe est à votre écoute.
          </p>

          <div className="space-y-6">
            <ContactLine icon={MapPin} label="Siège social">
              Avenue Barthelemy Boganda, Centre-ville,<br />Face Pharmacie PALOMA, Bangui (RCA)
            </ContactLine>
            <ContactLine icon={Phone} label="Téléphone">
              <a href="tel:+23675509790" className="hover:text-accent">+236 75 50 97 90</a>
              {" / "}
              <a href="tel:+23672402020" className="hover:text-accent">+236 72 40 20 20</a>
              <br />
              <span className="text-sm">WhatsApp : <a href="https://wa.me/23670402020" className="hover:text-accent">+236 70 40 20 20</a></span>
            </ContactLine>
            <ContactLine icon={Mail} label="E-mail">
              <a href="mailto:ousmouh@gmail.com" className="hover:text-accent">ousmouh@gmail.com</a>
            </ContactLine>
            <ContactLine icon={Building2} label="Identifiants">
              <span className="text-sm">RCCM : CA/BG/2025B413<br />NIF : M 365907 Y 001 — NIU : 236 20 25M71156W</span>
            </ContactLine>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); window.location.href = "mailto:ousmouh@gmail.com"; }}
          className="bg-gradient-navy text-primary-foreground rounded-3xl p-8 md:p-10 shadow-elegant"
        >
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Écrivez-nous</h3>
          <p className="text-primary-foreground/70 text-sm mb-8">Réponse sous 48 heures ouvrées.</p>

          <div className="space-y-5">
            <Field label="Nom complet" name="name" />
            <Field label="E-mail" name="email" type="email" />
            <Field label="Organisation" name="org" />
            <div>
              <label className="block text-xs uppercase tracking-wider text-primary-foreground/70 mb-2 font-semibold">Message</label>
              <textarea rows={4} required className="w-full bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Décrivez votre besoin..." />
            </div>
            <button className="w-full bg-gradient-gold text-accent-foreground font-semibold py-4 rounded-full shadow-gold hover:scale-[1.02] transition-transform">
              Envoyer le message
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
);

const ContactLine = ({ icon: Icon, label, children }: any) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-accent" strokeWidth={1.8} />
    </div>
    <div>
      <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">{label}</div>
      <div className="text-foreground leading-relaxed">{children}</div>
    </div>
  </div>
);

const Field = ({ label, name, type = "text" }: { label: string; name: string; type?: string }) => (
  <div>
    <label className="block text-xs uppercase tracking-wider text-primary-foreground/70 mb-2 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      required
      className="w-full bg-primary-foreground/5 border border-primary-foreground/15 rounded-lg px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
    />
  </div>
);

export default Contact;
