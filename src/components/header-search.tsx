// "use client"
//
// import type React from "react"
//
// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { Search, X } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import useDebounce from "@/hooks/use-debounce"
//
// interface HeaderSearchProps {
//   onClose: () => void
// }
//
// interface SearchResult {
//   id: number
//   slug: string
//   title: string
//   year: number
//   _highlight?: {
//     id?: string
//     slug?: string
//     title?: string
//     year?: string
//   }
// }
//
// interface SearchResponse {
//   hits: SearchResult[]
//   total: number
// }
//
// export default function HeaderSearch({ onClose }: HeaderSearchProps) {
//   const [query, setQuery] = useState("")
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()
//   const debouncedQuery = useDebounce(query, 300)
//
//   useEffect(() => {
//     // Focus the input when the search is opened
//     if (inputRef.current) {
//       inputRef.current.focus()
//     }
//
//     // Add event listener for Escape key
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose()
//       }
//     }
//
//     window.addEventListener("keydown", handleKeyDown)
//     return () => window.removeEventListener("keydown", handleKeyDown)
//   }, [onClose])
//
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (query.trim()) {
//       router.push(`/search?q=${encodeURIComponent(query.trim())}`)
//       onClose()
//     }
//   }
//
//   const [searchTerm, setSearchTerm] = useState("")
//   const [results, setResults] = useState<SearchResult[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [showResults, setShowResults] = useState(false)
//   const debouncedSearchTerm = useDebounce(searchTerm, 200)
//   const searchRef = useRef<HTMLDivElement>(null)
//
//   // Handle outside clicks
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setShowResults(false)
//       }
//     }
//
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])
//
//   // Fetch search results when debounced search term changes
//   useEffect(() => {
//     async function fetchResults() {
//       if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
//         setResults([])
//         setIsLoading(false)
//         return
//       }
//
//       setIsLoading(true)
//       try {
//         const response = await fetch(
//           `https://api.daudoo.com/api/gauflix/search?keyword=${encodeURIComponent(debouncedSearchTerm)}`,
//         )
//         const data: SearchResponse = await response.json()
//         setResults(data.hits || [])
//       } catch (error) {
//         console.error("Error fetching search results:", error)
//         setResults([])
//       } finally {
//         setIsLoading(false)
//       }
//     }
//
//     fetchResults()
//   }, [debouncedSearchTerm])
//
//   // Show results dropdown when typing
//   useEffect(() => {
//     if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
//       setShowResults(true)
//     } else {
//       setShowResults(false)
//     }
//   }, [debouncedSearchTerm])
//
//   // Render highlighted text
//   const renderHighlightedText = (text: string) => {
//     if (!text) return ""
//
//     // Replace <strong> tags with span elements with green text
//     return (
//       <span
//         dangerouslySetInnerHTML={{
//           __html: text
//             .replace(/<strong>/g, '<span class="text-green-600 font-medium">')
//             .replace(/<\/strong>/g, "</span>"),
//         }}
//       />
//     )
//   }
//
//   return (
//     <form onSubmit={handleSearch} className="w-full flex items-center gap-2">
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//         <Input
//           ref={inputRef}
//           type="search"
//           placeholder="Tìm kiếm truyện, tác giả, thể loại..."
//           className="pl-10 py-6 text-lg"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>
//       <Button type="button" variant="ghost" size="icon" onClick={onClose}>
//         <X className="h-5 w-5" />
//         <span className="sr-only">Close</span>
//       </Button>
//     </form>
//   )
// }

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HeaderSearchProps {
    onClose: () => void
}

export default function HeaderSearch({ onClose }: HeaderSearchProps) {
    const [query, setQuery] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        // Focus the input when the search is opened
        if (inputRef.current) {
            inputRef.current.focus()
        }

        // Add event listener for Escape key
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
            onClose()
        }
    }

    return (
        <motion.form
            onSubmit={handleSearch}
            className="w-full flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Tìm kiếm truyện, tác giả, thể loại..."
                    className="pl-10 py-6 text-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </Button>
        </motion.form>
    )
}


