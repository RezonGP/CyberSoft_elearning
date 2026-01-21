"use client"

import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { ServiceCourse } from '@/app/server/course';

export function CartSummaryCard() {
    const { cart, removeFromCart, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        // 1. Kiểm tra đăng nhập
        const storedUser = localStorage.getItem("USER_ADMIN");
        if (!storedUser) {
            alert("Vui lòng đăng nhập để thanh toán!");
            router.push("/auth");
            return;
        }

        const user = JSON.parse(storedUser);
        const taiKhoan = user.taiKhoan;

        if (!taiKhoan) {
            alert("Thông tin tài khoản không hợp lệ. Vui lòng đăng nhập lại.");
            router.push("/auth");
            return;
        }

        if (confirm(`Bạn có chắc muốn đăng ký ${cart.length} khóa học này không?`)) {
            setLoading(true);
            try {
                // 2. Gọi API đăng ký cho từng khóa học
                const results = await Promise.allSettled(
                    cart.map(item =>
                        ServiceCourse.dangKyKhoaHoc({
                            maKhoaHoc: item.maKhoaHoc,
                            taiKhoan: taiKhoan
                        })
                    )
                );

                // 3. Xử lý kết quả
                const successCount = results.filter(r => r.status === 'fulfilled').length;
                const failCount = results.length - successCount;

                if (successCount > 0) {
                    alert(`Đăng ký thành công ${successCount} khóa học!${failCount > 0 ? ` (${failCount} lỗi)` : ''}`);
                    clearCart();
                } else {
                    alert("Đăng ký thất bại. Vui lòng thử lại sau.");
                }

            } catch (error) {
                console.error("Checkout error:", error);
                alert("Đã xảy ra lỗi trong quá trình thanh toán.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (cart.length === 0) {
        return (
            <Card className="w-full max-w-md mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-center">Giỏ hàng của bạn</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8 text-muted-foreground">
                    Chưa có khóa học nào trong giỏ hàng.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                    <span>Giỏ hàng ({cart.length})</span>
                    <span className="text-orange-600">{totalPrice.toLocaleString()} đ</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                    <div key={item.maKhoaHoc} className="flex gap-3 group relative">
                        <img
                            src={item.hinhAnh}
                            alt={item.tenKhoaHoc}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-1">
                            <h4 className="font-medium text-sm line-clamp-2">{item.tenKhoaHoc}</h4>
                            <p className="text-xs text-muted-foreground">Giảng viên: {item.nguoiTao?.hoTen}</p>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-sm font-bold text-orange-600">279.000 đ</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => removeFromCart(item.maKhoaHoc)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
            <Separator />
            <CardFooter className="pt-4 flex flex-col gap-3">
                <div className="flex justify-between w-full text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-orange-600">{totalPrice.toLocaleString()} đ</span>
                </div>
                <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5"
                    onClick={handleCheckout}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
                        </>
                    ) : (
                        "Thanh toán ngay"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
