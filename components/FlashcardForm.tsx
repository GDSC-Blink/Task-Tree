import { useState } from "react";


export default function FlashCardForm(){
    const [deckName, setDeckName] = useState("");
    const [userDeckInput, setUserDeckInput] = useState("");
    let [decks, setDecks] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // prevents page from reloading
        if(userDeckInput.trim() === ""){
            return;
        } // prevent 
        setDecks((prevDecks) => [...prevDecks, userDeckInput]);

        setUserDeckInput(''); // clears input field after submitting
        
    };
    

    

    return(

        <>
        <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex gap-2 pt-8">

            <input type="text" placeholder="Enter Deck Name" value={userDeckInput} onChange={(e) => setUserDeckInput(e.target.value)}
            className="border p-2 rounded"/> 
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
        </div>

        <div className="flex justify-center">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl justify-center">
                {decks.map((deck, index) => (
                    <div key={index} className="p-4 border rounded bg-gray-100 shadow text-center">
                        📁 {deck}
                    </div>
                    ))}
            </div>
            </div>
            

        
        
    
        </>
        
    )
}