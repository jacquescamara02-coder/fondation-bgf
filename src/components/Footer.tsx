import logo from "@/assets/logo-bgf.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground pt-20 pb-8">
    <div className="container-pro">
      <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-primary-foreground/15">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="Logo BGF" width={48} height={48} className="h-12 w-12 object-contain" />
            <div>
              <div className="font-serif text-lg font-bold">FONDATION BGF</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">Babadjo Groupe & Frère</div>
            </div>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md">
            Organisation multisectorielle au service du développement social, sanitaire et économique en République Centrafricaine.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-serif font-bold mb-4 text-accent">Navigation</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            <li><a href="#about" className="hover:text-accent">À propos</a></li>
            <li><a href="#valeurs" className="hover:text-accent">Valeurs</a></li>
            <li><a href="#poles" className="hover:text-accent">Nos pôles</a></li>
            <li><a href="#avis" className="hover:text-accent">Avis</a></li>
            <li><a href="#contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-serif font-bold mb-4 text-accent">Coordonnées légales</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li>RCCM : CA/BG/2025B413</li>
            <li>NIF : M 365907 Y 001</li>
            <li>NIU : 236 20 25M71156W</li>
            <li className="pt-2">Compte ECOBANK : 33650005077</li>
            <li>IBAN : CF4220001000083365000507780</li>
            <li>SWIFT : ECOCCFCF</li>
          </ul>
        </div>
      </div>

      <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-primary-foreground/60">
        <div>© {new Date().getFullYear()} Fondation Babadjo Groupe & Frère. Tous droits réservés.</div>
        <div>Bangui, République Centrafricaine</div>
      </div>
    </div>
  </footer>
);

export default Footer;
