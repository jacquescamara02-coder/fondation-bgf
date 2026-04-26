import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}

const StringListEditor = ({ label, values, onChange, placeholder, multiline }: Props) => {
  const update = (i: number, v: string) => {
    const next = [...values];
    next[i] = v;
    onChange(next);
  };
  const add = () => onChange([...values, ""]);
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <Label className="text-xs">{label}</Label>
      <div className="space-y-2">
        {values.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Aucun élément. Cliquez sur Ajouter.</p>
        )}
        {values.map((v, i) => (
          <div key={i} className="flex gap-2 items-start">
            {multiline ? (
              <textarea
                value={v}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                rows={2}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            ) : (
              <Input value={v} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(i)}
              className="shrink-0 mt-0.5"
            >
              <X className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={add}>
        <Plus className="w-3.5 h-3.5" /> Ajouter
      </Button>
    </div>
  );
};

export default StringListEditor;
