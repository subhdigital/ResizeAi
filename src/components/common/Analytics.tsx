'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Analytics() {
    const pathname = usePathname();
    const GA_MEASUREMENT_ID = 'G-ZX5ZCNX1W3';

    useEffect(() => {
        // Toggle GA tracking based on route
        if (pathname?.startsWith('/admin')) {
            (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
        } else {
            (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
        }
    }, [pathname]);

    // Avoid loading the script entirely if the initial load is an admin route
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
            </Script>
        </>
    );
}
