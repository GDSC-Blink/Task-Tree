"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {db} from "../../lib/firebase";
import {collection, addDoc, getDocs} from "firebase/firestore"
type Deck = {
  id: number;
  name: string;
  cards: string[];
};

export default function Home() {
  const [deckName, setDeckName] = useState<string>("");
  const [decks, setDecks] = useState<Deck[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    setDecks(storedDecks);
  }, []);

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

 

  const createDeck = () => {
    if (!deckName.trim()) return;
    const newDeck: Deck = { id: Date.now(), name: deckName, cards: [] };
    setDecks([...decks, newDeck]);
    setDeckName("");
  };
  const handleKeyPress = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      createDeck(); // Trigger createDeck on Enter key press
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Flashcard Deck</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          onKeyDown ={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={createDeck}
        >
          Create Deck
        </button>
      </div>
      <div className="w-full max-w-md h-[400px] overflow-y-auto mb-4"> {/* Fixed height with scroll */}

      <div className="w-full max-w-md">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/deck/${deck.id}`)}
          >
            {deck.name}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
