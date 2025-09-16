//! File: src/app/tags/[slug]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/BlogCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScrollToTopButton } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/types";

export default function TagPage() {
  const params = useParams();
  const tagSlug = params.slug as string;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setPosts([]);
      setPage(1);
      setHasMore(true);

      try {
        const data = await fetchBlogPosts(1, tagSlug);
        setPosts(data);
        setHasMore(data.length === 12);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tagSlug) {
      loadPosts();
    }
  }, [tagSlug]);

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const data = await fetchBlogPosts(nextPage, tagSlug);

      setPosts((prev) => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const formatTagName = (slug: string) => {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
  };

  return (
    <section className="min-h-screen bg-theme-bg">
      <div className="bg-theme-bg border-b border-theme-border">
        <div className="container mx-auto px-4 pt-4 flex items-center justify-between">
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-accent transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all tags
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-theme-accent text-theme-accent-text text-lg px-3 py-1">
              #{tagSlug}
            </Badge>
            <span className="text-theme-muted">•</span>
            <span className="text-theme-muted">{posts.length} posts found</span>
          </div>
        </div>
      </div>

      <PageHeader
        title={`${formatTagName(tagSlug)} Posts`}
        description={`Explore all posts tagged with "${tagSlug}"`}
        showSearch={false}
      />

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
                <Link href="/tags" className="mt-4 inline-block">
                  <Button
                    variant="outline"
                    className="bg-theme-secondary-bg border-theme-border text-theme-text"
                  >
                    Browse other tags
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} tagName={tagSlug} />
                  ))}
                </article>

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
      <ScrollToTopButton />
    </section>
  );
}
