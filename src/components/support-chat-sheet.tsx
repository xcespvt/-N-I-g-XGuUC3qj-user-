
'use client';

import { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, Mic, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supportChat } from '@/ai/flows/support-chat';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { supportChatAudio } from '@/ai/flows/support-chat-audio';

type Message = {
    role: 'user' | 'model';
    content: string;
    audioUrl?: string;
};

const BotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C8.68629 4 6 6.68629 6 10V12H18V10C18 6.68629 15.3137 4 12 4Z" fill="currentColor"/>
        <path d="M4 18C4 16.8954 4.89543 16 6 16H18C19.1046 16 20 16.8954 20 18V20H4V18Z" fill="currentColor"/>
    </svg>
);

export const SupportChatSheet = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            content: "Hello! I'm Casey, your AI support assistant. How can I help you? You can type or send a voice message.",
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

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

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    const base64Audio = reader.result as string;
                    
                    const userMessage: Message = { role: 'user', content: '[Audio Message]', audioUrl: URL.createObjectURL(audioBlob) };
                    setMessages(prev => [...prev, userMessage]);
                    setIsLoading(true);

                    try {
                        const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
                        const response = await supportChatAudio({ audio: base64Audio, chatHistory });
                        
                        const modelMessage: Message = { role: 'model', content: response.textResponse, audioUrl: response.audioResponse };
                        setMessages(prev => [...prev, modelMessage]);

                    } catch (error) {
                        console.error('Error with audio support chat:', error);
                        const errorMessage: Message = { role: 'model', content: "I'm sorry, I couldn't process the audio. Please try again." };
                        setMessages(prev => [...prev, errorMessage]);
                    } finally {
                        setIsLoading(false);
                    }
                };
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error starting recording:', err);
            toast({
                variant: "destructive",
                title: "Microphone Error",
                description: "Could not access the microphone. Please check your permissions.",
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    
    const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
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
                <SheetHeader className="p-4 border-b flex-row items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white">
                            <BotIcon />
                        </div>
                        <SheetTitle>Crevings Support Chat</SheetTitle>
                    </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => onOpenChange(false)}>
                        <X className="h-5 w-5" />
                    </Button>
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
                                    {message.audioUrl ? (
                                        <audio controls src={message.audioUrl} className="w-full h-10" />
                                    ) : (
                                        <p className="text-sm">{message.content}</p>
                                    )}
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
                                     <p className="text-sm font-medium text-gray-600">Casey is thinking...</p>
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
                            placeholder="Type or record a message..." 
                            className="h-12 pr-12" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading || isRecording}
                        />
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                                "absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10",
                                isRecording && "bg-red-500/20 text-red-500 animate-pulse"
                            )} 
                            onClick={handleMicClick}
                            disabled={isLoading}
                         >
                            <Mic className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button size="icon" className="h-11 w-11 bg-primary rounded-lg shrink-0" onClick={handleSendMessage} disabled={isLoading || !inputValue || isRecording}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
