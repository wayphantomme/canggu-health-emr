import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "EMR Klinik — Rekam Medis Elektronik",
    template: "%s | EMR Klinik",
  },
  description:
    "Sistem rekam medis elektronik terintegrasi untuk klinik dan rumah sakit. Kelola pasien, encounter, resep, lab, dan sinkronisasi SatuSehat dalam satu platform.",
  keywords: ["EMR", "rekam medis elektronik", "klinik", "SatuSehat", "FHIR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${sourceSerif4.variable} h-full`}
    >
      <body className="min-h-full bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
