"use client"

import { motion, AnimatePresence } from "framer-motion"
import Pagination from "./Pagination"
import { useState } from "react"

const USERS = [
    { id: 1, name: "Nguyễn Văn A", role: "giaovu" },
    { id: 2, name: "Trần Thị B", role: "giaovien" },
    { id: 3, name: "Lê Văn C", role: "giaovu" },
    { id: 4, name: "Phạm D", role: "giaovien" },
    { id: 5, name: "Hoàng E", role: "giaovien" },
]

const PAGE_SIZE = 3

export default function UserList({ role }: { role: string }) {
    const [page, setPage] = useState(1)

    const data = USERS.filter(u => u.role === role)
    const total = Math.ceil(data.length / PAGE_SIZE)

    const current = data.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    )

    return (
        <div className="space-y-4">
            <AnimatePresence mode="wait">
                {current.map(user => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#0F172A] border border-white/10 rounded-lg p-4 flex justify-between"
                    >
                        <span>{user.name}</span>
                        <span className="text-sm text-gray-400">
                            {user.role === "giaovu" ? "Giáo vụ" : "Giáo viên"}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>

            <Pagination
                page={page}
                total={total}
                onChange={setPage}
            />
        </div>
    )
}
