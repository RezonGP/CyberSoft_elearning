

'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AdminPage = () => {
    const [authorized, setAuthorized] = useState<boolean | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (typeof window === "undefined") return
        try {
            const raw = localStorage.getItem("USER_ADMIN")
            if (!raw) {
                setAuthorized(false)
                router.replace("/auth")
                return
            }
            const user = JSON.parse(raw)
            if (user?.maLoaiNguoiDung === "GV") {
                setAuthorized(true)
            } else {
                setAuthorized(false)
                router.replace("/")
            }
        } catch {
            setAuthorized(false)
            router.replace("/auth")
        }
    }, [router])

    if (authorized !== true) {
        return (
            <main className="container mx-auto py-12 px-4">
                <p>Đang chuyển hướng...</p>
            </main>
        )
    }

    return (
        <main className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Trang quản trị</h1>
            <p>Chào mừng bạn đến khu vực quản trị giảng viên.</p>
        </main>
    )
}

export default AdminPage
