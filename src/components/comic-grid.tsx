"use client"

import { motion } from "framer-motion"
import ComicCard from "@/components/comic-card"

interface Comic {
  id: string
  name: string
  origin_name: string
  slug: string
  year: number
  thumb_url: string
  status?: string
  category?: { name: string; slug: string }[]
  author?: { name: string; slug: string }[]
}

interface ComicGridProps {
  comics: Comic[]
}

export default function ComicGrid({ comics }: ComicGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8"
    >
      {comics.map((comic, index) => (
        <ComicCard
          key={comic.slug}
          comic={{
            title: comic.name,
            thumb: "https://img.otruyenapi.com/uploads/comics/" + comic.thumb_url || "/placeholder.svg",
            slug: comic.slug,
          }}
          index={index}
        />
      ))}

      {comics.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <p className="text-muted-foreground">Không tìm thấy truyện nào</p>
        </div>
      )}
    </motion.div>
  )
}
