# PRD — Aplikasi EMR (Electronic Medical Record)
**Versi 2** — dilengkapi referensi desain, sistem warna, dan tipografi

---

## 1. Ringkasan Produk

**Nama produk:** [TBD]
**Tipe:** Web-based EMR untuk klinik/rumah sakit skala kecil-menengah di Indonesia
**Tujuan:** Digitalisasi alur pasien dari pendaftaran hingga pulang, dengan integrasi wajib ke SatuSehat (Kemenkes).

**Problem statement:**
Klinik masih menggunakan pencatatan manual/semi-digital yang menyulitkan continuity of care, pelaporan ke SatuSehat, dan audit rekam medis. Dibutuhkan sistem terpusat yang menangani seluruh siklus kunjungan pasien.

**Target pengguna:** Dokter, perawat, admin/resepsionis, apoteker, petugas lab/radiologi, manajemen klinik.

---

## 2. Tujuan & Success Metrics

| Tujuan | Metrik |
|---|---|
| Percepat alur pendaftaran → pemeriksaan | Waktu rata-rata pendaftaran < 3 menit |
| Kepatuhan pelaporan SatuSehat | >95% encounter ter-sync dalam 24 jam |
| Kurangi rekam medis hilang/ganda | 0 duplikasi No. RM |
| Adopsi oleh staf medis | >80% encounter diinput lewat sistem dalam 3 bulan |

---

## 3. Scope (Fase 1 — MVP)

**In scope:** Manajemen pasien, appointment, encounter (clinic/home visit), asesmen medis awal, asesmen bedah & anestesi, e-resep, lab tests & results, radiologi, discharge summary, sinkronisasi SatuSehat, RBAC.

**Out of scope (Fase 1):** Billing/asuransi, inventori farmasi penuh, telemedicine, mobile app native, konsolidasi multi-cabang.

---

## 4. User Roles & Permissions

| Role | Akses |
|---|---|
| Admin/Resepsionis | CRUD pasien, appointment, lihat status encounter |
| Dokter | Semua modul klinis: asesmen, resep, order lab/radiologi, discharge |
| Perawat | Vital sign, bantu asesmen, lihat encounter |
| Apoteker | Lihat & proses resep |
| Lab/Radiografer | Lihat order, upload hasil |
| Manajemen | Lihat laporan saja |

---

## 5. Fitur Detail

### 5.1 Manajemen Pasien
Registrasi baru, auto-generate No. RM (`NRM.MM.NN`), field No. IHS untuk SatuSehat, status Aktif/Nonaktif, status sync (Belum Sync/Tersinkron/Gagal + retry), pencarian by nama/RM/telepon.

### 5.2 Appointment
Jadwal per dokter, field pasien/dokter/keluhan/status (booked/checked-in/cancelled), filter tanggal & status.

### 5.3 Encounter Management
Tipe Clinic Visit/Home Visit, status Draft→In Progress→Finished, akses ke semua sub-modul klinis dari satu encounter.

### 5.4 Asesmen Medis Awal
Diagnosa utama (ICD-10), riwayat penyakit sekarang, pemeriksaan fisik.

### 5.5 Asesmen Bedah & Anestesi
Form standar A-G, diagnosis pra-op, prosedur, dokter operator.

### 5.6 E-Resep
Obat/dosis/instruksi, status Pending/Completed, cetak PDF kop klinik, riwayat per pasien.

### 5.7 Lab Tests & Results
Order test + prioritas, upload PDF/entri manual parameter + reference range, status, preview/download.

### 5.8 Radiologi
Order pemeriksaan (modalitas + body part), status, upload hasil.

### 5.9 Discharge Summary
Diagnosa utama & sekunder, obat lanjutan, metode pulang, jadwal kontrol, ringkasan klinis auto-pull dari encounter.

### 5.10 Integrasi SatuSehat
Sync encounter/pasien (No. IHS)/hasil lab ke FHIR server SatuSehat, background job + retry queue, log status per record.

---

## 6. Non-Functional Requirements

| Aspek | Requirement |
|---|---|
| Keamanan | Enkripsi at-rest & in-transit (TLS 1.2+), hash password, session timeout |
| Audit trail | Setiap create/update/delete tercatat (siapa, kapan, apa) — tidak ada hard delete |
| Kepatuhan | UU PDP, Permenkes RME, standar FHIR untuk SatuSehat |
| Performa | Load < 2 detik, pagination di semua list |
| Ketersediaan | Uptime 99%, backup harian |
| Offline resilience | Sync gagal → status "Belum Sync" + auto-retry, data tetap tersimpan lokal |
| Device | Web responsive, dioptimalkan tablet (referensi pengguna banyak pakai iPad) |

---

## 7. Tech Stack

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API routes / NestJS
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth/Clerk + RBAC custom
- **File storage:** S3-compatible
- **Background jobs:** BullMQ/Redis untuk sync SatuSehat
- **Deployment:** Docker + VPS/cloud (data residency Indonesia)

---

## 8. Referensi Desain

### 8.1 Referensi utama

