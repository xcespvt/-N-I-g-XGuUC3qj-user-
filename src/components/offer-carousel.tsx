"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { BRAND_IMAGES, FOOD_IMAGES } from "@/lib/image-constants"

const offers = [
    {
        restaurant: "Domino's Pizza",
        title: "Get flat ₹125 OFF*",
        subtitle: "on mouth-watering treats",
        image: FOOD_IMAGES.PIZZA_MARGHERITA,
        logo: BRAND_IMAGES.DOMINOS,
        hint: "pizza cheese"
    },
    {
        restaurant: "Burger King",
        title: "Free Whopper",
        subtitle: "on orders above ₹499",
        image: FOOD_IMAGES.BURGER_GOURMET,
        logo: BRAND_IMAGES.BURGERKING,
        hint: "burger"
    },
    {
        restaurant: "KFC",
        title: "Meals from ₹179",
        subtitle: "on selected bowls",
        image: FOOD_IMAGES.BURGER_GOURMET,
        logo: BRAND_IMAGES.KFC,
        hint: "fried chicken"
    }
]

export function OfferCarousel() {
  return (
    <section className="-mx-4">
        <Carousel opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="ml-1">
                {offers.map((offer, index) => (
                    <CarouselItem key={index} className={`pl-4 ${index === 0 ? 'ml-0' : ''} basis-10/12 md:basis-1/2 lg:basis-1/3`}>
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm text-white">
                            <Image
                                src={offer.image}
                                alt={offer.title}
                                fill
                                className="object-cover"
                                data-ai-hint={offer.hint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                            <div className="relative h-full flex flex-col justify-between p-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Image src={offer.logo} alt={`${offer.restaurant} logo`} width={32} height={32} className="rounded-full border-2 border-white" />
                                        <p className="text-sm font-semibold">{offer.restaurant}</p>
                                    </div>
                                    <h3 className="text-xl font-bold">{offer.title}</h3>
                                    <p className="text-white/90 text-sm">{offer.subtitle}</p>
                                </div>
                                <div>
                                    <Button className="bg-primary hover:bg-primary/90 rounded-full font-bold h-9">
                                        ORDER NOW
                                    </Button>
                                    <p className="text-xs text-white/70 mt-1">*T&C apply</p>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </section>
  )
}
