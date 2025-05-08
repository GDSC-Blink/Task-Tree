"use client"
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {db} from "../../../lib/firebase";

export default function DeckPage() {
  const router = useRouter();
  const { id } = useParams();
  const [deck, setDeck] = useState<{ id: string; name: string; cards: {front:string; back: string}[] } | null>(null);
  const [newCard, setNewCard] = useState<string>("");
  const [frontCard, setFrontCard] = useState<string>("");
  const [backCard, setBackCard] = useState<string>("");


  useEffect(() => {
    const fetchDeck = async () => {
      if (!id) return;
      const ref = doc(db, "decks", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setDeck({ id: snap.id, name: data.name, cards: data.cards || [] });
      } else {
        setDeck(null);
      }
    };
    fetchDeck();
  }, [id]);
  
  const addCard = async () => {
    if (!deck || !frontCard.trim() || !backCard.trim()) return;
  
    const ref = doc(db, "decks", deck.id);
    const newCard = { front: frontCard, back: backCard };
  
    await updateDoc(ref, {
      cards: arrayUnion(newCard),
    });
  
    setDeck({ ...deck, cards: [...deck.cards, newCard] });
    setFrontCard("");
    setBackCard("");
  };
  
  const deleteCard = async (cardIndex: number) => {
    if (!deck) return;
    const cardToDelete = deck.cards[cardIndex];
    const ref = doc(db, "decks", deck.id);
  
    await updateDoc(ref, {
      cards: deck.cards.filter((_, i) => i !== cardIndex), // Firestore requires full replacement for arrays if not using arrayRemove with full object match
    });
  
    setDeck({ ...deck, cards: deck.cards.filter((_, i) => i !== cardIndex) });
  };

  // handle enter key submission for fields
  const handleEnter = (e: any) =>{
    if(e.key === "Enter"){
      const bothPopulated = frontCard.trim() !== "" && backCard.trim() !== "";
      if(bothPopulated){
        addCard()

      }
    }
  }
  // deck not found in local storage print error
  if (!deck) return <div>Deck not found</div>;

  return (
    <div className="flex flex-col items-center p-4">
      {/* Name of deck */}
      <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
      {/* Input bars for front and back */}
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter Front of Card"
          value={frontCard}
          onKeyDown={handleEnter}
          onChange={(e) => setFrontCard(e.target.value)}
        />
        
        <input type="text" onKeyDown={handleEnter}className="border p-2 rounded" placeholder = "Enter Back of Card" value={backCard} onChange={(e) => setBackCard(e.target.value)}>
        </input>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addCard}>
          Add Card
        </button>
      </div>
        {/* Displaying the cards */}
        <div className="w-full max-w-md h-[400px] overflow-y-auto mb-4"> {/* Fixed height with scroll */}
      <div className="w-full max-w-md">
        {deck.cards.map((card, index) => (
          <div
          key={index}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"

          
        >

        <div className="flex flex-col flex-1">
            <div className="font-medium">{card.front}</div>
            <div className="text-gray-600 text-sm">{card.back}</div>
          </div>
          <button
            onClick={() => deleteCard(index)}
            className="text-red-500 hover:text-red-700 ml-4"
          >
            Delete
          </button>
          </div>
        ))}
      </div>
      </div>
      {/* study button */} 
      <button 
        className="bg-green-500 text-white px-4 py-2 mt-4 rounded" 
        onClick={() => router.push(`/study/${deck.id}`)} 
      >
        Study Mode
      </button> 
      {/* back button */}
      
      <button className="bg-black text-white px-2 py-2 mt-2 rounded" onClick ={()=>router.push('/flashcard')}>Back</button> 
    </div>
  );
}
