"use client"
import { Category } from "@/app/types"
import { TCategoryService } from "@/app/server/category"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

export default function CourseTap({ onCategoryChange }: { onCategoryChange: (id: string) => void }) {
    const [loading, setLoading] = React.useState(false)
    const [categories, setCategories] = React.useState<Category[]>([])
    const [selectedName, setSelectedName] = React.useState<string>("Tất cả danh mục")

    const getCategories = async () => {
        setLoading(true)
        try {
            const res = await TCategoryService.Category()
            if (Array.isArray(res)) {
                setCategories(res);
            } else if (res && typeof res === 'object' && 'content' in res) {
                // @ts-ignore
                setCategories(res.content || []);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Failed to load categories:", error);
            setCategories([]);
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        getCategories()
    }, [])

    const handleSelect = (id: string, name: string) => {
        onCategoryChange(id);
        setSelectedName(name);
    }

    return (
        <div className="mb-6 flex justify-start">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-[#0f172a] text-white border-gray-700 hover:bg-gray-800 hover:text-white min-w-[200px] justify-between">
                        <span className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            {selectedName}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px] bg-[#1e293b] text-white border-gray-700">
                    <DropdownMenuItem
                        className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                        onClick={() => handleSelect("", "Tất cả danh mục")}
                    >
                        Tất cả danh mục
                    </DropdownMenuItem>
                    {categories.map((cat) => (
                        <DropdownMenuItem
                            key={cat.maDanhMuc}
                            className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                            onClick={() => handleSelect(cat.maDanhMuc, cat.tenDanhMuc)}
                        >
                            {cat.tenDanhMuc}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
