"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Menu, User, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import CategoryDropdown, { categories } from "@/components/category-dropdown"
import ThemeToggle from "@/components/theme-toggle"
import HeaderSearch from "@/components/header-search"
import { AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"
import { logout, selectAuth } from "@/store/slices/authSlice"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoImage from "@/components/logo-image"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const { user_id, fullname } = useSelector(selectAuth)
  const isAuthed = user_id !== null

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token")
    const response = await axios.post("/api/auth/logout", null, {
      headers: {
        Authorization: token,
      },
    })

    if (response.status === 200) {
      localStorage.removeItem("auth_token")
      logout()
      router.refresh()
    }
  }

  const UserProfileDropdown = ({ fullname }: { fullname: string | null }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-xs leading-none text-muted-foreground">{fullname}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="w-full">
              Hồ sơ
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/favorites" className="w-full">
              Truyện yêu thích
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/history" className="w-full">
              Lịch sử đọc
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )

  const AuthButtons = () => (
      <>
        {isAuthed ? (
            <UserProfileDropdown fullname={fullname} />
        ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/auth/register">Đăng ký</Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/auth/login">Đăng nhập</Link>
              </Button>
            </>
        )}
      </>
  )

  return (
      <header
          className={cn(
              "sticky top-0 z-50 w-full transition-all duration-300",
              isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-white dark:bg-gray-900",
          )}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold hover:text-green-600 transition-colors"
                    >
                      Trang Chủ
                    </Link>
                  </SheetClose>

                  <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen} className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button
                          variant="ghost"
                          className="w-full justify-between px-0 py-0 text-lg font-semibold hover:text-green-600 transition-colors h-auto text-left"
                      >
                        <span>Thể Loại</span>
                        {isCategoryOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                            <SheetClose key={category.slug} asChild>
                              <Link
                                  href={`/the-loai/${category.slug}`}
                                  className="text-sm py-2 hover:text-green-600 transition-colors"
                              >
                                {category.name}
                              </Link>
                            </SheetClose>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <SheetClose asChild>
                    <Link
                        href="/danh-sach/truyen-moi"
                        className="flex items-center gap-2 text-lg font-semibold hover:text-green-600 transition-colors"
                    >
                      Truyện Mới
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                        href="/danh-sach/hoan-thanh"
                        className="flex items-center gap-2 text-lg font-semibold hover:text-green-600 transition-colors"
                    >
                      Hoàn Thành
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                        href="/history"
                        className="flex items-center gap-2 text-lg font-semibold hover:text-green-600 transition-colors"
                    >
                      Lịch Sử Đọc
                    </Link>
                  </SheetClose>

                  <div className="mt-4 flex gap-2">
                    <AuthButtons />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <LogoImage />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
                href="/"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-green-600",
                    isActive("/") && "text-green-600 font-semibold",
                )}
            >
              Trang Chủ
            </Link>
            <CategoryDropdown />
            <Link
                href="/danh-sach/truyen-moi"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-green-600",
                    isActive("/danh-sach/truyen-moi") && "text-green-600 font-semibold",
                )}
            >
              Truyện Mới
            </Link>
            <Link
                href="/danh-sach/hoan-thanh"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-green-600",
                    isActive("/danh-sach/hoan-thanh") && "text-green-600 font-semibold",
                )}
            >
              Hoàn Thành
            </Link>
            <Link
                href="/history"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-green-600",
                    isActive("/history") && "text-green-600 font-semibold",
                )}
            >
              Lịch Sử
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isSearchOpen ? (
                  <div className="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex items-center px-4">
                    <HeaderSearch onClose={() => setIsSearchOpen(false)} />
                  </div>
              ) : (
                  <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
              )}
            </AnimatePresence>

            <ThemeToggle />
            <div className="hidden md:flex">
              <AuthButtons />
            </div>
          </div>
        </div>
      </header>
  )
}
