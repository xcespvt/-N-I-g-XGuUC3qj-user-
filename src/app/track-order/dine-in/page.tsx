
'use client';

import { ArrowLeft, Headset, Phone, FileText, Utensils, ChevronDown, CheckCircle2, AppWindow, Store, Gamepad2, Clapperboard, Music, Tv, Gamepad, Headphones, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PromotionCarousel } from '@/components/promotion-carousel';
import { cn } from '@/lib/utils';
import { SupportChatSheet } from '@/components/support-chat-sheet';

const sponsoredApps = [
    { name: 'App One', icon: AppWindow, color: 'text-blue-500' },
    { name: 'App Two', icon: Store, color: 'text-green-500' },
    { name: 'App Three', icon: Gamepad2, color: 'text-purple-500' },
    { name: 'App Four', icon: Clapperboard, color: 'text-red-500' },
    { name: 'App Five', icon: Music, color: 'text-orange-500' },
]

const EntertainmentAdCard = () => (
  <div className="rounded-2xl bg-white p-4 shadow-sm">
    <h3 className="font-bold text-lg mb-3">While you wait...</h3>
    <div className="grid grid-cols-3 gap-3 text-center">
      <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <Tv className="h-6 w-6 text-red-600" />
        </div>
        <span className="text-xs font-semibold text-gray-700">Watch a video</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Gamepad className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-xs font-semibold text-gray-700">Play a game</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Headphones className="h-6 w-6 text-green-600" />
        </div>
        <span className="text-xs font-semibold text-gray-700">Listen to music</span>
      </button>
    </div>
  </div>
);

const DealAdCard = () => (
  <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg flex items-center gap-4">
    <Image 
        src="https://picsum.photos/200" 
        alt="Deal" 
        width={80} 
        height={80} 
        className="rounded-lg object-cover" 
        data-ai-hint="fashion accessory"
    />
    <div>
      <h3 className="font-bold text-lg">FLAT 50% OFF</h3>
      <p className="text-sm opacity-90">On your first fashion order. Use code: NEW50</p>
      <Button variant="secondary" className="mt-2 h-8 text-purple-700 font-bold">Shop Now</Button>
    </div>
  </div>
);

const BannerAdCard = () => (
  <div className="rounded-2xl shadow-sm overflow-hidden">
    <Image 
        src="https://picsum.photos/800/200"
        alt="Banner Ad" 
        width={800} 
        height={200} 
        className="w-full h-auto"
        data-ai-hint="abstract modern art"
    />
  </div>
);


function TrackDineInPageComponent() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
                <h1 className="text-lg font-bold">Royal Spice</h1>
                <p className="text-xs text-muted-foreground">Dine-in Order</p>
            </div>
        </div>
        <Button variant="outline" className="rounded-full" onClick={() => setIsChatOpen(true)}>
          <Headset className="mr-2 h-4 w-4" />
          Help
        </Button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
            <h2 className="text-lg font-bold text-gray-800">Your order will be served in</h2>
            <p className="text-5xl font-bold text-primary my-2">{formatTime(timeLeft)}</p>
            <Badge>Preparing</Badge>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
            <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
            <h2 className="text-lg font-bold text-gray-800">Your Table Number is</h2>
            <p className="text-4xl font-bold text-gray-800 my-2">12A</p>
        </div>

        <Collapsible className="rounded-xl bg-white shadow-sm">
            <CollapsibleTrigger className="w-full p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-gray-500" />
                    <h2 className="text-lg font-bold text-gray-800">Order & Bill Details</h2>
                </div>
                <ChevronDown className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="px-4 pb-4 border-t">
                     <div className="border-t">
                        <div className="flex justify-between items-center pt-3 pb-2">
                            <h3 className="font-semibold text-gray-800">Order Items</h3>
                            <Button variant="outline" size="sm" className="h-8 border-primary text-primary" onClick={() => router.push('/restaurant/1/details')}>
                                <Plus className="h-4 w-4 mr-1"/>
                                Add Items
                            </Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center border border-red-600">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                    </div>
                                    <span className="text-sm font-medium">Grilled Chicken Sandwich x1</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">₹209</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center border border-green-600">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                    </div>
                                    <span className="text-sm font-medium">Coke x1</span>
                                </div>
                                <p className="font-bold">₹40</p>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <h3 className="font-semibold text-gray-800 pb-2">Bill Details</h3>
                        <div className="space-y-2 text-sm">
                             <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p className="font-medium">₹249.00</p>
                            </div>
                             <div className="flex justify-between">
                                <p>Taxes & Charges</p>
                                <p className="font-medium">₹52.29</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-base">
                                <p>Total</p>
                                <p>₹301.29</p>
                            </div>
                        </div>
                         <div className="mt-4 bg-green-50 text-green-800 font-bold p-3 rounded-lg text-center text-sm border border-green-200 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                <span>Paid ₹301.29 via UPI</span>
                            </div>
                            <Button className="h-8 bg-primary text-white hover:bg-primary/90">Pay Now</Button>
                        </div>
                    </div>
                </div>
            </CollapsibleContent>
          </Collapsible>

           <div className="rounded-xl bg-white p-4 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Sponsored Apps</h3>
              <div className="grid grid-cols-5 gap-2 text-center">
                  {sponsoredApps.map((app) => (
                      <div key={app.name} className="flex flex-col items-center gap-2">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                              <app.icon className={cn("h-8 w-8", app.color)} />
                          </div>
                          <p className="text-xs font-semibold text-gray-700">{app.name}</p>
                      </div>
                  ))}
              </div>
          </div>
          
          <div>
              <h3 className="font-bold text-lg mb-2">Restaurant Offers</h3>
              <PromotionCarousel />
          </div>

          <EntertainmentAdCard />
          <DealAdCard />
          <BannerAdCard />
      </main>
      <SupportChatSheet open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}

export default function TrackDineInPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackDineInPageComponent />
        </Suspense>
    )
}
