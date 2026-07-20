"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/ui/PageHeader";
import Link from "next/link";

export default function PasienBaruPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    tanggalLahir: "",
    jenisKelamin: "L",
    telepon: "",
    alamat: "",
    noIHS: "",
  });
  const [saved, setSaved] = useState(false);

  // Auto-generate preview RM
  const noRMPreview = "NRM.07.009";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push("/pasien"), 1500);
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <PageHeader
        title="Registrasi Pasien Baru"
        subtitle="Lengkapi data identitas pasien"
        actions={
          <Link href="/pasien" className="btn btn-secondary">
            ← Kembali
          </Link>
        }
      />

      {saved && (
        <div style={{
          padding: "0.75rem 1rem",
          background: "var(--sage-mist)",
          border: "1px solid #c8d9c4",
          borderRadius: 4,
          color: "var(--sage-deep)",
          marginBottom: "1rem",
          fontSize: "0.875rem",
        }}>
          ✓ Pasien berhasil didaftarkan dengan <strong>{noRMPreview}</strong>. Mengalihkan...
        </div>
      )}

      <div className="card">
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Data Identitas Pasien</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>No. RM akan diberikan:</span>
            <span className="rm-number">{noRMPreview}</span>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* NIK */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label" htmlFor="nik">NIK</label>
                <input
                  id="nik"
                  type="text"
                  className="form-input font-mono"
                  placeholder="16 digit NIK KTP"
                  maxLength={16}
                  value={form.nik}
                  onChange={(e) => setForm({ ...form, nik: e.target.value })}
                />
              </div>

              {/* Nama */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label" htmlFor="nama">Nama Lengkap <span style={{ color: "var(--brick)" }}>*</span></label>
                <input
                  id="nama"
                  type="text"
                  className="form-input"
                  placeholder="Nama sesuai KTP"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                />
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="form-label" htmlFor="tgl-lahir">Tanggal Lahir <span style={{ color: "var(--brick)" }}>*</span></label>
                <input
                  id="tgl-lahir"
                  type="date"
                  className="form-input"
                  required
                  value={form.tanggalLahir}
                  onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })}
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="form-label" htmlFor="jenis-kelamin">Jenis Kelamin <span style={{ color: "var(--brick)" }}>*</span></label>
                <select
                  id="jenis-kelamin"
                  className="form-input"
                  required
                  value={form.jenisKelamin}
                  onChange={(e) => setForm({ ...form, jenisKelamin: e.target.value })}
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              {/* Telepon */}
              <div>
                <label className="form-label" htmlFor="telepon">No. Telepon <span style={{ color: "var(--brick)" }}>*</span></label>
                <input
                  id="telepon"
                  type="tel"
                  className="form-input"
                  placeholder="08xxxxxxxxxx"
                  required
                  value={form.telepon}
                  onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                />
              </div>

              {/* No. IHS */}
              <div>
                <label className="form-label" htmlFor="no-ihs">
                  No. IHS SatuSehat
                  <span style={{ color: "var(--ink-muted)", fontWeight: 400, marginLeft: 4 }}>(opsional)</span>
                </label>
                <input
                  id="no-ihs"
                  type="text"
                  className="form-input font-mono"
                  placeholder="P02029221XXXX"
                  value={form.noIHS}
                  onChange={(e) => setForm({ ...form, noIHS: e.target.value })}
                />
              </div>

              {/* Alamat */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label" htmlFor="alamat">Alamat Lengkap</label>
                <textarea
                  id="alamat"
                  className="form-input"
                  placeholder="Jl. ..."
                  rows={3}
                  value={form.alamat}
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                />
              </div>
            </div>

            <hr className="divider" />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.625rem" }}>
              <Link href="/pasien" className="btn btn-secondary">Batal</Link>
              <button type="submit" className="btn btn-primary">
                Simpan & Daftarkan Pasien
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
