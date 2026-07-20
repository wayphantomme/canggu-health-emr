# Canggu Health EMR 🏥

Web-based Electronic Medical Record (EMR) system yang dirancang untuk mengoptimalkan manajemen data pasien dan alur kerja klinis di fasilitas kesehatan.

---

## 📊 Business Value

### Proposisi Nilai
- **Efisiensi Operasional**: Mengurangi waktu administratif hingga 60% melalui digitalisasi proses klinis
- **Akurasi Data**: Eliminasi kesalahan input manual dengan sistem terstruktur dan validasi otomatis
- **Keamanan Pasien**: Compliance dengan standar kesehatan dan enkripsi data patient records
- **Skalabilitas**: Arsitektur cloud-ready yang mendukung pertumbuhan dari klinik kecil hingga jaringan rumah sakit
- **Integrasi Seamless**: Koneksi dengan sistem lab, farmasi, dan billing untuk workflow terpadu

### Target Market
- Klinik kesehatan lokal dan multi-cabang
- Praktik dokter independen
- Fasilitas kesehatan di daerah (regional healthcare)
- Telemedicine providers

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Frontend** | Next.js 14+ (React), TypeScript (91%), Tailwind CSS |
| **Language** | TypeScript (90.9%), CSS (8.8%), JavaScript (0.3%) |
| **Architecture** | Server-side rendering + Client-side optimization |
| **State Management** | React Hooks + Context API / Redux (scalable) |
| **Database** | PostgreSQL / Firebase (flexible data storage) |
| **Authentication** | JWT + OAuth2 untuk single sign-on (SSO) |
| **Deployment** | Vercel / Docker containerization |

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Browser]
        MOBILE[Mobile App]
    end
    
    subgraph "Frontend"
        NEXTJS["Next.js Application"]
        UI["UI Components<br/>TypeScript + Tailwind"]
    end
    
    subgraph "API Layer"
        AUTH["Authentication Service<br/>JWT/OAuth2"]
        RECORDS["Patient Records API"]
        CLINIC["Clinic Management API"]
    end
    
    subgraph "Database & Services"
        DB["Database<br/>PostgreSQL"]
        CACHE["Cache Layer<br/>Redis"]
        STORAGE["File Storage<br/>Encrypted"]
    end
    
    subgraph "External Integrations"
        LAB["Lab System"]
        PHARMACY["Pharmacy System"]
        BILLING["Billing System"]
    end
    
    WEB --> NEXTJS
    MOBILE --> NEXTJS
    NEXTJS --> UI
    UI --> AUTH
    UI --> RECORDS
    UI --> CLINIC
    
    AUTH --> DB
    RECORDS --> DB
    CLINIC --> DB
    
    RECORDS --> CACHE
    DB --> STORAGE
    
    RECORDS --> LAB
    RECORDS --> PHARMACY
    RECORDS --> BILLING
```

---

## 📈 Feature Roadmap

### Phase 1: MVP (Current)
- ✅ Patient profile & medical history management
- ✅ Appointment scheduling
- ✅ Basic clinical notes
- ✅ User authentication & access control

### Phase 2: Q3 2026
- 📋 Prescription management module
- 💊 Lab integration & results tracking
- 📊 Basic analytics dashboard
- 🔐 Advanced security compliance (HIPAA/GDPR)

### Phase 3: Q4 2026
- 🤖 AI-assisted clinical decision support
- 📱 Mobile app (iOS/Android)
- 📞 Telemedicine integration
- 🏥 Multi-location clinic management

### Phase 4: 2027
- 🔗 Interoperability dengan sistem rumah sakit lain
- 📈 Advanced business intelligence & reporting
- ⚙️ Workflow automation dengan AI

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ dan npm/yarn
- PostgreSQL database
- Environment variables configured

### Installation

```bash
# Clone repository
git clone https://github.com/wayphantomme/canggu-health-emr.git
cd canggu-health-emr

# Install dependencies
npm install
# atau
yarn install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi database & API keys

