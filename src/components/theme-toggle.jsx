"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    console.log("Tema actual:", resolvedTheme)
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    console.log("Cambiando a tema:", newTheme)
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="h-9 w-9 px-0">
        <span className="sr-only">Cambiar tema</span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-9 w-9 px-0 hover:bg-primary/10 transition-all hover:scale-110 border-primary/20 hover:border-primary/50"
      onClick={toggleTheme}
      title={resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">{resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}</span>
    </Button>
  )
}
