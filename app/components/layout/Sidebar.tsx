"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { group: "Utama", items: [
    { href: "/dashboard",    icon: "⊞", label: "Dashboard" },
    { href: "/pasien",       icon: "♥", label: "Pasien" },
    { href: "/appointment",  icon: "📅", label: "Appointment" },
    { href: "/encounter",    icon: "📋", label: "Encounter" },
  ]},
  { group: "Klinis", items: [
    { href: "/encounter",    icon: "🩺", label: "Semua Encounter" },
  ]},
  { group: "Sistem", items: [
    { href: "/satusehat",    icon: "⟲", label: "SatuSehat Sync" },
  ]},
];

const FLAT_NAV = [
  { href: "/dashboard",   icon: "⊞", label: "Dashboard" },
  { href: "/pasien",      icon: "♥", label: "Pasien" },
  { href: "/appointment", icon: "📅", label: "Appointment" },
  { href: "/encounter",   icon: "📋", label: "Encounter" },
  { href: "/satusehat",   icon: "⟲", label: "SatuSehat Sync" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-title">EMR Klinik</div>
        <div className="logo-sub">Rekam Medis Elektronik</div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section">Utama</div>
        {FLAT_NAV.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive(item.href) ? "active" : ""}`}
          >
            <span style={{ fontSize: "14px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="sidebar-section">Sistem</div>
        {FLAT_NAV.slice(4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive(item.href) ? "active" : ""}`}
          >
            <span style={{ fontSize: "14px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: "0.75rem 1.125rem",
        borderTop: "1px solid var(--line)",
        fontSize: "0.6875rem",
        color: "var(--ink-muted)",
      }}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>Klinik Sehat Sejahtera</div>
        <div>v1.0.0 — Fase 1 MVP</div>
      </div>
    </aside>
  );
}
