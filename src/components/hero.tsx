"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredMovies = [
  {
    title: "Bamboo Adventure",
    description:
      "Follow the journey of a young panda as he discovers the secrets of the bamboo forest and makes new friends along the way.",
    image: "/placeholder.svg?height=500&width=1200",
    badge: "New Release",
  },
  {
    title: "Panda Kingdom",
    description:
      "In a magical kingdom where pandas rule, one small cub must learn to become a leader and save his people from a growing threat.",
    image: "/placeholder.svg?height=500&width=1200",
    badge: "Trending",
  },
  {
    title: "Black & White",
    description:
      "A heartwarming story about friendship between two pandas from different worlds, showing that differences can bring us together.",
    image: "/placeholder.svg?height=500&width=1200",
    badge: "Featured",
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  console.log(currentIndex)
  // const currentMovie = featuredMovies[currentIndex]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Khám Phá Thế Giới Truyện Tranh
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Hàng ngàn truyện tranh hấp dẫn, cập nhật liên tục. Đọc truyện mọi lúc, mọi nơi trên mọi thiết bị.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/danh-sach/truyen-moi">
                <Button className="bg-green-600 hover:bg-green-700">Đọc Ngay</Button>
              </Link>
              <Link href="/the-loai">
                <Button variant="outline">Khám Phá Thể Loại</Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
            <img
              alt="Hero Image"
              className="aspect-video object-cover w-full"
              src="/placeholder.svg?height=400&width=800"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
