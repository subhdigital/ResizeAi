export const getFingerprint = async (): Promise<string> => {
    if (typeof window === 'undefined') return 'server-side';

    // Basic fingerprint implementation
    const components = [
        navigator.userAgent,
        navigator.language,
        window.screen.colorDepth,
        window.screen.width + 'x' + window.screen.height,
        new Date().getTimezoneOffset(),
        // Check for specific browser features
        'ontouchstart' in window,
        navigator.hardwareConcurrency,
        (navigator as any).deviceMemory,
    ];

    // Canvas fingerprinting
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText("resizely_fp", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("resizely_fp", 4, 17);
            components.push(canvas.toDataURL());
        }
    } catch (e) {
        // Ignore canvas errors
    }

    // Hash the components string
    const msgBuffer = new TextEncoder().encode(components.join('###'));
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
