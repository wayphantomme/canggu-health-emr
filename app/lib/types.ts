// ─────────────────────────────────────────────
// TypeScript Types — EMR Klinik
// ─────────────────────────────────────────────

export type Role = "admin" | "dokter" | "perawat" | "apoteker" | "lab" | "manajemen";

export type SyncStatus = "belum_sync" | "tersinkron" | "gagal";

export type EncounterStatus = "draft" | "in_progress" | "finished";
export type EncounterType = "clinic_visit" | "home_visit";

export type AppointmentStatus = "booked" | "checked_in" | "cancelled" | "done";

export type PrescriptionStatus = "pending" | "completed";
export type LabOrderStatus = "ordered" | "sample_collected" | "processing" | "completed";
export type RadiologyStatus = "ordered" | "scheduled" | "completed";

export type PatientStatus = "aktif" | "nonaktif";

// ─── Patient ───────────────────────────────────
export interface Patient {
  id: string;
  noRM: string;           // Format: NRM.MM.NN
  noIHS?: string;         // Nomor IHS SatuSehat
  nik?: string;
  nama: string;
  tanggalLahir: string;   // ISO date string
  jenisKelamin: "L" | "P";
  telepon: string;
  alamat: string;
  status: PatientStatus;
  syncStatus: SyncStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Appointment ───────────────────────────────
export interface Appointment {
  id: string;
  patientId: string;
  patientNama: string;
  patientNoRM: string;
  dokterId: string;
  dokterNama: string;
  tanggal: string;        // ISO date string
  jam: string;            // HH:mm
  keluhan: string;
  status: AppointmentStatus;
  createdAt: string;
}

// ─── Encounter ─────────────────────────────────
export interface Encounter {
  id: string;
  noEncounter: string;    // Format: ENC.YYYYMMDD.NNN
  patientId: string;
  patientNama: string;
  patientNoRM: string;
  dokterId: string;
  dokterNama: string;
  perawatId?: string;
  perawatNama?: string;
  tipe: EncounterType;
  status: EncounterStatus;
  tanggal: string;
  keluhan: string;
  vitalSign?: VitalSign;
  syncStatus: SyncStatus;
  modulesCompleted: EncounterModule[];
  createdAt: string;
  updatedAt: string;
}

export type EncounterModule = "asesmen" | "bedah" | "resep" | "lab" | "radiologi" | "discharge";

// ─── Vital Sign ────────────────────────────────
export interface VitalSign {
  tekananDarah: string;  // e.g. "120/80"
  nadiPerMenit: number;
  suhuc: number;
  beratKg: number;
  tinggicm: number;
  spo2: number;
  respirasiPerMenit: number;
  gcs?: string;
  catatan?: string;
}

// ─── Asesmen Medis Awal ────────────────────────
export interface AsesMenMedis {
  id: string;
  encounterId: string;
  keluhanUtama: string;
  riwayatPenyakitSekarang: string;
  riwayatPenyakitDahulu?: string;
  riwayatAlergi?: string;
  pemeriksaanFisik: string;
  diagnosisUtama: ICD10Item;
  diagnosisSecondary?: ICD10Item[];
  catatan?: string;
  createdAt: string;
}

export interface ICD10Item {
  kode: string;
  nama: string;
}

// ─── Asesmen Bedah & Anestesi ─────────────────
export interface AsesMenBedah {
  id: string;
  encounterId: string;
  diagnosisPraOp: ICD10Item;
  prosedur: string;
  dokterOperator: string;
  dokterAnestesi?: string;
  jenisAnestesi?: string;
  // Form A-G sections
  riwayatMedis: string;       // A
  pemeriksaanFisik: string;   // B
  hasilLab?: string;           // C
  risikoAnestesi: string;     // D — ASA class
  rencanaTindakan: string;    // E
  persetujuanOperasi: boolean; // F
  catatan?: string;            // G
  createdAt: string;
}

// ─── Resep ─────────────────────────────────────
export interface Resep {
  id: string;
  encounterId: string;
  patientId: string;
  dokterNama: string;
  status: PrescriptionStatus;
  items: ResepItem[];
  catatan?: string;
  createdAt: string;
}

export interface ResepItem {
  id: string;
  namaObat: string;
  dosis: string;
  frekuensi: string;   // e.g. "3x sehari"
  durasi: string;      // e.g. "7 hari"
  instruksi?: string;  // e.g. "Sesudah makan"
  jumlah: number;
}

// ─── Lab Order ─────────────────────────────────
export interface LabOrder {
  id: string;
  encounterId: string;
  patientId: string;
  namaTest: string;
  prioritas: "rutin" | "cito";
  status: LabOrderStatus;
  result?: LabResult;
  createdAt: string;
}

export interface LabResult {
  parameter: LabParameter[];
  pdfUrl?: string;
  catatan?: string;
  completedAt: string;
}

export interface LabParameter {
  nama: string;
  nilai: string;
  satuan: string;
  referenceRange: string;
  flag?: "normal" | "high" | "low" | "critical";
}

// ─── Radiologi ─────────────────────────────────
export interface RadiologiOrder {
  id: string;
  encounterId: string;
  patientId: string;
  modalitas: "X-Ray" | "CT Scan" | "MRI" | "USG" | "Mamografi" | "Fluoroskopi";
  bodyPart: string;
  klinis: string;
  status: RadiologyStatus;
  hasilUrl?: string;
  interpretasi?: string;
  createdAt: string;
}

// ─── Discharge Summary ─────────────────────────
export interface DischargeSummary {
  id: string;
  encounterId: string;
  patientId: string;
  diagnosisUtama: ICD10Item;
  diagnosisSecondary?: ICD10Item[];
  obatLanjutan: ResepItem[];
  metodePulang: "pulang_biasa" | "rujuk" | "atas_permintaan" | "meninggal";
  jadwalKontrol?: string;
  ringkasanKlinis: string;
  dokterNama: string;
  createdAt: string;
}

// ─── SatuSehat Sync Log ────────────────────────
export interface SyncLog {
  id: string;
  resourceType: "Patient" | "Encounter" | "Observation" | "DiagnosticReport";
  resourceId: string;
  resourceLabel: string;
  status: SyncStatus;
  lastAttempt: string;
  errorMessage?: string;
  retryCount: number;
}

// ─── User / Session ────────────────────────────
export interface AppUser {
  id: string;
  nama: string;
  role: Role;
  avatar?: string;
  unit?: string;
}
