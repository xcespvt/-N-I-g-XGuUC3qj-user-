
"use client";

import Image from 'next/image';
import type { Restaurant, Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Star, Download, Package, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';
import { mockOrderHistory } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';


type ReorderPageProps = {
  restaurants: Restaurant[];
};

export function ReorderPage({ restaurants }: ReorderPageProps) {
  const router = useRouter();
  
  const ordersWithDetails = mockOrderHistory.map((order, index) => {
    const restaurant = restaurants.find(r => r.name === order.restaurantName);
    return {
      ...order,
      id: `order${index}`, // Add a unique ID for navigation
      restaurantDetails: restaurant,
    };
  }).filter(order => order.restaurantDetails);

  const activeOrders = ordersWithDetails.filter(order => order.status === 'Active');
  const pastOrders = ordersWithDetails.filter(order => order.status === 'Completed' || order.status === 'Cancelled');

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

  const OrderCard = ({ order }: { order: (typeof ordersWithDetails)[0] }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex gap-4 items-start">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{order.restaurantDetails!.name}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{order.restaurantDetails!.location}</p>
          <div className="flex items-center gap-1 text-sm mt-1">
            <Star className="h-4 w-4 text-green-600 fill-green-600" />
            <span className="font-bold text-green-700">{order.restaurantDetails!.rating.toFixed(1)}</span>
            <span className="text-muted-foreground"> | </span>
            <span>{order.restaurantDetails!.deliveryTime} mins</span>
          </div>
           <p className="text-sm text-gray-600 mt-2 truncate">
            Items: {order.items.join(', ')}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
            <StatusBadge status={order.status} />
        </div>
      </div>
      <div className="border-t my-3"></div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
            Ordered on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <Badge variant="outline" className="text-xs">{order.orderType}</Badge>
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
    <section>
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      
      {activeOrders.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Active Orders</h3>
          <div className="space-y-4">
            {activeOrders.map((order, index) => (
              <OrderCard key={`active-${index}`} order={order} />
            ))}
          </div>
        </div>
      )}

      {pastOrders.length > 0 && (
        <div>
           <h3 className="text-lg font-semibold mb-3 text-gray-700">Past Orders</h3>
          <div className="space-y-4">
            {pastOrders.map((order, index) => (
               <OrderCard key={`past-${index}`} order={order} />
            ))}
          </div>
        </div>
      )}

      {activeOrders.length === 0 && pastOrders.length === 0 && (
        <div className="text-center py-10">
            <div className="inline-block bg-primary/10 p-4 rounded-full">
                <Package className="h-12 w-12 text-primary/80" />
            </div>
          <h2 className="text-xl font-semibold mt-4">No Orders Yet</h2>
          <p className="text-muted-foreground mt-2">You have no past or active orders. <br/> Let's fix that!</p>
          <Button className="mt-4">Order Now</Button>
        </div>
      )}
    </section>
  );
}
