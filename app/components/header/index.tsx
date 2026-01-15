"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { TCategoryService } from "./../../server/category"
import { useState, useEffect } from "react"

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

type Category = { maDanhMuc: string; tenDanhMuc: string }

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadCategories()
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



    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-xl flex items-center gap-2 p-8">
                    <img src="https://i.imgur.com/lC22izJ.png" className="h-11" alt="" />
                    <h1 className=" font-bold text-xl font-3xl">
                        Cyber <span className="text-yellow-900 ">Soft</span>
                    </h1>

                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Keyboard shortcuts
                                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Danh sách khóa học</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {loading ? (
                                            <DropdownMenuItem disabled>
                                                Đang tải...
                                            </DropdownMenuItem>
                                        ) : categories.length > 0 ? (
                                            categories.map((cat) => (
                                                <DropdownMenuItem key={cat.maDanhMuc}>
                                                    {cat.tenDanhMuc}
                                                </DropdownMenuItem>
                                            ))
                                        ) : (
                                            <DropdownMenuItem disabled>
                                                Không có khóa học
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem>
                                New Team
                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Ở giữa: Menu chính */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="gap-6">
                        <Link href="/docs" passHref>
                            <span className="text-sm font-medium hover:text-primary cursor-pointer">Tài liệu</span>
                        </Link>
                        <Link href="/pricing" passHref>
                            <span className="text-sm font-medium hover:text-primary cursor-pointer">Bảng giá</span>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Bên phải: Nút hành động */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">Đăng nhập</Button>
                    <Button size="sm">Bắt đầu</Button>
                </div>
            </div>
        </header>
    )
}