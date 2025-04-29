"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { ComicSectionSkeleton } from "@/components/loading-skeletons"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { categories } from "@/components/category-dropdown"
import type { JSX } from "react/jsx-runtime"

export default function CategoryPage() {
    // Define category icons based on slug
    const getCategoryIcon = (slug: string) => {
        const icons: Record<string, JSX.Element> = {
            action: <span className="text-2xl">🔥</span>,
            romance: <span className="text-2xl">❤️</span>,
            comedy: <span className="text-2xl">😂</span>,
            fantasy: <span className="text-2xl">🧙</span>,
            drama: <span className="text-2xl">🎭</span>,
            supernatural: <span className="text-2xl">👻</span>,
            horror: <span className="text-2xl">😱</span>,
            mystery: <span className="text-2xl">🔍</span>,
            "sci-fi": <span className="text-2xl">🚀</span>,
            "slice-of-life": <span className="text-2xl">🏡</span>,
            sports: <span className="text-2xl">⚽</span>,
            adventure: <span className="text-2xl">🧭</span>,
            historical: <span className="text-2xl">📜</span>,
            "school-life": <span className="text-2xl">🏫</span>,
            seinen: <span className="text-2xl">👨</span>,
            shoujo: <span className="text-2xl">👧</span>,
            shounen: <span className="text-2xl">👦</span>,
            "martial-arts": <span className="text-2xl">🥋</span>,
        }

        return icons[slug] || <span className="text-2xl">📚</span>
    }

    // Define category colors based on slug
    const getCategoryColor = (slug: string, index: number) => {
        const colors = [
            "from-red-500 to-orange-500",
            "from-blue-500 to-purple-500",
            "from-green-500 to-teal-500",
            "from-yellow-500 to-amber-500",
            "from-pink-500 to-rose-500",
            "from-indigo-500 to-blue-500",
            "from-emerald-500 to-green-500",
            "from-orange-500 to-amber-500",
            "from-purple-500 to-violet-500",
            "from-teal-500 to-cyan-500",
        ]

        // Use a hash function to consistently map slugs to colors
        const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        return colors[hash % colors.length] || colors[index % colors.length]
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Thể Loại" }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Thể Loại Truyện</h1>
                    <p className="text-muted-foreground">Khám phá truyện tranh theo thể loại yêu thích của bạn</p>
                </div>

                <Suspense fallback={<ComicSectionSkeleton />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                            >
                                <Link href={`/the-loai/${category.slug}`} className="block h-full">
                                    <Card className="overflow-hidden h-full border-2 hover:border-green-500 transition-colors duration-300">
                                        <div className={`h-2 bg-gradient-to-r ${getCategoryColor(category.slug, index)}`} />
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <div className="p-2 rounded-full bg-muted flex items-center justify-center">
                                                    {getCategoryIcon(category.slug)}
                                                </div>
                                                <CardTitle className="text-xl">{category.name}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-sm line-clamp-2">
                                                Truyện thể loại {category.name} hay nhất, cập nhật mới nhất
                                            </CardDescription>
                                        </CardContent>
                                        <CardFooter className="pt-0">
                                            <Button variant="ghost" size="sm" className="ml-auto text-green-600 hover:text-green-700 p-0">
                                                Xem truyện <ArrowRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Suspense>
            </main>

            <Footer />
        </div>
    )
}
