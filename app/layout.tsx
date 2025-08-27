import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Aromadata - Análisis Cafetero Profesional",
  description:
    "Plataforma especializada en análisis estadístico del sector cafetero colombiano. Datos en tiempo real, proyecciones y herramientas avanzadas.",
  keywords: "café, Colombia, análisis, estadísticas, FNC, producción, exportaciones, precios",
  authors: [{ name: "Aromadata Team" }],
  generator: "Aromadata Analytics Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  )
}
