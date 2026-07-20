import Link from "next/link";
import { Geist_Mono } from "next/font/google";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--paper)" }}>
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid var(--line)",
        background: "var(--surface)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "2rem",
            height: "2rem",
            background: "var(--sage)",
            color: "#fff",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "1.2rem"
          }}>E</div>
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.25rem", color: "var(--ink)" }}>EMR Klinik</span>
        </div>
        <div>
          <Link href="/login" className="btn btn-primary" style={{ padding: "0.5rem 1.5rem" }}>
            Login Pegawai
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <section style={{
          textAlign: "center",
          padding: "5rem 1rem 4rem",
          maxWidth: "800px",
          width: "100%"
        }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem", lineHeight: 1.1, color: "var(--ink)" }}>
            Rekam Medis Digital,<br/> Bukan Dashboard Startup.
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--ink-muted)", marginBottom: "2.5rem", lineHeight: 1.6 }}>
            Sistem rekam medis elektronik terintegrasi yang dirancang khusus untuk alur kerja tenaga medis Indonesia. Dilengkapi dengan laporan otomatis ke SatuSehat Kemenkes.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/login" className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
              Coba MVP Sekarang
            </Link>
          </div>
        </section>

        {/* Value Propositions */}
        <section style={{
          background: "var(--surface)",
          width: "100%",
          padding: "4rem 2rem",
          borderTop: "1px solid var(--line)"
        }}>
          <div style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem"
          }}>
            {[
              {
                icon: "⚡",
                title: "Desain Padat & Klinis",
                desc: "Layout bergaya dokumen resmi dengan tabel informasi yang padat (dense). Dirancang untuk mempercepat dokter membaca riwayat pasien."
              },
              {
                icon: "🔗",
                title: "Terintegrasi SatuSehat",
                desc: "Seluruh pencatatan encounter, observasi, dan resep secara otomatis disinkronkan dengan server FHIR SatuSehat Kemenkes RI."
              },
              {
                icon: "👥",
                title: "Satu Platform, Semua Peran",
                desc: "Akses terspesialisasi untuk Dokter, Perawat, Apoteker, Laboratorium, dan Admin. Setiap staf memiliki antarmuka yang paling relevan dengan pekerjaannya."
              }
            ].map((feature, i) => (
              <div key={i} className="card" style={{ padding: "2rem", border: "1px solid var(--line)", background: "var(--paper)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{feature.icon}</div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "var(--ink-muted)", lineHeight: 1.5, fontSize: "0.95rem" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "2rem",
        textAlign: "center",
        borderTop: "1px solid var(--line)",
        background: "var(--surface)",
        color: "var(--ink-muted)",
        fontSize: "0.875rem"
      }}>
        <p>&copy; 2026 EMR Klinik Sehat Sejahtera. Sistem Manajemen Rekam Medis Fase 1.</p>
      </footer>
    </div>
  );
}
