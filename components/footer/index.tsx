import Link from 'next/link'
import React from 'react'
import { CloudMoon } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* CỘT 1: THÔNG TIN THƯƠNG HIỆU */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <CloudMoon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors" />
                            <span className="font-bold text-2xl tracking-tight text-gray-100">
                                Dream-<span className="text-gray-400 group-hover:text-white transition-colors">Cyber</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Dream-Cyber là hệ thống đào tạo lập trình chuyên sâu, mang đến không gian học tập hiện đại và tư duy đột phá như những đám mây vươn tới ánh trăng.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {/* Social Icons giả lập */}
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-xs font-bold">f</div>
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-xs font-bold">yt</div>
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-xs font-bold">in</div>
                        </div>
                    </div>

                    {/* CỘT 2: KHÓA HỌC PHỔ BIẾN */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-l-4 border-gray-500 pl-3 text-white">Khóa Học</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Lập trình Front-End ReactJS</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Lập trình Back-End Java</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Lập trình Fullstack NextJS</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Tư duy lập trình & Thuật toán</li>
                        </ul>
                    </div>

                    {/* CỘT 3: LIÊN KẾT NHANH */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-l-4 border-gray-500 pl-3 text-white">Hỗ Trợ</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-white transition-colors cursor-pointer">Giảng viên chuyên gia</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Chính sách bảo mật</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Điều khoản dịch vụ</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Hướng dẫn thanh toán</li>
                        </ul>
                    </div>

                    {/* CỘT 4: LIÊN HỆ */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-l-4 border-gray-500 pl-3 text-white">Liên Hệ</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-gray-500">📍</span>
                                <span>82 Ung Văn Khiêm, P.25, Bình Thạnh, TP.HCM</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-gray-500">📞</span>
                                <span>0961.05.10.14</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-gray-500">✉️</span>
                                <span>info@dream-cyber.edu.vn</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <hr className="border-gray-800 mb-8" />

                {/* BẢN QUYỀN */}
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
                    <p>© 2024 Dream-Cyber Academy. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <img src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=..." alt="DMCA" className="h-6" />
                        <img src="http://online.gov.vn/Content/Main/images/logo-da-thong-bao.png" alt="Bộ Công Thương" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

