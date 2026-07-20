import type { SyncStatus } from "@/app/lib/types";

const SYNC_CONFIG: Record<SyncStatus, { label: string; badgeClass: string; dot: string }> = {
  tersinkron: { label: "Tersinkron",  badgeClass: "badge-sage",    dot: "var(--sage)" },
  belum_sync: { label: "Belum Sync",  badgeClass: "badge-neutral", dot: "var(--ink-muted)" },
  gagal:      { label: "Gagal",       badgeClass: "badge-brick",   dot: "var(--brick)" },
};

export default function SyncStatus({ status }: { status: SyncStatus }) {
  const config = SYNC_CONFIG[status];
  return (
    <span className={`badge ${config.badgeClass}`}>
      <span style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: config.dot,
        flexShrink: 0,
      }} />
      {config.label}
    </span>
  );
}
