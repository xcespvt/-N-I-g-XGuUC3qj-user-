
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Copy, Share2, Gift, Send, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const Step = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function ReferPage() {
  const router = useRouter();
  const { toast } = useToast();
  const referralCode = 'X00PH28';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: 'Copied to clipboard!',
      description: `Your referral code ${referralCode} is ready to share.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-primary/5">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Refer & Earn</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="bg-white p-6 text-center">
            <div className="inline-block rounded-full bg-primary/10 p-4 border-4 border-white shadow-lg animate-breathing-glow">
                <Gift className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Refer a friend, get <span className="text-primary">₹250</span>
            </h2>
            <p className="mt-1 text-muted-foreground">
                And they get ₹250 too! It's a win-win.
            </p>
        </div>

        <div className="p-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm border">
                <h3 className="font-bold text-lg mb-4 text-center text-gray-800">How it works</h3>
                <div className="space-y-6">
                    <Step
                        icon={Send}
                        title="Share your code"
                        description="Share your unique referral code with your friends via any platform."
                    />
                    <Step
                        icon={Gift}
                        title="Friend gets a discount"
                        description="Your friend signs up with your code and gets ₹250 off on their first order."
                    />
                    <Step
                        icon={Wallet}
                        title="You get rewarded"
                        description="Once their first order is delivered, you get ₹250 in your Crevings wallet!"
                    />
                </div>
            </div>
        </div>
        
        <div className="p-4 pt-0">
             <div className="rounded-2xl bg-white p-4 shadow-sm border">
                <h3 className="text-lg font-bold text-gray-800 text-center">Your Referral Code</h3>
                <div className="mt-4 flex items-center justify-between rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 p-4">
                    <p className="font-mono text-2xl font-bold tracking-widest text-primary">{referralCode}</p>
                    <Button variant="ghost" size="icon" onClick={handleCopyCode}>
                        <Copy className="h-6 w-6 text-primary" />
                    </Button>
                </div>
            </div>
        </div>
      </main>

       <footer className="sticky bottom-0 bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold">
            Share your link
            <Share2 className="ml-2 h-5 w-5" />
        </Button>
      </footer>
    </div>
  );
}
