
"use client"

import type { Restaurant } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import { RestaurantCard } from "./restaurant-card"

type TopRestaurantsProps = {
  restaurants: Restaurant[]
  favorites: string[]
  onFavoriteToggle: (id: string) => void
}

export function TopRestaurants({ restaurants, favorites, onFavoriteToggle }: TopRestaurantsProps) {
  if (restaurants.length === 0) return null;

  return (
    <section className="mb-8 -mx-4">
      <div className="px-4">
        <h2 className="text-lg font-bold mb-4">Top restaurants near you</h2>
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-1">
          {restaurants.map((restaurant, index) => (
            <CarouselItem key={restaurant.id} className={`pl-4 ${index === 0 ? 'ml-0' : ''} basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4`}>
               <RestaurantCard 
                 restaurant={restaurant}
                 isFavorite={favorites.includes(restaurant.id)}
                 onFavoriteToggle={onFavoriteToggle}
               />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
