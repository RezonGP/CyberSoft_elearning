'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthService } from "@/app/server/auth"

const FormLogin = () => {

    const [taiKhoan, setTaiKhoan] = useState("")
    const [matKhau, setMatKhau] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const user = await AuthService.login({ taiKhoan, matKhau })
            if (!user || typeof user !== "object") {
                throw new Error("Phản hồi đăng nhập không hợp lệ")
            }
            if (typeof window !== "undefined") {
                localStorage.setItem("USER_ADMIN", JSON.stringify(user))
                window.dispatchEvent(new Event("auth-changed"))
            }
            const role = (user as any)?.maLoaiNguoiDung
            const dest = role === "GV" ? "/admin" : "/"
            if (typeof window !== "undefined") {
                window.location.assign(dest)
            } else {
                router.replace(dest)
            }
        } catch (err: any) {
            const message =
                err?.response?.data?.content ||
                err?.response?.data?.message ||
                "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
            setError(message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Card className="w-full max-w-sm mx-auto mt-10">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                        <Button variant="link" className="px-0 font-normal">
                            Đăng ký
                        </Button>
                    </div>
                    <CardDescription>
                        Nhập tài khoản và mật khẩu để truy cập hệ thống học tập.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="taiKhoan">Tài khoản</Label>
                        <Input
                            id="taiKhoan"
                            type="text"
                            value={taiKhoan}
                            onChange={(e) => setTaiKhoan(e.target.value)}
                            placeholder="Nhập tài khoản của bạn"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="matKhau">Mật khẩu</Label>
                        <Input
                            id="matKhau"
                            type="password"
                            value={matKhau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng nhập..." : "Vào học ngay"}

                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default FormLogin

