import Link from "next/link";
import StudyWidget from "@/components/studytechwidget";

export default function StudyTechniques() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Header */}
      <header className="bg-green-900 text-white px-8 py-16">
        <h1 className="text-4xl font-bold mb-4">Study Techniques</h1>
        <p className="text-lg">Explore various study techniques to boost your productivity.</p>
      </header>

      {/* Section Header */}
      <section className="px-8 pt-12 pb-6">
        <h2 className="text-2xl font-semibold mb-2">Popular Techniques</h2>
        <p className="text-gray-700 max-w-2xl">
          These evidence-based study methods have proven to significantly improve your learning outcomes.
          Explore each technique to find what works best for your learning style.
        </p>
      </section>

      {/* Study Technique Grid */}
      <section className="px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          

          <Link href="/flashcard">
            <StudyWidget title="Flashcards">
              <p className="text-gray-600 text-sm">
                Reinforce concepts using question-and-answer cards that promote active recall.
              </p>
            </StudyWidget>
          </Link>

          <Link href="/spaced-repetition">
            <StudyWidget title="Spaced Repetition">
              <p className="text-gray-600 text-sm">
                Review material at increasing intervals to strengthen long-term memory.
              </p>
            </StudyWidget>
          </Link>

          <Link href="/pomodoro">
            <StudyWidget title="Pomodoro">
              <p className="text-gray-600 text-sm">
                Focus using timed sessions (25 mins study, 5 mins break) to enhance productivity.
              </p>
            </StudyWidget>
          </Link>

          <Link href="/mind-map">
            <StudyWidget title="Mind Map">
              <p className="text-gray-600 text-sm">
                Use visual diagrams to organize information and discover relationships between ideas.
              </p>
            </StudyWidget>
          </Link>
        </div>
      </section>
    </div>
  );
}
