
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, Percent, Zap, ChevronRight, UtensilsCrossed, Bike, ShoppingBag, Gift, Bell, Hand, DoorClosed, MapPin, Phone, MessageSquare, Shield, CheckCircle2, X, Sparkles, CreditCard, Landmark, ChevronUp, Calendar, Clock, Users, Utensils, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';

const initialCartItems = [
    { id: 1, name: 'Poha', customization: 'Masala Chai, Elaichi Cha...', price: 456, originalPrice: 566, quantity: 1, isVeg: true },
    { id: 2, name: 'Peri Peri Maggi', customization: 'Thums Up Can', price: 157, originalPrice: 179, quantity: 1, isVeg: true },
];

const recommendations = [
    { id: 4, name: 'Mini Peri Peri Punjabi Alo...', customization: '', price: 109, originalPrice: 129, isVeg: true, image: 'https://placehold.co/300x300.png', hint: 'samosa indian food', discount: '15% OFF', portion: '3 Pieces' },
    { id: 5, name: 'Cheese Maggi', customization: '', price: 109, originalPrice: 129, isVeg: true, image: 'https://placehold.co/300x300.png', hint: 'cheese maggi noodles', discount: '15% OFF', portion: 'Serves 1' },
    { id: 6, name: 'Mini Peri Peri Chicken Samosa', customization: '', price: 139, originalPrice: 159, isVeg: false, image: 'https://placehold.co/300x300.png', hint: 'chicken samosa', discount: '15% OFF', portion: '3 Pieces' },
];

