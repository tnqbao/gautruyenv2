// lib/helpers.ts

export function getUpdatedAtFromObjectId(objectId: string): Date {
    const hexTimestamp = objectId.slice(0, 8)
    const timestampInSeconds = parseInt(hexTimestamp, 16)
    return new Date(timestampInSeconds * 1000)
}

export function formatDate(date: Date): string {
    return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}
