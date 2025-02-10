"use client";

import { useState, FormEvent } from "react";
export default function ActiveRecall() {

  const [question, setQuestion] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);

  const addQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (question.trim() !== "") {
      setQuestions([...questions, question]);
      setQuestion("");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4">Active Recall</h1>
      <div>
        <p className="text-2xl">
          Welcome to active recall!
        </p>
        <p className="text-2xl">
          In this study method, you actively retrieve information from your memory by testing yourself though techniques like creating questions, using flashcards, or summarizing key points.
        </p>
        <p className="text-2xl">
          Main point of this exercise is forcing your brain to pull out information rather than passively reading it, leading to better long-term retention.
        </p>
      </div>
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
        <ul className="mt-4 list-disc list-inside text-2xl">
          {questions.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}