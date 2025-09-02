
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Home, Building, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const savedAddresses = [
  {
    type: 'Home',
    icon: Home,
    address: '123, Sunshine Apartments, Green Valley, Mumbai - 400056, Maharashtra, India',
    isDefault: true,
  },
  {
    type: 'Work',
    icon: Building,
    address: 'Tech Park One, 5th Floor, Viman Nagar, Pune - 411014, Maharashtra, India',
    isDefault: false,
  }
];

export default function ManageAddressesPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Manage Addresses</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full h-14 bg-white border-dashed border-gray-400 text-primary font-bold text-base flex items-center justify-center gap-2 hover:bg-primary/5 hover:text-primary transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] shadow-sm"
            onClick={() => router.push('/location')}
          >
            <Plus className="h-5 w-5" />
            Add New Address
          </Button>
          
          {savedAddresses.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up-and-fade transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{item.type}</h3>
                        {item.isDefault && (
                            <div className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</div>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.address}</p>
                  </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground -mr-2 -mt-2">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
