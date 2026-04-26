import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/lib/poleAssets";

export type PoleDetails = {
  intro?: string[];
  beneficiairesLabel?: string;
  beneficiaires?: string[];
  objectifs?: string[];
  domaines?: string[];
  approcheIntro?: string;
  approche?: string[];
  services?: string[];
  valeurAjoutee?: string[];
  impact?: string[];
  positionnement?: string;
  engagement?: string;
};

export type Pole = {
  id: string;
  slug: string;
  tag: string;
  title: string;
  description: string;
  image_url: string | null;
  display_order: number;
  published: boolean;
  details: PoleDetails | null;
  /** Resolved image (Supabase URL or bundled asset) */
  img: string;
};

let cache: Pole[] | null = null;
const subs = new Set<(p: Pole[]) => void>();

const fetchPoles = async () => {
  const { data } = await supabase
    .from("poles")
    .select("*")
    .eq("published", true)
    .order("display_order");
  const list = (data ?? []).map((p) => ({
    ...(p as unknown as Omit<Pole, "img">),
    img: resolveImage(p.image_url) ?? "",
  })) as Pole[];
  cache = list;
  subs.forEach((s) => s(list));
};

export const usePoles = () => {
  const [poles, setPoles] = useState<Pole[]>(cache ?? []);
  useEffect(() => {
    subs.add(setPoles);
    if (!cache) fetchPoles();
    return () => { subs.delete(setPoles); };
  }, []);
  return { poles, loading: !cache };
};

export const usePoleBySlug = (slug?: string) => {
  const { poles, loading } = usePoles();
  return { pole: poles.find((p) => p.slug === slug), loading, others: poles.filter((p) => p.slug !== slug) };
};
