"use client";
import React, { use, useState } from "react";


export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return; // Prevent overwrite or play after win
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function renderSquare(index) {
    const isWinningSquare = winner && winner.line.includes(index);
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-24 h-24 text-3xl font-extrabold border-2 rounded-xl transition-all duration-300 flex items-center justify-center 
          ${isWinningSquare ? "text-green-600 scale-110" : "text-gray-800"}`}
        style={{
          background: isWinningSquare
            ? "linear-gradient(145deg, #d4f7dc, #9de2a1)"
            : "linear-gradient(145deg, #f0f0f0, #d0d0d0)",
          boxShadow: isWinningSquare
            ? "0 0 20px rgba(72,187,120,0.8)"
            : "6px 6px 12px #b0b0b0, -6px -6px 12px #ffffff"
        }}
      >
        {board[index]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = `Winner: ${winner.player}`;
  } else if (!board.includes(null)) {
    status = "It's a Draw!";
  } else {
    status = `Next Player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div
      className="flex flex-col items-center space-y-6 p-6 min-h-screen"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <h1 className="text-4xl font-extrabold text-black drop-shadow-lg tracking-wide justify-center hover:scale-105 transition-transform duration-300 mb-4">
        Tic-Tac-Toe Game 
     </h1>
     

      <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl shadow-2xl">
        {board.map((_, i) => renderSquare(i))}
      </div>

      <p className="text-2xl text-white font-semibold drop-shadow-md">{status}</p>

      <button
        onClick={resetGame}
        className="px-6 py-3 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105"
        style={{
          background: "linear-gradient(145deg, #6fa3ef, #3f78e0)",
          boxShadow: "6px 6px 15px #2f4c91, -6px -6px 15px #8abaff"
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }
  return null;
}
