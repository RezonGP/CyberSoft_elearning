"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    role: "giaovu" | "giaovien"
    setRole: (v: "giaovu" | "giaovien") => void
}

export default function UserTabs({ role, setRole }: Props) {
    return (
        <Tabs value={role} onValueChange={v => setRole(v as any)}>
            <TabsList className="bg-[#d45312]">
                <TabsTrigger value="giaovu">Giáo vụ</TabsTrigger>
                <TabsTrigger value="giaovien">Giáo viên</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
