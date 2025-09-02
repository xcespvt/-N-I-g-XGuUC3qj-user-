
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockRefunds = [
  {
    id: 'REF789012',
    orderId: 'ORD123456',
    restaurantName: 'Royal Spice',
    amount: 250,
    date: '2024-07-28',
    status: 'Completed',
  },
  {
    id: 'REF789013',
    orderId: 'ORD123457',
    restaurantName: 'Pizza Heaven',
    amount: 150,
    date: '2024-07-25',
    status: 'Processing',
  },
];

export default function RefundsPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Refunds</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {mockRefunds.length > 0 ? (
          <div className="space-y-4">
            {mockRefunds.map((refund, index) => (
              <div 
                key={refund.id} 
                className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up-and-fade transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Receipt className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{refund.restaurantName}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Order ID: {refund.orderId}</p>
                      <p className="text-xs text-muted-foreground">Refund ID: {refund.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">₹{refund.amount.toFixed(2)}</p>
                    <Badge 
                        variant={refund.status === 'Completed' ? 'default' : 'secondary'}
                        className={cn(
                            "mt-1",
                            refund.status === 'Completed' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        )}
                    >
                        {refund.status}
                    </Badge>
                  </div>
                </div>
                 <div className="border-t my-3 border-dashed"></div>
                 <p className="text-xs text-muted-foreground text-right">
                    Processed on {new Date(refund.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground animate-slide-up-and-fade">
            <div className="inline-block bg-primary/10 p-4 rounded-full">
                <Receipt className="h-12 w-12 text-primary/80" />
            </div>
            <h2 className="text-xl font-semibold mt-4 text-foreground">No Refunds Found</h2>
            <p className="mt-2">You haven't requested any refunds yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
