import { api } from "./api";
import type { TApiResponse } from "../types";

const END_POINT = "QuanLyNguoiDung"
export const TUserlistService = {
    Userlist: async () => {
        const res = await api.get<TApiResponse<unknown[]>>(`${END_POINT}/LayDanhSachNguoiDung?MaNhom=GP01`)
        return res.data
    }
}