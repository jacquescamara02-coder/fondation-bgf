// Map des images héritées (avant migration vers Supabase Storage)
import sante from "@/assets/pole-sante-maternelle.jpg";
import consulting from "@/assets/pole-consulting-bgf.jpg";
import auto from "@/assets/pole-automobile-bgf.jpg";
import importExp from "@/assets/pole-import-export-bgf.jpg";
import agro from "@/assets/pole-agropastorale-bgf.jpg";
import immo from "@/assets/pole-immobiliere-bgf.jpg";
import pharma from "@/assets/pole-pharma.jpg";
import broderie from "@/assets/pole-broderie-bgf.jpg";

const map: Record<string, string> = {
  "/src/assets/pole-sante-maternelle.jpg": sante,
  "/src/assets/pole-consulting-bgf.jpg": consulting,
  "/src/assets/pole-automobile-bgf.jpg": auto,
  "/src/assets/pole-import-export-bgf.jpg": importExp,
  "/src/assets/pole-agropastorale-bgf.jpg": agro,
  "/src/assets/pole-immobiliere-bgf.jpg": immo,
  "/src/assets/pole-pharma.jpg": pharma,
  "/src/assets/pole-broderie-bgf.jpg": broderie,
};

export const resolveImage = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return map[url] ?? url;
};
