"use client";

import { useState } from "react";
import Image from "next/image";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { KhoaHoc } from "@/app/types";
import { useCart } from "@/app/context/CartContext";

export function CourseCard({ data }: { data: KhoaHoc }) {
    const { addToCart, cart } = useCart();
    const [imgSrc, setImgSrc] = useState(data.hinhAnh);

    // Cập nhật imgSrc khi prop data.hinhAnh thay đổi (ví dụ khi fetch lại dữ liệu)
    if (imgSrc !== data.hinhAnh && !imgSrc.includes("cybersoft.edu.vn")) {
        setImgSrc(data.hinhAnh);
    }

    if (!data) return null;

    const isInCart = cart.some(
        (item) => item.maKhoaHoc === data.maKhoaHoc
    );

    return (
        <div className="flex justify-center">
            <HoverCard openDelay={200} closeDelay={100}>
                {/* ===== CARD ===== */}
                <HoverCardTrigger asChild>
                    <div className="w-full bg-[#1e293b]/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-pointer overflow-hidden group h-full flex flex-col relative">
                        {/* Image */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={imgSrc}
                                alt={data.tenKhoaHoc}
                                fill
                                className="object-cover group-hover:scale-110 transition duration-700 ease-out"
                                onError={() => setImgSrc("https://cybersoft.edu.vn/wp-content/uploads/2022/12/173498625_1748188092035509_2804459782783227284_n-1.png")} // Fallback image
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />

                            {/* Badge góc trên */}
                            <div className="absolute top-3 left-3">
                                <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-md shadow-lg border-0 font-bold px-3 py-1">
                                    Hot
                                </Badge>
                            </div>

                            {/* Nút Play hiển thị khi hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl transform group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col gap-3 flex-grow relative">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-lg text-white line-clamp-2 leading-snug group-hover:text-purple-400 transition-colors">
                                    {data.tenKhoaHoc}
                                </h3>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-500 text-xs">({data.luotXem})</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 line-through">1.059.000 ₫</span>
                                    <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                        279.000 ₫
                                    </span>
                                </div>
                                <Button size="sm" className="rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 transition-all shadow-lg hover:shadow-purple-500/20">
                                    Xem ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </HoverCardTrigger>

                {/* ===== HOVER CARD CONTENT ===== */}
                <HoverCardContent className="w-80 p-0 bg-[#1e293b] border border-gray-700 shadow-2xl z-50 text-gray-200" side="right" align="start">
                    <div className="p-4 space-y-3">
                        <h3 className="font-bold text-lg text-white leading-snug">
                            {data.tenKhoaHoc}
                        </h3>

                        <div className="flex items-center gap-2 text-xs">
                            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-0 font-semibold">
                                Bán chạy nhất
                            </Badge>
                            <span className="text-green-400 font-medium">Cập nhật 01/2026</span>
                        </div>

                        <div className="text-xs text-gray-400 font-medium">
                            22 giờ học • Tất cả cấp độ
                        </div>

                        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                            {data.moTa}
                        </p>

                        <div className="space-y-2 pt-1">
                            <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-xs text-gray-300">Xây dựng ứng dụng thực tế</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-xs text-gray-300">Thành thạo công nghệ mới</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                <span className="text-xs text-gray-300">Chứng chỉ hoàn thành</span>
                            </div>
                        </div>

                        <div className="pt-3 flex gap-2">
                            {isInCart ? (
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold border border-green-500" disabled>
                                    Đã thêm vào giỏ
                                </Button>
                            ) : (
                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-lg hover:shadow-purple-500/20 border border-purple-500"
                                    onClick={() => addToCart(data)}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            )}
                            <Button variant="outline" size="icon" className="shrink-0 border-gray-600 bg-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
