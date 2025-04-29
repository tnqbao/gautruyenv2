"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Settings, Home, List, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ComicImage {
  id: string
  src: string
  alt: string
}

interface Chapter {
  id: string
  name: string
  slug: string
}

interface ComicReaderProps {
  title: string
  images: ComicImage[]
  prevChapter?: Chapter
  nextChapter?: Chapter
  comicSlug: string
}

export default function ComicReader({ title, images, prevChapter, nextChapter, comicSlug }: ComicReaderProps) {
  const [readingMode, setReadingMode] = useState<"vertical" | "horizontal" | "paged">("vertical")
  const [currentPage, setCurrentPage] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (readingMode === "paged" || readingMode === "horizontal") {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          navigatePage("prev")
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          navigatePage("next")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [readingMode, currentPage])

  // Navigate between pages in paged mode
  const navigatePage = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (direction === "next" && currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Save reading history to localStorage
  useEffect(() => {
    try {
      const historyItem = {
        comicSlug,
        chapterSlug: prevChapter ? prevChapter.slug.split("/")[1] : "",
        title,
        timestamp: new Date().toISOString(),
      }

      const history = JSON.parse(localStorage.getItem("readingHistory") || "[]")
      const filteredHistory = history.filter((item: any) => item.comicSlug !== comicSlug)
      localStorage.setItem("readingHistory", JSON.stringify([historyItem, ...filteredHistory].slice(0, 20)))
    } catch (error) {
      console.error("Error saving reading history:", error)
    }
  }, [comicSlug, title, prevChapter])

  return (
    <div className="space-y-4">
      {/* Reader header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm py-2 px-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold truncate">{title}</h1>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Chế độ đọc</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={cn(readingMode === "vertical" && "bg-green-600 text-white")}
                  onClick={() => setReadingMode("vertical")}
                >
                  Cuộn dọc
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={cn(readingMode === "paged" && "bg-green-600 text-white")}
                  onClick={() => setReadingMode("paged")}
                >
                  Từng trang
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/truyen-tranh/${comicSlug}`}>
              <Button variant="ghost" size="icon" className="text-white">
                <List className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Comic reader content */}
      <div className="max-w-3xl mx-auto">
        {readingMode === "vertical" && (
          <div className="space-y-2">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto"
                  priority
                />
              </div>
            ))}
          </div>
        )}

        {readingMode === "paged" && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Image
                  src={images[currentPage].src || "/placeholder.svg"}
                  alt={images[currentPage].alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto"
                  priority
                />

                <div className="absolute inset-0 flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-full w-1/3 rounded-none opacity-0 hover:opacity-100 hover:bg-black/20"
                    onClick={() => navigatePage("prev")}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-full w-1/3 rounded-none opacity-0 hover:opacity-100 hover:bg-black/20"
                    onClick={() => navigatePage("next")}
                    disabled={currentPage === images.length - 1}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-white text-sm">
                  {currentPage + 1} / {images.length}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="sticky bottom-4 left-0 right-0 flex justify-center gap-4 z-40">
        <Link
          href={prevChapter ? `/read/${prevChapter.slug}` : "#"}
          className={cn(
            "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors",
            !prevChapter && "opacity-50 pointer-events-none",
          )}
        >
          <ChevronLeft className="inline-block mr-1 h-4 w-4" /> Chương trước
        </Link>

        <Link
          href={nextChapter ? `/read/${nextChapter.slug}` : "#"}
          className={cn(
            "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors",
            !nextChapter && "opacity-50 pointer-events-none",
          )}
        >
          Chương sau <ChevronRight className="inline-block ml-1 h-4 w-4" />
        </Link>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
