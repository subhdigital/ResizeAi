import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://resizely.com';

    // Dynamic routes could be fetched from a database here
    const routes = [
        '',
        '/compress',
        '/resize',
        '/crop',
        '/convert',
        '/rotate',
        '/merge',
        '/watermark',
        '/remove-background',
        '/batch',
        '/pricing',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...routes];
}
