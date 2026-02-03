"use client"

import { useState } from "react"
import UserTabs from "./UserTabs"
import UserList from "./UserList"

export default function UserPage() {
    const [role, setRole] = useState<"giaovu" | "hocvien">("giaovu")

    return (
        <div className="space-y-6">
            <UserTabs role={role} setRole={setRole} />
            <UserList role={role} />
        </div>
    )
}
