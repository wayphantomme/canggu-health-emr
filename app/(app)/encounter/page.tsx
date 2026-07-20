"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import RMNumber from "@/app/components/ui/RMNumber";
import SyncStatusBadge from "@/app/components/ui/SyncStatusBadge";
import { MOCK_ENCOUNTERS } from "@/app/lib/mock-data";
import type { EncounterStatus, EncounterType } from "@/app/lib/types";

const STATUS_CONFIG: Record<EncounterStatus, { label: string; cls: string; tab: string }> = {
  draft:       { label: "Draft",       cls: "badge-neutral", tab: "draft" },
  in_progress: { label: "In Progress", cls: "badge-amber",   tab: "progress" },
  finished:    { label: "Selesai",     cls: "badge-sage",    tab: "finished" },
};

export default function EncounterPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | EncounterStatus>("all");
  const [filterType, setFilterType] = useState<"all" | EncounterType>("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_ENCOUNTERS.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.patientNama.toLowerCase().includes(q) ||
      e.patientNoRM.toLowerCase().includes(q) ||
      e.noEncounter.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    const matchType = filterType === "all" || e.tipe === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const formatTgl = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });

  return (
    <div style={{ maxWidth: 1100 }}>
      <PageHeader
        title="Encounter"
        subtitle="Daftar seluruh kunjungan pasien"
        actions={
          <button className="btn btn-primary">+ Encounter Baru</button>
        }
      />

      {/* Status filter pills */}
      <div style={{ display: "flex", gap: "0.625rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {(["all", "draft", "in_progress", "finished"] as const).map((s) => {
          const count = s === "all"
            ? MOCK_ENCOUNTERS.length
            : MOCK_ENCOUNTERS.filter((e) => e.status === s).length;
          const cfg = s === "all"
            ? { label: "Semua", cls: "badge-neutral" }
            : STATUS_CONFIG[s as EncounterStatus];
          return (
            <button
              key={s}
              className={`badge ${filterStatus === s ? cfg.cls : "badge-neutral"}`}
              style={{ cursor: "pointer", padding: "4px 12px", fontSize: "0.8rem" }}
              onClick={() => setFilterStatus(s)}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
        <div style={{ marginLeft: "auto" }}>
          <select
            id="filter-tipe-encounter"
            className="form-input"
            style={{ width: 150, height: 30, fontSize: "0.8rem", padding: "2px 8px" }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as typeof filterType)}
          >
            <option value="all">Semua Tipe</option>
            <option value="clinic_visit">Clinic Visit</option>
            <option value="home_visit">Home Visit</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar" style={{ marginBottom: "1rem" }}>
        <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          id="search-encounter"
          type="text"
          className="form-input"
          style={{ maxWidth: 340 }}
          placeholder="Cari nama pasien, No. RM, No. Encounter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="dense-table">
            <thead>
            <tr>
              <th>No. Encounter</th>
              <th>Pasien</th>
              <th>Tipe</th>
              <th>Tanggal</th>
              <th>Dokter</th>
              <th>Modul</th>
              <th>Status</th>
              <th>Sync</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "2rem", color: "var(--ink-muted)" }}>
                  Tidak ada encounter
                </td>
              </tr>
            ) : (
              filtered
                .sort((a, b) => b.tanggal.localeCompare(a.tanggal))
                .map((enc) => {
                  const s = STATUS_CONFIG[enc.status];
                  return (
                    <tr key={enc.id}>
                      <td className={`status-tab ${s.tab}`}>
                        <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--mono-tag)" }}>
                          {enc.noEncounter}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{enc.patientNama}</div>
                        <RMNumber noRM={enc.patientNoRM} />
                      </td>
                      <td>
                        <span className="badge badge-neutral" style={{ fontSize: "0.6875rem" }}>
                          {enc.tipe === "clinic_visit" ? "Clinic" : "Home"}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{formatTgl(enc.tanggal)}</td>
                      <td style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                        {enc.dokterNama.split(",")[0]}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          {enc.modulesCompleted.map((m) => (
                            <span key={m} className="badge badge-sage" style={{ fontSize: "0.6rem" }}>
                              {m}
                            </span>
                          ))}
                          {enc.modulesCompleted.length === 0 && (
                            <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>—</span>
                          )}
                        </div>
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
        <div style={{
          padding: "0.625rem 0.75rem",
          borderTop: "1px solid var(--line)",
          fontSize: "0.75rem",
          color: "var(--ink-muted)",
        }}>
          {filtered.length} dari {MOCK_ENCOUNTERS.length} encounter
        </div>
      </div>
    </div>
  );
}
