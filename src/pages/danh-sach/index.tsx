"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { ComicSectionSkeleton } from "@/components/loading-skeletons"
import { listTypes } from "@/lib/api"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { JSX } from "react/jsx-runtime"

export default function ListPage() {
    // Convert listTypes object to array for easier mapping
    const listTypesArray = Object.entries(listTypes).map(([slug, data]) => ({
        slug,
        ...data,
    }))

    // Define list type icons based on slug
    const getListTypeIcon = (slug: string) => {
        const icons: Record<string, JSX.Element> = {
            "truyen-moi": <BookOpen className="h-6 w-6 text-green-500" />,
            "sap-ra-mat": <Clock className="h-6 w-6 text-blue-500" />,
            "dang-phat-hanh": <AlertCircle className="h-6 w-6 text-orange-500" />,
            "hoan-thanh": <CheckCircle className="h-6 w-6 text-purple-500" />,
        }

        return icons[slug] || <BookOpen className="h-6 w-6" />
    }

    // Define list type colors based on slug
    const getListTypeColor = (slug: string) => {
        const colors: Record<string, string> = {
            "truyen-moi": "from-green-500 to-emerald-500",
            "sap-ra-mat": "from-blue-500 to-indigo-500",
            "dang-phat-hanh": "from-orange-500 to-amber-500",
            "hoan-thanh": "from-purple-500 to-violet-500",
        }

        return colors[slug] || "from-gray-500 to-slate-500"
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9fa] dark:bg-gray-900 transition-colors duration-300">
            <Header />

            <main className="flex-1 container px-4 md:px-6 py-4">
                <Breadcrumb items={[{ label: "Danh Sách" }]} />

                <div className="py-4">
                    <h1 className="text-3xl font-bold mb-2">Danh Sách Truyện</h1>
                    <p className="text-muted-foreground">Khám phá truyện tranh theo các danh sách đặc biệt</p>
                </div>

                <Suspense fallback={<ComicSectionSkeleton />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-6">
                        {listTypesArray.map((listType, index) => (
                            <motion.div
                                key={listType.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Link href={`/danh-sach/${listType.slug}`} className="block h-full">
                                    <Card className="overflow-hidden h-full border-2 hover:border-green-500 transition-colors duration-300">
                                        <div className={`h-2 bg-gradient-to-r ${getListTypeColor(listType.slug)}`} />
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <div className="p-2 rounded-full bg-muted flex items-center justify-center">
                                                    {getListTypeIcon(listType.slug)}
                                                </div>
                                                <CardTitle className="text-xl">{listType.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-sm">{listType.description}</CardDescription>
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
