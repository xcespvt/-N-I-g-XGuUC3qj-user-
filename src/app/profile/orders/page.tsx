
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Download, Star, Package, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockOrderHistory } from '@/lib/mock-data';
import { restaurants } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function MyOrdersPage() {
  const router = useRouter();

  const ordersWithDetails = mockOrderHistory.map((order, index) => {
    const restaurant = restaurants.find(r => r.name === order.restaurantName);
    return {
      ...order,
      id: `order${index}`, // Add a unique ID for navigation
      restaurantDetails: restaurant,
    };
  }).filter(order => order.restaurantDetails);

  const handleTrackOrder = (order: (typeof ordersWithDetails)[0]) => {
      let path = '/track-order/delivery'; // Default
      if (order.orderType === 'Takeaway') path = '/track-order/takeaway';
      if (order.orderType === 'Dine-in') path = '/track-order/dine-in';
      if (order.orderType === 'Booking') path = '/track-order/booking';
      if (order.orderType === 'Booking with Pre-order') path = '/track-order/booking-preorder';
      router.push(path);
  }

  const StatusBadge = ({ status }: { status: 'Active' | 'Completed' | 'Cancelled' }) => {
    const statusConfig = {
      Active: { icon: RefreshCcw, text: 'Active', color: 'bg-blue-100 text-blue-800' },
      Completed: { icon: CheckCircle2, text: 'Completed', color: 'bg-green-100 text-green-800' },
      Cancelled: { icon: XCircle, text: 'Cancelled', color: 'bg-red-100 text-red-800' },
    };
    const { icon: Icon, text, color } = statusConfig[status];
    return (
      <div className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", color)}>
        <Icon className="h-4 w-4" />
        <span>{text}</span>
      </div>
    );
  };

  const OrderCard = ({ order, index }: { order: (typeof ordersWithDetails)[0], index: number }) => (
    <div 
        className="bg-white rounded-3xl p-4 shadow-sm animate-slide-up-and-fade transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-4 items-start">
        <Image 
            src={order.restaurantDetails!.image}
            alt={order.restaurantDetails!.name}
            width={80}
            height={80}
            className="rounded-xl object-cover"
            data-ai-hint="restaurant food"
        />
        <div className="flex-grow">
          <div>
            <h3 className="font-bold text-xl">{order.restaurantDetails!.name}</h3>
            <p className="text-sm text-muted-foreground">{order.restaurantDetails!.location}</p>
          </div>
          <p className="text-sm text-gray-600 mt-2 truncate">
            {order.items.join(', ')}
          </p>
        </div>
      </div>
      <div className="border-t my-3 border-dashed"></div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
            {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <StatusBadge status={order.status} />
      </div>
       <div className="border-t my-3"></div>
       <div className="flex gap-2">
            {order.status === 'Active' && (
                <Button className="flex-1 rounded-full" onClick={() => handleTrackOrder(order)}>Track Order</Button>
            )}
             {order.status === 'Completed' && (
                <>
                    <Button variant="outline" className="flex-1 rounded-full border-primary text-primary" onClick={() => router.push(`/profile/rate-order?orderId=${order.id}`)}>
                        <Star className="mr-2 h-4 w-4" />
                        Rate Order
                    </Button>
                    <Button className="flex-1 rounded-full">Reorder</Button>
                </>
            )}
             {order.status === 'Cancelled' && (
                <Button className="flex-1 rounded-full" variant="secondary">Order Again</Button>
            )}
            <Button variant="outline" className="flex-1 rounded-full">
              <Download className="mr-2 h-4 w-4" />
              Invoice
            </Button>
       </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Your Orders</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {ordersWithDetails.length > 0 ? (
          <div className="space-y-4">
            {ordersWithDetails.map((order, index) => (
              <OrderCard key={`${order.restaurantName}-${index}`} order={order} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-slide-up-and-fade">
            <div className="inline-block bg-primary/10 p-4 rounded-full">
                <Package className="h-12 w-12 text-primary/80" />
            </div>
            <h2 className="text-xl font-semibold mt-4">No Orders Yet</h2>
            <p className="text-muted-foreground mt-2">You have no past or active orders. <br/> Let's fix that!</p>
            <Button className="mt-6" onClick={() => router.push('/')}>Order Now</Button>
          </div>
        )}
      </main>
    </div>
  );
}
