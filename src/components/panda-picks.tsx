"use client"
import { Star } from "lucide-react"
import Link from "next/link"

interface PandaPicksProps {
  picks: {
    title: string
    year: string
    poster: string
    description: string
    rating: string
    slug?: string
  }[]
}

export default function PandaPicks({ picks }: PandaPicksProps) {
  return (
    <section className="py-8 md:py-12 bg-black text-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8 flex items-center">
          <span className="text-green-500 mr-2">🐼</span> Panda Picks
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {picks.map((pick, index) => (
            <Link
              key={index}
              href={`/truyen-tranh/${pick.slug || pick.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex gap-4 hover:bg-white/5 p-3 rounded-lg transition-colors"
            >
              <img
                src={pick.poster || "/placeholder.svg"}
                alt={pick.title}
                className="h-24 w-16 object-cover rounded-md flex-shrink-0"
              />
              <div>
                <h3 className="font-medium">{pick.title}</h3>
                <div className="flex items-center text-xs text-yellow-500 mb-1">
                  <Star className="h-3 w-3 fill-yellow-500 mr-1" />
                  {pick.rating}
                </div>
                <p className="text-sm text-gray-400 line-clamp-3">{pick.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
