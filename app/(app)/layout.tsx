import ClientAppShell from "@/app/components/layout/ClientAppShell";
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
  return "Electronic Medical Record";
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAppShell user={CURRENT_USER} title="Electronic Medical Record">
      {children}
    </ClientAppShell>
  );
}
