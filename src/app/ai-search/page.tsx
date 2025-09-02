
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Flame,
  Heart,
  Leaf,
  Cookie,
  Utensils,
  CookingPot,
  Feather,
  Gift,
  Hand,
  Vegan,
  WheatOff,
  Grape,
  Beef,
  Sandwich,
  PartyPopper,
  Users,
  Moon,
  GlassWater,
  Briefcase,
  Sparkles,
  ChevronLeft,
  Loader2,
  Frown,
  MessageSquareQuote,
  Star,
  Clock,
  Palette,
  FileText,
  Type,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getFoodRecommendations, type FoodSommelierOutput } from '@/ai/flows/food-sommelier';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

// AI Search options
const cravings = [
  { name: 'Spicy', icon: Flame },
  { name: 'Comfort', icon: Heart },
  { name: 'Healthy', icon: Leaf },
  { name: 'Sweet', icon: Cookie },
  { name: 'Savory', icon: Utensils },
  { name: 'Cheesy', icon: CookingPot },
  { name: 'Light', icon: Feather },
  { name: 'Surprise Me!', icon: Gift },
];

const dietaryNeeds = [
  { name: 'Anything', icon: Hand },
  { name: 'Vegetarian', icon: Leaf },
  { name: 'Vegan', icon: Vegan },
  { name: 'Gluten-Free', icon: WheatOff },
  { name: 'Keto', icon: Grape },
  { name: 'Non-Veg', icon: Beef },
];

const occasions = [
  { name: 'Quick Bite', icon: Sandwich },
  { name: 'Celebration', icon: PartyPopper },
  { name: 'Family Dinner', icon: Users },
  { name: 'Late Night', icon: Moon },
  { name: 'Date Night', icon: GlassWater },
  { name: 'Work Lunch', icon: Briefcase },
];

// Food Challenges options
const challenges = [
  { name: 'Eat By Color', icon: Palette },
  { name: 'Name Bites', icon: FileText },
  { name: 'Alphabet Eats', icon: Type },
]

const colors = [
    { name: 'Red', hex: '#EF4444' },
    { name: 'Orange', hex: '#F97316' },
    { name: 'Yellow', hex: '#FACC15' },
    { name: 'Green', hex: '#22C55E' },
    { name: 'Brown', hex: '#78350F' },
    { name: 'White', hex: '#F1F5F9' },
]

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');


const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{children}</div>
  </div>
);

const SelectionCard = ({
  icon: Icon,
  label,
  isSelected,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl group',
      isSelected
        ? 'bg-primary/10 border-primary text-primary shadow-lg'
        : 'bg-white border-gray-200 hover:border-primary'
    )}
  >
    <Icon className="h-6 w-6 transition-transform group-hover:animate-shake" />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

