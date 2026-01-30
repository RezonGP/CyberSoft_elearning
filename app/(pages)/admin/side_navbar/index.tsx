"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
    LayoutDashboard,
    Users,
    BookOpen,
    DollarSign,
    Settings,
} from "lucide-react";

const sidebarItems = [
    {
        title: "Tổng quan",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Người dùng",
        href: "/admin/User",
        icon: Users,
    },
    {
        title: "Khóa học",
        href: "/admin/courses",
        icon: BookOpen,
    },
    {
        title: "Doanh thu",
        href: "/admin/revenue",
        icon: DollarSign,
    },
    {
        title: "Cài đặt",
        href: "/admin/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[260px] min-h-screen bg-[#0f172a] text-white border-r border-white/10">
            {/* Menu */}
            <nav className="p-4 space-y-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 text-sm font-medium",
                                    "hover:bg-orange-500/10 hover:text-orange-400",
                                    isActive &&
                                    "bg-orange-500/15 text-orange-400"
                                )}
                            >
                                <Icon size={18} />
                                {item.title}
                            </Button>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
