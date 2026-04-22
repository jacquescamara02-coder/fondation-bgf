import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-bgf.png";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "À propos" },
  { href: "#valeurs", label: "Valeurs" },
  { href: "#poles", label: "Nos pôles" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg shadow-soft border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container-pro flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white shadow-soft p-1 flex items-center justify-center shrink-0 ring-1 ring-black/5">
            <img src={logo} alt="Logo Fondation BGF" width={44} height={44} className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <div className={cn("font-serif text-lg font-bold", scrolled ? "text-primary" : "text-primary-foreground")}>
              FONDATION BGF
            </div>
            <div className={cn("text-[10px] uppercase tracking-[0.2em]", scrolled ? "text-muted-foreground" : "text-primary-foreground/70")}>
              Babadjo Groupe & Frère
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-gold text-accent-foreground font-semibold text-sm shadow-gold hover:scale-105 transition-transform"
          >
            Nous contacter
          </a>
        </nav>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={cn("lg:hidden p-2", scrolled ? "text-foreground" : "text-primary-foreground")}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container-pro py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-foreground font-medium py-2"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
