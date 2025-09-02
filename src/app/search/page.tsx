
'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RestaurantCardList } from '@/components/restaurant-card-list';
import { restaurants as allRestaurants } from '@/lib/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';

function SearchResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [favorites, setFavorites] = useLocalStorage<string[]>('favorite-restaurants', []);
    const { toast } = useToast();

    const filteredRestaurants = allRestaurants.filter(restaurant =>
        query && (
            restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
        )
    );

    const handleFavoriteToggle = (id: string) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    };

    const handleHideRestaurant = (id: string) => {
        // This is a simplified version. In a real app, this state should be managed globally.
        const restaurant = allRestaurants.find(r => r.id === id);
        toast({
            title: `We have hidden ${restaurant?.name}`,
            description: "You won't see this in your lists anymore.",
        });
        // In a real app, you would also update a global state to reflect the change immediately.
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-50">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-bold">Search Results for &quot;{query}&quot;</h1>
            </header>
            <main className="flex-1 p-4">
                {filteredRestaurants.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredRestaurants.map(restaurant => (
                            <RestaurantCardList
                                key={restaurant.id}
                                restaurant={restaurant}
                                isFavorite={favorites.includes(restaurant.id)}
                                onFavoriteToggle={handleFavoriteToggle}
                                onHide={handleHideRestaurant}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                        <Search className="h-12 w-12 mb-4" />
                        <h2 className="text-xl font-semibold">No results found</h2>
                        <p>We couldn&apos;t find any restaurants matching &quot;{query}&quot;.</p>
                        <Button onClick={() => router.back()} className="mt-4">
                            Go Back
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <SearchResultsPage />
        </Suspense>
    );
}
