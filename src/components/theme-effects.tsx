"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeEffects() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && prevTheme !== undefined && prevTheme !== resolvedTheme) {
      setIsChanging(true)
      const timer = setTimeout(() => {
        setIsChanging(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
    setPrevTheme(resolvedTheme)
  }, [mounted, resolvedTheme, prevTheme])

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {isChanging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1, 1.2, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 1, times: [0, 0.3, 0.7, 1] }}
                className={`w-32 h-32 rounded-full ${
                  resolvedTheme === "dark" ? "bg-gray-900" : "bg-yellow-300"
                } flex items-center justify-center`}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  {resolvedTheme === "dark" ? (
                    <span className="text-4xl">🌙</span>
                  ) : (
                    <span className="text-4xl">☀️</span>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
