"use client";

import { useState } from "react";
import PageHeader from "@/app/components/ui/PageHeader";
import RMNumber from "@/app/components/ui/RMNumber";
import { MOCK_APPOINTMENTS } from "@/app/lib/mock-data";
import type { AppointmentStatus } from "@/app/lib/types";

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; cls: string; tab: string }> = {
  booked:     { label: "Booked",     cls: "badge-sage",    tab: "booked" },
  checked_in: { label: "Check-in",   cls: "badge-amber",   tab: "checkin" },
  cancelled:  { label: "Dibatalkan", cls: "badge-brick",   tab: "cancelled" },
  done:       { label: "Selesai",    cls: "badge-neutral", tab: "finished" },
};

export default function AppointmentPage() {
  const [filterDate, setFilterDate] = useState("2026-07-20");
  const [filterStatus, setFilterStatus] = useState<"all" | AppointmentStatus>("all");
  const [filterDokter, setFilterDokter] = useState("all");

  const allDokter = Array.from(new Set(MOCK_APPOINTMENTS.map((a) => a.dokterNama)));

  const filtered = MOCK_APPOINTMENTS.filter((a) => {
    const matchDate = !filterDate || a.tanggal === filterDate;
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    const matchDokter = filterDokter === "all" || a.dokterNama === filterDokter;
    return matchDate && matchStatus && matchDokter;
  });

  const formatTgl = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

  return (
    <div style={{ maxWidth: 1100 }}>
      <PageHeader
        title="Appointment"
        subtitle="Jadwal kunjungan pasien per dokter"
        actions={
          <button className="btn btn-primary">+ Appointment Baru</button>
        }
      />

      {/* Summary pills */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {(["all", "booked", "checked_in", "cancelled", "done"] as const).map((s) => {
          const count = s === "all"
            ? MOCK_APPOINTMENTS.filter((a) => !filterDate || a.tanggal === filterDate).length
            : MOCK_APPOINTMENTS.filter((a) => a.status === s && (!filterDate || a.tanggal === filterDate)).length;
          const cfg = s === "all" ? { label: "Semua", cls: "badge-neutral" } : STATUS_CONFIG[s];
          return (
            <button
              key={s}
              className={`badge ${filterStatus === s ? cfg.cls : "badge-neutral"}`}
              style={{ cursor: "pointer", padding: "4px 12px", fontSize: "0.8rem" }}
              onClick={() => setFilterStatus(s)}
            >
              {s === "all" ? "Semua" : cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
        <div>
          <label className="form-label" htmlFor="filter-date">Tanggal</label>
          <input
            id="filter-date"
            type="date"
            className="form-input"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="filter-dokter">Dokter</label>
          <select
            id="filter-dokter"
            className="form-input"
            style={{ minWidth: 220 }}
            value={filterDokter}
            onChange={(e) => setFilterDokter(e.target.value)}
          >
            <option value="all">Semua Dokter</option>
            {allDokter.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {filterDate && (
        <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginBottom: "0.5rem" }}>
          {formatTgl(filterDate)} — {filtered.length} appointment
        </div>
      )}

      {/* Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="dense-table">
            <thead>
            <tr>
              <th>Jam</th>
              <th>Pasien</th>
              <th>Dokter</th>
              <th>Keluhan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "var(--ink-muted)" }}>
                  Tidak ada appointment pada tanggal/filter ini
                </td>
              </tr>
            ) : (
              filtered
                .sort((a, b) => a.jam.localeCompare(b.jam))
                .map((apt) => {
                  const s = STATUS_CONFIG[apt.status];
                  return (
                    <tr key={apt.id}>
                      <td className={`status-tab ${s.tab}`}>
                        <span className="font-mono" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)" }}>
                          {apt.jam}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{apt.patientNama}</div>
                        <RMNumber noRM={apt.patientNoRM} />
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>{apt.dokterNama}</td>
                      <td style={{ fontSize: "0.8rem", maxWidth: 240 }}>
                        <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {apt.keluhan}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${s.cls}`}>{s.label}</span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.375rem" }}>
                          {apt.status === "booked" && (
                            <button className="btn btn-secondary btn-sm">Check-in</button>
                          )}
                          {apt.status === "checked_in" && (
                            <button className="btn btn-primary btn-sm">Buat Encounter →</button>
                          )}
                        </div>
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
          Menampilkan {filtered.length} dari {MOCK_APPOINTMENTS.length} appointment
        </div>
      </div>
    </div>
  );
}
