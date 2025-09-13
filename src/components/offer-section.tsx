
"use client";

import { Flame } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

export function OfferSection() {
  return (
    <section className="text-center">
      <div className="inline-flex items-center gap-2">
        <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-cyan-400" />
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">TIME'S TICKING!</h2>
        <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-cyan-400" />
      </div>
      <p className="text-sm font-semibold text-blue-800">SALE GOES LIVE 19th Sept, 4PM</p>
      
      <div className="mt-4 -mx-4">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            <CarouselItem className="pl-4 basis-5/6 md:basis-1/2">
               <div className="relative bg-blue-600 rounded-2xl p-6 text-white overflow-hidden aspect-video flex flex-col justify-center items-center text-center">
                  <div className="relative z-10">
                      <h3 className="text-2xl font-extrabold tracking-tight">TAKE A SNEAK PEEK!</h3>
                      <p className="text-base mt-1">Deals too good to miss.</p>
                  </div>
              </div>
            </CarouselItem>
             <CarouselItem className="pl-4 basis-5/6 md:basis-1/2">
                <div className="relative bg-blue-600 rounded-2xl p-6 text-white overflow-hidden aspect-video flex flex-col justify-center items-center text-center">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-extrabold tracking-tight">VOTE FOR YOUR DEAL</h3>
                        <p className="text-base mt-1">Vote. Win. Save.</p>
                        <div className="mt-3 flex justify-center gap-4">
                            <div className="bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                6k votes <Flame className="h-4 w-4 text-orange-400" />
                            </div>
                            <div className="bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                8.5k votes <Flame className="h-4 w-4 text-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
