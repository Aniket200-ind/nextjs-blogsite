//! File: src/components/BlogGrid.tsx

"use client";

import { useState, useEffect } from "react";

import { BlogCard } from "@/components/BlogCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { fetchBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/types";

interface BlogGridProps {
  searchQuery: string;
  filter: string;
}

export default function BlogGrid({ searchQuery, filter }: BlogGridProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load posts when filter changes or on initial load
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setPosts([]);
      setPage(1);
      setHasMore(true);

      try {
        const data = await fetchBlogPosts(1);
        const filteredData = filterPosts(data, debouncedQuery);
        const sortedData = sortPosts(filteredData, filter);
        setPosts(sortedData);
        setHasMore(data.length === 12);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [debouncedQuery, filter]);

  const filterPosts = (postsToFilter: BlogPost[], query: string) => {
    if (!query.trim()) return postsToFilter;
    
    return postsToFilter.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description?.toLowerCase().includes(query.toLowerCase()) ||
      post.tag_list.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const sortPosts = (postsToSort: BlogPost[], sortBy: string) => {
    const sorted = [...postsToSort];
    switch (sortBy) {
      case "latest":
        return sorted.sort(
          (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );
      case "popular":
        return sorted.sort(
          (a, b) => b.public_reactions_count - a.public_reactions_count
        );
      case "relevant":
        return sorted.sort((a, b) => b.comments_count - a.comments_count);
      default:
        return sorted;
    }
  };

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const data = await fetchBlogPosts(nextPage);
      const sortedData = sortPosts(data, filter);

      setPosts((prev) => [...prev, ...sortedData]);
      setPage(nextPage);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };



  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-theme-text mb-2">
                No posts found
              </h3>
              <p className="text-theme-muted">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center">
                  <Button
                    onClick={loadMorePosts}
                    disabled={loadingMore}
                    size="lg"
                    className="bg-theme-accent text-theme-accent-text hover:bg-theme-highlight hover:text-theme-highlight-text"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More Posts"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
