
'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2, Star, Clock, MapPin, Phone, Utensils, ChevronRight, ChevronDown, Users, Armchair, Camera, Wifi, ParkingSquare, Wine, Cigarette, Baby, Search, Mic, Plus, Minus, Book, ShoppingBag, X, Ticket, AppWindow, Store, Gamepad2, Clapperboard, Music, Tv, Gamepad, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { offers, restaurants } from '@/lib/mock-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PromotionCarousel } from '@/components/promotion-carousel';


const menuItems = [
    { category: "Treat Time", items: [
      { id: "treat1", name: "Mini Peri Peri Punjabi Aloo Samosa", price: 109, originalPrice: 129, isVeg: true, description: "Three mini aloo samosas with peri peri masala.", image: "https://placehold.co/300x300.png", hint: "samosa indian food", tags: ["Bestseller"], portion: "3 Pieces" },
      { id: "treat2", name: "Mini Punjabi Aloo Samosa", price: 109, originalPrice: 129, isVeg: true, description: "As classic as samosa gets, comes with chutn...", image: "https://placehold.co/300x300.png", hint: "samosa indian food", portion: "3 Pieces" },
      { id: "treat3", name: "Dark Chocolate Shake", price: 189, originalPrice: 209, isVeg: true, description: "Creamy, decadent milkshake.", image: "https://placehold.co/300x300.png", hint: "chocolate milkshake", portion: "450 ml" },
    ]},
    { category: "Crispy Classics", items: [
      { id: "crispy1", name: "Classic Fries", price: 129, originalPrice: 149, isVeg: true, description: "Perfectly salted crispy fries.", image: "https://placehold.co/300x300.png", hint: "french fries", tags: ["Bestseller"], portion: "Serves 1" },
      { id: "crispy2", name: "Peri Peri Fries", price: 139, originalPrice: 159, isVeg: true, description: "Crispy fries with a spicy peri peri kick.", image: "https://placehold.co/300x300.png", hint: "spicy french fries", portion: "Serves 1" },
    ]},
    { category: "Starters", items: [
        { id: "starter1", name: "Paneer Tikka", price: 249, originalPrice: 299, isVeg: true, description: "Marinated cottage cheese grilled to perfection.", image: "https://placehold.co/300x300.png", hint: "paneer tikka starter", portion: "6 Pieces" },
        { id: "starter2", name: "Hara Bhara Kebab", price: 219, originalPrice: 259, isVeg: true, description: "Spinach and vegetable patties, deep-fried.", image: "https://placehold.co/300x300.png", hint: "kebab starter", portion: "6 Pieces" },
        { id: "starter3", name: "Chicken 65", price: 289, originalPrice: 329, isVeg: false, description: "Spicy, deep-fried chicken appetizer.", image: "https://placehold.co/300x300.png", hint: "chicken appetizer", tags: ["Bestseller"], portion: "Serves 1" },
        { id: "starter4", name: "Chilli Chicken", price: 279, originalPrice: 319, isVeg: false, description: "Indo-Chinese style spicy chicken.", image: "https://placehold.co/300x300.png", hint: "chilli chicken", portion: "Serves 1" },
        { id: "starter5", name: "Fish Fry", price: 349, originalPrice: 399, isVeg: false, description: "Crispy fried fish with Indian spices.", image: "https://placehold.co/300x300.png", hint: "fish fry", portion: "4 Pieces" },
      ]},
    { category: "Main Course", items: [
        { id: "main1", name: "Dal Makhani", price: 299, originalPrice: 349, isVeg: true, description: "Creamy black lentils cooked overnight.", image: "https://placehold.co/300x300.png", hint: "dal makhani", tags: ["Bestseller"], portion: "Serves 2" },
        { id: "main2", name: "Paneer Butter Masala", price: 329, originalPrice: 379, isVeg: true, description: "Rich and creamy tomato-based paneer curry.", image: "https://placehold.co/300x300.png", hint: "paneer butter masala", portion: "Serves 2" },
        { id: "main3", name: "Kadai Paneer", price: 319, originalPrice: 369, isVeg: true, description: "Spicy paneer curry with bell peppers.", image: "https://placehold.co/300x300.png", hint: "kadai paneer", portion: "Serves 2" },
        { id: "main4", name: "Butter Chicken", price: 389, originalPrice: 439, isVeg: false, description: "Classic creamy chicken in tomato gravy.", image: "https://placehold.co/300x300.png", hint: "butter chicken", tags: ["Bestseller"], portion: "Serves 2" },
        { id: "main5", name: "Chicken Tikka Masala", price: 399, originalPrice: 449, isVeg: false, description: "Grilled chicken in a spicy tomato sauce.", image: "https://placehold.co/300x300.png", hint: "chicken tikka masala", portion: "Serves 2" },
        { id: "main6", name: "Mutton Rogan Josh", price: 449, originalPrice: 499, isVeg: false, description: "Aromatic lamb curry from Kashmir.", image: "https://placehold.co/300x300.png", hint: "mutton curry", portion: "Serves 2" },
    ]},
    { category: "Biryani", items: [
        { id: "biryani1", name: "Veg Hyderabadi Biryani", price: 289, originalPrice: 329, isVeg: true, description: "Aromatic rice dish with mixed vegetables.", image: "https://placehold.co/300x300.png", hint: "veg biryani", portion: "Serves 1" },
        { id: "biryani2", name: "Paneer Tikka Biryani", price: 309, originalPrice: 359, isVeg: true, description: "Biryani with chunks of grilled paneer.", image: "https://placehold.co/300x300.png", hint: "paneer biryani", portion: "Serves 1" },
        { id: "biryani3", name: "Chicken Dum Biryani", price: 349, originalPrice: 399, isVeg: false, description: "Slow-cooked chicken and rice biryani.", image: "https://placehold.co/300x300.png", hint: "chicken biryani", tags: ["Bestseller"], portion: "Serves 1" },
        { id: "biryani4", name: "Mutton Biryani", price: 419, originalPrice: 469, isVeg: false, description: "Flavorful biryani with tender mutton pieces.", image: "https://placehold.co/300x300.png", hint: "mutton biryani", portion: "Serves 1" },
    ]},
    { category: "Breads", items: [
        { id: "bread1", name: "Tandoori Roti", price: 40, originalPrice: 50, isVeg: true, description: "Whole wheat bread baked in a tandoor.", image: "https://placehold.co/300x300.png", hint: "indian bread", portion: "1 Piece" },
        { id: "bread2", name: "Butter Naan", price: 60, originalPrice: 75, isVeg: true, description: "Soft leavened bread with butter.", image: "https://placehold.co/300x300.png", hint: "naan bread", tags: ["Bestseller"], portion: "1 Piece" },
        { id: "bread3", name: "Garlic Naan", price: 70, originalPrice: 85, isVeg: true, description: "Naan bread flavored with garlic.", image: "https://placehold.co/300x300.png", hint: "garlic naan", portion: "1 Piece" },
        { id: "bread4", name: "Lachha Paratha", price: 65, originalPrice: 80, isVeg: true, description: "Layered whole wheat bread.", image: "https://placehold.co/300x300.png", hint: "paratha bread", portion: "1 Piece" },
    ]},
    { category: "Desserts", items: [
        { id: "dessert1", name: "Gulab Jamun", price: 99, originalPrice: 119, isVeg: true, description: "Soft, spongy balls in sugar syrup.", image: "https://placehold.co/300x300.png", hint: "indian dessert", portion: "2 Pieces" },
        { id: "dessert2", name: "Ras Malai", price: 129, originalPrice: 149, isVeg: true, description: "Cottage cheese dumplings in creamy milk.", image: "https://placehold.co/300x300.png", hint: "indian sweet", portion: "2 Pieces" },
        { id: "dessert3", name: "Chocolate Brownie", price: 149, originalPrice: 179, isVeg: true, description: "Fudgy chocolate brownie with nuts.", image: "https://placehold.co/300x300.png", hint: "chocolate brownie", portion: "1 Piece" },
        { id: "dessert4", name: "Ice Cream", price: 109, originalPrice: 129, isVeg: true, description: "Choice of vanilla, chocolate, or strawberry.", image: "https://placehold.co/300x300.png", hint: "ice cream scoop", portion: "1 Scoop" },
    ]},
    { category: "Beverages", items: [
        { id: "bev1", name: "Fresh Lime Soda", price: 89, originalPrice: 99, isVeg: true, description: "Refreshing sweet and salty lime soda.", image: "https://placehold.co/300x300.png", hint: "lime soda drink", portion: "300 ml" },
        { id: "bev2", name: "Masala Chaas", price: 79, originalPrice: 89, isVeg: true, description: "Spiced buttermilk.", image: "https://placehold.co/300x300.png", hint: "buttermilk drink", portion: "300 ml" },
        { id: "bev3", name: "Lassi (Sweet/Salty)", price: 99, originalPrice: 119, isVeg: true, description: "Yogurt-based drink.", image: "https://placehold.co/300x300.png", hint: "lassi drink", portion: "300 ml" },
        { id: "bev4", name: "Coke", price: 60, isVeg: true, description: "Chilled Coca-Cola.", image: "https://placehold.co/300x300.png", hint: "coke soda", portion: "300 ml" },
    ]},
    { category: "Combos", items: [
        { id: "combo1", name: "Veg Thali", price: 349, originalPrice: 399, isVeg: true, description: "Dal, Paneer, Veg, Rice, Roti, Salad.", image: "https://placehold.co/300x300.png", hint: "veg thali meal", tags: ["Bestseller"], portion: "Serves 1" },
        { id: "combo2", name: "Non-Veg Thali", price: 449, originalPrice: 499, isVeg: false, description: "Chicken, Dal, Veg, Rice, Roti, Salad.", image: "https://placehold.co/300x300.png", hint: "non veg thali meal", portion: "Serves 1" },
        { id: "combo3", name: "Family Combo", price: 899, originalPrice: 999, isVeg: false, description: "Butter Chicken, Dal, Biryani, Naan (2), Coke (2).", image: "https://placehold.co/300x300.png", hint: "family meal combo", portion: "Serves 2-3" },
    ]}
  ];

