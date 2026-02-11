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
        const res = await api.delete<TApiResponse<string>>(`${END_POINT}/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
        return res.data;
    },
    themKhoaHoc: async (payload: any) => {
        // Chuẩn hóa payload theo PascalCase (nhiều API của CyberSoft kỳ vọng tên trường PascalCase)
        const body = {
            MaKhoaHoc: payload.MaKhoaHoc || payload.maKhoaHoc,
            BiDanh: payload.BiDanh || payload.biDanh || (payload.maKhoaHoc || '').toString(),
            TenKhoaHoc: payload.TenKhoaHoc || payload.tenKhoaHoc,
            MoTa: payload.MoTa || payload.moTa || '',
            LuotXem: payload.LuotXem ?? payload.luotXem ?? 0,
            HinhAnh: payload.HinhAnh || payload.hinhAnh || '',
            MaNhom: payload.MaNhom || payload.maNhom || 'GP01',
            NgayTao: payload.NgayTao || payload.ngayTao || new Date().toISOString(),
        };
        const res = await api.post<TApiResponse<any>>(`${END_POINT}/ThemKhoaHoc`, body);
        return res.data;
    },
    layThongTinKhoaHoc: async (maKhoaHoc: string) => {
        const res = await api.get<TApiResponse<any>>(`${END_POINT}/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
        return res.data;
    }
}

