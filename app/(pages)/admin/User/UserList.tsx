"use client"

import { motion, AnimatePresence } from "framer-motion"
import Pagination from "./Pagination"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TUserlistService, TUserDetailService } from "@/app/server/user"
import type { User as ServerUser } from "@/app/types"
import { Ghost, Search } from "lucide-react"

type ViewUser = {
    id: string
    name: string
    email: string
    phone?: string
    role: "giaovu" | "hocvien"
    status: "active" | "inactive"
    raw: any
}

const PAGE_SIZE = 10

export default function UserList({ role }: { role: "giaovu" | "hocvien" }) {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState<ViewUser[]>([])
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState<string | null>(null)

    // Search state
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');

    // Debounce search input
    useEffect(() => {
        const id = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
        return () => clearTimeout(id);
    }, [searchTerm]);

    // Reset to page 1 when search or role changes
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, role]);

    // Detail modal state
    const [selectedUser, setSelectedUser] = useState<any | null>(null)
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
    const [detailLoading, setDetailLoading] = useState<boolean>(false)
    const [detailError, setDetailError] = useState<string | null>(null)
    const [showSensitive, setShowSensitive] = useState<boolean>(false)

    const fieldLabels: Record<string, string> = {
        taiKhoan: 'Tài khoản',
        matKhau: 'Mật khẩu',
        hoTen: 'Họ tên',
        email: 'Email',
        soDT: 'Số điện thoại',
        maLoaiNguoiDung: 'Loại người dùng',
        maNhom: 'Mã nhóm',
        ngayTao: 'Ngày tạo',
    }

    const isSensitiveField = (k: string) => ['matKhau', 'password', 'matKhauNguoiDung'].includes(k)

    const formatValue = (k: string, v: any) => {
        if (v === null || v === undefined || v === '') return '-'
        const lk = String(k).toLowerCase()
        if (lk.includes('ngay') || lk.includes('ngayt')) {
            const d = new Date(v)
            if (!isNaN(d.getTime())) return d.toLocaleString()
        }
        return String(v)
    }

    const handleShowDetail = async (taiKhoanOrRaw: string | any) => {
        // Nếu là string thì dùng trực tiếp, nếu là object thì lấy .id hoặc .taiKhoan
        const taiKhoan = typeof taiKhoanOrRaw === 'string'
            ? taiKhoanOrRaw
            : (taiKhoanOrRaw?.id || taiKhoanOrRaw?.taiKhoan);

        // Debug log
        console.log("handleShowDetail called with:", taiKhoanOrRaw);
        console.log("Extracted taiKhoan:", taiKhoan);

        if (!taiKhoan) {
            console.error("Invalid taiKhoan:", taiKhoan);
            alert("Lỗi: Không tìm thấy tài khoản người dùng");
            return;
        }

        setIsDetailOpen(true)
        setSelectedUser(null)
        setDetailError(null)
        setDetailLoading(true)
        setShowSensitive(false)
        try {
            const res = await (TUserDetailService as any).getUserInfo(taiKhoan)
            console.log("API response for user detail:", res);
            // Một số API trả về array [user] thay vì object user trực tiếp
            const payload = Array.isArray(res) ? res[0] : (res?.content ?? res);

            // Kiểm tra xem payload có đúng là user mình cần không
            if (payload && payload.taiKhoan && payload.taiKhoan !== taiKhoan) {
                console.warn("API returned different user!", { requested: taiKhoan, received: payload.taiKhoan });
                // Trong trường hợp API trả về thông tin của chính người gọi (admin) thay vì user được request
                // Ta cần kiểm tra lại endpoint hoặc quyền hạn.
            }

            setSelectedUser(payload)
        } catch (err: any) {
            console.error('Failed to fetch user detail:', err)
            const msg = err?.response?.data?.message || err?.response?.data || err?.message || 'Không thể lấy thông tin tài khoản'
            setDetailError(String(msg))
        } finally {
            setDetailLoading(false)
        }
    }

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
                // Map: 'HV' → học viên; mọi mã khác (GV hoặc khác) → Giáo vụ
                role: (u as any).maLoaiNguoiDung === "HV" ? "hocvien" : "giaovu",
                status: "active",
                raw: u as any,
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

    const lower = debouncedSearch.toLowerCase();
    const data = users.filter(u => u.role === role && (!lower || (u.name || '').toLowerCase().includes(lower) || (u.id || '').toLowerCase().includes(lower) || (u.email || '').toLowerCase().includes(lower)))
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
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-300">{data.length} người</div>
                            <div className="relative text-gray-200">
                                <Input placeholder="Tìm theo tên, tài khoản, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-3 w-64 " />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>
                </div>
                {isDetailOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black/50" onClick={() => setIsDetailOpen(false)} />
                        <div className="relative bg-[#0f172a] text-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 z-50">
                            <h3 className="text-lg font-semibold mb-4">Chi tiết tài khoản: {selectedUser?.taiKhoan || selectedUser?.taiKhoan}</h3>

                            {detailLoading ? (
                                <div className="text-center py-8">Đang tải chi tiết...</div>
                            ) : detailError ? (
                                <div className="text-red-400">{detailError}</div>
                            ) : (
                                <>
                                    <div className="mb-3 flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2 text-sm">
                                            <input type="checkbox" className="accent-amber-500" checked={showSensitive} onChange={(e) => setShowSensitive(e.target.checked)} />
                                            <span className="text-sm text-gray-300">Hiển thị trường nhạy cảm</span>
                                        </label>
                                        <div className="text-sm text-gray-300">Tài khoản: <span className="text-gray-100">{selectedUser?.taiKhoan || '-'}</span></div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-auto max-h-[60vh] bg-[#071022] p-4 rounded">
                                        {Object.entries(selectedUser || {}).filter(([k]) => (showSensitive ? true : !isSensitiveField(k))).map(([k, v]) => (
                                            <div key={k} className="flex flex-col">
                                                <span className="text-xs text-gray-400">{fieldLabels[k] || k}</span>
                                                <span className="text-sm text-gray-200 break-words">{formatValue(k, v)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-2 mt-3">
                                <Button size="sm" variant="secondary" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
                            </div>
                        </div>
                    </div>
                )}
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
                                            <td className="py-3 pr-4 text-sm text-gray-300">{user.role === "giaovu" ? "Giáo vụ" : "Học viên"}</td>
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
                                                <Button size="sm" variant="secondary" className="ml-3 text-black" onClick={() => handleShowDetail(user.id)}>Xem chi tiết</Button>
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
