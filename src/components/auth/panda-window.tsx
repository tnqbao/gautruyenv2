import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {useRouter} from "next/router";

interface PandaWindowProps {
    isPasswordFocused: boolean
    activeInputId: string | null
    mode: "login" | "register"
}

export default function PandaWindow({ isPasswordFocused, activeInputId, mode }: PandaWindowProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
    const pandaRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (activeInputId && activeInputId !== "password") return

            if (pandaRef.current) {
                const rect = pandaRef.current.getBoundingClientRect()
                const x = (e.clientX - rect.left - rect.width / 2) / 15
                const y = (e.clientY - rect.top - rect.height / 2) / 15

                // Limit eye movement range
                const limitedX = Math.max(-3, Math.min(3, x))
                const limitedY = Math.max(-2, Math.min(2, y))

                setMousePosition({ x: limitedX, y: limitedY })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [activeInputId])

    // Track input cursor for text fields
    useEffect(() => {
        if (activeInputId && activeInputId !== "password") {
            // Simulate eye movement based on typing
            const interval = setInterval(() => {
                const randomX = Math.random() * 2 - 1
                setEyePosition({ x: randomX, y: 0 })
            }, 500)

            return () => clearInterval(interval)
        } else {
            setEyePosition(mousePosition)
        }
    }, [activeInputId, mousePosition])

    // Get speech bubble text based on active input
    const getSpeechBubbleText = () => {
        if (isPasswordFocused) return "I can't see your password!"
        if (activeInputId === "email") return "Type your email please!"
        if (activeInputId === "name") return "What's your name?"
        if (activeInputId === "confirmPassword") return "Type it again please!"
        return ""
    }

    return (
        <div ref={pandaRef} className="relative w-48 h-48 mx-auto">
            {/* Round window frame */}
            <div className="absolute inset-0 rounded-full border-8 border-green-700 dark:border-green-800 bg-green-50 dark:bg-green-950 overflow-hidden shadow-lg transition-colors duration-300">
                {/* Window frame details - bamboo pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern
                            id="bambooPattern"
                            patternUnits="userSpaceOnUse"
                            width="20"
                            height="20"
                            patternTransform="rotate(45)"
                        >
                            <rect width="2" height="20" fill="#15803d" x="9" y="0"></rect>
                            <circle cx="10" cy="5" r="2" fill="#15803d"></circle>
                            <circle cx="10" cy="15" r="2" fill="#15803d"></circle>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#bambooPattern)"></rect>
                    </svg>
                </div>

                {/* Window frame border highlight */}
                <div className="absolute inset-0 rounded-full border-4 border-green-600/20 pointer-events-none"></div>
            </div>

            {/* Panda face */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full hover:cursor-pointer"
                style={{ padding: "12px" }}
                onClick={() => router.push("../")}
            >
                {/* Panda head */}
                <circle cx="50" cy="50" r="40" fill="white" stroke="black" strokeWidth="2" />

                {/* Ears */}
                <circle cx="22" cy="22" r="12" fill="black" />
                <circle cx="78" cy="22" r="12" fill="black" />

                {/* Eye sockets */}
                <circle cx="35" cy="42" r="10" fill="#DDDDDD" />
                <circle cx="65" cy="42" r="10" fill="#DDDDDD" />

                {/* Eyes */}
                <motion.g animate={{ opacity: isPasswordFocused ? 0 : 1 }} transition={{ duration: 0.2 }}>
                    <motion.circle
                        cx={35 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={42 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="6"
                        fill="black"
                    />
                    <motion.circle
                        cx={65 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={42 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="6"
                        fill="black"
                    />
                </motion.g>

                {/* Eye shine */}
                <motion.g animate={{ opacity: isPasswordFocused ? 0 : 1 }} transition={{ duration: 0.2 }}>
                    <motion.circle
                        cx={37 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={40 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="2"
                        fill="white"
                    />
                    <motion.circle
                        cx={67 + (activeInputId ? eyePosition.x : mousePosition.x)}
                        cy={40 + (activeInputId ? eyePosition.y : mousePosition.y)}
                        r="2"
                        fill="white"
                    />
                </motion.g>

                {/* Blindfold */}
                <motion.g
                    initial={{ y: -20, opacity: 0 }}
                    animate={{
                        y: isPasswordFocused ? 0 : -20,
                        opacity: isPasswordFocused ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <rect x="22" y="38" width="56" height="12" rx="6" fill="#15803d" />
                    <path d="M22 44 L12 36" stroke="#15803d" strokeWidth="3" />
                    <path d="M78 44 L88 36" stroke="#15803d" strokeWidth="3" />
                </motion.g>

                {/* Closed eyes (when blindfolded) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isPasswordFocused ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path d="M31 45 C35 42, 39 42, 43 45" stroke="black" strokeWidth="2" fill="none" />
                    <path d="M57 45 C61 42, 65 42, 69 45" stroke="black" strokeWidth="2" fill="none" />
                </motion.g>

                {/* Nose */}
                <circle cx="50" cy="55" r="5" fill="black" />

                {/* Mouth */}
                <motion.path
                    d="M40 65 C45 70, 55 70, 60 65"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    animate={{
                        d: isPasswordFocused
                            ? "M40 65 C45 72, 55 72, 60 65"
                            : activeInputId
                                ? "M40 62 C45 67, 55 67, 60 62"
                                : mode === "register"
                                    ? "M40 63 C45 68, 55 68, 60 63"
                                    : "M40 65 C45 70, 55 70, 60 65",
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Cheeks */}
                <motion.g
                    animate={{
                        scale: isPasswordFocused ? 1.1 : 1,
                        y: isPasswordFocused ? 2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <circle cx="30" cy="58" r="6" fill="#FFAAAA" fillOpacity="0.6" />
                    <circle cx="70" cy="58" r="6" fill="#FFAAAA" fillOpacity="0.6" />
                </motion.g>

                {/* Paws when typing in text fields */}
                <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: activeInputId && activeInputId !== "password" ? 1 : 0,
                        y: activeInputId && activeInputId !== "password" ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <circle cx="30" cy="85" r="8" fill="black" />
                    <circle cx="70" cy="85" r="8" fill="black" />
                    <motion.circle
                        cx="30"
                        cy="85"
                        r="6"
                        fill="#FFAAAA"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    />
                    <motion.circle
                        cx="70"
                        cy="85"
                        r="6"
                        fill="#FFAAAA"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.25 }}
                    />
                </motion.g>
            </svg>

            {/* Speech bubble */}
            {(isPasswordFocused || (activeInputId && activeInputId !== "password")) && (
                <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md text-xs"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {getSpeechBubbleText()}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
                </motion.div>
            )}
        </div>
    )
}

