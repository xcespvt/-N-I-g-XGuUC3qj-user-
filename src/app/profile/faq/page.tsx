
'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
    {
        question: "How do I track my order?",
        answer: "Once your order is confirmed, you can go to 'My Orders' in your profile section. Active orders will have a 'Track Order' button which will show you the live location of your delivery partner and the estimated time of arrival."
    },
    {
        question: "How can I cancel my order?",
        answer: "You can cancel your order within 60 seconds of placing it for an instant refund. Go to 'My Orders', select the active order, and you will see a cancel option. If it's been more than 60 seconds, you may need to contact support."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept a wide range of payment methods including UPI, Credit and Debit Cards (Visa, MasterCard, RuPay), Net Banking from all major banks, and popular wallets like Paytm."
    },
    {
        question: "How do I report an issue with my order?",
        answer: "If you have any issues with your order, such as incorrect items or quality concerns, please go to the 'Support' section in your profile. You can start a live chat with our AI assistant Casey for immediate help."
    },
    {
        question: "How does the wallet cashback work?",
        answer: "You can earn cashback in your Crevings Wallet through various offers and promotions. The wallet balance can be used to pay for your future orders, giving you a discount on your total bill."
    },
    {
        question: "Can I pre-order for a dine-in booking?",
        answer: "Yes! When you book a table at a partner restaurant, you'll get an option to pre-order your meal. This helps you save time, and your food will be ready by the time you arrive."
    },
    {
        question: "How do I change my delivery address?",
        answer: "You can manage your saved addresses in the 'Manage Addresses' section of your profile. To change the address for an ongoing order, please contact support immediately, though changes are not guaranteed once the order is out for delivery."
    }
]

export default function FaqPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">FAQs</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up-and-fade">
             <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-bold text-base hover:no-underline">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </main>
    </div>
  );
}
