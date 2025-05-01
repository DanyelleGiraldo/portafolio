"use client"
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { ThemeToggle } from "../components/theme-toggle"
import { LanguageSelectorAuto, getTranslations } from "../components/language-selector-auto"
import { MemoryGame } from "../components/memory-game"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Portfolio() {
  const [language, setLanguage] = useState("es")
  const [t, setT] = useState(getTranslations("es"))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    // Recuperar preferencia de idioma del localStorage
    const savedLanguage = localStorage.getItem("language") || "es"
    setLanguage(savedLanguage)
    setT(getTranslations(savedLanguage))

    // Observador de intersección para detectar secciones visibles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    // Observar todas las secciones
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Variantes para animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const navLinks = [
    { href: "#sobre-mi", label: t.nav?.about || "Sobre Mí" },
    { href: "#habilidades", label: t.nav?.skills || "Habilidades" },
    { href: "#proyectos", label: t.nav?.projects || "Proyectos" },
    { href: "#juego", label: t.nav?.game || "Juego" },
    { href: "#contacto", label: t.nav?.contact || "Contacto" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Fondo animado */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <a href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <span className="text-primary">Dev</span>Portfolio
            </a>
          </div>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-all hover:text-primary relative ${
                  activeSection === link.href.substring(1) ? "text-primary font-medium" : ""
                }`}
              >
                {link.label}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelectorAuto />
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="h-9 hidden md:flex">
              <a href="#contacto" className="hover:scale-105 transition-transform">
                {t.nav?.contactMe || "Contáctame"}
              </a>
            </Button>

            {/* Botón de menú móvil */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2">
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav?.contactMe || "Contáctame"}
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="container py-10">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="py-20 md:py-32 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            className="relative w-32 h-32 mb-8 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/50 transition-colors"
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Foto de perfil"
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" variants={fadeIn}>
            {t.hero?.greeting || "Hola, soy"} <span className="text-primary animate-pulse">Tu Nombre</span>
          </motion.h1>
          <motion.h2 className="text-xl md:text-2xl text-muted-foreground mb-6" variants={fadeIn}>
            {t.hero?.role || "Desarrollador Full Stack"}
          </motion.h2>
          <motion.p className="max-w-[42rem] leading-normal text-muted-foreground mb-8" variants={fadeIn}>
            {t.hero?.description ||
              "Creo soluciones digitales elegantes y funcionales. Especializado en desarrollo web moderno con enfoque en rendimiento, accesibilidad y experiencia de usuario."}
          </motion.p>
          <motion.div className="flex gap-4" variants={fadeIn}>
            <Button asChild whileHover={{ scale: 1.05 }} className="transition-transform">
              <a href="#proyectos">{t.hero?.viewProjects || "Ver Proyectos"}</a>
            </Button>
            <Button variant="outline" asChild whileHover={{ scale: 1.05 }} className="transition-transform">
              <a href="#contacto">{t.hero?.contactMe || "Contáctame"}</a>
            </Button>
          </motion.div>
          <motion.div
            className="flex justify-center mt-12"
            variants={fadeIn}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <a href="#sobre-mi">
              <ChevronDown className="h-8 w-8 text-primary" />
            </a>
          </motion.div>
        </motion.section>

        {/* About Me Section */}
        <motion.section
          id="sobre-mi"
          className="py-20 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold mb-6 relative">
                {t.about?.title || "Sobre Mí"}
                <span className="absolute -bottom-2 left-0 w-20 h-1 bg-primary rounded-full"></span>
              </h2>
              <p className="text-muted-foreground mb-4">
                {t.about?.p1 ||
                  "Soy un desarrollador apasionado con más de 5 años de experiencia creando aplicaciones web y móviles. Mi enfoque se centra en construir productos digitales que combinen funcionalidad con diseño elegante."}
              </p>
              <p className="text-muted-foreground mb-4">
                {t.about?.p2 ||
                  "Mi trayectoria incluye trabajo en startups y empresas establecidas, donde he liderado equipos y entregado proyectos exitosos que han impactado positivamente a miles de usuarios."}
              </p>
              <p className="text-muted-foreground mb-6">
                {t.about?.p3 ||
                  "Cuando no estoy programando, disfruto de la fotografía, el senderismo y aprender nuevas tecnologías."}
              </p>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="transition-all">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="transition-all">
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="transition-all">
                  <Button variant="outline" size="icon" asChild>
                    <a href="mailto:tu@email.com">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="relative h-[400px] rounded-lg overflow-hidden border group"
            >
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Imagen profesional"
                className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="habilidades"
          className="py-20 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold mb-10 text-center relative inline-block mx-auto" variants={fadeIn}>
            <span className="relative">
              {t.skills?.title || "Mis Habilidades"}
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
            </span>
          </motion.h2>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={staggerContainer}>
            {[
              { name: "JavaScript", level: 90 },
              { name: "TypeScript", level: 85 },
              { name: "React", level: 90 },
              { name: "Next.js", level: 85 },
              { name: "Node.js", level: 80 },
              { name: "CSS/Tailwind", level: 85 },
              { name: "SQL", level: 75 },
              { name: "Git", level: 80 },
              { name: "Docker", level: 70 },
              { name: "AWS", level: 65 },
              { name: "UI/UX", level: 75 },
              { name: "Testing", level: 70 },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-lg p-6 border hover:border-primary/50 transition-all hover:shadow-md"
                variants={fadeIn}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <h3 className="font-medium mb-2">{skill.name}</h3>
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="proyectos"
          className="py-20 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold mb-10 text-center relative inline-block mx-auto" variants={fadeIn}>
            <span className="relative">
              {t.projects?.title || "Mis Proyectos"}
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
            </span>
          </motion.h2>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
            {[
              {
                title: "E-commerce Platform",
                description:
                  "Plataforma completa de comercio electrónico con carrito de compras, pagos y panel de administración.",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Dashboard Analytics",
                description:
                  "Dashboard interactivo para visualización de datos con gráficos personalizables y reportes en tiempo real.",
                tech: ["Next.js", "TypeScript", "D3.js", "Firebase"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Social Media App",
                description:
                  "Aplicación de redes sociales con funcionalidades de chat, publicaciones y perfiles de usuario.",
                tech: ["React Native", "GraphQL", "AWS", "Socket.io"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Task Management",
                description:
                  "Sistema de gestión de tareas con funcionalidades de colaboración, recordatorios y seguimiento de tiempo.",
                tech: ["Vue.js", "Express", "PostgreSQL", "Redis"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Portfolio Generator",
                description: "Herramienta para crear portfolios profesionales personalizables con múltiples temas.",
                tech: ["React", "Tailwind CSS", "Netlify", "Contentful"],
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Fitness Tracker",
                description: "Aplicación para seguimiento de actividad física, nutrición y progreso personal.",
                tech: ["Flutter", "Firebase", "TensorFlow", "Google Fit API"],
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group relative bg-card rounded-lg overflow-hidden border hover:border-primary/50 transition-all hover:shadow-xl"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group-hover:border-primary/50 transition-colors"
                    >
                      <a href="#" className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        {t.projects?.code || "Código"}
                      </a>
                    </Button>
                    <Button size="sm" asChild className="group-hover:bg-primary/90 transition-colors">
                      <a href="#" className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        {t.projects?.demo || "Demo"}
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Game Section */}
        <motion.section
          id="juego"
          className="py-20 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold mb-6 text-center" variants={fadeIn}>
            <span className="relative">
              {t.memoryGame?.title || "Juego de Memoria"}
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
            </span>
          </motion.h2>
          <motion.p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto" variants={fadeIn}>
            {t.memoryGame?.description ||
              "Pon a prueba tu memoria encontrando todas las parejas de cartas. ¡Desafía tu mente y diviértete!"}
          </motion.p>
          <motion.div variants={fadeIn}>
            <MemoryGame />
          </motion.div>
          <motion.div className="mt-6 text-center text-sm text-muted-foreground" variants={fadeIn}>
            <p>{t.memoryGame?.instructions || "Haz clic en las cartas para voltearlas y encontrar las parejas."}</p>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contacto"
          className="py-20 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2 className="text-3xl font-bold mb-10 text-center" variants={fadeIn}>
              <span className="relative">
                {t.contact?.title || "Contáctame"}
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
              </span>
            </motion.h2>
            <motion.form className="space-y-6" variants={staggerContainer}>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="space-y-2" variants={fadeIn}>
                  <label htmlFor="name" className="text-sm font-medium">
                    {t.contact?.name || "Nombre"}
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    placeholder={t.contact?.namePlaceholder || "Tu nombre"}
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={fadeIn}>
                  <label htmlFor="email" className="text-sm font-medium">
                    {t.contact?.email || "Email"}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    placeholder={t.contact?.emailPlaceholder || "tu@email.com"}
                  />
                </motion.div>
              </div>
              <motion.div className="space-y-2" variants={fadeIn}>
                <label htmlFor="subject" className="text-sm font-medium">
                  {t.contact?.subject || "Asunto"}
                </label>
                <input
                  id="subject"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  placeholder={t.contact?.subjectPlaceholder || "Asunto del mensaje"}
                />
              </motion.div>
              <motion.div className="space-y-2" variants={fadeIn}>
                <label htmlFor="message" className="text-sm font-medium">
                  {t.contact?.message || "Mensaje"}
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  placeholder={t.contact?.messagePlaceholder || "Tu mensaje..."}
                />
              </motion.div>
              <motion.div variants={fadeIn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">
                  {t.contact?.send || "Enviar Mensaje"}
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-lg">
              <span className="text-primary">Dev</span>Portfolio
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tu Nombre. {t.footer?.rights || "Todos los derechos reservados."}
            </p>
          </div>
          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="transition-all">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="transition-all">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="transition-all">
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:tu@email.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
