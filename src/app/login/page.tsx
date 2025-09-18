
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const isContinueDisabled = phoneNumber.length < 10;

  const handleContinue = () => {
    if (!isContinueDisabled) {
      router.push(`/login/otp?phone=${phoneNumber}`);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/pexels-janetrangdoan-1099680.jpg"
        alt="Background image of a cup of tea"
        fill
        className="object-cover"
        data-ai-hint="chai tea"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full flex-col justify-between text-white">
        <header className="px-6 pt-8">
          <div className="flex items-center">
            <span className="text-3xl font-bold tracking-tighter text-yellow-300">
              Crevings
            </span>
            <span className="ml-2 mt-1 text-xs font-light text-yellow-300">
              10-minute
              <br />
              food delivery
            </span>
          </div>
          <div className="mt-8">
            <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-md">
              FROM YOUR
              <br />
              NEXT~DOOR
              <br />
              kitchen
            </h1>
            <div className="mt-4 inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-white shadow-lg">
              IN 10 MINS
            </div>
          </div>
        </header>

        <div className="w-full rounded-t-[2rem] bg-white p-6 pb-8 text-black shadow-2xl">
          <h2 className="text-xl font-bold">Log in with your number</h2>
          <div className="relative mt-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-500">
              +91 -
            </span>
            <Input
              type="tel"
              placeholder=""
              className="h-12 w-full rounded-lg border-gray-300 bg-gray-100 pl-14 text-base"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setPhoneNumber(value);
                }
              }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            We&apos;ll send a verification code here
          </p>
          <Button
            className={cn(
                "mt-4 h-12 w-full rounded-lg text-lg font-bold text-white",
                isContinueDisabled ? "bg-gray-300" : "bg-primary hover:bg-primary/90"
            )}
            disabled={isContinueDisabled}
            onClick={handleContinue}
          >
            Continue
          </Button>
          <p className="mt-4 text-center text-xs text-gray-400">
            By clicking "Continue" Privacy policy & Terms of Conditions apply
          </p>
        </div>
      </div>
    </div>
  );
}
