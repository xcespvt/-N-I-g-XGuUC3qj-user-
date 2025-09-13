'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IMAGES, IMAGE_CATEGORIES, getRandomFoodImage } from '@/lib/image-constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FoodGalleryProps {
  category?: 'all' | 'main_courses' | 'desserts' | 'beverages' | 'restaurants';
  showControls?: boolean;
}

export default function FoodGallery({ category = 'all', showControls = true }: FoodGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState(category);

  const getImagesForCategory = (cat: string) => {
    switch (cat) {
      case 'main_courses':
        return IMAGE_CATEGORIES.MAIN_COURSES.map(src => ({ src, type: 'food', category: 'Main Course' }));
      case 'desserts':
        return IMAGE_CATEGORIES.DESSERTS.map(src => ({ src, type: 'food', category: 'Dessert' }));
      case 'beverages':
        return IMAGE_CATEGORIES.BEVERAGES.map(src => ({ src, type: 'food', category: 'Beverage' }));
      case 'restaurants':
        return [
          ...IMAGE_CATEGORIES.RESTAURANT_INTERIORS.map(src => ({ src, type: 'restaurant', category: 'Interior' })),
          ...IMAGE_CATEGORIES.RESTAURANT_EXTERIORS.map(src => ({ src, type: 'restaurant', category: 'Exterior' })),
          ...IMAGE_CATEGORIES.KITCHEN.map(src => ({ src, type: 'restaurant', category: 'Kitchen' })),
        ];
      default:
        return [
          ...IMAGE_CATEGORIES.MAIN_COURSES.map(src => ({ src, type: 'food', category: 'Main Course' })),
          ...IMAGE_CATEGORIES.DESSERTS.map(src => ({ src, type: 'food', category: 'Dessert' })),
          ...IMAGE_CATEGORIES.BEVERAGES.map(src => ({ src, type: 'food', category: 'Beverage' })),
          ...IMAGE_CATEGORIES.RESTAURANT_INTERIORS.map(src => ({ src, type: 'restaurant', category: 'Interior' })),
          ...IMAGE_CATEGORIES.RESTAURANT_EXTERIORS.map(src => ({ src, type: 'restaurant', category: 'Exterior' })),
          ...IMAGE_CATEGORIES.KITCHEN.map(src => ({ src, type: 'restaurant', category: 'Kitchen' })),
        ];
    }
  };

  const images = getImagesForCategory(selectedCategory);

  const getImageName = (src: string) => {
    return src.split('/').pop()?.replace('.jpg', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Image';
  };

  return (
    <div className="w-full space-y-6">
      {showControls && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={selectedCategory === 'main_courses' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('main_courses')}
            size="sm"
          >
            Main Courses
          </Button>
          <Button
            variant={selectedCategory === 'desserts' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('desserts')}
            size="sm"
          >
            Desserts
          </Button>
          <Button
            variant={selectedCategory === 'beverages' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('beverages')}
            size="sm"
          >
            Beverages
          </Button>
          <Button
            variant={selectedCategory === 'restaurants' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('restaurants')}
            size="sm"
          >
            Restaurants
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={image.src}
                  alt={getImageName(image.src)}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center`;
                  }}
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {image.category}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{getImageName(image.src)}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {image.type === 'food' ? '🍽️ Food' : '🏪 Restaurant'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images found for this category.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Add images to the /public/images/ directory to see them here.
          </p>
        </div>
      )}
    </div>
  );
}
