import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rotate Image",
    description: "Rotate your photos and images. Rotate only horizontal or vertical images at the same time!",
    keywords: ["rotate image", "flip image", "rotate picture online", "image rotator"],
    openGraph: {
        title: "Rotate Image | Resize AI",
        description: "Rotate your images online for free easily.",
    },
    alternates: {
        canonical: "/rotate",
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
                                "name": "Rotate Image",
                                "item": "https://resizely.com/rotate"
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
                        "name": "Rotate Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Rotate your photos and images."
                    }),
                }}
            />
            {children}
        </>
    );
}
