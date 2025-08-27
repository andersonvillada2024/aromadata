"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  Coffee,
  TrendingUp,
  Download,
  Users,
  Globe,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react"

// Mock data based on FNC statistics
const productionData = [
  { month: "Ene", production: 1200, exports: 1100, price: 178.5 },
  { month: "Feb", production: 1150, exports: 1080, price: 182.3 },
  { month: "Mar", production: 1300, exports: 1250, price: 175.8 },
  { month: "Apr", production: 1180, exports: 1120, price: 179.2 },
  { month: "May", production: 1250, exports: 1200, price: 185.4 },
  { month: "Jun", production: 1100, exports: 1050, price: 188.9 },
  { month: "Jul", production: 1350, exports: 1300, price: 192.1 },
  { month: "Ago", production: 1280, exports: 1220, price: 189.5 },
]

const regionData = [
  { name: "Huila", value: 18.5, color: "#8B4513" },
  { name: "Nariño", value: 16.2, color: "#A0522D" },
  { name: "Tolima", value: 14.8, color: "#CD853F" },
  { name: "Cauca", value: 12.3, color: "#DEB887" },
  { name: "Otros", value: 38.2, color: "#F4A460" },
]

const qualityData = [
  { category: "Supremo", percentage: 45, bags: 6750 },
  { category: "Extra", percentage: 35, bags: 5250 },
  { category: "UGQ", percentage: 15, bags: 2250 },
  { category: "Otros", percentage: 5, bags: 750 },
]

