"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { getTranslations } from "../context/lenguage-context"

export function LanguageSelector() {
  const [language, setLanguage] = useState("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
      window.dispatchEvent(new Event("languageChange"))
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    window.dispatchEvent(new Event("languageChange"))
    window.location.reload()
  }

  if (!mounted) return null

  const t = getTranslations(language)

  return (
    <Button variant="ghost" onClick={toggleLanguage} className="px-2 font-medium">
      {language === "es" ? "EN" : "ES"}
    </Button>
  )
}
