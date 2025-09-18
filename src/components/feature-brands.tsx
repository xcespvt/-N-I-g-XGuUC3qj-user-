'use client';

import React from 'react';
import Image from 'next/image';
import { BRAND_IMAGES } from '@/lib/image-constants';

interface FeatureBrand {
  name: string;
  image: string;
  description: string;
}

const featureBrands: FeatureBrand[] = [
  {
    name: 'KFC',
    image: BRAND_IMAGES.KFC,
    description: 'Finger Lickin\' Good'
  },
  {
    name: 'McDonald\'s',
    image: BRAND_IMAGES.MCDONALDS,
    description: 'I\'m Lovin\' It'
  },
  {
    name: 'Burger King',
    image: BRAND_IMAGES.BURGERKING,
    description: 'Have It Your Way'
  },
  {
    name: 'Domino\'s',
    image: BRAND_IMAGES.DOMINOS,
    description: 'Oh Yes We Did'
  },
  {
    name: 'Starbucks',
    image: BRAND_IMAGES.STARBUCKS,
    description: 'To inspire and nurture the human spirit'
  },
  {
    name: 'Wendy\'s',
    image: BRAND_IMAGES.WENDYS,
    description: 'Where\'s the beef?'
  }
];

interface FeatureBrandsProps {
  title?: string;
  showDescription?: boolean;
  gridCols?: 2 | 3 | 4 | 6;
  className?: string;
}

export function FeatureBrands({ 
  title = "Featured Brands", 
  showDescription = true,
  gridCols = 3,
  className = ""
}: FeatureBrandsProps) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  };

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          {title}
        </h2>
      )}
      
      <div className={`grid ${gridClass[gridCols]} gap-6`}>
        {featureBrands.map((brand) => (
          <div
            key={brand.name}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {brand.name}
                </h3>
                {showDescription && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {brand.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Individual brand card component for more flexibility
interface BrandCardProps {
  brand: FeatureBrand;
  onClick?: () => void;
  className?: string;
}

export function BrandCard({ brand, onClick, className = "" }: BrandCardProps) {
  return (
    <div
      className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${className}`}
      onClick={onClick}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            {brand.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {brand.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Export the brands data for use in other components
export { featureBrands };
export type { FeatureBrand };
