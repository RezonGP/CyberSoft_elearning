"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KhoaHoc } from "@/app/types"

import { Button } from "@/components/ui/button"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Hero = ({ data }: { data?: KhoaHoc }) => { // Thêm dấu ? ở đây
    if (!data) {
        return <div>Đây là Banner mặc định khi chưa có dữ liệu</div>
    }

    return (
        <section className="relative w-full bg-[#0f172a] py-4">
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
                    className="rounded-lg overflow-hidden shadow-xl border border-gray-800"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="relative flex flex-col md:flex-row items-center bg-[#1e293b] min-h-[400px]">
                            {/* Nội dung bên trái */}
                            <div className="w-full md:w-1/2 p-8 md:p-16 z-10">
                                <div className="bg-[#0f172a]/90 backdrop-blur p-8 shadow-2xl border border-gray-700 max-w-md animate-in fade-in slide-in-from-left duration-700 rounded-xl">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                                        Tiết kiệm 20% cho một năm học
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-4">
                                        Hãy lấp đầy những lỗ hổng kỹ năng của bạn với các khóa học có thể tạo ra tác động lớn nhất. Các khóa học có giá từ 279.000 đ kết thúc tối nay.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 md:flex-row">
                                        <Button variant="secondary" className='bg-gray-200 text-gray-900 hover:bg-white font-semibold'>Tìm Hiểu Thêm</Button>
                                    </div>
                                </div>

                            </div>

                            {/* Hình ảnh bên phải */}
                            <div className="w-full md:w-full h-full absolute inset-0 md:relative md:flex-1 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b] via-transparent to-transparent z-10 hidden md:block" />
                                <img
                                    src="https://cybersoft.edu.vn/wp-content/uploads/2022/12/173498625_1748188092035509_2804459782783227284_n-1.png"
                                    alt="Hero"
                                    className="w-full h-full object-cover object-right opacity-80"
                                />
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 (Ví dụ thêm) */}
                    <SwiperSlide>
                        <div className="relative flex items-center bg-slate-900 min-h-[400px] text-white">
                            <div className="container mx-auto px-16 z-10">
                                <div className="max-w-xl">
                                    <h2 className="text-4xl font-bold mb-4 text-white">Học lập trình thực chiến</h2>
                                    <p className="text-xl text-gray-400">Trở thành lập trình viên chuyên nghiệp sau 6 tháng cùng Dream-Cyber.</p>
                                    <img
                                        src="https://cybersoft.edu.vn/wp-content/uploads/2017/04/MAX-OP1.png"
                                        alt="Hero"
                                        className="w-full h-full object-cover object-right opacity-60 absolute inset-0 -z-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Nút điều hướng Custom (Tròn, trắng, đổ bóng như mẫu) */}
                <button className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1e293b] rounded-full shadow-lg flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 hidden md:flex text-white">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#1e293b] rounded-full shadow-lg flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 hidden md:flex text-white">
                    <ChevronRight className="w-6 h-6" />
                </button>

            </div>
        </section>
    );
};

export default Hero;