"use client";

import { useState } from "react";
import PageHeader from "@/app/components/ui/PageHeader";
import SyncStatusBadge from "@/app/components/ui/SyncStatusBadge";
import { MOCK_SYNC_LOGS } from "@/app/lib/mock-data";
import type { SyncStatus } from "@/app/lib/types";

export default function SatuSehatPage() {
  const [filterType, setFilterType] = useState<"all" | "Patient" | "Encounter" | "Observation" | "DiagnosticReport">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | SyncStatus>("all");

  const filtered = MOCK_SYNC_LOGS.filter((log) => {
    const matchType = filterType === "all" || log.resourceType === filterType;
    const matchStatus = filterStatus === "all" || log.status === filterStatus;
    return matchType && matchStatus;
  });

  const stats = {
    total: MOCK_SYNC_LOGS.length,
    sukses: MOCK_SYNC_LOGS.filter(l => l.status === "tersinkron").length,
    gagal: MOCK_SYNC_LOGS.filter(l => l.status === "gagal").length,
    pending: MOCK_SYNC_LOGS.filter(l => l.status === "belum_sync").length,
  };

  const handleRetry = (id: string) => {
    alert(`Mensimulasikan retry sync untuk ID: ${id}`);
  };

  const handleRetryAll = () => {
    alert("Mensimulasikan retry semua record yang gagal...");
  };

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleString("id-ID", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
  };

  return (
    <div style={{ maxWidth: 1100 }}>
      <PageHeader
        title="SatuSehat Sync"
        subtitle="Log sinkronisasi data ke server FHIR Kementerian Kesehatan"
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-secondary">⚙️ Pengaturan API</button>
            <button className="btn btn-primary" onClick={handleRetryAll} disabled={stats.gagal === 0}>
              ⟲ Retry {stats.gagal} Gagal
            </button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="card" style={{ padding: "1rem" }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 600 }}>Total Record</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, fontFamily: "var(--font-serif)" }}>{stats.total}</div>
        </div>
        <div className="card" style={{ padding: "1rem", borderTop: "3px solid var(--sage)" }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 600 }}>Tersinkron</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, fontFamily: "var(--font-serif)", color: "var(--sage)" }}>{stats.sukses}</div>
        </div>
        <div className="card" style={{ padding: "1rem", borderTop: stats.gagal > 0 ? "3px solid var(--brick)" : "" }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 600 }}>Gagal</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, fontFamily: "var(--font-serif)", color: stats.gagal > 0 ? "var(--brick)" : "inherit" }}>{stats.gagal}</div>
        </div>
        <div className="card" style={{ padding: "1rem" }}>
          <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 600 }}>Pending Queue</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, fontFamily: "var(--font-serif)" }}>{stats.pending}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
        <div>
          <label className="form-label" htmlFor="filter-type">Resource Tipe</label>
          <select id="filter-type" className="form-input" value={filterType} onChange={(e) => setFilterType(e.target.value as any)}>
            <option value="all">Semua Tipe</option>
            <option value="Patient">Patient</option>
            <option value="Encounter">Encounter</option>
            <option value="Observation">Observation (Lab/Vital)</option>
            <option value="DiagnosticReport">DiagnosticReport (Hasil Lab/Rad)</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="filter-status">Status</label>
          <select id="filter-status" className="form-input" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
            <option value="all">Semua Status</option>
            <option value="tersinkron">Tersinkron</option>
            <option value="gagal">Gagal</option>
            <option value="belum_sync">Belum Sync (Pending)</option>
          </select>
        </div>
      </div>

      {/* Log Table */}
      <div className="card">
        <table className="dense-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Resource</th>
              <th>Deskripsi / ID</th>
              <th>Status</th>
              <th>Pesan Error</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--ink-muted)" }}>
                  Tidak ada log yang sesuai filter
                </td>
              </tr>
            ) : (
              filtered.sort((a, b) => new Date(b.lastAttempt).getTime() - new Date(a.lastAttempt).getTime()).map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>{formatTime(log.lastAttempt)}</td>
                  <td><span className="badge badge-neutral" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}>{log.resourceType}</span></td>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: "0.8125rem" }}>{log.resourceLabel}</div>
                    <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>ID: {log.resourceId}</div>
                  </td>
                  <td><SyncStatusBadge status={log.status} /></td>
                  <td style={{ maxWidth: 250 }}>
                    {log.errorMessage ? (
                      <div style={{ color: "var(--brick)", fontSize: "0.75rem", lineHeight: 1.3 }}>
                        {log.errorMessage}
                        <div style={{ marginTop: 2, fontSize: "0.65rem", color: "var(--ink-muted)" }}>Retries: {log.retryCount}</div>
                      </div>
                    ) : (
                      <span style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>—</span>
                    )}
                  </td>
                  <td>
                    {log.status === "gagal" && (
                      <button className="btn btn-secondary btn-sm" onClick={() => handleRetry(log.id)}>Retry</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ padding: "0.625rem 0.75rem", borderTop: "1px solid var(--line)", fontSize: "0.75rem", color: "var(--ink-muted)" }}>
          Menampilkan {filtered.length} dari {MOCK_SYNC_LOGS.length} log sinkronisasi
        </div>
      </div>
    </div>
  );
}
