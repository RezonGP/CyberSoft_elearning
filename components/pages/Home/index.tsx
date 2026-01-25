"use client"
import { CourseCard } from "@/components/ItemCourse"
import { ServiceCourse } from "@/app/server/course"
import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { KhoaHoc } from "@/app/types";
import TrustedCompanies from "@/components/navbar";
import Testimonials from "@/components/Testimonials";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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

            {course.length > 0 && <Hero data={course[0]} />}
            {/* Sử dụng Grid System để chia cột chuẩn: 1 cột (mobile), 2 cột (tablet), 3 hoặc 4 cột (desktop) */}
            <div className="mb-10 text-left mt-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Các khóa học thịnh hành
                </h1>
                <div className="mt-2 h-1.5 w-20 bg-orange-500 rounded-full"></div> {/* Thanh trang trí gạch chân */}
                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                    Nâng cao kỹ năng của bạn với các lộ trình đào tạo chuyên sâu từ chuyên gia hàng đầu tại CyberSoft.
                </p>
            </div>

            <div className="relative group m-7">
                {loading ? (
                    <div className="text-center py-20 text-slate-500">Đang tải khóa học...</div>
                ) : (
                    <>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.course-next',
                                prevEl: '.course-prev',
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="py-4"
                        >
                            {course.slice(1).map((item) => (
                                <SwiperSlide key={item.maKhoaHoc} className="h-auto">
                                    <CourseCard data={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation Buttons */}
                        <button className="course-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0">
                            <ChevronLeft className="w-6 h-6 text-slate-700" />
                        </button>
                        <button className="course-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0">
                            <ChevronRight className="w-6 h-6 text-slate-700" />
                        </button>
                    </>
                )}
            </div>

            {/* Navbar */}
            <TrustedCompanies />

            <div className="mt-20">
                <Testimonials />
            </div>
            {/* card mo ta */}

        </main >
    )
}

export default HomePage