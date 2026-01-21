"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ShoppingCart } from "lucide-react"
import { KhoaHoc } from "@/app/types"
import { useCart } from "@/app/context/CartContext"

export function CourseCard({ data }: { data: KhoaHoc }) {
    const { addToCart, cart } = useCart();

    if (!data) return <div>Loading...</div>; // Kiểm tra nếu không có data

    const isInCart = cart.some(item => item.maKhoaHoc === data.maKhoaHoc);

    const handleAddToCart = () => {
        addToCart(data);
        // Toast success message here if toast is available
    };

    return (
        <div className="p-4 flex justify-center"> {/* Adjusted padding for better grid fit */}
            <HoverCard openDelay={200} closeDelay={100}>
                {/* PHẦN 1: CARD HIỂN THỊ BÊN NGOÀI */}
                <HoverCardTrigger asChild>
                    <div className="w-[300px] bg-white rounded-xl border cursor-pointer hover:shadow-lg transition-all overflow-hidden group">
                        <div className="overflow-hidden">
                            <img
                                src={data?.hinhAnh}
                                alt={data.tenKhoaHoc}
                                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4 space-y-2">
                            <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3rem]">
                                {data.tenKhoaHoc}
                            </h3>
                            <p className="text-sm text-muted-foreground">Lượt xem {data.luotXem}</p>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-100">Bán chạy nhất</Badge>
                                <span className="text-sm font-bold text-orange-600">4.7 ⭐</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">279.000 đ</span>
                                <span className="text-sm text-muted-foreground line-through">1.059.000 đ</span>
                            </div>
                        </div>
                    </div>
                </HoverCardTrigger>

                {/* PHẦN 2: BẢNG CHI TIẾT KHI HOVER (SIDE "RIGHT" HOẶC "LEFT") */}
                <HoverCardContent side="right" align="start" className="w-[350px] p-6 shadow-2xl border-2 z-50 bg-white">
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl leading-snug">
                            {data.tenKhoaHoc}
                        </h3>

                        <div className="flex items-center gap-2 text-xs">
                            <Badge className="bg-teal-500">Bán chạy nhất</Badge>
                            <span className="text-teal-600 font-medium">Đã cập nhật tháng 1 năm 2026</span>
                        </div>

                        <p className="text-xs text-muted-foreground">Tổng số 22 giờ • Tất cả các cấp độ</p>

                        <p className="text-sm line-clamp-3">
                            {data.moTa || "Khóa học chất lượng cao từ CyberSoft với lộ trình bài bản, thực hành thực tế."}
                        </p>

                        <ul className="space-y-2">
                            {[
                                "Nền tảng vững chắc để đi làm",
                                "Kiến thức toàn diện, thực tế",
                                "Hỗ trợ 24/7 từ Mentor"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Check className="h-4 w-4 mt-0.5 text-slate-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={`w-full font-bold py-6 text-lg ${isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                            onClick={handleAddToCart}
                            disabled={isInCart}
                        >
                            {isInCart ? (
                                <>
                                    <Check className="mr-2 h-5 w-5" /> Đã thêm vào giỏ
                                </>
                            ) : (
                                "Thêm vào giỏ hàng"
                            )}
                        </Button>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}