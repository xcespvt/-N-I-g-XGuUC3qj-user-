
"use client"

import type { Restaurant } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import { TopRestaurantCard } from "./top-restaurant-card"

type TopRestaurantsProps = {
  restaurants: Restaurant[]
  favorites: string[]
  onFavoriteToggle: (id: string) => void
  title?: string
}

export function TopRestaurants({ restaurants, favorites, onFavoriteToggle, title = "Top restaurants near you" }: TopRestaurantsProps) {
  if (restaurants.length === 0) return null;

  return (
    <section className="mb-8 -mx-4">
      <div className="px-4">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
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
            <CarouselItem key={restaurant.id} className={`pl-4 ${index === 0 ? 'ml-0' : ''} basis-2/5 sm:basis-1/3 md:basis-1/4 lg:basis-1/5`}>
               <TopRestaurantCard 
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
