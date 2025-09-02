
"use client"

import Image from "next/image"
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const cuisines = [
  { name: "North Indian", image: "https://placehold.co/150x150.png", hint: "north indian food" },
  { name: "Biryani", image: "https://placehold.co/150x150.png", hint: "biryani food" },
  { name: "Chinese", image: "https://placehold.co/150x150.png", hint: "chinese food" },
  { name: "South Indian", image: "https://placehold.co/150x150.png", hint: "south indian food" },
  { name: "Pizza", image: "https://placehold.co/150x150.png", hint: "pizza" },
  { name: "Rolls", image: "https://placehold.co/150x150.png", hint: "food roll" },
  { name: "Burger", image: "https://placehold.co/150x150.png", hint: "burger" },
  { name: "Thali", image: "https://placehold.co/150x150.png", hint: "thali food" },
  { name: "Sandwich", image: "https://placehold.co/150x150.png", hint: "sandwich" },
  { name: "Desserts", image: "https://placehold.co/150x150.png", hint: "dessert" },
  { name: "Healthy", image: "https://placehold.co/150x150.png", hint: "healthy food" },
  { name: "Pasta", image: "https://placehold.co/150x150.png", hint: "pasta" },
]

export function CuisineCategories() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const carouselCuisines = cuisines.slice(0, 7);

  return (
    <section className="mb-8 -mx-4">
        <div className="px-4">
          <h2 className="text-lg font-bold mb-4">What's on your mind?</h2>
        </div>
        <Carousel opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="ml-1">
                {carouselCuisines.map((cuisine, index) => (
                    <CarouselItem key={cuisine.name} className={`pl-4 ${index === 0 ? 'ml-0' : ''} basis-1/4 sm:basis-1/5 md:basis-[12%] lg:basis-[10%]`}>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full overflow-hidden border">
                                <Image
                                src={cuisine.image}
                                alt={cuisine.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                data-ai-hint={cuisine.hint}
                                />
                            </div>
                            <p className="text-xs font-medium text-center text-primary">{cuisine.name}</p>
                        </div>
                    </CarouselItem>
                ))}
                 <CarouselItem className="pl-4 basis-1/4 sm:basis-1/5 md:basis-[12%] lg:basis-[10%]">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                             <button className="flex flex-col items-center gap-2 w-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border">
                                    <ChevronsUpDown className="h-6 w-6 text-primary" />
                                </div>
                                <p className="text-xs font-medium text-primary">View More</p>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-2xl h-[60vh]">
                            <SheetHeader>
                                <SheetTitle>All Categories</SheetTitle>
                            </SheetHeader>
                            <div className="py-4 grid grid-cols-4 gap-y-6 gap-x-4 overflow-y-auto h-[calc(60vh-80px)]">
                                {cuisines.map(cuisine => (
                                    <div key={cuisine.name} className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border">
                                            <Image
                                                src={cuisine.image}
                                                alt={cuisine.name}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                                data-ai-hint={cuisine.hint}
                                            />
                                        </div>
                                        <p className="text-xs font-medium text-center text-primary">{cuisine.name}</p>
                                    </div>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
  )
}
