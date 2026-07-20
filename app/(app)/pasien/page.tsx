"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import RMNumber from "@/app/components/ui/RMNumber";
import SyncStatusBadge from "@/app/components/ui/SyncStatusBadge";
import { MOCK_PATIENTS } from "@/app/lib/mock-data";

export default function PasienPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "aktif" | "nonaktif">("all");
  const [filterSync, setFilterSync] = useState<"all" | "tersinkron" | "belum_sync" | "gagal">("all");

  const filtered = MOCK_PATIENTS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.nama.toLowerCase().includes(q) ||
      p.noRM.toLowerCase().includes(q) ||
      p.telepon.includes(q) ||
      (p.noIHS && p.noIHS.toLowerCase().includes(q));
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchSync = filterSync === "all" || p.syncStatus === filterSync;
    return matchSearch && matchStatus && matchSync;
  });

  const hitungUmur = (tgl: string) => {
    const diff = Date.now() - new Date(tgl).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <div style={{ maxWidth: 1100 }}>
      <PageHeader
        title="Manajemen Pasien"
        subtitle={`${MOCK_PATIENTS.filter((p) => p.status === "aktif").length} pasien aktif terdaftar`}
        actions={
          <Link href="/pasien/baru" className="btn btn-primary">
            + Pasien Baru
          </Link>
        }
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <div className="search-bar" style={{ flex: "1 1 220px", minWidth: 200 }}>
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="search-pasien"
            type="text"
            className="form-input"
            placeholder="Cari nama, No. RM, telepon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          id="filter-status-pasien"
          className="form-input"
          style={{ width: 140 }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
        >
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
        <select
          id="filter-sync-pasien"
          className="form-input"
          style={{ width: 150 }}
          value={filterSync}
          onChange={(e) => setFilterSync(e.target.value as typeof filterSync)}
        >
          <option value="all">Semua Sync</option>
          <option value="tersinkron">Tersinkron</option>
          <option value="belum_sync">Belum Sync</option>
          <option value="gagal">Gagal</option>
        </select>
      </div>

      {/* Table */}
      <div className="card">
        <table className="dense-table">
          <thead>
            <tr>
              <th>No. RM</th>
              <th>Nama Pasien</th>
              <th>No. IHS</th>
              <th>JK</th>
              <th>Umur</th>
              <th>Telepon</th>
              <th>Status</th>
              <th>SatuSehat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "2rem", color: "var(--ink-muted)" }}>
                  Tidak ada pasien yang sesuai filter
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <RMNumber noRM={p.noRM} />
                  </td>
                  <td>
                    <Link
                      href={`/pasien/${p.id}`}
                      style={{ fontWeight: 600, color: "var(--ink)", textDecoration: "none", fontSize: "0.8125rem" }}
                    >
                      {p.nama}
                    </Link>
                  </td>
                  <td>
                    {p.noIHS ? (
                      <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--mono-tag)" }}>
                        {p.noIHS}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink-muted)", fontSize: "0.75rem" }}>—</span>
                    )}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>{p.jenisKelamin}</td>
                  <td style={{ fontSize: "0.8rem" }}>{hitungUmur(p.tanggalLahir)} th</td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>{p.telepon}</td>
                  <td>
                    <span className={`badge ${p.status === "aktif" ? "badge-sage" : "badge-brick"}`}>
                      {p.status === "aktif" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td>
                    <SyncStatusBadge status={p.syncStatus} />
                  </td>
                  <td>
                    <Link href={`/pasien/${p.id}`} className="btn btn-ghost btn-sm">
                      Detail →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div style={{
          padding: "0.625rem 0.75rem",
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          color: "var(--ink-muted)",
        }}>
          <span>Menampilkan {filtered.length} dari {MOCK_PATIENTS.length} pasien</span>
          <span>Halaman 1 dari 1</span>
        </div>
      </div>
    </div>
  );
}
