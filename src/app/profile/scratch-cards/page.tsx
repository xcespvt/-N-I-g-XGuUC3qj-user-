
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Gift, Sparkles, Star, Ticket, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type CardData = {
  id: number;
  prize: string | null;
  prizeAmount?: number;
  isScratched: boolean;
  winDate?: string;
};

const initialCards: CardData[] = [
  { id: 1, prize: 'Cashback', prizeAmount: 50, isScratched: true, winDate: '2024-08-18' },
  { id: 2, prize: 'Better Luck Next Time', isScratched: false },
  { id: 3, prize: '20% OFF', prizeAmount: 20, isScratched: true, winDate: '2024-08-17' },
  { id: 4, prize: 'Free Delivery', isScratched: false },
  { id: 5, prize: 'Cashback', prizeAmount: 100, isScratched: false },
  { id: 6, prize: 'Better Luck Next Time', isScratched: true, winDate: '2024-08-16' },
];

const ScratchCardGridItem = ({ card, onSelect }: { card: CardData; onSelect: () => void }) => {
  return (
    <div
      className={cn(
        "relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-300",
        !card.isScratched && "hover:scale-105"
      )}
      onClick={!card.isScratched ? onSelect : undefined}
    >
      {/* Background Layer (Prize) */}
       <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-white",
            card.isScratched ? "bg-gray-200 text-gray-500" : "bg-gradient-to-br from-primary/80 to-primary/60"
        )}>
        {card.prizeAmount ? (
            <>
                <Star className={cn("h-8 w-8 mb-1", card.isScratched ? "text-gray-400" : "text-yellow-300")} />
                <p className="font-bold text-lg">{card.isScratched ? 'You Won' : 'You Won!'}</p>
                <p className="text-2xl font-bold">₹{card.prizeAmount}</p>
                <p className="text-xs">{card.prize}</p>
            </>
        ) : card.prize === 'Free Delivery' ? (
             <>
                <Ticket className={cn("h-8 w-8 mb-1", card.isScratched ? "text-gray-400" : "text-yellow-300")} />
                <p className="font-bold text-lg">{card.isScratched ? 'You Won' : 'You Won!'}</p>
                <p className="text-2xl font-bold">{card.prize}</p>
            </>
        ) : (
            <>
                <p className="font-bold text-lg">Better Luck</p>
                <p className="text-2xl font-bold">Next Time!</p>
            </>
        )}
        {card.isScratched && card.winDate && (
            <p className="text-xs font-semibold text-gray-400 mt-2">
                Won on {new Date(card.winDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </p>
        )}
      </div>
      
      {/* Scratch Layer */}
      {!card.isScratched && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 flex flex-col items-center justify-center p-4 text-center">
            <Image 
                src="https://www.transparenttextures.com/patterns/brushed-metal.png"
                alt="Scratch texture"
                layout="fill"
                className="object-cover opacity-20"
                data-ai-hint="metal texture"
            />
            <div className="relative z-10 text-white">
                <Sparkles className="h-10 w-10 mx-auto mb-2" />
                <p className="font-bold text-xl">Tap to Scratch</p>
                <p className="text-xs">Reveal your reward!</p>
            </div>
        </div>
      )}
    </div>
  );
};


const ScratchableCard = ({ card, onScratched }: { card: CardData, onScratched: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Fill with scratchable surface
        ctx.fillStyle = '#B0B0B0'; // A grey color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text on top
        ctx.font = "bold 24px 'PT Sans', sans-serif";
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);

    }, []);

    const getBrushPos = (x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const canvasRect = canvas.getBoundingClientRect();
        return { x: x - canvasRect.left, y: y - canvasRect.top };
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || isRevealed) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 40;
        ctx.lineCap = 'round';

        let pos;
        if ('touches' in e.nativeEvent) {
             pos = getBrushPos(e.nativeEvent.touches[0].clientX, e.nativeEvent.touches[0].clientY);
        } else {
             pos = getBrushPos(e.nativeEvent.clientX, e.nativeEvent.clientY);
        }

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

        checkScratchCompletion();
    };
    
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        draw(e);
    }

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;
        ctx.beginPath();
    }

    const checkScratchCompletion = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixelData.length; i += 4) {
            if (pixelData[i] === 0) {
                transparentPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const scratchPercentage = (transparentPixels / totalPixels) * 100;

        if (scratchPercentage > 30) {
            setIsRevealed(true);
            onScratched();
        }
    };

    return (
        <div className="relative w-full max-w-sm mx-auto aspect-square">
            {/* Background Layer (Prize) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60 flex flex-col items-center justify-center p-4 text-center text-white rounded-2xl">
                {card.prizeAmount ? (
                    <>
                        <Star className="h-16 w-16 mb-2 text-yellow-300 animate-breathing-glow" />
                        <p className="font-bold text-3xl">You Won!</p>
                        <p className="text-5xl font-bold">₹{card.prizeAmount}</p>
                        <p className="text-lg">{card.prize}</p>
                    </>
                ) : card.prize === 'Free Delivery' ? (
                    <>
                        <Ticket className="h-16 w-16 mb-2 text-yellow-300 animate-breathing-glow" />
                        <p className="font-bold text-3xl">You Won!</p>
                        <p className="text-4xl font-bold">{card.prize}</p>
                    </>
                ) : (
                    <>
                        <p className="font-bold text-3xl">Better Luck</p>
                        <p className="text-5xl font-bold">Next Time!</p>
                    </>
                )}
            </div>
            {/* Scratch Layer */}
            <canvas
                ref={canvasRef}
                className={cn(
                    "absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-2xl transition-opacity duration-500",
                    isRevealed && "opacity-0"
                )}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
            />
        </div>
    )
}


export default function ScratchCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [totalWon, setTotalWon] = useState(0);

  useEffect(() => {
    // Calculate initial winnings from already scratched cards
    const initialWinnings = initialCards
      .filter(c => c.isScratched && c.prizeAmount)
      .reduce((sum, c) => sum + (c.prizeAmount || 0), 0);
    setTotalWon(initialWinnings);
  }, []);

  const handlePrizeWon = (cardId: number, amount?: number) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, isScratched: true, winDate: new Date().toISOString().split('T')[0] } : c));
    if (amount) {
      setTotalWon(prev => prev + amount);
    }
    setTimeout(() => {
        setSelectedCard(null);
    }, 2000); // Close modal after a delay to show prize
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Scratch Cards</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white p-6 text-center shadow-lg mb-6">
            <h2 className="text-sm font-semibold opacity-80">Total Winnings from Scratch Cards</h2>
            <p className="text-5xl font-bold mt-2">₹{totalWon.toFixed(2)}</p>
            <p className="mt-2 text-xs opacity-70">
                Winnings are added to your wallet automatically.
            </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            {cards.map(card => (
                <ScratchCardGridItem key={card.id} card={card} onSelect={() => setSelectedCard(card)} />
            ))}
        </div>
      </main>
      
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in-0">
             <div className="relative w-full">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -top-10 right-0 h-10 w-10 text-white rounded-full bg-black/30"
                    onClick={() => setSelectedCard(null)}
                >
                    <X className="h-6 w-6" />
                </Button>
                <ScratchableCard card={selectedCard} onScratched={() => handlePrizeWon(selectedCard.id, selectedCard.prizeAmount)} />
            </div>
        </div>
      )}
    </div>
  );
}