const addOnOptions = {
    chai: [
        { id: 'chai1', name: 'Masala Chai', price: 109, isVeg: true, portion: 'Serves 2', image: 'https://placehold.co/150x150.png', hint: 'masala chai tea' },
        { id: 'chai2', name: 'Elaichi Chai', price: 109, isVeg: true, portion: 'Serves 2', image: 'https://placehold.co/150x150.png', hint: 'elaichi chai tea' },
        { id: 'chai3', name: 'Ginger Chai', price: 109, isVeg: true, portion: 'Serves 2', image: 'https://placehold.co/150x150.png', hint: 'ginger chai tea' },
    ],
    beverages: [
        { id: 'bev1', name: 'Vedica Water Bottle', price: 57, isVeg: true, portion: '1 L | Chilled', image: 'https://placehold.co/150x150.png', hint: 'water bottle' },
        { id: 'bev2', name: 'Sprite Can', price: 38, isVeg: true, portion: '300 ml | Chilled', image: 'https://placehold.co/150x150.png', hint: 'sprite can' },
        { id: 'bev3', name: 'Coca Cola Can', price: 38, isVeg: true, portion: '300 ml | Chilled', image: 'https://placehold.co/150x150.png', hint: 'coke can' },
        { id: 'bev4', name: 'Thums Up Can', price: 38, isVeg: true, portion: '300 ml | Chilled', image: 'https://placehold.co/150x150.png', hint: 'thums up can' },
        { id: 'bev5', name: 'Diet Coke Can', price: 38, isVeg: true, portion: '300 ml | Chilled', image: 'https://placehold.co/150x150.png', hint: 'diet coke can' },
    ],
    indulgent: [
        { id: 'ind1', name: 'Hazelnut Cold Coffee', price: 169, isVeg: true, portion: '450 ml', image: 'https://placehold.co/150x150.png', hint: 'hazelnut coffee' },
        { id: 'ind2', name: 'Dark Chocolate Oreo Shake', price: 169, isVeg: true, portion: '450 ml', image: 'https://placehold.co/150x150.png', hint: 'oreo shake' },
    ]
};

