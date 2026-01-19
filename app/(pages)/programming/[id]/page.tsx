import { KhoaHoc } from '@/components/pages/Home';
import { CourseCard } from '@/components/ItemCourse';
import React from 'react'

export default async function Programming(props: any) {
    const { params } = props;
    const { id } = await params;

    const fetchDataById = async (maDanhMuc: string): Promise<KhoaHoc[]> => {
        try {
            const response = await fetch(`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`);
            const data = await response.json();
            // API có thể trả về array trực tiếp hoặc trong field content
            if (Array.isArray(data)) return data;
            if (data && Array.isArray(data.content)) return data.content;
            return [];
        } catch (error) {
            console.log(error);
            return [];
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
