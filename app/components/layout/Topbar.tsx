"use client";

import Link from "next/link";

import { getRoleLabel, getRoleColor } from "@/app/lib/rbac";
import type { AppUser } from "@/app/lib/types";

interface TopbarProps {
  user: AppUser;
  title: string;
}

export default function Topbar({ user, title }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <span className={`badge ${getRoleColor(user.role)}`}>
          {getRoleLabel(user.role)}
        </span>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.25rem 0.5rem",
          borderRadius: 4,
          cursor: "pointer",
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "var(--sage-mist)",
            border: "1px solid var(--line)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--sage-deep)",
          }}>
            {user.nama.charAt(0).toUpperCase()}
          </div>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--ink)" }}>
              {user.nama}
            </div>
            {user.unit && (
              <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)" }}>
                {user.unit}
              </div>
            )}
          </div>
        </div>
        <Link href="/" className="btn btn-ghost btn-sm" style={{ color: "var(--brick)" }}>
          Logout
        </Link>
      </div>
    </header>
  );
}
