"use client"

import { useCallback } from 'react';
import { ListFilter } from 'lucide-react';
import type { Filters } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

type FilterControlsProps = {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

export function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
  const handleFilterChange = useCallback((key: keyof Filters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  }, [filters, onFilterChange]);

  const uniqueCuisines = ['all', ...Array.from(new Set(
    ["North Indian, Mughlai", "Pizza, Italian", "Chinese, Thai", "American", "Indian", "Chinese"]
    .flatMap(c => c.split(', '))))];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <ListFilter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Adjust your preferences.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cuisine">Cuisine</Label>
              <Select
                value={filters.cuisine}
                onValueChange={(value) => handleFilterChange('cuisine', value)}
              >
                <SelectTrigger id="cuisine" className="col-span-2 h-8">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price">Price</Label>
              <Select
                value={filters.price}
                onValueChange={(value) => handleFilterChange('price', value)}
              >
                <SelectTrigger id="price" className="col-span-2 h-8">
                  <SelectValue placeholder="Select price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="cheap">Cheap</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="expensive">Expensive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label>Rating</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Slider
                  min={0}
                  max={5}
                  step={0.1}
                  value={[filters.rating]}
                  onValueChange={([value]) => handleFilterChange('rating', value)}
                />
                <span className="text-sm w-8 text-right">{filters.rating.toFixed(1)}</span>
              </div>
            </div>
             <div className="grid grid-cols-3 items-center gap-4">
              <Label>Delivery Time</Label>
              <div className="col-span-2 flex items-center gap-2">
                <Slider
                  min={0}
                  max={120}
                  step={5}
                  value={[filters.deliveryTime]}
                  onValueChange={([value]) => handleFilterChange('deliveryTime', value)}
                />
                <span className="text-sm w-12 text-right">{filters.deliveryTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
