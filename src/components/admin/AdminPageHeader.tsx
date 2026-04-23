import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  actions?: ReactNode;
}

const AdminPageHeader = ({ title, description, actions }: Props) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Administration</div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-1">{title}</h1>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
    </div>
    {actions && <div className="flex gap-2">{actions}</div>}
  </div>
);

export default AdminPageHeader;