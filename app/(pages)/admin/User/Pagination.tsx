import { Button } from "@/components/ui/button"

type Props = {
    page: number
    total: number
    onChange: (p: number) => void
}

export default function Pagination({ page, total, onChange }: Props) {
    const range = 2
    const pages: (number | "...")[] = []

    if (total <= 1) return null

    pages.push(1)

    const showFirstEllipsis = page > range + 2
    const showLastEllipsis = page < total - range - 1

    if (showFirstEllipsis) pages.push("...")

    const start = Math.max(2, page - range)
    const end = Math.min(total - 1, page + range)
    for (let i = start; i <= end; i++) pages.push(i)

    if (showLastEllipsis) pages.push("...")

    if (total > 1 && !pages.includes(total)) pages.push(total)

    return (
        <div className="flex items-center justify-center gap-2 mt-2">
            <Button size="sm" variant="outline" className="min-w-[36px] h-8" onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>←</Button>
            <div className="flex gap-2 items-center">
                {pages.map((p, idx) =>
                    p === "..." ? (
                        <span key={`ellipsis-${idx}`} className="text-gray-400 px-2">...</span>
                    ) : (
                        <Button
                            key={p}
                            size="sm"
                            variant={page === p ? "default" : "outline"}
                            className={page === p ? "bg-amber-500 text-black min-w-[36px] h-8" : "min-w-[36px] h-8"}
                            onClick={() => onChange(p as number)}
                        >
                            {p}
                        </Button>
                    )
                )}
            </div>
            <Button size="sm" variant="outline" className="min-w-[36px] h-8" onClick={() => onChange(Math.min(total, page + 1))} disabled={page === total}>→</Button>
        </div>
    )
}
