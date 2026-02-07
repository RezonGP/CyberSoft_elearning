"use client"
import { CourseCard } from "@/components/ItemCourse"
import { ServiceCourse } from "@/app/server/course"
import { useEffect, useState } from "react";
import { Hero } from "@/components/hero";
import { KhoaHoc, Category } from "@/app/types";
import TrustedCompanies from "@/components/navbar";
import Testimonials from "@/components/Testimonials";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TCategoryService } from "@/app/server/category";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const HomePage = () => {
    const [course, setCourse] = useState<KhoaHoc[]>([])
    const [filteredCourses, setFilteredCourses] = useState<KhoaHoc[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const [coursesData, categoriesData] = await Promise.all([
                ServiceCourse.listDanhSachKhoaHoc(),
                TCategoryService.Category()
            ]);

            // Set Courses
            let allCourses: KhoaHoc[] = [];
            if (Array.isArray(coursesData)) {
                allCourses = coursesData;
            } else {
                allCourses = (coursesData as any)?.content || [];
            }
            setCourse(allCourses);
            setFilteredCourses(allCourses);

            // Set Categories
            if (Array.isArray(categoriesData)) {
                setCategories(categoriesData);
            } else {
                setCategories((categoriesData as any)?.content || []);
            }

        } catch (error) {
            console.error("Failed to load data:", error);
            setCourse([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCategoryClick = (maDanhMuc: string) => {
        setSelectedCategory(maDanhMuc);
        if (maDanhMuc === "all") {
            setFilteredCourses(course);
        } else {
            const filtered = course.filter(c => c.danhMucKhoaHoc?.maDanhMucKhoahoc === maDanhMuc);
            setFilteredCourses(filtered);
        }
    };

    return (

        /* Sử dụng mx-auto để căn giữa container và py cho khoảng cách trên dưới */
        <main className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">



            {/* Tiêu đề được tách riêng ra một khối độc lập */}

            {filteredCourses.length > 0 ? (
                <Hero data={filteredCourses[0]} />
            ) : (
                <div className="text-center py-10 bg-slate-50 rounded-lg mb-8">
                    <p className="text-slate-500">Không tìm thấy khóa học nào trong danh mục này.</p>
                </div>
            )}

            {/* Sử dụng Grid System để chia cột chuẩn: 1 cột (mobile), 2 cột (tablet), 3 hoặc 4 cột (desktop) */}
            <div className="mb-6 text-left mt-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Các khóa học thịnh hành
                </h1>
                <div className="mt-2 h-1.5 w-20 bg-orange-500 rounded-full"></div> {/* Thanh trang trí gạch chân */}
                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                    Nâng cao kỹ năng của bạn với các lộ trình đào tạo chuyên sâu từ chuyên gia hàng đầu tại CyberSoft.
                </p>
            </div>

            {/* CATEGORY TABS */}
            <div className="mb-8 flex flex-wrap gap-3">
                <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === "all" ? "bg-slate-900 hover:bg-slate-800 shadow-lg scale-105" : "text-slate-600 border-slate-200 hover:border-slate-900 hover:text-slate-900"}`}
                    onClick={() => handleCategoryClick("all")}
                >
                    Tất cả
                </Button>
                {categories.map((cat) => (
                    <Button
                        key={cat.maDanhMuc}
                        variant={selectedCategory === cat.maDanhMuc ? "default" : "outline"}
                        className={`rounded-full px-6 transition-all duration-300 ${selectedCategory === cat.maDanhMuc ? "bg-slate-900 hover:bg-slate-800 shadow-lg scale-105" : "text-slate-600 border-slate-200 hover:border-slate-900 hover:text-slate-900"}`}
                        onClick={() => handleCategoryClick(cat.maDanhMuc)}
                    >
                        {cat.tenDanhMuc}
                    </Button>
                ))}
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
                            {filteredCourses.slice(1).map((item) => (
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