const VegNonVegIcon = ({ isVeg }: { isVeg: boolean }) => (
    <div className={`w-4 h-4 border ${isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
        <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
    </div>
);


export default function CheckoutPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [orderType] = useLocalStorage<'delivery' | 'dine-in' | 'booking' | 'booking-preorder'>('order-type', 'delivery');
    const [deliveryOrTakeaway, setDeliveryOrTakeaway] = useState<'delivery' | 'takeaway'>('delivery');

    const [tip, setTip] = useState(30);
    const [showCustomTip, setShowCustomTip] = useState(false);
    const [customTip, setCustomTip] = useState('');
    const [isGift, setIsGift] = useState(false);
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [giftDetailsSaved, setGiftDetailsSaved] = useState(false);
    const [showDiscountPopup, setShowDiscountPopup] = useState(false);
    const [couponApplied, setCouponApplied] = useState(true); // Assuming coupon is auto-applied for demo
    const [isClient, setIsClient] = useState(false);
    const [useWallet, setUseWallet] = useState(false);
    const walletBalance = 120; // Mock wallet balance

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => setShowDiscountPopup(true), 500);
        return () => clearTimeout(timer);
    }, []);
    
    const isDeliveryFlow = orderType === 'delivery';

    const hasFoodItems = cartItems.length > 0;

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        ).filter(item => item.quantity > 0));
    };

    const addRecommendedToCart = (itemToAdd: typeof recommendations[0]) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return prevItems.map(item => 
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...itemToAdd, quantity: 1 }];
            }
        });
    };
    
    const handleTipSelect = (amount: number) => {
        setTip(amount);
        setShowCustomTip(false);
        setCustomTip('');
    };

    const handleOtherTip = () => {
        setShowCustomTip(true);
        setTip(0);
    };
    
    const handleSaveCustomTip = () => {
        const amount = parseInt(customTip, 10);
        if (!isNaN(amount) && amount > 0) {
            setTip(amount);
            setShowCustomTip(false);
        }
    };
    
    const handleSaveGiftDetails = () => {
        if (receiverName && receiverPhone) {
            setGiftDetailsSaved(true);
        }
    }
    
    const handleEditGiftDetails = () => {
        setGiftDetailsSaved(false);
    }
    
    const handleProceedToPay = () => {
        // Simulate a payment process
        const isSuccess = Math.random() > 0.3; // 70% chance of success
        if (isSuccess) {
            router.push('/order-confirmed');
        } else {
            router.push('/order-failed');
        }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = couponApplied ? 80 : 0;
    const originalDeliveryFee = isDeliveryFlow && deliveryOrTakeaway === 'delivery' ? 30 : 0;
    const deliveryFee = 0; // It's free for this demo
    const taxes = 27;
    const platformFee = 5;
    const currentTip = isDeliveryFlow && deliveryOrTakeaway === 'delivery' ? tip : 0;
    const walletDiscount = useWallet ? Math.min(walletBalance, subtotal - discount) : 0;
    const total = subtotal - discount - walletDiscount + originalDeliveryFee + taxes + platformFee + currentTip;
    const totalSaved = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0) + discount + walletDiscount + (isDeliveryFlow && deliveryOrTakeaway === 'delivery' ? 30 : 0);


    if (!isClient) {
        return (
            <div className="flex min-h-screen flex-col bg-gray-50">
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
                     <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                     <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                     </div>
                </header>
                <main className="flex-1 p-4 space-y-4">
                    <div className="rounded-2xl bg-white p-4 shadow-sm h-24 animate-pulse"></div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm h-48 animate-pulse"></div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm h-64 animate-pulse"></div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Sheet open={showDiscountPopup} onOpenChange={setShowDiscountPopup}>
                <SheetContent side="bottom" className="rounded-t-2xl p-6">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Exclusive Discount Offer</SheetTitle>
                    </SheetHeader>
                    <div className="text-center relative">
                        <div className="inline-block p-4 bg-primary text-white rounded-full relative animate-bounce">
                            <Percent className="h-10 w-10" />
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                        </div>
                        <div className="mt-4 flex justify-center items-center gap-2">
                            <Sparkles className="h-4 w-4 text-gray-500" />
                            <p className="font-semibold text-gray-600 tracking-widest text-sm">EXCLUSIVELY FOR YOU</p>
                            <Sparkles className="h-4 w-4 text-gray-500" />
                        </div>
                        <h2 className="text-3xl font-bold mt-2">Save ₹{discount} on this order</h2>
                        <p className="text-muted-foreground mt-1">with coupon 'TRYCREVINGSNEW'</p>
                        <p className="text-xs text-muted-foreground mt-2">Tap on 'APPLY' to avail this</p>
                        <Button
                            className="w-full mt-4 bg-primary hover:bg-primary/90 rounded-lg font-bold text-lg h-12"
                            onClick={() => {
                                setCouponApplied(true);
                                setShowDiscountPopup(false);
                            }}
                        >
                            APPLY
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold">Checkout</h1>
                    <p className="text-xs text-muted-foreground">Review your order and proceed to payment</p>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-28">
                <div className="p-4 space-y-4">
                    {isDeliveryFlow ? (
                         <>
                            {deliveryOrTakeaway === 'delivery' && (
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                                            <div>
                                                <p className="font-bold text-gray-800">Delivering to Home</p>
                                                <p className="text-sm text-gray-500">40, 14th Main Rd, Next to Crevings, 1st Block, Mumbai</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-2xl bg-white p-4 shadow-sm space-y-4">
                            <h2 className="font-bold text-lg">Booking Details</h2>
                             <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Date</p>
                                    <p className="font-bold">28th August 2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Time</p>
                                    <p className="font-bold">8:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Guests</p>
                                    <p className="font-bold">4 People</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Utensils className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Table</p>
                                    <p className="font-bold">12A</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Items */}
                    {hasFoodItems && (
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <h2 className="font-bold text-lg">Order Item(s)</h2>
                            <div className="mt-4 space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <VegNonVegIcon isVeg={item.isVeg} />
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.customization}</p>
                                        </div>
                                        <div className="flex items-center border rounded-lg">
                                            <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 text-primary">
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="px-2 font-bold text-primary">{item.quantity}</span>
                                            <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 text-primary">
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400 line-through">₹{item.originalPrice}</p>
                                            <p className="font-bold">₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Separator className="my-4"/>
                            <div className="rounded-lg bg-white p-3 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <UtensilsCrossed className="h-6 w-6 text-gray-500" />
                                    <div>
                                        <p className="font-semibold">Don't send cutlery</p>
                                        <p className="text-xs text-muted-foreground">Help us save the planet!</p>
                                    </div>
                                </div>
                                <Switch />
                            </div>
                            <Button variant="outline" className="w-full mt-3 border-dashed border-gray-400">
                                <Plus className="w-4 h-4 mr-2" /> Add More Items
                            </Button>
                        </div>
                    )}

                    {/* You might like this */}
                    {hasFoodItems && (
                        <div>
                            <h2 className="text-lg font-bold mb-2 p-2">You might like this</h2>
                            <Carousel opts={{ align: "start", dragFree: true }}>
                                <CarouselContent className="-ml-2">
                                    {recommendations.map(item => (
                                        <CarouselItem key={item.id} className="basis-5/12 pl-2">
                                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                                                <div className="relative aspect-[4/3]">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.hint}/>
                                                    <Badge className="absolute top-2 right-2 bg-white text-primary border border-primary/20">{item.discount}</Badge>
                                                </div>
                                                <div className="p-2 text-sm">
                                                    <div className="flex items-start gap-1">
                                                        <VegNonVegIcon isVeg={item.isVeg} />
                                                        <Badge variant="outline" className="text-xs">{item.portion}</Badge>
                                                    </div>
                                                    <p className="font-semibold truncate mt-1">{item.name}</p>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <div>
                                                            <p className="font-bold">₹{item.price}</p>
                                                            <p className="text-xs text-muted-foreground line-through">₹{item.originalPrice}</p>
                                                        </div>
                                                        <Button size="icon" className="h-8 w-8 rounded-lg bg-primary/10 text-primary hover:bg-primary/20" onClick={() => addRecommendedToCart(item)}>
                                                            <Plus className="w-5 h-5"/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    )}
                    
                    {isDeliveryFlow && (
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <h2 className="font-bold text-lg mb-3">Order Type</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <button 
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1",
                                        deliveryOrTakeaway === 'delivery' ? 'bg-primary/10 border-primary text-primary shadow-lg' : 'bg-gray-50 border-gray-200 hover:border-primary/50'
                                    )}
                                    onClick={() => setDeliveryOrTakeaway('delivery')}>
                                    <Bike className="h-8 w-8" />
                                    <span className="font-bold text-base">Delivery</span>
                                </button>
                                <button 
                                     className={cn(
                                        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1",
                                        deliveryOrTakeaway === 'takeaway' ? 'bg-primary/10 border-primary text-primary shadow-lg' : 'bg-gray-50 border-gray-200 hover:border-primary/50'
                                    )}
                                    onClick={() => setDeliveryOrTakeaway('takeaway')}>
                                    <ShoppingBag className="h-8 w-8" /> 
                                    <span className="font-bold text-base">Takeaway</span>
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Delivery & Cooking Instructions */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <h2 className="font-bold text-lg mb-3">Instructions</h2>
                        {isDeliveryFlow && deliveryOrTakeaway === 'delivery' && (
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-700 mb-2">For Delivery Partner</h3>
                                <div className="grid grid-cols-2 gap-3 text-center mb-2">
                                    <Button variant="outline" className="flex-col h-20 rounded-xl border-gray-300 text-xs font-semibold leading-tight gap-1">
                                        <DoorClosed className="mb-1 h-6 w-6" />
                                        Leave at door
                                    </Button>
                                    <Button variant="outline" className="flex-col h-20 rounded-xl border-gray-300 text-xs font-semibold leading-tight gap-1">
                                        <Bell className="mb-1 h-6 w-6" />
                                        Don't ring bell
                                    </Button>
                                    <Button variant="outline" className="flex-col h-20 rounded-xl border-gray-300 text-xs font-semibold leading-tight gap-1">
                                        <Phone className="mb-1 h-6 w-6" />
                                        Call me on arrival
                                    </Button>
                                    <Button variant="outline" className="flex-col h-20 rounded-xl border-gray-300 text-xs font-semibold leading-tight gap-1">
                                        <MessageSquare className="mb-1 h-6 w-6" />
                                        Message me on arrival
                                    </Button>
                                </div>
                                <Textarea placeholder="Add any other delivery instructions..."/>
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">For Restaurant</h3>
                            <Textarea placeholder="e.g. Make it extra spicy, no onions please."/>
                            <p className="text-xs text-muted-foreground mt-1">These will be passed to the restaurant and they will try their best to accommodate.</p>
                        </div>
                    </div>
                    
                    {isDeliveryFlow && deliveryOrTakeaway === 'delivery' && (
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <h2 className="font-bold text-lg mb-1">Tip Your Delivery Partner</h2>
                            <p className="text-xs text-muted-foreground mb-3">100% of your tip goes to the delivery partner who works tirelessly to bring your food to you.</p>
                            <div className="flex gap-2">
                                {[20, 30, 50].map(tipAmount => (
                                    <Button key={tipAmount} variant="outline" className={cn("rounded-full", tip === tipAmount && !showCustomTip ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300')} onClick={() => handleTipSelect(tipAmount)}>₹{tipAmount}</Button>
                                ))}
                                <Button variant="outline" className={cn("rounded-full", showCustomTip ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300')} onClick={handleOtherTip}>Other</Button>
                            </div>
                            {showCustomTip && (
                            <div className="mt-4 flex items-center gap-2">
                                <Input 
                                    type="number" 
                                    placeholder="Enter amount" 
                                    className="h-10" 
                                    value={customTip}
                                    onChange={(e) => setCustomTip(e.target.value)}
                                />
                                <Button onClick={handleSaveCustomTip} className="bg-primary hover:bg-primary/90">Save</Button>
                            </div>
                            )}
                        </div>
                    )}

                     <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Gift className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Send as a gift?</p>
                                    <p className="text-xs text-muted-foreground">Surprise a friend with a meal!</p>
                                </div>
                            </div>
                            <Switch checked={isGift} onCheckedChange={(checked) => { setIsGift(checked); setGiftDetailsSaved(false); }} />
                        </div>
                        {isGift && (
                            <div className="mt-4 pt-4 border-t border-dashed">
                                {giftDetailsSaved ? (
                                    <div className="rounded-lg bg-primary/5 p-3 text-left border border-primary/20">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-primary flex items-center gap-2"><CheckCircle2 className="h-5 w-5"/> Gift details saved</p>
                                                <p className="text-sm text-primary/80 mt-2">To: {receiverName}</p>
                                                <p className="text-sm text-primary/80">Phone: {receiverPhone}</p>
                                            </div>
                                            <Button variant="link" className="text-primary p-0 h-auto" onClick={handleEditGiftDetails}>Edit</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700">Receiver's Name</label>
                                            <Input 
                                                className="mt-1"
                                                placeholder="Enter name" 
                                                value={receiverName}
                                                onChange={(e) => setReceiverName(e.target.value)}
                                            />
                                        </div>
                                         <div>
                                            <label className="text-sm font-medium text-gray-700">Receiver's Phone</label>
                                            <Input 
                                                className="mt-1"
                                                type="tel"
                                                placeholder="Enter phone number" 
                                                value={receiverPhone}
                                                onChange={(e) => setReceiverPhone(e.target.value)}
                                            />
                                        </div>
                                        <Button 
                                            onClick={handleSaveGiftDetails} 
                                            className="w-full bg-primary hover:bg-primary/90"
                                            disabled={!receiverName || !receiverPhone}
                                        >
                                            Save Gift Details
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>


                    {/* Offers & Coupons */}
                    <Link href="/offers">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            <h2 className="font-bold text-lg mb-2">Offers & Coupons</h2>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Percent className="h-6 w-6 text-primary"/>
                                    <div>
                                        {couponApplied ? (
                                            <>
                                                <p className="font-bold text-primary">TRYCREVINGSNEW applied</p>
                                                <p className="text-xs text-muted-foreground">You saved ₹{discount.toFixed(2)}</p>
                                            </>
                                        ) : (
                                            <p className="font-bold">Apply Coupon</p>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </Link>

                    {/* Billing Details */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <h2 className="font-bold text-lg mb-3">Billing details</h2>
                        <div className="space-y-2 text-sm">
                            {hasFoodItems && (
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p className="font-medium">₹{subtotal.toFixed(2)}</p>
                                </div>
                            )}
                            {couponApplied && (
                                <div className="flex justify-between text-primary">
                                    <p>Discount (TRYCREVINGSNEW)</p>
                                    <p className="font-medium">-₹{discount.toFixed(2)}</p>
                                </div>
                            )}
                             {useWallet && walletDiscount > 0 && (
                                <div className="flex justify-between text-primary">
                                    <p>Wallet</p>
                                    <p className="font-medium">-₹{walletDiscount.toFixed(2)}</p>
                                </div>
                            )}
                            {isDeliveryFlow && deliveryOrTakeaway === 'delivery' && (
                                <div className="flex justify-between">
                                    <p>Delivery</p>
                                    <p className="font-medium"><span className="line-through text-muted-foreground">₹{originalDeliveryFee.toFixed(2)}</span> <span className="text-primary">Free</span></p>
                                </div>
                            )}
                            {isDeliveryFlow && deliveryOrTakeaway === 'delivery' && tip > 0 && (
                                <div className="flex justify-between">
                                    <p>Tip for delivery partner</p>
                                    <p className="font-medium">₹{tip.toFixed(2)}</p>
                                </div>
                            )}
                             <div className="flex justify-between">
                                <p>Taxes</p>
                                <p className="font-medium">₹{taxes.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Platform fee</p>
                                <p className="font-medium">₹{platformFee.toFixed(2)}</p>
                            </div>
                            <Separator className="my-2"/>
                             <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-semibold">Use Wallet</p>
                                        <p className="text-xs text-primary font-bold">Balance: ₹{walletBalance.toFixed(2)}</p>
                                    </div>
                                </div>
                                <Switch checked={useWallet} onCheckedChange={setUseWallet} />
                            </div>
                            <Separator className="my-2"/>
                             <div className="flex justify-between font-bold text-base">
                                <p>Total</p>
                                <p>₹{total.toFixed(2)}</p>
                            </div>
                        </div>
                         <div className="mt-3 bg-blue-100 text-blue-800 font-bold p-2 rounded-lg text-center text-sm border border-blue-200">
                            Total saved on this order ₹{totalSaved.toFixed(2)}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
                 <div className="flex items-center justify-between gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                             <Button variant="outline" className="h-12 rounded-full font-bold">
                                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                                Pay with UPI
                                <ChevronUp className="w-4 h-4 ml-1" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-2xl">
                            <SheetHeader>
                                <SheetTitle>Select Payment Method</SheetTitle>
                            </SheetHeader>
                            <div className="py-4 space-y-4">
                                <Button variant="outline" className="w-full h-12 justify-start text-base">
                                    <Zap className="w-5 h-5 mr-3 text-yellow-500" />
                                    UPI
                                </Button>
                                <Button variant="outline" className="w-full h-12 justify-start text-base">
                                    <CreditCard className="w-5 h-5 mr-3 text-primary" />
                                    Credit / Debit Card
                                </Button>
                                <Button variant="outline" className="w-full h-12 justify-start text-base">
                                    <Landmark className="w-5 h-5 mr-3 text-indigo-500" />
                                    Net Banking
                                </Button>
                                <Button variant="outline" className="w-full h-12 justify-start text-base">
                                    <Hand className="w-5 h-5 mr-3 text-gray-500" />
                                    Cash on Delivery
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                     <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 rounded-full font-bold text-base h-12"
                        onClick={handleProceedToPay}
                    >
                        Proceed to Pay
                    </Button>
                </div>
            </footer>
        </div>
    );
}
