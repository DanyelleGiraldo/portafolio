"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

export function CertificationCarousel({ certifications, translations }) {
  const [expanded, setExpanded] = useState(false)

  // Altura fija para el carrusel
  const carouselHeight = expanded ? "auto" : "400px"

  return (
    <div className="relative">
      <div
        className="overflow-y-auto transition-all duration-300 border border-border/50 hover:border-primary/30 rounded-lg bg-card shadow-sm hover:shadow-md"
        style={{ height: carouselHeight, maxHeight: "400px" }}
      >
        <div className="p-4">
          <div className="space-y-6">
            {certifications.map((certification, index) => (
              <motion.div
                key={certification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex gap-4 p-5 border border-border/50 rounded-lg hover:border-primary/50 hover:shadow-md transition-all bg-gradient-to-br from-card to-card/80`}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <img
                    src={certification.image || "/placeholder.svg"}
                    alt={certification.institution}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">{certification.title}</h4>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {certification.date}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{certification.institution}</div>
                  <p className="text-sm mb-4">{certification.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary/10 transition-all border-primary/20 hover:border-primary/50 shadow-sm hover:shadow"
                    asChild
                  >
                    <a href={certification.downloadUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      {translations.download || "Descargar certificado"}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-muted-foreground">
        {translations.scrollToView || "Desplázate para ver más certificaciones"}
      </div>
    </div>
  )
}
