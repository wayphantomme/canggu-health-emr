"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import { MOCK_PRESCRIPTIONS } from "@/app/lib/mock-data";
import type { ResepItem } from "@/app/lib/types";

export default function ResepPage({ params }: { params: { id: string } }) {
  const encId = params.id ?? "e1";

  const existingResep = MOCK_PRESCRIPTIONS.find((r) => r.encounterId === encId);

  const [items, setItems] = useState<ResepItem[]>(existingResep?.items ?? []);
  const [status, setStatus] = useState<"pending" | "completed">(existingResep?.status ?? "pending");
  const [catatan, setCatatan] = useState("");
  const [saved, setSaved] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Omit<ResepItem, "id">>({
    namaObat: "",
    dosis: "",
    frekuensi: "1x sehari",
    durasi: "7 hari",
    instruksi: "Sesudah makan",
    jumlah: 7,
  });

  const addItem = () => {
    if (!newItem.namaObat || !newItem.dosis) return;
    setItems([...items, { ...newItem, id: `rxi-new-${Date.now()}` }]);
    setNewItem({ namaObat: "", dosis: "", frekuensi: "1x sehari", durasi: "7 hari", instruksi: "Sesudah makan", jumlah: 7 });
    setShowAdd(false);
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  return (
    <div style={{ maxWidth: 860 }}>
      <PageHeader
        title="E-Resep"
        subtitle={`Encounter — ${encId}`}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/encounter/${encId}`} className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-secondary" onClick={() => window.print()}>🖨 Cetak PDF</button>
            <button className="btn btn-primary" onClick={() => setSaved(true)}>Simpan Resep</button>
          </div>
        }
      />

      {saved && (
        <div style={{ padding: "0.625rem 1rem", background: "var(--sage-mist)", border: "1px solid #c8d9c4", borderRadius: 4, color: "var(--sage-deep)", marginBottom: "1rem", fontSize: "0.8125rem" }}>
          ✓ Resep berhasil disimpan
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Daftar Obat */}
        <div className="card">
          <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Daftar Obat</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span className={`badge ${status === "completed" ? "badge-sage" : "badge-amber"}`}>
                {status === "completed" ? "Completed" : "Pending — Belum Diproses Apotek"}
              </span>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(!showAdd)}>
                + Tambah Obat
              </button>
            </div>
          </div>

          {/* Add form */}
          {showAdd && (
            <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--line)", background: "var(--sage-mist)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem", marginBottom: "0.625rem" }}>
                <div>
                  <label className="form-label" htmlFor="new-obat">Nama Obat *</label>
                  <input id="new-obat" type="text" className="form-input" placeholder="Paracetamol"
                    value={newItem.namaObat}
                    onChange={(e) => setNewItem({ ...newItem, namaObat: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="new-dosis">Dosis *</label>
                  <input id="new-dosis" type="text" className="form-input" placeholder="500 mg"
                    value={newItem.dosis}
                    onChange={(e) => setNewItem({ ...newItem, dosis: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="new-frekuensi">Frekuensi</label>
                  <select id="new-frekuensi" className="form-input"
                    value={newItem.frekuensi}
                    onChange={(e) => setNewItem({ ...newItem, frekuensi: e.target.value })}
                  >
                    <option>1x sehari</option>
                    <option>2x sehari</option>
                    <option>3x sehari</option>
                    <option>4x sehari</option>
                    <option>Tiap 8 jam</option>
                    <option>Tiap 12 jam</option>
                    <option>Jika perlu</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="new-durasi">Durasi</label>
                  <input id="new-durasi" type="text" className="form-input" placeholder="7 hari"
                    value={newItem.durasi}
                    onChange={(e) => setNewItem({ ...newItem, durasi: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="new-instruksi">Instruksi</label>
                  <select id="new-instruksi" className="form-input"
                    value={newItem.instruksi}
                    onChange={(e) => setNewItem({ ...newItem, instruksi: e.target.value })}
                  >
                    <option>Sesudah makan</option>
                    <option>Sebelum makan</option>
                    <option>Bersama makan</option>
                    <option>Jika nyeri</option>
                    <option>Jika demam</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="new-jumlah">Jumlah</label>
                  <input id="new-jumlah" type="number" className="form-input"
                    value={newItem.jumlah}
                    onChange={(e) => setNewItem({ ...newItem, jumlah: Number(e.target.value) })}
                    min={1}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-primary btn-sm" onClick={addItem}>Tambahkan</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowAdd(false)}>Batal</button>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
              Belum ada obat ditambahkan
            </div>
          ) : (
            <table className="dense-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Obat</th>
                  <th>Dosis</th>
                  <th>Frekuensi</th>
                  <th>Durasi</th>
                  <th>Instruksi</th>
                  <th>Jml</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id}>
                    <td style={{ color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>{i + 1}</td>
                    <td style={{ fontWeight: 600, fontSize: "0.8125rem" }}>{item.namaObat}</td>
                    <td><span className="rm-number">{item.dosis}</span></td>
                    <td style={{ fontSize: "0.8rem" }}>{item.frekuensi}</td>
                    <td style={{ fontSize: "0.8rem" }}>{item.durasi}</td>
                    <td style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>{item.instruksi}</td>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{item.jumlah}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => removeItem(item.id)} style={{ color: "var(--brick)" }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Catatan */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Catatan Apoteker</span></div>
          <div className="card-body">
            <textarea className="form-input" rows={3} placeholder="Catatan khusus untuk apoteker..."
              value={catatan} onChange={(e) => setCatatan(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
