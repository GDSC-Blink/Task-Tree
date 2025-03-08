import Link from "next/link";
import Widget from "@/components/widget";

export default function StudyTechniques() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-8">
        <h1 className="text-2xl font-bold mb-4">Study Techniques</h1>
        <p>Explore various study techniques to boost your productivity.</p>
      </header>
      {/* Content area */}
      <div className="flex-grow p-8">
        {/* Two horizontal stacks */}
        <div className="flex flex-row space-x-8">
          {/* Left column: first three study techniques */}
          <div className="flex flex-col space-y-4">
            <Link href="/active_recall">
              <Widget title="Active Recall">
                <p>Active Recall</p>
              </Widget>
            </Link>
            <Link href="/flashcard">
              <Widget title="FlashCard">
                <p>Flashcards</p>
              </Widget>
            </Link>
            <Link href="/spaced-repetition">
              <Widget title="Spaced Repetition">
                <p>Spaced Repetition</p>
              </Widget>
            </Link>
          </div>
          {/* Right column: last two study techniques */}
          <div className="flex flex-col space-y-4">
            <Link href="/pomodoro">
              <Widget title="Pomodoro">
                <p>Pomodoro</p>
              </Widget>
            </Link>
            <Link href="/active_recall">
              <Widget title="Active Recall">
                <p>Active Recall</p>
              </Widget>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}