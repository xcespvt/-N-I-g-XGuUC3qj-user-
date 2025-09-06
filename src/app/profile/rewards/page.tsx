
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Lock, Ticket, Trophy, Map, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const totalPieces = 9;
const initialCollected = 4;

const treasurePieces = [
  { id: 1, name: 'Piece 1', description: '10% Off Pizza', collected: true },
  { id: 2, name: 'Piece 2', description: 'Free Drink', collected: true },
  { id: 3, name: 'Piece 3', description: '₹50 Cashback', collected: true },
  { id: 4, name: 'Piece 4', description: 'BOGO on Burgers', collected: true },
  { id: 5, name: 'Piece 5', description: 'Hidden Coupon', collected: false },
  { id: 6, name: 'Piece 6', description: 'Secret Deal', collected: false },
  { id: 7, name: 'Piece 7', description: 'Mystery Offer', collected: false },
  { id: 8, name: 'Piece 8', description: 'Free Delivery', collected: false },
  { id: 9, name: 'Piece 9', description: 'Grand Prize Hint', collected: false },
];

export default function TreasureHuntPage() {
  const router = useRouter();
  const [collectedCount, setCollectedCount] = useState(initialCollected);
  const progress = (collectedCount / totalPieces) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 relative overflow-hidden">
      <Image 
        src="https://www.transparenttextures.com/patterns/old-map.png"
        alt="Treasure map background"
        layout="fill"
        className="object-cover opacity-20"
        data-ai-hint="map texture"
      />
      <div className="relative z-10 flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b border-amber-200/50 bg-amber-50/80 backdrop-blur-sm px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="ml-2 text-lg font-bold text-amber-900">Treasure Hunt</h1>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 text-center">
              <div className="inline-block rounded-full bg-amber-200 p-4 animate-breathing-glow border-4 border-white shadow-lg">
                  <Trophy className="h-12 w-12 text-amber-600" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-amber-800 animate-slide-up-and-fade">Unlock the Grand Prize!</h2>
              <p className="mt-1 text-amber-700 animate-slide-up-and-fade [animation-delay:0.2s]">Collect all 9 coupon pieces from your orders to reveal a mega offer.</p>
          </div>
          
          <div className="px-4">
              <div className="rounded-xl bg-white/70 backdrop-blur-sm p-4 shadow-md border border-amber-200">
                  <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-amber-900">Your Progress</h3>
                      <p className="font-bold text-primary">{collectedCount} / {totalPieces}</p>
                  </div>
                  <Progress value={progress} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-amber-600" />
                  <p className="mt-2 text-xs text-amber-800/80">
                      You're {totalPieces - collectedCount} pieces away from the grand prize!
                  </p>
              </div>
          </div>

          <div className="px-4 mt-6">
               <h3 className="text-lg font-bold mb-3 text-amber-900">Your Collection</h3>
               <div className="grid grid-cols-3 gap-3">
                  {treasurePieces.map(piece => (
                      <div 
                          key={piece.id}
                          className={cn(
                              "rounded-xl border-2 p-3 text-center flex flex-col items-center justify-center aspect-square shadow-lg transition-all duration-300 relative overflow-hidden",
                              piece.collected 
                                  ? "border-amber-400 bg-gradient-to-br from-amber-100 to-yellow-100 transform hover:scale-105" 
                                  : "border-dashed border-amber-300/80 bg-white/50 backdrop-blur-sm group hover:border-amber-400"
                          )}
                      >
                          {piece.collected ? (
                              <div className="animate-breathing-glow animation-delay-random z-10">
                                  <Ticket className="h-8 w-8 text-amber-600 mb-1" />
                                  <h4 className="font-bold text-amber-800 text-xs">{piece.description}</h4>
                                  <p className="text-[10px] text-green-700 font-semibold">Collected!</p>
                              </div>
                          ) : (
                              <div className="transition-transform group-hover:animate-shake z-10">
                                  <Lock className="h-8 w-8 text-gray-400 mb-1" />
                                  <h4 className="font-bold text-gray-500 text-xs">{piece.name}</h4>
                                  <p className="text-[10px] text-gray-400">Find this piece</p>
                              </div>
                          )}
                      </div>
                  ))}
               </div>
          </div>

          <div className="p-4 mt-4">
              <div className="rounded-2xl bg-gradient-to-r from-amber-800 to-amber-900 p-6 text-white text-center shadow-2xl relative overflow-hidden">
                  <Star className="h-24 w-24 text-yellow-400/20 absolute -top-8 -left-8" />
                  <Star className="h-16 w-16 text-yellow-400/10 absolute -bottom-4 -right-4" />
                  <Gift className="h-10 w-10 mx-auto mb-3 text-yellow-300" />
                  <h3 className="text-xl font-bold">How does it work?</h3>
                  <p className="mt-2 text-sm text-yellow-100/90">
                      A new treasure piece is randomly added to your collection with every completed order. Keep ordering to find them all and claim your reward!
                  </p>
              </div>
          </div>

        </main>
        <footer className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] z-20">
          <Button 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold"
              onClick={() => router.push('/')}
          >
            Start an Order
          </Button>
        </footer>
      </div>
    </div>
  );
}
