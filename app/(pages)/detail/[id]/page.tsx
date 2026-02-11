"use client"

import { useEffect, useState } from "react"
import { ServiceCourse } from "@/app/server/course"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, Clock, CheckCircle2, User, Star, Share2, Video } from "lucide-react"

export default function CourseDetail() {
    const params = useParams()
    const id = params?.id as string
    const [course, setCourse] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        const fetchDetail = async () => {
            try {
                setLoading(true)
                const data = await ServiceCourse.layThongTinKhoaHoc(id)
                setCourse(data)
            } catch (error) {
                console.error("Failed to load course detail:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchDetail()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
                Khóa học không tồn tại hoặc đã bị xóa.
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-gray-200 pb-20">
            {/* HERO SECTION */}
            <div className="bg-[#1e293b] border-b border-gray-700 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* LEFT: Course Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-3 text-sm font-medium text-purple-400">
                                <span className="uppercase tracking-wider">Lập trình</span>
                                <span>/</span>
                                <span className="uppercase tracking-wider">{course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Backend"}</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                                {course.tenKhoaHoc}
                            </h1>

                            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                                {course.moTa}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
                                    <span className="font-bold text-yellow-500 text-base">4.7</span>
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-gray-400 ml-1">(1,234 đánh giá)</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-300">
                                    <User className="w-4 h-4" />
                                    <span>{course.nguoiTao?.hoTen || "Giảng viên CyberSoft"}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-300">
                                    <Clock className="w-4 h-4" />
                                    <span>Cập nhật mới nhất 02/2026</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Course Preview Card (Desktop) */}
                        <div className="hidden lg:block relative">
                            <div className="absolute top-0 right-0 w-full max-w-sm">
                                <Card className="bg-[#0f172a] border-gray-700 shadow-2xl overflow-hidden sticky top-24 z-20">
                                    <div className="relative aspect-video w-full group cursor-pointer">
                                        <img
                                            src={course.hinhAnh}
                                            alt={course.tenKhoaHoc}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg group-hover:scale-110 transition-transform">
                                                <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 left-0 right-0 text-center text-white font-medium text-sm">
                                            Xem giới thiệu khóa học
                                        </div>
                                    </div>

                                    <CardContent className="p-6 space-y-6">
                                        <div className="flex items-end gap-3">
                                            <span className="text-3xl font-bold text-white">279.000 ₫</span>
                                            <span className="text-lg text-gray-500 line-through mb-1">1.059.000 ₫</span>
                                            <Badge className="mb-2 bg-purple-600 hover:bg-purple-700">Giảm 74%</Badge>
                                        </div>

                                        <div className="space-y-3">
                                            <Button className="w-full h-12 text-lg font-bold bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/20">
                                                Thêm vào giỏ hàng
                                            </Button>
                                            <Button variant="outline" className="w-full h-12 text-lg font-semibold border-gray-600 hover:bg-white/5 hover:text-white">
                                                Mua ngay
                                            </Button>
                                        </div>

                                        <p className="text-center text-xs text-gray-400">Đảm bảo hoàn tiền trong 30 ngày</p>

                                        <div className="space-y-3 pt-4 border-t border-gray-800">
                                            <h4 className="font-bold text-white text-sm">Khóa học bao gồm:</h4>
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                <li className="flex items-center gap-3">
                                                    <Video className="w-4 h-4 text-gray-500" />
                                                    <span>22 giờ video theo yêu cầu</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <Share2 className="w-4 h-4 text-gray-500" />
                                                    <span>Truy cập trọn đời</span>
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <span>Truy cập trên thiết bị di động và TV</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* What you'll learn */}
                    <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Bạn sẽ học được gì</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Xây dựng các ứng dụng web full-stack mạnh mẽ",
                                "Làm chủ React Hooks và Redux Toolkit",
                                "Thiết kế RESTful API chuẩn mực",
                                "Triển khai ứng dụng lên AWS và Vercel",
                                "Tối ưu hiệu năng và bảo mật ứng dụng",
                                "Làm việc với Docker và CI/CD pipelines"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Content */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Nội dung khóa học</h2>
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                            <span>15 chương • 128 bài học • Thời lượng 22h 15m</span>
                            <button className="text-purple-400 font-medium hover:text-purple-300">Mở rộng tất cả</button>
                        </div>
                        <div className="space-y-2">
                            {[1, 2, 3, 4, 5].map((section) => (
                                <div key={section} className="bg-[#1e293b] border border-gray-700 rounded-lg overflow-hidden">
                                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-700/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500 font-mono">Chương {section}:</span>
                                            <span className="font-medium text-gray-200">Giới thiệu và Cài đặt môi trường</span>
                                        </div>
                                        <span className="text-xs text-gray-500">3 bài • 15m</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Yêu cầu</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-300 marker:text-purple-500">
                            <li>Máy tính kết nối internet (Windows, macOS, hoặc Linux)</li>
                            <li>Tư duy logic cơ bản, không cần kiến thức lập trình trước đó</li>
                            <li>Tinh thần ham học hỏi và kiên trì</li>
                        </ul>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Mô tả</h2>
                        <div className="prose prose-invert max-w-none text-gray-300">
                            <p>
                                Chào mừng bạn đến với khóa học lập trình toàn diện nhất tại Dream-Cyber.
                                Khóa học này được thiết kế để đưa bạn từ người mới bắt đầu trở thành một lập trình viên chuyên nghiệp.
                            </p>
                            <p className="mt-4">
                                Chúng tôi cập nhật nội dung liên tục để đảm bảo bạn luôn học những công nghệ mới nhất.
                                Không chỉ học lý thuyết, bạn sẽ được thực hành qua các dự án thực tế giúp củng cố kiến thức vững chắc.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}