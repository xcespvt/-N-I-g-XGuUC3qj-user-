
'use client';

import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, LogOut, ChevronRight, User, MapPin, Star, 
  Package, RefreshCw, Users as UsersIcon, Settings as SettingsIcon, Ticket, Gift, EyeOff, Wallet,
  LifeBuoy, HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProfileOption = ({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick?: () => void }) => (
    <button className="w-full flex justify-between items-center bg-white p-4 text-left first:rounded-t-xl last:rounded-b-xl" onClick={onClick}>
        <div className="flex items-center gap-4">
            <Icon className="h-6 w-6 text-gray-500" />
            <span className="font-semibold text-gray-800">{label}</span>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
    </button>
);


export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear user session/token here
    router.push('/login');
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">My Account</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-4">
          <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-white shadow-md">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        <div className="mt-6 space-y-px rounded-xl shadow-sm overflow-hidden">
            <ProfileOption icon={User} label="Manage Profile" onClick={() => router.push('/profile/manage')} />
            <Separator />
            <ProfileOption icon={MapPin} label="Manage Addresses" onClick={() => router.push('/profile/addresses')} />
             <Separator />
            <ProfileOption icon={Wallet} label="My Wallet" onClick={() => router.push('/profile/wallet')} />
             <Separator />
            <ProfileOption icon={Star} label="Your Ratings" onClick={() => router.push('/profile/ratings')} />
             <Separator />
            <ProfileOption icon={EyeOff} label="Hidden Restaurants" onClick={() => router.push('/profile/hidden-restaurants')} />
        </div>
        
        <div className="mt-6 space-y-px rounded-xl shadow-sm overflow-hidden">
            <ProfileOption icon={Package} label="My Orders" onClick={() => router.push('/profile/orders')} />
            <Separator />
            <ProfileOption icon={RefreshCw} label="Refunds" onClick={() => router.push('/profile/refunds')} />
             <Separator />
            <ProfileOption icon={UsersIcon} label="Refer & Earn" onClick={() => router.push('/profile/refer')} />
             <Separator />
            <ProfileOption icon={SettingsIcon} label="Settings" onClick={() => router.push('/profile/settings')} />
            <Separator />
            <ProfileOption icon={LifeBuoy} label="Support" onClick={() => router.push('/profile/support')} />
            <Separator />
            <ProfileOption icon={HelpCircle} label="FAQs" onClick={() => router.push('/profile/faq')} />
        </div>

        <div className="mt-6 space-y-px rounded-xl shadow-sm overflow-hidden">
            <ProfileOption icon={Ticket} label="Coupons" onClick={() => router.push('/profile/coupons')} />
            <Separator />
            <ProfileOption icon={Gift} label="Treasure Hunt" onClick={() => router.push('/profile/rewards')} />
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            className="w-full h-12 justify-center gap-3 bg-white p-4 text-base font-semibold text-destructive border-gray-200 shadow-sm hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
}
