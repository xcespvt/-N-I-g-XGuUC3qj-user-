
"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export function HighProteinAdCard() {
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm text-white">
        <Image
            src="https://picsum.photos/600/400"
            alt="High protein meal"
            fill
            className="object-cover"
            data-ai-hint="grilled chicken salad"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/80 via-green-700/70 to-transparent" />
        <div className="relative h-full flex flex-col justify-center p-6">
            <div className="max-w-xs">
                <h3 className="text-3xl font-bold">High Protein</h3>
                <p className="mt-1 text-sm text-white/90">
                Curated dishes with more than 30gm protein.
                </p>
                <Button className="mt-4 bg-white text-green-700 font-bold hover:bg-gray-100 rounded-lg px-6">
                ORDER NOW
                </Button>
            </div>
        </div>
    </div>
  );
}
