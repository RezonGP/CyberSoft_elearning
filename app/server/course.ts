import { api } from "./api";
import type { TApiResponse } from "../types";

const END_POINT = "QuanLyKhoaHoc"
export const ServiceCourse = {
    listDanhSachKhoaHoc: async () => {
        const res = await api.get<TApiResponse<unknown[]>>(`${END_POINT}/LayDanhSachKhoaHoc`)
        return res.data;
    },
} 