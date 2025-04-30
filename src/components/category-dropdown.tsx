"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const categories = [
  { name: "Hành Động", slug: "action" },
  { name: "Trưởng Thành", slug: "adult" },
  { name: "Phiêu Lưu", slug: "adventure" },
  { name: "Anime", slug: "anime" },
  { name: "Chuyển Sinh", slug: "chuyen-sinh" },
  { name: "Hài Hước", slug: "comedy" },
  { name: "Truyện Tranh", slug: "comic" },
  { name: "Nấu Ăn", slug: "cooking" },
  { name: "Cổ Đại", slug: "co-dai" },
  { name: "Doujinshi", slug: "doujinshi" },
  { name: "Drama", slug: "drama" },
  { name: "Đam Mỹ", slug: "dam-my" },
  { name: "Ecchi", slug: "ecchi" },
  { name: "Fantasy", slug: "fantasy" },
  { name: "Hoán Đổi Giới", slug: "gender-bender" },
  { name: "Hậu Cung", slug: "harem" },
  { name: "Lịch Sử", slug: "historical" },
  { name: "Kinh Dị", slug: "horror" },
  { name: "Josei", slug: "josei" },
  { name: "Live Action", slug: "live-action" },
  { name: "Manga", slug: "manga" },
  { name: "Manhua", slug: "manhua" },
  { name: "Manhwa", slug: "manhwa" },
  { name: "Võ Thuật", slug: "martial-arts" },
  { name: "Trưởng Thành", slug: "mature" },
  { name: "Mecha", slug: "mecha" },
  { name: "Trinh Thám", slug: "mystery" },
  { name: "Ngôn Tình", slug: "ngon-tinh" },
  { name: "Truyện Ngắn", slug: "one-shot" },
  { name: "Tâm Lý", slug: "psychological" },
  { name: "Tình Cảm", slug: "romance" },
  { name: "Học Đường", slug: "school-life" },
  { name: "Khoa Học Viễn Tưởng", slug: "sci-fi" },
  { name: "Seinen", slug: "seinen" },
  { name: "Shoujo", slug: "shoujo" },
  { name: "Shoujo Ai", slug: "shoujo-ai" },
  { name: "Shounen", slug: "shounen" },
  { name: "Shounen Ai", slug: "shounen-ai" },
  { name: "Đời Thường", slug: "slice-of-life" },
  { name: "Smut", slug: "smut" },
  { name: "Soft Yaoi", slug: "soft-yaoi" },
  { name: "Soft Yuri", slug: "soft-yuri" },
  { name: "Thể Thao", slug: "sports" },
  { name: "Siêu Nhiên", slug: "supernatural" },
  { name: "Tạp Chí Truyện Tranh", slug: "tap-chi-truyen-tranh" },
  { name: "Thiếu Nhi", slug: "thieu-nhi" },
  { name: "Bi Kịch", slug: "tragedy" },
  { name: "Trinh Thám", slug: "trinh-tham" },
  { name: "Truyện Scan", slug: "truyen-scan" },
  { name: "Truyện Màu", slug: "truyen-mau" },
  { name: "Việt Nam", slug: "viet-nam" },
  { name: "Webtoon", slug: "webtoon" },
  { name: "Xuyên Không", slug: "xuyen-khong" },
  { name: "16+", slug: "16" },
]

export default function CategoryDropdown() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Mobile version uses Sheet component
  if (isMobile) {
    return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 h-10">
              Thể Loại <ChevronDown className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle className="text-center">Thể Loại</SheetTitle>
              <div className="relative my-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Tìm thể loại..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-7 w-7 rounded-full p-0"
                        onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                )}
              </div>
            </SheetHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 overflow-y-auto max-h-[60vh] pb-safe">
              {filteredCategories.map((category) => (
                  <Link
                      key={category.slug}
                      href={`/the-loai/${category.slug}`}
                      className="px-3 py-2 rounded-md hover:bg-accent text-sm"
                  >
                    {category.name}
                  </Link>
              ))}
              {filteredCategories.length === 0 && (
                  <div className="col-span-full text-center py-4 text-muted-foreground">Không tìm thấy thể loại</div>
              )}
            </div>
          </SheetContent>
        </Sheet>
    )
  }

  // Desktop version uses DropdownMenu
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 h-10">
            Thể Loại <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[600px] p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Tìm thể loại..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-7 w-7 rounded-full p-0"
                    onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
            )}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 max-h-[400px] overflow-y-auto">
            {filteredCategories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild className="cursor-pointer">
                  <Link href={`/the-loai/${category.slug}`}>{category.name}</Link>
                </DropdownMenuItem>
            ))}
            {filteredCategories.length === 0 && (
                <div className="col-span-full text-center py-4 text-muted-foreground">Không tìm thấy thể loại</div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
