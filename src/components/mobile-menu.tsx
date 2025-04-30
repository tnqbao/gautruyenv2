"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { categories } from "./category-dropdown"

interface MobileMenuProps {
    isLoggedIn: boolean
    onLoginToggle: () => void
}

export default function MobileMenu({ isLoggedIn, onLoginToggle }: MobileMenuProps) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                    >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                <SheetHeader className="border-b p-4">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                </SheetHeader>
                <div className="flex flex-col py-2">
                    <SheetClose asChild>
                        <Link href="/" className="px-4 py-3 text-lg font-medium hover:bg-accent">
                            Trang Chủ
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href="/danh-sach/truyen-moi" className="px-4 py-3 text-lg font-medium hover:bg-accent">
                            Truyện Mới
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href="/danh-sach/hoan-thanh" className="px-4 py-3 text-lg font-medium hover:bg-accent">
                            Hoàn Thành
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href="/history" className="px-4 py-3 text-lg font-medium hover:bg-accent">
                            Lịch Sử Đọc
                        </Link>
                    </SheetClose>

                    <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen} className="w-full">
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full justify-between px-4 py-3 text-lg font-medium hover:bg-accent rounded-none h-auto"
                            >
                                Thể Loại
                                {isCategoryOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2">
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

                    <div className="mt-auto p-4 border-t">
                        <Button onClick={onLoginToggle} className="w-full">
                            {isLoggedIn ? "Đăng Xuất" : "Đăng Nhập"}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
