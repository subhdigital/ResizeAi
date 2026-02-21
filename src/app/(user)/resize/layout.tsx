import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resize Image",
    description: "Define your dimensions, by pixels or percentage, and resize your JPG, PNG, SVG and GIF images.",
    keywords: ["resize image", "change image dimensions", "image resizer", "scale image"],
    openGraph: {
        title: "Resize Image | Resize AI",
        description: "Resize your images online for free easily.",
    },
    alternates: {
        canonical: "/resize",
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
                                "name": "Resize Image",
                                "item": "https://resizely.com/resize"
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
                        "name": "Resize Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Define your dimensions, by pixels or percentage, and resize your JPG, PNG, SVG and GIF images."
                    }),
                }}
            />
            {children}
        </>
    );
}
