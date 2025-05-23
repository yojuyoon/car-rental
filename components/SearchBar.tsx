'use client';

import { useState, useEffect } from 'react';
import { Car } from '../types/types';

interface SearchBarProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  cars: Car[];
}

export default function SearchBar({
  keyword,
  onKeywordChange,
  cars,
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); // 방향키용

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      setHighlightIndex(-1);
      return;
    }

    const lower = keyword.toLowerCase();
    const matched = new Set<string>();

    cars.forEach((car) => {
      if (car.carType.toLowerCase().includes(lower)) matched.add(car.carType);
      if (car.brand.toLowerCase().includes(lower)) matched.add(car.brand);
      if (car.carModel.toLowerCase().includes(lower)) matched.add(car.carModel);
      if (car.description?.toLowerCase().includes(lower))
        matched.add(car.description);
    });

    const result = [...matched].slice(0, 5);
    setSuggestions(result);
    setHighlightIndex(-1);
  }, [keyword, cars]);

  const handleSelect = (value: string) => {
    onKeywordChange(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        handleSelect(suggestions[highlightIndex]);
      }
    }
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search by type, brand, or model..."
        value={keyword}
        onChange={(e) => {
          onKeywordChange(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        className="border px-3 py-2 w-full rounded"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
              className={`px-3 py-2 cursor-pointer ${
                i === highlightIndex
                  ? 'bg-sky-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
