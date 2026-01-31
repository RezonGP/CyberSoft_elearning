"use client"

import { motion, AnimatePresence } from "framer-motion"
import Pagination from "./Pagination"
import { useState } from "react"

type Course = {
    id: number
    code: string
    title: string
    instructor: string
    category: string
    status: string
}

const COURSES: Course[] = [
    { id: 1, code: "CS101", title: "Lập trình React cơ bản", instructor: "Nguyễn Văn A", category: "Frontend", status: "Đang mở" },
    { id: 2, code: "CS102", title: "Next.js cho người mới", instructor: "Trần Thị B", category: "Frontend", status: "Đang mở" },
    { id: 3, code: "CS201", title: "Node.js & API", instructor: "Lê Văn C", category: "Backend", status: "Đóng" },
    { id: 4, code: "CS202", title: "Typescript nâng cao", instructor: "Phạm D", category: "Ngôn ngữ", status: "Đang mở" },
    { id: 5, code: "CS301", title: "Design Patterns trong JS", instructor: "Hoàng E", category: "Kiến trúc", status: "Đóng" },
    { id: 6, code: "CS303", title: "Kiểm thử tự động", instructor: "Nguyễn Văn F", category: "Testing", status: "Đang mở" },
    { id: 7, code: "CS304", title: "Triển khai ứng dụng", instructor: "Trần Thị G", category: "DevOps", status: "Đang mở" },
]

const PAGE_SIZE = 4

export default function CourseList() {
    const [page, setPage] = useState(1)

    const data = COURSES
    const total = Math.ceil(data.length / PAGE_SIZE)

    const current = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto bg-[#0F172A] border border-white/10 rounded-lg p-4">
                <table className="min-w-full table-auto">
                    <thead className="text-sm text-gray-400">
                        <tr>
                            <th className="py-2 pr-4 text-left">Mã</th>
                            <th className="py-2 pr-4 text-left">Tên khóa học</th>
                            <th className="py-2 pr-4 text-left">Giảng viên</th>
                            <th className="py-2 pr-4 text-left">Thể loại</th>
                            <th className="py-2 pr-4 text-left">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode="wait">
                            {current.map(course => (
                                <motion.tr
                                    key={course.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-white/5"
                                >
                                    <td className="py-3 pr-4">{course.code}</td>
                                    <td className="py-3 pr-4">{course.title}</td>
                                    <td className="py-3 pr-4">{course.instructor}</td>
                                    <td className="py-3 pr-4">{course.category}</td>
                                    <td className="py-3 pr-4 text-sm text-gray-400">{course.status}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            <Pagination page={page} total={total} onChange={setPage} />
        </div>
    )
}
