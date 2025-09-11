"use client";
import React, { useState, useEffect } from "react";
import { PiHourglassHighFill } from "react-icons/pi";
import { GiCelebrationFire } from "react-icons/gi";

// Sample questions array (more than 3)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which language is used for React?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript",
  },
  {
    question: "Who developed React?",
    options: ["Google", "Facebook", "Microsoft", "Twitter"],
    answer: "Facebook",
  },
  {
    question: "Which hook is used for state management in React?",
    options: ["useFetch", "useState", "useClass", "useStorage"],
    answer: "useState",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "Java Standard X"],
    answer: "JavaScript XML",
  },
];

export default function QuizApp() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Total 60 seconds for the whole quiz

  useEffect(() => {
    if (showScore) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showScore]);

  const handleOptionClick = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQ] = option;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    answers.forEach((ans, index) => {
      if (ans === questions[index].answer) newScore++;
    });
    setScore(newScore);
    setShowScore(true);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers(Array(questions.length).fill(null));
    setScore(0);
    setShowScore(false);
    setTimeLeft(60);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 text-black">
      <div className="p-8 w-full max-w-3xl text-center bg-white rounded-3xl shadow-2xl">
        {showScore ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex justify-center gap-x-1">
              <GiCelebrationFire className="text-amber-700"/> You scored {score} / {questions.length}
            </h2>
            <button
              onClick={handleRestart}
              className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600 transition"
            >
              Retake Quiz
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              {questions[currentQ].question}
            </h2>
            <div className="grid gap-4">
              {questions[currentQ].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full px-6 py-3 rounded-xl border shadow transition ${
                    answers[currentQ] === option
                      ? "bg-green-200 border-green-600"
                      : "bg-gray-100 border-gray-300 hover:bg-indigo-100 hover:border-green-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-500 text-sm">
                Question {currentQ + 1} of {questions.length}
              </p>
              <p className="text-red-500 font-bold flex flex-row gap-x-1"><PiHourglassHighFill/>{timeLeft}s</p>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentQ === 0}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentQ === questions.length - 1}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
              >
                Next
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600 transition"
            >
              Submit All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}