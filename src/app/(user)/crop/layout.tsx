import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crop Image",
    description: "Crop JPG, PNG, or GIF with ease; choose pixels to specify your rectangle or use our visual editor.",
    keywords: ["crop image", "cut image online", "image cropper", "photo cutter"],
    openGraph: {
        title: "Crop Image | Resize AI",
        description: "Crop your photos online for free with visual editor.",
    },
    alternates: {
        canonical: "/crop",
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
                                "name": "Crop Image",
                                "item": "https://resizely.com/crop"
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
                        "name": "Crop Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Crop JPG, PNG, or GIF with ease; choose pixels to specify your rectangle or use our visual editor."
                    }),
                }}
            />
            {children}
        </>
    );
}
