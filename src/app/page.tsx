//! File: src/app/page.tsx

"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import BlogGrid from "@/components/BlogGrid";
import { BookOpen } from "lucide-react";
import { ScrollToTopButton } from "@/components/ScrollToTop";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest");

  return (
    <section className="min-h-screen bg-theme-bg text-theme-text">
      <PageHeader
        title="Explore Posts"
        description="Discover amazing content from the community of technical writers"
        showSearch={true}
        searchPlaceholder="Search posts..."
        onSearch={setSearchQuery}
        onFilter={setFilter}
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-2xl">
            <BookOpen className="w-8 h-8 text-theme-accent" />
          </div>
        }
      />
      <BlogGrid searchQuery={searchQuery} filter={filter} />
      <ScrollToTopButton />
    </section>
  );
}
