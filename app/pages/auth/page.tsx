import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
    return (
        <Card className="w-full max-w-sm mx-auto mt-10">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                    <Button variant="link" className="px-0 font-normal">Đăng ký</Button>
                </div>
                <CardDescription>
                    Nhập email của bạn để truy cập hệ thống học tập.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input id="password" type="password" />
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Vào học ngay
                </Button>
            </CardFooter>
        </Card>
    )
}