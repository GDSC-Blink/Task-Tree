"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {db} from "../../../lib/firebase";
import { getAuth } from "firebase/auth";

export default function StudyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [deck, setDeck] = useState<{ id: string; name: string; cards: { front: string; back: string }[] } | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!id || !userId) return;
      const ref = doc(db, "users", userId, "decks", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDeck({ id: snap.id, name: data.name, cards: data.cards || [] });
      } else {
        setDeck(null);
      }
    };
    fetchDeck();
  }, [id, userId]);

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextCard();        // Right arrow = next card
      if (e.key === "ArrowLeft") prevCard();         // Left arrow = previous card
      if (e.key === "ArrowUp" || e.key === "ArrowDown") flipCard();  // Up/Down = flip
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },  [deck, currentIndex]);


  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % (deck?.cards.length || 1));
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev === 0 ? (deck?.cards.length || 1) - 1 : prev - 1));
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (!deck) return <div className="flex justify-center items-center h-screen">Deck not found</div>;

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
    );

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Study {deck.name}</h1>

      <div className="text-lg mb-2">Card {currentIndex + 1} of {deck.cards.length}</div>

      <div
        className="w-full max-w-2xl h-64 border rounded-xl mb-6 bg-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-200"
        onClick={flipCard}
      >
        <div className="text-2xl break-words p-6 max-h-full overflow-y-auto w-full h-full flex items-center justify-center">
          {isFlipped ? deck.cards[currentIndex].back : deck.cards[currentIndex].front}
        </div>
      </div>

      <div className="text-sm mb-4 text-gray-500">Click on the card to flip it</div>

      <div className="flex gap-4">
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-red-600 transition" onClick={prevCard}>Previous Card</button>
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition" onClick={nextCard}>Next Card</button>
      </div>

      <button className="bg-black text-white px-6 py-3 mt-6 rounded-lg text-xl hover:bg-gray-800 transition" onClick={() => router.back()}>
        Back to Deck
      </button>
    </div>
  );
}
