import React, { useState } from 'react';

const NewRuleForm: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  const [condition, setCondition] = useState('');
  const [threshold, setThreshold] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the values.
    console.log({ symbol, condition, threshold });
    alert('New rule submitted (dummy action)!');
    setSymbol('');
    setCondition('');
    setThreshold('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Trading Rule</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock Symbol</label>
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
          placeholder="e.g. AAPL"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Condition</label>
        <input
          type="text"
          value={condition}
          onChange={e => setCondition(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
          placeholder="e.g. Price >"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Threshold</label>
        <input
          type="number"
          value={threshold}
          onChange={e => setThreshold(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm"
          placeholder="e.g. 150"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default NewRuleForm;