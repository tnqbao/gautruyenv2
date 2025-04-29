"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface Chapter {
  id: string
  name: string
  slug: string
  updated_at: string
}

interface ChapterListProps {
  chapters: Chapter[]
}

export default function ChapterList({ chapters }: ChapterListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Sort chapters
  const sortedChapters = [...chapters].sort((a, b) => {
    const aNum = Number.parseFloat(a.name.replace(/[^0-9.]/g, ""))
    const bNum = Number.parseFloat(b.name.replace(/[^0-9.]/g, ""))
    return sortOrder === "asc" ? aNum - bNum : bNum - aNum
  })

  // Filter chapters based on search query
  const filteredChapters = sortedChapters.filter((chapter) =>
    chapter.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Determine how many chapters to display
  const displayedChapters = isExpanded ? filteredChapters : filteredChapters.slice(0, 10)

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: vi })
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm chương..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="whitespace-nowrap"
        >
          {sortOrder === "asc" ? (
            <>
              <ChevronUp className="mr-1 h-4 w-4" /> Cũ nhất
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-4 w-4" /> Mới nhất
            </>
          )}
        </Button>
      </div>

      <div className="border rounded-md divide-y">
        {displayedChapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/read/${chapter.slug}`}
            className="flex items-center justify-between p-3 hover:bg-muted transition-colors"
          >
            <span className="font-medium">Chương {chapter.name}</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>{formatDate(chapter.updated_at)}</span>
            </div>
          </Link>
        ))}

        {filteredChapters.length > 10 && !isExpanded && (
          <Button
            variant="ghost"
            className="w-full rounded-none py-2 hover:bg-muted"
            onClick={() => setIsExpanded(true)}
          >
            Xem thêm {filteredChapters.length - 10} chương
          </Button>
        )}

        {isExpanded && (
          <Button
            variant="ghost"
            className="w-full rounded-none py-2 hover:bg-muted"
            onClick={() => setIsExpanded(false)}
          >
            Thu gọn
          </Button>
        )}

        {filteredChapters.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">Không tìm thấy chương nào</div>
        )}
      </div>
    </div>
  )
}
