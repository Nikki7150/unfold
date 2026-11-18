export function redirectSystemPath({ path } : { path: string; initial: boolean }) {
    if (path.includes('dataUrl=')) {
        return '/shareintent';
    }
    return path;
}