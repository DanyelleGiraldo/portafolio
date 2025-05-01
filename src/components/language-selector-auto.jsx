"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Check, ChevronDown, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const languages = [
  { code: "es", name: "Español" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
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
        "Creo soluciones digitales elegantes y funcionales. Especializado en desarrollo web moderno con enfoque en rendimiento, accesibilidad y experiencia de usuario.",
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
      downloadCV: "Descargar CV",
    },
    about: {
      title: "Sobre Mí",
      p1: "Soy un desarrollador apasionado con más de 5 años de experiencia creando aplicaciones web y móviles. Mi enfoque se centra en construir productos digitales que combinen funcionalidad con diseño elegante.",
      p2: "Mi trayectoria incluye trabajo en startups y empresas establecidas, donde he liderado equipos y entregado proyectos exitosos que han impactado positivamente a miles de usuarios.",
      p3: "Cuando no estoy programando, disfruto de la fotografía, el senderismo y aprender nuevas tecnologías.",
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
      namePlaceholder: "Tu nombre",
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
  fr: {
    nav: {
      about: "À Propos",
      education: "Éducation",
      skills: "Compétences",
      projects: "Projets",
      game: "Jeu",
      contact: "Contact",
      contactMe: "Contactez-moi",
      downloadCV: "Télécharger CV",
    },
    hero: {
      greeting: "Bonjour, je suis",
      role: "Développeur Full Stack",
      description:
        "Je crée des solutions numériques élégantes et fonctionnelles. Spécialisé dans le développement web moderne avec un accent sur la performance, l'accessibilité et l'expérience utilisateur.",
      viewProjects: "Voir les Projets",
      contactMe: "Contactez-moi",
      downloadCV: "Télécharger CV",
    },
    about: {
      title: "À Propos de Moi",
      p1: "Je suis un développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web et mobiles. Je me concentre sur la construction de produits numériques qui combinent fonctionnalité et design élégant.",
      p2: "Mon parcours comprend du travail dans des startups et des entreprises établies, où j'ai dirigé des équipes et livré des projets réussis qui ont eu un impact positif sur des milliers d'utilisateurs.",
      p3: "Quand je ne code pas, j'aime la photographie, la randonnée et l'apprentissage de nouvelles technologies.",
    },
    education: {
      title: "Éducation et Certifications",
      education: "Éducation",
      certifications: "Certifications",
      present: "Présent",
      download: "Télécharger le certificat",
      viewMore: "Voir plus",
      viewLess: "Voir moins",
      next: "Suivant",
      previous: "Précédent",
    },
    skills: {
      title: "Mes Compétences",
      technical: "Compétences Techniques",
      soft: "Compétences Personnelles",
    },
    projects: {
      title: "Mes Projets",
      code: "Code",
      demo: "Démo",
    },
    memoryGame: {
      title: "Jeu de Mémoire",
      description: "Testez votre mémoire en trouvant toutes les paires de cartes. Défiez votre esprit et amusez-vous!",
      instructions: "Cliquez sur les cartes pour les retourner et trouver les paires correspondantes.",
      selectDifficulty: "Sélectionnez la difficulté:",
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
      moves: "Mouvements",
      restart: "Recommencer",
      congratulations: "Félicitations!",
      timeUp: "Temps écoulé!",
      completedIn: "Vous avez terminé le jeu en",
      with: "avec",
      foundPairs: "Vous avez trouvé",
      of: "sur",
      pairs: "paires",
      bestScore: "Meilleur score",
      playAgain: "Rejouer",
      changeDifficulty: "Changer la difficulté",
    },
    contact: {
      title: "Contactez-moi",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "vous@email.com",
      subjectPlaceholder: "Sujet du message",
      messagePlaceholder: "Votre message...",
      send: "Envoyer le Message",
    },
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  de: {
    nav: {
      about: "Über Mich",
      education: "Bildung",
      skills: "Fähigkeiten",
      projects: "Projekte",
      game: "Spiel",
      contact: "Kontakt",
      contactMe: "Kontaktiere Mich",
      downloadCV: "Lebenslauf herunterladen",
    },
    hero: {
      greeting: "Hallo, ich bin",
      role: "Full-Stack-Entwickler",
      description:
        "Ich erstelle elegante und funktionale digitale Lösungen. Spezialisiert auf moderne Webentwicklung mit Fokus auf Leistung, Zugänglichkeit und Benutzererfahrung.",
      viewProjects: "Projekte Ansehen",
      contactMe: "Kontaktiere Mich",
      downloadCV: "Lebenslauf herunterladen",
    },
    about: {
      title: "Über Mich",
      p1: "Ich bin ein leidenschaftlicher Entwickler mit mehr als 5 Jahren Erfahrung in der Erstellung von Web- und mobilen Anwendungen. Mein Fokus liegt auf dem Aufbau digitaler Produkte, die Funktionalität mit elegantem Design verbinden.",
      p2: "Mein Hintergrund umfasst Arbeit in Startups und etablierten Unternehmen, wo ich Teams geleitet und erfolgreiche Projekte geliefert habe, die Tausende von Benutzern positiv beeinflusst haben.",
      p3: "Wenn ich nicht programmiere, genieße ich Fotografie, Wandern und das Erlernen neuer Technologien.",
    },
    education: {
      title: "Bildung und Zertifizierungen",
      education: "Bildung",
      certifications: "Zertifizierungen",
      present: "Gegenwart",
      download: "Zertifikat herunterladen",
      viewMore: "Mehr anzeigen",
      viewLess: "Weniger anzeigen",
      next: "Weiter",
      previous: "Zurück",
    },
    skills: {
      title: "Meine Fähigkeiten",
      technical: "Technische Fähigkeiten",
      soft: "Soft Skills",
    },
    projects: {
      title: "Meine Projekte",
      code: "Code",
      demo: "Demo",
    },
    memoryGame: {
      title: "Gedächtnisspiel",
      description:
        "Testen Sie Ihr Gedächtnis, indem Sie alle passenden Kartenpaare finden. Fordern Sie Ihren Geist heraus und haben Sie Spaß!",
      instructions: "Klicken Sie auf die Karten, um sie umzudrehen und die passenden Paare zu finden.",
      selectDifficulty: "Schwierigkeitsgrad wählen:",
      easy: "Leicht",
      medium: "Mittel",
      hard: "Schwer",
      moves: "Züge",
      restart: "Neustart",
      congratulations: "Glückwunsch!",
      timeUp: "Zeit abgelaufen!",
      completedIn: "Sie haben das Spiel abgeschlossen in",
      with: "mit",
      foundPairs: "Sie haben gefunden",
      of: "von",
      pairs: "Paaren",
      bestScore: "Beste Punktzahl",
      playAgain: "Nochmal spielen",
      changeDifficulty: "Schwierigkeit ändern",
    },
    contact: {
      title: "Kontaktiere Mich",
      name: "Name",
      email: "Email",
      subject: "Betreff",
      message: "Nachricht",
      namePlaceholder: "Dein Name",
      emailPlaceholder: "du@email.com",
      subjectPlaceholder: "Betreff der Nachricht",
      messagePlaceholder: "Deine Nachricht...",
      send: "Nachricht Senden",
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
    },
  },
  it: {
    nav: {
      about: "Chi Sono",
      education: "Formazione",
      skills: "Competenze",
      projects: "Progetti",
      game: "Gioco",
      contact: "Contatti",
      contactMe: "Contattami",
      downloadCV: "Scarica CV",
    },
    hero: {
      greeting: "Ciao, sono",
      role: "Sviluppatore Full Stack",
      description:
        "Creo soluzioni digitali eleganti e funzionali. Specializzato nello sviluppo web moderno con focus su prestazioni, accessibilità ed esperienza utente.",
      viewProjects: "Vedi Progetti",
      contactMe: "Contattami",
      downloadCV: "Scarica CV",
    },
    about: {
      title: "Chi Sono",
      p1: "Sono uno sviluppatore appassionato con oltre 5 anni di esperienza nella creazione di applicazioni web e mobili. Il mio focus è sulla costruzione di prodotti digitali che combinano funzionalità con design elegante.",
      p2: "Il mio background include lavoro in startup e aziende affermate, dove ho guidato team e consegnato progetti di successo che hanno avuto un impatto positivo su migliaia di utenti.",
      p3: "Quando non programmo, mi piace la fotografia, l'escursionismo e imparare nuove tecnologie.",
    },
    education: {
      title: "Formazione e Certificazioni",
      education: "Formazione",
      certifications: "Certificazioni",
      present: "Presente",
      download: "Scarica certificato",
      viewMore: "Vedi altro",
      viewLess: "Vedi meno",
      next: "Successivo",
      previous: "Precedente",
    },
    skills: {
      title: "Le Mie Competenze",
      technical: "Competenze Tecniche",
      soft: "Competenze Trasversali",
    },
    projects: {
      title: "I Miei Progetti",
      code: "Codice",
      demo: "Demo",
    },
    memoryGame: {
      title: "Gioco di Memoria",
      description: "Metti alla prova la tua memoria trovando tutte le coppie di carte. Sfida la tua mente e divertiti!",
      instructions: "Clicca sulle carte per girarle e trovare le coppie corrispondenti.",
      selectDifficulty: "Seleziona la difficoltà:",
      easy: "Facile",
      medium: "Medio",
      hard: "Difficile",
      moves: "Mosse",
      restart: "Ricomincia",
      congratulations: "Congratulazioni!",
      timeUp: "Tempo scaduto!",
      completedIn: "Hai completato il gioco in",
      with: "con",
      foundPairs: "Hai trovato",
      of: "di",
      pairs: "coppie",
      bestScore: "Miglior punteggio",
      playAgain: "Gioca ancora",
      changeDifficulty: "Cambia difficoltà",
    },
    contact: {
      title: "Contattami",
      name: "Nome",
      email: "Email",
      subject: "Oggetto",
      message: "Messaggio",
      namePlaceholder: "Il tuo nome",
      emailPlaceholder: "tu@email.com",
      subjectPlaceholder: "Oggetto del messaggio",
      messagePlaceholder: "Il tuo messaggio...",
      send: "Invia Messaggio",
    },
    footer: {
      rights: "Tutti i diritti riservati.",
    },
  },
  pt: {
    nav: {
      about: "Sobre Mim",
      education: "Educação",
      skills: "Habilidades",
      projects: "Projetos",
      game: "Jogo",
      contact: "Contato",
      contactMe: "Contate-me",
      downloadCV: "Baixar CV",
    },
    hero: {
      greeting: "Olá, eu sou",
      role: "Desenvolvedor Full Stack",
      description:
        "Eu crio soluções digitais elegantes e funcionais. Especializado em desenvolvimento web moderno com foco em desempenho, acessibilidade e experiência do usuário.",
      viewProjects: "Ver Projetos",
      contactMe: "Contate-me",
      downloadCV: "Baixar CV",
    },
    about: {
      title: "Sobre Mim",
      p1: "Sou um desenvolvedor apaixonado com mais de 5 anos de experiência na criação de aplicações web e móveis. Meu foco está na construção de produtos digitais que combinam funcionalidade com design elegante.",
      p2: "Minha trajetória inclui trabalho em startups e empresas estabelecidas, onde liderei equipes e entreguei projetos bem-sucedidos que impactaram positivamente milhares de usuários.",
      p3: "Quando não estou programando, gosto de fotografia, caminhadas e aprender novas tecnologias.",
    },
    education: {
      title: "Educação e Certificações",
      education: "Educação",
      certifications: "Certificações",
      present: "Presente",
      download: "Baixar certificado",
      viewMore: "Ver mais",
      viewLess: "Ver menos",
      next: "Próximo",
      previous: "Anterior",
    },
    skills: {
      title: "Minhas Habilidades",
      technical: "Habilidades Técnicas",
      soft: "Habilidades Interpessoais",
    },
    projects: {
      title: "Meus Projetos",
      code: "Código",
      demo: "Demo",
    },
    memoryGame: {
      title: "Jogo da Memória",
      description: "Teste sua memória encontrando todos os pares de cartas. Desafie sua mente e divirta-se!",
      instructions: "Clique nas cartas para virá-las e encontrar os pares correspondentes.",
      selectDifficulty: "Selecione a dificuldade:",
      easy: "Fácil",
      medium: "Médio",
      hard: "Difícil",
      moves: "Movimentos",
      restart: "Reiniciar",
      congratulations: "Parabéns!",
      timeUp: "Tempo esgotado!",
      completedIn: "Você completou o jogo em",
      with: "com",
      foundPairs: "Você encontrou",
      of: "de",
      pairs: "pares",
      bestScore: "Melhor pontuação",
      playAgain: "Jogar novamente",
      changeDifficulty: "Mudar dificuldade",
    },
    contact: {
      title: "Contate-me",
      name: "Nome",
      email: "Email",
      subject: "Assunto",
      message: "Mensagem",
      namePlaceholder: "Seu nome",
      emailPlaceholder: "voce@email.com",
      subjectPlaceholder: "Assunto da mensagem",
      messagePlaceholder: "Sua mensagem...",
      send: "Enviar Mensagem",
    },
    footer: {
      rights: "Todos os direitos reservados.",
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
