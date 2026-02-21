import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Remove Background",
    description: "Remove background from images for free with AI automatically. Get a transparent PNG easily.",
    keywords: ["remove background", "bg remover", "transparent background", "background eraser"],
    openGraph: {
        title: "Remove Background | Resize AI",
        description: "Remove background from images for free with AI automatically.",
    },
    alternates: {
        canonical: "/remove-background",
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
                                "name": "Remove Background",
                                "item": "https://resizely.com/remove-background"
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
                        "name": "Remove Background Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
                        "description": "Remove background from images for free with AI automatically."
                    }),
                }}
            />
            {children}
        </>
    );
}
