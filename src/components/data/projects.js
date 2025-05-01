export const projects = {
    es: [
      {
        id: "ecommerce",
        title: "Plataforma E-commerce",
        description:
          "Plataforma completa de comercio electrónico con carrito de compras, pagos y panel de administración.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "dashboard",
        title: "Dashboard Analytics",
        description:
          "Dashboard interactivo para visualización de datos con gráficos personalizables y reportes en tiempo real.",
        tech: ["Next.js", "TypeScript", "D3.js", "Firebase"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "social",
        title: "App de Redes Sociales",
        description: "Aplicación de redes sociales con funcionalidades de chat, publicaciones y perfiles de usuario.",
        tech: ["React Native", "GraphQL", "AWS", "Socket.io"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "tasks",
        title: "Gestión de Tareas",
        description:
          "Sistema de gestión de tareas con funcionalidades de colaboración, recordatorios y seguimiento de tiempo.",
        tech: ["Vue.js", "Express", "PostgreSQL", "Redis"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "portfolio",
        title: "Generador de Portfolios",
        description: "Herramienta para crear portfolios profesionales personalizables con múltiples temas.",
        tech: ["React", "Tailwind CSS", "Netlify", "Contentful"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "fitness",
        title: "Fitness Tracker",
        description: "Aplicación para seguimiento de actividad física, nutrición y progreso personal.",
        tech: ["Flutter", "Firebase", "TensorFlow", "Google Fit API"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    en: [
      {
        id: "ecommerce",
        title: "E-commerce Platform",
        description: "Complete e-commerce platform with shopping cart, payments, and admin panel.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "dashboard",
        title: "Dashboard Analytics",
        description: "Interactive dashboard for data visualization with customizable charts and real-time reports.",
        tech: ["Next.js", "TypeScript", "D3.js", "Firebase"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "social",
        title: "Social Media App",
        description: "Social media application with chat functionality, posts, and user profiles.",
        tech: ["React Native", "GraphQL", "AWS", "Socket.io"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "tasks",
        title: "Task Management",
        description: "Task management system with collaboration features, reminders, and time tracking.",
        tech: ["Vue.js", "Express", "PostgreSQL", "Redis"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "portfolio",
        title: "Portfolio Generator",
        description: "Tool to create customizable professional portfolios with multiple themes.",
        tech: ["React", "Tailwind CSS", "Netlify", "Contentful"],
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "fitness",
        title: "Fitness Tracker",
        description: "Application for tracking physical activity, nutrition, and personal progress.",
        tech: ["Flutter", "Firebase", "TensorFlow", "Google Fit API"],
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
  }
  
  export const getProjects = (lang) => {
    return projects[lang] || projects.es
  }
  