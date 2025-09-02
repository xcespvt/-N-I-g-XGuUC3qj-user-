
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Percent, CheckCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const offers = [
  {
    type: 'CASHBACK',
    code: 'PAYTM100',
    title: 'Assured Paytm voucher upto ₹2000 plus cashback upto ₹100 using Paytm UPI Lite/ UPI',
    details: 'Use Paytm UPI Lite/UPI & get assured cashback up to ₹100 on orders above ₹149.',
    terms: [
        "Offer valid once per user.",
        "Minimum order value of ₹149 is required.",
        "Cashback will be credited to your Paytm wallet within 24 hours.",
        "Offer cannot be combined with other promotions."
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    icon: 'https://placehold.co/24x24.png'
  },
  {
    type: '50% OFF',
    code: 'TRYCREVINGSNEW',
    title: 'Save 50% upto ₹80 on this order',
    details: 'Use code TRYCREVINGSNEW & save 50% upto ₹80 on orders above ₹199',
    terms: [
        "Valid for new users only.",
        "Maximum discount is ₹80.",
        "Applicable on select restaurants."
    ],
    color: 'text-primary',
    bgColor: 'bg-primary',
  },
  {
    type: '20% OFF',
    code: 'DEALICIOUS',
    title: 'Save 20% on every extra item/rupee you add to cart above ₹199',
    details: 'Use code DEALICIOUS & save 20% upto ₹50 on every extra item you add to a cart of value ₹199 or above',
    terms: [
        "Maximum discount is ₹50.",
        "Applicable on all restaurants.",
        "Offer valid till the end of the month."
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-500'
  },
  {
    type: 'CASHBACK',
    code: 'CRED300',
    title: 'Upto ₹300 cashback with CRED',
    details: 'Use code CRED300 & get up to ₹300 cashback',
    terms: [
        "Payment must be made via CRED Pay.",
        "Cashback amount is random, up to ₹300.",
        "Valid on orders above ₹500."
    ],
    color: 'text-gray-800',
    bgColor: 'bg-gray-800'
  },
];

export default function ApplyOffersPage() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApply = (code: string) => {
    setAppliedCoupon(code);
    // Optionally, navigate back to checkout after a short delay
    setTimeout(() => router.push('/checkout'), 1000);
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">Apply Offers</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="relative mb-6">
          <Input
            placeholder="Enter Coupon Code"
            className="h-12 text-base pr-28"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          />
          <Button 
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9"
            disabled={!couponCode}
            onClick={() => handleApply(couponCode)}
          >
            Apply
          </Button>
        </div>

        <div className="space-y-4">
          {offers.map((offer) => {
            const isApplied = appliedCoupon === offer.code;
            return (
              <Collapsible key={offer.code} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${offer.bgColor} flex items-center justify-center shrink-0`}>
                        <Percent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${offer.color}`}>{offer.type}</p>
                        <h2 className="font-bold text-gray-800">{offer.code}</h2>
                      </div>
                    </div>
                    <Button 
                      variant={isApplied ? "secondary" : "outline"} 
                      className={cn(
                        "rounded-lg font-bold w-24",
                        isApplied ? "bg-primary/10 text-primary border-primary/20" : "text-primary border-primary"
                      )}
                      onClick={() => handleApply(offer.code)}
                      disabled={isApplied}
                    >
                      {isApplied ? <><CheckCircle className="h-4 w-4 mr-1.5" /> Applied</> : 'Apply'}
                    </Button>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 font-medium">{offer.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{offer.details}</p>
                  <CollapsibleTrigger className="w-full mt-3 text-sm font-semibold text-gray-600 flex justify-between items-center group">
                    <span>View Details</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="bg-gray-50 px-4 py-3 border-t">
                     <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Terms & Conditions</h4>
                     <ul className="list-disc pl-5 space-y-1">
                        {offer.terms.map((term, i) => (
                            <li key={i} className="text-xs text-gray-600">{term}</li>
                        ))}
                     </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </main>
    </div>
  );
}
