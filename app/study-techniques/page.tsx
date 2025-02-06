import Link from "next/link";

export default function StudyTechniques() {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Study Techniques</h1>
        <p>Explore various study techniques to boost your productivity.</p>
        <h2><Link href="/flashcard">FlashCard Stuff</Link></h2>
      </div>
      
    )
  }
  
  