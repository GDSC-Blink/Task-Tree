"use client"
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function DeckPage() {
  const router = useRouter();
  const { id } = useParams();
  const [deck, setDeck] = useState<{ id: number; name: string; cards: {front:string; back: string}[] } | null>(null);
  const [newCard, setNewCard] = useState<string>("");
  const [frontCard, setFrontCard] = useState<string>("");
  const [backCard, setBackCard] = useState<string>("");


  useEffect(() => {
    const storedDecks = JSON.parse(localStorage.getItem("decks") || "[]");
    const foundDeck = storedDecks.find((d: { id: number }) => d.id.toString() === id);  // retrieve decks from lcoal storage and matches the URL ID
    setDeck(foundDeck);
  }, [id]); // runs when id changes or we go on new deck

  const addCard = () => {
    if (!frontCard.trim() || !backCard.trim()|| !deck) return; //prevent empty card or null deck

    const updatedDecks = JSON.parse(localStorage.getItem("decks") || "[]").map((d: any) => // finds matching deck and append new cards to its cards parameter
      d.id === deck.id ? { ...d, cards: [...d.cards, {front: frontCard, back:backCard}] } : d // ...d coppies all properties of decks and then creates then cards array w/ new card added
    );

    localStorage.setItem("decks", JSON.stringify(updatedDecks));
    setDeck((prevDeck) => prevDeck && { ...prevDeck, cards: [...prevDeck.cards, {front:frontCard, back: backCard}] });
    setFrontCard("");
    setBackCard("");
  };

  //Delete card
  const deleteCard = (cardIndex: number) => {
    if (!deck) return;

    const updatedDecks = JSON.parse(localStorage.getItem("decks") || "[]").map((d: any) =>
      d.id === deck.id ? { ...d, cards: d.cards.filter((_: any, i: number) => i !== cardIndex) } : d
    );

    localStorage.setItem("decks", JSON.stringify(updatedDecks));
    setDeck((prevDeck) => prevDeck && { ...prevDeck, cards: prevDeck.cards.filter((_, i) => i !== cardIndex) });
  };


  // handle enter key submission for fields
  const handleEnter = (e: any) =>{
    if(e.key === "Enter"){
      const bothPopulated = frontCard.trim() !== "" && backCard.trim() !== "";
      if(bothPopulated){
        setDeck((prevDeck) => prevDeck && { ...prevDeck, cards: [...prevDeck.cards, {front:frontCard, back: backCard}] });
        setFrontCard("");
        setBackCard("");

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
