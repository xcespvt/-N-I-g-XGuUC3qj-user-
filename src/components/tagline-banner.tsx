
"use client";

import { Asterisk } from 'lucide-react';

const taglines = [
  "Late night cravings?",
  "Don't worry, we've got you.",
  "Food so good, it's almost a crime.",
  "Warning: May cause extreme happiness.",
  "Order now, thank us later.",
  "You can't live a full life on an empty stomach.",
];

export function TaglineBanner() {
  return (
    <div className="relative w-full h-12 overflow-hidden bg-black my-6">
      <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap">
        {taglines.map((tag, index) => (
          <div key={index} className="flex items-center px-4">
            <p className="text-white font-bold text-lg tracking-wider">{tag}</p>
            <Asterisk className="h-6 w-6 text-primary ml-8" />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {taglines.map((tag, index) => (
          <div key={`dup-${index}`} className="flex items-center px-4">
            <p className="text-white font-bold text-lg tracking-wider">{tag}</p>
            <Asterisk className="h-6 w-6 text-primary ml-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
