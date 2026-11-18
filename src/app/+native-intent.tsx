export function redirectSystemPath({ path } : { path: string; initial: boolean }) {
    console.log("NATIVE INTENT:", path);
    if (path.includes('dataUrl=')) {
        return '/shareintent';
    }
    return path;
}