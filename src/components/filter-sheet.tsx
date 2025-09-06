
'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import {
  X,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from './ui/slider';
import type { Filters } from '@/lib/types';
import { Switch } from './ui/switch';

const Chip = ({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) => (
    <Button
        variant="outline"
        className={cn(
            "rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
            isSelected && "bg-primary/10 text-primary border-primary hover:bg-primary/20"
        )}
        onClick={onClick}
    >
        {label}
    </Button>
);

export function FilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isCuisineExpanded, setIsCuisineExpanded] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handleApply = () => {
      onFilterChange(localFilters);
      onOpenChange(false);
  }

  const handleClearAll = () => {
    const clearedFilters = {
      cuisine: 'all',
      price: 'all',
      rating: 0,
      deliveryTime: 120,
      distance: 14,
      dietary: [],
    };
    setLocalFilters(clearedFilters);
  };
  
  const handleCuisineClick = (cuisine: string) => {
    setLocalFilters(prev => ({...prev, cuisine: prev.cuisine === cuisine ? 'all' : cuisine}));
  }

  const allCuisines = [
    "North Indian", "Pizza", "Chinese", "South Indian", "American", "Thai", "Mughlai", "Italian", "Mexican", "Japanese", "Biryani"
  ];
  const visibleCuisines = isCuisineExpanded ? allCuisines : allCuisines.slice(0, 6);
  
  const dietaryOptions = ['Veg', 'Non-Veg', 'Egg', 'Vegan', 'Gluten-Free'];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] w-full rounded-t-2xl p-0 flex flex-col bg-white text-black border-gray-200"
        hideCloseButton
      >
        <SheetHeader className="p-4 flex-row items-center justify-between border-b border-gray-200">
          <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-primary hover:text-primary p-0 h-auto" onClick={handleClearAll}>
              Clear all
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Cuisines</h3>
                    <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setIsCuisineExpanded(!isCuisineExpanded)}>
                        {isCuisineExpanded ? 'Collapse' : 'Expand'}
                    </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {visibleCuisines.map(cuisine => (
                        <Chip 
                            key={cuisine}
                            label={cuisine}
                            isSelected={localFilters.cuisine === cuisine.toLowerCase()}
                            onClick={() => handleCuisineClick(cuisine.toLowerCase())}
                        />
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Dietary</h3>
                <div className="flex flex-wrap gap-3">
                    {dietaryOptions.map(option => (
                        <Chip 
                            key={option}
                            label={option}
                            isSelected={localFilters.dietary.includes(option.toLowerCase() as any)}
                            onClick={() => setLocalFilters(prev => {
                                const newDietary = prev.dietary.includes(option.toLowerCase() as any)
                                    ? prev.dietary.filter(o => o !== option.toLowerCase())
                                    : [...prev.dietary, option.toLowerCase() as any];
                                return {...prev, dietary: newDietary};
                            })}
                        />
                    ))}
                </div>
            </div>

            <div>
                 <h3 className="text-lg font-semibold text-gray-800 mb-3">Sort by</h3>
                 <Select value={localFilters.price} onValueChange={(v) => setLocalFilters(f => ({...f, price: v}))}>
                  <SelectTrigger className="w-full h-12 bg-gray-100 border-gray-200 text-black">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black border-gray-200">
                    <SelectItem value="all">Relevance</SelectItem>
                    <SelectItem value="rating">Rating: High to Low</SelectItem>
                    <SelectItem value="deliveryTime">Delivery Time: Low to High</SelectItem>
                    <SelectItem value="price-low-high">Cost: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Cost: High to Low</SelectItem>
                  </SelectContent>
                </Select>
            </div>

             <div>
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">Rating</h3>
                    <span className="text-sm text-gray-500">from {localFilters.rating.toFixed(1)} to 5.0</span>
                </div>
                 <Slider
                    value={[localFilters.rating]}
                    max={5}
                    min={0}
                    step={0.1}
                    onValueChange={(value) => setLocalFilters(f => ({...f, rating: value[0]}))}
                    className="[&>span]:bg-primary [&>div]:bg-gray-200"
                />
            </div>
            
            <div className="flex justify-between items-center">
                 <h3 className="text-lg font-semibold text-gray-800">Pure Veg Only</h3>
                 <Switch 
                    checked={localFilters.dietary.includes('veg')}
                    onCheckedChange={(checked) => setLocalFilters(prev => {
                        const newDietary = checked
                            ? [...prev.dietary, 'veg']
                            : prev.dietary.filter(o => o !== 'veg');
                        return {...prev, dietary: Array.from(new Set(newDietary))};
                    })}
                 />
            </div>

        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <Button className="w-full h-14 bg-primary text-white text-lg font-bold hover:bg-primary/90" onClick={handleApply}>
            Show Results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