# Run development server
npm run dev
```

Akses aplikasi di [http://localhost:3000](http://localhost:3000)

### Build untuk Production

```bash
npm run build
npm start
```

---

## 📊 Data Model Overview

```mermaid
erDiagram
    PATIENT ||--o{ APPOINTMENT : schedules
    PATIENT ||--o{ MEDICAL_RECORD : has
    PATIENT ||--o{ PRESCRIPTION : receives
    
    MEDICAL_RECORD ||--o{ CLINICAL_NOTE : contains
    MEDICAL_RECORD ||--o{ LAB_RESULT : includes
    
    PRESCRIPTION ||--o{ MEDICATION : contains
    
    CLINIC ||--o{ DOCTOR : employs
    CLINIC ||--o{ PATIENT : treats
    DOCTOR ||--o{ APPOINTMENT : conducts
    DOCTOR ||--o{ CLINICAL_NOTE : writes
    
    PATIENT {
        string patient_id PK
        string name
        string email
        string phone
        date date_of_birth
        string gender
        string blood_type
        string address
        timestamp created_at
    }
    
    APPOINTMENT {
        string appointment_id PK
        string patient_id FK
        string doctor_id FK
        timestamp scheduled_time
        string status
        string reason
    }
    
    MEDICAL_RECORD {
        string record_id PK
        string patient_id FK
        string allergies
        string chronic_diseases
        timestamp updated_at
    }
    
    CLINICAL_NOTE {
        string note_id PK
        string record_id FK
        string doctor_id FK
        text findings
        timestamp created_at
    }
    
    PRESCRIPTION {
        string prescription_id PK
        string patient_id FK
        string doctor_id FK
        timestamp issued_date
        timestamp expiry_date
    }
    
    MEDICATION {
        string medication_id PK
        string prescription_id FK
        string drug_name
        string dosage
        string frequency
    }
    
    LAB_RESULT {
        string result_id PK
        string record_id FK
        string test_type
        string result_value
        timestamp test_date
    }
```

---

## 👥 User Roles & Permissions

```mermaid
graph LR
    subgraph "Access Levels"
        ADMIN["👨‍💼 Admin<br/>Full System Access"]
        DOCTOR["👨‍⚕️ Doctor<br/>Patient Records<br/>Prescriptions<br/>Appointments"]
        NURSE["👩‍⚕️ Nurse<br/>Patient Data Entry<br/>Vital Signs"]
        RECEPTIONIST["👤 Receptionist<br/>Appointments<br/>Patient Registration"]
        PATIENT["🧑 Patient<br/>Own Records View<br/>Appointment Booking"]
    end
    
    style ADMIN fill:#ff6b6b
    style DOCTOR fill:#4ecdc4
    style NURSE fill:#45b7d1
    style RECEPTIONIST fill:#96ceb4
    style PATIENT fill:#dfe6e9
```

---

## 🔐 Security & Compliance

- **Encryption**: Data at rest (AES-256) dan in transit (TLS 1.3)
- **Access Control**: Role-based access control (RBAC)
- **Audit Trail**: Comprehensive logging untuk setiap akses data
- **HIPAA Compliance**: Compliance dengan Health Insurance Portability and Accountability Act
- **GDPR Ready**: Data privacy dan right to be forgotten support
- **Regular Security Audits**: Penetration testing dan vulnerability assessments

---

## 📈 Performance Metrics

```mermaid
graph LR
    A["Page Load<br/>&lt; 2s"] 
    B["API Response<br/>&lt; 500ms"]
    C["Database Query<br/>&lt; 200ms"]
    D["99.9% Uptime<br/>Target"]
    
    style A fill:#90EE90
    style B fill:#90EE90
    style C fill:#90EE90
    style D fill:#87CEEB
```

---

## 🤝 Contributing

Kami menyambut kontribusi dari developer dan healthcare professionals! 

Silakan:
1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 Environment Setup

Buat file `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/canggu_emr

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# External Services
LAB_API_KEY=your-lab-api-key
PHARMACY_API_KEY=your-pharmacy-api-key
```

---

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/wayphantomme/canggu-health-emr/issues)
- **Email**: wayphantomme@cangguhealth.com
- **Website**: www.cangguhealth.com

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI Components via [Tailwind CSS](https://tailwindcss.com)
- Database: [PostgreSQL](https://www.postgresql.org)
- Deployment: [Vercel](https://vercel.com)

---

**Last Updated**: July 2026 | Version: 1.0.0-beta
