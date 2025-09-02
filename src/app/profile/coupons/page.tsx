
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Ticket, Search, Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const availableCoupons = [
  {
    code: 'TREATS20',
    description: 'Get 20% OFF on orders above ₹499',
    expiry: '2024-08-31',
    type: 'discount',
    color: 'bg-primary/10 border-primary/20 text-primary',
    iconColor: 'text-primary'
  },
  {
    code: 'FREEDEL',
    description: 'Free Delivery on your next order',
    expiry: '2024-09-15',
    type: 'delivery',
    color: 'bg-blue-100 border-blue-200 text-blue-800',
    iconColor: 'text-blue-600'
  },
  {
    code: 'COMBO50',
    description: 'Flat ₹50 OFF on combos',
    expiry: '2024-08-25',
    type: 'flat',
    color: 'bg-orange-100 border-orange-200 text-orange-800',
    iconColor: 'text-orange-600'
  },
    {
    code: 'PIZZA100',
    description: 'Flat ₹100 OFF on pizza orders',
    expiry: '2024-09-05',
    type: 'flat',
    color: 'bg-red-100 border-red-200 text-red-800',
    iconColor: 'text-red-600'
  },
];


export default function CouponsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApply = (code: string) => {
    setAppliedCoupon(code);
    toast({
      title: 'Coupon Applied!',
      description: `The coupon ${code} has been successfully applied to your next order.`,
    });
  };
  
  const handleApplyFromInput = () => {
    if(couponCode) {
        handleApply(couponCode);
        setCouponCode('');
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Coupons</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm border mb-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h2 className="font-bold text-gray-800">Enter coupon code</h2>
            <div className="relative mt-2">
                <Input
                    placeholder="e.g., TREATS20"
                    className="h-12 text-base pr-28 bg-gray-50 border-gray-200"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <Button 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9"
                    disabled={!couponCode}
                    onClick={handleApplyFromInput}
                >
                    Apply
                </Button>
            </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Available Coupons</h2>
          {availableCoupons.map((coupon) => (
            <div 
              key={coupon.code}
              className={cn(
                "relative flex rounded-2xl bg-white shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl overflow-hidden border-2",
                coupon.color.replace('bg-', 'border-')
              )}
            >
              <div className={cn("w-24 flex flex-col items-center justify-center p-4", coupon.color)}>
                <Ticket className={cn("h-8 w-8", coupon.iconColor)} />
              </div>
              <div className="absolute top-0 bottom-0 left-24 w-px bg-[repeating-linear-gradient(0deg,hsl(var(--border)),hsl(var(--border))_4px,transparent_4px,transparent_10px)]"></div>
              <div className="flex-grow p-4 pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-mono text-lg font-bold tracking-wider text-primary">{coupon.code}</h3>
                      <p className="font-semibold text-gray-700">{coupon.description}</p>
                    </div>
                     <Button 
                        variant="link" 
                        className="font-bold text-primary"
                        onClick={() => handleApply(coupon.code)}
                    >
                      {appliedCoupon === coupon.code ? 'APPLIED' : 'APPLY'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Expires on: {new Date(coupon.expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
