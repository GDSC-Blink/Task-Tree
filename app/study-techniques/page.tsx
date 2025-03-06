import Link from "next/link";
import Widget from "@/components/widget";

export default function StudyTechniques() {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-8">
          <h1 className="text-2xl font-bold mb-4">Study Techniques</h1>
          <p>
            Explore various study techniques to boost your productivity.
          </p>
        </header>
        {/* This container fills the remaining space below the header */}
        <div className="relative flex-grow">
          {/* Top-left widget */}
          <div className="absolute top-5 left-5">
            <Link href="/active_recall">
              <Widget title="Active Recall">
                <p>Active Recall</p>
              </Widget>
            </Link>
          </div>
          {/* Top-right widget */}
          <div className="absolute top-5 right-5">
            <Link href="/flashcard">
              <Widget title="FlashCard">
                <p>Flashcards</p>
              </Widget>
            </Link>
          </div>
          {/* Bottom-left widget */}
          <div className="absolute bottom-5 left-5">
            <Link href="/spaced-repetition">
              <Widget title="Spaced Repetition">
                <p>Spaced Repetition</p>
              </Widget>
            </Link>
          </div>
          {/* Bottom-right widget */}
          <div className="absolute bottom-5 right-5">
            <Link href="/active_recall">
              <Widget title="Active Recall">
                <p>Active Recall</p>
              </Widget>
            </Link>
          </div>
        </div>
      </div>
      
    )
  }
  
  