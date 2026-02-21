import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Convert Image Format",
    description: "Convert JPG, PNG, WebP, AVIF and GIF images in bulk with ease.",
    keywords: ["convert image", "png to jpg", "jpg to webp", "image format converter"],
    openGraph: {
        title: "Convert Image Format | Resize AI",
        description: "Convert image formats online for free.",
    },
    alternates: {
        canonical: "/convert",
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
                                "name": "Convert Image",
                                "item": "https://resizely.com/convert"
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
                        "name": "Convert Image Tool",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "All",
                        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                        "description": "Convert JPG, PNG, WebP, AVIF and GIF images in bulk with ease."
                    }),
                }}
            />
            {children}
        </>
    );
}
