
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, MapPin } from 'lucide-react';

export default function OrderConfirmedPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 animate-breathing-glow">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your order. Your food is being prepared and will be delivered shortly.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-4 text-left shadow-sm border space-y-4">
            <div>
                <p className="text-sm font-bold text-gray-500 uppercase">Restaurant</p>
                <p className="font-semibold text-gray-800">Royal Spice</p>
            </div>
             <div>
                <p className="text-sm font-bold text-gray-500 uppercase">Delivering to</p>
                <p className="font-semibold text-gray-800">Home - 123 Sunshine Apartments...</p>
            </div>
             <div>
                <p className="text-sm font-bold text-gray-500 uppercase">Total Amount</p>
                <p className="font-semibold text-gray-800">₹301.29</p>
            </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button 
            className="w-full h-14 bg-primary text-primary-foreground text-lg font-bold"
            onClick={() => router.push('/track-order/delivery')}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Track Your Order
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-14 border-gray-300 bg-white text-lg font-bold"
            onClick={() => router.push('/')}
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
