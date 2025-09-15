//! File: src/components/TagCard.tsx

"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Tag } from "@/types"

interface TagCardProps {
  tag: Tag
}

export function TagCard({ tag }: TagCardProps) {
  return (
    <Link href={`/tags/${tag.name}`}>
      <Card className="group h-48 overflow-hidden bg-theme-secondary-bg border-theme-border hover:shadow-lg transition-all ease-in-out hover:-translate-y-1 cursor-pointer">
        <CardContent className="py-2 px-4 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-theme-text group-hover:text-theme-accent transition-colors mb-2">
              #{tag.name}
            </h3>
            <p 
              className="text-sm text-theme-muted leading-relaxed overflow-hidden"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {tag.short_summary || `Explore posts and discussions about ${tag.name}.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}