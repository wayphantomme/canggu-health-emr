import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import RMNumber from "@/app/components/ui/RMNumber";
import SyncStatusBadge from "@/app/components/ui/SyncStatusBadge";
import { MOCK_ENCOUNTERS } from "@/app/lib/mock-data";
import type { Metadata } from "next";
import type { EncounterModule } from "@/app/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const enc = MOCK_ENCOUNTERS.find((e) => e.id === id);
  return { title: enc ? enc.noEncounter : "Encounter" };
}

const MODULES: {
  key: EncounterModule;
  label: string;
  icon: string;
  desc: string;
  href: (id: string) => string;
}[] = [
  { key: "asesmen", label: "Asesmen Medis Awal", icon: "🩺", desc: "Anamnesis, pemeriksaan fisik, ICD-10", href: (id) => `/encounter/${id}/asesmen` },
  { key: "bedah",   label: "Asesmen Bedah & Anestesi", icon: "🔪", desc: "Form A-G standar bedah", href: (id) => `/encounter/${id}/bedah` },
  { key: "resep",   label: "E-Resep", icon: "💊", desc: "Obat, dosis, instruksi", href: (id) => `/encounter/${id}/resep` },
  { key: "lab",     label: "Lab Tests & Results", icon: "🧪", desc: "Order lab dan upload hasil", href: (id) => `/encounter/${id}/lab` },
  { key: "radiologi", label: "Radiologi", icon: "🔬", desc: "Order foto, CT, MRI, USG", href: (id) => `/encounter/${id}/radiologi` },
  { key: "discharge", label: "Discharge Summary", icon: "📄", desc: "Ringkasan pulang dan kontrol", href: (id) => `/encounter/${id}/discharge` },
];

export default async function EncounterDetailPage({ params }: Props) {
  const { id } = await params;
  const enc = MOCK_ENCOUNTERS.find((e) => e.id === id);
  if (!enc) notFound();

  const formatTgl = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

  const statusConfig = {
    draft:       { label: "Draft",       cls: "badge-neutral" },
    in_progress: { label: "In Progress", cls: "badge-amber" },
    finished:    { label: "Selesai",     cls: "badge-sage" },
  }[enc.status];

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Header */}
      <PageHeader
        title={enc.noEncounter}
        subtitle={`${enc.patientNama} — ${enc.tipe === "clinic_visit" ? "Clinic Visit" : "Home Visit"}`}
        meta={formatTgl(enc.tanggal)}
        actions={
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span className={`badge ${statusConfig.cls}`}>{statusConfig.label}</span>
            <SyncStatusBadge status={enc.syncStatus} />
            <Link href="/encounter" className="btn btn-secondary">← Kembali</Link>
          </div>
        }
      />

      {/* Patient Summary */}
      <div className="card" style={{ marginBottom: "1.25rem" }}>
        <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
          <div>
            <div className="section-title">Pasien</div>
            <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: 4 }}>{enc.patientNama}</div>
            <RMNumber noRM={enc.patientNoRM} />
          </div>
          <div>
            <div className="section-title">Tim Medis</div>
            <div style={{ fontSize: "0.8125rem" }}>
              <div style={{ marginBottom: 3 }}>
                <span style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>Dokter: </span>
                {enc.dokterNama}
              </div>
              {enc.perawatNama && (
                <div>
                  <span style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>Perawat: </span>
                  {enc.perawatNama}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="section-title">Keluhan Utama</div>
            <div style={{ fontSize: "0.8125rem" }}>{enc.keluhan}</div>
          </div>
        </div>

        {/* Vital Signs */}
        {enc.vitalSign && (
          <>
            <hr className="divider" style={{ margin: "0 1rem" }} />
            <div style={{ padding: "0.875rem 1rem" }}>
              <div className="section-title" style={{ marginBottom: "0.5rem" }}>Tanda Vital</div>
              <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {[
                  { label: "TD", value: `${enc.vitalSign.tekananDarah} mmHg` },
                  { label: "Nadi", value: `${enc.vitalSign.nadiPerMenit} /mnt` },
                  { label: "Suhu", value: `${enc.vitalSign.suhuc}°C` },
                  { label: "SpO₂", value: `${enc.vitalSign.spo2}%` },
                  { label: "RR", value: `${enc.vitalSign.respirasiPerMenit} /mnt` },
                  { label: "BB/TB", value: `${enc.vitalSign.beratKg}kg / ${enc.vitalSign.tinggicm}cm` },
                ].map((v) => (
                  <div key={v.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 2 }}>{v.label}</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{v.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Progress Indicator */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span className="section-title" style={{ margin: 0 }}>Progress</span>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
            {enc.modulesCompleted.length} / {MODULES.length} modul selesai
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {MODULES.map((m) => (
            <div
              key={m.key}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: enc.modulesCompleted.includes(m.key) ? "var(--sage)" : "var(--line)",
                transition: "background 0.2s",
              }}
              title={m.label}
            />
          ))}
        </div>
      </div>

      {/* Module Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "0.875rem",
      }}>
        {MODULES.map((m) => {
          const done = enc.modulesCompleted.includes(m.key);
          return (
            <Link key={m.key} href={m.href(enc.id)} className={`module-card ${done ? "completed" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem" }}>{m.icon}</div>
                {done ? (
                  <span className="badge badge-sage" style={{ fontSize: "0.6875rem" }}>✓ Selesai</span>
                ) : (
                  <span className="badge badge-neutral" style={{ fontSize: "0.6875rem" }}>Belum</span>
                )}
              </div>
              <div className="module-title">{m.label}</div>
              <div className="module-status">{m.desc}</div>
            </Link>
          );
        })}
      </div>

      {/* Actions */}
      {enc.status !== "finished" && (
        <div style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "var(--sage-mist)",
          borderRadius: 6,
          border: "1px solid #c8d9c4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--sage-deep)" }}>
              Selesaikan Encounter
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
              Pastikan Discharge Summary sudah diisi sebelum menutup encounter
            </div>
          </div>
          <button className="btn btn-primary" disabled={!enc.modulesCompleted.includes("discharge")}>
            Tutup Encounter (Finished)
          </button>
        </div>
      )}
    </div>
  );
}
