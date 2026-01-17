import { api } from "./api"
import type { TApiResponse, User } from "../types"

const END_POINT = "QuanLyNguoiDung"

export const AuthService = {
    login: async (payload: { taiKhoan: string; matKhau: string }) => {
        const res = await api.post<TApiResponse<User>>(`${END_POINT}/DangNhap`, payload)
        return res.data.content
    },
}

