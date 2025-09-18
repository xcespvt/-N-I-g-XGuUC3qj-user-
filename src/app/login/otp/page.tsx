'use client';

import { Suspense } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, MessageSquare, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpForm />
    </Suspense>
  );
}

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phone') || '9973232032';
  const [, setIsFirstLogin] = useLocalStorage('is-first-login', false);

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const handleResend = () => {
    setCountdown(30);
    setIsResendDisabled(true);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    // TODO: Add actual resend logic here
  };
  
  const isContinueDisabled = otp.join('').length !== 6;

  const handleContinue = () => {
    if (!isContinueDisabled) {
      // For now, any 6 digit OTP will work
      setIsFirstLogin(true); // Set this flag for the main page to detect first login after welcome
      router.push('/');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white p-6">
      <header className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="mt-16 flex flex-1 flex-col">
        <h1 className="text-xl font-bold text-gray-800">
          A verification code has been sent to
        </h1>
        <p className="mt-1 text-xl font-bold text-primary">
          +91 - {phoneNumber}
        </p>

        <div className="mt-8 flex w-full justify-between gap-2 md:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="aspect-square h-auto w-full max-w-14 rounded-lg border border-gray-200 bg-gray-50 text-center text-2xl font-bold focus:border-primary focus:ring-primary"
            />
          ))}
        </div>
        
        <Button
            className={cn(
                "mt-8 h-12 w-full rounded-lg text-lg font-bold text-white",
                isContinueDisabled ? "bg-gray-300" : "bg-primary hover:bg-primary/90"
            )}
            disabled={isContinueDisabled}
            onClick={handleContinue}
          >
            Continue
        </Button>

        <div className="mt-8 text-center text-sm text-gray-500">
            Resend OTP in <span className="font-bold text-primary">{`0:${countdown.toString().padStart(2, '0')}`}</span>
        </div>

        <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline" className="rounded-full border-gray-300" onClick={handleResend} disabled={isResendDisabled}>
                <MessageSquare className="mr-2 h-4 w-4"/>
                SMS
            </Button>
            <Button variant="outline" className="rounded-full border-gray-300" onClick={handleResend} disabled={isResendDisabled}>
                <Smartphone className="mr-2 h-4 w-4" />
                Whatsapp
            </Button>
        </div>

      </main>
    </div>
  );
}
