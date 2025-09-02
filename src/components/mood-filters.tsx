"use client"

import { Button } from "./ui/button"

const moods = ["Offers", "Healthy", "Fast Food", "Express"]

export function MoodFilters() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">What are you in the mood for?</h2>
      <div className="flex gap-3">
        {moods.map((mood) => (
          <Button key={mood} variant="outline" className="rounded-full bg-white border-gray-300">
            {mood}
          </Button>
        ))}
      </div>
    </section>
  )
}
