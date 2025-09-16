"use client";
import React, { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += upperCase;
    if (includeLower) chars += lowerCase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (!chars) return;

    let newPass = "";
    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * chars.length);
      newPass += chars[randIndex];
    }
    setPassword(newPass);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-black bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Random Password Generator</h1>

        <div className="mb-4">
          <label className="block font-medium">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} />
            <span>Include Lowercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
            <span>Include Symbols</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-2 rounded-xl shadow-md hover:opacity-90"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-4 p-3 bg-gray-100 rounded-xl flex justify-between items-center">
            <span className="font-mono break-all">{password}</span>
            <button
              onClick={copyToClipboard}
              className="ml-2 text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:opacity-90"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
