"use client";
import React, { useState, useEffect } from "react";

export default function CurrencyConverter3D() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(null);

  const API_URL = "https://api.exchangerate.host/latest";

  const fetchRate = async () => {
    try {
      const res = await fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`);
      const data = await res.json();
      setRate(data.rates[toCurrency]);
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setRate(null);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [fromCurrency, toCurrency]);

  const convert = () => {
    if (rate) {
      setResult((amount * rate).toFixed(2));
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-emerald-500 via-70% to-lime-300 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl transform rotate-x-6 -rotate-y-6 transition-transform hover:rotate-x-3 hover:-rotate-y-3">
        <div className="h-2 w-full rounded-full mb-4 bg-gradient-to-r from-teal-900 via-emerald-500 to-lime-300"></div>

        <h1 className="text-2xl font-bold text-center text-teal-900 mb-6">
          💱 Currency Converter 
        </h1>

        <div className="mb-4">
          <label className="block font-medium text-teal-800 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-black"
          />
        </div>

        <div className="flex items-end space-x-2 mb-4">
          <div className="flex-1">
            <label className="block font-medium text-teal-800 mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg text-blue-500"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
              <option>JPY</option>
            </select>
          </div>

          <button
            onClick={swapCurrencies}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            title="Swap"
          >
            🔄
          </button>

          <div className="flex-1">
            <label className="block font-medium text-teal-800 mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg text-black"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
              <option>JPY</option>
            </select>
          </div>
        </div>

        <button
          onClick={convert}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-400 text-white font-semibold py-2 rounded-xl shadow-md hover:opacity-90 transition"
        >
          Convert
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-xl text-center shadow-inner">
            <p className="text-lg font-semibold text-teal-900">
              {amount} {fromCurrency} = {result} {toCurrency}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Rate: 1 {fromCurrency} = {rate} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
