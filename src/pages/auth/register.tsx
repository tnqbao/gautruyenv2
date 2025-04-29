import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "@/components/auth/auth-layout"
import PandaWindow from "@/components/auth/panda-window"
import AuthFormFooter from "@/components/auth/auth-form-footer"
import {useRouter} from "next/router";

export default function RegisterPage() {
    const [fullname, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [activeInputId, setActiveInputId] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const nameInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target) return

            if (nameInputRef.current && nameInputRef.current.contains(target)) {
                setActiveInputId("name")
                setIsPasswordFocused(false)
            } else if (emailInputRef.current && emailInputRef.current.contains(target)) {
                setActiveInputId("email")
                setIsPasswordFocused(false)
            } else if (passwordInputRef.current && passwordInputRef.current.contains(target)) {
                setActiveInputId("password")
                setIsPasswordFocused(true)
            } else if (confirmPasswordInputRef.current && confirmPasswordInputRef.current.contains(target)) {
                setActiveInputId("confirmPassword")
                setIsPasswordFocused(true)
            } else {
                setActiveInputId(null)
                setIsPasswordFocused(false)
            }
        }

        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!fullname || !email || !password || !confirmPassword) {
            setError("Có vẻ như bạn đã bỏ trống gì đó")
            return
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu bạn nhập có vẻ không khớp")
            return
        }

        if (password.length < 8) {
            setError("Mật khẩu phải chứa ít nhất 8 ký tự")
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch("/api/auth/register", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullname, email, password }),
            })
            if (!response.ok) {
                throw new Error("Registration failed")
            }

            router.push("../auth/login")
        } catch {
            setError("Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout>
            <Card className="border-green-100 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">Enter your information to create an account</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center mb-6">
                        <PandaWindow isPasswordFocused={isPasswordFocused} activeInputId={activeInputId} mode="register" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Tên của bạn</Label>
                            <Input
                                id="fullname"
                                ref={nameInputRef}
                                type="text"
                                placeholder="Tên của bạn"
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                onFocus={() => {
                                    setActiveInputId("name")
                                    setIsPasswordFocused(false)
                                }}
                                className="focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                ref={emailInputRef}
                                type="email"
                                placeholder="panda@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => {
                                    setActiveInputId("email")
                                    setIsPasswordFocused(false)
                                }}
                                className="focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    ref={passwordInputRef}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => {
                                        setIsPasswordFocused(true)
                                        setActiveInputId("password")
                                    }}
                                    className="focus:ring-green-500 focus:border-green-500 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    ref={confirmPasswordInputRef}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => {
                                        setIsPasswordFocused(true)
                                        setActiveInputId("confirmPassword")
                                    }}
                                    className="focus:ring-green-500 focus:border-green-500 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-red-500 text-sm p-2 bg-red-50 rounded-md"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Đang tạo tài khoản...
                                </div>
                            ) : (
                                "Tạo tài khoản"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    <AuthFormFooter mode="register" />
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}