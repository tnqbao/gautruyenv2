"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AuthButtonsProps {
    isLoggedIn?: boolean
}

export default function AuthButtons({ isLoggedIn = false }: AuthButtonsProps) {
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        // Simulate logout process
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Redirect to home page after logout
        window.location.href = "/"
    }

    if (isLoggedIn) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <User className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/history">Reading History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="text-red-500 focus:text-red-500">
                        {isLoggingOut ? (
                            <div className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Logging out...
                            </div>
                        ) : (
                            <>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 transition-colors",
                    // isMobile ? "flex-1" : "hidden lg:flex",
                    // !isMobile && "size-sm",
                )}
                asChild
            >
                <Link href="../auth/register">Đăng ký</Link>
            </Button>
            <Button
                className={cn(
                    "bg-green-600 hover:bg-green-700 transition-colors",
                    // isMobile ? "flex-1" : "",
                    // !isMobile && "size-sm",
                )}
                asChild
            >
                <Link href="../auth/login">Đăng nhập</Link>
            </Button>
        </>
    )
}