export default function CoffeeDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null)
  const [currentPrice, setCurrentPrice] = useState(189.5)
  const [priceChange, setPriceChange] = useState(2.3)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [calculatorData, setCalculatorData] = useState({
    hectares: "",
    variety: "",
    climate: "",
    fertilizer: "",
    altitude: "",
  })
  const [calculatorResult, setCalculatorResult] = useState(null)
  const [activeToolModal, setActiveToolModal] = useState(null)
  const [priceComparison, setPriceComparison] = useState(null)
  const [weatherPrediction, setWeatherPrediction] = useState(null)

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 2
      setCurrentPrice((prev) => Math.max(150, prev + change))
      setPriceChange(change)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const exportData = (format: string) => {
    const data = productionData.map((item) => ({
      Mes: item.month,
      "Producción (miles sacos)": item.production,
      "Exportaciones (miles sacos)": item.exports,
      "Precio (USD/lb)": item.price,
    }))

    if (format === "csv") {
      const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "estadisticas_cafe.csv"
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === "json") {
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "estadisticas_cafe.json"
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleToolAction = (toolName: string) => {
    setActiveToolModal(toolName)

    switch (toolName) {
      case "Calculadora de Rendimiento":
        // Modal will open for calculator
        break
      case "Comparador de Precios":
        setPriceComparison({
          current: currentPrice,
          historical: [
            { period: "Hace 1 mes", price: currentPrice - 0.15 },
            { period: "Hace 3 meses", price: currentPrice - 0.32 },
            { period: "Hace 6 meses", price: currentPrice + 0.28 },
            { period: "Hace 1 año", price: currentPrice - 0.45 },
          ],
          markets: [
            { market: "Nueva York", price: currentPrice },
            { market: "Londres", price: currentPrice + 0.12 },
            { market: "Tokio", price: currentPrice - 0.08 },
          ],
        })
        break
      case "Predictor Climático":
        setWeatherPrediction({
          forecast: [
            { day: "Hoy", temp: "22°C", rain: "15%", condition: "Parcialmente nublado" },
            { day: "Mañana", temp: "24°C", rain: "30%", condition: "Lluvias ligeras" },
            { day: "Pasado mañana", temp: "21°C", rain: "60%", condition: "Lluvioso" },
            { day: "3 días", temp: "23°C", rain: "20%", condition: "Soleado" },
            { day: "4 días", temp: "25°C", rain: "10%", condition: "Despejado" },
            { day: "5 días", temp: "22°C", rain: "40%", condition: "Nublado" },
            { day: "6 días", temp: "20°C", rain: "70%", condition: "Tormentas" },
          ],
          recommendation:
            "Condiciones favorables para el crecimiento. Se recomienda aplicar fertilizante antes de las lluvias del día 3.",
        })
        break
      default:
        alert(`${toolName}: Funcionalidad en desarrollo`)
    }
  }

  const calculateYield = () => {
    const { hectares, variety, climate, altitude } = calculatorData

    if (!hectares || !variety || !climate || !altitude) {
      alert("Por favor complete todos los campos")
      return
    }

    // Calculation logic based on inputs
    const baseYield = 12 // base yield per hectare

    // Variety multiplier
    const varietyMultipliers = {
      Caturra: 1.0,
      Colombia: 1.15,
      Castillo: 1.25,
      Típica: 0.9,
      Bourbon: 0.95,
    }

    // Climate multiplier
    const climateMultipliers = {
      Óptimo: 1.2,
      Bueno: 1.0,
      Regular: 0.8,
      Malo: 0.6,
    }

    // Altitude multiplier
    const altitudeNum = Number.parseInt(altitude)
    let altitudeMultiplier = 1.0
    if (altitudeNum >= 1800) altitudeMultiplier = 1.3
    else if (altitudeNum >= 1500) altitudeMultiplier = 1.2
    else if (altitudeNum >= 1200) altitudeMultiplier = 1.1
    else if (altitudeNum >= 1000) altitudeMultiplier = 1.0
    else altitudeMultiplier = 0.8

    const totalYield =
      Number.parseFloat(hectares) *
      baseYield *
      (varietyMultipliers[variety] || 1.0) *
      (climateMultipliers[climate] || 1.0) *
      altitudeMultiplier

    const revenue = totalYield * currentPrice * 125 // 125 kg per saco

    setCalculatorResult({
      totalYield: totalYield.toFixed(1),
      yieldPerHectare: (totalYield / Number.parseFloat(hectares)).toFixed(1),
      estimatedRevenue: revenue.toFixed(0),
      recommendations: [
        altitudeNum >= 1500 ? "Excelente altitud para café especial" : "Considere variedades resistentes",
        climate === "Óptimo" ? "Condiciones ideales para máximo rendimiento" : "Implemente sistemas de riego",
        variety === "Castillo" ? "Variedad resistente con buen rendimiento" : "Evalúe cambio de variedad",
      ],
    })
  }

  const handleAnalysisAction = (analysisType: string) => {
    setActiveAnalysis(analysisType)
    setActiveSection("analysis-charts")
  }

  const backToAnalysisMenu = () => {
    setActiveAnalysis(null)
    setActiveSection("analysis")
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Por favor completa todos los campos obligatorios.")
      return
    }
    alert(`Gracias ${contactForm.name}! Tu mensaje ha sido enviado. Te responderemos a ${contactForm.email} pronto.`)
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <nav
        className={`fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-sm shadow-lg z-40 overflow-y-auto transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 text-amber-800">
            <Coffee className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Aromadata</h1>
          </div>

          <nav className="space-y-2">
            {[
              { id: "home", label: "Inicio", icon: "🏠" },
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "about", label: "Quiénes Somos", icon: "👥" },
              { id: "analysis", label: "Análisis", icon: "📈" },
              { id: "projections", label: "Proyecciones", icon: "🔮" },
              { id: "tools", label: "Herramientas", icon: "🛠️" },
              { id: "contact", label: "Contacto", icon: "📞" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md"
                    : "hover:bg-amber-100 text-gray-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <main className="lg:ml-64 min-h-screen">
        {/* Hero Section */}
        {activeSection === "home" && (
          <section
            className="min-h-screen flex items-center justify-center text-white relative px-4"
            style={{
              background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold uppercase tracking-wider drop-shadow-lg">
                Análisis Cafetero Profesional
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl drop-shadow-md">
                Transformando datos en oportunidades para el sector cafetero colombiano
              </p>
              <Button
                onClick={() => handleSectionChange("dashboard")}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                Explorar Dashboard
              </Button>
            </div>
          </section>
        )}

        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 mb-4">Dashboard Estadístico</h2>
              <p className="text-gray-600 text-base md:text-lg">Datos en tiempo real del sector cafetero colombiano</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <Card className="bg-gradient-to-br from-amber-600 to-orange-600 text-white">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold">15.0M</div>
                  <div className="text-xs md:text-sm opacity-90">Sacos Proyectados 2024-25</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold">${currentPrice.toFixed(2)}</div>
                  <div className="text-xs md:text-sm opacity-90">Precio Actual USD/lb</div>
                  <div className={`text-xs ${priceChange >= 0 ? "text-green-200" : "text-red-200"}`}>
                    {priceChange >= 0 ? "↗" : "↘"} {Math.abs(priceChange).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold">540K</div>
                  <div className="text-xs md:text-sm opacity-90">Familias Cafeteras</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold">95%</div>
                  <div className="text-xs md:text-sm opacity-90">Café Arábica</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="production" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="production" className="text-xs md:text-sm">
                  Producción
                </TabsTrigger>
                <TabsTrigger value="exports" className="text-xs md:text-sm">
                  Exportaciones
                </TabsTrigger>
                <TabsTrigger value="regions" className="text-xs md:text-sm">
                  Regiones
                </TabsTrigger>
                <TabsTrigger value="quality" className="text-xs md:text-sm">
                  Calidad
                </TabsTrigger>
              </TabsList>

              <TabsContent value="production">
                <Card>
                  <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div>
                      <CardTitle className="text-lg md:text-xl">Producción Mensual 2024</CardTitle>
                      <CardDescription>Miles de sacos de 60kg</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button onClick={() => exportData("csv")} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        CSV
                      </Button>
                      <Button onClick={() => exportData("json")} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        JSON
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <ChartContainer
                      config={{
                        production: {
                          label: "Producción",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={productionData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 10 }}
                            interval="preserveStartEnd"
                            axisLine={{ strokeWidth: 1 }}
                          />
                          <YAxis tick={{ fontSize: 10 }} axisLine={{ strokeWidth: 1 }} width={40} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="production"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exports">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Exportaciones vs Producción</CardTitle>
                    <CardDescription>Comparativo mensual en miles de sacos</CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <ChartContainer
                      config={{
                        production: {
                          label: "Producción",
                          color: "hsl(var(--chart-1))",
                        },
                        exports: {
                          label: "Exportaciones",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={productionData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 10 }}
                            interval="preserveStartEnd"
                            axisLine={{ strokeWidth: 1 }}
                          />
                          <YAxis tick={{ fontSize: 10 }} axisLine={{ strokeWidth: 1 }} width={40} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="production" fill="#f59e0b" name="Producción" />
                          <Bar dataKey="exports" fill="#10b981" name="Exportaciones" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="regions">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Producción por Regiones</CardTitle>
                    <CardDescription>Distribución porcentual de la producción nacional</CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4 md:p-6">
                    <ChartContainer
                      config={{
                        value: {
                          label: "Porcentaje",
                        },
                      }}
                      className="h-[280px] sm:h-[320px] md:h-[380px] lg:h-[400px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                          <Pie
                            data={regionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius="75%"
                            innerRadius="25%"
                            fill="#8884d8"
                            dataKey="value"
                            fontSize={10}
                          >
                            {regionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quality">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Clasificación por Calidad</CardTitle>
                    <CardDescription>Distribución de la producción por categorías de calidad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {qualityData.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <Badge variant="outline">{item.category}</Badge>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.percentage}%</div>
                            <div className="text-sm text-gray-500">{item.bags.toLocaleString()} sacos</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 mb-4">Quiénes Somos</h2>
              <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                Somos especialistas en análisis de datos del sector cafetero, comprometidos con el desarrollo y la
                innovación en la industria del café colombiano.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-xl md:text-2xl font-semibold text-amber-700">Nuestra Misión</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Proporcionar análisis estadísticos precisos y herramientas innovadoras que permitan a los productores,
                  comercializadores y demás actores del sector cafetero tomar decisiones informadas basadas en datos
                  confiables y actualizados.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold text-amber-700">Nuestra Visión</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Ser la plataforma líder en análisis de datos del sector cafetero en Colombia, contribuyendo al
                  crecimiento sostenible y la competitividad de la industria cafetera nacional.
                </p>
              </div>

              <Card className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-amber-700 mb-6">Nuestros Valores</h3>
                <div className="space-y-4">
                  {[
                    { icon: "🎯", title: "Precisión", desc: "Datos exactos y análisis rigurosos" },
                    { icon: "🚀", title: "Innovación", desc: "Tecnología de vanguardia aplicada al café" },
                    { icon: "🤝", title: "Compromiso", desc: "Dedicados al éxito del sector cafetero" },
                    { icon: "🌱", title: "Sostenibilidad", desc: "Promovemos prácticas responsables" },
                  ].map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-xl md:text-2xl">{value.icon}</span>
                      <div>
                        <h4 className="font-semibold text-amber-700 text-sm md:text-base">{value.title}</h4>
                        <p className="text-gray-600 text-xs md:text-sm">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
              <Card className="text-center p-4 md:p-6">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">Equipo Experto</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Profesionales especializados en análisis de datos y sector cafetero
                </p>
              </Card>

              <Card className="text-center p-4 md:p-6">
                <BarChart3 className="h-10 w-10 md:h-12 md:w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">Tecnología Avanzada</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Herramientas de última generación para análisis estadístico
                </p>
              </Card>

              <Card className="text-center p-4 md:p-6">
                <Globe className="h-10 w-10 md:h-12 md:w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">Alcance Nacional</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Cobertura completa de todas las regiones cafeteras de Colombia
                </p>
              </Card>
            </div>
          </section>
        )}

        {/* Analysis Charts Section */}
        {activeSection === "analysis-charts" && activeAnalysis && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <Button onClick={backToAnalysisMenu} variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800">{activeAnalysis}</h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Visualización completa de datos en múltiples formatos
                </p>
              </div>
            </div>

            {/* Charts Grid - Analysis View */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              {/* Line Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Tendencia Temporal</CardTitle>
                  <CardDescription className="text-sm">Evolución mensual de los datos</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      value: { label: "Valor", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[220px] sm:h-[260px] md:h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productionData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 9 }}
                          interval="preserveStartEnd"
                          axisLine={{ strokeWidth: 1 }}
                        />
                        <YAxis tick={{ fontSize: 9 }} axisLine={{ strokeWidth: 1 }} width={35} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="production"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
                          activeDot={{ r: 5, strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Comparativo por Período</CardTitle>
                  <CardDescription className="text-sm">Análisis comparativo mensual</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      production: { label: "Producción", color: "hsl(var(--chart-1))" },
                      exports: { label: "Exportaciones", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[220px] sm:h-[260px] md:h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={productionData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 9 }}
                          interval="preserveStartEnd"
                          axisLine={{ strokeWidth: 1 }}
                        />
                        <YAxis tick={{ fontSize: 9 }} axisLine={{ strokeWidth: 1 }} width={35} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="production" fill="#f59e0b" name="Producción" />
                        <Bar dataKey="exports" fill="#10b981" name="Exportaciones" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Area Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Análisis de Área</CardTitle>
                  <CardDescription className="text-sm">Visualización de tendencias acumuladas</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      production: { label: "Producción", color: "hsl(var(--chart-1))" },
                      exports: { label: "Exportaciones", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[220px] sm:h-[260px] md:h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={productionData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 9 }}
                          interval="preserveStartEnd"
                          axisLine={{ strokeWidth: 1 }}
                        />
                        <YAxis tick={{ fontSize: 9 }} axisLine={{ strokeWidth: 1 }} width={35} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="production"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="exports"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Distribución Regional</CardTitle>
                  <CardDescription className="text-sm">Participación por regiones</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      value: { label: "Porcentaje" },
                    }}
                    className="h-[220px] sm:h-[260px] md:h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          outerRadius="65%"
                          innerRadius="25%"
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                          fontSize={9}
                        >
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Stacked Bar Chart */}
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Análisis Comparativo Completo</CardTitle>
                  <CardDescription className="text-sm">Vista integral de producción y exportaciones</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      production: { label: "Producción", color: "hsl(var(--chart-1))" },
                      exports: { label: "Exportaciones", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[280px] sm:h-[320px] md:h-[350px] lg:h-[400px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={productionData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 10 }}
                          interval="preserveStartEnd"
                          axisLine={{ strokeWidth: 1 }}
                        />
                        <YAxis tick={{ fontSize: 10 }} axisLine={{ strokeWidth: 1 }} width={40} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="production" stackId="a" fill="#f59e0b" name="Producción" />
                        <Bar dataKey="exports" stackId="a" fill="#10b981" name="Exportaciones" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
              <Card className="p-3 md:p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-lg md:text-2xl font-bold text-blue-700">
                  {productionData.reduce((sum, item) => sum + item.production, 0).toLocaleString()}
                </div>
                <div className="text-xs md:text-sm text-blue-600">Total Producción</div>
              </Card>
              <Card className="p-3 md:p-4 text-center bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-lg md:text-2xl font-bold text-green-700">
                  {productionData.reduce((sum, item) => sum + item.exports, 0).toLocaleString()}
                </div>
                <div className="text-xs md:text-sm text-green-600">Total Exportaciones</div>
              </Card>
              <Card className="p-3 md:p-4 text-center bg-gradient-to-br from-amber-50 to-amber-100">
                <div className="text-lg md:text-2xl font-bold text-amber-700">
                  {Math.max(...productionData.map((item) => item.production)).toLocaleString()}
                </div>
                <div className="text-xs md:text-sm text-amber-600">Pico Producción</div>
              </Card>
              <Card className="p-3 md:p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-lg md:text-2xl font-bold text-purple-700">
                  {(productionData.reduce((sum, item) => sum + item.production, 0) / productionData.length).toFixed(0)}
                </div>
                <div className="text-xs md:text-sm text-purple-600">Promedio Mensual</div>
              </Card>
            </div>
          </section>
        )}

        {/* Analysis Section */}
        {activeSection === "analysis" && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 mb-4">Análisis Avanzado</h2>
              <p className="text-gray-600 text-base md:text-lg">
                Herramientas especializadas para análisis profundo del sector cafetero
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "Análisis de Tendencias",
                  description: "Identificación de patrones y tendencias en producción y precios",
                  icon: "📈",
                  features: ["Análisis temporal", "Correlaciones", "Patrones estacionales"],
                },
                {
                  title: "Análisis Regional",
                  description: "Comparativo detallado entre diferentes regiones cafeteras",
                  icon: "🗺️",
                  features: ["Productividad por región", "Análisis climático", "Calidad por zona"],
                },
                {
                  title: "Análisis de Mercado",
                  description: "Seguimiento de precios y comportamiento del mercado internacional",
                  icon: "💹",
                  features: ["Precios internacionales", "Volatilidad", "Oportunidades"],
                },
                {
                  title: "Análisis Climático",
                  description: "Impacto de variables climáticas en la producción cafetera",
                  icon: "🌤️",
                  features: ["Precipitaciones", "Temperatura", "Fenómenos climáticos"],
                },
                {
                  title: "Análisis de Calidad",
                  description: "Evaluación de parámetros de calidad y clasificación",
                  icon: "⭐",
                  features: ["Clasificación por calidad", "Defectos", "Premiums"],
                },
                {
                  title: "Análisis Económico",
                  description: "Evaluación de rentabilidad y costos de producción",
                  icon: "💰",
                  features: ["Costos de producción", "Rentabilidad", "ROI"],
                },
              ].map((analysis, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:text-3xl">{analysis.icon}</span>
                      <CardTitle className="text-base md:text-lg">{analysis.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">{analysis.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {analysis.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs md:text-sm">
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-sm"
                      onClick={() => handleAnalysisAction(analysis.title)}
                    >
                      Ver Análisis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Projections Section */}
        {activeSection === "projections" && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 mb-4">Proyecciones 2025</h2>
              <p className="text-gray-600 text-base md:text-lg">
                Predicciones basadas en análisis estadístico y machine learning
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Proyección de Producción Mensual 2025</CardTitle>
                  <CardDescription>Estimaciones basadas en tendencias históricas</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      projected: { label: "Proyectado", color: "hsl(var(--chart-1))" },
                      historical: { label: "Histórico", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Ene", projected: 850, historical: 820 },
                          { month: "Feb", projected: 920, historical: 890 },
                          { month: "Mar", projected: 1100, historical: 1050 },
                          { month: "Abr", projected: 1850, historical: 1780 },
                          { month: "May", projected: 2200, historical: 2100 },
                          { month: "Jun", projected: 1950, historical: 1850 },
                          { month: "Jul", projected: 1200, historical: 1150 },
                          { month: "Ago", projected: 980, historical: 950 },
                          { month: "Sep", projected: 1050, historical: 1000 },
                          { month: "Oct", projected: 1400, historical: 1350 },
                          { month: "Nov", projected: 1650, historical: 1580 },
                          { month: "Dic", projected: 1500, historical: 1450 },
                        ]}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} width={40} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="historical"
                          stroke="#10b981"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line type="monotone" dataKey="projected" stroke="#f59e0b" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Proyección de Precios 2025</CardTitle>
                  <CardDescription>Tendencias esperadas del mercado internacional</CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-4 md:p-6">
                  <ChartContainer
                    config={{
                      price: { label: "Precio USD/lb", color: "hsl(var(--chart-3))" },
                      trend: { label: "Tendencia", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-[250px] sm:h-[300px] md:h-[350px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { month: "Ene", price: 2.45, trend: 2.4 },
                          { month: "Feb", price: 2.52, trend: 2.48 },
                          { month: "Mar", price: 2.38, trend: 2.42 },
                          { month: "Abr", price: 2.65, trend: 2.58 },
                          { month: "May", price: 2.72, trend: 2.68 },
                          { month: "Jun", price: 2.58, trend: 2.62 },
                          { month: "Jul", price: 2.48, trend: 2.52 },
                          { month: "Ago", price: 2.55, trend: 2.58 },
                          { month: "Sep", price: 2.62, trend: 2.65 },
                          { month: "Oct", price: 2.78, trend: 2.75 },
                          { month: "Nov", price: 2.85, trend: 2.82 },
                          { month: "Dic", price: 2.92, trend: 2.88 },
                        ]}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} width={40} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="trend"
                          stackId="1"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stackId="2"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <TrendingUp className="h-5 w-5" />
                    Proyección de Producción
                  </CardTitle>
                  <CardDescription>Estimaciones para los próximos 12 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-green-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <div className="font-semibold text-sm md:text-base">Cosecha Principal 2025</div>
                        <div className="text-xs md:text-sm text-gray-600">Abril - Junio</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-green-600">9.2M</div>
                        <div className="text-xs md:text-sm text-gray-600">sacos</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-blue-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <div className="font-semibold text-sm md:text-base">Mitaca 2025</div>
                        <div className="text-xs md:text-sm text-gray-600">Octubre - Diciembre</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-blue-600">6.8M</div>
                        <div className="text-xs md:text-sm text-gray-600">sacos</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-amber-50 rounded-lg border-2 border-amber-200 space-y-2 sm:space-y-0">
                      <div>
                        <div className="font-semibold text-sm md:text-base">Total Proyectado 2025</div>
                        <div className="text-xs md:text-sm text-gray-600">Año cafetero completo</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-bold text-amber-600">16.0M</div>
                        <div className="text-xs md:text-sm text-gray-600">sacos</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <BarChart3 className="h-5 w-5" />
                    Proyección de Precios
                  </CardTitle>
                  <CardDescription>Tendencias esperadas en el mercado internacional</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm md:text-base">Q1 2025</span>
                        <span className="text-green-600 font-bold text-sm md:text-base">$185-195/lb</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Tendencia alcista por menor oferta global</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm md:text-base">Q2 2025</span>
                        <span className="text-amber-600 font-bold text-sm md:text-base">$180-190/lb</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Estabilización con nueva cosecha</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm md:text-base">Q3-Q4 2025</span>
                        <span className="text-blue-600 font-bold text-sm md:text-base">$175-185/lb</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Normalización con mayor oferta</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Factores de Riesgo y Oportunidades</CardTitle>
                <CardDescription>Análisis de variables que pueden impactar las proyecciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3 text-sm md:text-base">⚠️ Factores de Riesgo</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Fenómeno El Niño y variabilidad climática</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Volatilidad en mercados internacionales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Incremento en costos de producción</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Plagas y enfermedades del cultivo</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-600 mb-3 text-sm md:text-base">🚀 Oportunidades</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Creciente demanda de cafés especiales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Nuevos mercados emergentes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Innovación en procesos de beneficiado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                        <span className="text-xs md:text-sm">Certificaciones de sostenibilidad</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Tools Section */}
        {activeSection === "tools" && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 mb-4">
                Herramientas Especializadas
              </h2>
              <p className="text-gray-600 text-base md:text-lg">
                Utiliza nuestras herramientas para análisis profundo y toma de decisiones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  title: "Calculadora de Rendimiento",
                  description: "Calcula el rendimiento esperado basado en variables climáticas y de manejo",
                  icon: "🧮",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Comparador de Precios",
                  description: "Compara precios históricos y actuales en diferentes mercados",
                  icon: "📊",
                  color: "from-green-500 to-green-600",
                },
                {
                  title: "Predictor Climático",
                  description: "Predicciones climáticas específicas para zonas cafeteras",
                  icon: "🌤️",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  title: "Analizador de Calidad",
                  description: "Evalúa la calidad del café según parámetros internacionales",
                  icon: "⭐",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  title: "Simulador de Costos",
                  description: "Simula costos de producción y rentabilidad por hectárea",
                  icon: "💰",
                  color: "from-red-500 to-red-600",
                },
                {
                  title: "Exportador de Datos",
                  description: "Exporta datos y reportes en múltiples formatos",
                  icon: "📤",
                  color: "from-indigo-500 to-indigo-600",
                },
              ].map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 md:p-6">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${tool.color} rounded-full flex items-center justify-center text-xl md:text-2xl text-white mb-4`}
                    >
                      {tool.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">{tool.description}</p>
                    <Button
                      className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-sm`}
                      onClick={() => handleToolAction(tool.title)}
                    >
                      Usar Herramienta
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeToolModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-800">{activeToolModal}</h3>
                  <Button variant="outline" onClick={() => setActiveToolModal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calculator Modal */}
                {activeToolModal === "Calculadora de Rendimiento" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Hectáreas Cultivadas</label>
                        <input
                          type="number"
                          placeholder="Ej: 5.5"
                          className="w-full p-3 border rounded-lg"
                          value={calculatorData.hectares}
                          onChange={(e) => setCalculatorData({ ...calculatorData, hectares: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Variedad de Café</label>
                        <select
                          className="w-full p-3 border rounded-lg"
                          value={calculatorData.variety}
                          onChange={(e) => setCalculatorData({ ...calculatorData, variety: e.target.value })}
                        >
                          <option value="">Seleccionar variedad</option>
                          <option value="Caturra">Caturra</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Castillo">Castillo</option>
                          <option value="Típica">Típica</option>
                          <option value="Bourbon">Bourbon</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Condiciones Climáticas</label>
                        <select
                          className="w-full p-3 border rounded-lg"
                          value={calculatorData.climate}
                          onChange={(e) => setCalculatorData({ ...calculatorData, climate: e.target.value })}
                        >
                          <option value="">Seleccionar condición</option>
                          <option value="Óptimo">Óptimo</option>
                          <option value="Bueno">Bueno</option>
                          <option value="Regular">Regular</option>
                          <option value="Malo">Malo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Altitud (msnm)</label>
                        <input
                          type="number"
                          placeholder="Ej: 1500"
                          className="w-full p-3 border rounded-lg"
                          value={calculatorData.altitude}
                          onChange={(e) => setCalculatorData({ ...calculatorData, altitude: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button onClick={calculateYield} className="w-full bg-blue-600 hover:bg-blue-700">
                      Calcular Rendimiento
                    </Button>

                    {calculatorResult && (
                      <div className="mt-6 p-6 bg-green-50 rounded-lg">
                        <h4 className="text-xl font-bold mb-4 text-green-800">Resultados del Cálculo</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{calculatorResult.totalYield}</div>
                            <div className="text-sm text-gray-600">Sacos Totales</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{calculatorResult.yieldPerHectare}</div>
                            <div className="text-sm text-gray-600">Sacos/Hectárea</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-amber-600">
                              ${calculatorResult.estimatedRevenue}
                            </div>
                            <div className="text-sm text-gray-600">Ingresos Estimados</div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Recomendaciones:</h5>
                          <ul className="list-disc list-inside space-y-1">
                            {calculatorResult.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm">
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Price Comparison Modal */}
                {activeToolModal === "Comparador de Precios" && priceComparison && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Comparación Histórica</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {priceComparison.historical.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>{item.period}</span>
                                <span className="font-semibold">${item.price.toFixed(2)}/lb</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Precios por Mercado</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {priceComparison.markets.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>{item.market}</span>
                                <span className="font-semibold">${item.price.toFixed(2)}/lb</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Weather Prediction Modal */}
                {activeToolModal === "Predictor Climático" && weatherPrediction && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {weatherPrediction.forecast.map((day, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4 text-center">
                            <div className="font-semibold">{day.day}</div>
                            <div className="text-2xl font-bold text-blue-600">{day.temp}</div>
                            <div className="text-sm text-gray-600">{day.condition}</div>
                            <div className="text-sm text-blue-500">Lluvia: {day.rain}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Recomendación:</h4>
                      <p className="text-yellow-700">{weatherPrediction.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <section className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 mb-4">Contacto</h2>
              <p className="text-gray-600 text-base md:text-lg">¿Tienes preguntas? Nos encantaría ayudarte</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <Card className="p-6 md:p-8">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Envíanos un mensaje</CardTitle>
                  <CardDescription>Completa el formulario y te responderemos pronto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Asunto</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Mensaje *</label>
                      <textarea
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                        placeholder="Describe tu consulta o solicitud..."
                        required
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Ubicación</h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        Medellín, Colombia
                        <br />
                        Eje Cafetero
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Teléfono</h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        +57 (4) 123-4567
                        <br />
                        WhatsApp disponible
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Email</h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        info@aromadata.com
                        <br />
                        soporte@aromadata.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">Horarios</h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        Lun - Vie: 8:00 AM - 6:00 PM
                        <br />
                        Sáb: 9:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
