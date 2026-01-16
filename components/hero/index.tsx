"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KhoaHoc } from "../pages/Home"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Hero({ data }: { data: KhoaHoc }) {
    console.log("dataHero", data);

    return (
        <section className="relative w-full bg-white py-4">
            <div className="container mx-auto max-w-7xl px-4 relative group">

                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    className="rounded-lg overflow-hidden shadow-sm"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="relative flex flex-col md:flex-row items-center bg-[#F7F9FA] min-h-[400px]">
                            {/* Nội dung bên trái */}
                            <div className="w-full md:w-1/2 p-8 md:p-16 z-10">
                                <div className="bg-white p-8 shadow-xl border border-slate-100 max-w-md animate-in fade-in slide-in-from-left duration-700">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                                        Hãy tiến lên phía trước để đạt được mục tiêu của bạn.
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed mb-4">
                                        Hãy lấp đầy những lỗ hổng kỹ năng của bạn với các khóa học có thể tạo ra tác động lớn nhất. Các khóa học có giá từ 279.000 đ kết thúc tối nay.
                                    </p>
                                </div>
                            </div>

                            {/* Hình ảnh bên phải */}
                            <div className="w-full md:w-full h-full absolute inset-0 md:relative md:flex-1 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F7F9FA] via-transparent to-transparent z-10 hidden md:block" />
                                <img
                                    src="https://s.udemycdn.com/home/non-logged-in-homepage/rebrand/ub-promotional-banner-desktop.png"
                                    alt="Hero"
                                    className="w-full h-full object-cover object-right"
                                />
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 (Ví dụ thêm) */}
                    <SwiperSlide>
                        <div className="relative flex items-center bg-slate-900 min-h-[400px] text-white">
                            <div className="container mx-auto px-16 z-10">
                                <div className="max-w-xl">
                                    <h2 className="text-4xl font-bold mb-4 text-orange-500">Học lập trình thực chiến</h2>
                                    <p className="text-xl text-slate-300">Trở thành lập trình viên chuyên nghiệp sau 6 tháng cùng CyberSoft.</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Nút điều hướng Custom (Tròn, trắng, đổ bóng như mẫu) */}
                <button className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
                    <ChevronLeft className="w-6 h-6 text-slate-700" />
                </button>
                <button className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex">
                    <ChevronRight className="w-6 h-6 text-slate-700" />
                </button>

            </div>
        </section>
    );
};

export default Hero;