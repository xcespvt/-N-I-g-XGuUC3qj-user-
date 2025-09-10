
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Star, Send, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { mockOrderHistory, restaurants } from '@/lib/mock-data';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <button key={i} onClick={() => setRating(i + 1)}>
                <Star className={cn("h-8 w-8 transition-colors", i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
            </button>
        ))}
    </div>
);

const ItemRating = ({ item, onRatingChange }: { item: string, onRatingChange: (item: string, rating: 'good' | 'bad') => void }) => {
    const [rating, setRating] = useState<'good' | 'bad' | null>(null);

    const handleRating = (newRating: 'good' | 'bad') => {
        const finalRating = rating === newRating ? null : newRating;
        setRating(finalRating);
        onRatingChange(item, finalRating!);
    };
    
    return (
         <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <p className="font-semibold">{item}</p>
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("rounded-full h-10 w-10", rating === 'bad' && 'bg-red-100 text-red-600')}
                    onClick={() => handleRating('bad')}
                >
                    <ThumbsDown className="h-5 w-5" />
                </Button>
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("rounded-full h-10 w-10", rating === 'good' && 'bg-green-100 text-green-600')}
                    onClick={() => handleRating('good')}
                >
                    <ThumbsUp className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

function RateOrderPageComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const orderId = searchParams.get('orderId');

    const [order, setOrder] = useState<any>(null);

    const [deliveryRating, setDeliveryRating] = useState(0);
    const [restaurantRating, setRestaurantRating] = useState(0);
    const [itemRatings, setItemRatings] = useState<{[key: string]: 'good' | 'bad'}>({});
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (orderId) {
            const orderIndex = parseInt(orderId.replace('order', ''));
            const fullOrder = { ...mockOrderHistory[orderIndex], id: orderId };
            const restaurantDetails = restaurants.find(r => r.name === fullOrder.restaurantName);
            setOrder({ ...fullOrder, restaurantDetails });
        }
    }, [orderId]);
    
    const handleItemRatingChange = (item: string, rating: 'good' | 'bad') => {
        setItemRatings(prev => ({...prev, [item]: rating}));
    };

    const handleSubmit = () => {
        // Handle submission logic
        toast({
            title: "Thank you for your feedback!",
            description: "Your review has been submitted successfully.",
        });
        router.push('/profile/orders');
    }
    
    if (!order) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p>Loading order details...</p>
            </div>
        );
    }

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Rate Your Order</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
             <div className="flex items-center gap-4">
                <Image 
                    src={order.restaurantDetails.image} 
                    alt={order.restaurantDetails.name}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                    data-ai-hint="restaurant food"
                />
                <div>
                    <h2 className="font-bold text-xl">{order.restaurantDetails.name}</h2>
                    <p className="text-sm text-muted-foreground">{order.restaurantDetails.location}</p>
                </div>
            </div>
        </div>

        {order.orderType === 'Delivery' && (
             <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <h3 className="font-bold text-lg">How was your delivery partner?</h3>
                <p className="text-sm text-muted-foreground mt-1">Your feedback helps us improve our service.</p>
                <div className="mt-4 flex justify-center">
                    <StarRating rating={deliveryRating} setRating={setDeliveryRating} />
                </div>
            </div>
        )}
       
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <h3 className="font-bold text-lg">How was the restaurant?</h3>
            <p className="text-sm text-muted-foreground mt-1">Rate your overall experience with {order.restaurantDetails.name}.</p>
            <div className="mt-4 flex justify-center">
                <StarRating rating={restaurantRating} setRating={setRestaurantRating} />
            </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-lg text-center">How was your food?</h3>
            <div className="mt-4 space-y-2">
                {order.items.map((item: string, index: number) => (
                    <ItemRating key={index} item={item} onRatingChange={handleItemRatingChange} />
                ))}
            </div>
        </div>
        
         <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-lg text-center mb-3">Leave a comment</h3>
            <Textarea 
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
            />
        </div>

      </main>
      <footer className="sticky bottom-0 bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <Button className="w-full h-14 bg-primary text-lg font-bold" onClick={handleSubmit}>
            <Send className="mr-2 h-5 w-5" />
            Submit Review
        </Button>
      </footer>
    </div>
  );
}

export default function RateOrderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RateOrderPageComponent />
        </Suspense>
    )
}
