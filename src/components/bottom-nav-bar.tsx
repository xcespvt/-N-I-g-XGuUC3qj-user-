
"use client";

import { useState, useEffect } from 'react';
import { Soup, Home, UtensilsCrossed, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Food', icon: Soup },
  { name: 'Homemade', icon: Home },
  { name: 'Dine-in', icon: UtensilsCrossed },
  { name: 'Reorder', icon: History },
];

type BottomNavBarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
};

export function BottomNavBar({ activeItem, setActiveItem }: BottomNavBarProps) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10; // 10px buffer

        if (isAtBottom) {
          setShowNav(true);
        } else if (window.scrollY > lastScrollY && window.scrollY > 50) { // if scroll down hide the navbar
          setShowNav(false);
        } else { // if scroll up show the navbar
          setShowNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);


  return (
    <footer className={cn(
      "fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.08)] z-50 transition-transform duration-300 ease-in-out",
      showNav ? "translate-y-0" : "translate-y-full"
    )}>
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs font-medium flex-1 py-2 transition-colors',
              activeItem === item.name
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
}
