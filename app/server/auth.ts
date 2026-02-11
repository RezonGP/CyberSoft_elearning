import { api } from "./api"
import type { TApiResponse, User } from "../types"

const END_POINT = "QuanLyNguoiDung"

export const AuthService = {
    login: async (payload: { taiKhoan: string; matKhau: string }) => {
        const res = await api.post<TApiResponse<User>>(`${END_POINT}/DangNhap`, payload)
        const raw: any = res?.data
        const content = raw?.content ?? raw
        if (!content || typeof content !== "object") {
            throw new Error("Invalid login response")
        }
        return content
    },
    register: async (payload: any) => {
        const body = {
            taiKhoan: payload.taiKhoan,
            matKhau: payload.matKhau,
            hoTen: payload.hoTen,
            soDT: payload.soDT,
            maNhom: "GP01", // Mã nhóm mặc định
            email: payload.email
        }
        const res = await api.post<TApiResponse<any>>(`${END_POINT}/DangKy`, body)
        return res.data
    }
}

