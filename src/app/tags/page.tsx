//! File: src/app/tags/page.tsx

"use client";
import { PageHeader } from "@/components/PageHeader";
import { Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { TagCard } from "@/components/TagCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { fetchTags } from "@/lib/api";
import type { Tag } from "@/types";
import { ScrollToTopButton } from "@/components/ScrollToTop";


export default function TagsListPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTags();
  }, []);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
  };

  return (
    <section>
      <PageHeader
        title="Explore Tags"
        description="Browse topics and discover content that interests you"
        showSearch={true}
        showFilter={false}
        searchPlaceholder="Search tags..."
        onSearch={handleSearch}
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-2xl">
            <Hash className="w-8 h-8 text-theme-accent" />
          </div>
        }
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredTags.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-theme-text mb-2">
                  No tags found
                </h3>
                <p className="text-theme-muted">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTags.map((tag) => (
                  <TagCard key={tag.id} tag={tag} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ScrollToTopButton />
    </section>
  );
}
