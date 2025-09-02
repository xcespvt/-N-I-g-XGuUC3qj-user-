
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { restaurants, reviews } from '@/lib/mock-data';
import Image from 'next/image';

const userReviews = reviews.slice(0, 3); // Mocking user's reviews

export default function YourRatingsPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Your Ratings</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {userReviews.length > 0 ? (
          <div className="space-y-4">
            {userReviews.map((review, index) => {
              const restaurant = restaurants.find(r => r.id === review.restaurantId);
              if (!restaurant) return null;
              
              return (
                <div 
                  key={review.id} 
                  className="bg-white rounded-2xl shadow-sm p-4 animate-slide-up-and-fade transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden shrink-0">
                          <Image 
                              src={restaurant.image} 
                              alt={restaurant.name}
                              fill
                              className="object-cover"
                              data-ai-hint="restaurant food"
                          />
                      </div>
                      <div className="flex-1">
                          <h3 className="font-bold text-lg">{restaurant.name}</h3>
                          <p className="text-sm text-muted-foreground -mt-0.5">{restaurant.location}</p>
                           <div className="flex items-center gap-1 mt-2">
                              {[...Array(5)].map((_, i) => (
                              <Star 
                                  key={i} 
                                  className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                              ))}
                          </div>
                      </div>
                  </div>
                  <p className="text-gray-800 mt-3 text-sm">{review.content}</p>
                   <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed">
                       <p className="text-xs text-muted-foreground font-medium">{review.date}</p>
                       <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                              <Edit className="h-3 w-3 mr-1.5" />
                              Edit
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                              <FileText className="h-3 w-3 mr-1.5" />
                              Order
                          </Button>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 animate-slide-up-and-fade">
            <div className="inline-block bg-primary/10 p-4 rounded-full">
                <Star className="h-12 w-12 text-primary/80" />
            </div>
            <h2 className="text-xl font-semibold mt-4">No Ratings Yet</h2>
            <p className="text-muted-foreground mt-2">Looks like you haven't reviewed any orders yet. <br/> Your feedback helps others!</p>
            <Button className="mt-6" onClick={() => router.push('/')}>Order Something New</Button>
          </div>
        )}
      </main>
    </div>
  );
}
