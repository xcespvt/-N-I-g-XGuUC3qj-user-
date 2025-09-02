
'use client';

import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, ChevronLeft, User, Phone, Mail, BookUser, Utensils, Cake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string(),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }).optional(),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ManageProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('Profile updated:', data);
    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-white px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-2 text-lg font-bold">Manage Profile</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-white shadow-sm">
                        <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <Button variant="outline" size="sm">Change Photo</Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF. Max 5MB.</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-4 shadow-sm space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700"><User className="h-4 w-4" />Full Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700"><Phone className="h-4 w-4" />Phone Number</FormLabel>
                            <FormControl>
                                <Input {...field} readOnly className="h-11 bg-gray-100 cursor-not-allowed" />
                            </FormControl>
                             <p className="text-xs text-muted-foreground mt-1">Phone number cannot be changed.</p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700"><Mail className="h-4 w-4" />Email Address</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" className="h-11" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="flex items-center gap-2 text-gray-700"><Cake className="h-4 w-4" />Date of Birth</FormLabel>
                             <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "h-11 w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700"><BookUser className="h-4 w-4" />Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <div className="mt-6">
                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 font-bold text-lg">
                Save Changes
                </Button>
            </div>
            </form>
        </Form>
      </main>
    </div>
  );
}
