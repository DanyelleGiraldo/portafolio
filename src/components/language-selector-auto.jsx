"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Check, ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
]

const translations = {
  es: {
    nav: {
      about: "Sobre Mí",
      education: "Educación",
      skills: "Habilidades",
      projects: "Proyectos",
      game: "Juego",
      contact: "Contacto",
      contactMe: "Contáctame",
      downloadCV: "Descargar CV",
    },
    hero: {
      greeting: "Hola, soy",
      role: "Desarrollador Full Stack",
      description:
        "Me especializo en desarrollo web fullstack, con un enfoque en rendimiento, accesibilidad y experiencia de usuario. Apasionado por la tecnología, disfruto colaborar en equipo y crear productos que realmente marquen la diferencia.",
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
      downloadCV: "Descargar CV",
    },
    about: {
      title: "Sobre Mí", 
      p1: "Soy estudiante de Ingeniería en Ciencia de Datos en la Universidad Industrial de Santander. Me apasiona desarrollar soluciones eficientes y escalables que aporten valor real.",
      p2: "Me especializo en Java con Spring Boot y SQL. Tengo experiencia construyendo aplicaciones fullstack y trabajando en proyectos de análisis de datos, siempre buscando mejorar mis habilidades y aportar en equipos colaborativos.",
      p3: "Disfruto aprender continuamente, leer libros, hacer ejercicio, escucha y hacer musica, resolver problemas complejos y gestionar mi tiempo para equilibrar estudios, desarrollo profesional y crecimiento personal.",
    },
    education: {
      title: "Educación y Certificaciones",
      education: "Educación",
      certifications: "Certificaciones",
      present: "Presente",
      download: "Descargar certificado",
      viewMore: "Ver más",
      viewLess: "Ver menos",
      next: "Siguiente",
      previous: "Anterior",
    },
    skills: {
      title: "Mis Habilidades",
      technical: "Habilidades Técnicas",
      soft: "Habilidades Blandas",
    },
    projects: {
      title: "Mis Proyectos",
      code: "Código",
      demo: "Demo",
    },
    memoryGame: {
      title: "Juego de Memoria",
      description: "Pon a prueba tu memoria encontrando todas las parejas de cartas. ¡Desafía tu mente y diviértete!",
      instructions: "Haz clic en las cartas para voltearlas y encontrar las parejas.",
      selectDifficulty: "Selecciona la dificultad:",
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
      moves: "Movimientos",
      restart: "Reiniciar",
      congratulations: "¡Felicidades!",
      timeUp: "¡Tiempo agotado!",
      completedIn: "Has completado el juego en",
      with: "con",
      foundPairs: "Has encontrado",
      of: "de",
      pairs: "parejas",
      bestScore: "Mejor puntuación",
      playAgain: "Jugar de nuevo",
      changeDifficulty: "Cambiar dificultad",
    },
    contact: {
      title: "Contáctame",
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      namePlaceholder: "Danyelle Giraldo",
      emailPlaceholder: "tu@email.com",
      subjectPlaceholder: "Asunto del mensaje",
      messagePlaceholder: "Tu mensaje...",
      send: "Enviar Mensaje",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },  
  en: {
    nav: {
      about: "About Me",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      game: "Game",
      contact: "Contact",
      contactMe: "Contact Me",
      downloadCV: "Download CV",
    },
    hero: {
      greeting: "Hello, I'm",
      role: "Full Stack Developer",
      description:
        "I create elegant and functional digital solutions. Specialized in modern web development with a focus on performance, accessibility, and user experience.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCV: "Download CV",
    },
    about: {
      title: "About Me",
      p1: "I'm a passionate developer with over 5 years of experience creating web and mobile applications. My focus is on building digital products that combine functionality with elegant design.",
      p2: "My background includes work in startups and established companies, where I've led teams and delivered successful projects that have positively impacted thousands of users.",
      p3: "When I'm not coding, I enjoy photography, hiking, and learning new technologies.",
    },
    education: {
      title: "Education & Certifications",
      education: "Education",
      certifications: "Certifications",
      present: "Present",
      download: "Download certificate",
      viewMore: "View more",
      viewLess: "View less",
      next: "Next",
      previous: "Previous",
    },
    skills: {
      title: "My Skills",
      technical: "Technical Skills",
      soft: "Soft Skills",
    },
    projects: {
      title: "My Projects",
      code: "Code",
      demo: "Demo",
    },
    memoryGame: {
      title: "Memory Game",
      description: "Test your memory by finding all matching pairs of cards. Challenge your mind and have fun!",
      instructions: "Click on cards to flip them and find the matching pairs.",
      selectDifficulty: "Select difficulty:",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      moves: "Moves",
      restart: "Restart",
      congratulations: "Congratulations!",
      timeUp: "Time's up!",
      completedIn: "You completed the game in",
      with: "with",
      foundPairs: "You found",
      of: "of",
      pairs: "pairs",
      bestScore: "Best score",
      playAgain: "Play again",
      changeDifficulty: "Change difficulty",
    },
    contact: {
      title: "Contact Me",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      subjectPlaceholder: "Message subject",
      messagePlaceholder: "Your message...",
      send: "Send Message",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
}

let currentTranslations = translations.es

export function LanguageSelectorAuto() {
  const [language, setLanguage] = useState("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") || "es"
    setLanguage(savedLanguage)

    currentTranslations = translations[savedLanguage] || translations.es

    document.documentElement.setAttribute("lang", savedLanguage)
  }, [])

  const changeLanguage = (langCode) => {
    localStorage.setItem("language", langCode)

    setLanguage(langCode)

    currentTranslations = translations[langCode] || translations.es

    document.documentElement.setAttribute("lang", langCode)

    const customEvent = new CustomEvent("languageChange", {
      detail: {
        language: langCode,
        translations: translations[langCode] || translations.es,
      },
    })
    window.dispatchEvent(customEvent)

    setTimeout(() => {
      window.location.reload()
    }, 50)
  }

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 px-2 h-9 hover:bg-primary/10 transition-all border-primary/20 hover:border-primary/50"
        >
          <Globe className="h-4 w-4 text-primary/80" />
          <span className="uppercase font-medium">{language}</span>
          <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-primary/10 transition-colors rounded-md px-3 py-2 my-0.5"
          >
            {lang.name}
            {language === lang.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function getTranslations(lang) {
  return translations[lang] || translations.es
}

export function getCurrentTranslations() {
  return currentTranslations
}
