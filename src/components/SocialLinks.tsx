import { Facebook, Instagram, Youtube } from "lucide-react";

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.31a8.16 8.16 0 0 0 4.77 1.52V6.38a4.85 4.85 0 0 1-1.84-.31z" />
  </svg>
);

const SnapIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.04 2c-2.6 0-4.84 1.59-5.69 3.95-.36 1.01-.31 2.04-.27 2.96l.02.5c.04.83.07 1.62-.18 2.04-.16.27-.49.42-.86.51-.21.05-.43.09-.66.13-.66.13-1.49.29-1.74.95-.18.46-.06.96.36 1.49.74.94 2.01 1.61 3.27 2.16.13.05.21.16.27.32.04.13.07.27.13.42.05.16.09.32.09.5 0 .67-1.85 1.31-3.45 1.6-.36.07-.61.39-.61.75v.04c.04.78.92 1.27 2.62 1.45.05.21.13.45.27.69.18.36.55.78 1.27.78.29 0 .61-.07.96-.13.49-.09 1.04-.21 1.7-.21.39 0 .78.04 1.18.13.74.16 1.39.55 2.04.96.93.55 1.88 1.13 3.16 1.13h.18c1.27 0 2.23-.58 3.16-1.13.66-.41 1.31-.8 2.04-.96.4-.09.78-.13 1.18-.13.66 0 1.21.13 1.7.21.36.07.66.13.96.13.39 0 1.05-.07 1.27-.78.13-.27.22-.49.27-.69 1.7-.18 2.59-.66 2.62-1.45v-.04c0-.36-.27-.66-.61-.75-1.59-.29-3.45-.93-3.45-1.6 0-.18.04-.34.09-.5.05-.13.09-.27.13-.42.05-.16.13-.27.27-.32 1.27-.55 2.55-1.22 3.27-2.16.4-.5.55-1.04.36-1.49-.27-.66-1.09-.83-1.74-.95-.21-.04-.45-.09-.66-.13-.36-.09-.7-.24-.86-.51-.27-.42-.22-1.21-.18-2.04l.02-.5c.04-.93.07-1.94-.27-2.96C16.91 3.59 14.66 2 12.04 2z" />
  </svg>
);

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "TikTok", href: "https://tiktok.com", Icon: TikTokIcon },
  { name: "Snapchat", href: "https://snapchat.com", Icon: SnapIcon },
  { name: "YouTube", href: "https://youtube.com", Icon: Youtube },
];

const SocialLinks = () => (
  <section className="bg-background py-16 md:py-20">
    <div className="container-pro">
      <div className="text-center mb-8">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground font-medium">
          Suivez-nous
        </div>
      </div>
      <ul className="flex items-center justify-center gap-8 md:gap-12">
        {socials.map(({ name, href, Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="block text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SocialLinks;
