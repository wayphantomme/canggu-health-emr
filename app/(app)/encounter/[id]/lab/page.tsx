"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import { MOCK_LAB_ORDERS } from "@/app/lib/mock-data";
import type { LabOrder } from "@/app/lib/types";

const STATUS_LABELS: Record<LabOrder["status"], { label: string; cls: string }> = {
  ordered:          { label: "Dipesan",        cls: "badge-neutral" },
  sample_collected: { label: "Sampel Diambil", cls: "badge-amber" },
  processing:       { label: "Diproses",       cls: "badge-amber" },
  completed:        { label: "Selesai",        cls: "badge-sage" },
};

const FLAG_STYLE: Record<string, React.CSSProperties> = {
  normal:   { color: "var(--ink-muted)" },
  high:     { color: "var(--brick)", fontWeight: 600 },
  low:      { color: "var(--amber)", fontWeight: 600 },
  critical: { color: "var(--brick)", fontWeight: 700, background: "var(--brick-bg)", padding: "1px 4px", borderRadius: 3 },
};

export default function LabPage({ params }: { params: { id: string } }) {
  const encId = params.id ?? "e1";
  const orders = MOCK_LAB_ORDERS.filter((l) => l.encounterId === encId);
  const [showOrder, setShowOrder] = useState(false);
  const [newTest, setNewTest] = useState({ nama: "", prioritas: "rutin" as "rutin" | "cito" });
  const [orderList, setOrderList] = useState<LabOrder[]>(orders);
  const [saved, setSaved] = useState(false);

  const addOrder = () => {
    if (!newTest.nama) return;
    setOrderList([...orderList, {
      id: `l-new-${Date.now()}`,
      encounterId: encId,
      patientId: "p1",
      namaTest: newTest.nama,
      prioritas: newTest.prioritas,
      status: "ordered",
      createdAt: new Date().toISOString(),
    }]);
    setNewTest({ nama: "", prioritas: "rutin" });
    setShowOrder(false);
  };

  return (
    <div style={{ maxWidth: 960 }}>
      <PageHeader
        title="Lab Tests & Results"
        subtitle={`Encounter — ${encId}`}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/encounter/${encId}`} className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-primary btn-sm" onClick={() => setShowOrder(!showOrder)}>
              + Order Test
            </button>
          </div>
        }
      />

      {/* Order form */}
      {showOrder && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Order Lab Baru</span></div>
          <div className="card-body" style={{ display: "flex", gap: "0.625rem", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label" htmlFor="test-nama">Nama Test *</label>
              <input id="test-nama" type="text" className="form-input" placeholder="Darah Lengkap, HbA1c, Urine Lengkap..."
                value={newTest.nama}
                onChange={(e) => setNewTest({ ...newTest, nama: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="test-prioritas">Prioritas</label>
              <select id="test-prioritas" className="form-input" style={{ width: 120 }}
                value={newTest.prioritas}
                onChange={(e) => setNewTest({ ...newTest, prioritas: e.target.value as "rutin" | "cito" })}
              >
                <option value="rutin">Rutin</option>
                <option value="cito">CITO</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={addOrder}>Order</button>
            <button className="btn btn-secondary" onClick={() => setShowOrder(false)}>Batal</button>
          </div>
        </div>
      )}

      {orderList.length === 0 ? (
        <div className="card">
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
            Belum ada order lab untuk encounter ini
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {orderList.map((order) => {
            const s = STATUS_LABELS[order.status];
            return (
              <div className="card" key={order.id}>
                {/* Order header */}
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{order.namaTest}</span>
                    {order.prioritas === "cito" && (
                      <span className="badge badge-brick" style={{ fontSize: "0.65rem" }}>CITO</span>
                    )}
                  </div>
                  <span className={`badge ${s.cls}`}>{s.label}</span>
                </div>

                {/* Results */}
                {order.result ? (
                  <div>
                    <table className="dense-table">
                      <thead>
                        <tr>
                          <th>Parameter</th>
                          <th>Nilai</th>
                          <th>Satuan</th>
                          <th>Referensi</th>
                          <th>Flag</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.result.parameter.map((p, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 500 }}>{p.nama}</td>
                            <td>
                              <span className="font-mono" style={{ ...(p.flag ? FLAG_STYLE[p.flag] : {}) }}>
                                {p.nilai}
                              </span>
                            </td>
                            <td style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>{p.satuan}</td>
                            <td style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>{p.referenceRange}</td>
                            <td>
                              {p.flag && p.flag !== "normal" ? (
                                <span className={`badge ${p.flag === "high" ? "badge-brick" : p.flag === "low" ? "badge-amber" : "badge-brick"}`} style={{ fontSize: "0.65rem" }}>
                                  {p.flag.toUpperCase()}
                                </span>
                              ) : (
                                <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>Normal</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ padding: "0.5rem 0.75rem", borderTop: "1px solid var(--line)", fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                      Selesai: {new Date(order.result.completedAt).toLocaleString("id-ID")}
                      {order.result.pdfUrl && (
                        <button className="btn btn-ghost btn-sm" style={{ marginLeft: "0.5rem" }}>📥 Download PDF</button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "1rem", fontSize: "0.8125rem", color: "var(--ink-muted)", fontStyle: "italic" }}>
                    Menunggu hasil dari laboratorium...
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
