import Sidebar from "@/app/components/layout/Sidebar";
import Topbar from "@/app/components/layout/Topbar";
import type { AppUser } from "@/app/lib/types";

// Mock current user — in production this comes from auth session
const CURRENT_USER: AppUser = {
  id: "u1",
  nama: "dr. Rendra Pratama, Sp.PD",
  role: "dokter",
  unit: "Poli Penyakit Dalam",
};

// Map of routes to their display titles
function getTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/pasien/baru")) return "Registrasi Pasien Baru";
  if (pathname.startsWith("/pasien")) return "Manajemen Pasien";
  if (pathname.startsWith("/appointment")) return "Appointment";
  if (pathname.startsWith("/encounter")) return "Encounter";
  if (pathname.startsWith("/satusehat")) return "SatuSehat Sync";
  return "EMR Klinik";
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--paper)" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopbarWrapper user={CURRENT_USER} />
        <main style={{ flex: 1, padding: "1.5rem", overflow: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// Server component wrapper for topbar
function TopbarWrapper({ user }: { user: AppUser }) {
  return <Topbar user={user} title="EMR Klinik" />;
}
