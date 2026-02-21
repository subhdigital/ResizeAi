import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Watermark",
    description: "Stamp an image or text over your images in seconds. Choose typography, transparency and position.",
    keywords: ["add watermark", "watermark image", "protect image", "add logo to photo"],
    openGraph: {
        title: "Add Watermark | Resize AI",
        description: "Stamp an image or text over your images online for free easily.",
    },
    alternates: {
        canonical: "/watermark",
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
                                "name": "Add Watermark",
                                "item": "https://resizely.com/watermark"
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
                        "name": "Add Watermark Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Stamp an image or text over your images in seconds."
                    }),
                }}
            />
            {children}
        </>
    );
}
