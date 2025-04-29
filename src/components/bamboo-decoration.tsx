"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function BambooDecoration() {
  const [bambooSticks, setBambooSticks] = useState<{ x: number; height: number; delay: number; width: number }[]>([])
  const { scrollYProgress } = useScroll()

  // Parallax effect for bamboo
  const rightBambooY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const leftBambooY = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Growth effect based on scroll
  const bambooGrowth = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  useEffect(() => {
    // Generate random bamboo sticks positions
    const leftSticks = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * 15,
      height: 70 + Math.random() * 30,
      delay: i * 0.2,
      width: 2 + Math.random() * 1.5,
    }))

    const rightSticks = Array.from({ length: 4 }, (_, i) => ({
      x: 85 + Math.random() * 15,
      height: 70 + Math.random() * 30,
      delay: i * 0.2 + 0.5,
      width: 2 + Math.random() * 1.5,
    }))

    setBambooSticks([...leftSticks, ...rightSticks])
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bambooSticks.map((stick, index) => {
        const isRightSide = stick.x > 50

        return (
          <motion.div
            key={index}
            className="absolute bottom-0 bg-green-800/10"
            style={{
              left: `${stick.x}%`,
              width: `${stick.width}%`,
              height: `${stick.height}%`,
              y: isRightSide ? rightBambooY : leftBambooY,
              originY: 1, // Grow from bottom
              scaleY: bambooGrowth,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.5,
              delay: stick.delay,
              ease: "easeOut",
            }}
          >
            {/* Bamboo segments */}
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                className="w-full h-[10%] border-t border-green-800/20 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: stick.delay + i * 0.1, duration: 0.3 }}
              >
                {i % 2 === 0 && (
                  <motion.div
                    className="absolute -right-3 top-0 w-3 h-2 bg-green-800/10 rounded-tr-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: stick.delay + i * 0.1 + 0.2, duration: 0.3 }}
                  />
                )}
                {i % 2 === 1 && (
                  <motion.div
                    className="absolute -left-3 top-0 w-3 h-2 bg-green-800/10 rounded-tl-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: stick.delay + i * 0.1 + 0.2, duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}

            {/* Bamboo leaves */}
            {[2, 5, 8].map((segmentIndex) => (
              <motion.div
                key={`leaf-${segmentIndex}`}
                className="absolute"
                style={{
                  [isRightSide ? "left" : "right"]: "-8%",
                  top: `${segmentIndex * 10}%`,
                }}
                initial={{ rotate: isRightSide ? -30 : 30, scale: 0 }}
                animate={{ rotate: isRightSide ? -30 : 30, scale: 1 }}
                transition={{ delay: stick.delay + 1 + segmentIndex * 0.2, duration: 0.5 }}
              >
                <motion.svg
                  width="40"
                  height="20"
                  viewBox="0 0 40 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-800/20"
                  style={{ transform: `scaleX(${isRightSide ? -1 : 1})` }}
                  animate={{
                    rotateZ: [0, 5, -5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4 + Math.random() * 2,
                    repeatType: "reverse",
                  }}
                >
                  <path d="M0 10C0 4.47715 4.47715 0 10 0H40V20H10C4.47715 20 0 15.5228 0 10Z" fill="currentColor" />
                </motion.svg>
              </motion.div>
            ))}
          </motion.div>
        )
      })}

      {/* Growing bamboo shoots at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        {[10, 30, 50, 70, 90].map((position, i) => (
          <motion.div
            key={`shoot-${i}`}
            className="absolute bottom-0 bg-green-700/20 rounded-t-full"
            style={{
              left: `${position}%`,
              width: "1.5%",
              height: "0%",
            }}
            animate={{
              height: ["0%", "15%", "12%"],
              transition: {
                duration: 2,
                delay: i * 0.3 + 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 10 + Math.random() * 15,
              },
            }}
          >
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                rotateZ: [-5, 5, -5],
              }}
              transition={{
                scale: { delay: 2 + i * 0.3, duration: 0.3 },
                rotateZ: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  repeatType: "reverse",
                  delay: 2 + i * 0.3,
                },
              }}
            >
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-700/30"
              >
                <path d="M12 0L24 16H0L12 0Z" fill="currentColor" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Panda footprints that appear as you scroll */}
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
        {[15, 25, 35, 45, 55, 65, 75, 85].map((position, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute bottom-4"
            style={{ left: `${position}%` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.15, 0.15, 0],
              y: [20, 0, 0, -20],
            }}
            transition={{
              delay: i * 0.2 + 2,
              duration: 4,
              times: [0, 0.1, 0.9, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 20,
            }}
          >
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-black ${i % 2 === 0 ? "rotate-[20deg]" : "rotate-[-20deg]"}`}
            >
              <path d="M10 6C11.1 6 12 5.1 12 4C12 2.9 11.1 2 10 2C8.9 2 8 2.9 8 4C8 5.1 8.9 6 10 6Z" />
              <path d="M14 6C15.1 6 16 5.1 16 4C16 2.9 15.1 2 14 2C12.9 2 12 2.9 12 4C12 5.1 12.9 6 14 6Z" />
              <path d="M6 6C7.1 6 8 5.1 8 4C8 2.9 7.1 2 6 2C4.9 2 4 2.9 4 4C4 5.1 4.9 6 6 6Z" />
              <path d="M10 22C13.3 22 16 19.3 16 16C16 12.7 13.3 10 10 10C6.7 10 4 12.7 4 16C4 19.3 6.7 22 10 22Z" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
