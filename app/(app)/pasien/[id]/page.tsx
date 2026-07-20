import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import RMNumber from "@/app/components/ui/RMNumber";
import SyncStatusBadge from "@/app/components/ui/SyncStatusBadge";
import { MOCK_PATIENTS, MOCK_ENCOUNTERS } from "@/app/lib/mock-data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const patient = MOCK_PATIENTS.find((p) => p.id === id);
  return { title: patient ? patient.nama : "Pasien" };
}

export default async function PasienDetailPage({ params }: Props) {
  const { id } = await params;
  const patient = MOCK_PATIENTS.find((p) => p.id === id);
  if (!patient) notFound();

  const encounters = MOCK_ENCOUNTERS.filter((e) => e.patientId === id);

  const hitungUmur = (tgl: string) => {
    const diff = Date.now() - new Date(tgl).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const formatTgl = (iso: string) => {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  return (
    <div style={{ maxWidth: 960 }}>
      {/* Header */}
      <PageHeader
        title={patient.nama}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href="/pasien" className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-primary">+ Buat Encounter</button>
          </div>
        }
      />

      {/* Patient Card */}
      <div className="card" style={{ marginBottom: "1.25rem" }}>
        <div className="card-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
            <div>
              <div className="section-title">Identitas</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 2 }}>No. RM</div>
                  <RMNumber noRM={patient.noRM} />
                </div>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 2 }}>NIK</div>
                  <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--ink)" }}>
                    {patient.nik || "—"}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 2 }}>No. IHS SatuSehat</div>
                  {patient.noIHS ? (
                    <span className="font-mono" style={{ fontSize: "0.8rem", color: "var(--mono-tag)" }}>
                      {patient.noIHS}
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>Belum terdaftar</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="section-title">Data Diri</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", fontSize: "0.8125rem" }}>
                <div><span style={{ color: "var(--ink-muted)", marginRight: 8 }}>Lahir</span>{formatTgl(patient.tanggalLahir)} ({hitungUmur(patient.tanggalLahir)} tahun)</div>
                <div><span style={{ color: "var(--ink-muted)", marginRight: 8 }}>JK</span>{patient.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}</div>
                <div><span style={{ color: "var(--ink-muted)", marginRight: 8 }}>Telp</span>{patient.telepon}</div>
                <div><span style={{ color: "var(--ink-muted)", marginRight: 8 }}>Alamat</span>{patient.alamat}</div>
              </div>
            </div>
            <div>
              <div className="section-title">Status</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 4 }}>Status Pasien</div>
                  <span className={`badge ${patient.status === "aktif" ? "badge-sage" : "badge-brick"}`}>
                    {patient.status === "aktif" ? "Aktif" : "Nonaktif"}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 4 }}>Status SatuSehat</div>
                  <SyncStatusBadge status={patient.syncStatus} />
                </div>
                <div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: 4 }}>Total Kunjungan</div>
                  <span style={{ fontSize: "1.25rem", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                    {encounters.length}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginLeft: 4 }}>encounter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Encounter History */}
      <div className="card">
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Riwayat Encounter</span>
          <button className="btn btn-primary btn-sm">+ Buat Encounter</button>
        </div>
        <table className="dense-table">
          <thead>
            <tr>
              <th>No. Encounter</th>
              <th>Tanggal</th>
              <th>Tipe</th>
              <th>Dokter</th>
              <th>Keluhan</th>
              <th>Status</th>
              <th>Sync</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {encounters.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--ink-muted)" }}>
                  Belum ada encounter untuk pasien ini
                </td>
              </tr>
            ) : (
              encounters.map((enc) => {
                const statusConfig = {
                  draft:       { label: "Draft",       cls: "badge-neutral", tab: "draft" },
                  in_progress: { label: "In Progress", cls: "badge-amber",   tab: "progress" },
                  finished:    { label: "Selesai",     cls: "badge-sage",    tab: "finished" },
                };
                const s = statusConfig[enc.status];
                return (
                  <tr key={enc.id} className={`status-tab ${s.tab}`}>
                    <td>
                      <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--mono-tag)" }}>
                        {enc.noEncounter}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.8rem" }}>{formatTgl(enc.tanggal)}</td>
                    <td>
                      <span className="badge badge-neutral">
                        {enc.tipe === "clinic_visit" ? "Clinic" : "Home"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                      {enc.dokterNama.split(",")[0]}
                    </td>
                    <td style={{ fontSize: "0.8rem", maxWidth: 200 }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                        {enc.keluhan}
                      </span>
                    </td>
                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                    <td><SyncStatusBadge status={enc.syncStatus} /></td>
                    <td>
                      <Link href={`/encounter/${enc.id}`} className="btn btn-ghost btn-sm">
                        Buka →
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
