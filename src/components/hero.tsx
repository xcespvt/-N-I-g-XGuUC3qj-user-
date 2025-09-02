"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section className="mb-6">
      <div className="overflow-hidden rounded-2xl">
        <Image
            src="https://placehold.co/1200x400.png"
            alt="Delicious donut"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="donut dessert"
        />
      </div>
    </section>
  )
}
