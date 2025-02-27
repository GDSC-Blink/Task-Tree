"use client"
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StudyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [deck, setDeck] = useState<{ id: number; name: string; cards: string[] } | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    const foundDeck = storedDecks.find((d: { id: number }) => d.id.toString() === id); // retrieving deck with respective id stored in local storage
    setDeck(foundDeck);
  }, [id]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % (deck?.cards.length || 1)); 
  };
  const prevCard = () => {
    setCurrentIndex((prev) => prev === 0 ? (deck?.cards.length || 1) - 1 : prev - 1); 
  };

  if (!deck) return <div>Deck not found</div>;

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Study {deck.name}</h1>
      <div className="w-full max-w-2xl h-64 border rounded-xl mb-6 bg-white shadow-lg overflow-y-auto flex items-center justify-center">
        <div className="text-2xl break-words p-6 max-h-full overflow-y-auto">
          {deck.cards.length > 0 ? deck.cards[currentIndex] : "No cards available"}
        </div>
      </div>
      {deck.cards.length > 0 && ( // short circuit evalation, only renders this if condition is true
        <div className="flex gap-4">
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-red-600 transition" onClick={prevCard}>
          Back Card

        </button>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition"
          onClick={nextCard}
        >
          Next Card
        </button>
        </div>
      )}
      <button
        className="bg-green-500 text-white px-6 py-3 mt-6 rounded-lg text-xl hover:bg-green-600 transition"
        onClick={() => router.back()}
      >
        Back to Deck
      </button>
    </div>
  );
}
