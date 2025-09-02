
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function BookingBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden my-6">
      <Image
        src="https://placehold.co/600x250.png"
        alt="Promotion banner for Copper Chimney"
        width={600}
        height={250}
        className="w-full h-auto object-cover"
        data-ai-hint="indian food variety"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
        <h3 className="text-xl font-bold max-w-xs leading-tight">
          Savour Yummy Indian Dishes With <span className="text-primary-foreground/80">FLAT 15% OFF</span> At Copper Chimney!
        </h3>
        <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg">
          BOOK NOW
        </Button>
      </div>
    </div>
  );
}
