import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Merge Image",
    description: "Combine multiple images into one horizontally or vertically for free.",
    keywords: ["merge image", "combine images", "join photos", "image stitcher"],
    openGraph: {
        title: "Merge Image | Resize AI",
        description: "Combine multiple images into one online for free easily.",
    },
    alternates: {
        canonical: "/merge",
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
                                "name": "Merge Image",
                                "item": "https://resizely.com/merge"
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
                        "name": "Merge Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Combine multiple images into one horizontally or vertically."
                    }),
                }}
            />
            {children}
        </>
    );
}
