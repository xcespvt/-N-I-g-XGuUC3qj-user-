

'use client';

import { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2, Star, Clock, MapPin, Phone, Utensils, ChevronRight, ChevronDown, Users, Armchair, Camera, Wifi, ParkingSquare, Wine, Cigarette, Baby, Search, Mic, Plus, Minus, Book, ShoppingBag, X, Ticket, AppWindow, Store, Gamepad2, Clapperboard, Music, Tv, Gamepad, Headphones, Heart, MessageSquare, Banknote, Percent, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { offers as allOffers, restaurants } from '@/lib/mock-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PromotionCarousel } from '@/components/promotion-carousel';
import { PhotoGallery } from '@/components/photo-gallery';
import { TopRestaurants } from '@/components/top-restaurants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const facilities = [
    { name: 'Free WiFi', icon: Wifi },
    { name: 'Room Service', icon: Utensils },
    { name: 'Parking', icon: ParkingSquare },
    { name: 'Kid Friendly', icon: Baby },
];

const menuImages = [
    { src: 'https://picsum.photos/300/400?random=1', hint: 'restaurant menu page' },
    { src: 'https://picsum.photos/300/400?random=2', hint: 'restaurant menu page' },
    { src: 'https://picsum.photos/300/400?random=3', hint: 'restaurant menu page' },
    { src: 'https://picsum.photos/300/400?random=4', hint: 'restaurant menu page' },
];

const availableOffers = [
    { title: 'FLAT ₹125 OFF', code: 'FLAT125', description: 'On orders above ₹599 using HDFC cards' },
    { title: '20% OFF up to ₹100', code: 'SBIWEEKEND', description: 'With SBI Credit Cards on weekend bookings' },
    { title: 'Complimentary Drink', code: 'FREEDRINK', description: 'For all dine-in guests on weekdays' },
]

const tables = [
  { id: 't1', number: 'J12', type: 'Recliner', capacity: 1, status: 'available' },
  { id: 't2', number: 'J13', type: 'Recliner', capacity: 1, status: 'occupied' },
  { id: 't3', number: 'H5', type: 'Standard', capacity: 1, status: 'available' },
  { id: 't4', number: 'H6', type: 'Standard', capacity: 1, status: 'unavailable' },
  { id: 't5', number: 'F1', type: 'Sofa', capacity: 2, status: 'available' },
  { id: 't6', number: 'F2', type: 'Sofa', capacity: 2, status: 'occupied' },
  { id: 't7', number: 'A10', type: 'Recliner', capacity: 1, status: 'available' },
  { id: 't8', number: 'A11', type: 'Recliner', capacity: 1, status: 'available' },
];

const dates = [
  { day: 'Today', date: '25 Aug' },
  { day: 'Tomorrow', date: '26 Aug' },
  { day: 'Wednesday', date: '27 Aug' },
  { day: 'Thursday', date: '28 Aug' },
  { day: 'Friday', date: '29 Aug' },
];

const timeOfDay = ['Breakfast', 'Lunch', 'Dinner'];
const timeSlots = {
  Breakfast: ['10:30 AM', '11:00 AM', '11:30 AM'],
  Lunch: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
  Dinner: ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'],
};

