"use client";
import React, { useState } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  // Function to calculate BMI
  const calculateBMI = () => {
    if (!height || !weight || height <= 0 || weight <= 0) {
      setError("Please enter valid height and weight.");
      setBmi(null);
      setCategory("");
      return;
    }

    setError("");

    const heightInMeters = height / 100; // convert cm → meters
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    let bmiCategory = "";
    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiValue < 24.9) {
      bmiCategory = "Normal weight";
    } else if (bmiValue < 29.9) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    setCategory(bmiCategory);
  };

  return (
    <div className="flex flex-col items-center text-black justify-center min-h-screen bg-sky-900 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1"
            placeholder="Enter height in cm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1"
            placeholder="Enter weight in kg"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={calculateBMI}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Calculate
        </button>

        {bmi && (
          <div className="mt-4 p-4 border rounded-lg text-amber-900 text-center">
            <p className="text-lg">
              <span className="font-semibold">BMI:</span> {bmi}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Category:</span> {category}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
