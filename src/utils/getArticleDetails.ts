export function cleanUrl(url: string): string {
    return url.split('?')[0].split('#')[0];
}

function decodeEntities(text: string) : string {
    return text
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
}

function getMetaContent(html: string, property: string): string | null {
    const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
    for (const tag of tags) {
        const matches = new RegExp(`(?:property|name)=["']${property}["']`, 'i').test(tag);
        if (!matches) continue;
        const content = tag.match(/content=(["'])([\s\S]*?)\1/i);
        if (content) return content[2];
    }
    return null;
}

function titleFromSlug(url: string): string | null {
    const slug = cleanUrl(url).split('/').filter(Boolean).pop();
    if (!slug) return null;
    const words = slug.replace(/-/g, ' ');
    return words.charAt(0).toUpperCase() + words.slice(1);
}

function isUsableTitle(title: string): boolean {
    return title.length > 0 && !/^https?:\/\//i.test(title);
}

function findRedirectTarget(html: string): string | null {
    const meta = html.match(/<meta[^>]+http-equiv=["']refresh["'][^>]*content=["']\d+;\s*URL=([^"']+)["']/i);
    if (meta) return meta[1];
    const js = html.match(/location\.replace\(["']([^"']+)["']\)/i);
    return js ? js[1] : null;
}

export async function getArticleDetails(url: string, hopsLeft = 1): Promise<{title: string | null; url: string; imageUrl: string | null; }> {
    const clean = cleanUrl(url);
    try {
        const response = await fetch(clean, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            },
        });
        if (response.ok) {
            const html = await response.text();
            const finalUrl = cleanUrl(response.url || clean);
            const redirect = findRedirectTarget(html);
            if (redirect && hopsLeft > 0) {
                return await getArticleDetails(decodeEntities(redirect), hopsLeft - 1);
            }
            const ogImage = getMetaContent(html, 'og:image');
            const imageUrl = ogImage ? decodeEntities(ogImage) : null;
            const ogTitle = getMetaContent(html, 'og:title');
            if (ogTitle && isUsableTitle(decodeEntities(ogTitle))) return { title: decodeEntities(ogTitle), url: finalUrl, imageUrl };
            const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            if (titleTag?.[1] && isUsableTitle(decodeEntities(titleTag[1]))) return { title: decodeEntities(titleTag[1]), url: finalUrl, imageUrl };
        }
    } catch {
        // network error: fall through to the slug fallback
    }

    return { title: titleFromSlug(clean), url: clean, imageUrl: null };
}