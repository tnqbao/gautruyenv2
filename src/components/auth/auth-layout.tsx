import type { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import PandaLogo from "@/components/panda-logo"

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-gray-900 p-4 relative transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
                <div className="flex justify-between">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-20 bg-green-800/10 rounded-b-full"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.02,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                repeatDelay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-600/20"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: -20,
                            rotate: Math.random() * 360,
                        }}
                        animate={{
                            y: "120%",
                            rotate: Math.random() > 0.5 ? 360 : -360,
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 10,
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
                                fill="currentColor"
                            />
                            <path
                                d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
                                fill="currentColor"
                            />
                        </svg>
                    </motion.div>
                ))}
            </div>

            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex justify-center"
                >
                    <Link href="/public" className="flex items-center gap-2 group">
                        <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                            <PandaLogo className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                        </motion.div>
                        <span className="text-2xl font-bold">PandaFlix</span>
                    </Link>
                </motion.div>

                {children}
            </div>
        </div>
    )
}

