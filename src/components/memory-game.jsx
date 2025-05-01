"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { RotateCcw, Trophy, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"
import { getTranslations } from "./language-selector-auto"

const techIcons = [
  { name: "html", icon: "🌐", color: "bg-orange-500" },
  { name: "css", icon: "🎨", color: "bg-blue-500" },
  { name: "js", icon: "📜", color: "bg-yellow-500" },
  { name: "react", icon: "⚛️", color: "bg-cyan-500" },
  { name: "node", icon: "🟢", color: "bg-green-500" },
  { name: "database", icon: "🗄️", color: "bg-indigo-500" },
  { name: "cloud", icon: "☁️", color: "bg-sky-500" },
  { name: "mobile", icon: "📱", color: "bg-purple-500" },
  { name: "security", icon: "🔒", color: "bg-red-500" },
  { name: "ai", icon: "🤖", color: "bg-emerald-500" },
  { name: "git", icon: "🔄", color: "bg-orange-700" },
  { name: "terminal", icon: "💻", color: "bg-gray-700" },
]

export function MemoryGame() {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [difficulty, setDifficulty] = useState("medium")
  const [time, setTime] = useState(0)
  const [bestScore, setBestScore] = useState(null)
  const [language, setLanguage] = useState("es")
  const [t, setT] = useState({})

  const timerRef = useRef(null)
  const difficultySettings = {
    easy: { pairs: 6, time: 60 },
    medium: { pairs: 8, time: 90 },
    hard: { pairs: 12, time: 120 },
  }

  useEffect(() => {
    const handleLanguageChange = (event) => {
      if (event.detail) {
        const { language, translations } = event.detail
        setLanguage(language)
        setT(translations.memoryGame || {})
      }
    }

    const savedLanguage = localStorage.getItem("language") || "es"
    setLanguage(savedLanguage)

    const translations = getTranslations(savedLanguage)
    setT(translations.memoryGame || {})

    window.addEventListener("languageChange", handleLanguageChange)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  useEffect(() => {
    if (gameStarted) {
      initGame()
      startTimer()
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameStarted, difficulty])

  useEffect(() => {
    if (gameStarted && matchedPairs.length === difficultySettings[difficulty].pairs) {
      endGame()
    }
  }, [matchedPairs, gameStarted, difficulty])

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices

      if (cards[firstIndex].name === cards[secondIndex].name) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].name])
      }

      const timer = setTimeout(() => {
        setFlippedIndices([])
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [flippedIndices, cards, matchedPairs])

  const initGame = () => {
    const numPairs = difficultySettings[difficulty].pairs
    const selectedIcons = [...techIcons].sort(() => 0.5 - Math.random()).slice(0, numPairs)

    const cardPairs = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
      ...icon,
      id: index,
    }))

    const shuffledCards = cardPairs.sort(() => 0.5 - Math.random())

    setCards(shuffledCards)
    setFlippedIndices([])
    setMatchedPairs([])
    setMoves(0)
    setTime(0)
    setGameCompleted(false)
  }

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime >= difficultySettings[difficulty].time - 1) {
          clearInterval(timerRef.current)
          if (!gameCompleted) {
            endGame(true)
          }
          return difficultySettings[difficulty].time
        }
        return prevTime + 1
      })
    }, 1000)
  }

  const endGame = (timeout = false) => {
    clearInterval(timerRef.current)
    setGameCompleted(true)

    const timeBonus = difficultySettings[difficulty].time - time
    const movesScore = difficultySettings[difficulty].pairs * 10 - (moves - difficultySettings[difficulty].pairs)
    const score = timeout ? 0 : Math.max(0, movesScore + timeBonus)

    const currentBest = localStorage.getItem(`memoryBest_${difficulty}`)
    if (!currentBest || score > Number.parseInt(currentBest)) {
      localStorage.setItem(`memoryBest_${difficulty}`, score.toString())
      setBestScore(score)
    } else {
      setBestScore(Number.parseInt(currentBest))
    }
  }

  const handleCardClick = (index) => {
    if (
      flippedIndices.includes(index) ||
      flippedIndices.length === 2 ||
      matchedPairs.includes(cards[index].name) ||
      gameCompleted
    ) {
      return
    }

    setFlippedIndices([...flippedIndices, index])

    if (flippedIndices.length === 1) {
      setMoves(moves + 1)
    }
  }

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty)
    setGameStarted(true)

    const currentBest = localStorage.getItem(`memoryBest_${selectedDifficulty}`)
    setBestScore(currentBest ? Number.parseInt(currentBest) : null)
  }

  const restartGame = () => {
    setGameStarted(false)
    setGameCompleted(false)
    setTimeout(() => {
      startGame(difficulty)
    }, 300)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!gameStarted) {
    return (
      <div className="w-full h-[400px] relative rounded-lg overflow-hidden border bg-card flex flex-col items-center justify-center p-6">
        <h3 className="text-2xl font-bold mb-6">{t.title || "Juego de Memoria"}</h3>
        <p className="text-center mb-8 max-w-md">
          {t.description ||
            "Encuentra todas las parejas de cartas antes de que se acabe el tiempo. ¡Pon a prueba tu memoria!"}
        </p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <h4 className="text-center font-medium">{t.selectDifficulty || "Selecciona la dificultad:"}</h4>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="flex-1 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 transition-colors"
              onClick={() => startGame("easy")}
            >
              {t.easy || "Fácil"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
              onClick={() => startGame("medium")}
            >
              {t.medium || "Medio"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors"
              onClick={() => startGame("hard")}
            >
              {t.hard || "Difícil"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] relative rounded-lg overflow-hidden border bg-card">
      {/* Tablero de juego */}
      <div className="absolute inset-0 p-4 flex flex-col">
        {/* Barra de estado */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>{formatTime(difficultySettings[difficulty].time - time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4" />
            <span>
              {t.moves || "Movimientos"}: {moves}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={restartGame}>
            <RotateCcw className="h-4 w-4 mr-1" />
            {t.restart || "Reiniciar"}
          </Button>
        </div>

        {/* Tablero de cartas */}
        <div className="flex-1 grid grid-cols-4 md:grid-cols-6 gap-2 overflow-y-auto p-1">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`aspect-square relative cursor-pointer transition-transform duration-300 ${
                flippedIndices.includes(index) || matchedPairs.includes(card.name) ? "rotate-y-180" : ""
              } ${matchedPairs.includes(card.name) ? "scale-105" : ""}`}
              onClick={() => handleCardClick(index)}
              style={{ perspective: "1000px" }}
            >
              <div
                className={`absolute inset-0 rounded-md border-2 ${
                  matchedPairs.includes(card.name) ? "border-green-500 dark:border-green-400" : "border-primary/20"
                } bg-card flex items-center justify-center ${
                  flippedIndices.includes(index) || matchedPairs.includes(card.name) ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
              >
                <span className="text-2xl">❓</span>
              </div>
              <div
                className={`absolute inset-0 rounded-md ${card.color} flex items-center justify-center ${
                  flippedIndices.includes(index) || matchedPairs.includes(card.name) ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300`}
              >
                <span className="text-3xl">{card.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pantalla de fin de juego */}
      {gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-lg p-6 max-w-md w-full text-center shadow-xl"
          >
            {matchedPairs.length === difficultySettings[difficulty].pairs ? (
              <>
                <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-2xl font-bold mb-2">{t.congratulations || "¡Felicidades!"}</h3>
                <p className="mb-4">
                  {t.completedIn || "Has completado el juego en"} {formatTime(time)} {t.with || "con"} {moves}{" "}
                  {t.moves?.toLowerCase() || "movimientos"}.
                </p>
              </>
            ) : (
              <>
                <Clock className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-2xl font-bold mb-2">{t.timeUp || "¡Tiempo agotado!"}</h3>
                <p className="mb-4">
                  {t.foundPairs || "Has encontrado"} {matchedPairs.length} {t.of || "de"}{" "}
                  {difficultySettings[difficulty].pairs} {t.pairs || "parejas"}.
                </p>
              </>
            )}

            {bestScore !== null && (
              <div className="mb-4 p-2 bg-primary/10 rounded-md">
                <p className="font-medium">
                  {t.bestScore || "Mejor puntuación"}: {bestScore}
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <Button onClick={restartGame}>{t.playAgain || "Jugar de nuevo"}</Button>
              <Button variant="outline" onClick={() => setGameStarted(false)}>
                {t.changeDifficulty || "Cambiar dificultad"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
