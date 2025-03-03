"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function StudyPage() {
  const { id } = useParams()
  const router = useRouter()
  const [deck, setDeck] = useState<{ id: number; name: string; cards: { front: string; back: string }[] } | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]")
    const foundDeck = storedDecks.find((d: { id: number }) => d.id.toString() === id)
    setDeck(foundDeck)
  }, [id])

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % (deck?.cards.length || 1))
    setIsFlipped(false) // Reset to front side when moving to next card
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? (deck?.cards.length || 1) - 1 : prev - 1))
    setIsFlipped(false) // Reset to front side when moving to previous card
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  if (!deck) return <div className="flex justify-center items-center h-screen">Deck not found</div>
  if (deck.cards.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Study {deck.name}</h1>
        <div className="text-xl mb-6">No cards available in this deck</div>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
          onClick={() => router.back()}
        >
          Back to Deck
        </button>
      </div>
    )

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Study {deck.name}</h1>

      {/* Card counter */}
      <div className="text-lg mb-2">
        Card {currentIndex + 1} of {deck.cards.length}
      </div>

      {/* Flashcard */}
      <div
        className="w-full max-w-2xl h-64 border rounded-xl mb-6 bg-white shadow-lg flex items-center justify-center cursor-pointer"
        onClick={flipCard}
      >
        <div className="text-2xl break-words p-6 max-h-full overflow-y-auto w-full h-full flex items-center justify-center">
          {isFlipped ? deck.cards[currentIndex].back : deck.cards[currentIndex].front}
        </div>
      </div>

      <div className="text-sm mb-4 text-gray-500">Click on the card to flip it</div>

      <div className="flex gap-4">
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-red-600 transition"
          onClick={prevCard}
        >
          Previous Card
        </button>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
          onClick={nextCard}
        >
          Next Card
        </button>
      </div>

      <button
        className="bg-black text-white px-6 py-3 mt-6 rounded-lg text-xl hover:bg-gray-800 transition"
        onClick={() => router.back()}
      >
        Back to Deck
      </button>
    </div>
  )
}

