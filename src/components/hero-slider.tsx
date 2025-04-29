"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button";
const MotionButton = motion(Button);
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Comic {
    id: string
    title: string
    description: string
    image: string
    badge?: string
    slug: string
}

interface HeroSliderProps {
    comics: Comic[]
}

export default function HeroSlider({ comics }: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % comics.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [comics.length, isAutoPlaying])

    const handlePrevious = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev - 1 + comics.length) % comics.length)
    }

    const handleNext = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev + 1) % comics.length)
    }

    const handleDotClick = (index: number) => {
        setIsAutoPlaying(false)
        setCurrentIndex(index)
    }

    const currentComic = comics[currentIndex]

    return (
        <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />

            {/* Panda silhouette overlay */}
            <div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute right-0 bottom-0 w-1/2 h-auto"
                >
                    <path
                        d="M50,10 C30,10 15,25 15,45 C15,65 30,80 50,80 C70,80 85,65 85,45 C85,25 70,10 50,10 Z M35,35 C38,35 40,37 40,40 C40,43 38,45 35,45 C32,45 30,43 30,40 C30,37 32,35 35,35 Z M65,35 C68,35 70,37 70,40 C70,43 68,45 65,45 C62,45 60,43 60,40 C60,37 62,35 65,35 Z M50,65 C45,65 40,60 40,55 C40,50 45,50 50,50 C55,50 60,50 60,55 C60,60 55,65 50,65 Z"
                        fill="white"
                    />
                </svg>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentComic.image || "/placeholder.svg"}
                        alt={currentComic.title || "Comic image"}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            <div className="container relative z-20 flex h-full flex-col items-start justify-center gap-4 px-4 md:px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentComic.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-[800px]"
                    >
                        {currentComic.badge && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                                <Badge className="bg-green-600 hover:bg-green-700 mb-4">{currentComic.badge}</Badge>
                            </motion.div>
                        )}

                        <motion.h1
                            className="text-3xl font-bold text-white md:text-5xl lg:text-6xl mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            {currentComic.title}
                        </motion.h1>

                        <motion.p
                            className="max-w-[600px] text-white md:text-xl mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {currentComic.description}
                        </motion.p>

                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Link href={`/truyen-tranh/${currentComic.slug}`}>
                                <MotionButton
                                    className="bg-green-600 hover:bg-green-700 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Read now"
                                >
                                    <Play className="mr-2 h-4 w-4" /> Đọc Ngay
                                </MotionButton>
                            </Link>
                            <MotionButton
                                variant="outline"
                                className="text-white border-white hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Add to list"
                            >
                                <Plus className="mr-2 h-4 w-4" /> Thêm Vào Danh Sách
                            </MotionButton>
                            <MotionButton
                                variant="outline"
                                className="text-white border-white hover:bg-white/20 transition-all hidden sm:flex"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="More information"
                            >
                                <Info className="mr-2 h-4 w-4" /> Thông Tin
                            </MotionButton>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Thumbnail navigation */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-30">
                    {comics.map((comic, index) => (
                        <button
                            key={comic.id}
                            onClick={() => handleDotClick(index)}
                            className={`relative group ${index === currentIndex ? "scale-110 ring-2 ring-white" : "opacity-70 hover:opacity-100"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className="w-16 h-24 overflow-hidden rounded-md transition-all duration-300">
                                <Image
                                    src={comic.image || "/placeholder.svg"}
                                    alt={comic.title || "Comic thumbnail"}
                                    width={64}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {index === currentIndex && (
                                <motion.div
                                    className="absolute -inset-1 rounded-lg border border-white/50 animate-pulse"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
