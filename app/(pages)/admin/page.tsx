

'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KhoaHoc } from "@/app/types"
import { ServiceCourse } from "@/app/server/course"
const revenueData = [
    { month: "Tháng 1", tiền: `123.321 ` },
    { month: "Tháng 2", tiền: 2242.4532 },
    { month: "Tháng 3", tiền: 3422.001 },
    { month: "Tháng 4", tiền: 4222.001 },
    { month: "Tháng 5", tiền: 3213.001 },
    { month: "Tháng 6", tiền: 6232.001 },
];

const studentData = [
    { name: "Frontend", value: 200 },
    { name: "Backend", value: 400 },
    { name: "Fullstack", value: 600 },
];

function StatCard({ title, tiền, sub }: { title: string; tiền: string; sub?: string }) {
    return (
        <Card className="bg-[#0f172a] text-white">
            <CardContent className="p-6">
                <p className="text-sm text-gray-400">{title}</p>
                <h2 className="text-2xl font-bold mt-1">{tiền}</h2>
                {sub && <p className="text-green-400 text-sm mt-1">{sub}</p>}
            </CardContent>
        </Card>
    );
}

const AdminPage: React.FC = () => {
    const [courses, setCourses] = useState<KhoaHoc[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [deleting, setDeleting] = useState<string | null>(null);

    // Modal/form state for adding course
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [form, setForm] = useState({
        maKhoaHoc: '',
        tenKhoaHoc: '',
        moTa: '',
        maNhom: 'GP01',
        hinhAnh: '',
        soLuongHocVien: 0,
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    const router = useRouter();
    const itemsPerPage = 5;

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await ServiceCourse.listDanhSachKhoaHoc();
            if (Array.isArray(data)) {
                setCourses(data);
            } else {
                setCourses((data as any)?.content || []);
            }
        } catch (error) {
            console.error("Failed to load courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (maKhoaHoc: string, tenKhoaHoc: string) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${tenKhoaHoc}"?`);
        if (!confirmDelete) return;

        try {
            setDeleting(maKhoaHoc);
            await ServiceCourse.xoaKhoaHoc(maKhoaHoc);

            setCourses(prev => prev.filter(c => c.maKhoaHoc !== maKhoaHoc));
            alert("Xóa khóa học thành công!");

            // Reset page if needed
            const newTotalPages = Math.ceil((courses.length - 1) / itemsPerPage);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }
        } catch (error: any) {
            console.error("Failed to delete course:", error);
            const serverMsg = error?.response?.data?.message || error?.response?.data || error?.message || "Lỗi hệ thống hoặc khóa học không thể xóa (đã có học viên).";
            alert(`Xóa thất bại: ${serverMsg}`);
        } finally {
            setDeleting(null);
        }
    };

    const handleAddCourse = () => {
        setForm({
            maKhoaHoc: '',
            tenKhoaHoc: '',
            moTa: '',
            maNhom: 'GP01',
            hinhAnh: '',
            soLuongHocVien: 0,
        });
        setFormError(null);
        setIsAddOpen(true);
    };

    const submitAddCourse = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setFormError(null);
        if (!form.maKhoaHoc.trim() || !form.tenKhoaHoc.trim()) {
            setFormError('Mã và tên khóa học là bắt buộc.');
            return;
        }

        // Prevent duplicate maKhoaHoc on client side
        if (courses.some(c => c.maKhoaHoc === form.maKhoaHoc)) {
            setFormError('Mã khóa học đã tồn tại. Vui lòng chọn mã khác.');
            return;
        }

        setSubmitting(true);
        try {
            // Gửi payload đã chuẩn hóa sang server
            await (ServiceCourse as any).themKhoaHoc?.({
                MaKhoaHoc: form.maKhoaHoc,
                TenKhoaHoc: form.tenKhoaHoc,
                MoTa: form.moTa,
                HinhAnh: form.hinhAnh,
                MaNhom: form.maNhom,
                LuotXem: form.soLuongHocVien || 0,
                NgayTao: new Date().toISOString(),
            });
            await loadCategories();
            setIsAddOpen(false);
            alert('Thêm khóa học thành công!');
        } catch (err: any) {
            console.error('Add course failed:', err);
            const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message || 'Lỗi khi thêm khóa học.';
            // Hiển thị lỗi trong form thay vì alert
            setFormError(String(serverMsg));
        } finally {
            setSubmitting(false);
        }
    };
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem("USER_ADMIN");
            if (!raw) {
                setAuthorized(false);
                router.replace("/auth");
                return;
            }
            const user = JSON.parse(raw);
            // Allow any non-student (not 'HV') role to access admin area
            if (user?.maLoaiNguoiDung && user.maLoaiNguoiDung !== "HV") {
                setAuthorized(true);
            } else {
                setAuthorized(false);
                router.replace("/");
            }
        } catch {
            setAuthorized(false);
            router.replace("/auth");
        }
    }, [router]);

    useEffect(() => {
        if (authorized === true) {
            loadCategories();
        }
    }, [authorized]);

    if (authorized !== true) {
        return (
            <main className="container mx-auto py-12 px-4">
                <p>Đang chuyển hướng...</p>
            </main>
        );
    }

    // Pagination logic
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex">
            <main className="container mx-auto py-12 px-4 bg-gray-900">
                <h1 className="text-3xl font-bold mb-4 text-gray-200">Trang quản trị</h1>
                <p className="text-gray-200">Chào mừng bạn đến khu vực quản trị giảng viên.</p>
                <div className="space-y-6">
                    {isAddOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddOpen(false)} />
                            <div className="relative bg-[#0f172a] text-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-50">
                                <h3 className="text-lg font-semibold mb-4">Thêm khóa học mới</h3>
                                <form onSubmit={submitAddCourse} className="space-y-3">
                                    <div>
                                        <Label className="mb-1">Mã khóa học</Label>
                                        <Input value={form.maKhoaHoc} onChange={(e) => setForm(prev => ({ ...prev, maKhoaHoc: e.target.value }))} />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Tên khóa học</Label>
                                        <Input value={form.tenKhoaHoc} onChange={(e) => setForm(prev => ({ ...prev, tenKhoaHoc: e.target.value }))} />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Mô tả</Label>
                                        <textarea className="w-full rounded-md border bg-transparent px-3 py-2 text-sm h-24 resize-none" value={form.moTa} onChange={(e) => setForm(prev => ({ ...prev, moTa: e.target.value }))} />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-2">
                                        <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="text-gray-600">Hủy</Button>
                                        <Button type="submit" disabled={submitting}>{submitting ? 'Đang thêm...' : 'Thêm'}</Button>
                                    </div>
                                    {formError && <p className="text-sm text-red-400 mt-2">{formError}</p>}
                                </form>
                            </div>
                        </div>
                    )}
                    {/* TOP STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard title="Tổng doanh thu" tiền="1.240.000.000 VND" sub="+12.5% tháng này" />
                        <StatCard title="Học viên mới" tiền="580 " sub="+30% hôm qua" />
                        <StatCard title="Khóa học đang hoạt động" tiền="45" />
                    </div>

                    {/* CHART */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Line chart */}
                        <Card className="col-span-2 bg-[#0f172a] text-white">
                            <CardHeader>
                                <CardTitle>Doanh thu theo tháng</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[260px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueData}>
                                        <XAxis dataKey="month" stroke="#888" />
                                        <YAxis stroke="#888" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="tiền" stroke="#f97316" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Bar chart */}
                        <Card className="bg-[#0f172a] text-white">
                            <CardHeader>
                                <CardTitle>Học viên theo danh mục</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[260px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={studentData}>
                                        <XAxis dataKey="name" stroke="#888" />
                                        <YAxis stroke="#888" />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#f97316" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* TABLE */}
                    <Card className="bg-[#0f172a] text-white">
                        <CardHeader className="flex between items-center">
                            <CardTitle>Danh sách khóa học</CardTitle>
                            <div>
                                <Button variant="ghost" className="ml-2 text-black bg-amber-400 hover:bg-amber-500 " onClick={handleAddCourse}>Thêm mới</Button>


                            </div>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-sm">
                                <thead className="text-left text-gray-400">
                                    <tr>
                                        <th>Tên khóa học</th>
                                        <th>Số lượng HV</th>
                                        <th>Giá</th>
                                        <th>Trạng thái</th>
                                        <th>Chỉnh sửa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedCourses.map((course) => (
                                        <tr key={course.biDanh} className="border-t border-white/10">
                                            <td className="py-3">{course.tenKhoaHoc}</td>
                                            <td>{course.soLuongHocVien}</td>
                                            <td>{course.maNhom}</td>
                                            <td>
                                                <Badge className="bg-orange-500">Đang bán</Badge>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="destructive"
                                                    className="ml-2 text-white"
                                                    onClick={() => handleDeleteCourse(course.maKhoaHoc, course.tenKhoaHoc)}
                                                    disabled={deleting === course.maKhoaHoc}
                                                >
                                                    {deleting === course.maKhoaHoc ? "Đang xóa..." : "Xóa"}
                                                </Button>
                                                <Button variant="ghost" className="ml-2 text-black bg-amber-400 hover:bg-amber-500 ">Sửa</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-1 mt-6">
                                    <Button
                                        variant="outline"
                                        className="text-black border-gray-500 hover:bg-gray-700"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        ← Trước
                                    </Button>

                                    <div className="flex gap-1">
                                        {(() => {
                                            const pages = [];
                                            const range = 2; // 2 pages before and after current
                                            const showFirstPage = currentPage > range + 2;
                                            const showLastPage = currentPage < totalPages - range - 1;

                                            // Always show first page
                                            pages.push(1);

                                            // Add ellipsis if needed
                                            if (showFirstPage) {
                                                pages.push('...');
                                            }

                                            // Add pages around current page
                                            const start = Math.max(2, currentPage - range);
                                            const end = Math.min(totalPages - 1, currentPage + range);
                                            for (let i = start; i <= end; i++) {
                                                pages.push(i);
                                            }

                                            // Add ellipsis if needed
                                            if (showLastPage) {
                                                pages.push('...');
                                            }

                                            // Always show last page if not already shown
                                            if (totalPages > 1 && !pages.includes(totalPages)) {
                                                pages.push(totalPages);
                                            }

                                            return pages.map((page, idx) =>
                                                page === '...' ? (
                                                    <span key={`ellipsis-${idx}`} className="text-gray-400 px-2">...</span>
                                                ) : (
                                                    <Button
                                                        key={page}
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        className={currentPage === page ? "bg-amber-500 text-black hover:bg-amber-600 min-w-10 h-10" : "text-black border-gray-500 hover:bg-gray-700 min-w-10 h-10"}
                                                        onClick={() => setCurrentPage(page as number)}
                                                    >
                                                        {page}
                                                    </Button>
                                                )
                                            );
                                        })()}
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="text-black border-gray-500 hover:bg-gray-700"
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Sau →
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
