"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    role: "giaovu" | "hocvien"
    setRole: (v: "giaovu" | "hocvien") => void
}

export default function UserTabs({ role, setRole }: Props) {
    return (
        <Tabs value={role} onValueChange={v => setRole(v as any)} className="m-3">
            <TabsList className="bg-[#d45312]">
                <TabsTrigger value="giaovu">Giáo vụ</TabsTrigger>
                <TabsTrigger value="hocvien">Học viên</TabsTrigger>
            </TabsList>
        </Tabs>
    )
} 
