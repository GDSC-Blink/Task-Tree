"use client"
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {db} from "../../../lib/firebase";
import { getAuth } from "firebase/auth";


export default function DeckPage() {
  const router = useRouter();
  const { id } = useParams();
  const [deck, setDeck] = useState<{ id: string; name: string; cards: { front: string; back: string }[] } | null>(null);
  const [frontCard, setFrontCard] = useState<string>("");
  const [backCard, setBackCard] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


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
      setLoading(true);
      const ref = doc(db, "users", userId, "decks", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDeck({ id: snap.id, name: data.name, cards: data.cards || [] });
      } else {
        setDeck(null);
      }
      setLoading(false);
    };
    fetchDeck();
  }, [id, userId]);

  const addCard = async () => {
    if (!deck || !frontCard.trim() || !backCard.trim() || !userId) return;
    const ref = doc(db, "users", userId, "decks", deck.id);
    const newCard = { front: frontCard, back: backCard };
    await updateDoc(ref, { cards: [...deck.cards, newCard] });
    setDeck({ ...deck, cards: [...deck.cards, newCard] });
    setFrontCard("");
    setBackCard("");
  };

  const deleteCard = async (cardIndex: number) => {
    if (!deck || !userId) return;
    const ref = doc(db, "users", userId, "decks", deck.id);
    const updatedCards = deck.cards.filter((_, i) => i !== cardIndex);
    await updateDoc(ref, { cards: updatedCards });
    setDeck({ ...deck, cards: updatedCards });
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter" && frontCard.trim() && backCard.trim()) {
      addCard();
    }
  };
if (loading) return <div>Loading...</div>;

  if (!deck) return <div>Deck not found</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter Front of Card"
          value={frontCard}
          onKeyDown={handleEnter}
          onChange={(e) => setFrontCard(e.target.value)}
        />
        <input
          type="text"
          onKeyDown={handleEnter}
          className="border p-2 rounded"
          placeholder="Enter Back of Card"
          value={backCard}
          onChange={(e) => setBackCard(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addCard}>Add Card</button>
      </div>
      <div className="w-full max-w-md h-[400px] overflow-y-auto mb-4">
        <div className="w-full max-w-md">
          {deck.cards.map((card, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col flex-1">
                <div className="font-medium">{card.front}</div>
                <div className="text-gray-600 text-sm">{card.back}</div>
              </div>
              <button onClick={() => deleteCard(index)} className="text-red-500 hover:text-red-700 ml-4">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded" onClick={() => router.push(`/study/${deck.id}`)}>Study Mode</button>
      <button className="bg-black text-white px-2 py-2 mt-2 rounded" onClick={() => router.push('/flashcard')}>Back</button>
    </div>
  );
}