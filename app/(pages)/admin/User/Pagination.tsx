import { Button } from "@/components/ui/button"

type Props = {
    page: number
    total: number
    onChange: (p: number) => void
}

export default function Pagination({ page, total, onChange }: Props) {
    return (
        <div className="flex justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
                <Button
                    key={i}
                    size="sm"
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => onChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}
        </div>
    )
}
