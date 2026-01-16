import { api } from "./api";
import type { TApiResponse } from "../types";

const END_POINT = "QuanLyKhoaHoc"
export const TCategoryService = {
    Category: async () => {
        const res = await api.get<TApiResponse<unknown[]>>(`${END_POINT}/LayDanhMucKhoaHoc`)
        return res.data;
    },
} 