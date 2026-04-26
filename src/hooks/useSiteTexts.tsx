import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteTextRow = { key: string; value: string };

let cache: Record<string, string> | null = null;
const subscribers = new Set<(t: Record<string, string>) => void>();

const fetchAll = async () => {
  const { data } = await supabase.from("site_texts").select("key, value");
  const map: Record<string, string> = {};
  (data ?? []).forEach((r: SiteTextRow) => {
    map[r.key] = r.value;
  });
  cache = map;
  subscribers.forEach((s) => s(map));
};

// Auto-refresh on changes (any tab)
let channelInit = false;
const ensureChannel = () => {
  if (channelInit) return;
  channelInit = true;
  supabase
    .channel("site_texts_live")
    .on("postgres_changes", { event: "*", schema: "public", table: "site_texts" }, () => {
      fetchAll();
    })
    .subscribe();
};

export const useSiteTexts = () => {
  const [texts, setTexts] = useState<Record<string, string>>(cache ?? {});

  useEffect(() => {
    ensureChannel();
    subscribers.add(setTexts);
    if (!cache) fetchAll();
    return () => {
      subscribers.delete(setTexts);
    };
  }, []);

  const t = (key: string, fallback = "") => texts[key] ?? fallback;
  return { t, texts, loading: !cache };
};
