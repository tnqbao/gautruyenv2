import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ComicCard from "@/components/comic-card"

interface ComicSectionProps {
  title: string
  comics: {
    title: string
    year: string
    poster: string
    rating?: string
    slug?: string
  }[]
  bgColor?: string
}

export default function ComicSection({ title, comics, bgColor = "bg-white dark:bg-gray-800" }: ComicSectionProps) {
  return (
    <section className={`py-8 md:py-12 ${bgColor} transition-colors duration-300`}>
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Scroll left">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Scroll right">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {comics.map((comic, index) => (
            <ComicCard key={index} comic={comic} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
