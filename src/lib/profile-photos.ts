export function parseProfilePhotos(rawUrl: string | null | undefined): string[] {
  if (!rawUrl || !rawUrl.trim()) {
    return ["/haikal-al-ghifari.jpg"];
  }

  // 1. Try parsing JSON array
  try {
    const parsed = JSON.parse(rawUrl);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const cleaned = parsed
        .map((p) => (typeof p === "string" ? p.trim() : ""))
        .filter((p) => p.length > 0);
      if (cleaned.length > 0) return cleaned;
    }
  } catch {
    // Not valid JSON, continue to fallback checks
  }

  // 2. Try comma-separated list
  if (rawUrl.includes(",")) {
    const list = rawUrl
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    if (list.length > 0) return list;
  }

  // 3. Single URL fallback
  return [rawUrl.trim()];
}

export function serializeProfilePhotos(photos: string[]): string {
  const cleaned = photos.map((p) => p.trim()).filter((p) => p.length > 0);
  if (cleaned.length === 0) {
    return "/haikal-al-ghifari.jpg";
  }
  return JSON.stringify(cleaned);
}
