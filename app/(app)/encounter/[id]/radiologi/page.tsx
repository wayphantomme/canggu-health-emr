"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/app/components/ui/PageHeader";
import { MOCK_RADIOLOGY_ORDERS } from "@/app/lib/mock-data";
import type { RadiologiOrder } from "@/app/lib/types";

const MODALITAS_LIST = ["X-Ray", "CT Scan", "MRI", "USG", "Mamografi", "Fluoroskopi"] as const;

const STATUS_LABELS: Record<RadiologiOrder["status"], { label: string; cls: string }> = {
  ordered:   { label: "Dipesan",   cls: "badge-neutral" },
  scheduled: { label: "Dijadwalkan", cls: "badge-amber" },
  completed: { label: "Selesai",  cls: "badge-sage" },
};

export default function RadiologiPage({ params }: { params: { id: string } }) {
  const encId = params.id ?? "e1";
  const existing = MOCK_RADIOLOGY_ORDERS.filter((r) => r.encounterId === encId);
  const [orders, setOrders] = useState<RadiologiOrder[]>(existing);
  const [showForm, setShowForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    modalitas: "X-Ray" as RadiologiOrder["modalitas"],
    bodyPart: "",
    klinis: "",
  });

  const addOrder = () => {
    if (!newOrder.bodyPart) return;
    setOrders([...orders, {
      id: `r-new-${Date.now()}`,
      encounterId: encId,
      patientId: "p1",
      modalitas: newOrder.modalitas,
      bodyPart: newOrder.bodyPart,
      klinis: newOrder.klinis,
      status: "ordered",
      createdAt: new Date().toISOString(),
    }]);
    setNewOrder({ modalitas: "X-Ray", bodyPart: "", klinis: "" });
    setShowForm(false);
  };

  return (
    <div style={{ maxWidth: 860 }}>
      <PageHeader
        title="Radiologi"
        subtitle={`Encounter — ${encId}`}
        actions={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/encounter/${encId}`} className="btn btn-secondary">← Kembali</Link>
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
              + Order Pemeriksaan
            </button>
          </div>
        }
      />

      {/* Order form */}
      {showForm && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div className="card-header"><span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Order Pemeriksaan Baru</span></div>
          <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            <div>
              <label className="form-label" htmlFor="modalitas">Modalitas *</label>
              <select id="modalitas" className="form-input"
                value={newOrder.modalitas}
                onChange={(e) => setNewOrder({ ...newOrder, modalitas: e.target.value as RadiologiOrder["modalitas"] })}
              >
                {MODALITAS_LIST.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="body-part">Bagian Tubuh *</label>
              <input id="body-part" type="text" className="form-input" placeholder="Thorax PA, Abdomen, dll."
                value={newOrder.bodyPart}
                onChange={(e) => setNewOrder({ ...newOrder, bodyPart: e.target.value })}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label className="form-label" htmlFor="klinis">Keterangan Klinis</label>
              <textarea id="klinis" className="form-input" rows={2} placeholder="Indikasi klinis untuk pemeriksaan..."
                value={newOrder.klinis}
                onChange={(e) => setNewOrder({ ...newOrder, klinis: e.target.value })}
              />
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-primary" onClick={addOrder}>Kirim Order</button>
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="card">
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--ink-muted)", fontSize: "0.8125rem" }}>
            Belum ada order radiologi
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {orders.map((order) => {
            const s = STATUS_LABELS[order.status];
            return (
              <div className="card" key={order.id}>
                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span className="badge badge-neutral" style={{ marginRight: "0.5rem" }}>{order.modalitas}</span>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>{order.bodyPart}</span>
                  </div>
                  <span className={`badge ${s.cls}`}>{s.label}</span>
                </div>
                <div className="card-body" style={{ fontSize: "0.8125rem" }}>
                  {order.klinis && (
                    <div style={{ marginBottom: "0.625rem" }}>
                      <span className="section-title">Klinis: </span>{order.klinis}
                    </div>
                  )}
                  {order.interpretasi ? (
                    <div style={{
                      padding: "0.75rem",
                      background: "var(--sage-mist)",
                      borderRadius: 4,
                      border: "1px solid #c8d9c4",
                    }}>
                      <div className="section-title" style={{ marginBottom: 4 }}>Interpretasi</div>
                      <div>{order.interpretasi}</div>
                    </div>
                  ) : (
                    <div style={{ color: "var(--ink-muted)", fontStyle: "italic" }}>
                      Menunggu hasil dari radiologi...
                    </div>
                  )}
                  {order.hasilUrl && (
                    <div style={{ marginTop: "0.625rem" }}>
                      <button className="btn btn-secondary btn-sm">📥 Lihat Gambar</button>
                    </div>
                  )}
                  <div style={{ marginTop: "0.625rem", fontSize: "0.75rem", color: "var(--ink-muted)" }}>
                    Dibuat: {new Date(order.createdAt).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
