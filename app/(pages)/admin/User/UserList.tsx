"use client"

import { motion, AnimatePresence } from "framer-motion"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TUserlistService } from "@/app/server/user"
import type { User as ServerUser } from "@/app/types"

type ViewUser = {
    id: string
    name: string
    email: string
    phone?: string
    role: "giaovu" | "giaovien"
    status: "active" | "inactive"
}

const PAGE_SIZE = 4

export default function UserList({ role }: { role: "giaovu" | "giaovien" }) {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState<ViewUser[]>([])
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)

    const loadUserlist = async () => {
        try {
            setLoading(true)
            const data = await TUserlistService.Userlist()
            let list: ServerUser[] = []

            // handle API returning array or { content }
            if (Array.isArray(data)) {
                list = data as unknown as ServerUser[]
            } else if ((data as any)?.content) {
                list = (data as any).content as ServerUser[]
            }

            const mapped: ViewUser[] = list.map(u => ({
                id: String((u as any).taiKhoan),
                name: (u as any).hoTen || "",
                email: (u as any).email || "",
                phone: (u as any).soDT || (u as any).soDt || "",
                role: (u as any).maLoaiNguoiDung === "GV" ? "giaovien" : "giaovu",
                status: "active",
            }))

            setUsers(mapped)
        } catch (error) {
            console.error("Failed to load user list:", error)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUserlist()
    }, [])

    const data = users.filter(u => u.role === role)
    const total = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
    const current = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    function handleDelete(id: string, name: string) {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${name}"?`)
        if (!confirmDelete) return

        setDeleting(id)
        // Simulation until API delete is implemented
        setTimeout(() => {
            setUsers(prev => prev.filter(u => u.id !== id))
            setDeleting(null)
            const newTotal = Math.ceil((data.length - 1) / PAGE_SIZE) || 1
            if (page > newTotal) setPage(newTotal)
            alert("Xóa người dùng thành công")
        }, 350)
    }

    function handleEdit(id: string) {
        const user = users.find(u => u.id === id)
        if (!user) return
        const newName = window.prompt("Sửa tên", user.name)
        const newEmail = window.prompt("Sửa email", user.email)
        if (newName == null || newEmail == null) return
        setUsers(prev => prev.map(u => (u.id === id ? { ...u, name: newName, email: newEmail } : u)))
        alert("Cập nhật người dùng thành công")
    }

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto bg-[#0F172A] border border-white/10 rounded-lg">
                <div className="px-4 py-3 border-b border-white/5 bg-[#0B1320] rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-200">Danh sách người dùng</h3>
                        <div className="text-sm text-gray-400">{users.length} người</div>
                    </div>
                </div>
                <div className="p-4">
                    {loading ? (
                        <div className="text-center text-gray-400 py-8">Đang tải danh sách người dùng...</div>
                    ) : current.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">Không có người dùng</div>
                    ) : (
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="text-left text-gray-300 text-sm uppercase tracking-wider">
                                    <th className="py-3 pr-4">Tên</th>
                                    <th className="py-3 pr-4">Email</th>
                                    <th className="py-3 pr-4">Loại</th>
                                    <th className="py-3 pr-4">Trạng thái</th>
                                    <th className="py-3 pr-4">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="wait">
                                    {current.map(user => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.18 }}
                                            className="border-t border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="py-3 pr-4 text-gray-100">{user.name}</td>
                                            <td className="py-3 pr-4 text-sm text-gray-300">{user.email}</td>
                                            <td className="py-3 pr-4 text-sm text-gray-300">{user.role === "giaovu" ? "Giáo vụ" : "Giáo viên"}</td>
                                            <td className="py-3 pr-4">
                                                {user.status === "active" ? (
                                                    <Badge className="bg-green-600">Hoạt động</Badge>
                                                ) : (
                                                    <Badge className="bg-gray-600">Không hoạt động</Badge>
                                                )}
                                            </td>
                                            <td className="py-3 pr-4">
                                                <Button size="sm" variant="ghost" className="ml-2 text-black bg-amber-400 hover:bg-amber-500" onClick={() => handleEdit(user.id)}>Sửa</Button>
                                                <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleDelete(user.id, user.name)} disabled={deleting === user.id}>
                                                    {deleting === user.id ? "Đang xóa..." : "Xóa"}
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Pagination page={page} total={total} onChange={setPage} />
        </div>
    )
}
