const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

const calculateLuminance = (r: number, g: number, b: number): number => {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getTextColorForBackground = (bgColor: string): boolean => {
    const [r, g, b] = hexToRgb(bgColor);
    const luminance = calculateLuminance(r, g, b);
    return luminance > 150 ? true : false;
};