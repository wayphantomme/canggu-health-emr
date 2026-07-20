"use client";

import { motion, AnimatePresence, animate } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

// ─── Typing Text ───────────────────────────────────────────────
function TypingText({ text, speed = 28 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{ borderRight: "2px solid var(--sage)", marginLeft: 1, display: "inline-block" }}
        >
          &nbsp;
        </motion.span>
      )}
    </span>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────
function ProgressBar({ percent, delay = 0, color = "var(--sage)" }: { percent: number; delay?: number; color?: string }) {
  return (
    <div style={{ height: 5, background: "var(--line)", borderRadius: 4, overflow: "hidden" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1.0, delay, ease: "easeOut" }}
        style={{ height: "100%", background: color, borderRadius: 4 }}
      />
    </div>
  );
}

// ─── Animated Counter ──────────────────────────────────────────
function AnimCounter({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    const ctrl = animate(0, target, { duration, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return ctrl.stop;
  }, [target, duration]);
  return <>{val}</>;
}

// ─── Page Definitions ──────────────────────────────────────────
const NAV = ["Dashboard", "Pasien", "Appointment", "Encounter", "SatuSehat"];

const PAGES: Record<string, React.FC> = {
  Dashboard: () => (
    <div style={{ padding: "1.25rem", background: "var(--paper)", height: "100%", overflowY: "auto" }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Dashboard</div>
        <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: "1rem" }}>Senin, 21 Juli 2026</div>
      </motion.div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem", marginBottom: "1rem" }}>
        {[
          { label: "Pasien Hari Ini", value: 24, color: "var(--sage-deep)" },
          { label: "Appointment", value: 18, color: "var(--amber)" },
          { label: "Encounter Aktif", value: 7, color: "var(--brick)" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
            style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, padding: "0.75rem" }}
          >
            <div style={{ fontSize: "0.5625rem", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", fontWeight: 700, color: s.color, lineHeight: 1 }}>
              <AnimCounter target={s.value} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, padding: "0.875rem", marginBottom: "0.875rem" }}
      >
        <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Kunjungan 7 Hari Terakhir</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 60 }}>
          {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: "easeOut" }}
              style={{
                flex: 1,
                height: `${h}%`,
                background: i === 5 ? "var(--sage)" : "var(--sage-mist)",
                borderRadius: "3px 3px 0 0",
                transformOrigin: "bottom",
                border: i === 5 ? "1px solid #c8d9c4" : "1px solid var(--line)",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          {["S","M","S","R","K","J","S"].map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.5rem", color: "var(--ink-muted)" }}>{d}</div>
          ))}
        </div>
      </motion.div>

      {/* Recent encounters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.35 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden" }}
      >
        <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--line)", fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)" }}>
          Encounter Terbaru
        </div>
        {[
          { name: "Budi Santoso", dx: "ISPA", time: "09:15" },
          { name: "Siti Rahayu", dx: "Hipertensi", time: "09:30" },
          { name: "Ahmad Yani", dx: "GERD", time: "09:45" },
        ].map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 + i * 0.12, duration: 0.3 }}
            style={{ padding: "0.4rem 0.75rem", borderBottom: i < 2 ? "1px solid var(--line)" : "none", fontSize: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span style={{ fontWeight: 500 }}>{r.name}</span>
            <span style={{ color: "var(--mono-tag)", fontFamily: "var(--font-mono)", fontSize: "0.625rem" }}>{r.dx}</span>
            <span style={{ color: "var(--ink-muted)", fontSize: "0.625rem" }}>{r.time}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  ),

  Pasien: () => (
    <div style={{ padding: "1.25rem", background: "var(--paper)", height: "100%", overflowY: "auto", position: "relative" }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>Profil Pasien</div>
        <div style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--ink-muted)", marginBottom: "1rem" }}>NRM.2026.001 — Budi Santoso, L, 42 th</div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.5rem", marginBottom: "0.875rem" }}>
        {[{ l: "TD", v: "120/80", u: "mmHg" }, { l: "Nadi", v: "78", u: "/mnt" }, { l: "Suhu", v: "36.7", u: "°C" }, { l: "SpO₂", v: "99", u: "%" }].map((v, i) => (
          <motion.div key={v.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            style={{ border: "1px solid #c8d9c4", borderRadius: 5, padding: "0.5rem", background: "var(--sage-mist)", textAlign: "center" }}>
            <div style={{ fontSize: "0.5rem", color: "var(--ink-muted)", textTransform: "uppercase" }}>{v.l}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", fontWeight: 700, color: "var(--sage-deep)" }}>{v.v}</div>
            <div style={{ fontSize: "0.5rem", color: "var(--ink-muted)" }}>{v.u}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.3 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 5, marginBottom: "0.875rem", overflow: "hidden" }}>
        <div style={{ padding: "0.375rem 0.75rem", borderBottom: "1px solid var(--line)", fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)", display: "flex", justifyContent: "space-between" }}>
          <span>Catatan Medis</span><span style={{ color: "var(--sage-deep)" }}>dr. Rendra Pratama</span>
        </div>
        <div style={{ padding: "0.75rem", fontSize: "0.8125rem", lineHeight: 1.6, minHeight: 44 }}>
          <TypingText text="Pasien datang dengan keluhan batuk kering 5 hari, demam ringan. Tidak ada riwayat alergi." speed={24} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--line)", fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)", display: "flex", justifyContent: "space-between" }}>
          <span>Riwayat Kunjungan</span><span style={{ color: "var(--sage-deep)" }}>3 kunjungan</span>
        </div>
        {[
          { date: "15 Jul 2026", doctor: "dr. Rendra", dx: "J06.9 — ISPA" },
          { date: "10 Jun 2026", doctor: "dr. Sinta", dx: "K21.0 — GERD" },
          { date: "22 Mei 2026", doctor: "dr. Rendra", dx: "I10 — Hipertensi" },
        ].map((v, i) => (
          <motion.div key={v.date} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.15, duration: 0.35 }}
            style={{ padding: "0.45rem 0.75rem", borderBottom: i < 2 ? "1px solid var(--line)" : "none", fontSize: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ color: "var(--ink-muted)", minWidth: 72 }}>{v.date}</span>
            <span style={{ flex: 1 }}>{v.doctor}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--mono-tag)" }}>{v.dx}</span>
            <span style={{ background: "var(--sage-mist)", color: "var(--sage-deep)", padding: "1px 7px", borderRadius: 3, fontSize: "0.5625rem", fontWeight: 600 }}>Selesai</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  ),

  Appointment: () => (
    <div style={{ padding: "1.25rem", background: "var(--paper)", height: "100%", overflowY: "auto" }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>Appointment</div>
        <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: "1rem" }}>21 Juli 2026 — 18 jadwal</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "60px 1fr 100px 80px", gap: "0.5rem", fontSize: "0.5625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)" }}>
          <span>Waktu</span><span>Pasien</span><span>Dokter</span><span>Status</span>
        </div>
        {[
          { time: "08:00", name: "Budi Santoso", doctor: "dr. Rendra", status: "check-in", statusCls: "amber" },
          { time: "08:30", name: "Siti Rahayu", doctor: "dr. Sinta", status: "booked", statusCls: "sage" },
          { time: "09:00", name: "Ahmad Yani", doctor: "dr. Rendra", status: "booked", statusCls: "sage" },
          { time: "09:30", name: "Dewi Lestari", doctor: "dr. Wirawan", status: "cancelled", statusCls: "brick" },
          { time: "10:00", name: "Hendra Gunawan", doctor: "dr. Sinta", status: "booked", statusCls: "sage" },
        ].map((a, i) => (
          <motion.div key={a.time} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.1, duration: 0.3 }}
            style={{ padding: "0.5rem 0.75rem", borderBottom: i < 4 ? "1px solid var(--line)" : "none", display: "grid", gridTemplateColumns: "60px 1fr 100px 80px", gap: "0.5rem", alignItems: "center", fontSize: "0.75rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--ink-muted)" }}>{a.time}</span>
            <span style={{ fontWeight: 500 }}>{a.name}</span>
            <span style={{ color: "var(--ink-muted)", fontSize: "0.6875rem" }}>{a.doctor}</span>
            <span style={{
              background: a.statusCls === "amber" ? "var(--amber-bg)" : a.statusCls === "brick" ? "var(--brick-bg)" : "var(--sage-mist)",
              color: a.statusCls === "amber" ? "var(--amber)" : a.statusCls === "brick" ? "var(--brick)" : "var(--sage-deep)",
              padding: "1px 7px", borderRadius: 3, fontSize: "0.5625rem", fontWeight: 600, display: "inline-block"
            }}>{a.status}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  ),

  Encounter: () => (
    <div style={{ padding: "1.25rem", background: "var(--paper)", height: "100%", overflowY: "auto" }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>Encounter #ENC-2026-0047</div>
        <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: "1rem" }}>Budi Santoso — Clinic Visit</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, padding: "0.75rem", marginBottom: "0.875rem" }}>
        <div style={{ fontSize: "0.625rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-muted)", marginBottom: "0.5rem" }}>Progress Modul</div>
        <ProgressBar percent={66} delay={0.3} />
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {[
            { label: "Asesmen", done: true }, { label: "Bedah", done: true }, { label: "E-Resep", done: true },
            { label: "Lab", done: false }, { label: "Radiologi", done: false }, { label: "Discharge", done: false },
          ].map((m, i) => (
            <motion.span key={m.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08, duration: 0.25, type: "spring" }}
              style={{ padding: "1px 7px", borderRadius: 3, fontSize: "0.5625rem", fontWeight: 600, background: m.done ? "var(--sage-mist)" : "#f0efeb", color: m.done ? "var(--sage-deep)" : "var(--ink-muted)", border: `1px solid ${m.done ? "#c8d9c4" : "var(--line)"}` }}>
              {m.done ? "✓" : "○"} {m.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.625rem" }}>
        {[
          { label: "Asesmen Medis", status: "Selesai", icon: "🩺", done: true },
          { label: "Asesmen Bedah", status: "Selesai", icon: "⚕️", done: true },
          { label: "E-Resep", status: "Selesai", icon: "💊", done: true },
          { label: "Lab Tests", status: "Belum", icon: "🧪", done: false },
          { label: "Radiologi", status: "Belum", icon: "🔬", done: false },
          { label: "Discharge", status: "Belum", icon: "📄", done: false },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
            style={{ background: "var(--surface)", border: `1px solid ${m.done ? "#c8d9c4" : "var(--line)"}`, borderLeft: `3px solid ${m.done ? "var(--sage)" : "var(--line)"}`, borderRadius: 6, padding: "0.625rem 0.75rem" }}>
            <div style={{ fontSize: "0.875rem", marginBottom: 2 }}>{m.icon}</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600 }}>{m.label}</div>
            <div style={{ fontSize: "0.5625rem", color: m.done ? "var(--sage-deep)" : "var(--ink-muted)", marginTop: 2 }}>{m.status}</div>
          </motion.div>
        ))}
      </div>
    </div>
  ),

  SatuSehat: () => (
    <div style={{ padding: "1.25rem", background: "var(--paper)", height: "100%", overflowY: "auto" }}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>SatuSehat Sync</div>
        <div style={{ fontSize: "0.6875rem", color: "var(--ink-muted)", marginBottom: "1rem" }}>Terakhir sinkron: 21 Jul 2026 — 09:12 WIB</div>
      </motion.div>

      {/* Sync progress items */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden", marginBottom: "0.875rem" }}>
        {[
          { label: "Patient Resources", sent: 142, total: 142, pct: 100 },
          { label: "Encounter Records", sent: 87, total: 102, pct: 85 },
          { label: "Observation (Vitals)", sent: 56, total: 56, pct: 100 },
          { label: "Medication Request", sent: 33, total: 40, pct: 82 },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
            style={{ padding: "0.625rem 0.75rem", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem", fontSize: "0.75rem" }}>
              <span style={{ fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: item.pct === 100 ? "var(--sage-deep)" : "var(--amber)" }}>
                {item.sent}/{item.total}
              </span>
            </div>
            <ProgressBar percent={item.pct} delay={0.4 + i * 0.12} color={item.pct === 100 ? "var(--sage)" : "var(--amber)"} />
          </motion.div>
        ))}
      </motion.div>

      {/* Live sync animation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        style={{ background: "var(--sage-mist)", border: "1px solid #c8d9c4", borderRadius: 6, padding: "0.875rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          style={{ width: 20, height: 20, border: "2px solid #c8d9c4", borderTopColor: "var(--sage)", borderRadius: "50%", flexShrink: 0 }}
        />
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--sage-deep)" }}>Sinkronisasi berjalan...</div>
          <div style={{ fontSize: "0.625rem", color: "var(--ink-muted)" }}>Mengirim 15 Encounter Records ke FHIR server</div>
        </div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--sage-deep)" }}
        >
          <AnimCounter target={15} duration={2} />/<AnimCounter target={15} duration={1} />
        </motion.div>
      </motion.div>
    </div>
  ),
};

// ─── Main Component ─────────────────────────────────────────────
const PAGE_DURATION = 5500; // ms per page

export default function AnimatedEMRMockup() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > currentIdx ? 1 : -1);
    setCurrentIdx(idx);
  }, [currentIdx]);

  // Auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIdx((prev) => (prev + 1) % NAV.length);
    }, PAGE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const currentPage = NAV[currentIdx];
  const PageComponent = PAGES[currentPage];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        border: "1px solid var(--line)",
        borderRadius: "10px",
        background: "var(--surface)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Browser chrome */}
      <div style={{
        height: "40px",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
        gap: "0.5rem",
        background: "#fafafa",
        flexShrink: 0,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f0d9b8" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f0d0cd" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#c8d9c4" }} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              marginLeft: "0.75rem",
              background: "#f0efeb",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "2px 12px",
              fontSize: "0.6875rem",
              color: "var(--ink-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            emr.cangguhealth.id/{currentPage.toLowerCase()}
          </motion.div>
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "var(--sage-mist)",
            border: "1px solid #c8d9c4",
            borderRadius: 12,
            padding: "2px 10px",
            fontSize: "0.625rem",
            color: "var(--sage-deep)",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <motion.div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sage-deep)" }} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} />
          SatuSehat Live
        </motion.div>
      </div>

      {/* App body */}
      <div style={{ display: "flex", height: "440px" }}>
        {/* Sidebar */}
        <div style={{ width: "160px", borderRight: "1px solid var(--line)", padding: "0.75rem 0", display: "flex", flexDirection: "column", gap: "2px", background: "var(--surface)", flexShrink: 0 }}>
          {NAV.map((item, i) => (
            <button
              key={item}
              onClick={() => goTo(i)}
              style={{
                padding: "0.4rem 1rem",
                fontSize: "0.75rem",
                fontWeight: item === currentPage ? 600 : 400,
                color: item === currentPage ? "var(--sage-deep)" : "var(--ink-muted)",
                background: item === currentPage ? "var(--sage-mist)" : "transparent",
                borderLeft: `3px solid ${item === currentPage ? "var(--sage)" : "transparent"}`,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                width: "100%",
              }}
            >
              {item}
            </button>
          ))}

          {/* Progress indicator */}
          <div style={{ marginTop: "auto", padding: "0.75rem 1rem", borderTop: "1px solid var(--line)" }}>
            <div style={{ fontSize: "0.5625rem", color: "var(--ink-muted)", marginBottom: 4 }}>Auto-play</div>
            <div style={{ height: 3, background: "var(--line)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                key={currentIdx}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: PAGE_DURATION / 1000, ease: "linear" }}
                style={{ height: "100%", background: "var(--sage)", borderRadius: 2 }}
              />
            </div>
          </div>
        </div>

        {/* Main content with slide transition */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <PageComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{
        borderTop: "1px solid var(--line)",
        padding: "0.625rem",
        display: "flex",
        justifyContent: "center",
        gap: "0.375rem",
        background: "#fafafa",
      }}>
        {NAV.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === currentIdx ? 20 : 7,
              height: 7,
              borderRadius: 4,
              background: i === currentIdx ? "var(--sage)" : "var(--line)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
