import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center gap-2 my-8">
      <Button
        variant="outline"
        size="icon"
        className={cn(currentPage === 1 && "opacity-50 pointer-events-none")}
        asChild
      >
        <Link href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Trang trước</span>
        </Link>
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-start" || page === "ellipsis-end") {
          return (
            <Button key={`ellipsis-${index}`} variant="outline" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">...</span>
            </Button>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            className={cn(currentPage === page && "bg-green-600 hover:bg-green-700")}
            asChild
          >
            <Link href={`${baseUrl}?page=${page}`}>{page}</Link>
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        className={cn(currentPage === totalPages && "opacity-50 pointer-events-none")}
        asChild
      >
        <Link href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : "#"}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Trang sau</span>
        </Link>
      </Button>
    </div>
  )
}
