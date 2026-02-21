import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compress Image",
    description: "Compress JPG, PNG, SVG, and GIF with the best quality and compression. Reduce file size while optimizing for maximal quality.",
    keywords: ["compress image", "reduce file size", "tinypng alternative", "image optimizer"],
    openGraph: {
        title: "Compress Image | Resize AI",
        description: "Compress your images online for free without losing quality.",
    },
    alternates: {
        canonical: "/compress",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://resizely.com/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Compress Image",
                                "item": "https://resizely.com/compress"
                            }
                        ]
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Compress Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "description": "Compress JPG, PNG, SVG, and GIF with the best quality and compression."
                    }),
                }}
            />
            {children}
        </>
    );
}
