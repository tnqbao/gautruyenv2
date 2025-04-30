
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Book, Heart, Share2, Calendar, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import ChapterList from "./chapter-list"

interface ComicDetailProps {
    _id: string
    name: string
    slug: string
    origin_name: string[]
    content: string
    status: "ongoing" | "completed" | string
    thumb_url: string
    sub_docquyen: boolean
    author: string[]
    category: {
        id: string
        name: string
        slug: string
    }[]
    chapters: {
        server_name: string
        server_data: {
            filename: string
            chapter_name: string
            chapter_title: string
            chapter_api_data: string
        }[]
    }[]
    updatedAt: string
}

export default function ComicDetail({
                                        name,
                                        origin_name,
                                        thumb_url,
                                        status,
                                        content,
                                        category,
                                        author,
                                        chapters,
                                    }: ComicDetailProps) {
    const [isLiked, setIsLiked] = useState(false)
    const statusText = getStatusText(status)
    const statusColor = getStatusColor(status)

    const firstServerData = chapters?.[0]?.server_data
    const firstChapterApi = firstServerData?.[0]?.chapter_api_data

    function getStatusText(status: string) {
        switch (status) {
            case "ongoing":
                return "Đang Phát Hành"
            case "completed":
                return "Hoàn Thành"
            case "upcoming":
                return "Sắp Ra Mắt"
            default:
                return "Không Xác Định"
        }
    }

    function getStatusColor(status: string) {
        switch (status) {
            case "ongoing":
                return "bg-blue-500"
            case "completed":
                return "bg-green-500"
            case "upcoming":
                return "bg-amber-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div className="relative">
            {/* Blurred background poster */}
            <div className="absolute inset-0 overflow-hidden h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
                <Image
                    src={
                        thumb_url
                            ? `https://img.otruyenapi.com/uploads/comics/${thumb_url}`
                            : "/placeholder.svg"
                    }
                    alt={name}
                    fill
                    className="object-cover blur-sm scale-110 opacity-50"
                    priority
                />
            </div>

            {/* Comic detail content */}
            <div className="container relative z-20 px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Poster column */}
                    <div className="md:col-span-1">
                        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg border border-white/10">
                            <Image
                                src={
                                    thumb_url
                                        ? `https://img.otruyenapi.com/uploads/comics/${thumb_url}`
                                        : "/placeholder.svg"
                                }
                                alt={name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute top-2 right-2">
                                <Badge className={`${statusColor} text-white`}>
                                    {statusText}
                                </Badge>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            {firstChapterApi && (
                                <Link href={`/read/${firstChapterApi}`}>
                                    <Button className="bg-green-600 hover:bg-green-700 transition-colors w-full">
                                        <Book className="mr-2 h-4 w-4" />
                                        Đọc Ngay
                                    </Button>
                                </Link>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "flex-1 transition-colors",
                                        isLiked && "text-red-500 border-red-500"
                                    )}
                                    onClick={() => setIsLiked(!isLiked)}
                                >
                                    <Heart
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            isLiked && "fill-red-500"
                                        )}
                                    />
                                    {isLiked ? "Đã Thích" : "Yêu Thích"}
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Share2 className="mr-2 h-4 w-4" /> Chia Sẻ
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Info column */}
                    <div className="md:col-span-2">
                        <h1 className="text-3xl font-bold mb-1">{name}</h1>
                        <h2 className="text-xl text-muted-foreground mb-4">
                            {origin_name?.join(", ") || "Không rõ"}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {category.map((cat) => (
                                <Link key={cat.slug} href={`/the-loai/${cat.slug}`}>
                                    <Badge
                                        variant="outline"
                                        className="hover:bg-muted transition-colors"
                                    >
                                        {cat.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Cập nhật lần cuối</span>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                    <span className="font-medium">
                                        {new Date().toLocaleDateString("vi-VN", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">Số chương</span>
                                <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                                    <span className="font-medium">
                    {firstServerData?.length || 0}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Nội dung truyện</h3>
                            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: content }} />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                <User className="mr-2 h-5 w-5 text-green-600" /> Tác giả
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {author.map((auth, index) => (
                                    <Link key={index} href={`/tac-gia/${auth}`} className="flex items-center gap-2">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                                            <User className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-medium text-sm truncate">{auth || "Không rõ"}</p>
                                            <p className="text-xs text-muted-foreground truncate">Tác giả</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-3 flex items-center">
                                <BookOpen className="mr-2 h-5 w-5 text-green-600" /> Danh sách chương
                            </h3>

                            {firstServerData?.length > 0 ? (
                                <ChapterList server_data={firstServerData} />
                            ) : (
                                <p className="text-muted-foreground text-sm">
                                    Chưa có chương nào được cập nhật.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
