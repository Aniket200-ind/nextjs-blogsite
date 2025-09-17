//! File: src/app/blog/[slug]/page.tsx

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogPost } from "@/lib/api";
import type { BlogPost } from "@/types";
import MarkdownComponents from "@/components/MarkdownComponent";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchBlogPost(postId);
        setPost(data);
      } catch (err) {
        setError("Failed to load blog post");
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const processedTags = useMemo(() => {
    if (!post?.tag_list) return [];
    return typeof post.tag_list === "string" 
      ? (post.tag_list as string).split(",").map(tag => tag.trim())
      : post.tag_list;
  }, [post?.tag_list]);

  const formattedDate = useMemo(() => {
    return post?.published_at ? formatDate(post.published_at) : "";
  }, [post?.published_at, formatDate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-theme-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-theme-text mb-2">
              Post not found
            </h3>
            <p className="text-theme-muted mb-4">{`The blog post you're looking for doesn't exist or has been removed.`}</p>
            <Link href="/">
              <Button className="bg-theme-accent text-theme-accent-text hover:bg-theme-highlight hover:text-theme-highlight-text">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="bg-theme-bg border-b border-theme-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to posts
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          {post.cover_image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.cover_image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-text mb-4 font-playfair">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src={post.user.profile_image || "/placeholder.svg"}
                  alt={post.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-theme-text">
                    {post.user.name}
                  </p>
                  <p className="text-sm text-theme-muted">
                    @{post.user.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-theme-muted">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.reading_time_minutes} min read
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {processedTags.map((tag: string) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge
                    variant="secondary"
                    className="bg-theme-accent/10 text-theme-accent hover:bg-theme-accent hover:text-theme-accent-text transition-colors"
                  >
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-theme-muted">
              <span className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                {post.public_reactions_count} reactions
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {post.comments_count} comments
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="mb-8">
            {post.body_markdown ? (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {post.body_markdown}
                </ReactMarkdown>
              </div>
            ) : post.body_html ? (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.body_html }}
              />
            ) : (
              <div className="bg-theme-secondary-bg border border-theme-border rounded-lg p-6">
                <p className="text-theme-text mb-4">{post.description}</p>
                <p className="text-theme-muted text-sm">
                  Full content not available. This article may need to be viewed
                  on dev.to.
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="bg-theme-secondary-bg border border-theme-border rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-theme-text mb-2">
              Enjoyed this article?
            </h3>
            <p className="text-theme-muted mb-4">
              Join the discussion and show your support on dev.to
            </p>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-theme-accent text-theme-accent-text hover:bg-theme-highlight hover:text-theme-highlight-text"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on dev.to
              </Button>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
