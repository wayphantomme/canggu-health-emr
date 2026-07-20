"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_USERS } from "@/app/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(MOCK_USERS[0].id);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate setting auth cookie/session
    router.push("/dashboard");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--paper)",
      padding: "1rem"
    }}>
      <div className="card" style={{ maxWidth: 420, width: "100%", padding: "2.5rem 2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
        
        {/* Logo / Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", margin: "0 0 0.5rem", color: "var(--sage-deep)" }}>Electronic Medical Record</h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "0.875rem", margin: 0 }}>
            Sistem Rekam Medis Elektronik Terpadu
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div style={{
            padding: "1rem",
            background: "var(--sage-mist)",
            borderRadius: 6,
            border: "1px solid #c8d9c4",
            fontSize: "0.8125rem",
            color: "var(--ink)",
            textAlign: "center"
          }}>
            <strong>Mode MVP:</strong> Pilih peran untuk mensimulasikan login dan melihat akses yang sesuai.
          </div>

          {/* Role Selector */}
          <div>
            <label className="form-label" htmlFor="role">Login Sebagai</label>
            <select
              id="role"
              className="form-input"
              style={{ padding: "0.75rem" }}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {MOCK_USERS.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nama} ({user.unit})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "0.75rem", marginTop: "0.5rem", fontSize: "0.875rem" }}
          >
            Masuk ke Sistem
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.75rem", color: "var(--ink-muted)" }}>
          Klinik Sehat Sejahtera — v1.0.0
        </div>
      </div>
    </div>
  );
}
