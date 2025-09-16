//! File: src/lib/api.ts

const BASE_API_URL = "https://dev.to/api";

export async function fetchBlogPosts(page = 1, tag?: string, query?: string) {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: "12",
  });

  if (tag) params.append("tag", tag);
  if (query) params.append("query", query);

  const response = await fetch(`${BASE_API_URL}/articles?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return response.json();
}

export async function fetchTags() {
  const response = await fetch(`${BASE_API_URL}/tags?per_page=84`);
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }

  return response.json();
}
