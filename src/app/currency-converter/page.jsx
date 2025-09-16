"use client";
import React, { useState, useEffect } from "react";

export default function CurrencyConverter() {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">💱 Currency Converter</h1>

        <div className="mb-4">
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div className="flex items-center justify-between mb-4 space-x-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full border p-2 rounded-lg"
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
            className="self-end mb-1 bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
          >
            🔄
          </button>

          <div className="flex-1">
            <label className="block font-medium mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full border p-2 rounded-lg"
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
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-2 rounded-xl shadow-md hover:opacity-90"
        >
          Convert
        </button>

        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-xl text-center">
            <p className="text-lg font-semibold">
              {amount} {fromCurrency} = {result} {toCurrency}
            </p>
            <p className="text-sm text-gray-500">Rate: 1 {fromCurrency} = {rate} {toCurrency}</p>
          </div>
        )}
      </div>
    </div>
  );
}