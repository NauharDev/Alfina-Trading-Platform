"use client";

import React from 'react';
import StockRuleBuilder from './StockRuleBuilder';
import Link from "next/link";
export default function StockRuleBuilderPage() {
  return (
    <div className="flex flex-col w-full h-screen p-6 bg-gray-100">
      <div className="mb-4">
        <Link href="/rule-builder">
          <button className="text-indigo-600 hover:underline">&larr; Back to Rule Builder</button>
        </Link>
      </div>
      <nav className="flex items-center p-4 bg-white border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-600">Feature Builder</h1>
      </nav>
      <StockRuleBuilder />
    </div>
  );
} 