import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Batch Image Processor",
    description: "Compress and optimize multiple images at once and download them in a single ZIP file.",
    keywords: ["batch image processing", "bulk resize", "bulk compress", "batch optimize"],
    openGraph: {
        title: "Batch Image Processor | Resize AI",
        description: "Compress and optimize multiple images at once for free.",
    },
    alternates: {
        canonical: "/batch",
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
                                "name": "Batch Process",
                                "item": "https://resizely.com/batch"
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
                        "name": "Batch Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Compress and optimize multiple images at once."
                    }),
                }}
            />
            {children}
        </>
    );
}
