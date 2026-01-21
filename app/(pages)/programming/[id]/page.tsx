import { KhoaHoc } from '@/app/types';
import { CourseCard } from '@/components/ItemCourse';
import React from 'react';

export default async function Programming(props: any) {
    const { params } = props;
    const { id } = await params;

    const fetchDataById = async (maDanhMuc: string): Promise<KhoaHoc[]> => {
        try {
            // Cách 1: Gọi API lấy khóa học theo danh mục
            const response = await fetch(`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.content)) return data.content;

            throw new Error("Invalid data format");
        } catch (error) {
            console.log(`Failed to fetch by category ${maDanhMuc}, trying fallback...`);
            try {
                // Cách 2: Fallback - Gọi API lấy tất cả khóa học và filter
                const response = await fetch(`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
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
