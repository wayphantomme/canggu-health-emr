"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import { ICD10_LIST, MOCK_PRESCRIPTIONS } from "@/app/lib/mock-data";

export default function DischargePage({ params }: { params: { id: string } }) {
  const encId = params.id ?? "e1";
  const [saved, setSaved] = useState(false);
  
  // In a real app, these are auto-pulled from the encounter state
  const resep = MOCK_PRESCRIPTIONS.find((r) => r.encounterId === encId);
  const obatLanjutan = resep?.items || [];

  const [form, setForm] = useState({
    diagnosisUtama: "J18.9",
    metodePulang: "pulang_biasa",
    jadwalKontrol: "2026-07-27",
    ringkasanKlinis: "Pasien datang dengan keluhan batuk produktif dan sesak napas. Hasil lab menunjukkan leukositosis. Rontgen thorax kesan pneumonia. Pasien telah diberikan antibiotik empiris. Kondisi saat pulang membaik, sesak napas berkurang.",
  });

  const selectedDx = ICD10_LIST.find((d) => d.kode === form.diagnosisUtama);

  return (
    <div style={{ maxWidth: 860 }}>
      <PageHeader
        title="Discharge Summary"
        subtitle={`Encounter — ${encId}`}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/encounter/${encId}`} className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-secondary" onClick={() => window.print()}>🖨 Cetak</button>
            <button className="btn btn-primary" onClick={() => setSaved(true)}>Simpan & Tutup</button>
          </div>
        }
      />

      {saved && (
        <div style={{ padding: "0.625rem 1rem", background: "var(--sage-mist)", border: "1px solid #c8d9c4", borderRadius: 4, color: "var(--sage-deep)", marginBottom: "1rem", fontSize: "0.8125rem" }}>
          ✓ Discharge Summary berhasil disimpan. Encounter ini sekarang siap untuk ditutup.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Diagnosis & Klinis */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Diagnosis Pulang & Ringkasan</span></div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div>
              <label className="form-label" htmlFor="dx-utama">Diagnosis Utama Pulang (ICD-10) *</label>
              <select id="dx-utama" className="form-input"
                value={form.diagnosisUtama}
                onChange={(e) => setForm({ ...form, diagnosisUtama: e.target.value })}
              >
                <option value="">— Pilih ICD-10 —</option>
                {ICD10_LIST.map((d) => (
                  <option key={d.kode} value={d.kode}>{d.kode} — {d.nama}</option>
                ))}
              </select>
              {selectedDx && (
                <div style={{ marginTop: "0.5rem", padding: "0.5rem 0.75rem", background: "var(--sage-mist)", borderRadius: 4, fontSize: "0.8125rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <span className="rm-number">{selectedDx.kode}</span>
                  <span style={{ color: "var(--ink)" }}>{selectedDx.nama}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="ringkasan">Ringkasan Klinis *</label>
              <textarea id="ringkasan" className="form-input" rows={4}
                value={form.ringkasanKlinis}
                onChange={(e) => setForm({ ...form, ringkasanKlinis: e.target.value })}
                placeholder="Ringkasan singkat jalannya pelayanan..."
              />
            </div>
          </div>
        </div>

        {/* Obat Lanjutan */}
        <div className="card">
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Obat Lanjutan (Dibawa Pulang)</span>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>Auto-pull dari E-Resep</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {obatLanjutan.length === 0 ? (
              <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
                Tidak ada resep obat
              </div>
            ) : (
              <table className="dense-table" style={{ borderTop: "none" }}>
                <thead>
                  <tr>
                    <th>Obat</th>
                    <th>Dosis</th>
                    <th>Frekuensi</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {obatLanjutan.map((obat) => (
                    <tr key={obat.id}>
                      <td style={{ fontWeight: 500 }}>{obat.namaObat}</td>
                      <td>{obat.dosis}</td>
                      <td>{obat.frekuensi}</td>
                      <td className="font-mono">{obat.jumlah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Metode Pulang & Kontrol */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Tindak Lanjut</span></div>
          <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <div>
              <label className="form-label" htmlFor="metode">Kondisi Pulang *</label>
              <select id="metode" className="form-input"
                value={form.metodePulang}
                onChange={(e) => setForm({ ...form, metodePulang: e.target.value })}
              >
                <option value="pulang_biasa">Pulang Biasa (Rawat Jalan)</option>
                <option value="rujuk">Rujuk ke RS/Faskes Lain</option>
                <option value="atas_permintaan">Pulang Atas Permintaan Sendiri (PAPS)</option>
                <option value="meninggal">Meninggal Dunia</option>
              </select>
            </div>
            {form.metodePulang === "pulang_biasa" && (
              <div>
                <label className="form-label" htmlFor="kontrol">Jadwal Kontrol Berikutnya</label>
                <input id="kontrol" type="date" className="form-input"
                  value={form.jadwalKontrol}
                  onChange={(e) => setForm({ ...form, jadwalKontrol: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
