'use client';

import FoodGallery from '@/components/food-gallery';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Food & Restaurant Gallery</h1>
            <p className="text-muted-foreground">
              Browse our collection of high-quality food and restaurant images
            </p>
          </div>
        </div>
        
        <FoodGallery />
      </div>
    </div>
  );
}