| Website | Yang dicontek | Link |
|---|---|---|
| **RS Kemenkes Indonesia** | Pola pencarian faskes (filter lokasi/spesialisasi sebagai chip, bukan dropdown panjang), hero section dengan search besar, struktur "letterhead" resmi khas portal pemerintah, hierarki informasi yang jelas untuk data faskes | [rs.kemkes.go.id/hospitals](https://rs.kemkes.go.id/hospitals) |
| **Medplum** | Arsitektur FHIR-native, dashboard clinical data yang padat tapi terbaca, pola resource browser | [medplum.com](https://www.medplum.com) |
| **Practo** | Card dokter/appointment, sistem badge status, layout booking | [practo.com](https://www.practo.com) |
| **Halodoc** | Hirarki warna hijau sebagai trust signal, pattern konsultasi & resep digital | [halodoc.com](https://www.halodoc.com) |
| **SATUSEHAT Platform** | Referensi status sinkronisasi FHIR, terminologi resmi (No. IHS, Encounter, dsb) | [satusehat.kemkes.go.id](https://satusehat.kemkes.go.id) |
| **Linear** | Disiplin whitespace & tipografi (bukan health, tapi acuan "minimalist yang tidak generic") | [linear.app](https://linear.app) |

### 8.2 Kenapa bukan "SaaS generic dashboard"

Template AI-generated dashboard (card rounded-2xl + shadow lembut + badge pill hijau) itu clean tapi generik — semua produk AI-generated akhir-akhir ini terlihat sama. EMR punya warisan visual sendiri: **rekam medis kertas, map/folder pasien, formulir bernomor (format A-G), cap dan tanda tangan digital, tabel data lab yang padat**. Arah desain sebaiknya condong ke situ: lebih **dokumen resmi & clinical-dense**, bukan landing page SaaS yang lapang.

---

## 9. Design System

### 9.1 Filosofi
"**Rekam medis digital, bukan dashboard startup.**" Desain harus terasa dipercaya seperti dokumen resmi (mengacu ke rs.kemkes.go.id & SatuSehat), padat informasi seperti chart rumah sakit sungguhan, tapi tetap nyaman dibaca staf medis yang bekerja 8+ jam di depan layar.

### 9.2 Palet Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `paper` | `#F7F6F1` | Background utama — putih hangat seperti kertas, bukan putih steril |
| `surface` | `#FFFFFF` | Card, table, modal |
| `ink` | `#1B2420` | Teks utama (hitam kehijauan, bukan hitam pekat) |
| `ink-muted` | `#6B7268` | Teks sekunder, label |
| `sage` | `#4F7358` | Warna primer — hijau lumut, bukan hijau saturasi tinggi ala SaaS |
| `sage-deep` | `#38543F` | Hover/active state, tombol primer |
| `sage-mist` | `#E7ECE4` | Background highlight/active nav |
| `line` | `#DEDCD1` | Border/hairline (warna hangat, bukan abu-abu dingin) |
| `amber` | `#A9762F` | Status pending/warning (mustard, bukan amber cerah) |
| `brick` | `#9C4A3D` | Status nonaktif/error (merah bata, bukan merah alert generik) |
| `mono-tag` | `#5B6B62` | Warna teks untuk No. RM/ID (dipasangkan dengan font mono) |

> Prinsip: semua warna sedikit "diturunkan saturasinya" (muted/dusty) dibanding warna SaaS pada umumnya, supaya terasa seperti alat kerja profesional, bukan produk consumer app.

### 9.3 Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Judul/Heading | **Source Serif 4** | Serif memberi kesan dokumen resmi/formulir medis — beda dari sans-serif generik SaaS |
| Body/UI | **IBM Plex Sans** | Dibuat khusus untuk produk teknis/enterprise IBM, sangat terbaca di data padat |
| Data/ID/Angka | **IBM Plex Mono** | Untuk No. RM, No. IHS, kode ICD-10 — memberi kesan presisi seperti nomor rekam medis sungguhan |

Link Google Fonts:
- [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4)
- [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

### 9.4 Komponen Signature

- **Status ditandai garis tab warna di sisi kiri baris** (seperti tab warna pada map/folder rekam medis fisik), bukan badge pill besar
- **Header halaman bergaya kop surat resmi**: judul + garis ganda tipis di bawahnya (meniru letterhead dokumen pemerintah/rumah sakit)
- **Nomor RM & ID selalu pakai font mono**, dipisah visual dari nama pasien
- **Tabel padat (dense table)**, bukan card list lapang — mengikuti kebiasaan staf medis yang scan banyak data sekaligus
- Border tipis (`1px solid line`) menggantikan shadow sebagai pemisah, kecuali untuk elemen yang benar-benar perlu elevasi (modal, dropdown)

---

## 10. Alur Utama (User Flow)

1. Resepsionis daftarkan/cari pasien → buat encounter
2. Perawat input vital sign
3. Dokter isi Asesmen Medis Awal → order lab/radiologi bila perlu
4. Hasil lab/radiologi masuk → dokter review
5. Dokter buat resep → apoteker proses
6. Dokter buat Discharge Summary → encounter "Finished"
7. Sistem sync ke SatuSehat (background)

---

## 11. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| API SatuSehat down/berubah | Retry queue + versioning API client |
| Data pasien duplikat | Validasi No. RM/Telp/NIK saat registrasi |
| Resistensi staf medis | UI sederhana, training, shortcut keyboard |
| Kebocoran data medis | RBAC ketat, audit log, enkripsi, pen-test sebelum go-live |
| Downtime jam sibuk | Load testing, monitoring, redundant server |

---

## 12. Roadmap

- **Fase 1 (MVP, 8-10 minggu):** Modul 5.1–5.9, single clinic
- **Fase 2:** Billing & asuransi, inventori farmasi
- **Fase 3:** Multi-cabang, laporan analitik, mobile app
- **Fase 4:** Telemedicine, integrasi BPJS

---

*Dokumen ini sudah termasuk arah desain visual. Perlu divalidasi dengan calon pengguna (dokter/perawat/admin klinik) sebelum masuk tahap implementasi teknis detail.*