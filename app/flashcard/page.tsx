"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {db} from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

type Deck = {
  id: string;
  name: string;
  cards: string[];
};

export default function Home() {
  const [deckName, setDeckName] = useState<string>("");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDecks = async () => {
      if (!userId) return;
      const querySnapshot = await getDocs(collection(db, "users", userId, "decks"));
      const deckList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Deck[];
      setDecks(deckList);
    };
    fetchDecks();
  }, [userId]);

  const createDeck = async () => {
    if (!deckName.trim() || !userId) return;
    const newDeck = { name: deckName, cards: [] };
    try {
      const docRef = await addDoc(collection(db, "users", userId, "decks"), newDeck);
      setDecks([...decks, { ...newDeck, id: docRef.id }]);
      setDeckName("");
    } catch (error) {
      console.error("Error adding deck: ", error);
    }
  };

  const deleteDeck = async (deckId: string) => {
    if (!userId) return;
    const confirm = window.confirm("Are you sure you want to delete this deck?");
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "users", userId, "decks", deckId));
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
    } catch (error) {
      console.error("Error deleting deck: ", error);
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createDeck();
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
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={createDeck}
        >
          Create Deck
        </button>
      </div>
      <div className="w-full max-w-md h-[400px] overflow-y-auto mb-4">
        <div className="w-full max-w-md">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="p-3 border rounded mb-2 flex justify-between items-center hover:bg-gray-100"
            >
              <div
                onClick={() => router.push(`/deck/${deck.id}`)}
                className="cursor-pointer flex-1"
              >
                {deck.name}
              </div>
              <button
                onClick={() => deleteDeck(deck.id)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
