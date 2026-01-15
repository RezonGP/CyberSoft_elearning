import { api } from "./api";
import type { TApiResponse } from "../types";

type Category = { maDanhMuc: string; tenDanhMuc: string };
const END_POINT = "QuanLyKhoaHoc"
export const TCategoryService = {
    Category: async () => {
        const res = await api.get<TApiResponse<Category[]>>(`${END_POINT}/LayDanhMucKhoaHoc`)
        return res.data;
    },
} 