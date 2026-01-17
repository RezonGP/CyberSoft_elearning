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
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
            <div className="container mx-auto flex h-16 items-center px-4">

                {/* 1. LOGO & BRAND */}
                <Link href="/" className="flex items-center gap-2 mr-8 hover:opacity-90 transition-opacity">
                    <img src="https://i.imgur.com/lC22izJ.png" className="h-9 w-auto" alt="CyberSoft Logo" />
                    <h1 className="font-bold text-xl tracking-tight hidden sm:block">
                        Cyber <span className="text-orange-600">Soft</span>
                    </h1>
                </Link>

                {/* 2. CATEGORIES DROPDOWN */}
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="font-semibold gap-1 text-gray-700">
                                <span className="grid grid-cols-2 gap-0.5 mr-2">
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                                </span>
                                DANH MỤC
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-64" align="start">
                            <DropdownMenuLabel>Khám phá kỹ năng</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {loading ? (
                                <DropdownMenuItem disabled>Đang tải dữ liệu...</DropdownMenuItem>
                            ) : categories.length > 0 ? (
                                categories.map((cat) => (
                                    <DropdownMenuItem key={cat.maDanhMuc} className="cursor-pointer py-2">
                                        {cat.tenDanhMuc}
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
                            className="w-full h-10 pl-10 pr-4 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                        />
                        <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                {/* 4. ACTIONS */}
                <div className="ml-auto flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="hidden sm:inline text-sm text-gray-700">
                                Xin chào, {user.hoTen || user.taiKhoan}
                            </span>
                            <Button
                                variant="outline"
                                className="border-orange-600 text-orange-600 hover:bg-orange-50"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <Link href="/auth">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-md transition-all">
                                Đăng nhập
                            </Button>
                        </Link>
                    )}
                </div>

            </div>
        </header>
    )
}
