import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Quote, ArrowRight } from "lucide-react";
import Link from 'next/link';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    company?: string;
    image?: string;
    linkText: string;
    linkUrl: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "CyberSoft được đánh giá là chương trình cấp chứng chỉ hoặc khóa học online phổ biến nhất về học cách viết code theo Khảo sát nhà phát triển Stack Overflow năm 2023.",
        author: "Stack Overflow",
        role: "Thu thập được 37.076 phản hồi",
        linkText: "Xem các khóa học Phát triển web",
        linkUrl: "/programming/BackEnd"
    },
    {
        id: 2,
        quote: "CyberSoft thực sự là yếu tố mang tính đột phá và là nền tảng dạy học tuyệt vời dành cho tôi khi chúng tôi đưa Dimensional vào cuộc sống.",
        author: "Alvin Lim",
        role: "Đồng sáng lập kỹ thuật, CTO tại Dimensional",
        image: "https://i.pravatar.cc/150?u=alvin",
        linkText: "Xem khóa học iOS & Swift này",
        linkUrl: "/programming/DiDong"
    },
    {
        id: 3,
        quote: "CyberSoft cho bạn khả năng kiên trì. Tôi đã học được chính xác những gì tôi cần biết trong thực tiễn. Những kiến thức và kỹ năng này đã giúp tôi tự phát triển bản thân và thăng tiến sự nghiệp.",
        author: "William A. Wachlin",
        role: "Chuyên viên quản lý đối tác tại Amazon Web Services",
        image: "https://i.pravatar.cc/150?u=william",
        linkText: "Xem khóa học AWS này",
        linkUrl: "/programming/BackEnd"
    },
    {
        id: 4,
        quote: "Với CyberSoft Business, các nhân viên đã có thể kết hợp các kỹ năng mềm về công nghệ và tư vấn lại với nhau... để thúc đẩy sự nghiệp của họ phát triển.",
        author: "Ian Stevens",
        role: "Trưởng phòng Phát triển Năng lực, Bắc Mỹ tại Publicis Sapient",
        image: "https://i.pravatar.cc/150?u=ian",
        linkText: "Đọc toàn bộ câu chuyện",
        linkUrl: "/"
    }
];

const Testimonials = () => {
    return (
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 max-w-3xl">
                    Tham gia cùng những người khác để thay đổi cuộc sống thông qua học tập
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((item) => (
                        <Card key={item.id} className="bg-white border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full">
                            <CardHeader className="pb-2 pt-6">
                                <Quote className="h-8 w-8 text-slate-900 mb-2 fill-current" />
                            </CardHeader>
                            
                            <CardContent className="flex-grow">
                                <p className="text-slate-700 mb-6 leading-relaxed">
                                    {item.quote}
                                </p>
                                
                                <div className="flex items-center gap-3 mt-auto">
                                    {item.image ? (
                                        <img 
                                            src={item.image} 
                                            alt={item.author} 
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                            {item.author.charAt(0)}
                                        </div>
                                    )}
                                    
                                    <div>
                                        <p className="font-bold text-sm text-slate-900">{item.author}</p>
                                        <p className="text-xs text-slate-500 line-clamp-2">{item.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                            
                            <CardFooter className="pt-2 pb-6 border-t border-slate-100 mt-4">
                                <Link 
                                    href={item.linkUrl} 
                                    className="text-purple-700 font-bold text-sm hover:text-purple-900 flex items-center group"
                                >
                                    {item.linkText}
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
