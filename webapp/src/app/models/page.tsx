"use client";

import React, { useState } from "react";
import Link from "next/link";

type Model = {
  id: number;
  title: string;
  category: string;
  sharpeRatio: number;
  returnConcentration: string;
  rewardRisk: number;
  hitRatio: number;
  lastEdited: string;
};

const dummyModels: Model[] = [
  {
    id: 1,
    title: "Momentum Model",
    category: "Trend",
    sharpeRatio: 1.25,
    returnConcentration: "High",
    rewardRisk: 2.1,
    hitRatio: 0.65,
    lastEdited: "2025-02-01",
  },
  {
    id: 2,
    title: "Mean Reversion",
    category: "Reversal",
    sharpeRatio: 0.98,
    returnConcentration: "Medium",
    rewardRisk: 1.8,
    hitRatio: 0.70,
    lastEdited: "2025-01-28",
  },
  // add more dummy models as needed
];

const ModelsPage: React.FC = () => {
  const [models] = useState<Model[]>(dummyModels);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Trading Rules</h1>
      <div className="mb-4 flex justify-end">
      <Link href="/models/new">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          + New Trading Rule
        </button>
      </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Probabilistic Sharpe Ratio</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Return Concentrations</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Reward/Risk Ratio</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Hit Ratio</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Last Edited</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className="border-t dark:border-gray-700">
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{model.title}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{model.category}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{model.sharpeRatio.toFixed(2)}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{model.returnConcentration}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{model.rewardRisk.toFixed(2)}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{(model.hitRatio * 100).toFixed(0)}%</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{model.lastEdited}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelsPage;
