"use client"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  Award,
  Download,
  Users,
  MessageSquare,
  Lightbulb,
  RefreshCw,
  Clock,
  Target,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { ThemeToggle } from "../components/theme-toggle"
import { LanguageSelectorAuto, getTranslations } from "../components/language-selector-auto"
import { MemoryGame } from "../components/memory-game"
import { CertificationCarousel } from "../components/certification-carrusel"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import fotoperfil from './img/fp.png';
import { getProjects } from "../components/data/projects"
import { getEducation, getCvData, getSoftSkills } from "../components/data/education"

export default function Portfolio() {
  const [language, setLanguage] = useState("es")
  const [t, setT] = useState(getTranslations("es"))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [projectsList, setProjectsList] = useState([])
  const [educationList, setEducationList] = useState([])
  const [cvData, setCvData] = useState(getCvData("es"))
  const [softSkills, setSoftSkills] = useState(getSoftSkills("es"))
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('enviando')

    try {
      const res = await fetch('https://formsubmit.co/ajax/danyellesgiraldoj@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success === 'true') {
        setStatus('enviado')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  useEffect(() => {
    const loadLanguageData = () => {
      const savedLanguage = localStorage.getItem("language") || "es"

      setLanguage(savedLanguage)
      setT(getTranslations(savedLanguage))

      const currentProjects = getProjects(savedLanguage)
      setProjectsList(currentProjects)

      const currentEducation = getEducation(savedLanguage)
      setEducationList(currentEducation)

      const currentCvData = getCvData(savedLanguage)
      setCvData(currentCvData)

      const currentSoftSkills = getSoftSkills(savedLanguage)
      setSoftSkills(currentSoftSkills)
    }

    loadLanguageData()

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

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    const handleLanguageChange = (event) => {
      if (event.detail && event.detail.language) {
        const newLang = event.detail.language

        setLanguage(newLang)
        setT(getTranslations(newLang))

        const newProjects = getProjects(newLang)
        setProjectsList(newProjects)

        const newEducation = getEducation(newLang)
        setEducationList(newEducation)

        const newCvData = getCvData(newLang)
        setCvData(newCvData)

        const newSoftSkills = getSoftSkills(newLang)
        setSoftSkills(newSoftSkills)
      }
    }

    window.addEventListener("languageChange", handleLanguageChange)

    return () => {
      observer.disconnect()
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

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
    { href: "#educacion", label: t.nav?.education || "Educación" },
    { href: "#habilidades", label: t.nav?.skills || "Habilidades" },
    { href: "#proyectos", label: t.nav?.projects || "Proyectos" },
    { href: "#juego", label: t.nav?.game || "Juego" },
    { href: "#contacto", label: t.nav?.contact || "Contacto" },
  ]

  const renderSoftSkillIcon = (iconName) => {
    switch (iconName) {
      case "users":
        return <Users className="h-5 w-5" />
      case "message-square":
        return <MessageSquare className="h-5 w-5" />
      case "lightbulb":
        return <Lightbulb className="h-5 w-5" />
      case "refresh-cw":
        return <RefreshCw className="h-5 w-5" />
      case "clock":
        return <Clock className="h-5 w-5" />
      case "target":
        return <Target className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

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
              <span className="text-primary">Danyelle</span>Dev
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

          <div className="flex items-center gap-3">
            <LanguageSelectorAuto />
            <ThemeToggle />
            <Button
              variant="default"
              size="sm"
              asChild
              className="h-9 hidden md:flex bg-primary/90 hover:bg-primary transition-all"
            >
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
              <Button variant="outline" className="mt-2 flex items-center justify-center gap-1" asChild>
                <a href={cvData.url} download={cvData.fileName} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  {t.nav?.downloadCV || "Descargar CV"}
                </a>
              </Button>
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
          className="py-20 md:py-32 flex flex-col items-center text-center relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          </div>
          <motion.div
            className="relative w-36 h-36 mb-10 rounded-full overflow-hidden border-4 border-primary/30 hover:border-primary/70 transition-all shadow-lg"
            variants={fadeIn}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <img
              src= {fotoperfil}
              alt="Foto de perfil"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" variants={fadeIn}>
            {t.hero?.greeting || "Hola, soy"} <span className="text-primary animate-pulse">Danyelle Giraldo</span>
          </motion.h1>
          <motion.h2 className="text-xl md:text-2xl text-muted-foreground mb-6" variants={fadeIn}>
            {t.hero?.role || "Desarrollador Full Stack"}
          </motion.h2>
          <motion.p className="max-w-[42rem] leading-normal text-muted-foreground mb-8" variants={fadeIn}>
            {t.hero?.description ||
              "Creo soluciones digitales elegantes y funcionales. Especializado en desarrollo web moderno con enfoque en rendimiento, accesibilidad y experiencia de usuario."}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" variants={fadeIn}>
            <Button asChild whileHover={{ scale: 1.05 }} className="transition-transform">
              <a href="#proyectos">{t.hero?.viewProjects || "Ver Proyectos"}</a>
            </Button>
            <Button variant="outline" asChild whileHover={{ scale: 1.05 }} className="transition-transform">
              <a href="#contacto">{t.hero?.contactMe || "Contáctame"}</a>
            </Button>
          </motion.div>
          <motion.div className="mt-4" variants={fadeIn}>
            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 hover:bg-primary/10 transition-all border-primary/20 hover:border-primary/50 shadow-sm hover:shadow"
            >
              <a href={cvData.url} download={cvData.fileName} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                {t.hero?.downloadCV || "Descargar CV"}
              </a>
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
                    <a href="mailto:danyellesgiraldoj@gmail.com">
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

        {/* Education Section */}
        <motion.section
          id="educacion"
          className="py-20 scroll-mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold mb-10 text-center relative inline-block mx-auto" variants={fadeIn}>
            <span className="relative">
              {t.education?.title || "Educación y Certificaciones"}
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Educación Formal */}
            <motion.div variants={fadeIn}>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">{t.education?.education || "Educación"}</h3>
              </div>
              <div className="space-y-8">
                {educationList
                  .filter((item) => item.type === "education")
                  .map((education, index) => (
                    <motion.div
                      key={education.id}
                      className="relative pl-8 border-l-2 border-muted hover:border-primary transition-colors"
                      variants={fadeIn}
                      whileHover={{ x: 5 }}
                    >
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-lg">{education.title}</h4>
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {education.date}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {education.institution}, {education.location}
                      </div>
                      <p className="text-sm">{education.description}</p>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Certificaciones */}
            <motion.div variants={fadeIn}>
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">{t.education?.certifications || "Certificaciones"}</h3>
              </div>
              <CertificationCarousel
                certifications={educationList.filter((item) => item.type === "certification")}
                translations={t.education || {}}
              />
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

          {/* Habilidades Técnicas */}
          <motion.h3 className="text-xl font-bold mb-6 flex items-center gap-2" variants={fadeIn}>
            <Lightbulb className="h-5 w-5 text-primary" />
            {t.skills?.technical || "Habilidades Técnicas"}
          </motion.h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16"
            variants={staggerContainer}
          >
            {[
              { name: "Java / Spring Boot", level: 90 },
              { name: "SQL (MySQL / PostgreSQL)", level: 85 },
              { name: "TypeScript", level: 80 },
              { name: "React", level: 75 },
              { name: "Node.js", level: 70 },
              { name: "Next.js", level: 70 },
              { name: "MongoDB", level: 65 },
              { name: "Anaconda / Jupyter", level: 65 },
              { name: "Firebase", level: 70 },
              { name: "Git", level: 80 },
              { name: "Docker", level: 75 },
              { name: "AWS (Lambda / S3)", level: 65 },
            ]
            .map((skill, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group"
                variants={fadeIn}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <h3 className="font-medium mb-3 group-hover:text-primary transition-colors flex justify-between">
                  <span>{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </h3>
                <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute top-0 right-0 h-full w-5 bg-white/20 rounded-full blur-sm"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Habilidades Blandas */}
          <motion.h3 className="text-xl font-bold mb-6 flex items-center gap-2" variants={fadeIn}>
            <Users className="h-5 w-5 text-primary" />
            {t.skills?.soft || "Habilidades Blandas"}
          </motion.h3>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-lg p-6 border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg flex gap-4 group"
                variants={fadeIn}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300">
                  {renderSoftSkillIcon(skill.icon)}
                </div>
                <div>
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
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
            {projectsList.map((project, index) => (
              <motion.div
                key={index}
                className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-xl"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group-hover:border-primary/50 transition-all hover:bg-primary/10"
                    >
                      <a href="#" className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        {t.projects?.code || "Código"}
                      </a>
                    </Button>
                    <Button size="sm" asChild className="bg-primary/90 hover:bg-primary transition-colors">
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
                {t.contact?.title || 'Contáctame'}
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary rounded-full"></span>
              </span>
            </motion.h2>
            <motion.form onSubmit={handleSubmit} className="space-y-6" variants={staggerContainer}>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="space-y-2" variants={fadeIn}>
                  <label htmlFor="name" className="text-sm font-medium">
                    {t.contact?.name || 'Nombre'}
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    placeholder={t.contact?.namePlaceholder || 'Danyelle Giraldo'}
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={fadeIn}>
                  <label htmlFor="email" className="text-sm font-medium">
                    {t.contact?.email || 'Email'}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    placeholder={t.contact?.emailPlaceholder || 'tu@email.com'}
                  />
                </motion.div>
              </div>
              <motion.div className="space-y-2" variants={fadeIn}>
                <label htmlFor="subject" className="text-sm font-medium">
                  {t.contact?.subject || 'Asunto'}
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder={t.contact?.subjectPlaceholder || 'Asunto del mensaje'}
                />
              </motion.div>
              <motion.div className="space-y-2" variants={fadeIn}>
                <label htmlFor="message" className="text-sm font-medium">
                  {t.contact?.message || 'Mensaje'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder={t.contact?.messagePlaceholder || 'Tu mensaje...'}
                ></textarea>
              </motion.div>

              {/* Anti-spam y sin redirección */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <motion.div className="mt-4" variants={fadeIn}>
                <Button type="submit" className="w-full bg-primary/90 hover:bg-primary transition-all">
                  {status === 'enviando'
                    ? t.contact?.sending || 'Enviando...'
                    : t.contact?.send || 'Enviar Mensaje'}
                </Button>
                {status === 'enviado' && (
                  <p className="text-green-500 text-center mt-2">✅ Mensaje enviado con éxito</p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-center mt-2">❌ Ocurrió un error al enviar</p>
                )}
              </motion.div>
            </motion.form>
          </div>
        </motion.section>
      </main>

      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-lg">
              <span className="text-primary">Danyelle</span>Dev
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Danyelle Giraldo. {t.footer?.rights || "Todos los derechos reservados."}
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
                <a href="mailto:danyellesgiraldoj@gmail.com">
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
