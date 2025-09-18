#!/bin/bash

# Script to download recommended food and restaurant images for FoodieFindApp
# This script provides direct download links from Unsplash for high-quality images

echo "🍽️ FoodieFindApp Image Downloader"
echo "================================="
echo ""

# Create images directory if it doesn't exist
mkdir -p ../public/images

echo "📁 Created/verified images directory"
echo ""

# Food Images - Direct Unsplash download URLs (1200x800)
echo "🍕 Downloading food images..."

# Pizza Margherita
curl -L "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&h=800&fit=crop&crop=center" -o "../public/images/pizza-margherita.jpg"
echo "✅ Downloaded: pizza-margherita.jpg"

# Gourmet Burger
curl -L "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=800&fit=crop&crop=center" -o "../public/images/burger-gourmet.jpg"
echo "✅ Downloaded: burger-gourmet.jpg"

# Pasta Carbonara
curl -L "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=1200&h=800&fit=crop&crop=center" -o "../public/images/pasta-carbonara.jpg"
echo "✅ Downloaded: pasta-carbonara.jpg"

# Sushi Platter
curl -L "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=800&fit=crop&crop=center" -o "../public/images/sushi-platter.jpg"
echo "✅ Downloaded: sushi-platter.jpg"

# Mexican Tacos
curl -L "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=800&fit=crop&crop=center" -o "../public/images/tacos-mexican.jpg"
echo "✅ Downloaded: tacos-mexican.jpg"

# Chocolate Cake
curl -L "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=800&fit=crop&crop=center" -o "../public/images/chocolate-cake.jpg"
echo "✅ Downloaded: chocolate-cake.jpg"

# Ice Cream Sundae
curl -L "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=800&fit=crop&crop=center" -o "../public/images/ice-cream-sundae.jpg"
echo "✅ Downloaded: ice-cream-sundae.jpg"

# Coffee Latte Art
curl -L "https://images.unsplash.com/photo-1545665277-5937750d6850?w=1200&h=800&fit=crop&crop=center" -o "../public/images/coffee-latte-art.jpg"
echo "✅ Downloaded: coffee-latte-art.jpg"

# Fresh Smoothie
curl -L "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=1200&h=800&fit=crop&crop=center" -o "../public/images/fresh-smoothie.jpg"
echo "✅ Downloaded: fresh-smoothie.jpg"

echo ""
echo "🏪 Downloading restaurant images..."

# Modern Restaurant Interior
curl -L "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&crop=center" -o "../public/images/restaurant-modern-interior.jpg"
echo "✅ Downloaded: restaurant-modern-interior.jpg"

# Cozy Cafe Interior
curl -L "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop&crop=center" -o "../public/images/cafe-cozy-interior.jpg"
echo "✅ Downloaded: cafe-cozy-interior.jpg"

# Fine Dining Restaurant
curl -L "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&crop=center" -o "../public/images/fine-dining-restaurant.jpg"
echo "✅ Downloaded: fine-dining-restaurant.jpg"

# Restaurant Storefront
curl -L "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop&crop=center" -o "../public/images/restaurant-storefront.jpg"
echo "✅ Downloaded: restaurant-storefront.jpg"

# Outdoor Dining Patio
curl -L "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=800&fit=crop&crop=center" -o "../public/images/outdoor-dining-patio.jpg"
echo "✅ Downloaded: outdoor-dining-patio.jpg"

# Chef Cooking
curl -L "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&h=800&fit=crop&crop=center" -o "../public/images/chef-cooking.jpg"
echo "✅ Downloaded: chef-cooking.jpg"

# Restaurant Kitchen
curl -L "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&crop=center" -o "../public/images/restaurant-kitchen.jpg"
echo "✅ Downloaded: restaurant-kitchen.jpg"

echo ""
echo "🎉 All images downloaded successfully!"
echo "📊 Total images: 16 (9 food + 7 restaurant)"
echo "📁 Location: public/images/"
echo ""
echo "Next steps:"
echo "1. Check the downloaded images in your public/images/ directory"
echo "2. Use the FoodGallery component to display them"
echo "3. Import IMAGES from @/lib/image-constants for easy access"
echo ""
echo "Happy coding! 🚀"