const BookTableSheet = ({ open, onOpenChange, restaurantId, restaurantName }: { open: boolean; onOpenChange: (open: boolean) => void; restaurantId: string; restaurantName: string }) => {
    const router = useRouter();
    const [, setBookingDetails] = useLocalStorage('booking-details', {});

    const [guests, setGuests] = useState(4);
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('Breakfast');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

    const isProceedDisabled = !selectedTimeSlot;

    const handleProceed = () => {
        if (isProceedDisabled) return;
        const booking = {
            restaurantId: restaurantId,
            restaurantName: restaurantName,
            guests,
            date: `${selectedDate.day}, ${selectedDate.date}`,
            time: selectedTimeSlot,
        };
        setBookingDetails(booking);
        router.push(`/restaurant/${restaurantId}/pre-order`);
    };
    
    const handleGuestChange = (delta: number) => {
        setGuests(prev => Math.max(1, Math.min(20, prev + delta)));
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="rounded-t-2xl h-[90vh] flex flex-col p-0 bg-gray-50">
                <SheetHeader className="p-4 border-b bg-white">
                    <SheetTitle>Book a table at {restaurantName}</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div className="space-y-6">
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Users className="h-6 w-6 text-primary" />
                                <h3 className="text-lg font-semibold text-gray-800">Number of Guests</h3>
                            </div>
                            <div className="flex items-center gap-2 border rounded-lg p-1">
                                <Button variant="ghost" size="icon" onClick={() => handleGuestChange(-1)} className="h-8 w-8 text-primary">
                                    <Minus className="w-4 h-4" />
                                </Button>
                                <span className="px-3 text-lg font-bold w-10 text-center">{guests}</span>
                                <Button variant="ghost" size="icon" onClick={() => handleGuestChange(1)} className="h-8 w-8 text-primary">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">Select date</h2>
                        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                        {dates.map((date) => (
                            <button
                            key={date.date}
                            onClick={() => setSelectedDate(date)}
                            className={cn(
                                'shrink-0 rounded-lg border px-4 py-2 text-center transition-colors bg-white',
                                selectedDate.date === date.date
                                ? 'border-primary bg-primary/10 font-bold text-primary'
                                : 'border-gray-200'
                            )}
                            >
                            <p className="font-semibold">{date.day}</p>
                            <p className="text-sm">{date.date}</p>
                            </button>
                        ))}
                        </div>
                    </div>
                    
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">Select time of day</h2>
                        <div className="mt-3 flex gap-2 rounded-full bg-gray-100 p-1">
                            {timeOfDay.map(tod => (
                                <button
                                    key={tod}
                                    onClick={() => {
                                        setSelectedTimeOfDay(tod)
                                        setSelectedTimeSlot(null)
                                    }}
                                    className={cn(
                                        "flex-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                                        selectedTimeOfDay === tod ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
                                    )}
                                >
                                    {tod}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                        {timeSlots[selectedTimeOfDay as keyof typeof timeSlots].map(slot => (
                            <button
                                key={slot}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={cn(
                                    "rounded-lg border p-2 text-center transition-colors bg-white",
                                    selectedTimeSlot === slot ? 'bg-primary/10 border-primary' : 'border-gray-200'
                                )}
                            >
                                <p className={cn("font-bold", selectedTimeSlot === slot ? 'text-primary' : 'text-gray-800')}>{slot}</p>
                                <p className="text-xs text-blue-600">1 offer</p>
                            </button>
                        ))}
                        </div>
                    </div>

                    </div>
                </div>
                <div className="p-4 border-t bg-white">
                     <Button
                        className={cn(
                            'h-12 w-full rounded-lg text-lg font-bold',
                            isProceedDisabled ? 'bg-gray-300 text-gray-500' : 'bg-primary text-primary-foreground'
                        )}
                        disabled={isProceedDisabled}
                        onClick={handleProceed}
                        >
                        Proceed
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

const TableSelectionSheet = ({ open, onOpenChange, restaurantId }: { open: boolean, onOpenChange: (open: boolean) => void, restaurantId: string }) => {
    const [selectedTable, setSelectedTable] = useState<string | null>(null);
    const router = useRouter();

    const handleConfirmTable = () => {
        if (selectedTable) {
            router.push(`/restaurant/${restaurantId}/details?view=menu`);
        }
    };
    
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="rounded-t-2xl h-[60vh] flex flex-col p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Select Your Seat</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4 space-y-4 px-4">
                    {tables.map(table => (
                        <button
                            key={table.id}
                            disabled={table.status !== 'available'}
                            onClick={() => setSelectedTable(table.id)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
                                table.status === 'available' && "bg-green-50 border-green-200 text-green-800",
                                table.status === 'occupied' && "bg-red-50 border-red-200 text-red-800 opacity-60",
                                table.status === 'unavailable' && "bg-gray-100 border-gray-200 text-gray-500 opacity-60",
                                selectedTable === table.id && "ring-2 ring-offset-2 ring-primary border-primary"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Armchair className="h-6 w-6" />
                                <div>
                                    <p className="font-bold">Seat {table.number}</p>
                                    <p className="text-sm">{table.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "w-3 h-3 rounded-full",
                                    table.status === 'available' && "bg-green-500",
                                    table.status === 'occupied' && "bg-red-500",
                                    table.status === 'unavailable' && "bg-gray-400"
                                )}/>
                                <span className="text-sm font-semibold capitalize">{table.status}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="p-4 border-t">
                    <Button 
                        className="w-full h-12 text-lg rounded-full"
                        disabled={!selectedTable}
                        onClick={handleConfirmTable}
                    >
                        Proceed
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function RestaurantBookingPageComponent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorite-restaurants', []);
  const isFavorite = favorites.includes(restaurant.id);
  const [isTableSheetOpen, setIsTableSheetOpen] = useState(false);
  const [isBookSheetOpen, setIsBookSheetOpen] = useState(false);

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const onFavoriteToggle = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };
  
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

  const topRatedRestaurants = restaurants.filter(r => r.id !== id && r.rating > 4.5).slice(0, 10);
  const biryaniRestaurants = restaurants.filter(r => r.cuisine.toLowerCase().includes('biryani')).slice(0, 10);
  const momosRestaurants = restaurants.filter(r => r.cuisine.toLowerCase().includes('chinese')).slice(0, 10);
  const familyRestaurants = restaurants.filter(r => r.priceForTwo < 1000).slice(0, 10);
  const clubRestaurants = restaurants.filter(r => r.priceForTwo > 2000).slice(0, 10);
  const movieTheatreRestaurants = restaurants.filter(r => r.tags?.includes('Movie Theatre')).slice(0, 10);

  const isMovieTheatre = restaurant.tags?.includes('Movie Theatre');


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
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
                <Button variant="ghost" size="icon" className="rounded-full bg-white/80 text-primary hover:bg-white" onClick={() => onFavoriteToggle(restaurant.id)}>
                    <Heart className={cn("h-5 w-5", isFavorite && "text-red-500 fill-current")} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/80 text-primary hover:bg-white">
                    <Share2 />
                </Button>
            </div>
        </div>
      </div>

      <main className="flex-1 pb-24 relative z-10 -mt-16">
        <div className="bg-white p-4 rounded-t-2xl space-y-6">
            <div>
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-bold">{restaurant.name}</h2>
                    <div className="flex items-center gap-2">
                        <Link href="https://maps.google.com" target="_blank">
                            <Button variant="outline" size="icon" className="border-primary text-primary"><Map className="h-4 w-4" /></Button>
                        </Link>
                        <Button variant="outline" size="icon" className="border-primary text-primary"><Phone className="h-4 w-4" /></Button>
                    </div>
                </div>
                <p className="text-muted-foreground mt-1">
                    {restaurant.cuisine}
                </p>
                <div className="flex items-center gap-1 text-sm mt-1">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="font-bold text-primary">{restaurant.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({restaurant.reviews} ratings)</span>
                </div>
                 <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{restaurant.location}, {restaurant.distance} km away</span>
                </div>
                 <div className="flex items-center gap-2 text-sm font-semibold mt-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Opens at {restaurant.opensAt}</span>
                    <span className={cn("font-bold", status.color)}>({status.text})</span>
                </div>
            </div>
            
            <PromotionCarousel />
            
            <PhotoGallery />
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                <div className="flex flex-wrap gap-3">
                    {facilities.map((facility, index) => (
                        <div key={index} className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm border border-primary/20">
                           {facility.name}
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                 <Carousel opts={{ align: "start", dragFree: true }}>
                    <CarouselContent className="-ml-2">
                        {menuImages.map((image, index) => (
                            <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3">
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
                                    <Image src={image.src} alt={`Menu page ${index + 1}`} fill className="object-cover" data-ai-hint={image.hint} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Available Offers</h2>
                <Carousel opts={{ align: "start", dragFree: true }}>
                    <CarouselContent className="-ml-4">
                        {availableOffers.map((offer, index) => (
                            <CarouselItem key={index} className="pl-4 basis-11/12 md:basis-2/3">
                                <div className="bg-white rounded-2xl shadow-md flex overflow-hidden border border-gray-200/80">
                                <div className="p-4 flex-1">
                                    <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                                        <Ticket className="h-5 w-5" />
                                        <span>{offer.title}</span>
                                    </div>
                                    <p className="font-bold text-lg text-gray-800 tracking-wider my-1">{offer.code}</p>
                                    <p className="text-sm text-gray-500">{offer.description}</p>
                                </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="pt-4">
                <TopRestaurants 
                    restaurants={topRatedRestaurants} 
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                    title="Top restaurants near you"
                />
            </div>
            <div className="pt-4">
                <TopRestaurants 
                    restaurants={biryaniRestaurants} 
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                    title="Top Dine-in for Biryani"
                />
            </div>
            <div className="pt-4">
                <TopRestaurants 
                    restaurants={momosRestaurants} 
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                    title="Top Dine-in for Momos"
                />
            </div>
             <div className="pt-4">
                <TopRestaurants 
                    restaurants={familyRestaurants} 
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                    title="Top Dine-in for Family"
                />
            </div>
             <div className="pt-4">
                <TopRestaurants 
                    restaurants={clubRestaurants} 
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                    title="Top Dine-in for Clubs"
                />
            </div>
             <div className="pt-4">
                <TopRestaurants 
                    restaurants={movieTheatreRestaurants} 
                    favorites={favorites}
                    onFavoriteToggle={onFavoriteToggle}
                    title="Near Movie Theatres"
                />
            </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-white p-4 border-t flex items-center gap-3 z-20">
        {isMovieTheatre ? (
            <Button variant="outline" className="h-14 flex-1 rounded-full text-lg font-bold text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => setIsTableSheetOpen(true)}>
                <Utensils className="h-5 w-5 mr-2" />
                Dine in
            </Button>
        ) : (
            <>
                <Button variant="outline" className="h-14 flex-1 rounded-full text-lg font-bold text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => setIsTableSheetOpen(true)}>
                    <Utensils className="h-5 w-5 mr-2" />
                    Dine in
                </Button>
                <Button 
                    className="h-14 flex-1 rounded-full text-lg font-bold bg-primary hover:bg-primary/90"
                    onClick={() => setIsBookSheetOpen(true)}
                >
                    <Book className="h-5 w-5 mr-2" />
                    Book Now
                </Button>
            </>
        )}
      </footer>
      <TableSelectionSheet open={isTableSheetOpen} onOpenChange={setIsTableSheetOpen} restaurantId={id} />
      <BookTableSheet open={isBookSheetOpen} onOpenChange={setIsBookSheetOpen} restaurantId={id} restaurantName={restaurant.name} />
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
