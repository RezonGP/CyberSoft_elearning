import { KhoaHoc } from '@/app/types';
import { CourseCard } from '@/components/ItemCourse';
import React from 'react';
import { TOKEN_CYBERSOFT } from '@/app/contants';

export default async function Programming(props: any) {
    const { params } = props;
    const { id } = await params;

    const fetchDataById = async (maDanhMuc: string): Promise<KhoaHoc[]> => {
        try {
            // Cách 1: Gọi API lấy khóa học theo danh mục
            const response = await fetch(`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`, {
                headers: {
                    'TokenCybersoft': TOKEN_CYBERSOFT || ''
                }
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            // Xử lý kết quả trả về
            let courses: KhoaHoc[] = [];
            if (Array.isArray(data)) courses = data;
            else if (data && Array.isArray(data.content)) courses = data.content;

            // Đôi khi API trả về cả những khóa không thuộc danh mục, nên cần filter lại cho chắc
            if (courses.length > 0) {
                return courses.filter(course => course.danhMucKhoaHoc?.maDanhMucKhoahoc === maDanhMuc);
            }

            throw new Error("Invalid data format or empty");
        } catch (error) {
            console.log(`Failed to fetch by category ${maDanhMuc}, trying fallback...`);
            try {
                // Cách 2: Fallback - Gọi API lấy tất cả khóa học và filter
                const response = await fetch(`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`, {
                    headers: {
                        'TokenCybersoft': TOKEN_CYBERSOFT || ''
                    }
                });
                const data = await response.json();

                let allCourses: KhoaHoc[] = [];
                if (Array.isArray(data)) allCourses = data;
                else if (data && Array.isArray(data.content)) allCourses = data.content;

                // Filter theo mã danh mục
                return allCourses.filter(course => course.danhMucKhoaHoc?.maDanhMucKhoahoc === maDanhMuc);
            } catch (err) {
                console.log("Fallback failed", err);
                return [];
            }
        };
    };

    const courseList = await fetchDataById(id);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 capitalize">Khóa học {id}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(courseList) && courseList.length > 0 ? (
                    courseList.map((course) => (
                        <div key={course.maKhoaHoc} className="flex justify-center">
                            <CourseCard data={course} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-xl text-slate-500">Chưa có khóa học nào trong danh mục này.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
