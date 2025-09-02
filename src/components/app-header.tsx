
"use client";

import Link from 'next/link';
import { ChevronDown, Mic, Search, Send, User, Sparkles, Wallet, QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


type AppHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  address: string;
  subAddress: string;
  setAddress: (address: string) => void;
  onAiSearchClick: () => void;
};

export function AppHeader({ searchQuery, setSearchQuery, address, subAddress, setAddress, onAiSearchClick }: AppHeaderProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };
  
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: "destructive",
        title: "Voice Search Not Supported",
        description: "Your browser doesn't support voice search. Please try a different browser.",
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      router.push(`/search?q=${encodeURIComponent(transcript.trim())}`);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast({
        variant: "destructive",
        title: "Voice Search Error",
        description: "Something went wrong. Please try again.",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };
  
  return (
    <header className="w-full bg-gradient-to-b from-primary to-background text-gray-800 rounded-b-3xl">
      <div className="container mx-auto flex flex-col justify-center px-4 pt-4 pb-8 space-y-4">
        <div className="flex justify-between items-center text-primary-foreground">
          <button className="flex items-center gap-2 text-left" onClick={() => router.push('/location')}>
            <Send className="h-5 w-5 -rotate-45" />
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-bold">{address}</h1>
                <ChevronDown className="h-4 w-4" />
              </div>
              <p className="text-xs text-primary-foreground/80 truncate max-w-[200px]">{subAddress}</p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <Link href="/profile/wallet">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/10 hover:bg-black/20 text-white">
                  <Wallet className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/10 hover:bg-black/20 text-white">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 mt-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants"
              className="pl-10 pr-12 h-12 rounded-2xl border-none bg-white text-foreground"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl", isListening && "animate-pulse bg-primary/20")}
              aria-label="Search by voice"
              onClick={handleVoiceSearch}
              disabled={isListening}
            >
              <Mic className="h-5 w-5 text-primary" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 bg-white hover:bg-gray-100 rounded-2xl" 
              aria-label="Scan QR Code"
              onClick={() => router.push('/scan-qr')}
            >
              <QrCode className="h-5 w-5 text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 bg-white hover:bg-gray-100 rounded-2xl animate-breathing-glow"
              aria-label="AI Search"
              onClick={onAiSearchClick}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>
         <div className="relative mt-4">
            <Image
                src="https://placehold.co/1200x400.png"
                alt="Flavourful Feast-ival"
                width={1200}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
                data-ai-hint="food festival banner"
            />
        </div>
      </div>
    </header>
  );
}
