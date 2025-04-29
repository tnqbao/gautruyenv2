"use-client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoImageProps {
    className?: string
    size?: "small" | "medium" | "large"
}

export default function LogoImage({ className, size = "medium" }: LogoImageProps) {
    const sizes = {
        small: { width: 28, height: 28 },
        medium: { width: 36, height: 36 },
        large: { width: 64, height: 64 },
    }

    const { width, height } = sizes[size]

    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className={cn("relative overflow-hidden rounded-full", className)}>
                <Image
                    src="https://i.imgur.com/3PgVjmN.png?height=100&width=100"
                    alt="PandaFlix Logo"
                    width={width}
                    height={height}
                    className="transition-transform duration-300 group-hover:scale-110"
                    priority
                />
            </div>
            <span className="text-lg sm:text-xl font-bold whitespace-nowrap">Gấu Truyện</span>
        </Link>
    )
}
