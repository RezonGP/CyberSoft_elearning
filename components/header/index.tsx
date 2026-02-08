"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TCategoryService, } from "../../app/server/category"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/app/context/CartContext"
import { ShoppingCart, CloudMoon } from "lucide-react"
import { CartSummaryCard } from "@/components/Cart/CartSummaryCard"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type Category = { maDanhMuc: string; tenDanhMuc: string }

type AuthUser = {
    taiKhoan?: string
    hoTen?: string
    email?: string
}

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<AuthUser | null>(null)
    const router = useRouter()
    const { cart } = useCart()

    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return

        const loadUser = () => {
            const storedUser = localStorage.getItem("USER_ADMIN")
            if (!storedUser) {
                setUser(null)
                return
            }
            try {
                const parsed = JSON.parse(storedUser) as AuthUser
                setUser(parsed)
            } catch {
                setUser(null)
            }
        }

        loadUser()

        const handleAuthChanged = () => {
            loadUser()
        }

        window.addEventListener("auth-changed", handleAuthChanged)

        return () => {
            window.removeEventListener("auth-changed", handleAuthChanged)
        }
    }, [])

    const loadCategories = async () => {
        try {
            setLoading(true)
            const data = await TCategoryService.Category()
            if (Array.isArray(data)) {
                setCategories(data)
            } else {
                setCategories((data as any)?.content || []);
            }
        }
        catch (error) {
            console.log("Failed to load categories:", error);
            setCategories([]);

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("USER_ADMIN")
            window.dispatchEvent(new Event("auth-changed"))
        }
        setUser(null)
        router.push("/auth")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f172a]/95 backdrop-blur-md text-gray-200 shadow-md">
            <div className="container mx-auto flex h-16 items-center px-4">

                {/* 1. LOGO & BRAND */}
                <Link href="/" className="flex items-center gap-2 mr-8 hover:opacity-90 transition-opacity group">
                    <CloudMoon className="h-10 w-10 text-gray-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <h1 className="font-bold text-xl tracking-tight hidden sm:block text-gray-100">
                        Dream-<span className="text-gray-400 group-hover:text-white transition-colors">Cyber</span>
                    </h1>
                </Link>

                {/* 2. CATEGORIES DROPDOWN */}
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="font-semibold gap-1 text-gray-300 hover:text-white hover:bg-white/10">
                                <span className="grid grid-cols-2 gap-0.5 mr-2 opacity-70">
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                </span>
                                DANH MỤC
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-64 bg-[#1e293b] text-gray-200 border-gray-700" align="start">
                            <DropdownMenuLabel>Khám phá kỹ năng</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            {loading ? (
                                <DropdownMenuItem disabled>Đang tải dữ liệu...</DropdownMenuItem>
                            ) : categories.length > 0 ? (
                                categories.map((cat) => (
                                    <DropdownMenuItem key={cat.maDanhMuc} asChild className="cursor-pointer py-2 hover:bg-white/10 focus:bg-white/10 focus:text-white">
                                        <Link href={`/programming/${cat.maDanhMuc}`}>
                                            {cat.tenDanhMuc}
                                        </Link>
                                    </DropdownMenuItem>

                                ))
                            ) : (
                                <DropdownMenuItem disabled>Không có dữ liệu</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* 3. SEARCH BAR (Thêm vào để cân đối layout) */}
                <div className="flex-1 max-w-sm mx-8 hidden md:block">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                            className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-700 bg-[#1e293b] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all text-sm"
                        />
                        <svg className="w-4 h-4 absolute left-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                {/* 4. ACTIONS */}
                <div className="ml-auto flex items-center gap-3">
                    {/* CART ICON */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative mr-2 text-gray-300 hover:text-white hover:bg-white/10">
                                <ShoppingCart className="h-5 w-5" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center font-bold">
                                        {cart.length}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96 p-0 border-none bg-transparent shadow-none" align="end">
                            <CartSummaryCard />
                        </PopoverContent>
                    </Popover>

                    {user ? (
                        <>
                            <span className="hidden sm:inline text-sm text-gray-300">
                                Xin chào, {user.hoTen || user.taiKhoan}
                            </span>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <Link href="/auth">
                            <Button className="bg-gray-200 hover:bg-white text-gray-900 shadow-md transition-all font-semibold">
                                Đăng nhập
                            </Button>
                        </Link>
                    )}
                </div>

            </div>
        </header>
    )
}
