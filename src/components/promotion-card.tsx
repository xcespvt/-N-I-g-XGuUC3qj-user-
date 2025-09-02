
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import type { Offer } from "@/lib/types";
import { cn } from "@/lib/utils";

type PromotionCardProps = {
  offer: Offer;
};

export function PromotionCard({ offer }: PromotionCardProps) {
  return (
    <div className={cn(
        "relative w-full h-48 rounded-2xl overflow-hidden shadow-sm text-foreground",
        "bg-gradient-to-tr from-accent to-background"
    )}>
        <div className="relative h-full flex flex-col justify-between p-4">
            <div>
                 <div className="flex items-center gap-2 mb-2">
                    <Image src={offer.logo} alt={`${offer.restaurant} logo`} width={32} height={32} className="rounded-full border-2 border-white" />
                    <p className="text-sm font-semibold">{offer.restaurant}</p>
                </div>
                <h3 className="text-xl font-bold text-primary">{offer.title}</h3>
                <p className="text-sm">{offer.subtitle}</p>
            </div>
            <div>
                <Button className="bg-primary hover:bg-primary/90 rounded-full font-bold h-9">
                    ORDER NOW
                </Button>
                <p className="text-xs text-muted-foreground mt-1">*T&C apply</p>
            </div>
        </div>
    </div>
  );
}
