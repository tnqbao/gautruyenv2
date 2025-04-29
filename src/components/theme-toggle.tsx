"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setIsAnimating(true)
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative h-9 w-9 rounded-full"
        aria-label="Chuyển đổi chế độ sáng/tối"
      >
        <div className="relative z-10">
          {isDark ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </div>

        {/* Panda-themed toggle effect */}
        {isAnimating && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {/* Panda eye wink animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                {/* Panda face background */}
                <div className={`absolute inset-0 rounded-full ${isDark ? "bg-white" : "bg-black"}`}></div>

                {/* Panda eyes */}
                <motion.div
                  className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-black dark:bg-white"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                />
                <motion.div
                  className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-black dark:bg-white"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </Button>
    </div>
  )
}
