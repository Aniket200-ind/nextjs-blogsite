//! File: src/components/BlogCard.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  BookOpen,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  tagName?: string;
}

export function BlogCard({ post, tagName }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden bg-theme-secondary-bg border-theme-border hover:shadow-xl hover:shadow-theme-accent/10 transition-all duration-300 hover:border-theme-accent/50 h-full flex flex-col">
      {/* Cover Image */}
      <div className="relative -top-6 h-48 overflow-hidden bg-gradient-to-br from-theme-accent/10 to-theme-accent/5">
        {post.cover_image && !imageError ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-theme-accent/20 via-theme-accent/10 to-transparent">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-theme-accent/60 mx-auto mb-2" />
              <div className="text-sm font-medium text-theme-accent/80 capitalize">
                {tagName || "Article"}
              </div>
            </div>
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {post.user.profile_image && !profileImageError ? (
            <Image
              src={post.user.profile_image}
              alt={post.user.name}
              width={24}
              height={24}
              className="rounded-full ring-1 ring-theme-accent/20 transition-all duration-300 group-hover:ring-theme-accent/40"
              onError={() => setProfileImageError(true)}
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-theme-accent/20 flex items-center justify-center ring-1 ring-theme-accent/20 transition-all duration-300 group-hover:ring-theme-accent/40">
              <User className="h-3 w-3 text-theme-accent" />
            </div>
          )}
          <span className="text-sm text-theme-muted font-medium font-subheading">
            {post.user.name}
          </span>
          <span className="text-theme-muted">•</span>
          <time className="text-sm text-theme-muted flex items-center gap-1" dateTime={post.published_at}>
            <Calendar className="h-3 w-3" />
            {formatDate(post.published_at)}
          </time>
        </div>

        <Link href={`/blog/${post.id}`} className="focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 focus:ring-offset-theme-bg rounded">
          <h3 className="text-xl font-bold text-theme-text group-hover:text-theme-accent transition-colors line-clamp-2 leading-tight font-montserrat">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pt-0 flex-grow flex flex-col">
        <p className="text-theme-muted mb-4 line-clamp-3 leading-relaxed flex-grow font-body">
          {post.description}
        </p>

        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tag_list.slice(0, 3).map((tag, index) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge
                variant="secondary"
                className={`
                  bg-theme-accent/10 text-theme-accent hover:bg-theme-accent hover:text-theme-accent-text 
                  transition-all duration-300 hover:scale-105 text-xs
                  ${index === 0 ? "ring-1 ring-theme-accent/20" : ""}
                `}
              >
                {tag}
              </Badge>
            </Link>
          ))}
          {post.tag_list.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs text-theme-muted border-theme-border"
            >
              +{post.tag_list.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats section */}
        <div className="flex items-center justify-between text-sm text-theme-muted border-t border-theme-border/50 pt-3 mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-theme-accent font-medium font-code">
              <Clock className="h-3 w-3" />
              {post.reading_time_minutes} min read
            </span>
            <span className="flex items-center gap-1 hover:text-theme-accent transition-colors cursor-pointer">
              <Heart className="h-3 w-3" />
              {post.public_reactions_count}
            </span>
            <span className="flex items-center gap-1 hover:text-theme-accent transition-colors cursor-pointer">
              <MessageCircle className="h-3 w-3" />
              {post.comments_count}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
