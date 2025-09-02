
"use client";

import { Heart } from 'lucide-react';

export function LiveItUpCard() {
  return (
    <div className="bg-gray-100 p-8 rounded-2xl flex flex-col items-start justify-center text-left mt-4">
      <h2 className="text-5xl font-bold text-gray-500 tracking-tight leading-tight">
        Crave<br />the Chaos!
      </h2>
      <div className="flex items-center gap-1.5 mt-4 text-gray-500">
        <span className="text-sm">Crafted with</span>
        <Heart className="h-4 w-4 text-red-500 fill-current" />
        <span className="text-sm">in Bengaluru, India</span>
      </div>
    </div>
  );
}
