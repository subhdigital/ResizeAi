'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Analytics() {
    const pathname = usePathname();

    // Disable analytics for admin routes
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-ZX5ZCNX1W3"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZX5ZCNX1W3');
        `}
            </Script>
        </>
    );
}
