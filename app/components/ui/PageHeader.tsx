interface PageHeaderProps {
  title: string;
  subtitle?: string;
  meta?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, meta, actions }: PageHeaderProps) {
  return (
    <div className="page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="page-header-meta" style={{ marginTop: 2 }}>{subtitle}</p>}
        {meta && <p className="page-header-meta" style={{ marginTop: 2 }}>{meta}</p>}
      </div>
      {actions && <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}
