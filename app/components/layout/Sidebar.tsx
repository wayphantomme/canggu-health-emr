"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRoleLabel, getRoleColor } from "@/app/lib/rbac";
import type { AppUser } from "@/app/lib/types";
import { LayoutDashboard, Users, Calendar, ClipboardList, RefreshCw, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

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
  { href: "/dashboard",   icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { href: "/pasien",      icon: <Users size={18} />, label: "Pasien" },
  { href: "/appointment", icon: <Calendar size={18} />, label: "Appointment" },
  { href: "/encounter",   icon: <ClipboardList size={18} />, label: "Encounter" },
  { href: "/satusehat",   icon: <RefreshCw size={18} />, label: "SatuSehat Sync" },
];

export default function Sidebar({ 
  user, 
  isOpen, 
  onClose,
  isCollapsed
}: { 
  user: AppUser; 
  isOpen?: boolean; 
  onClose?: () => void;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
      {/* User Profile (Top) */}
      <div style={{
        padding: isCollapsed ? "1rem 0" : "1.5rem 1rem",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}>
        <div style={{
          width: isCollapsed ? 40 : 64,
          height: isCollapsed ? 40 : 64,
          borderRadius: "50%",
          background: "var(--sage-mist)",
          border: "2px solid #fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isCollapsed ? "1rem" : "1.5rem",
          fontWeight: 600,
          color: "var(--sage-deep)",
          flexShrink: 0,
          transition: "all 0.2s"
        }}>
          {user.nama.charAt(0).toUpperCase()}
        </div>
        <div className="hide-on-collapse" style={{ marginTop: "0.75rem", width: "100%" }}>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>
            {user.nama}
          </div>
          <div style={{ marginTop: "0.375rem" }}>
            <span className={`badge ${getRoleColor(user.role)}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section hide-on-collapse">Utama</div>
        {FLAT_NAV.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive(item.href) ? "active" : ""}`}
            title={item.label}
          >
            <span className="nav-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</span>
            <span className="hide-on-collapse">{item.label}</span>
          </Link>
        ))}

        <div className="sidebar-section hide-on-collapse">Sistem</div>
        {FLAT_NAV.slice(4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-item ${isActive(item.href) ? "active" : ""}`}
            title={item.label}
          >
            <span className="nav-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</span>
            <span className="hide-on-collapse">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Action */}
      <div style={{
        marginTop: "auto",
        padding: "1rem 1.125rem",
        borderTop: "1px solid var(--line)",
      }}>
        <Link href="/" className="btn btn-ghost btn-sm" style={{ display: "flex", gap: "0.5rem", color: "var(--brick)", justifyContent: "center", width: "100%", padding: "0.5rem" }} title="Logout">
          <LogOut size={16} /> <span className="hide-on-collapse">Logout Sistem</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="hide-on-collapse" style={{
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
