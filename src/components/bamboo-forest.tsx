"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

export default function BambooForest() {
  const [bambooStalks, setBambooStalks] = useState<
      Array<{
        id: number
        x: number
        width: number
        height: number
        delay: number
      }>
  >([])

  const { scrollYProgress } = useScroll()
  const forestOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const forestScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])

  // Generate bamboo stalks on mount
  useEffect(() => {
    const stalks = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      width: 0.5 + Math.random() * 1.5,
      height: 50 + Math.random() * 50,
      delay: Math.random() * 0.5,
    }))
    setBambooStalks(stalks)
  }, [])

  return (
      <motion.div
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          style={{ opacity: forestOpacity, scale: forestScale }}
      >
        {bambooStalks.map((stalk) => (
            <BambooStalk key={stalk.id} {...stalk} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
  )
}

function BambooStalk({
                       id,
                       x,
                       width,
                       height,
                       delay,
                       scrollYProgress,
                     }: {
  id: number
  x: number
  width: number
  height: number
  delay: number
  scrollYProgress: MotionValue<number>
}) {
  // Calculate growth based on scroll position
  const growthStart = 0.1 + (id % 5) * 0.05
  const growthEnd = growthStart + 0.3
  const stalkHeight = useTransform(scrollYProgress, [growthStart, growthEnd], [0, height])

  // Number of segments based on height
  const segmentCount = Math.floor(height / 10)

  return (
      <motion.div
          className="absolute bottom-0"
          style={{
            left: `${x}%`,
            width: `${width}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay }}
      >
        <motion.div className="w-full bg-green-800/10 rounded-t-md origin-bottom" style={{ height: stalkHeight }}>
          {Array.from({ length: segmentCount }).map((_, i) => (
              <motion.div
                  key={i}
                  className="w-full border-t border-green-800/20 relative"
                  style={{ height: `${100 / segmentCount}%` }}
              >
                {/* Bamboo nodes */}
                {i % 2 === 0 && (
                    <motion.div className="absolute -right-2 top-0 w-2 h-1.5 bg-green-800/10 rounded-tr-full" />
                )}
                {i % 2 === 1 && <motion.div className="absolute -left-2 top-0 w-2 h-1.5 bg-green-800/10 rounded-tl-full" />}

                {/* Add leaves to some segments */}
                {(i === Math.floor(segmentCount * 0.3) || i === Math.floor(segmentCount * 0.7)) && (
                    <motion.div
                        className="absolute"
                        style={{
                          left: i % 4 === 0 || i % 4 === 3 ? "-100%" : "100%",
                          top: "50%",
                        }}
                        animate={{
                          rotate: [0, i % 2 === 0 ? -3 : 3, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                    >
                      <svg
                          width="30"
                          height="15"
                          viewBox="0 0 30 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-green-800/20"
                          style={{
                            transformOrigin: i % 4 === 0 || i % 4 === 3 ? "right center" : "left center",
                            transform: `scaleX(${i % 4 === 0 || i % 4 === 3 ? 1 : -1})`,
                          }}
                      >
                        <path
                            d="M0 7.5C0 3.35786 3.35786 0 7.5 0H30V15H7.5C3.35786 15 0 11.6421 0 7.5Z"
                            fill="currentColor"
                        />
                      </svg>
                    </motion.div>
                )}
              </motion.div>
          ))}
        </motion.div>
      </motion.div>
  )
}