"use client"

import { api } from "./api";
import type { TApiResponse } from "../types";

const END_POINT = "QuanLyKhoaHoc"
export const ServiceCourse = {
    listDanhSachKhoaHoc: async () => {
        const res = await api.get<TApiResponse<unknown[]>>(`${END_POINT}/LayDanhSachKhoaHoc`)
        return res.data;
    },
    dangKyKhoaHoc: async (payload: { maKhoaHoc: string; taiKhoan: string }) => {
        const res = await api.post<TApiResponse<string>>(`${END_POINT}/DangKyKhoaHoc`, payload)
        return res.data;
    },
    xoaKhoaHoc: async (maKhoaHoc: string) => {
        // Sử dụng params để axios tự động encode và thử dùng MaKhoaHoc (PascalCase)
        const res = await api.delete<TApiResponse<string>>(`${END_POINT}/XoaKhoaHoc`, {
            params: { MaKhoaHoc: maKhoaHoc }
        })
        return res.data;
    },
}

