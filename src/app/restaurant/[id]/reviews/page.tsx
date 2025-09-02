
'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { restaurants, reviews as allReviews } from '@/lib/mock-data';
import { Progress } from '@/components/ui/progress';

function RestaurantReviewsPageComponent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const restaurant = restaurants.find(r => r.id === params.id) || restaurants[0];
  const reviews = allReviews.filter(r => r.restaurantId === params.id);
  
  const ratingDistribution = [
      { star: 5, count: reviews.filter(r => r.rating === 5).length, total: reviews.length },
      { star: 4, count: reviews.filter(r => r.rating === 4).length, total: reviews.length },
      { star: 3, count: reviews.filter(r => r.rating === 3).length, total: reviews.length },
      { star: 2, count: reviews.filter(r => r.rating === 2).length, total: reviews.length },
      { star: 1, count: reviews.filter(r => r.rating === 1).length, total: reviews.length },
  ]

  return (
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{restaurant.name}</h1>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border mb-6">
            <h2 className="text-lg font-bold mb-3">Ratings Summary</h2>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold text-primary">{restaurant.rating.toFixed(1)}</p>
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.round(restaurant.rating) ? 'fill-current' : ''}`} />)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{restaurant.reviews} Reviews</p>
                </div>
                <div className="flex-1 space-y-1">
                    {ratingDistribution.map(item => (
                        <div key={item.star} className="flex items-center gap-2">
                            <span className="text-xs font-medium">{item.star} <span className="text-muted-foreground">Star</span></span>
                            <Progress value={(item.count / item.total) * 100} className="w-full h-2" />
                            <span className="text-xs text-muted-foreground w-8 text-right">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="flex items-start gap-3">
                <Image src={review.avatar} alt={review.author} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full text-sm">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{review.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{review.content}</p>
                  {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-3">
                          {review.images.map((img, index) => (
                              <Image key={index} src={img} alt={`Review image ${index+1}`} width={80} height={80} className="rounded-lg object-cover" data-ai-hint="food meal restaurant" />
                          ))}
                      </div>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-muted-foreground text-sm">
                      <button className="flex items-center gap-1 hover:text-primary">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.likes}</span>
                      </button>
                       <button className="flex items-center gap-1 hover:text-primary">
                          <MessageCircle className="h-4 w-4" />
                          <span>Reply</span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function RestaurantReviewsPage({ params }: { params: { id:string } }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RestaurantReviewsPageComponent params={params} />
        </Suspense>
    )
}
