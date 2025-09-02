
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    image: 'https://picsum.photos/800/1200',
    hint: 'restaurant food',
    title: 'Order Restaurant Food',
    description: 'Discover & order from your favorite restaurants anytime.',
  },
  {
    image: 'https://picsum.photos/800/1200',
    hint: 'homemade meal',
    title: 'Homemade Food',
    description: 'Enjoy authentic, homemade meals made with love.',
  },
  {
    image: 'https://picsum.photos/800/1200',
    hint: 'food savings',
    title: 'Save up to 60%',
    description: 'Delicious food at affordable prices, always.',
  },
  {
    image: 'https://picsum.photos/800/1200',
    hint: 'restaurant booking',
    title: 'Dine-In & Booking',
    description: 'Reserve tables instantly & skip the wait.',
  },
  {
    image: 'https://picsum.photos/800/1200',
    hint: 'food delivery',
    title: 'Delivery & Takeaway',
    description: 'Fast delivery or quick pickup — your choice.',
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setHasSeenWelcome] = useLocalStorage('hasSeenWelcomeScreen', false);

  const updateSelectedIndex = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', updateSelectedIndex);
    }
  }, [emblaApi, updateSelectedIndex]);
  
  const handleNext = () => {
    if (emblaApi) {
        if (emblaApi.canScrollNext()) {
            emblaApi.scrollNext();
        } else {
            handleDone();
        }
    }
  };

  const handleDone = () => {
    setHasSeenWelcome(true);
    router.replace('/login');
  };

  return (
    <div className="relative h-screen w-full bg-background flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-2/5 bg-primary rounded-b-[4rem]" />
      
        <div className="absolute top-6 right-6 z-20">
            <Button variant="ghost" className="text-white font-semibold" onClick={handleDone}>
                Skip
            </Button>
        </div>

        <div className="flex-1 overflow-hidden pt-16" ref={emblaRef}>
            <div className="flex h-full">
            {slides.map((slide, index) => (
                <div key={index} className="relative flex-[0_0_100%] min-w-0 px-6">
                    <div className="relative h-full w-full rounded-3xl shadow-2xl overflow-hidden">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            data-ai-hint={slide.hint}
                        />
                    </div>
                </div>
            ))}
            </div>
        </div>

        <div className="bg-background pt-8 pb-6 px-6 text-center rounded-t-3xl z-10">
            <div className="flex justify-center gap-2 mb-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={cn(
                        'h-2 w-2 rounded-full transition-all duration-300',
                        selectedIndex === index ? 'w-6 bg-primary' : 'bg-gray-300'
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            <h2 className="text-2xl font-bold text-foreground">{slides[selectedIndex].title}</h2>
            <p className="mt-2 text-muted-foreground mx-auto max-w-xs">{slides[selectedIndex].description}</p>
            <Button 
                className="mt-8 w-full h-14 bg-primary text-primary-foreground text-lg font-bold rounded-xl"
                onClick={handleNext}
            >
                {selectedIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                {selectedIndex < slides.length - 1 && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
      </div>
    </div>
  );
}