const ResultCard = ({ rec, onAddToCart }: { rec: FoodSommelierOutput['recommendations'][0], onAddToCart: (rec: FoodSommelierOutput['recommendations'][0]) => void }) => {
    const router = useRouter();
    const handleCardClick = () => {
        router.push(`/restaurant/${rec.restaurantId}/details`);
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border transition-shadow hover:shadow-2xl hover:-translate-y-1 transform duration-300">
            <div className="relative h-48 w-full cursor-pointer" onClick={handleCardClick}>
                 <Image src={rec.image} alt={rec.dishName} fill className="object-cover" data-ai-hint="restaurant food" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-2xl font-bold">{rec.dishName}</h3>
                    <p className="text-sm font-medium">from {rec.restaurantName}</p>
                 </div>
            </div>
            <div className="p-4">
                <div className="flex items-start gap-3 bg-primary/10 text-primary-foreground p-3 rounded-lg border border-primary/20">
                    <MessageSquareQuote className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                    <p className="text-sm font-medium text-primary">{rec.description}</p>
                </div>
                 <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{rec.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{rec.deliveryTime} mins</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold">₹{rec.price.toFixed(2)}</p>
                    <Button 
                        className="bg-primary hover:bg-primary/90 rounded-lg font-bold px-8 h-11"
                        onClick={() => onAddToCart(rec)}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    )
};


export default function AiSearchPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // Main Tab State
  const [activeMainTab, setActiveMainTab] = useState<'ai' | 'challenges'>('ai');

  // AI Search State
  const [selectedCravings, setSelectedCravings] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string>('Anything');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Quick Bite');
  
  // Food Challenges State
  const [activeChallenge, setActiveChallenge] = useState<string>('Eat By Color');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [nameBitesInput, setNameBitesInput] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  
  // API State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<FoodSommelierOutput | null>(null);
  const [address] = useLocalStorage<string>('user-address', 'Mumbai Central');

  const handleCravingClick = (craving: string) => {
    setSelectedCravings((prev) =>
      prev.includes(craving) ? prev.filter((c) => c !== craving) : [...prev, craving]
    );
  };
  
  const handleFindMyMeal = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
        const now = new Date();
        let mood = '';
        let mealType = 'any meal';

        if (activeMainTab === 'ai') {
            mood = `${selectedCravings.join(', ')} food for ${selectedOccasion}`;
            mealType = selectedOccasion;
        } else if (activeMainTab === 'challenges') {
            if (activeChallenge === 'Eat By Color' && selectedColor) {
                mood = `Find me something to eat that is the color ${selectedColor}.`;
            } else if (activeChallenge === 'Name Bites' && nameBitesInput) {
                mood = `Find me food that starts with the letters in the word "${nameBitesInput}". Be creative!`;
            } else if (activeChallenge === 'Alphabet Eats' && selectedLetter) {
                mood = `Find me something to eat that starts with the letter "${selectedLetter}".`;
            }
            else {
                setError("Please make a selection to find a meal!");
                setLoading(false);
                return;
            }
        } else {
            setError("Please make a selection to find a meal!");
            setLoading(false);
            return;
        }
        
        const recommendations = await getFoodRecommendations({
            mood: mood,
            timeOfDay: now.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
            location: address,
            dietaryPreferences: selectedDiet === 'Anything' ? undefined : selectedDiet,
            mealType: mealType,
        });
        setResults(recommendations);
    } catch(e) {
        setError("Sorry, I couldn't find any recommendations. Please try again!");
        console.error(e);
    } finally {
        setLoading(false);
    }
  }

  const handleAddToCart = (rec: FoodSommelierOutput['recommendations'][0]) => {
    toast({
        title: "Added to cart!",
        description: `${rec.dishName} from ${rec.restaurantName} has been added to your cart.`,
    });
  }

  if (loading || error || results) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-50">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-white px-4">
                <Button variant="ghost" size="icon" onClick={() => { setResults(null); setError(null); }}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-bold">Your Meal Plan</h1>
            </header>
            <main className="flex-1 p-4">
                {loading && (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="font-semibold text-lg">Finding the best meals for you...</p>
                    <p className="text-sm">This may take a moment.</p>
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center text-center text-red-500 py-20">
                    <Frown className="h-12 w-12 mb-4" />
                    <p className="font-semibold text-lg">{error}</p>
                    <Button onClick={() => { setError(null); handleFindMyMeal(); }} className="mt-4">Try Again</Button>
                  </div>
                )}
                {results && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                        <p className="text-blue-800 font-medium">{results.greeting}</p>
                    </div>
                    {results.recommendations.map((rec, index) => (
                        <ResultCard key={index} rec={rec} onAddToCart={handleAddToCart} />
                    ))}
                    <div className="text-center text-muted-foreground font-semibold pt-4">
                        <p>{results.closing}</p>
                    </div>
                  </div>
                )}
            </main>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
         <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1 text-sm font-semibold">
          <button 
            onClick={() => setActiveMainTab('ai')}
            className={cn(
                "rounded-full px-4 py-1.5",
                activeMainTab === 'ai' ? "bg-white text-primary shadow-sm" : "text-gray-500"
            )}
          >
            AI
          </button>
          <button 
            onClick={() => setActiveMainTab('challenges')}
            className={cn(
                "rounded-full px-4 py-1.5",
                activeMainTab === 'challenges' ? "bg-white text-primary shadow-sm" : "text-gray-500"
            )}
           >
            Food Challenges
          </button>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 p-4">
        {activeMainTab === 'ai' && (
            <>
                <Section title="What are you creving?">
                {cravings.map((item) => (
                    <SelectionCard
                    key={item.name}
                    icon={item.icon}
                    label={item.name}
                    isSelected={selectedCravings.includes(item.name)}
                    onClick={() => handleCravingClick(item.name)}
                    />
                ))}
                </Section>
                <Section title="Any dietary needs?">
                {dietaryNeeds.map((item) => (
                    <SelectionCard
                    key={item.name}
                    icon={item.icon}
                    label={item.name}
                    isSelected={selectedDiet === item.name}
                    onClick={() => setSelectedDiet(item.name)}
                    />
                ))}
                </Section>
                <Section title="What's the occasion?">
                {occasions.map((item) => (
                    <SelectionCard
                    key={item.name}
                    icon={item.icon}
                    label={item.name}
                    isSelected={selectedOccasion === item.name}
                    onClick={() => setSelectedOccasion(item.name)}
                    />
                ))}
                </Section>
            </>
        )}
        {activeMainTab === 'challenges' && (
            <div>
                <div className="mb-6 border-b">
                    <div className="flex gap-2 -mb-px">
                        {challenges.map(challenge => (
                            <button
                                key={challenge.name}
                                onClick={() => setActiveChallenge(challenge.name)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 border-b-2 font-semibold",
                                    activeChallenge === challenge.name 
                                    ? 'border-primary text-primary' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                )}
                            >
                                <challenge.icon className="h-4 w-4" />
                                <span>{challenge.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                {activeChallenge === 'Eat By Color' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-center">Pick a color</h2>
                        <div className="grid grid-cols-3 gap-6">
                           {colors.map(color => (
                                <div key={color.name} className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => setSelectedColor(color.name)}
                                        className={cn(
                                            "w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl group",
                                            selectedColor === color.name ? 'ring-4 ring-offset-2 ring-primary shadow-lg' : ''
                                        )}
                                        style={{ backgroundColor: color.hex }}
                                        aria-label={`Select ${color.name}`}
                                    />
                                    <span className="font-semibold">{color.name}</span>
                                </div>
                           ))}
                        </div>
                    </div>
                )}
                 {activeChallenge === 'Name Bites' && (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-bold mb-4">Enter a word (like your name!)</h2>
                        <Input 
                            value={nameBitesInput}
                            onChange={(e) => setNameBitesInput(e.target.value.toUpperCase())}
                            placeholder="E.G., KAVITA"
                            className="h-12 max-w-sm mx-auto text-center text-lg tracking-widest"
                        />
                    </div>
                )}
                 {activeChallenge === 'Alphabet Eats' && (
                    <div className="text-center py-4">
                        <h2 className="text-xl font-bold mb-4">Pick a letter</h2>
                        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-w-md mx-auto">
                            {alphabet.map(letter => (
                                <button
                                    key={letter}
                                    onClick={() => setSelectedLetter(letter)}
                                    className={cn(
                                        "aspect-square rounded-lg border-2 font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl group",
                                        selectedLetter === letter 
                                        ? 'bg-primary/10 border-primary text-primary shadow-lg'
                                        : 'bg-white border-gray-200 hover:border-primary'
                                    )}
                                >
                                   <span className="transition-transform group-hover:animate-shake inline-block">{letter}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}
      </main>
      
      <footer className="sticky bottom-0 bg-white p-4 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <Button 
            className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold"
            onClick={handleFindMyMeal}
            disabled={
                (activeMainTab === 'ai' && selectedCravings.length === 0) ||
                (activeMainTab === 'challenges' && activeChallenge === 'Eat By Color' && !selectedColor) ||
                (activeMainTab === 'challenges' && activeChallenge === 'Name Bites' && !nameBitesInput) ||
                (activeMainTab === 'challenges' && activeChallenge === 'Alphabet Eats' && !selectedLetter)
            }
        >
          {activeMainTab === 'ai' ? 'Find My Meal' : 'Find Food'}
          {activeMainTab === 'ai' 
            ? <Sparkles className="ml-2 h-5 w-5" /> 
            : <Search className="ml-2 h-5 w-5" />
          }
        </Button>
      </footer>
    </div>
  );
}
