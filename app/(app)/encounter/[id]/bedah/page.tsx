"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import { ICD10_LIST } from "@/app/lib/mock-data";

const ASA_CLASS = [
  { value: "I", label: "ASA I — Sehat" },
  { value: "II", label: "ASA II — Penyakit sistemik ringan" },
  { value: "III", label: "ASA III — Penyakit sistemik berat" },
  { value: "IV", label: "ASA IV — Penyakit sistemik berat, ancaman jiwa" },
  { value: "V", label: "ASA V — Moribund, tidak diharapkan hidup 24 jam" },
];

export default function BedahPage({ params }: { params: { id: string } }) {
  const encId = params.id ?? "e1";
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    diagnosisPraOpKode: "J18.9",
    prosedur: "Lobektomi kanan",
    dokterOperator: "dr. Rendra Pratama, Sp.PD",
    dokterAnestesi: "dr. Andi Saputra, Sp.An",
    jenisAnestesi: "Anestesi Umum (GA)",
    riwayatMedis: "Pneumonia lobaris kanan. Tidak ada riwayat operasi sebelumnya. Alergi penisilin.",
    pemeriksaanFisik: "TD 130/85, Nadi 92x/mnt, Suhu 37.8°C, SpO2 96%. Penurunan suara napas kanan.",
    hasilLab: "Hb 11.2 g/dL, Leukosit 12500, Trombosit 235000. PT/APTT normal.",
    asaClass: "III",
    rencanaTindakan: "Drainage pleura kanan + antibiotik IV. Target SpO2 >95%.",
    persetujuan: false,
    catatan: "",
  });

  const selectedDx = ICD10_LIST.find((d) => d.kode === form.diagnosisPraOpKode);

  const sections = [
    { key: "riwayatMedis",      label: "A — Riwayat Medis",        field: "riwayatMedis" },
    { key: "pemeriksaanFisik",  label: "B — Pemeriksaan Fisik",     field: "pemeriksaanFisik" },
    { key: "hasilLab",          label: "C — Hasil Lab & Penunjang", field: "hasilLab" },
    { key: "rencanaTindakan",   label: "E — Rencana Tindakan",      field: "rencanaTindakan" },
    { key: "catatan",           label: "G — Catatan Tambahan",      field: "catatan" },
  ];

  return (
    <div style={{ maxWidth: 860 }}>
      <PageHeader
        title="Asesmen Bedah & Anestesi"
        subtitle={`Encounter — ${encId}`}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/encounter/${encId}`} className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-primary" onClick={() => setSaved(true)}>Simpan</button>
          </div>
        }
      />

      {saved && (
        <div style={{ padding: "0.625rem 1rem", background: "var(--sage-mist)", border: "1px solid #c8d9c4", borderRadius: 4, color: "var(--sage-deep)", marginBottom: "1rem", fontSize: "0.8125rem" }}>
          ✓ Asesmen bedah berhasil disimpan
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Identitas Operasi */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Identitas Tindakan</span></div>
          <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label" htmlFor="dx-praop">Diagnosis Pra-Operatif (ICD-10) *</label>
              <select id="dx-praop" className="form-input"
                value={form.diagnosisPraOpKode}
                onChange={(e) => setForm({ ...form, diagnosisPraOpKode: e.target.value })}
              >
                {ICD10_LIST.map((d) => <option key={d.kode} value={d.kode}>{d.kode} — {d.nama}</option>)}
              </select>
              {selectedDx && (
                <div style={{ marginTop: 4, fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                  <span className="rm-number">{selectedDx.kode}</span> {selectedDx.nama}
                </div>
              )}
            </div>
            <div>
              <label className="form-label" htmlFor="prosedur">Prosedur *</label>
              <input id="prosedur" type="text" className="form-input"
                value={form.prosedur}
                onChange={(e) => setForm({ ...form, prosedur: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="dokter-operator">Dokter Operator *</label>
              <input id="dokter-operator" type="text" className="form-input"
                value={form.dokterOperator}
                onChange={(e) => setForm({ ...form, dokterOperator: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="dokter-anestesi">Dokter Anestesi</label>
              <input id="dokter-anestesi" type="text" className="form-input"
                value={form.dokterAnestesi}
                onChange={(e) => setForm({ ...form, dokterAnestesi: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="jenis-anestesi">Jenis Anestesi</label>
              <select id="jenis-anestesi" className="form-input"
                value={form.jenisAnestesi}
                onChange={(e) => setForm({ ...form, jenisAnestesi: e.target.value })}
              >
                <option>Anestesi Umum (GA)</option>
                <option>Anestesi Spinal</option>
                <option>Anestesi Epidural</option>
                <option>Anestesi Lokal</option>
                <option>Blok Regional</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form A-G */}
        {sections.map((s) => (
          <div className="card" key={s.key}>
            <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{s.label}</span></div>
            <div className="card-body">
              <textarea className="form-input" rows={s.key === "catatan" ? 2 : 4}
                value={(form as any)[s.field]}
                onChange={(e) => setForm({ ...form, [s.field]: e.target.value })}
                placeholder={s.key === "catatan" ? "Catatan tambahan (opsional)" : ""}
              />
            </div>
          </div>
        ))}

        {/* D — Risiko Anestesi */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>D — Risiko Anestesi (Klasifikasi ASA)</span></div>
          <div className="card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {ASA_CLASS.map((asa) => (
                <label key={asa.value} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.8125rem" }}>
                  <input type="radio" name="asa" value={asa.value}
                    checked={form.asaClass === asa.value}
                    onChange={() => setForm({ ...form, asaClass: asa.value })}
                  />
                  <span>
                    <span className="rm-number" style={{ marginRight: 6 }}>ASA {asa.value}</span>
                    {asa.label.split("—")[1]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* F — Persetujuan */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>F — Persetujuan Operasi</span></div>
          <div className="card-body">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.8125rem" }}>
              <input type="checkbox" checked={form.persetujuan}
                onChange={(e) => setForm({ ...form, persetujuan: e.target.checked })}
              />
              Informed consent operasi telah dijelaskan dan ditandatangani pasien/keluarga
            </label>
            {form.persetujuan && (
              <div style={{ marginTop: "0.5rem" }}>
                <span className="badge badge-sage">✓ Persetujuan diberikan</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
