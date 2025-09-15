//! File: src/types/index.ts

export interface Theme {
  id: string;
  name: string;
  description: string;
}

export interface Tag {
  id: number
  name: string
  bg_color_hex: string
  text_color_hex: string
}
