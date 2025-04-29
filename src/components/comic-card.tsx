"use client"

import { useState } from "react"
import { Book, Info, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Comic {
  title: string
  thumb_url?: string
  poster?: string
  thumb?: string
  rating?: string
  slug?: string
  category?: Array<{
    id: string
    name: string
    slug: string
  }>
}

interface ComicCardProps {
  comic: Comic
  index: number
}

export default function ComicCard({ comic, index }: ComicCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()
  const slug = comic.slug || comic.title.toLowerCase().replace(/\s+/g, "-")

  // Use the first available image source
  const imageUrl = comic.thumb_url
      ? `/uploads/comics/${comic.thumb_url}`
      : comic.thumb || comic.poster || "/placeholder.svg"

  return (
      <div className="group">
        <div
            className="relative aspect-[2/3] overflow-hidden rounded-lg cursor-pointer"
            onClick={() => router.push(`/truyen-tranh/${slug}`)}
        >
          <img
              loading="lazy"
              src={imageUrl || "/placeholder.svg"}
              alt={comic.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category tags */}
          {comic.category && comic.category.length > 0 && (
              <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end max-w-[80%]">
                <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs py-0 px-1.5">
                  {comic.category[0].name}
                </Badge>
                {comic.category.length > 1 && (
                    <Badge className="bg-gray-700/80 hover:bg-gray-700 text-white text-xs py-0 px-1.5">
                      +{comic.category.length - 1}
                    </Badge>
                )}
              </div>
          )}

          {/* Bamboo frame decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500/30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500/30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500/30"></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 p-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <Link href={`/read/${slug}/chapter-1`}>
                  <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 rounded-full p-0 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Book className="h-4 w-4" />
                    <span className="sr-only">Read</span>
                  </Button>
                </Link>

                <div className="flex gap-2">
                  <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 rounded-full p-0 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsLiked(!isLiked)
                      }}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="sr-only">Like</span>
                  </Button>

                  <Link href={`/truyen-tranh/${slug}`} onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0 text-white">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-medium line-clamp-1">{comic.title}</h3>
        </div>
      </div>
  )
}
