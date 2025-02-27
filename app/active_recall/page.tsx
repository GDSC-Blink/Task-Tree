"use client";

import { useState, FormEvent } from "react";

interface QuestionItem {
  question: string;
  answer: string;
  showAnswer: boolean;
}

export default function ActiveRecall() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [showAnswerPopup, setShowAnswerPopup] = useState<boolean>(false);

  const addQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (question.trim() !== "") {
      setShowAnswerPopup(true); // Show popup when question is submitted
    }
  };

  const submitAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (answer.trim() !== "") {
      setQuestions([
        ...questions,
        { question, answer, showAnswer: false }
      ]);
      setQuestion("");
      setAnswer("");
      setShowAnswerPopup(false);
    }
  };

  const toggleQuestionAnswer = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].showAnswer = !newQuestions[index].showAnswer;
    setQuestions(newQuestions);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4">Active Recall</h1>
      <div>
        <p className="text-2xl">Welcome to active recall!</p>
        <p className="text-2xl">
          In this study method, you actively retrieve information from your memory by testing yourself though techniques like creating questions, using flashcards, or summarizing key points.        </p>
        <p className="text-2xl">
          Main point of this exercise is forcing your brain to pull out information rather than passively reading it, leading to better long-term retention.
        </p>
      </div>

      {/* Question Input Form */}
      <div>
        <form onSubmit={addQuestion} className="mt-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here..."
            className="border border-gray-300 p-2 rounded-lg w-96"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          >
            Add
          </button>
        </form>
      </div>

      {/* Answer Popup */}
      {showAnswerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Enter the answer for: {question}</h2>
            <form onSubmit={submitAnswer}>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer here..."
                className="border border-gray-300 p-2 rounded-lg w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowAnswerPopup(false)}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question/Answer Boxes */}
      <div className="mt-4 grid grid-cols-1 gap-4 w-full max-w-2xl">
        {questions.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleQuestionAnswer(index)}
            className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <p className="text-xl">
              {item.showAnswer ? "Answer: "+item.answer : "Question: "+item.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}