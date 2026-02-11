"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { ServiceCourse } from "@/app/server/course"
import { KhoaHoc } from "@/app/types"
import { CourseCard } from "@/components/ItemCourse"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Force dynamic rendering to prevent prerender errors
export const dynamic = "force-dynamic";

function SearchResults() {
    const searchParams = useSearchParams()
    const query = searchParams?.get("q") || ""
    const [results, setResults] = useState<KhoaHoc[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setResults([])
                return
            }

            try {
                setLoading(true)
                // Lấy toàn bộ danh sách khóa học rồi filter client-side
                // (Vì API tìm kiếm của CyberSoft có thể hạn chế hoặc chưa rõ endpoint)
                const allCourses = await ServiceCourse.listDanhSachKhoaHoc()

                let courses: KhoaHoc[] = []
                if (Array.isArray(allCourses)) {
                    courses = allCourses
                } else {
                    courses = (allCourses as any)?.content || []
                }

                // Filter theo tên khóa học không phân biệt hoa thường
                const filtered = courses.filter(c =>
                    c.tenKhoaHoc.toLowerCase().includes(query.toLowerCase()) ||
                    c.moTa.toLowerCase().includes(query.toLowerCase())
                )

                setResults(filtered)
            } catch (error) {
                console.error("Search failed:", error)
                setResults([])
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Kết quả tìm kiếm cho "{query}"
                </h1>
                <p className="text-gray-400">
                    Tìm thấy {results.length} khóa học phù hợp
                </p>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">Đang tìm kiếm...</p>
                </div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((item) => (
                        <CourseCard key={item.maKhoaHoc} data={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-[#1e293b] rounded-xl border border-gray-700">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold text-white mb-2">Không tìm thấy kết quả nào</h2>
                    <p className="text-gray-400 mb-6">
                        Hãy thử tìm kiếm với từ khóa khác hoặc xem danh sách khóa học phổ biến.
                    </p>
                    <Link href="/">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Quay về trang chủ
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200 py-12">
            <Suspense fallback={
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">Đang tải...</p>
                </div>
            }>
                <SearchResults />
            </Suspense>
        </div>
    )
}