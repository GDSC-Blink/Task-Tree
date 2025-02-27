"use client"
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DeckPage() {
  const router = useRouter();
  const { id } = useParams();
  const [deck, setDeck] = useState<{ id: number; name: string; cards: string[] } | null>(null);
  const [newCard, setNewCard] = useState<string>("");

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    const foundDeck = storedDecks.find((d: { id: number }) => d.id.toString() === id);  // retrieve decks from lcoal storage and matches the URL ID
    setDeck(foundDeck);
  }, [id]); // runs when id changes or we go on new deck

  const addCard = () => {
    if (!newCard.trim() || !deck) return; //prevent empty card or null deck

    const updatedDecks = JSON.parse(localStorage.getItem("decks") || "[]").map((d: any) => // finds matching deck and append new cards to its cards parameter
      d.id === deck.id ? { ...d, cards: [...d.cards, newCard] } : d // ...d coppies all properties of decks and then creates then cards array w/ new card added
    );

    localStorage.setItem("decks", JSON.stringify(updatedDecks));
    setDeck((prevDeck) => prevDeck && { ...prevDeck, cards: [...prevDeck.cards, newCard] });
    setNewCard("");
  };

  if (!deck) return <div>Deck not found</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="New Card"
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addCard}>
          Add Card
        </button>
      </div>
      <div className="w-full max-w-md">
        {deck.cards.map((card, index) => (
          <div key={index} className="p-3 border rounded mb-2">
            {card}
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        onClick={() => router.push(`/study/${deck.id}`)}
      >
        Study Mode
      </button>
    </div>
  );
}
