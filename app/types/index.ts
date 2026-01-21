import { AxiosError } from "axios";



export type InitState<T> = {
    loading: boolean;
    data: T | null;
    error: AxiosError<unknown> | null;
}

export type TApiResponse<T> = {
    statusCode: number;
    message: string;
    content: T;
}

export interface User {
    taiKhoan: string,
    matKhau: string,
    hoTen: string,
    soDT: string,
    maLoaiNguoiDung: string,
    maNhom: string,
    email: string
}
export interface AuthState {
    data: User | null;
    loading: boolean;
    error: string | null
}

export type KhoaHoc = {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number;
    hinhAnh: string;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien: number;
    nguoiTao: {
        taiKhoan: string;
        hoTen: string;
        maLoaiNguoiDung: string;
        tenLoaiNguoiDung: string;
    };
    danhMucKhoaHoc: {
        maDanhMucKhoahoc: string;
        tenDanhMucKhoaHoc: string;
    };
}

const initalState: AuthState = {
    data: (() => {
        const storedUser = localStorage.getItem("USER_ADMIN");
        return storedUser ? JSON.parse(storedUser) : null;
    })(),
    loading: false,
    error: null,
}