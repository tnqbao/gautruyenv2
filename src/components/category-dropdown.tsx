"use client"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const categories = [
  { name: "Hành Động", slug: "hanh-dong" },
  { name: "Phiêu Lưu", slug: "phieu-luu" },
  { name: "Hài Hước", slug: "hai-huoc" },
  { name: "Tình Cảm", slug: "tinh-cam" },
  { name: "Học Đường", slug: "hoc-duong" },
  { name: "Võ Thuật", slug: "vo-thuat" },
  { name: "Kinh Dị", slug: "kinh-di" },
  { name: "Viễn Tưởng", slug: "vien-tuong" },
  { name: "Đời Thường", slug: "doi-thuong" },
  { name: "Thể Thao", slug: "the-thao" },
  { name: "Siêu Nhiên", slug: "sieu-nhien" },
  { name: "Fantasy", slug: "fantasy" },
  { name: "Trinh Thám", slug: "trinh-tham" },
  { name: "Lịch Sử", slug: "lich-su" },
  { name: "Seinen", slug: "seinen" },
  { name: "Shounen", slug: "shounen" },
  { name: "Shoujo", slug: "shoujo" },
  { name: "Isekai", slug: "isekai" },
]

export default function CategoryDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 h-10">
          Thể Loại <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 grid grid-cols-2 gap-1 p-2">
        {categories.map((category) => (
          <DropdownMenuItem key={category.slug} asChild className="cursor-pointer">
            <Link href={`/the-loai/${category.slug}`}>{category.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
