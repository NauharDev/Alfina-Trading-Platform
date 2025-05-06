"use client";

import React, { useState } from "react";
import Link from "next/link";

type Signal = {
  id: number;
  name: string;
};

const NewModelPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [sharpeRatio, setSharpeRatio] = useState<number | "">("");
  const [returnConcentration, setReturnConcentration] = useState("");
  const [rewardRisk, setRewardRisk] = useState<number | "">("");
  const [hitRatio, setHitRatio] = useState<number | "">("");
  const [signals, setSignals] = useState<Signal[]>([]);

  const addSignal = () => {
    setSignals([...signals, { id: Date.now(), name: "" }]);
  };

  const updateSignal = (id: number, value: string) => {
    setSignals(signals.map(s => (s.id === id ? { ...s, name: value } : s)));
  };

  const removeSignal = (id: number) => {
    setSignals(signals.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newModel = {
      title,
      category,
      sharpeRatio,
      returnConcentration,
      rewardRisk,
      hitRatio,
      signals,
    };
    console.log("New Model:", newModel);
    alert("Model configuration submitted (dummy)!");
    // Clear form if desired:
    setTitle("");
    setCategory("");
    setSharpeRatio("");
    setReturnConcentration("");
    setRewardRisk("");
    setHitRatio("");
    setSignals([]);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-4">
        <Link href="/dashboard">
          <button id="backToDashboardButton" className="text-indigo-600 hover:underline">&larr; Back to Dashboard</button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">New Model Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Probabilistic Sharpe Ratio
            </label>
            <input
              type="number"
              value={sharpeRatio}
              onChange={(e) => setSharpeRatio(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Reward/Risk Ratio
            </label>
            <input
              type="number"
              value={rewardRisk}
              onChange={(e) => setRewardRisk(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hit Ratio (%)
            </label>
            <input
              type="number"
              value={hitRatio}
              onChange={(e) => setHitRatio(e.target.value ? Number(e.target.value) : "")}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Return Concentrations</label>
          <input
            type="text"
            value={returnConcentration}
            onChange={(e) => setReturnConcentration(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
            placeholder="e.g., High, Medium, Low"
            required
          />
        </div>

        {/* Signals Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Signals</h2>
          {signals.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 mb-2">No signals added yet.</p>
          )}
          <div className="space-y-2">
            {signals.map((signal, index) => (
              <div key={signal.id} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={signal.name}
                  onChange={(e) => updateSignal(signal.id, e.target.value)}
                  placeholder={`Signal ${index + 1}`}
                  className="mt-1 flex-1 rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeSignal(signal.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            id="addSignalButton"
            type="button"
            onClick={addSignal}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            + Add Signal
          </button>
        </div>

        <div>
          <button
            id="submitModelButton"
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Submit Model
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewModelPage;