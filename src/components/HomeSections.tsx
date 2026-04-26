import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Section = {
  id: string;
  key: string;
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_url: string | null;
  layout: string;
};

const Cta = ({ label, url }: { label?: string | null; url?: string | null }) => {
  if (!label || !url) return null;
  const isExternal = url.startsWith("http");
  const className =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-accent-foreground font-semibold shadow-gold hover:scale-[1.03] transition-transform";
  return isExternal ? (
    <a href={url} target="_blank" rel="noreferrer noopener" className={className}>
      {label} <ArrowRight className="w-4 h-4" />
    </a>
  ) : (
    <Link to={url} className={className}>
      {label} <ArrowRight className="w-4 h-4" />
    </Link>
  );
};

const SectionBlock = ({ s }: { s: Section }) => {
  if (s.layout === "banner" && s.image_url) {
    return (
      <section className="relative py-24 md:py-32 overflow-hidden">
        <img src={s.image_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative container-pro text-center text-primary-foreground">
          {s.eyebrow && <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">{s.eyebrow}</div>}
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">{s.title}</h2>
          {s.subtitle && <p className="mt-4 text-lg text-primary-foreground/85 max-w-2xl mx-auto">{s.subtitle}</p>}
          {s.content && <p className="mt-6 text-primary-foreground/80 max-w-3xl mx-auto whitespace-pre-line leading-relaxed">{s.content}</p>}
          {s.cta_label && <div className="mt-8"><Cta label={s.cta_label} url={s.cta_url} /></div>}
        </div>
      </section>
    );
  }

  if (s.layout === "centered") {
    return (
      <section className="py-20 md:py-28 bg-background">
        <div className="container-pro text-center max-w-3xl mx-auto">
          {s.eyebrow && <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">{s.eyebrow}</div>}
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight">{s.title}</h2>
          {s.subtitle && <p className="mt-4 text-lg text-muted-foreground">{s.subtitle}</p>}
          {s.content && <p className="mt-6 text-muted-foreground whitespace-pre-line leading-relaxed">{s.content}</p>}
          {s.cta_label && <div className="mt-8"><Cta label={s.cta_label} url={s.cta_url} /></div>}
        </div>
      </section>
    );
  }

  // text-image (default) ou image-text
  const reversed = s.layout === "image-text";
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-pro grid lg:grid-cols-2 gap-12 items-center">
        <div className={reversed ? "lg:order-2" : ""}>
          {s.eyebrow && <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">{s.eyebrow}</div>}
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight">{s.title}</h2>
          {s.subtitle && <p className="mt-4 text-lg text-muted-foreground">{s.subtitle}</p>}
          {s.content && <p className="mt-6 text-muted-foreground whitespace-pre-line leading-relaxed">{s.content}</p>}
          {s.cta_label && <div className="mt-8"><Cta label={s.cta_label} url={s.cta_url} /></div>}
        </div>
        {s.image_url ? (
          <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant ${reversed ? "lg:order-1" : ""}`}>
            <img src={s.image_url} alt={s.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className={`hidden lg:block aspect-[4/3] rounded-2xl bg-gradient-soft ${reversed ? "lg:order-1" : ""}`} />
        )}
      </div>
    </section>
  );
};

const HomeSections = () => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    supabase
      .from("home_sections")
      .select("*")
      .eq("published", true)
      .order("display_order")
      .then(({ data }) => setSections((data ?? []) as Section[]));
  }, []);

  if (sections.length === 0) return null;
  return (
    <>
      {sections.map((s) => <SectionBlock key={s.id} s={s} />)}
    </>
  );
};

export default HomeSections;
