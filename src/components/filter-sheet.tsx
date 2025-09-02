
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
  ArrowDownUp,
  Clock,
  Star,
  Receipt,
  ShieldCheck,
  X,
  Calendar,
  Timer,
  RefreshCcw,
  MapPin,
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

const filterCategories = [
  { id: 'sort', name: 'Sort', icon: ArrowDownUp },
  { id: 'dietary', name: 'Dietary', icon: ShieldCheck },
  { id: 'price', name: 'Price Range', icon: Receipt },
  { id: 'rating', name: 'Rating', icon: Star },
  { id: 'deliveryTime', name: 'Delivery Time', icon: Clock },
  { id: 'distance', name: 'Distance', icon: MapPin },
];

const FilterButton = ({
  label,
  icon,
  isSelected,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border-2 text-center transition-all duration-200',
      isSelected
        ? 'bg-primary/10 border-primary text-primary shadow-sm'
        : 'bg-white border-gray-200 hover:border-primary/50'
    )}
  >
    {icon}
    <span className="font-semibold text-xs">{label}</span>
  </button>
);

const PureVegIcon = () => (
    <div className="w-6 h-6 border-2 border-primary flex items-center justify-center rounded-sm"><div className="w-3 h-3 rounded-full bg-primary"></div></div>
);
const NonVegIcon = () => (
    <div className="w-6 h-6 border-2 border-red-600 flex items-center justify-center rounded-sm"><div className="w-3 h-3 rounded-full bg-red-600" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div></div>
);
const EggIcon = () => (
    <div className="w-6 h-6 border-2 border-orange-600 flex items-center justify-center rounded-sm"><div className="w-3 h-3 rounded-full bg-orange-600" ></div></div>
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
  const [activeCategory, setActiveCategory] = useState('sort');
  const [localFilters, setLocalFilters] = useState(filters);

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
  
  const handleDietaryClick = (option: 'veg' | 'non-veg' | 'egg') => {
      setLocalFilters(prev => {
          const newDietary = prev.dietary.includes(option)
            ? prev.dietary.filter(o => o !== option)
            : [...prev.dietary, option];
          return {...prev, dietary: newDietary};
      });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] w-full rounded-t-2xl p-0 flex flex-col"
        hideCloseButton
      >
        <SheetHeader className="p-4 border-b flex-row items-center justify-between">
          <SheetTitle>Filters and sorting</SheetTitle>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-primary font-bold p-0 h-auto" onClick={handleClearAll}>
              Clear all
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </SheetHeader>
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-1/4 bg-gray-50 border-r overflow-y-auto">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'w-full p-3 flex flex-col items-center gap-1 text-center text-xs font-medium border-l-4',
                  activeCategory === cat.id
                    ? 'bg-white border-primary text-primary'
                    : 'border-transparent text-gray-600'
                )}
              >
                <cat.icon className="h-6 w-6" />
                <span>{cat.name}</span>
              </button>
            ))}
          </aside>
          <main className="w-3/4 overflow-y-auto p-4 space-y-6">
            {activeCategory === 'sort' && (
              <div>
                <h3 className="text-lg font-bold mb-3">Sort by</h3>
                 <Select value={localFilters.cuisine} onValueChange={(v) => setLocalFilters(f => ({...f, cuisine: v}))}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Relevance</SelectItem>
                    <SelectItem value="rating">Rating: High to Low</SelectItem>
                    <SelectItem value="deliveryTime">Delivery Time: Low to High</SelectItem>
                    <SelectItem value="price-low-high">Cost: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Cost: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {activeCategory === 'dietary' && (
              <div>
                <h3 className="text-lg font-bold mb-3">Dietary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <FilterButton
                    label="Veg"
                    icon={<PureVegIcon />}
                    isSelected={localFilters.dietary.includes('veg')}
                    onClick={() => handleDietaryClick('veg')}
                  />
                  <FilterButton
                    label="Non-Veg"
                    icon={<NonVegIcon />}
                    isSelected={localFilters.dietary.includes('non-veg')}
                    onClick={() => handleDietaryClick('non-veg')}
                  />
                   <FilterButton
                    label="Serves Egg"
                    icon={<EggIcon />}
                    isSelected={localFilters.dietary.includes('egg')}
                    onClick={() => handleDietaryClick('egg')}
                  />
                </div>
              </div>
            )}
             {activeCategory === 'price' && (
              <div>
                <h3 className="text-lg font-bold mb-3">Price Range</h3>
                <div className="grid grid-cols-3 gap-3">
                  <FilterButton
                    label="Under ₹500"
                    icon={<span className="font-bold text-primary">₹</span>}
                    isSelected={localFilters.price === 'cheap'}
                    onClick={() => setLocalFilters(f => ({...f, price: 'cheap'}))}
                  />
                  <FilterButton
                    label="₹500-₹1000"
                    icon={<span className="font-bold text-primary">₹₹</span>}
                    isSelected={localFilters.price === 'moderate'}
                    onClick={() => setLocalFilters(f => ({...f, price: 'moderate'}))}
                  />
                   <FilterButton
                    label="Above ₹1000"
                    icon={<span className="font-bold text-primary">₹₹₹</span>}
                    isSelected={localFilters.price === 'expensive'}
                    onClick={() => setLocalFilters(f => ({...f, price: 'expensive'}))}
                  />
                </div>
              </div>
            )}
            {activeCategory === 'rating' && (
              <div>
                <h3 className="text-lg font-bold mb-3">Restaurant Rating</h3>
                 <div className="p-2">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Minimum Rating</span>
                          <span className="font-bold">{localFilters.rating.toFixed(1)} <Star className="inline h-4 w-4 -mt-1 text-yellow-500 fill-yellow-500" /></span>
                      </div>
                      <Slider
                          value={[localFilters.rating]}
                          max={5}
                          min={0}
                          step={0.1}
                          onValueChange={(value) => setLocalFilters(f => ({...f, rating: value[0]}))}
                      />
                  </div>
              </div>
            )}
            {activeCategory === 'deliveryTime' && (
              <div>
                  <h3 className="text-lg font-bold mb-3">Max Delivery Time</h3>
                  <div className="p-2">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Time</span>
                          <span className="font-bold">{localFilters.deliveryTime} mins</span>
                      </div>
                      <Slider
                          value={[localFilters.deliveryTime]}
                          max={120}
                          min={5}
                          step={5}
                          onValueChange={(value) => setLocalFilters(f => ({...f, deliveryTime: value[0]}))}
                      />
                  </div>
              </div>
            )}
            {activeCategory === 'distance' && (
              <div>
                  <h3 className="text-lg font-bold mb-3">Max Distance</h3>
                  <div className="p-2">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Distance</span>
                          <span className="font-bold">{localFilters.distance.toFixed(1)} km</span>
                      </div>
                      <Slider
                          value={[localFilters.distance]}
                          max={14}
                          min={1}
                          step={0.5}
                          onValueChange={(value) => setLocalFilters(f => ({...f, distance: value[0]}))}
                      />
                  </div>
              </div>
            )}
          </main>
        </div>
        <div className="p-4 border-t flex items-center gap-3">
          <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-lg font-bold" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
