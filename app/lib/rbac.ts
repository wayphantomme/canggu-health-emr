import type { Role } from "./types";

// ─────────────────────────────────────────────
// RBAC — Role-Based Access Control
// ─────────────────────────────────────────────

export type Permission =
  | "pasien:read"
  | "pasien:write"
  | "appointment:read"
  | "appointment:write"
  | "encounter:read"
  | "encounter:write"
  | "encounter:create"
  | "asesmen:read"
  | "asesmen:write"
  | "bedah:read"
  | "bedah:write"
  | "resep:read"
  | "resep:write"
  | "lab:read"
  | "lab:write"
  | "radiologi:read"
  | "radiologi:write"
  | "discharge:read"
  | "discharge:write"
  | "satusehat:read"
  | "laporan:read";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "pasien:read", "pasien:write",
    "appointment:read", "appointment:write",
    "encounter:read", "encounter:create",
    "resep:read", "lab:read", "radiologi:read",
    "discharge:read", "satusehat:read",
  ],
  dokter: [
    "pasien:read", "pasien:write",
    "appointment:read",
    "encounter:read", "encounter:write", "encounter:create",
    "asesmen:read", "asesmen:write",
    "bedah:read", "bedah:write",
    "resep:read", "resep:write",
    "lab:read", "lab:write",
    "radiologi:read", "radiologi:write",
    "discharge:read", "discharge:write",
    "satusehat:read",
  ],
  perawat: [
    "pasien:read",
    "appointment:read",
    "encounter:read", "encounter:write",
    "asesmen:read",
    "lab:read", "radiologi:read",
    "resep:read",
    "discharge:read",
  ],
  apoteker: [
    "pasien:read",
    "encounter:read",
    "resep:read", "resep:write",
  ],
  lab: [
    "pasien:read",
    "encounter:read",
    "lab:read", "lab:write",
  ],
  manajemen: [
    "pasien:read",
    "encounter:read",
    "laporan:read",
    "satusehat:read",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getRoleLabel(role: Role): string {
  const labels: Record<Role, string> = {
    admin: "Admin / Resepsionis",
    dokter: "Dokter",
    perawat: "Perawat",
    apoteker: "Apoteker",
    lab: "Lab / Radiografer",
    manajemen: "Manajemen",
  };
  return labels[role];
}

export function getRoleColor(role: Role): string {
  const colors: Record<Role, string> = {
    admin: "badge-sage",
    dokter: "badge-sage",
    perawat: "badge-amber",
    apoteker: "badge-neutral",
    lab: "badge-neutral",
    manajemen: "badge-mono",
  };
  return colors[role];
}
