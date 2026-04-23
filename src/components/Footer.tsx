import logo from "@/assets/logo-bgf.png";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground pt-20 pb-8">
    <div className="container-pro">
      <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-primary-foreground/15">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-14 w-14 rounded-full bg-white p-1.5 flex items-center justify-center shrink-0">
              <img src={logo} alt="Logo BGF" width={48} height={48} className="h-full w-full object-contain" />
            </div>
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
            <li><Link to="/poles" className="hover:text-accent transition-colors">Nos pôles</Link></li>
            <li><Link to="/vue-ensemble" className="hover:text-accent transition-colors">Vue d'ensemble</Link></li>
            <li><Link to="/engagements" className="hover:text-accent transition-colors">Nos engagements</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Avis & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
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
        <div className="flex items-center gap-4">
          <span>Bangui, République Centrafricaine</span>
          <Link to="/auth" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">Admin</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
