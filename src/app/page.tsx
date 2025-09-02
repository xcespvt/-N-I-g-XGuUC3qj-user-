
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FoodieFindApp from '@/components/foodie-find-app';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Pizza, Sandwich, GlassWater } from 'lucide-react';

const foodIcons = [
  (props: React.SVGProps<SVGSVGElement>) => <Sandwich {...props} />,
  (props: React.SVGProps<SVGSVGElement>) => <Pizza {...props} />,
  (props: React.SVGProps<SVGSVGElement>) => <GlassWater {...props} />,
];

const FoodLoader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % foodIcons.length);
        }, 500);
        return () => clearInterval(interval);
    }, []);
    
    const Icon = foodIcons[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-16 w-16">
                 {foodIcons.map((Icon, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-300 ${
                            index === currentIndex ? 'opacity-100 animate-pop-in' : 'opacity-0'
                        }`}
                    >
                       <Icon className="h-16 w-16 text-primary" />
                    </div>
                ))}
            </div>
            <p className="font-semibold text-muted-foreground animate-pulse">Loading deliciousness...</p>
        </div>
    );
};


export default function Home() {
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage('hasSeenWelcomeScreen', false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    if (!hasSeenWelcome) {
      router.replace('/welcome');
    } else {
      setIsLoading(false);
    }
  }, [hasSeenWelcome, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <FoodLoader />
      </div>
    );
  }

  return (
    <main>
      <FoodieFindApp />
    </main>
  );
}
