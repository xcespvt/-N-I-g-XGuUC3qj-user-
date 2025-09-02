
'use client';

import { ArrowLeft, ChevronRight, Headset, Phone, Send, ShieldCheck, MessageSquareText, FileText, MapPin, ChevronDown, CheckCircle2, AppWindow, Store, Gamepad2, Clapperboard, Music, Tv, Gamepad, Headphones, XCircle, LifeBuoy, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PromotionCarousel } from '@/components/promotion-carousel';
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
import { DeliveryPartnerChatSheet } from '@/components/delivery-partner-chat-sheet';


const ChefIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
      <path d="M12 2C9.23858 2 7 4.23858 7 7V9H17V7C17 4.23858 14.7614 2 12 2Z" fill="currentColor"/>
      <path d="M5 16C5 14.8954 5.89543 14 7 14H17C18.1046 14 19 14.8954 19 16V20H5V16Z" fill="currentColor"/>
      <path d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z" fill="currentColor"/>
      <path d="M12 2C9.23858 2 7 4.23858 7 7V9H17V7C17 4.23858 14.7614 2 12 2Z" fill="white"/>
    </svg>
);

const BikeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
        <path d="M19 12H16L14 7L10 7L8 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const sponsoredApps = [
    { name: 'App One', icon: AppWindow, color: 'text-primary' },
    { name: 'App Two', icon: Store, color: 'text-primary' },
    { name: 'App Three', icon: Gamepad2, color: 'text-primary' },
    { name: 'App Four', icon: Clapperboard, color: 'text-primary' },
    { name: 'App Five', icon: Music, color: 'text-primary' },
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
          <Headphones className="h-6 w-6 text-primary" />
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


function TrackOrderPageComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(6 * 60); // 6 minutes in seconds
  const [deliveryPartnerAssigned, setDeliveryPartnerAssigned] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [orderAccepted, setOrderAccepted] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isDeliveryChatOpen, setIsDeliveryChatOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
          const newTime = prevTime > 0 ? prevTime - 1 : 0;
          if (newTime <= 5 * 60 && !orderAccepted) { // Accept order when 5 minutes are left
              setOrderAccepted(true);
              toast({ title: "Restaurant has accepted your order." });
          }
          if (newTime <= 4 * 60) { // Assign partner when 4 minutes are left
              setDeliveryPartnerAssigned(true);
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
    // Simulate refund process
    console.log("Cancelling order with reason:", cancellationReason);
    toast({
      title: "Order Cancelled",
      description: "Your refund has been processed.",
    });
    router.push('/order-failed'); // Redirecting to a generic 'failed' page for demo
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
        <div className="relative h-2/5 w-full">
            <Image src="https://placehold.co/800x600.png" alt="Map" layout="fill" objectFit="cover" data-ai-hint="city map" />
             <header className="absolute top-0 z-10 flex h-16 w-full items-center justify-between px-4 text-gray-800">
                <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-md">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                 <Sheet open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                    <SheetTrigger asChild>
                         <button className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-md">
                            <span>Help</span>
                            <Headset className="h-5 w-5" />
                        </button>
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
             <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
                    <p className="font-bold text-lg">Estimated Arrival</p>
                    <p className="text-3xl font-bold text-primary">{formatTime(timeLeft)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        {orderAccepted ? 'Your order is being prepared!' : 'Waiting for restaurant to accept...'}
                    </p>
                </div>
            </div>
        </div>
      
      <main className="flex-1 overflow-y-auto -mt-4 z-0">
        <div className="space-y-4 rounded-t-2xl bg-gray-50 p-4 pt-8">
            <div className="rounded-2xl bg-white p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                        <ChefIcon />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Royal Spice</p>
                        <p className="text-xs text-gray-500">{orderAccepted ? 'is preparing your order' : 'has not accepted yet'}</p>
                    </div>
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10 bg-gray-100 border-gray-200 shrink-0">
                    <Phone className="h-5 w-5 text-gray-600" />
                </Button>
            </div>
            
            <div className="rounded-2xl bg-white p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", deliveryPartnerAssigned ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400")}>
                        <BikeIcon />
                    </div>
                    <div>
                        <p className={cn("font-bold", deliveryPartnerAssigned ? "text-gray-800" : "text-gray-500")}>{deliveryPartnerAssigned ? 'Rahul Kumar' : 'Delivery Partner'}</p>
                        <p className="text-xs text-gray-500">{deliveryPartnerAssigned ? 'is on the way' : 'is yet to be assigned'}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-gray-100 border-gray-200 shrink-0" disabled={!deliveryPartnerAssigned}><Phone className="h-5 w-5 text-gray-600" /></Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-gray-100 border-gray-200 shrink-0" disabled={!deliveryPartnerAssigned} onClick={() => setIsDeliveryChatOpen(true)}><MessageSquareText className="h-5 w-5 text-gray-600" /></Button>
                </div>
            </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                        <p className="font-bold text-primary">Picking up from</p>
                        <p className="text-sm font-bold text-gray-800">Royal Spice</p>
                        <p className="text-xs text-muted-foreground">Indiranagar, Bengaluru</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <Send className="h-5 w-5 text-primary -rotate-45 mt-1" />
                    <div>
                        <p className="font-bold text-primary">Delivering to</p>
                        <p className="text-sm font-bold text-gray-800">Home</p>
                        <p className="text-xs text-muted-foreground">40, 14th Main Rd, Next to Swish...</p>
                    </div>
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
                <div className="px-4 pb-4">
                    <div className="border-t">
                        <h3 className="font-semibold text-gray-800 pt-3 pb-2">Order Items</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center border border-red-600">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                    </div>
                                    <span className="text-sm font-medium">Grilled Chicken Sandwich x1</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400 line-through">₹259</p>
                                    <p className="font-bold">₹209</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center border border-primary">
                                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
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
                             <div className="flex justify-between">
                                <p>Delivery Fee</p>
                                <p className="font-medium text-primary">FREE</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between font-bold text-base">
                                <p>Total</p>
                                <p>₹301.29</p>
                            </div>
                        </div>
                         <div className="mt-4 bg-primary/10 text-primary font-bold p-3 rounded-lg text-center text-sm border border-primary/20 flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            Paid ₹301.29 via UPI
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
        </div>
      </main>
      <SupportChatSheet open={isChatOpen} onOpenChange={setIsChatOpen} />
      <DeliveryPartnerChatSheet open={isDeliveryChatOpen} onOpenChange={setIsDeliveryChatOpen} />
    </div>
  );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackOrderPageComponent />
        </Suspense>
    )
}
