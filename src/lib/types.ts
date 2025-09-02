

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: number; // in minutes
  priceRange: 'cheap' | 'moderate' | 'expensive';
  priceForTwo: number;
  promotion?: string;
  reviews: string;
  location: string;
  distance: number; // in km
  opensAt: string;
  tags?: string[];
  extraOffer?: string;
};

export type Filters = {
  cuisine: string;
  price: string;
  rating: number;
  deliveryTime: number;
  distance: number;
  dietary: ('veg' | 'non-veg' | 'egg')[];
};

export type Offer = {
  restaurant: string;
  title: string;
  subtitle: string;
  image: string;
  logo: string;
  hint: string;
};

export type Order = {
  restaurantName: string;
  cuisine: string;
  date: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  items: string[];
  orderType: 'Delivery' | 'Takeaway' | 'Dine-in' | 'Booking' | 'Booking with Pre-order';
};

export type Review = {
  id: string;
  restaurantId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  images?: string[];
};

export type BookingDetails = {
    restaurantId: string;
    restaurantName: string;
    guests: string;
    date: string;
    time: string;
}
