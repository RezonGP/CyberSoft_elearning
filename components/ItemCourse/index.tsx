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
                    <div className="w-full bg-white rounded-xl border hover:shadow-xl transition cursor-pointer overflow-hidden group">
                        {/* Image */}
                        <div className="relative h-[160px]">
                            <Image
                                src={imgSrc}
                                alt={data.tenKhoaHoc}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                                onError={() => setImgSrc("https://cybersoft.edu.vn/wp-content/uploads/2022/12/173498625_1748188092035509_2804459782783227284_n-1.png")} // Fallback image
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                            <h3 className="font-semibold line-clamp-2 min-h-[48px]">
                                {data.tenKhoaHoc}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Lượt xem {data.luotXem}
                            </p>

                            <div className="flex items-center gap-2">
                                <Badge className="bg-teal-100 text-teal-700">
                                    Bán chạy nhất
                                </Badge>
                                <span className="text-sm font-medium text-orange-600">
                                    4.7 ⭐
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-black">
                                    279.000 đ
                                </span>
                                <span className="text-sm line-through text-muted-foreground">
                                    1.059.000 đ
                                </span>
                            </div>
                        </div>
                    </div>
                </HoverCardTrigger>

                {/* ===== HOVER DETAIL ===== */}
                <HoverCardContent
                    side="right"
                    align="start"
                    className="w-[360px] p-6 shadow-xl border bg-white"
                >
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold leading-snug">
                            {data.tenKhoaHoc}
                        </h3>

                        <div className="flex items-center gap-2 text-xs">
                            <Badge className="bg-teal-600">Bán chạy nhất</Badge>
                            <span className="text-teal-700">
                                Cập nhật 01/2026
                            </span>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            22 giờ học • Tất cả cấp độ
                        </p>

                        <p className="text-sm line-clamp-3">
                            {data.moTa ||
                                "Khóa học giúp bạn nắm vững kiến thức và áp dụng thực tế vào dự án."}
                        </p>

                        <ul className="space-y-2">
                            {[
                                "Nắm chắc nền tảng",
                                "Học qua dự án thực tế",
                                "Hỗ trợ từ mentor",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm"
                                >
                                    <Check className="w-4 h-4 text-green-600 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={`w-full py-6 text-lg font-semibold ${isInCart
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-purple-600 hover:bg-purple-700"
                                }`}
                            disabled={isInCart}
                            onClick={() => addToCart(data)}
                        >
                            {isInCart ? (
                                <>
                                    <Check className="mr-2 h-5 w-5" />
                                    Đã thêm vào giỏ
                                </>
                            ) : (
                                "Thêm vào giỏ hàng"
                            )}
                        </Button>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
