import Image from "next/image";



export default function TrustedLogos() {
    const logos = [
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/3E0eIh3tWHNWADiHNBmW4j/3444d1a4d029f283aa7d10ccf982421e/volkswagen_logo.svg", alt: "Volkswagen" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/2pNyDO0KV1eHXk51HtaAAz/090fac96127d62e784df31e93735f76a/samsung_logo.svg", alt: "Samsung" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/3YzfvEjCAUi3bKHLW2h1h8/ec478fa1ed75f6090a7ecc9a083d80af/cisco_logo.svg", alt: "Cisco" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/2pNyDO0KV1eHXk51HtaAAz/090fac96127d62e784df31e93735f76a/samsung_logo.svg", alt: "Samsung" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/3YzfvEjCAUi3bKHLW2h1h8/ec478fa1ed75f6090a7ecc9a083d80af/cisco_logo.svg", alt: "Cisco" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/1GoAicYDYxxRPGnCpg93gi/a8b6190cc1a24e21d6226200ca488eb8/hewlett_packard_enterprise_logo.svg", alt: "Vimeo" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/1GoAicYDYxxRPGnCpg93gi/a8b6190cc1a24e21d6226200ca488eb8/hewlett_packard_enterprise_logo.svg", alt: "HP" },
        { src: "https://cms-images.udemycdn.com/96883mtakkm8/1GoAicYDYxxRPGnCpg93gi/a8b6190cc1a24e21d6226200ca488eb8/hewlett_packard_enterprise_logo.svg", alt: "Citi" },

    ];
    return (
        <section className="bg-gray-50 ">
            <section className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-600 mb-8">
                        Được hơn <b>17.000 công ty</b> và hàng triệu học viên tin dùng
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-10">
                        {logos.map((logo, i) => (
                            <Image
                                key={i}
                                src={logo.src}
                                alt={logo.alt}
                                width={90}
                                height={40}
                                className="opacity-70 grayscale hover:opacity-100 transition"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}
