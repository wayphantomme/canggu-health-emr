"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import type { AppUser } from "@/app/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientAppShell({
  children,
  user,
  title,
}: {
  children: React.ReactNode;
  user: AppUser;
  title: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--paper)" }}>
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isCollapsed={isDesktopCollapsed}
      />

      {/* Backdrop for mobile */}
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>
        
        {/* Floating Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          className="hidden md:flex"
          style={{
            position: "absolute",
            top: "50%",
            left: "-14px",
            transform: "translateY(-50%)",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "50%",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-muted)",
            width: 28,
            height: 28,
            zIndex: 40,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          {isDesktopCollapsed ? (
            <ChevronRight size={16} strokeWidth={2.5} />
          ) : (
            <ChevronLeft size={16} strokeWidth={2.5} />
          )}
        </button>
        {/* Mobile Header (Hamburger Only) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-line">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <span className="font-bold text-ink">{title}</span>
          </div>
        </div>

        <main style={{ flex: 1, padding: "1.5rem", overflow: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
