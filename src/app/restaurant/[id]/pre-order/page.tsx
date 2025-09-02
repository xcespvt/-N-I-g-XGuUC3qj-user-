
'use client';

import { Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, CheckCircle2, Utensils, Users, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';

function PreOrderPageComponent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const [bookingDetails] = useLocalStorage('booking-details', null);
  const [, setOrderType] = useLocalStorage<'delivery' | 'dine-in' | 'booking' | 'booking-preorder'>('order-type', 'booking');

  if (!bookingDetails || bookingDetails.restaurantId !== id) {
    // Handle case where booking details are not available or don't match
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <h2 className="text-xl font-bold">Booking details not found</h2>
            <p className="text-muted-foreground mt-2">Please book a table first.</p>
            <Button onClick={() => router.push(`/restaurant/${id}`)} className="mt-4">Go to Restaurant</Button>
        </div>
    );
  }

  const handlePreOrder = () => {
    setOrderType('booking-preorder');
    // Navigate to the dine-in page and focus the menu
    router.push(`/restaurant/${id}?view=menu`);
  };

  const handleContinue = () => {
    setOrderType('booking');
    toast({
        title: "Booking Confirmed!",
        description: `Your table at ${bookingDetails.restaurantName} is booked.`,
    })
    router.push('/checkout');
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">Booking Confirmation</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
        <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm text-center">
                <div className="inline-block p-3 bg-green-100 rounded-full border-4 border-white shadow-md animate-breathing-glow">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-3">Table Booked!</h2>
                <p className="text-muted-foreground">{bookingDetails.restaurantName}</p>
            </div>

             <div className="rounded-2xl bg-white p-4 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-bold">{bookingDetails.date}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-bold">{bookingDetails.time}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-sm text-muted-foreground">Guests</p>
                        <p className="font-bold">{bookingDetails.guests} People</p>
                    </div>
                </div>
            </div>

            <div className="relative rounded-2xl bg-white p-6 shadow-sm text-center border-2 border-dashed border-primary/30">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    RECOMMENDED
                </div>
                <ShoppingBag className="h-10 w-10 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-bold text-gray-800">Want to Pre-order?</h3>
                <p className="text-muted-foreground text-sm mt-1">
                    Save time by ordering your food now. We'll have it ready when you arrive!
                </p>
                <Button className="w-full mt-4 h-12 text-lg" onClick={handlePreOrder}>
                    Pre-order Your Meal
                </Button>
            </div>
        </div>
        
        <div className="mt-6">
            <Button
                variant="outline"
                className="w-full h-12 text-lg font-bold border-gray-300 bg-white"
                onClick={handleContinue}
            >
                Continue to Checkout
            </Button>
        </div>
      </main>
    </div>
  );
}


export default function PreOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PreOrderPageComponent />
        </Suspense>
    )
}
