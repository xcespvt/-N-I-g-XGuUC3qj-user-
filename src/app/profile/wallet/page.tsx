
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Wallet, Gift, ShoppingBag, Plus, X, Loader2, CheckCircle2, XCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const transactions = [
  {
    id: 1,
    type: 'credit',
    title: 'Cashback from Royal Spice',
    description: 'Order #12345',
    amount: 50,
    date: '2024-08-15',
  },
  {
    id: 2,
    type: 'credit',
    title: 'Welcome Bonus',
    description: 'First order offer',
    amount: 100,
    date: '2024-08-12',
  },
   {
    id: 3,
    type: 'debit',
    title: 'Paid for Order #12301',
    description: 'Burger Barn',
    amount: -75,
    date: '2024-08-11',
  },
  {
    id: 4,
    type: 'credit',
    title: 'Cashback from Pizza Heaven',
    description: 'Order #12300',
    amount: 75,
    date: '2024-08-10',
  },
];

const TransactionIcon = ({ type }: { type: 'credit' | 'debit' }) => {
    if (type === 'credit') {
        return <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100"><ArrowDownLeft className="h-5 w-5 text-green-600" /></div>;
    }
    return <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100"><ArrowUpRight className="h-5 w-5 text-red-600" /></div>;
}

const TransactionRow = ({ transaction, index }: { transaction: typeof transactions[0], index: number }) => (
    <div className="p-4 flex items-center justify-between animate-slide-up-and-fade" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="flex items-center gap-4">
            <TransactionIcon type={transaction.type} />
            <div>
                <p className="font-bold text-gray-800">{transaction.title}</p>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
            </div>
        </div>
        <div className="text-right">
            <p className={cn("font-bold text-lg", transaction.type === 'credit' ? 'text-green-600' : 'text-gray-800')}>
                {transaction.type === 'credit' ? `+ ₹${transaction.amount.toFixed(2)}` : `- ₹${Math.abs(transaction.amount).toFixed(2)}`}
            </p>
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
        </div>
    </div>
)


export default function WalletPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isRedeemSheetOpen, setIsRedeemSheetOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemState, setRedeemState] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  const handleApplyRedeemCode = async () => {
    if (!redeemCode) {
        toast({ variant: 'destructive', title: 'Please enter a redeem code.' });
        return;
    }
    setRedeemState('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const isSuccess = Math.random() > 0.3;
    setRedeemState(isSuccess ? 'success' : 'failed');
  };

  const resetRedeemState = () => {
    setRedeemCode('');
    setRedeemState('idle');
  }

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
        setTimeout(() => {
            resetRedeemState();
        }, 300);
    }
    setIsRedeemSheetOpen(open);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center border-b bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">My Wallet</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white shadow-lg animate-slide-up-and-fade relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -left-2 w-32 h-32 bg-white/10 rounded-full" />
            <div className="relative z-10">
                <p className="text-sm text-primary-foreground/80 flex items-center gap-2"><Wallet className="h-4 w-4" /> Available Balance</p>
                <p className="text-5xl font-bold mt-2">₹{totalBalance.toFixed(2)}</p>
                <p className="mt-2 text-xs text-primary-foreground/70">
                    Use this balance on your next order to get discounts.
                </p>
            </div>
        </div>

        <div className="mt-6">
            <Sheet open={isRedeemSheetOpen} onOpenChange={handleSheetOpenChange}>
                <SheetTrigger asChild>
                     <Button className="w-full h-12 bg-white text-primary font-bold shadow-sm border hover:bg-primary/5">
                        <Gift className="h-5 w-5 mr-2" />
                        Redeem Code
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                    <SheetHeader>
                        <SheetTitle>Redeem Gift Code</SheetTitle>
                    </SheetHeader>
                    <div className="py-8 text-center">
                        {redeemState === 'idle' && (
                            <div className="space-y-4">
                                <p className="text-muted-foreground">Enter your gift code below to add money to your wallet.</p>
                                <Input 
                                    placeholder="Enter Code" 
                                    className="h-12 text-center text-lg tracking-widest"
                                    value={redeemCode}
                                    onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                                />
                                <Button 
                                    className="w-full h-12 bg-primary hover:bg-primary/90"
                                    onClick={handleApplyRedeemCode}
                                    disabled={!redeemCode}
                                >
                                    Apply
                                </Button>
                            </div>
                        )}
                        {redeemState === 'loading' && (
                             <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-4 space-y-3">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="font-semibold text-lg">Adding money to your wallet...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        )}
                         {redeemState === 'success' && (
                             <div className="flex flex-col items-center justify-center text-center text-green-600 py-4 space-y-3">
                                <CheckCircle2 className="h-16 w-16" />
                                <p className="font-bold text-2xl">Added Successfully!</p>
                                <p className="text-muted-foreground">₹100 has been added to your wallet.</p>
                                <Button className="w-full" onClick={() => handleSheetOpenChange(false)}>Done</Button>
                            </div>
                        )}
                         {redeemState === 'failed' && (
                             <div className="flex flex-col items-center justify-center text-center text-red-500 py-4 space-y-3">
                                <XCircle className="h-16 w-16" />
                                <p className="font-bold text-2xl">Redeem Failed</p>
                                <p className="text-muted-foreground">The code you entered is invalid or has expired. Please try again.</p>
                                <Button className="w-full" onClick={resetRedeemState}>Try Again</Button>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        
        <div className="mt-6">
            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="credit">Credited</TabsTrigger>
                    <TabsTrigger value="debit">Debited</TabsTrigger>
                </TabsList>
                <div className="mt-4 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <TabsContent value="all" className="m-0">
                        {transactions.map((transaction, index) => (
                          <TransactionRow key={transaction.id} transaction={transaction} index={index} />
                        ))}
                    </TabsContent>
                    <TabsContent value="credit" className="m-0">
                         {transactions.filter(t => t.type === 'credit').map((transaction, index) => (
                          <TransactionRow key={transaction.id} transaction={transaction} index={index} />
                        ))}
                    </TabsContent>
                    <TabsContent value="debit" className="m-0">
                         {transactions.filter(t => t.type === 'debit').map((transaction, index) => (
                          <TransactionRow key={transaction.id} transaction={transaction} index={index} />
                        ))}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
      </main>
    </div>
  );
}
