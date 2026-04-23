import { Facebook, Instagram, Youtube } from "lucide-react";

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
    handle: "@FondationBGF",
    color: "from-[hsl(221_83%_53%)] to-[hsl(217_91%_60%)]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    handle: "@fondation.bgf",
    color: "from-[hsl(330_81%_60%)] via-[hsl(14_91%_60%)] to-[hsl(45_93%_58%)]",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.31a8.16 8.16 0 0 0 4.77 1.52V6.38a4.85 4.85 0 0 1-1.84-.31z" />
      </svg>
    ),
    handle: "@fondationbgf",
    color: "from-[hsl(0_0%_10%)] via-[hsl(330_81%_60%)] to-[hsl(180_100%_45%)]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
    handle: "Fondation BGF",
    color: "from-[hsl(0_84%_55%)] to-[hsl(0_72%_45%)]",
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.04 2c-2.6 0-4.84 1.59-5.69 3.95-.36 1.01-.31 2.04-.27 2.96l.02.5c.04.83.07 1.62-.18 2.04-.16.27-.49.42-.86.51-.21.05-.43.09-.66.13-.66.13-1.49.29-1.74.95-.18.46-.06.96.36 1.49.74.94 2.01 1.61 3.27 2.16.13.05.21.16.27.32.04.13.07.27.13.42.05.16.09.32.09.5 0 .67-1.85 1.31-3.45 1.6-.36.07-.61.39-.61.75v.04c.04.78.92 1.27 2.62 1.45.05.21.13.45.27.69.18.36.55.78 1.27.78.29 0 .61-.07.96-.13.49-.09 1.04-.21 1.7-.21.39 0 .78.04 1.18.13.74.16 1.39.55 2.04.96.93.55 1.88 1.13 3.16 1.13h.18c1.27 0 2.23-.58 3.16-1.13.66-.41 1.31-.8 2.04-.96.4-.09.78-.13 1.18-.13.66 0 1.21.13 1.7.21.36.07.66.13.96.13.39 0 1.05-.07 1.27-.78.13-.27.22-.49.27-.69 1.7-.18 2.59-.66 2.62-1.45v-.04c0-.36-.27-.66-.61-.75-1.59-.29-3.45-.93-3.45-1.6 0-.18.04-.34.09-.5.05-.13.09-.27.13-.42.05-.16.13-.27.27-.32 1.27-.55 2.55-1.22 3.27-2.16.4-.5.55-1.04.36-1.49-.27-.66-1.09-.83-1.74-.95-.21-.04-.45-.09-.66-.13-.36-.09-.7-.24-.86-.51-.27-.42-.22-1.21-.18-2.04l.02-.5c.04-.93.07-1.94-.27-2.96C16.91 3.59 14.66 2 12.04 2z" />
      </svg>
    ),
    handle: "fondation-bgf",
    color: "from-[hsl(54_100%_50%)] to-[hsl(48_96%_55%)]",
  },
];

const SocialLinks = () => (
  <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 25% 30%, hsl(var(--accent)) 0%, transparent 50%), radial-gradient(circle at 75% 70%, hsl(var(--primary)) 0%, transparent 50%)",
      }}
    />
    <div className="relative container-pro">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
          Restons connectés
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight text-balance">
          Suivez la Fondation sur <em className="gradient-text not-italic">les réseaux</em>.
        </h2>
        <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
          Actualités, terrain, témoignages et coulisses de nos engagements.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 max-w-5xl mx-auto">
        {socials.map(({ name, href, icon: Icon, handle, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} – ${handle}`}
            className="group relative bg-card rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-elegant border border-border hover:border-accent/40 transition-all overflow-hidden flex flex-col items-center text-center"
          >
            <div
              className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            />
            <div
              className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-soft group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
            </div>
            <div className="relative font-serif text-base md:text-lg font-bold text-primary">
              {name}
            </div>
            <div className="relative text-xs text-muted-foreground mt-1 truncate max-w-full">
              {handle}
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default SocialLinks;
