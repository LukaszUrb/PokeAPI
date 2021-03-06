export function asArray<T>(v: T | T[]): T[] {
    return Array.isArray(v) ? v : [v];
}

export function toStringArray(data: string, delimiter: string): string[] {
    return data.split(delimiter);
}

export function toNumber(data: string,): string | number {
    return isNaN(Number(data)) ? data : Number(data);
}

export function randomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalize(data: string,): string {
    return data.charAt(0).toUpperCase() + data.slice(1);
}
