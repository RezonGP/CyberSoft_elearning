import Sidebar from "@/app/(pages)/admin/side_navbar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 bg-gray-700 ">
                {children}
            </main>
        </div>
    )
}
