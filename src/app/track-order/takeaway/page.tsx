
'use client';

import { ArrowLeft, Headset, Phone, FileText, MapPin, ChevronDown, CheckCircle2, Star, Clock, AppWindow, Store, Gamepad2, Clapperboard, Music, Tv, Gamepad, Headphones, XCircle, LifeBuoy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { PromotionCarousel } from '@/components/promotion-carousel';
import { cn } from '@/lib/utils';
import { SupportChatSheet } from '@/components/support-chat-sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


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

function TrackTakeawayPageComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        if (newTime <= 13 * 60 && !orderAccepted) { // Accept order when 13 minutes are left
          setOrderAccepted(true);
          toast({ title: "Restaurant has accepted your order." });
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [orderAccepted, toast]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleCancelOrder = () => {
    if (!cancellationReason.trim()) {
        toast({
            variant: "destructive",
            title: "Reason required",
            description: "Please provide a reason for cancellation.",
        });
        return;
    }
    console.log("Cancelling order with reason:", cancellationReason);
    toast({
      title: "Order Cancelled",
      description: "Your refund has been processed.",
    });
    router.push('/order-failed');
  }
  
  const otp = "123456";

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
                <h1 className="text-lg font-bold">Wok & Roll</h1>
                <p className="text-xs text-muted-foreground">Takeaway Order</p>
            </div>
        </div>
        <Sheet open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <Headset className="mr-2 h-4 w-4" />
                    Help
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl">
                <SheetHeader>
                    <SheetTitle>How can we help you?</SheetTitle>
                </SheetHeader>
                <div className="space-y-3 py-4">
                    <Button className="w-full justify-start h-14 rounded-xl" onClick={() => { setIsHelpOpen(false); setIsChatOpen(true); }}>
                        <LifeBuoy className="mr-3 h-5 w-5" />
                        <div>
                            <p className="font-bold text-base">Contact Support</p>
                            <p className="font-normal text-xs text-left">Chat with our AI assistant</p>
                        </div>
                    </Button>
                    {!orderAccepted && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full justify-start h-14 rounded-xl">
                                    <XCircle className="mr-3 h-5 w-5" />
                                    <div>
                                        <p className="font-bold text-base">Cancel Order</p>
                                        <p className="font-normal text-xs text-left">Request a cancellation</p>
                                    </div>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to cancel this order? This action cannot be undone. Please provide a reason for cancellation below.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <Textarea 
                                    placeholder="e.g., Ordered by mistake, wrong address, etc." 
                                    value={cancellationReason}
                                    onChange={(e) => setCancellationReason(e.target.value)}
                                />
                                <AlertDialogFooter>
                                <AlertDialogCancel>Keep Order</AlertDialogCancel>
                                <AlertDialogAction onClick={handleCancelOrder} className="bg-destructive hover:bg-destructive/90">Confirm Cancellation</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </SheetContent>
        </Sheet>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
            <h2 className="text-lg font-bold text-gray-800">Your order will be ready in</h2>
            <p className="text-5xl font-bold text-primary my-2">{formatTime(timeLeft)}</p>
            <Badge>{orderAccepted ? 'Preparing' : 'Waiting for confirmation'}</Badge>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
            <h2 className="text-lg font-bold text-gray-800">Your Pickup Code</h2>
            <div className="my-3 flex justify-center gap-2">
                {otp.split('').map((digit, index) => (
                    <div key={index} className="flex h-14 w-10 items-center justify-center rounded-lg bg-gray-100 text-2xl font-bold text-gray-800 border">
                        {digit}
                    </div>
                ))}
            </div>
            <p className="text-xs text-muted-foreground">Show this code at the counter to pickup your order.</p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Star className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Royal Spice</p>
                        <p className="text-xs text-gray-500">is preparing your order</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href="https://maps.google.com" target="_blank">
                        <Button variant="outline" size="icon" className="h-10 w-10 bg-gray-100 border-gray-200 shrink-0"><MapPin className="h-5 w-5 text-gray-600" /></Button>
                    </Link>
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-gray-100 border-gray-200 shrink-0"><Phone className="h-5 w-5 text-gray-600" /></Button>
                </div>
            </div>
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
                    <div className="border-t pt-4">
                        {/* Bill details content can be copied from delivery page */}
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

export default function TrackTakeawayPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackTakeawayPageComponent />
        </Suspense>
    )
}
