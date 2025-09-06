

'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Star, Clock, Plus, Search, Mic, Minus, ChevronDown, Leaf, Info, Percent, Bookmark, Share2, Trophy, Book, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { restaurants } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

const classicFriesItem = {
    name: "Classic Fries",
    price: 129,
    originalPrice: 149,
    isVeg: true,
    description: "Perfectly salted crispy fries.",
    image: "https://placehold.co/300x300.png",
    hint: "french fries",
    tags: ["Bestseller"],
    portion: "Serves 1",
    rating: 4.2,
    ratingCount: 250,
    type: "Cheesy Bliss",
};

const menuItems = [
    {
        category: "Classic Fries",
        items: Array.from({ length: 25 }, (_, i) => ({
            ...classicFriesItem,
            id: `fries${i + 1}`,
        }))
    }
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

const availableOffers = [
    { type: 'discount', title: 'FLAT ₹125 OFF', description: 'On orders above ₹599' },
    { type: 'promo', title: '20% OFF up to ₹100', description: 'With SBI Credit Cards' },
    { type: 'freebie', title: 'Free Delivery', description: 'On all orders today!' },
    { type: 'deal', title: 'Items at ₹199', description: 'On select items' },
]

type MenuItem = typeof menuItems[0]['items'][0];
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    addOns: { id: string; name: string; price: number }[];
};
type Cart = { [cartItemId: string]: CartItem };

