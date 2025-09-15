//! File: src/lib/api.ts

const BASE_API_URL = "https://dev.to/api";

export async function fetchTags() {
  const response = await fetch(`${BASE_API_URL}/tags?per_page=84`)
  if (!response.ok) {
    throw new Error("Failed to fetch tags")
  }

  return response.json()
}
