
'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, Mic, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Message = {
    role: 'user' | 'partner';
    content: string;
};

const BikeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H16L14 7L10 7L8 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="15" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const DeliveryPartnerChatSheet = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'partner',
            content: "Hi, I'm Rahul, your delivery partner. I'm on my way to pick up your order!",
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage: Message = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate a response from the delivery partner
        setTimeout(() => {
            const partnerResponse: Message = { role: 'partner', content: "Okay, got it!" };
            setMessages(prev => [...prev, partnerResponse]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="rounded-t-2xl h-[80vh] flex flex-col p-0">
                <SheetHeader className="p-4 border-b flex-row items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Rahul Kumar" />
                            <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                            <SheetTitle>Rahul Kumar</SheetTitle>
                            <p className="text-xs text-muted-foreground">Delivery Partner</p>
                        </div>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onOpenChange(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </SheetHeader>
                <ScrollArea className="flex-1" ref={scrollAreaRef}>
                    <div className="p-4 space-y-6">
                       {messages.map((message, index) => (
                           <div key={index} className={cn("flex items-start gap-3", message.role === 'user' && "justify-end")}>
                               {message.role === 'partner' && (
                                   <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src="https://placehold.co/100x100.png" alt="Rahul Kumar" />
                                        <AvatarFallback>RK</AvatarFallback>
                                   </Avatar>
                               )}
                                <div className={cn(
                                    "p-3 rounded-2xl max-w-[80%] whitespace-pre-wrap",
                                    message.role === 'partner' ? "bg-gray-100 rounded-tl-none" : "bg-primary text-white rounded-br-none"
                                )}>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                 {message.role === 'user' && (
                                   <Avatar className="h-8 w-8 bg-gray-200 text-gray-700 shrink-0">
                                       <AvatarFallback>
                                           <User className="w-5 h-5"/>
                                       </AvatarFallback>
                                   </Avatar>
                               )}
                           </div>
                       ))}
                       {isLoading && (
                            <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8 bg-primary text-white shrink-0">
                                   <AvatarImage src="https://placehold.co/100x100.png" alt="Rahul Kumar" />
                                    <AvatarFallback>RK</AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none flex items-center gap-2">
                                     <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                     <p className="text-sm font-medium text-gray-600">Rahul is typing...</p>
                                </div>
                            </div>
                       )}
                    </div>
                </ScrollArea>
                <div className="p-2 border-t bg-white flex items-center gap-2">
                    <Input 
                        placeholder="Type your message..." 
                        className="h-12" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                    />
                    <Button size="icon" className="h-11 w-11 bg-primary rounded-lg shrink-0" onClick={handleSendMessage} disabled={isLoading || !inputValue}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

