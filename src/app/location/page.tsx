
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Search, LocateFixed, Plus, History, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';


export default function LocationPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for area, street name..."
            className="h-10 pl-10 text-base border-gray-200 bg-white focus:border-primary"
          />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <button
          className="w-full flex items-center gap-3 bg-white p-4 text-left border-b"
          onClick={() => router.push('/location/confirm')}
        >
            <LocateFixed className="h-6 w-6 text-primary" />
            <div>
                <span className="font-semibold text-primary">Use my current location</span>
                <p className="text-xs text-muted-foreground">Using GPS</p>
            </div>
        </button>

        <div className="p-4 bg-white">
            <h2 className="text-sm font-bold text-gray-500 uppercase mb-3">Saved Addresses</h2>
            <div className="space-y-4">
                <button className="w-full flex items-start gap-3 p-2 text-left rounded-lg">
                    <Home className="h-6 w-6 text-gray-500 mt-1" />
                    <div>
                        <p className="font-bold">Home</p>
                        <p className="text-sm text-muted-foreground">123, Sunshine Apartments, Green Valley, Mumbai - 400056, Maharashtra, India</p>
                    </div>
                </button>
                 <Separator />
                <button className="w-full flex items-start gap-3 p-2 text-left rounded-lg">
                    <Building className="h-6 w-6 text-gray-500 mt-1" />
                    <div>
                        <p className="font-bold">Work</p>
                        <p className="text-sm text-muted-foreground">Tech Park One, 5th Floor, Viman Nagar, Pune - 411014, Maharashtra, India</p>
                    </div>
                </button>
                 <Separator />
                 <button className="w-full flex items-center gap-3 p-2 text-left rounded-lg text-primary font-semibold">
                    <Plus className="h-5 w-5" />
                    <span>Add new address</span>
                </button>
            </div>
        </div>

        <div className="p-4 mt-2 bg-white">
            <h2 className="text-sm font-bold text-gray-500 uppercase mb-2">Recent Searches</h2>
            <div className="space-y-1">
                <button className="w-full flex items-start gap-3 p-3 text-left rounded-lg">
                    <History className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="font-semibold">Indiranagar, Bengaluru</p>
                        <p className="text-xs text-muted-foreground">Karnataka, India</p>
                    </div>
                </button>
                 <Separator />
                <button className="w-full flex items-start gap-3 p-3 text-left rounded-lg">
                    <History className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="font-semibold">Koramangala 5th Block</p>
                        <p className="text-xs text-muted-foreground">Bengaluru, Karnataka, India</p>
                    </div>
                </button>
            </div>
        </div>

      </main>
    </div>
  );
}
