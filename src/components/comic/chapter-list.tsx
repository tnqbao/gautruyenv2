import { getUpdatedAtFromObjectId, formatDate } from "@/lib/helpers"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

interface ServerData {
    filename: string
    chapter_name: string
    chapter_title: string
    chapter_api_data: string
}

interface ChapterListProps {
    server_data: ServerData[] // Accept server_data directly
}

export default function ChapterList({ server_data }: ChapterListProps) {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const router = useRouter()

    // Sort server_data in descending order by chapter_name
    const sortedChapters = [...server_data].sort((a, b) =>
        Number(b.chapter_name) - Number(a.chapter_name)
    )

    // Filter server_data based on search query
    const filteredChapters = sortedChapters.filter((data) =>
        data.chapter_name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Determine how many chapters to display
    const displayedChapters = isExpanded ? filteredChapters : filteredChapters.slice(0, 10)

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
            </div>

            <div className="border rounded-md divide-y">
                {displayedChapters.map((data, index) => {
                    const updatedAt = getUpdatedAtFromObjectId(data.chapter_api_data.split("/").pop() || "")
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 hover:bg-muted transition-colors hover:cursor-pointer"
                            onClick={() => router.push(`/read/${data.chapter_api_data}`)}
                        >
                            <div>
                                <span className="font-medium">
                                    {"Chap " + data.chapter_name || "Unknown Chapter"}
                                    {data.chapter_title}
                                </span>
                                <span className="text-sm text-muted-foreground block">
                                    Đã cập nhật lúc {formatDate(updatedAt)}
                                </span>
                            </div>
                        </div>
                    )
                })}

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