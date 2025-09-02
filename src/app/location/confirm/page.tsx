
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Search, LocateFixed, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const CustomMapPin = () => (
    <div className="relative flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-black border-4 border-white shadow-lg"></div>
        <div className="w-3 h-3 rounded-full bg-primary -mt-1 shadow"></div>
    </div>
);


export default function ConfirmLocationPage() {
  const router = useRouter();
  const isServiceable = true; // For demo purposes, we assume the location is serviceable

  const handleConfirm = () => {
    // In a real app, you would save the location
    router.push('/');
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          // You can now use these coordinates to update the map or address
          alert("Location fetched successfully!");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch your location. Please check your browser settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">Confirm location</h1>
      </header>
      
      <main className="flex-1 relative flex flex-col">
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              placeholder="Search for a new area, locality..."
              className="h-12 pl-10 text-base border-gray-300 focus:border-primary shadow-md"
            />
          </div>
        </div>
        
        <div className="flex-1 relative">
          <Image
            src="https://placehold.co/800x1200.png"
            alt="Map view"
            fill
            className="object-cover"
            data-ai-hint="city map"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
               <div className="absolute -bottom-14 bg-gray-800 text-white text-sm font-semibold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap text-center">
                Your order will be delivered here
                <br />
                Move pin to your exact location
                <div className="absolute left-1/2 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-800 transform -translate-x-1/2"></div>
              </div>
              <CustomMapPin />
            </div>
          </div>
           <Button 
            variant="outline" 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white h-10 shadow-lg border-gray-300"
            onClick={handleUseCurrentLocation}
           >
            <LocateFixed className="h-4 w-4 mr-2 text-primary" />
            Use current location
          </Button>
        </div>
        
        {isServiceable ? (
            <div className="bg-white p-4 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-10">
                <h2 className="text-lg font-bold mb-3">Delivering your order to</h2>
                <div className="rounded-xl bg-white p-3 border-2 border-primary/20">
                    <div className="flex justify-between items-start">
                         <div className="flex items-start gap-3">
                            <MapPin className="h-6 w-6 text-gray-700 mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-800">Garden Layout</h3>
                                <p className="text-sm text-muted-foreground">Sector 2, HSR Layout, Bengaluru</p>
                            </div>
                        </div>
                        <Button variant="outline" className="border-primary text-primary font-bold">
                            Change
                        </Button>
                    </div>
                     <p className="text-sm text-primary mt-2">Pin location is 1729.35 km away from your current location</p>
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold mt-4" onClick={handleConfirm}>
                    Confirm Location <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
            </div>
        ) : (
            <div className="bg-white p-4 rounded-t-2xl shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-10">
                <div className="text-center">
                    <h2 className="text-xl font-bold">Sorry, we're not here yet!</h2>
                    <p className="text-muted-foreground mt-1">Oops, Bistro is not available at this location at the moment. Please try a different location.</p>
                </div>
                <div className="mt-4 space-y-3">
                    <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-bold" onClick={handleConfirm}>
                        Use current location
                    </Button>
                    <Button variant="link" className="w-full text-primary font-bold text-base">
                        Select location manually
                    </Button>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}
