//! File: src/types/index.ts

export interface Theme {
  id: string;
  name: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  short_summary: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  cover_image?: string;
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
  body_html?: string;
  body_markdown?: string;
}
