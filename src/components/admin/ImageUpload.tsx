import { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Props {
  value?: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
}

const ImageUpload = ({ value, onChange, folder = "uploads" }: Props) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Fichier trop gros", description: "Maximum 5 Mo.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      setUploading(false);
      toast({ title: "Échec", description: error.message, variant: "destructive" });
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group inline-block">
          <img src={value} alt="" className="h-32 w-32 object-cover rounded-lg border border-border" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className="inline-flex items-center justify-center w-32 h-32 rounded-lg border-2 border-dashed border-border hover:border-accent cursor-pointer transition-colors">
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-accent" />
          ) : (
            <div className="text-center">
              <Upload className="w-5 h-5 mx-auto text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground mt-1 block">Téléverser</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      )}
      {value && (
        <Button type="button" size="sm" variant="outline" asChild>
          <label className="cursor-pointer">
            Changer l'image
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;