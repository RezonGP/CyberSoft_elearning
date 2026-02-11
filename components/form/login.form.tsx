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
import { CloudMoon } from "lucide-react"

const FormLogin = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    // Login State
    const [taiKhoan, setTaiKhoan] = useState("")
    const [matKhau, setMatKhau] = useState("")

    // Register State
    const [regData, setRegData] = useState({
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        email: "",
        soDT: ""
    })

    const handleLogin = async (e: React.FormEvent) => {
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
            const dest = role !== "HV" ? "/admin" : "/"
            if (typeof window !== "undefined") {
                window.location.assign(dest)
            } else {
                router.replace(dest)
            }
        } catch (err: any) {
            const message = err?.response?.data?.content || err?.response?.data?.message || "Đăng nhập thất bại."
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await AuthService.register(regData)
            alert("Đăng ký thành công! Vui lòng đăng nhập.")
            setIsLogin(true)
        } catch (err: any) {
            const message = err?.response?.data?.content || err?.response?.data?.message || "Đăng ký thất bại."
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://cybersoft.edu.vn/wp-content/uploads/2022/12/173498625_1748188092035509_2804459782783227284_n-1.png')] opacity-10 bg-cover bg-center pointer-events-none" />
            
            <Card className="w-full max-w-md bg-[#1e293b]/80 backdrop-blur-md border-gray-700 shadow-2xl relative z-10 text-gray-200">
                <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                        <CloudMoon className="h-12 w-12 text-white" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white tracking-tight">
                        Dream-Cyber
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                        {isLogin ? "Chào mừng bạn quay trở lại!" : "Tạo tài khoản để bắt đầu học tập"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {isLogin ? (
                        // LOGIN FORM
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="taiKhoan" className="text-gray-300">Tài khoản</Label>
                                <Input
                                    id="taiKhoan"
                                    value={taiKhoan}
                                    onChange={(e) => setTaiKhoan(e.target.value)}
                                    placeholder="Nhập tài khoản"
                                    className="bg-[#0f172a] border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="matKhau" className="text-gray-300">Mật khẩu</Label>
                                <Input
                                    id="matKhau"
                                    type="password"
                                    value={matKhau}
                                    onChange={(e) => setMatKhau(e.target.value)}
                                    className="bg-[#0f172a] border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded border border-red-900/50">{error}</p>}
                            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-11" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Đăng nhập"}
                            </Button>
                        </form>
                    ) : (
                        // REGISTER FORM
                        <form onSubmit={handleRegister} className="space-y-3">
                            <div className="space-y-1">
                                <Label className="text-gray-300">Tài khoản</Label>
                                <Input
                                    value={regData.taiKhoan}
                                    onChange={(e) => setRegData({...regData, taiKhoan: e.target.value})}
                                    className="bg-[#0f172a] border-gray-600 text-white focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-300">Mật khẩu</Label>
                                <Input
                                    type="password"
                                    value={regData.matKhau}
                                    onChange={(e) => setRegData({...regData, matKhau: e.target.value})}
                                    className="bg-[#0f172a] border-gray-600 text-white focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-300">Họ tên</Label>
                                <Input
                                    value={regData.hoTen}
                                    onChange={(e) => setRegData({...regData, hoTen: e.target.value})}
                                    className="bg-[#0f172a] border-gray-600 text-white focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-300">Email</Label>
                                <Input
                                    type="email"
                                    value={regData.email}
                                    onChange={(e) => setRegData({...regData, email: e.target.value})}
                                    className="bg-[#0f172a] border-gray-600 text-white focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-300">Số điện thoại</Label>
                                <Input
                                    value={regData.soDT}
                                    onChange={(e) => setRegData({...regData, soDT: e.target.value})}
                                    className="bg-[#0f172a] border-gray-600 text-white focus:border-purple-500"
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded border border-red-900/50">{error}</p>}
                            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-11 mt-2" disabled={loading}>
                                {loading ? "Đang xử lý..." : "Đăng ký ngay"}
                            </Button>
                        </form>
                    )}
                </CardContent>

                <CardFooter className="justify-center border-t border-gray-700 pt-6">
                    <p className="text-sm text-gray-400">
                        {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                        <button 
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setError(null)
                            }} 
                            className="text-purple-400 hover:text-purple-300 font-bold hover:underline transition-colors"
                        >
                            {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default FormLogin

