"use client";

import PageHeader from "@/app/components/ui/PageHeader";
import SyncStatusBadge from "@/app/components/ui/SyncStatusBadge";
import RMNumber from "@/app/components/ui/RMNumber";
import { MOCK_ENCOUNTERS, MOCK_PATIENTS, MOCK_APPOINTMENTS } from "@/app/lib/mock-data";
import Link from "next/link";

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="stat-card" style={{ borderTop: accent ? `3px solid ${accent}` : undefined }}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const today = new Date().toISOString().split("T")[0];

  const todayEncounters = MOCK_ENCOUNTERS.filter((e) => e.tanggal === today || e.tanggal === "2026-07-20");
  const todayAppointments = MOCK_APPOINTMENTS.filter(
    (a) => a.tanggal === today || a.tanggal === "2026-07-20"
  );
  const activeEncounters = MOCK_ENCOUNTERS.filter((e) => e.status === "in_progress");
  const pendingSync = MOCK_PATIENTS.filter((p) => p.syncStatus !== "tersinkron");
  const failedSync = MOCK_PATIENTS.filter((p) => p.syncStatus === "gagal");

  return (
    <div style={{ maxWidth: 1100 }}>
      <PageHeader
        title="Dashboard"
        subtitle="Ringkasan operasional klinik hari ini"
        meta={`Senin, 20 Juli 2026 — Klinik Sehat Sejahtera`}
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <StatCard
          label="Appointment Hari Ini"
          value={todayAppointments.length}
          sub={`${todayAppointments.filter((a) => a.status === "checked_in").length} sudah check-in`}
          accent="var(--sage)"
        />
        <StatCard
          label="Encounter Aktif"
          value={activeEncounters.length}
          sub="Sedang berlangsung"
          accent="var(--amber)"
        />
        <StatCard
          label="Total Pasien"
          value={MOCK_PATIENTS.filter((p) => p.status === "aktif").length}
          sub="Pasien aktif terdaftar"
          accent="var(--sage)"
        />
        <StatCard
          label="Belum Sync"
          value={pendingSync.length}
          sub={failedSync.length > 0 ? `${failedSync.length} gagal, perlu retry` : "Dalam antrian"}
          accent={failedSync.length > 0 ? "var(--brick)" : "var(--amber)"}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        {/* Encounter Aktif */}
        <div className="card">
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Encounter Aktif</span>
            <Link href="/encounter" className="btn btn-ghost btn-sm">Lihat Semua →</Link>
          </div>
          <div>
            {activeEncounters.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
                Tidak ada encounter aktif
              </div>
            ) : (
              activeEncounters.map((enc) => (
                <Link
                  key={enc.id}
                  href={`/encounter/${enc.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className={`status-tab ${enc.status === "in_progress" ? "progress" : "draft"}`}
                    style={{
                      padding: "0.75rem 0.75rem 0.75rem 1.125rem",
                      borderBottom: "1px solid var(--line)",
                      cursor: "pointer",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sage-mist)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: "var(--ink)", marginBottom: 2 }}>
                          {enc.patientNama}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <RMNumber noRM={enc.patientNoRM} />
                          <span style={{ fontSize: "0.6875rem", color: "var(--ink-muted)" }}>
                            {enc.tipe === "clinic_visit" ? "Clinic Visit" : "Home Visit"}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: 3 }}>
                          {enc.dokterNama}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="badge badge-amber" style={{ marginBottom: 4 }}>In Progress</span>
                        <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)" }}>
                          {enc.modulesCompleted.length} modul selesai
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Appointment Hari Ini */}
        <div className="card">
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Appointment Hari Ini</span>
            <Link href="/appointment" className="btn btn-ghost btn-sm">Lihat Semua →</Link>
          </div>
          <table className="dense-table">
            <thead>
              <tr>
                <th>Jam</th>
                <th>Pasien</th>
                <th>Dokter</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((apt) => {
                const statusMap: Record<string, { label: string; cls: string }> = {
                  booked:     { label: "Booked",     cls: "badge-sage" },
                  checked_in: { label: "Check-in",   cls: "badge-amber" },
                  cancelled:  { label: "Batal",      cls: "badge-brick" },
                  done:       { label: "Selesai",    cls: "badge-neutral" },
                };
                const s = statusMap[apt.status] || statusMap.booked;
                return (
                  <tr key={apt.id}>
                    <td>
                      <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--mono-tag)" }}>
                        {apt.jam}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: "0.8125rem" }}>{apt.patientNama}</div>
                      <RMNumber noRM={apt.patientNoRM} />
                    </td>
                    <td style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                      {apt.dokterNama.replace("dr. ", "dr. ").split(",")[0].replace("dr. ", "")}
                    </td>
                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SatuSehat Status */}
        <div className="card">
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Status SatuSehat</span>
            <Link href="/satusehat" className="btn btn-ghost btn-sm">Detail →</Link>
          </div>
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Tersinkron",  count: MOCK_PATIENTS.filter((p) => p.syncStatus === "tersinkron").length, badge: "badge-sage" },
              { label: "Belum Sync",  count: MOCK_PATIENTS.filter((p) => p.syncStatus === "belum_sync").length, badge: "badge-neutral" },
              { label: "Gagal / Error", count: MOCK_PATIENTS.filter((p) => p.syncStatus === "gagal").length, badge: "badge-brick" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8125rem", color: "var(--ink-muted)" }}>{item.label}</span>
                <span className={`badge ${item.badge}`} style={{ fontSize: "0.8125rem", padding: "3px 10px" }}>
                  {item.count} pasien
                </span>
              </div>
            ))}
            {failedSync.length > 0 && (
              <div style={{
                marginTop: 4,
                padding: "0.5rem 0.625rem",
                background: "var(--brick-bg)",
                borderRadius: 4,
                border: "1px solid #f0d0cd",
                fontSize: "0.75rem",
                color: "var(--brick)",
              }}>
                ⚠ {failedSync.length} record gagal sync — perlu perhatian
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Aksi Cepat</span>
          </div>
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <Link href="/pasien/baru" className="btn btn-primary" style={{ justifyContent: "center" }}>
              + Daftarkan Pasien Baru
            </Link>
            <Link href="/encounter" className="btn btn-secondary" style={{ justifyContent: "center" }}>
              + Buat Encounter Baru
            </Link>
            <Link href="/satusehat" className="btn btn-secondary" style={{ justifyContent: "center" }}>
              ⟲ Retry Sync Gagal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
