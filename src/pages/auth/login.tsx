import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import AuthLayout from "@/components/auth/auth-layout"
import PandaWindow from "@/components/auth/panda-window"
import AuthFormFooter from "@/components/auth/auth-form-footer"
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {loginSuccess} from "@/store/slices/authSlice";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [activeInputId, setActiveInputId] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<{ email?: boolean; password?: boolean }>({})
    const [errorMessage, setErrorMessage] = useState<{ email?: string; password?: string }>({})
    const [keepLogin, setKeepLogin] = useState(false)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target) return

            if (emailInputRef.current && emailInputRef.current.contains(target)) {
                setActiveInputId("email")
                setIsPasswordFocused(false)
            } else if (passwordInputRef.current && passwordInputRef.current.contains(target)) {
                setActiveInputId("password")
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
        setError({})
        setErrorMessage({})

        const newErrors: { email?: boolean; password?: boolean } = {}
        const newErrorMessages: { email?: string; password?: string } = {}

        if (!email) {
            newErrors.email = true
            newErrorMessages.email = "Vui lòng nhập email"
        }
        if (!password) {
            newErrors.password = true
            newErrorMessages.password = "Vui lòng nhập mật khẩu"
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors)
            setErrorMessage(newErrorMessages)
            return
        }

        try {
            setIsLoading(true)
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, keepLogin }),
            });

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message)
            }
            const data = await response.json();
            dispatch(loginSuccess(data.user));
            router.push("../")
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError({ email: true, password: true })
                setErrorMessage({ email: "Email hoặc mật khẩu không đúng" })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout>
            <Card className="border-green-100 shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Chào mừng cậu trở lại</CardTitle>
                    <CardDescription className="text-center">Hãy đăng nhập để tận hưởng những bộ phim hay nhất nhé</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-center mb-6">
                        <PandaWindow isPasswordFocused={isPasswordFocused} activeInputId={activeInputId} mode="login" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email/Username</Label>
                            <Input
                                id="email"
                                ref={emailInputRef}
                                type="text"
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
                            {error.email && <p className="text-red-500 text-sm">{errorMessage.email}</p>}
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
                                {error.password && <p className="text-red-500 text-sm">{errorMessage.password}</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="keepLogin"
                                checked={keepLogin}
                                onChange={(e) => setKeepLogin(e.target.checked)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <Label htmlFor="keepLogin" className="text-sm">
                                Giữ đăng nhập
                            </Label>
                        </div>


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
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                "Đăng nhập"
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <Link href="#" className="text-green-600 hover:underline">
                                Bạn lỡ quên mật khẩu?
                            </Link>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <AuthFormFooter mode="login" />
                </CardFooter>
            </Card>
        </AuthLayout>
    )
}
