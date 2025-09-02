
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { XCircle, LifeBuoy, RefreshCw } from 'lucide-react';

export default function OrderFailedPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <XCircle className="mx-auto h-20 w-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
        <p className="mt-2 text-muted-foreground">
          Unfortunately, we were unable to process your payment. Please try again or contact support.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-4 text-left shadow-sm border">
            <p className="text-sm text-muted-foreground">
                Don't worry, if any amount was debited from your account, it will be refunded within 5-7 business days.
            </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button 
            className="w-full h-14 bg-primary text-primary-foreground text-lg font-bold"
            onClick={() => router.push('/checkout')}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-14 border-gray-300 bg-white text-lg font-bold"
            onClick={() => router.push('/profile/support')}
          >
            <LifeBuoy className="mr-2 h-5 w-5" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
