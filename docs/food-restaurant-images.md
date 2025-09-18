# Food and Restaurant Images for FoodieFindApp

## Recommended Food Images to Add

### Main Course Foods
1. **pizza-margherita.jpg** - Classic margherita pizza with fresh basil
   - Source: Unsplash/Pexels - Search "margherita pizza"
   - Recommended size: 1200x800px

2. **burger-gourmet.jpg** - Gourmet burger with fries
   - Source: Unsplash/Pexels - Search "gourmet burger"
   - Recommended size: 1200x800px

3. **pasta-carbonara.jpg** - Creamy pasta carbonara
   - Source: Unsplash/Pexels - Search "pasta carbonara"
   - Recommended size: 1200x800px

4. **sushi-platter.jpg** - Assorted sushi platter
   - Source: Unsplash/Pexels - Search "sushi platter"
   - Recommended size: 1200x800px

5. **tacos-mexican.jpg** - Colorful Mexican tacos
   - Source: Unsplash/Pexels - Search "mexican tacos"
   - Recommended size: 1200x800px

### Desserts
6. **chocolate-cake.jpg** - Rich chocolate cake slice
   - Source: Unsplash/Pexels - Search "chocolate cake"
   - Recommended size: 1200x800px

7. **ice-cream-sundae.jpg** - Colorful ice cream sundae
   - Source: Unsplash/Pexels - Search "ice cream sundae"
   - Recommended size: 1200x800px

### Beverages
8. **coffee-latte-art.jpg** - Coffee with latte art
   - Source: Unsplash/Pexels - Search "latte art coffee"
   - Recommended size: 1200x800px

9. **fresh-smoothie.jpg** - Colorful fruit smoothie
   - Source: Unsplash/Pexels - Search "fruit smoothie"
   - Recommended size: 1200x800px

## Recommended Restaurant Images to Add

### Restaurant Interiors
1. **restaurant-modern-interior.jpg** - Modern restaurant dining area
   - Source: Unsplash/Pexels - Search "modern restaurant interior"
   - Recommended size: 1200x800px

2. **cafe-cozy-interior.jpg** - Cozy cafe with warm lighting
   - Source: Unsplash/Pexels - Search "cozy cafe interior"
   - Recommended size: 1200x800px

3. **fine-dining-restaurant.jpg** - Elegant fine dining setup
   - Source: Unsplash/Pexels - Search "fine dining restaurant"
   - Recommended size: 1200x800px

### Restaurant Exteriors
4. **restaurant-storefront.jpg** - Attractive restaurant storefront
   - Source: Unsplash/Pexels - Search "restaurant storefront"
   - Recommended size: 1200x800px

5. **outdoor-dining-patio.jpg** - Restaurant outdoor seating area
   - Source: Unsplash/Pexels - Search "restaurant patio dining"
   - Recommended size: 1200x800px

### Kitchen & Chef Images
6. **chef-cooking.jpg** - Professional chef cooking
   - Source: Unsplash/Pexels - Search "chef cooking kitchen"
   - Recommended size: 1200x800px

7. **restaurant-kitchen.jpg** - Professional restaurant kitchen
   - Source: Unsplash/Pexels - Search "restaurant kitchen"
   - Recommended size: 1200x800px

## How to Download and Add Images

### Step 1: Download Images
1. Visit [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com)
2. Search for each image using the provided search terms
3. Download high-resolution versions (preferably 1200x800px or larger)
4. Rename files according to the suggested filenames above

### Step 2: Add to Project
1. Save all downloaded images to: `/public/images/`
2. Ensure file formats are web-optimized (JPG or WebP preferred)
3. Keep file sizes under 500KB for optimal performance

### Step 3: Usage in Components
Images can be referenced in your React components like this:

```tsx
import Image from 'next/image';

// Example usage
<Image 
  src="/images/pizza-margherita.jpg" 
  alt="Delicious Margherita Pizza"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

## Image Categories for Easy Organization

### Food Categories:
- **main-courses/**: pizza, burger, pasta, sushi, tacos
- **desserts/**: cake, ice-cream
- **beverages/**: coffee, smoothie

### Restaurant Categories:
- **interiors/**: modern, cozy, fine-dining
- **exteriors/**: storefront, patio
- **kitchen/**: chef, professional-kitchen

## License Information
- All recommended sources (Unsplash, Pexels) provide free-to-use images
- No attribution required for most images, but check individual licenses
- Suitable for commercial use in your FoodieFindApp

## Next Steps
1. Download the recommended images
2. Add them to your `/public/images/` directory
3. Update your components to use these new images
4. Consider creating image constants file for easy reference
