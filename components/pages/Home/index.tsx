"use client"
import { CourseCard } from "@/components/ItemCourse"
import { ServiceCourse } from "@/app/server/course"
import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";

// Định nghĩa lại Type để khớp với dữ liệu thực tế (danhMucKhoaHoc là object)
export type KhoaHoc = {
    maKhoaHoc?: string;
    biDanh?: string;
    tenKhoaHoc?: string;
    moTa?: string;
    luotXem?: number;
    hinhAnh?: string;
    maNhom?: string;
    ngayTao?: string;
    soLuongHocVien?: number;
    nguoiTao?: any;
    danhMucKhoaHoc?: {
        maDanhMucKhoahoc: string;
        tenDanhMucKhoaHoc: string;
    };
}

const HomePage = () => {
    const [course, setCourse] = useState<KhoaHoc[]>([])
    const [loading, setLoading] = useState(false)

    const fetchCourse = async () => {
        try {
            setLoading(true)
            const data = await ServiceCourse.listDanhSachKhoaHoc()
            if (Array.isArray(data)) {
                setCourse(data)
            } else {
                setCourse((data as any)?.content || []);
            }
        } catch (error) {
            console.error("Failed to load courses:", error);
            setCourse([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    return (

        /* Sử dụng mx-auto để căn giữa container và py cho khoảng cách trên dưới */
        <main className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">



            {/* Tiêu đề được tách riêng ra một khối độc lập */}
            <div className="mb-10 text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Các khóa học thịnh hành
                </h1>
                <div className="mt-2 h-1.5 w-20 bg-orange-500 rounded-full"></div> {/* Thanh trang trí gạch chân */}
                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                    Nâng cao kỹ năng của bạn với các lộ trình đào tạo chuyên sâu từ chuyên gia hàng đầu tại CyberSoft.
                </p>
            </div>
            {course.length > 0 && <Hero data={course[0]} />}
            {/* Sử dụng Grid System để chia cột chuẩn: 1 cột (mobile), 2 cột (tablet), 3 hoặc 4 cột (desktop) */}
            <div className="flex   gap-8">
                {loading ? (
                    <div className="col-span-full text-center py-20 text-slate-500">Đang tải khóa học...</div>
                ) : (
                    course.slice(1, 7).map((item) => (
                        <CourseCard
                            key={item.maKhoaHoc}
                            data={item}
                        />
                    ))
                )}
            </div>

        </main>
    )
}

export default HomePage