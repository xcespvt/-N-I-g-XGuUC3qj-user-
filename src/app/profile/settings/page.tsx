
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Palette, Languages, Shield, ChevronRight, Mail, MessageSquare, HelpCircle, Phone, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';


const SettingsOption = ({ icon: Icon, label, description, action, className, iconClassName }: { icon: React.ElementType, label: string, description: string, action: React.ReactNode, className?: string, iconClassName?: string }) => (
  <div className={cn("flex justify-between items-center p-4", className)}>
    <div className="flex items-center gap-4">
        <Icon className={cn("h-6 w-6 text-primary", iconClassName)} />
      <div>
        <h3 className="font-bold text-gray-800 text-base">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    {action}
  </div>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase px-4 mb-2">{title}</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {children}
        </div>
    </div>
)


export default function SettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [theme, setTheme] = useState('light');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    console.log("Account deleted");
    router.push('/login');
  }

  if (!mounted) {
    return null; // or a loading spinner
  }

  const settingsItems = [
      {
        section: "General",
        items: [
            {
                icon: Palette,
                label: "Dark Mode",
                description: "Switch between light and dark themes",
                action: <Switch checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
            },
            {
                icon: Languages,
                label: "Language",
                description: "English (United States)",
                action: <ChevronRight className="h-5 w-5 text-gray-400" />
            }
        ]
      },
      {
          section: "Notifications",
          items: [
              {
                icon: Bell,
                label: "Push Notifications",
                description: "For offers and order updates",
                action: <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              },
              {
                icon: Mail,
                label: "Email Notifications",
                description: "For newsletters and updates",
                action: <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              },
              {
                icon: MessageSquare,
                label: "SMS Notifications",
                description: "For order confirmations",
                action: <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              }
          ]
      },
      {
          section: "Security & Privacy",
          items: [
              {
                icon: Shield,
                label: "Privacy Policy",
                description: "View our privacy policy",
                action: <ChevronRight className="h-5 w-5 text-gray-400" />
              },
              {
                icon: FileText,
                label: "Terms of Use",
                description: "Read our terms and conditions",
                action: <ChevronRight className="h-5 w-5 text-gray-400" />
              },
              {
                icon: Trash2,
                label: "Delete Account",
                description: "Permanently delete your account",
                action: (
                   <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" className="text-red-600 hover:text-red-700 font-bold">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ),
                className: "text-red-600",
                iconClassName: "text-red-600",
              }
          ]
      }
  ]

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Settings</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
            {settingsItems.map((section, sectionIndex) => (
                <Section key={section.section} title={section.section}>
                    {section.items.map((item, itemIndex) => (
                         <div 
                            key={item.label} 
                            className="animate-slide-up-and-fade"
                            style={{ animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 100}ms` }}
                        >
                            <SettingsOption 
                                icon={item.icon}
                                label={item.label}
                                description={item.description}
                                action={item.action}
                                className={item.className}
                                iconClassName={item.iconClassName}
                            />
                            {itemIndex < section.items.length - 1 && <Separator className="ml-16" />}
                         </div>
                    ))}
                </Section>
            ))}
        </div>
      </main>
    </div>
  );
}
