
'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { restaurants } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

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

export default function BookTablePage() {
  const router = useRouter();
  const params = useParams();
  const restaurant = restaurants.find(r => r.id === params.id) || restaurants[0];
  const [, setBookingDetails] = useLocalStorage('booking-details', {});


  const [guests, setGuests] = useState('4');
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('Breakfast');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const isProceedDisabled = !selectedTimeSlot;

  const handleProceed = () => {
    if (isProceedDisabled) return;
    const booking = {
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        guests,
        date: `${selectedDate.day}, ${selectedDate.date}`,
        time: selectedTimeSlot,
    };
    setBookingDetails(booking);
    router.push(`/restaurant/${restaurant.id}/pre-order`);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="relative overflow-hidden bg-white pt-6 pb-4 shadow-sm">
        <div className="container mx-auto px-4">
            <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <div>
                <h1 className="text-xl font-bold">Book a table</h1>
                <p className="text-muted-foreground">{restaurant.name}</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10" />
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <label className="text-lg font-semibold text-gray-800">Select number of guests</label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="mt-2 h-12 w-full rounded-lg border-gray-200 bg-gray-50 text-base">
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1} guest{i > 0 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Select date</h2>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    'shrink-0 rounded-lg border px-4 py-2 text-center transition-colors',
                    selectedDate.date === date.date
                      ? 'border-primary bg-primary/10 font-bold text-primary'
                      : 'border-gray-200 bg-white'
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
                        "rounded-lg border p-2 text-center transition-colors",
                        selectedTimeSlot === slot ? 'bg-primary/10 border-primary' : 'bg-white border-gray-200'
                    )}
                >
                    <p className={cn("font-bold", selectedTimeSlot === slot ? 'text-primary' : 'text-gray-800')}>{slot}</p>
                    <p className="text-xs text-blue-600">1 offer</p>
                </button>
              ))}
            </div>
          </div>
          
          {selectedTimeSlot && (
            <div className="rounded-xl bg-white p-4 shadow-sm border-2 border-dashed border-primary/30">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Available Offers for {selectedTimeSlot}</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Ticket className="h-5 w-5 shrink-0" />
                        <span>Flat 15% OFF on total bill.</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Ticket className="h-5 w-5 shrink-0" />
                        <span>Get one complimentary drink per person.</span>
                    </div>
                </div>
            </div>
          )}

        </div>
      </main>

      <footer className="bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
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
      </footer>
    </div>
  );
}