type MenuItem = typeof menuItems[0]['items'][0];
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    addOns: { id: string; name: string; price: number }[];
};
type Cart = { [cartItemId: string]: CartItem };

const BookTableIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20V4H6V2H8V4H16V2H18V4H20V20H18V18H16V20H8V18H6V20H4ZM18 16V6H6V16H18Z" fill="currentColor"/>
    </svg>
);

const DirectionsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L19 21L12 17L5 21L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CashbackIcon = () => (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14C4 12.8954 4.89543 12 6 12H42C43.1046 12 44 12.8954 44 14V34C44 35.1046 43.1046 36 42 36H6C4.89543 36 4 35.1046 4 34V14Z" fill="#E3F2FD"/>
        <path d="M4 18V30C4 28.8954 4.89543 28 6 28H42C43.1046 28 44 28.8954 44 30V18C44 19.1046 43.1046 20 42 20H6C4.89543 20 4 19.1046 4 18Z" fill="#90CAF9"/>
        <path d="M24 24C26.7614 24 29 21.7614 29 19C29 16.2386 26.7614 14 24 14C21.2386 14 19 16.2386 19 19C19 21.7614 21.2386 24 24 24Z" fill="#1976D2"/>
    </svg>
);

const tables = [
  { id: 'T1', type: 'Couple', size: 2, status: 'available' },
  { id: 'T2', type: 'Normal', size: 4, status: 'occupied' },
  { id: 'T3', type: 'Normal', size: 4, status: 'available' },
  { id: 'T4', type: 'Couple', size: 2, status: 'available' },
  { id: 'C1', type: 'Cabin', size: 6, status: 'occupied' },
  { id: 'T5', type: 'Normal', size: 4, status: 'available' },
  { id: 'T6', type: 'Normal', size: 4, status: 'available' },
  { id: 'C2', type: 'Cabin', size: 8, status: 'available' },
];

