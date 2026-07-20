"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import { ICD10_LIST } from "@/app/lib/mock-data";

interface Props {
  params: Promise<{ id: string }>;
}

export default function AsesmenPage({ params }: { params: { id: string } }) {
  const encId = params.id ?? "e1";
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    keluhanUtama: "Batuk produktif dan sesak napas sejak 3 hari yang lalu",
    riwayatSekarang: "Pasien mengeluh batuk berdahak warna kekuningan, disertai sesak napas. Demam (+) tiga hari terakhir. Tidak ada riwayat trauma.",
    riwayatDahulu: "Hipertensi terkontrol sejak 5 tahun. Pernah rawat inap pneumonia 2021.",
    riwayatAlergi: "Penisilin — urtikaria",
    pemeriksaanFisik: "KU: tampak sakit sedang, CM\nTD: 130/85 mmHg, N: 92/mnt, S: 37.8°C, SpO2: 96%\nThorax: ronkhi basah halus bilateral, terutama basis\nAbdomen: datar, supel, BU normal\nEkstremitas: akral hangat",
    diagnosisKode: "J18.9",
  });

  const selectedDx = ICD10_LIST.find((d) => d.kode === form.diagnosisKode);

  const handleSave = () => setSaved(true);

  return (
    <div style={{ maxWidth: 860 }}>
      <PageHeader
        title="Asesmen Medis Awal"
        subtitle={`Encounter — ${encId}`}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/encounter/${encId}`} className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-primary" onClick={handleSave}>Simpan Asesmen</button>
          </div>
        }
      />

      {saved && (
        <div style={{
          padding: "0.625rem 1rem", background: "var(--sage-mist)", border: "1px solid #c8d9c4",
          borderRadius: 4, color: "var(--sage-deep)", marginBottom: "1rem", fontSize: "0.8125rem",
        }}>
          ✓ Asesmen berhasil disimpan
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Keluhan Utama */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>A — Keluhan Utama & Anamnesis</span></div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div>
              <label className="form-label" htmlFor="keluhan-utama">Keluhan Utama *</label>
              <input id="keluhan-utama" type="text" className="form-input"
                value={form.keluhanUtama}
                onChange={(e) => setForm({ ...form, keluhanUtama: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="riwayat-sekarang">Riwayat Penyakit Sekarang *</label>
              <textarea id="riwayat-sekarang" className="form-input" rows={4}
                value={form.riwayatSekarang}
                onChange={(e) => setForm({ ...form, riwayatSekarang: e.target.value })}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              <div>
                <label className="form-label" htmlFor="riwayat-dahulu">Riwayat Penyakit Dahulu</label>
                <textarea id="riwayat-dahulu" className="form-input" rows={3}
                  value={form.riwayatDahulu}
                  onChange={(e) => setForm({ ...form, riwayatDahulu: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="riwayat-alergi">Riwayat Alergi</label>
                <textarea id="riwayat-alergi" className="form-input" rows={3}
                  placeholder="Nama obat/bahan — reaksi alergi"
                  value={form.riwayatAlergi}
                  onChange={(e) => setForm({ ...form, riwayatAlergi: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pemeriksaan Fisik */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>B — Pemeriksaan Fisik</span></div>
          <div className="card-body">
            <label className="form-label" htmlFor="pemfis">Temuan Pemeriksaan Fisik *</label>
            <textarea id="pemfis" className="form-input" rows={6}
              value={form.pemeriksaanFisik}
              onChange={(e) => setForm({ ...form, pemeriksaanFisik: e.target.value })}
            />
          </div>
        </div>

        {/* Diagnosis */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>C — Diagnosis</span></div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <div>
              <label className="form-label" htmlFor="diagnosis-utama">Diagnosis Utama (ICD-10) *</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <select id="diagnosis-utama" className="form-input"
                  value={form.diagnosisKode}
                  onChange={(e) => setForm({ ...form, diagnosisKode: e.target.value })}
                >
                  <option value="">— Pilih ICD-10 —</option>
                  {ICD10_LIST.map((d) => (
                    <option key={d.kode} value={d.kode}>{d.kode} — {d.nama}</option>
                  ))}
                </select>
              </div>
              {selectedDx && (
                <div style={{
                  marginTop: "0.5rem", padding: "0.5rem 0.75rem",
                  background: "var(--sage-mist)", borderRadius: 4, fontSize: "0.8125rem",
                  display: "flex", gap: "0.75rem", alignItems: "center",
                }}>
                  <span className="rm-number">{selectedDx.kode}</span>
                  <span style={{ color: "var(--ink)" }}>{selectedDx.nama}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
