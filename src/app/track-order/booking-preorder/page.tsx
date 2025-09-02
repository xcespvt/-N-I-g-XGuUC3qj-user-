
'use client';

import { ArrowLeft, Headset, MapPin, Calendar, Clock, Users, Utensils, FileText, ChevronDown, CheckCircle2, AppWindow, Store, Gamepad2, Clapperboard, Music, Tv, Gamepad, Headphones, Phone, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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


function TrackBookingPreorderPageComponent() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
                <h1 className="text-lg font-bold">Royal Spice</h1>
                <p className="text-xs text-muted-foreground">Booking with Pre-order</p>
            </div>
        </div>
        <Button variant="outline" className="rounded-full" onClick={() => setIsChatOpen(true)}>
          <Headset className="mr-2 h-4 w-4" />
          Help
        </Button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
            <h2 className="text-lg font-bold text-gray-800">Your Booking is Confirmed!</h2>
            <p className="text-muted-foreground text-sm mt-1">We'll start preparing your order shortly before your arrival.</p>
            <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-bold">28th August 2024</p>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-bold">8:00 PM</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="font-bold">4 People</p>
                </div>
            </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                 <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                        <p className="text-sm font-bold text-gray-800">Royal Spice</p>
                        <p className="text-xs text-muted-foreground">Indiranagar, Bengaluru</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="https://maps.google.com" target="_blank">
                        <Button variant="outline" size="icon" className="border-primary text-primary"><Map className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="outline" size="icon" className="border-primary text-primary"><Phone className="h-4 w-4" /></Button>
                </div>
            </div>
        </div>

        <Collapsible className="rounded-xl bg-white shadow-sm">
            <CollapsibleTrigger className="w-full p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-gray-500" />
                    <h2 className="text-lg font-bold text-gray-800">Pre-order Details</h2>
                </div>
                <ChevronDown className="h-5 w-5 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="px-4 pb-4 border-t">
                     <div className="border-t">
                        <h3 className="font-semibold text-gray-800 pt-3 pb-2">Order Items</h3>
                        <p className="text-xs text-muted-foreground -mt-2 mb-3">Status: <span className="font-bold text-yellow-600">Pending</span></p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center border border-red-600">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                    </div>
                                    <span className="text-sm font-medium">Butter Chicken x2</span>
                                </div>
                                <p className="font-bold">₹778</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center border border-green-600">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                    </div>
                                    <span className="text-sm font-medium">Garlic Naan x4</span>
                                </div>
                                <p className="font-bold">₹280</p>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <h3 className="font-semibold text-gray-800 pb-2">Bill Details</h3>
                        <div className="space-y-2 text-sm">
                             <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p className="font-medium">₹1058.00</p>
                            </div>
                             <div className="flex justify-between">
                                <p>Taxes & Charges</p>
                                <p className="font-medium">₹222.18</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-base">
                                <p>Total</p>
                                <p>₹1280.18</p>
                            </div>
                        </div>
                         <div className="mt-4 bg-green-50 text-green-800 font-bold p-3 rounded-lg text-center text-sm border border-green-200 flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            Paid ₹1280.18 via UPI
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

export default function TrackBookingPreorderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackBookingPreorderPageComponent />
        </Suspense>
    )
}
