"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface CategoriesProps {
  categories: {
    name: string
    image: string
    slug?: string
  }[]
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Thể Loại Phổ Biến</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/the-loai/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="relative overflow-hidden rounded-lg w-full aspect-video mb-2 group-hover:ring-2 ring-green-500 transition-all">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-medium">{category.name}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
