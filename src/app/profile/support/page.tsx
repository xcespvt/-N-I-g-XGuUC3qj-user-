
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, LifeBuoy, Phone, MessageSquare, Paperclip, Send, Mic, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supportChat } from '@/ai/flows/support-chat';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const SupportCard = ({ icon: Icon, title, description, waitTime, buttonText, buttonVariant = 'default', onClick }: { icon: React.ElementType, title: string, description: string, waitTime: string, buttonText: string, buttonVariant?: 'default' | 'outline', onClick?: () => void }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border animate-slide-up-and-fade">
    <div className="flex items-start gap-4">
      <Icon className="h-8 w-8 text-primary mt-1" />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <p className="mt-1 text-sm text-gray-500">{waitTime}</p>
      </div>
    </div>
    <Button className="w-full h-12 text-lg font-bold mt-6" variant={buttonVariant} onClick={onClick}>
      {buttonText}
    </Button>
  </div>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-green-500"
    >
      <path d="M16.75 13.96c.25.13.43.2.5.33.07.13.07.66 0 .79-.07.13-.5.56-1.03.82-.53.25-1.03.38-1.5.38-.75 0-1.38-.25-1.94-.63s-1.16-1-1.66-1.63c-.5-.62-.81-1.25-.88-1.62-.07-.38 0-.63.19-.82.19-.19.38-.25.5-.25.13 0 .25 0 .38.07.12.06.25.37.37.5.13.13.19.25.19.38s.06.25 0 .38c-.07.12-.13.25-.19.37-.06.13-.12.19-.06.31.06.13.25.5.56.88.38.37.75.62 1.03.75.25.13.38.12.5-.06.13-.19.56-1.03.69-1.38.12-.32.25-.38.37-.38.13 0 .25 0 .38.06zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18.13a8.13 8.13 0 1 1 8.13-8.13A8.13 8.13 0 0 1 12 20.13z" />
    </svg>
  );

type Message = {
    role: 'user' | 'model';
    content: string;
};

const BotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C8.68629 4 6 6.68629 6 10V12H18V10C18 6.68629 15.3137 4 12 4Z" fill="currentColor"/>
        <path d="M4 18C4 16.8954 4.89543 16 6 16H18C19.1046 16 20 16.8954 20 18V20H4V18Z" fill="currentColor"/>
    </svg>
);

const SupportChatSheet = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            content: "Hello! I'm Casey, your AI support assistant. How can I help you with your order today? For example, you can ask me to:\n\n- Track my last order\n- Help me cancel an order\n- Report an issue with my food\n\nYou can also upload an image if you've received a damaged item.",
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
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

        try {
            const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
            const response = await supportChat({ message: userMessage.content, chatHistory });
            const modelMessage: Message = { role: 'model', content: response.response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Error with support chat:', error);
            const errorMessage: Message = { role: 'model', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMicClick = () => {
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

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
        };
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            toast({
                variant: "destructive",
                title: "Voice Search Error",
                description: "Something went wrong. Please try again.",
            });
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };
    
    const handleAttachFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            toast({
                title: 'File Selected',
                description: `${file.name} is ready to be sent.`,
            });
            setInputValue(`Attached file: ${file.name}`);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="rounded-t-2xl h-[80vh] flex flex-col p-0">
                <SheetHeader className="p-4 border-b flex-row items-center gap-2">
                     <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                        <BotIcon />
                    </div>
                    <SheetTitle>Crevings Support Chat</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-1" ref={scrollAreaRef}>
                    <div className="p-4 space-y-6">
                       {messages.map((message, index) => (
                           <div key={index} className={cn("flex items-start gap-3", message.role === 'user' && "justify-end")}>
                               {message.role === 'model' && (
                                   <Avatar className="h-8 w-8 bg-primary text-white shrink-0">
                                       <AvatarFallback>
                                           <BotIcon />
                                       </AvatarFallback>
                                   </Avatar>
                               )}
                                <div className={cn(
                                    "p-3 rounded-2xl max-w-[80%] whitespace-pre-wrap",
                                    message.role === 'model' ? "bg-gray-100 rounded-tl-none" : "bg-primary text-white rounded-br-none"
                                )}>
                                    {message.role === 'model' && <p className="font-bold mb-1">Casey (AI Assistant)</p>}
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
                                    <AvatarFallback>
                                        <BotIcon />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none flex items-center gap-2">
                                     <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                     <p className="text-sm font-medium text-gray-600">Casey is typing...</p>
                                </div>
                            </div>
                       )}
                    </div>
                </ScrollArea>
                <div className="p-2 border-t bg-white flex items-center gap-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-lg border bg-gray-50 shrink-0" onClick={handleAttachFile}>
                        <Paperclip className="h-5 w-5 text-gray-600" />
                    </Button>
                    <div className="relative flex-1">
                        <Input 
                            placeholder="Ask a question..." 
                            className="h-12 pr-12" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading}
                        />
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                                "absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10",
                                isListening && "animate-pulse"
                            )} 
                            onClick={handleMicClick}
                            disabled={isLoading}
                         >
                            <Mic className="h-5 w-5 text-gray-600" />
                        </Button>
                    </div>
                    <Button size="icon" className="h-11 w-11 bg-primary rounded-lg shrink-0" onClick={handleSendMessage} disabled={isLoading || !inputValue}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default function SupportPage() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Support</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <SupportCard
            icon={LifeBuoy}
            title="Live Chat Support"
            description="Get instant help from our support team. We're available 24/7."
            waitTime="Avg. wait time: < 1 min"
            buttonText="Start Chat"
            onClick={() => setIsChatOpen(true)}
          />
           <SupportCard
            icon={WhatsappIcon}
            title="WhatsApp Support"
            description="Chat with us on WhatsApp for quick assistance."
            waitTime="Avg. response time: 2 mins"
            buttonText="Chat on WhatsApp"
            buttonVariant="outline"
          />
          <SupportCard
            icon={Phone}
            title="Call Support"
            description="Speak directly with one of our support agents."
            waitTime="Avg. wait time: 2-3 mins"
            buttonText="Call Now"
            buttonVariant="outline"
          />
           <SupportCard
            icon={Mail}
            title="Email Support"
            description="Send us an email with your query and we'll get back to you."
            waitTime="Avg. response time: 24 hours"
            buttonText="Send Email"
            buttonVariant="outline"
          />
        </div>
      </main>
      <SupportChatSheet open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}
