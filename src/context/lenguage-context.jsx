"use client"

import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  es: {
    nav: {
      about: "Sobre Mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
      contactMe: "Contáctame",
    },
    hero: {
      greeting: "Hola, soy",
      role: "Desarrollador Full Stack",
      description:
        "Creo soluciones digitales elegantes y funcionales. Especializado en desarrollo web moderno con enfoque en rendimiento, accesibilidad y experiencia de usuario.",
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
    },
    about: {
      title: "Sobre Mí",
      p1: "Soy un desarrollador apasionado con más de 5 años de experiencia creando aplicaciones web y móviles. Mi enfoque se centra en construir productos digitales que combinen funcionalidad con diseño elegante.",
      p2: "Mi trayectoria incluye trabajo en startups y empresas establecidas, donde he liderado equipos y entregado proyectos exitosos que han impactado positivamente a miles de usuarios.",
      p3: "Cuando no estoy programando, disfruto de la fotografía, el senderismo y aprender nuevas tecnologías.",
    },
    skills: {
      title: "Mis Habilidades",
    },
    projects: {
      title: "Mis Proyectos",
      code: "Código",
      demo: "Demo",
      projects: [
        {
          title: "Plataforma E-commerce",
          description:
            "Plataforma completa de comercio electrónico con carrito de compras, pagos y panel de administración.",
          tech: ["React", "Node.js", "MongoDB", "Stripe"],
        },
        {
          title: "Dashboard Analytics",
          description:
            "Dashboard interactivo para visualización de datos con gráficos personalizables y reportes en tiempo real.",
          tech: ["Next.js", "TypeScript", "D3.js", "Firebase"],
        },
        {
          title: "App de Redes Sociales",
          description: "Aplicación de redes sociales con funcionalidades de chat, publicaciones y perfiles de usuario.",
          tech: ["React Native", "GraphQL", "AWS", "Socket.io"],
        },
        {
          title: "Gestión de Tareas",
          description:
            "Sistema de gestión de tareas con funcionalidades de colaboración, recordatorios y seguimiento de tiempo.",
          tech: ["Vue.js", "Express", "PostgreSQL", "Redis"],
        },
        {
          title: "Generador de Portfolios",
          description: "Herramienta para crear portfolios profesionales personalizables con múltiples temas.",
          tech: ["React", "Tailwind CSS", "Netlify", "Contentful"],
        },
        {
          title: "Fitness Tracker",
          description: "Aplicación para seguimiento de actividad física, nutrición y progreso personal.",
          tech: ["Flutter", "Firebase", "TensorFlow", "Google Fit API"],
        },
      ],
    },
    contact: {
      title: "Contáctame",
      name: "Nombre",
      email: "Email",
      subject: "Asunto",
      message: "Mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      subjectPlaceholder: "Asunto del mensaje",
      messagePlaceholder: "Tu mensaje...",
      send: "Enviar Mensaje",
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
    language: {
      es: "Español",
      en: "Inglés",
    },
  },
  en: {
    nav: {
      about: "About Me",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      contactMe: "Contact Me",
    },
    hero: {
      greeting: "Hello, I'm",
      role: "Full Stack Developer",
      description:
        "I create elegant and functional digital solutions. Specialized in modern web development with a focus on performance, accessibility, and user experience.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      p1: "I'm a passionate developer with over 5 years of experience creating web and mobile applications. My focus is on building digital products that combine functionality with elegant design.",
      p2: "My background includes work in startups and established companies, where I've led teams and delivered successful projects that have positively impacted thousands of users.",
      p3: "When I'm not coding, I enjoy photography, hiking, and learning new technologies.",
    },
    skills: {
      title: "My Skills",
    },
    projects: {
      title: "My Projects",
      code: "Code",
      demo: "Demo",
      projects: [
        {
          title: "E-commerce Platform",
          description: "Complete e-commerce platform with shopping cart, payments, and admin panel.",
          tech: ["React", "Node.js", "MongoDB", "Stripe"],
        },
        {
          title: "Dashboard Analytics",
          description: "Interactive dashboard for data visualization with customizable charts and real-time reports.",
          tech: ["Next.js", "TypeScript", "D3.js", "Firebase"],
        },
        {
          title: "Social Media App",
          description: "Social media application with chat functionality, posts, and user profiles.",
          tech: ["React Native", "GraphQL", "AWS", "Socket.io"],
        },
        {
          title: "Task Management",
          description: "Task management system with collaboration features, reminders, and time tracking.",
          tech: ["Vue.js", "Express", "PostgreSQL", "Redis"],
        },
        {
          title: "Portfolio Generator",
          description: "Tool to create customizable professional portfolios with multiple themes.",
          tech: ["React", "Tailwind CSS", "Netlify", "Contentful"],
        },
        {
          title: "Fitness Tracker",
          description: "Application for tracking physical activity, nutrition, and personal progress.",
          tech: ["Flutter", "Firebase", "TensorFlow", "Google Fit API"],
        },
      ],
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
    language: {
      es: "Spanish",
      en: "English",
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("es")
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    setTranslations(language === "es" ? translations.es : translations.en)

    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function getTranslations(lang) {
  return translations[lang] || translations.es
}