const facilities = [
    { name: 'Free Wi-Fi', icon: Wifi },
    { name: 'Parking Available', icon: ParkingSquare },
    { name: 'Serves Alcohol', icon: Wine },
    { name: 'Kid Friendly', icon: Baby },
    { name: 'Smoking Area', icon: Cigarette },
    { name: 'Group Friendly', icon: Users },
];

const EntertainmentAdCard = () => (
  <div className="rounded-2xl bg-white p-4 shadow-sm">
    <h3 className="font-bold text-lg mb-3">While you wait...</h3>
    <div className="grid grid-cols-3 gap-3 text-center">
      <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Tv className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xs font-semibold text-gray-700">Watch a video</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Gamepad className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xs font-semibold text-gray-700">Play a game</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Headphones className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xs font-semibold text-gray-700">Listen to music</span>
      </button>
    </div>
  </div>
);


function RestaurantBookingPageComponent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
  const [activeTab, setActiveTab] = useState('offers');
  const [orderType, setOrderType] = useLocalStorage<'delivery' | 'dine-in' | 'booking'>('order-type', 'delivery');


  const [cart, setCart] = useState<Cart>({});
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAddOnSheetOpen, setIsAddOnSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('veg');
  
  const categoryRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState(false);

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'menu') {
        setActiveTab('menu');
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === 'dine-in' || activeTab === 'offers') {
        setOrderType('dine-in');
    }
  }, [activeTab, setOrderType]);

  const handleUpdateCart = (item: CartItem) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (item.quantity > 0) {
        newCart[item.id] = item;
      } else {
        delete newCart[item.id];
      }
      return newCart;
    });
  };

  const getItemQuantity = (itemId: string) => {
    return Object.values(cart).filter(item => item.id.startsWith(itemId)).reduce((sum, item) => sum + item.quantity, 0);
  }
  
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = Object.values(cart).reduce((sum, item) => {
    const addOnsCost = item.addOns.reduce((addOnSum, addOn) => addOnSum + addOn.price, 0);
    return sum + (item.price + addOnsCost) * item.quantity;
  }, 0);

  const discountThreshold = 500;
  const progress = Math.min((totalCost / discountThreshold) * 100, 100);
  const amountNeeded = discountThreshold - totalCost;


  const handleCategoryClick = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuSheetOpen(false);
  };
  
  const handleAddItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsAddOnSheetOpen(true);
  };

  const handleRemoveItemClick = (item: MenuItem) => {
    const itemInCart = Object.values(cart).find(cartItem => cartItem.id.startsWith(item.id) && cartItem.addOns.length === 0);
    if(itemInCart && itemInCart.quantity > 0) {
        handleUpdateCart({ ...itemInCart, quantity: itemInCart.quantity - 1 });
    }
  }
  
  const handleViewCartClick = () => {
    if (activeTab === 'dine-in' || activeTab === 'offers') {
      setOrderType('dine-in');
    } else {
      setOrderType('delivery');
    }
    router.push('/checkout');
  }

  const AddOnSheet = ({ item, open, onOpenChange }: { item: MenuItem | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedAddOns, setSelectedAddOns] = useState<{[key:string]: any}>({});

    if (!item) return null;

    const handleAddOnToggle = (addOn: any, isChecked: boolean | string) => {
        setSelectedAddOns(prev => {
            const newAddOns = {...prev};
            if(isChecked) {
                newAddOns[addOn.id] = addOn;
            } else {
                delete newAddOns[addOn.id];
            }
            return newAddOns;
        });
    };
    
    const handleAddToCart = () => {
        const addOns = Object.values(selectedAddOns);
        const cartItemId = `${item.id}-${addOns.map(a => a.id).sort().join('-')}`;
        
        const existingItem = cart[cartItemId];

        const newCartItem: CartItem = {
            id: cartItemId,
            name: item.name,
            price: item.price,
            quantity: (existingItem?.quantity || 0) + quantity,
            addOns: addOns.map(a => ({ id: a.id, name: a.name, price: a.price })),
        };
        
        handleUpdateCart(newCartItem);
        onOpenChange(false);
    };
    
    const currentTotal = (item.price + Object.values(selectedAddOns).reduce((sum, ad) => sum + ad.price, 0)) * quantity;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="rounded-t-2xl h-[80vh] flex flex-col p-0">
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center gap-2">
                         <div className={`w-5 h-5 border-2 ${item.isVeg ? 'border-primary' : 'border-red-600'} flex items-center justify-center`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-primary' : 'bg-red-600'}`}></div>
                        </div>
                        <SheetTitle className="text-left">{item.name}</SheetTitle>
                    </div>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h3 className="font-bold text-lg">Make it better with chai?</h3>
                        <p className="text-sm text-muted-foreground">Choose your favourite</p>
                        <div className="mt-2 space-y-2">
                            {addOnOptions.chai.map(addOn => (
                                <div key={addOn.id} className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <Image src={addOn.image} alt={addOn.name} width={64} height={64} className="rounded-lg object-cover" data-ai-hint={addOn.hint} />
                                        <div>
                                            <div className="w-4 h-4 border border-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
                                            <p className="font-semibold">{addOn.name}</p>
                                            <p className="text-sm text-muted-foreground">{addOn.portion}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-primary">+ ₹{addOn.price}</p>
                                        <Checkbox id={addOn.id} onCheckedChange={(checked) => handleAddOnToggle(addOn, checked)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg">Beverages</h3>
                        <p className="text-sm text-muted-foreground">Your preferred drink?</p>
                        <div className="mt-2 space-y-2">
                           {addOnOptions.beverages.map(addOn => (
                                <div key={addOn.id} className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <Image src={addOn.image} alt={addOn.name} width={64} height={64} className="rounded-lg object-cover" data-ai-hint={addOn.hint} />
                                        <div>
                                            <div className="w-4 h-4 border border-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
                                            <p className="font-semibold">{addOn.name}</p>
                                            <p className="text-sm text-muted-foreground">{addOn.portion}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-primary">+ ₹{addOn.price}</p>
                                        <Checkbox id={addOn.id} onCheckedChange={(checked) => handleAddOnToggle(addOn, checked)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-lg">Make it indulgent?</h3>
                        <p className="text-sm text-muted-foreground">Choose your favourite</p>
                        <div className="mt-2 space-y-2">
                           {addOnOptions.indulgent.map(addOn => (
                                <div key={addOn.id} className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <Image src={addOn.image} alt={addOn.name} width={64} height={64} className="rounded-lg object-cover" data-ai-hint={addOn.hint} />
                                        <div>
                                            <div className="w-4 h-4 border border-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
                                            <p className="font-semibold">{addOn.name}</p>
                                            <p className="text-sm text-muted-foreground">{addOn.portion}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-primary">+ ₹{addOn.price}</p>
                                        <Checkbox id={addOn.id} onCheckedChange={(checked) => handleAddOnToggle(addOn, checked)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="p-4 border-t bg-white flex items-center justify-between gap-4">
                     <div className="flex items-center border rounded-lg">
                        <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-10 w-10">
                            <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 font-bold">{quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)} className="h-10 w-10">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-lg font-bold rounded-full" onClick={handleAddToCart}>
                        Add Items - ₹{currentTotal}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="relative h-64">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          data-ai-hint="restaurant interior elegant"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white">
              <Bookmark />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white">
              <Share2 />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 -mt-16 z-10 relative pb-24">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
              <p className="text-muted-foreground mt-1">{restaurant.location}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <span>{restaurant.distance} km away</span>
                <span>₹{restaurant.priceForTwo} for two</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-semibold mt-2">
                <Clock className="h-4 w-4" />
                <span>Opens at {restaurant.opensAt}</span>
              </div>
            </div>
            <Link href={`/restaurant/${restaurant.id}/reviews`} className="flex flex-col items-center cursor-pointer">
                <div className="flex items-center gap-2 bg-green-700 text-white rounded-full px-4 py-1.5 shadow-md">
                    <div className="bg-white rounded-full p-0.5">
                        <Star className="h-4 w-4 text-green-700 fill-current" />
                    </div>
                    <span className="font-bold text-lg">{restaurant.rating.toFixed(1)}</span>
                </div>
                <div className="text-center mt-1">
                    <p className="text-xs font-bold text-gray-600 border-b-2 border-dotted">By {restaurant.reviews} Reviews</p>
                </div>
            </Link>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center gap-2">
            <Link href={`/restaurant/${restaurant.id}/book`} className="flex-1">
                <Button className="w-full h-12 bg-white text-primary font-bold text-base rounded-xl shadow-md border border-primary/20 hover:bg-primary/5">
                    <BookTableIcon />
                    Book a table
                </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-white shadow-md border">
                <DirectionsIcon className="text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-white shadow-md border">
                <Phone className="text-primary" />
            </Button>
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
                <CashbackIcon />
                <div>
                    <h3 className="font-bold text-blue-800">Get 10% cashback</h3>
                    <p className="text-xs text-blue-700">on every dining bill payment</p>
                </div>
            </div>
            <ChevronRight className="text-blue-600" />
        </div>

        <div className="mt-6">
            <div className="flex gap-4 border-b overflow-x-auto pb-px">
                <Button variant="ghost" onClick={() => setActiveTab('offers')} className={cn("font-bold relative shrink-0", activeTab === 'offers' ? "text-primary after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-muted-foreground")}>Pre-book offers</Button>
                <Button variant="ghost" onClick={() => setActiveTab('dine-in')} className={cn("font-semibold relative shrink-0", activeTab === 'dine-in' ? "text-primary after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-muted-foreground")}>Dine in</Button>
                <Button variant="ghost" onClick={() => setActiveTab('menu')} className={cn("font-semibold relative shrink-0", activeTab === 'menu' ? "text-primary after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-muted-foreground")}>Menu</Button>
                <Button variant="ghost" onClick={() => setActiveTab('photos')} className={cn("font-semibold relative shrink-0", activeTab === 'photos' ? "text-primary after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-muted-foreground")}>Photos</Button>
                <Button variant="ghost" onClick={() => setActiveTab('facility')} className={cn("font-semibold relative shrink-0", activeTab === 'facility' ? "text-primary after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary" : "text-muted-foreground")}>Facility</Button>
            </div>
        </div>
        
        {activeTab === 'offers' && (
           <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white p-6 shadow-lg">
                    <div className="flex items-center gap-2">
                        <Ticket className="h-6 w-6" />
                        <h3 className="text-lg font-bold">Limited Slots Offer</h3>
                    </div>
                    <p className="text-3xl font-bold mt-2">Flat 30% OFF</p>
                    <p className="mt-1">on your total bill</p>
                    <Button className="mt-4 bg-white text-primary font-bold hover:bg-primary/10">Book Now</Button>
                </div>
                 <div className="rounded-2xl bg-gradient-to-br from-primary/90 to-primary/70 text-white p-6 shadow-lg">
                    <div className="flex items-center gap-2">
                        <Clock className="h-6 w-6" />
                        <h3 className="text-lg font-bold">Happy Hours</h3>
                    </div>
                    <p className="text-3xl font-bold mt-2">Buy 1 Get 1 Free</p>
                    <p className="mt-1">on all drinks</p>
                    <Button className="mt-4 bg-white text-primary font-bold hover:bg-gray-100">Book Now</Button>
                </div>
            </div>
        )}

        {activeTab === 'dine-in' && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Select Your Table</h2>
            <p className="text-sm text-muted-foreground mb-4">Dine here means you are seating in the restaurant and can place your order through our app.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tables.map(table => (
                <button
                  key={table.id}
                  disabled={table.status === 'occupied'}
                  className={cn(
                    "p-3 rounded-lg border-2 text-left space-y-2 transition-all",
                    table.status === 'available' ? 'bg-primary/5 border-primary/40 hover:bg-primary/10' : 'bg-red-50 border-red-400 opacity-60 cursor-not-allowed'
                  )}
                >
                  <div className="flex justify-between items-center">
                     <h4 className="font-bold text-lg">{table.id}</h4>
                      <Badge variant="outline" className={cn(
                          table.status === 'available' ? 'border-primary text-primary bg-white' : 'border-red-600 text-red-700 bg-white'
                      )}>
                          {table.status === 'available' ? 'Available' : 'Occupied'}
                      </Badge>
                  </div>
                  <div className="text-sm">
                    <div className={cn("flex items-center gap-1.5", table.status === 'available' ? 'text-primary' : 'text-red-800')}>
                      <Armchair className="h-4 w-4" />
                      <span>{table.type}</span>
                    </div>
                    <div className={cn("flex items-center gap-1.5", table.status === 'available' ? 'text-primary' : 'text-red-800')}>
                       <Users className="h-4 w-4" />
                       <span>Seats {table.size}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full font-bold text-base" onClick={() => setActiveTab('menu')}>Confirm Booking</Button>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
            <div className="mt-6">
                <div className="p-4 bg-white rounded-2xl shadow-lg">
                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input type="search" placeholder="Search in menu" className="pl-10 h-11 rounded-lg border w-full bg-gray-50" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-11 w-11 border bg-gray-50 rounded-lg">
                        <Mic className="h-5 w-5 text-primary" />
                        </Button>
                    </div>

                    <div className="mt-4 flex gap-2 rounded-full bg-gray-100 p-1">
                        <button
                            onClick={() => setActiveFilter('veg')}
                            className={cn(
                                "flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5",
                                activeFilter === 'veg' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
                            )}
                        >
                            <div className="w-4 h-4 border border-primary flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary"></div></div>
                            Veg
                        </button>
                        <button
                            onClick={() => setActiveFilter('non-veg')}
                            className={cn(
                                "flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5",
                                activeFilter === 'non-veg' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-600'
                            )}
                        >
                            <div className="w-4 h-4 border border-red-600 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-red-600"></div></div>
                            Non-Veg
                        </button>
                    </div>
                </div>
                
                <div className="space-y-6 mt-6">
                    {menuItems.map(category => (
                        <div key={category.category} ref={el => categoryRefs.current[category.category] = el}>
                        <h2 className="text-xl font-bold mb-4">{category.category}</h2>
                        <Carousel opts={{ align: "start", dragFree: true }}>
                            <CarouselContent className="-ml-1">
                            {category.items.map((item, index) => {
                            const quantity = getItemQuantity(item.id);
                            return (
                                <CarouselItem key={item.name} className="basis-7/12 md:basis-1/3 lg:basis-1/4 pl-4">
                                    <div className="w-full">
                                        <div className="relative aspect-square w-full mb-2">
                                            <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" data-ai-hint={item.hint} />
                                            {item.tags?.includes('Bestseller') && <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900">★ Bestseller</Badge>}
                                            
                                            <div className="absolute -bottom-3 right-3">
                                            {quantity === 0 ? (
                                                <Button size="icon" className="bg-primary hover:bg-primary/90 text-white rounded-full h-9 w-9 shadow-lg" onClick={() => handleAddItemClick(item)}>
                                                <Plus className="w-5 h-5" />
                                                </Button>
                                            ) : (
                                                <div className="flex items-center justify-center bg-primary text-white rounded-full shadow-lg h-9 w-24">
                                                <Button variant="ghost" size="icon" className="text-white h-full w-8 rounded-l-full hover:bg-primary/80" onClick={() => handleRemoveItemClick(item)}>
                                                    <Minus className="w-5 h-5" />
                                                </Button>
                                                <span className="font-bold text-base">{quantity}</span>
                                                <Button variant="ghost" size="icon" className="text-white h-full w-8 rounded-r-full hover:bg-primary/80" onClick={() => handleAddItemClick(item)}>
                                                    <Plus className="w-5 h-5" />
                                                </Button>
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className={`w-4 h-4 border ${item.isVeg ? 'border-primary' : 'border-red-600'} flex items-center justify-center`}>
                                                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-primary' : 'bg-red-600'}`}></div>
                                            </div>
                                            {item.portion && <Badge variant="outline" className="text-xs">{item.portion}</Badge>}
                                        </div>
                                        <h3 className="font-semibold mt-1 truncate">{item.name}</h3>
                                        <p className="text-xs text-muted-foreground mt-0.5 h-8">{item.description}</p>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <p className="font-bold">₹{item.price}</p>
                                            {item.originalPrice && (
                                                <>
                                                    <p className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</p>
                                                    <p className="text-sm font-semibold text-primary">
                                                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                            })}
                            </CarouselContent>
                        </Carousel>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'photos' && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { src: 'https://placehold.co/600x400.png', alt: 'Restaurant ambiance', hint: 'restaurant interior elegant' },
                { src: 'https://placehold.co/600x400.png', alt: 'Plated dish', hint: 'gourmet food plated' },
                { src: 'https://placehold.co/600x400.png', alt: 'Dining area', hint: 'restaurant dining area' },
                { src: 'https://placehold.co/600x400.png', alt: 'Close-up of food', hint: 'indian food close-up' },
                { src: 'https://placehold.co/600x400.png', alt: 'Restaurant exterior', hint: 'restaurant exterior night' },
                { src: 'https://placehold.co/600x400.png', alt: 'Another dish', hint: 'dessert chocolate cake' },
              ].map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    data-ai-hint={photo.hint}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'facility' && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm border">
                  <facility.icon className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium text-gray-700">{facility.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
            <h2 className="text-xl font-bold">Walk-in offers</h2>
            <div className="mt-4 space-y-3">
                <div className="bg-white border rounded-2xl p-4 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-xs font-bold text-primary">EXCLUSIVE OFFER</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">Get 10% OFF up to ₹150</p>
                    </div>
                    <ChevronRight className="text-primary" />
                </div>
                 <div className="bg-white border rounded-2xl p-4 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-xs font-bold text-primary">CASHBACK</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">Flat 10% cashback after bill payment</p>
                    </div>
                    <ChevronRight className="text-primary" />
                </div>
            </div>
        </div>
        
        <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold">You might also like</h2>
            <PromotionCarousel />
            <EntertainmentAdCard />
        </div>
      </main>
      
      <AddOnSheet item={selectedItem} open={isAddOnSheetOpen} onOpenChange={setIsAddOnSheetOpen} />

      <Sheet open={isMenuSheetOpen} onOpenChange={setIsMenuSheetOpen}>
        <SheetTrigger asChild>
            <Button
                variant="default"
                size="icon"
                className="fixed bottom-24 right-4 z-20 h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
            >
                <Book className="h-6 w-6" />
            </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl h-[60vh]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-2 overflow-y-auto h-[calc(60vh-80px)]">
            {menuItems.map(category => (
              <button key={category.category} className="w-full text-left p-3 rounded-lg hover:bg-gray-100" onClick={() => handleCategoryClick(category.category)}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{category.category}</span>
                  <span className="text-sm text-muted-foreground">{category.items.length} items</span>
                </div>
                {menuItems.indexOf(category) < menuItems.length - 1 && <div className="mt-3 border-b border-dashed"></div>}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>


      {totalItems > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] z-30">
            <div className="mb-3">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center mt-1 font-medium text-gray-600">
                {amountNeeded > 0 ? (
                    orderType === 'dine-in' ? `Add items worth ₹${amountNeeded.toFixed(2)} more to get a free item!` : `Add items worth ₹${amountNeeded.toFixed(2)} more to get free delivery!`
                ) : (
                    orderType === 'dine-in' ? "Yay! You've unlocked a free item!" : "Yay! You've unlocked free delivery!"
                )}
                </p>
            </div>
          <Button 
            className="w-full h-14 bg-primary text-primary-foreground p-3 rounded-xl shadow-2xl flex items-center justify-between"
            onClick={handleViewCartClick}
            >
              <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="h-6 w-6" />
                    <span className="absolute -top-1 -right-2 bg-white text-primary text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {totalItems}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">₹{totalCost.toFixed(2)}</p>
                    <p className="text-xs text-primary-foreground/80">Total bill</p>
                  </div>
              </div>
              <div className="flex items-center font-bold">
                  View Cart <ChevronRight className="w-4 h-4 ml-1" />
              </div>
          </Button>
        </footer>
      )}
    </div>
  );
}


export default function RestaurantBookingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RestaurantBookingPageComponent />
        </Suspense>
    )
}

    
