
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const images = [
  { src: 'https://picsum.photos/800/800', hint: 'restaurant patio sunset' },
  { src: 'https://picsum.photos/400/400', hint: 'rooftop bar evening' },
  { src: 'https://picsum.photos/400/400', hint: 'outdoor dining lights' },
  { src: 'https://picsum.photos/400/400', hint: 'restaurant lounge night' },
  { src: 'https://picsum.photos/400/400', hint: 'modern restaurant decor' },
  { src: 'https://picsum.photos/400/400', hint: 'restaurant interior bar' },
];

export function PhotoGallery() {
  return (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold">Photos</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80">
            <div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden">
                <Image src={images[0].src} alt="Main restaurant view" fill className="object-cover" data-ai-hint={images[0].hint} />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
                 <Image src={images[1].src} alt="Restaurant view 2" fill className="object-cover" data-ai-hint={images[1].hint} />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
                 <Image src={images[2].src} alt="Restaurant view 3" fill className="object-cover" data-ai-hint={images[2].hint} />
            </div>
        </div>
         <div className="grid grid-cols-3 gap-2 h-32">
            <div className="relative rounded-2xl overflow-hidden">
                <Image src={images[3].src} alt="Restaurant view 4" fill className="object-cover" data-ai-hint={images[3].hint} />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
                <Image src={images[4].src} alt="Restaurant view 5" fill className="object-cover" data-ai-hint={images[4].hint} />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
                <Image src={images[5].src} alt="Restaurant view 6" fill className="object-cover" data-ai-hint={images[5].hint} />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">+147</span>
                </div>
            </div>
        </div>
        <div className="text-center">
            <Button variant="outline" className="rounded-full h-10 px-6 border-dashed bg-white border-gray-400 font-bold text-base">
                <Camera className="h-5 w-5 mr-2"/>
                Add photo
            </Button>
        </div>
    </div>
  );
}