const VegNonVegIcon = ({ isVeg }: { isVeg: boolean }) => (
    <div className={`w-4 h-4 border ${isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
        <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
    </div>
);

function RestaurantDetailsPageComponent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const id = params.id as string;
  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
  
  const [cart, setCart] = useState<Cart>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAddOnSheetOpen, setIsAddOnSheetOpen] = useState(false);
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState(false);
  const categoryRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === 'menu' && mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [view]);

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

  const getItemQuantity = (itemId: string) => Object.values(cart).filter(i => i.id.startsWith(itemId)).reduce((sum, item) => sum + item.quantity, 0);
  
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  
  const getRestaurantStatus = (opensAt: string) => {
    const now = new Date();
    const openTime = new Date();
    const [time, period] = opensAt.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours < 12) {
      hours += 12;
    }
    if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    openTime.setHours(hours, minutes, 0, 0);

    const closeTime = new Date(openTime);
    closeTime.setHours(openTime.getHours() + 12); // Assuming 12-hour operation

    const oneHourBeforeClose = new Date(closeTime);
    oneHourBeforeClose.setHours(closeTime.getHours() - 1);

    if (now >= openTime && now < oneHourBeforeClose) {
      return { text: 'Open', color: 'text-green-600' };
    } else if (now >= oneHourBeforeClose && now < closeTime) {
      return { text: 'Closing soon', color: 'text-orange-500' };
    } else {
      return { text: 'Closed', color: 'text-red-500' };
    }
  };

  const status = getRestaurantStatus(restaurant.opensAt);

  const filteredMenuItems = menuItems.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

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

  const handleCategoryClick = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuSheetOpen(false);
  };

  const MenuListItem = ({ item }: { item: MenuItem }) => {
    const quantity = getItemQuantity(item.id);
    return (
        <div className="flex items-center gap-4 py-4">
            <div className="w-24 h-24 relative flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" data-ai-hint={item.hint} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">{'Bestseller'}</Badge>
                        <h3 className="font-bold text-gray-800 mt-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{item.rating?.toFixed(1)}</span>
                        <span className="text-muted-foreground font-normal">({item.ratingCount})</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-primary">₹{item.price}</p>
                    {quantity === 0 ? (
                      <Button 
                          variant="outline"
                          className="text-primary border-primary w-20 h-8 font-bold rounded-lg"
                          onClick={() => handleAddItemClick(item)}
                      >
                        ADD
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center bg-primary text-white h-9 font-bold rounded-full w-24">
                        <Button variant="ghost" size="icon" className="text-white h-full w-8 rounded-l-full hover:bg-primary/80" onClick={() => handleRemoveItemClick(item)}>
                          <Minus className="w-5 h-5" />
                        </Button>
                        <span className="text-base">{quantity}</span>
                        <Button variant="ghost" size="icon" className="text-white h-full w-8 rounded-r-full hover:bg-primary/80" onClick={() => handleAddItemClick(item)}>
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    )}
                </div>
            </div>
        </div>
    );
  };

  const MenuGridItem = ({ item }: { item: MenuItem }) => {
      const quantity = getItemQuantity(item.id);
      return (
          <div className="flex flex-col">
              <div className="relative aspect-square w-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" data-ai-hint={item.hint} />
              </div>
              <div className="mt-2">
                  <div className="flex items-start gap-1.5 mb-1">
                      <VegNonVegIcon isVeg={item.isVeg} />
                      <div className="flex items-center gap-1 text-primary text-xs font-bold">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{item.rating?.toFixed(1)}</span>
                      </div>
                  </div>
                  <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.portion}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-sm">₹{item.price}</p>
                    {quantity === 0 ? (
                        <Button 
                            variant="outline"
                            className="text-primary border-primary w-20 h-8 font-bold rounded-lg"
                            onClick={() => handleAddItemClick(item)}
                        >
                          ADD
                        </Button>
                      ) : (
                        <div className="flex items-center justify-center bg-white border border-primary text-primary w-20 h-8 font-bold rounded-lg">
                          <Button variant="ghost" size="icon" className="text-primary h-full w-6 rounded-l-lg" onClick={() => handleRemoveItemClick(item)}>
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm">{quantity}</span>
                          <Button variant="ghost" size="icon" className="text-primary h-full w-6 rounded-r-lg" onClick={() => handleAddItemClick(item)}>
                            <Plus className="w-4 w-4" />
                          </Button>
                        </div>
                      )}
                  </div>
              </div>
          </div>
      );
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
                         <VegNonVegIcon isVeg={item.isVeg} />
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
                                            <VegNonVegIcon isVeg={addOn.isVeg} />
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
                                            <VegNonVegIcon isVeg={addOn.isVeg} />
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
                                            <VegNonVegIcon isVeg={addOn.isVeg} />
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
    <div className="bg-white min-h-screen">
       {view !== 'menu' && (
        <>
            <div className="relative w-full aspect-[16/9]">
                <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
                data-ai-hint="restaurant interior elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <Button variant="ghost" size="icon" className="rounded-full bg-white/80 text-primary hover:bg-white" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white/80 text-primary hover:bg-white">
                            <Bookmark />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full bg-white/80 text-primary hover:bg-white">
                            <Share2 />
                        </Button>
                    </div>
                </div>
            </div>
             <main className="pb-24 relative z-10 -mt-16">
                 <div className="bg-white p-4 border-b rounded-b-2xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                {restaurant.deliveryTime}-{restaurant.deliveryTime + 5} mins | {restaurant.location}, {restaurant.distance} km
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold mt-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>Opens at {restaurant.opensAt}</span>
                                <span className={cn("font-bold", status.color)}>({status.text})</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 bg-primary text-white px-2 py-0.5 rounded-full">
                                <span className="font-bold">{restaurant.rating.toFixed(1)}</span>
                                <Star className="h-3 w-3" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{restaurant.reviews} ratings</p>
                        </div>
                    </div>
                 </div>
                 <div className="mt-4">
                    <Carousel opts={{ align: "start", dragFree: true }}>
                        <CarouselContent className="-ml-2">
                            {availableOffers.map((offer, index) => (
                                <CarouselItem key={index} className="pl-4 basis-10/12 md:basis-1/2">
                                    <div className="rounded-xl p-3 flex items-center gap-3 bg-primary/5 border border-primary/20">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Percent className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm text-primary">{offer.title}</h3>
                                            <p className="text-xs text-primary/80">{offer.description}</p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
             </main>
        </>
       )}
      
      <div ref={mainContentRef}>
        <div className="mt-6 sticky top-0 bg-white z-10 py-2 shadow-sm">
          <div className='px-4'>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                    type="search" 
                    placeholder="Search for dishes" 
                    className="pl-10 pr-12 h-11 rounded-2xl border w-full bg-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                 <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10">
                  <Mic className="h-5 w-5 text-primary" />
                </Button>
            </div>
             <div className="mt-3 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                <Button variant="outline" className="rounded-full bg-gray-100 border-gray-300 shrink-0">Pure Veg</Button>
                <Button variant="outline" className="rounded-full bg-gray-100 border-gray-300 shrink-0">Ratings 4.0+</Button>
                <Button variant="outline" className="rounded-full bg-gray-100 border-gray-300 shrink-0">Buy 1 Get 1</Button>
                <Button variant="outline" className="rounded-full bg-gray-100 border-gray-300 shrink-0">Bestseller</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 px-4 pb-24">
            {filteredMenuItems.map((category, catIndex) => (
                <div key={category.category} ref={el => categoryRefs.current[category.category] = el}>
                    {catIndex > 0 && <Separator className="my-4 h-2 bg-gray-100 -mx-4 w-[calc(100%+2rem)]" />}
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{category.category} ({category.items.length})</h2>
                        <ChevronDown />
                    </div>
                    {category.category === 'Buy 1 Get 1 Free' && (
                        <p className="text-sm text-muted-foreground mt-1">1 out of 2 items will be made free. <a href="#" className="text-primary font-semibold">Learn More</a></p>
                    )}
                    
                    {category.category === 'Buy 1 Get 1 Free' ? (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {category.items.map((item) => <MenuGridItem key={item.id} item={item} />)}
                        </div>
                    ) : (
                        <div className="divide-y">
                            {category.items.map((item) => <MenuListItem key={item.id} item={item} />)}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>

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
          <div className="flex justify-between items-center bg-primary text-white p-3 rounded-lg">
            <div>
              <p className="font-bold">{totalItems} {totalItems > 1 ? 'items' : 'item'}</p>
              <p className="text-xs">Plus taxes</p>
            </div>
            <Button variant="ghost" className="text-white font-bold text-lg hover:bg-primary/80" onClick={() => router.push('/checkout')}>
              View Cart
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function RestaurantDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RestaurantDetailsPageComponent />
        </Suspense>
    )
}
