// Image constants for FoodieFindApp
// This file provides easy access to all food and restaurant images

export const FOOD_IMAGES = {
  // Main Courses
  PIZZA_MARGHERITA: '/images/pizza-margherita.jpg',
  BURGER_GOURMET: '/images/burger-gourmet.jpg',
  PASTA_CARBONARA: '/images/pasta-carbonara.jpg',
  SUSHI_PLATTER: '/images/sushi-platter.jpg',
  TACOS_MEXICAN: '/images/tacos-mexican.jpg',
  
  // Desserts
  CHOCOLATE_CAKE: '/images/chocolate-cake.jpg',
  ICE_CREAM_SUNDAE: '/images/ice-cream-sundae.jpg',
  
  // Beverages
  COFFEE_LATTE_ART: '/images/coffee-latte-art.jpg',
  FRESH_SMOOTHIE: '/images/fresh-smoothie.jpg',
} as const;

export const RESTAURANT_IMAGES = {
  // Interiors
  MODERN_INTERIOR: '/images/restaurant-modern-interior.jpg',
  COZY_CAFE: '/images/cafe-cozy-interior.jpg',
  FINE_DINING: '/images/fine-dining-restaurant.jpg',
  
  // Exteriors
  STOREFRONT: '/images/restaurant-storefront.jpg',
  OUTDOOR_PATIO: '/images/outdoor-dining-patio.jpg',
  
  // Kitchen & Chef
  CHEF_COOKING: '/images/chef-cooking.jpg',
  RESTAURANT_KITCHEN: '/images/restaurant-kitchen.jpg',
} as const;

export const BRAND_IMAGES = {
  KFC: '/images/feature brand/kfc.jpg',
  WENDYS: '/images/feature brand/wendys.jpg',
  MCDONALDS: '/images/feature brand/mcdonalds.jpg',
  DOMINOS: '/images/feature brand/dominos.jpg',
  STARBUCKS: '/images/feature brand/starbusks1.jpg',
  BURGERKING: '/images/feature brand/burgerking.jpg',
} as const;

// Combined object for easy access
export const IMAGES = {
  FOOD: FOOD_IMAGES,
  RESTAURANT: RESTAURANT_IMAGES,
  BRAND: BRAND_IMAGES,
} as const;

// Helper function to get random food image
export const getRandomFoodImage = (): string => {
  const foodImages = Object.values(FOOD_IMAGES);
  return foodImages[Math.floor(Math.random() * foodImages.length)];
};

// Helper function to get random brand image
export const getRandomBrandImage = (): string => {
  const brandImages = Object.values(BRAND_IMAGES);
  return brandImages[Math.floor(Math.random() * brandImages.length)];
};

// Helper function to get random restaurant image
export const getRandomRestaurantImage = (): string => {
  const restaurantImages = Object.values(RESTAURANT_IMAGES);
  return restaurantImages[Math.floor(Math.random() * restaurantImages.length)];
};

// Helper function to get brand image by restaurant name
export const getBrandImage = (restaurantName: string): string => {
  const name = restaurantName.toLowerCase();
  if (name.includes('kfc')) return BRAND_IMAGES.KFC;
  if (name.includes('wendy')) return BRAND_IMAGES.WENDYS;
  if (name.includes('mcdonald')) return BRAND_IMAGES.MCDONALDS;
  if (name.includes('domino')) return BRAND_IMAGES.DOMINOS;
  if (name.includes('starbucks')) return BRAND_IMAGES.STARBUCKS;
  if (name.includes('burger king')) return BRAND_IMAGES.BURGERKING;
  
  // Additional brand name variations
  if (name.includes('mc donald')) return BRAND_IMAGES.MCDONALDS;
  if (name.includes('burger-king')) return BRAND_IMAGES.BURGERKING;
  if (name.includes('dominos')) return BRAND_IMAGES.DOMINOS;
  
  return getRandomFoodImage(); // fallback to random food image
};

// Image categories for filtering
export const IMAGE_CATEGORIES = {
  MAIN_COURSES: [
    FOOD_IMAGES.PIZZA_MARGHERITA,
    FOOD_IMAGES.BURGER_GOURMET,
    FOOD_IMAGES.PASTA_CARBONARA,
    FOOD_IMAGES.SUSHI_PLATTER,
    FOOD_IMAGES.TACOS_MEXICAN,
  ],
  DESSERTS: [
    FOOD_IMAGES.CHOCOLATE_CAKE,
    FOOD_IMAGES.ICE_CREAM_SUNDAE,
  ],
  BEVERAGES: [
    FOOD_IMAGES.COFFEE_LATTE_ART,
    FOOD_IMAGES.FRESH_SMOOTHIE,
  ],
  RESTAURANT_INTERIORS: [
    RESTAURANT_IMAGES.MODERN_INTERIOR,
    RESTAURANT_IMAGES.COZY_CAFE,
    RESTAURANT_IMAGES.FINE_DINING,
  ],
  RESTAURANT_EXTERIORS: [
    RESTAURANT_IMAGES.STOREFRONT,
    RESTAURANT_IMAGES.OUTDOOR_PATIO,
  ],
  KITCHEN: [
    RESTAURANT_IMAGES.CHEF_COOKING,
    RESTAURANT_IMAGES.RESTAURANT_KITCHEN,
  ],
} as const;
