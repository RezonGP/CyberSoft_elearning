"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Import component con động, tắt SSR
const SearchResults = dynamic(() => import("./SearchResults"), {
    ssr: false,
    loading: () => (
        <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Đang tải...</p>
        </div>
    )
})

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12">
            <SearchResults />
        </div>
    )
}