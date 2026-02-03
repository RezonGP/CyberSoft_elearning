import { api } from "./api";
import type { TApiResponse } from "../types";

const END_POINT = "QuanLyNguoiDung"
export const TUserlistService = {
    Userlist: async () => {
        // Fetch full user list (no MaNhom) so we can display all roles (GV, HV, etc.)
        const res = await api.get<TApiResponse<unknown[]>>(`${END_POINT}/LayDanhSachNguoiDung`)
        return res.data
    }
}
export const TUserSearch = {
    UserSearch: async () => {
        const res = await api.get<TApiResponse<unknown[]>>(`${END_POINT}/TimKiemNguoiDung?MaNhom=GP01`)
        return res.data
    }
}

// Fetch detailed info for a single user
export const TUserDetailService = {
    getUserInfo: async (taiKhoan: string) => {
        // Many CyberSoft APIs expect POST with taiKhoan to return account details
        const res = await api.post<TApiResponse<any>>(`${END_POINT}/ThongTinTaiKhoan`, { taiKhoan })
        return res.data
    }
}