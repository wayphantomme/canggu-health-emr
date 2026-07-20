import Link from "next/link";
import AnimatedEMRMockup from "./components/landing/AnimatedEMRMockup";
import { Stethoscope, ShieldCheck, Database, Mail } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--paper)", color: "var(--ink)" }}>
      {/* Navigation */}
      <header className="px-4 py-4 md:px-8 border-b" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "var(--line)",
        background: "var(--surface)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "24px",
            height: "24px",
            background: "var(--sage-deep)",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.125rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>
            Canggu Health EMR
          </span>
        </div>
        <div className="hidden md:flex" style={{ gap: "1rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--ink-muted)", cursor: "pointer", fontWeight: 500 }}>Fitur</span>
          <span style={{ fontSize: "0.875rem", color: "var(--ink-muted)", cursor: "pointer", fontWeight: 500 }}>Integrasi</span>
          <span style={{ fontSize: "0.875rem", color: "var(--ink-muted)", cursor: "pointer", fontWeight: 500 }}>Keamanan</span>
          <div style={{ width: "1px", height: "16px", background: "var(--line)", margin: "0 0.5rem" }} />
          <Link href="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
            Lihat Sistem
          </Link>
        </div>
        <div className="flex md:hidden">
          <Link href="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
            Login
          </Link>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* 1. Hero Section */}
        <section style={{
          padding: "4rem 2rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-ink leading-tight tracking-tight">
            Sistem Rekam Medis Terintegrasi untuk Klinik dan Rumah Sakit
          </h1>
          <p style={{ 
            fontSize: "1.125rem", 
            color: "var(--ink-muted)", 
            marginBottom: "2rem", 
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 2rem"
          }}>
            Kelola data pasien, resep, dan laporan secara terpusat. Terintegrasi dengan SatuSehat dan berstandar FHIR untuk operasional yang efisien.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/login" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
              Request Demo
            </Link>
            <Link href="/login" className="btn btn-secondary" style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
              Lihat Sistem
            </Link>
          </div>
        </section>

        {/* 2. Product Preview — Animated */}
        <section style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
          <AnimatedEMRMockup />
        </section>

        {/* 3. Value Proposition */}
        <section style={{ padding: "4rem 2rem", background: "var(--surface)", borderTop: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, textAlign: "center", marginBottom: "3rem" }}>Manfaat Terukur untuk Faskes Anda</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--sage-deep)", marginBottom: "0.5rem" }}>↓ 40%</div>
                <div style={{ fontSize: "0.875rem", color: "var(--ink-muted)", fontWeight: 500 }}>Mengurangi waktu input data</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--sage-deep)", marginBottom: "0.5rem" }}>↓ 85%</div>
                <div style={{ fontSize: "0.875rem", color: "var(--ink-muted)", fontWeight: 500 }}>Mengurangi kesalahan pencatatan</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--sage-deep)", marginBottom: "0.5rem" }}>100%</div>
                <div style={{ fontSize: "0.875rem", color: "var(--ink-muted)", fontWeight: 500 }}>Otomatisasi laporan ke SatuSehat</div>
              </div>
              <div>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--sage-deep)", marginBottom: "0.5rem" }}>5+</div>
                <div style={{ fontSize: "0.875rem", color: "var(--ink-muted)", fontWeight: 500 }}>Akses multi-role terpisah</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section style={{ padding: "4rem 2rem", background: "var(--paper)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "3rem" }}>Fungsi Spesifik Rekam Medis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ padding: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, height: "fit-content" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink)" }}>
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>Clinical Interface</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Tampilan menyerupai format rekam medis konvensional agar mudah dipahami tenaga medis.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ padding: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, height: "fit-content" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink)" }}>
                    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>SatuSehat Integration</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Sinkronisasi data pasien dan laporan secara otomatis ke sistem Kemenkes.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ padding: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, height: "fit-content" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink)" }}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>Multi Role Access</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Hak akses terpisah untuk dokter, perawat, admin, dan apotek.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ padding: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, height: "fit-content" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink)" }}>
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>Secure Data Handling</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Manajemen data pasien dengan standar keamanan sistem kesehatan.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Trust Section */}
        <section style={{ padding: "5rem 2rem", background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--ink)" }}>Standar Operasional</h2>
              <p style={{ color: "var(--ink-muted)", fontSize: "1rem" }}>Infrastruktur yang dibangun dengan kepatuhan tinggi terhadap regulasi kesehatan.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div style={{ 
                background: "var(--paper)", 
                padding: "2rem", 
                borderRadius: "12px", 
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default"
              }} className="hover:-translate-y-1 hover:shadow-lg">
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  background: "var(--sage-mist)", 
                  color: "var(--sage-deep)", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}>
                  <Stethoscope size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>Alur Kerja Klinis</h3>
                <p style={{ color: "var(--ink-muted)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  Dirancang khusus mengikuti kebiasaan dan alur kerja tenaga medis di Indonesia untuk transisi digital yang mulus.
                </p>
              </div>

              {/* Card 2 */}
              <div style={{ 
                background: "var(--paper)", 
                padding: "2rem", 
                borderRadius: "12px", 
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default"
              }} className="hover:-translate-y-1 hover:shadow-lg">
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  background: "var(--sage-mist)", 
                  color: "var(--sage-deep)", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>Siap SatuSehat</h3>
                <p style={{ color: "var(--ink-muted)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  Terintegrasi langsung dengan platform SatuSehat Kemenkes untuk pelaporan otomatis tanpa kerja ganda.
                </p>
              </div>

              {/* Card 3 */}
              <div style={{ 
                background: "var(--paper)", 
                padding: "2rem", 
                borderRadius: "12px", 
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default"
              }} className="hover:-translate-y-1 hover:shadow-lg">
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  background: "var(--sage-mist)", 
                  color: "var(--sage-deep)", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginBottom: "1.25rem"
                }}>
                  <Database size={24} />
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem" }}>Standar FHIR</h3>
                <p style={{ color: "var(--ink-muted)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  Penyimpanan data berbasis protokol FHIR (Fast Healthcare Interoperability Resources) standar global.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Final CTA */}
        <section style={{ padding: "5rem 2rem", textAlign: "center", background: "var(--paper)" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", color: "var(--ink)" }}>Siap meningkatkan efisiensi operasional klinik Anda?</h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/login" className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
              Jadwalkan Demo
            </Link>
            <Link href="/login" className="btn btn-secondary" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
              Hubungi Tim
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--line)",
        padding: "4rem 2rem 2rem",
        color: "var(--ink-muted)",
        fontSize: "0.875rem"
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: 24, height: 24, background: "var(--sage-deep)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>Canggu Health</span>
              </div>
              <p style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Sistem rekam medis modern yang dirancang khusus untuk efisiensi fasilitas kesehatan di seluruh Indonesia.
              </p>
              <div style={{ display: "flex", gap: "1rem", color: "var(--ink-muted)" }}>
                <a href="#" className="hover:text-sage-deep transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="hover:text-sage-deep transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="hover:text-sage-deep transition-colors"><Mail size={18} /></a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "1rem" }}>Produk</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Fitur Rekam Medis</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Integrasi SatuSehat</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Manajemen Klinik</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Keamanan Data</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Harga</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "1rem" }}>Perusahaan</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Tentang Kami</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Karir</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Blog & Edukasi</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Pusat Bantuan</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Kontak</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "1rem" }}>Legal</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Perjanjian Layanan</Link></li>
                <li><Link href="#" className="hover:text-sage-deep transition-colors">Keamanan Sistem</Link></li>
              </ul>
            </div>

          </div>

          <div style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.8125rem"
          }} className="md:flex-row text-center md:text-left">
            <p>&copy; 2026 Canggu Health EMR. Hak cipta dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
