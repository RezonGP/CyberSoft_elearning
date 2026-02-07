"use client"
import { ServiceCourse } from "@/app/server/course"
import { KhoaHoc } from "@/app/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

export function CardImage({ selectedCategory }: { selectedCategory?: string }) {

    const [course, setCourses] = useState<KhoaHoc[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        loadCategories();
    }, []);
    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await ServiceCourse.listDanhSachKhoaHoc();
            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                setCourses((data as any)?.content || []);
            }
        } catch (error) {
            console.error("Error loading coses:", error);
        } finally {
            setLoading(false);
        }

    };
    const handleDeleteCourse = async (maKhoaHoc: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) return;
        try {
            await ServiceCourse.xoaKhoaHoc(maKhoaHoc);
            alert("Xóa khóa học thành công!");
            loadCategories();
        } catch (error: any) {
            console.error("Error deleting course full info:", error);
            // Kiểm tra kỹ cấu trúc lỗi trả về
            const errorData = error?.response?.data;
            const msg = typeof errorData === 'string' ? errorData : (errorData?.message || "Xóa thất bại. Khóa học có thể đã có người đăng ký.");
            alert(`Lỗi: ${msg}`);
        }
    }
    // Filter courses based on selectedCategory
    const filteredCourses = selectedCategory
        ? course.filter(c => c.danhMucKhoaHoc?.maDanhMucKhoahoc === selectedCategory)
        : course;

    return (
        <div >
            {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
                </div>

            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredCourses.map((item) => (
                        <Card key={item.maKhoaHoc} className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden flex flex-col bg-[#0f172a] text-white border-0 shadow-lg group">
                            <div className="relative aspect-square w-full overflow-hidden">
                                <div className="absolute inset-0 z-30 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                <img
                                    src={item.hinhAnh || "https://avatar.vercel.sh/shadcn1"}
                                    alt={item.tenKhoaHoc}
                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 z-40">
                                    <Badge variant="secondary" className="bg-white/90 text-black text-[10px] px-2 py-0.5 hover:bg-white">Chỉnh sửa</Badge>
                                </div>
                                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button onClick={() => handleDeleteCourse(item.maKhoaHoc)} size="sm" className="bg-red-500 text-white hover:bg-red-800 font-medium m-3">
                                        xóa
                                    </Button>
                                    <Button size="sm" className="bg-amber-300 text-black hover:bg-amber-500 font-medium m-3">
                                        sửa
                                    </Button>
                                </div>
                            </div>
                            <div className="p-3 flex flex-col gap-2 flex-1">
                                <div>
                                    <CardTitle className="text-sm font-bold line-clamp-1 mb-1" title={item.tenKhoaHoc}>{item.tenKhoaHoc}</CardTitle>
                                    <CardDescription className="text-gray-400 text-xs line-clamp-2">
                                        {item.moTa || "Mô tả đang cập nhật..."}
                                    </CardDescription>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

        </div>

    )
}
