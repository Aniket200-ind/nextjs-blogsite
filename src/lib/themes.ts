import { Theme } from "@/types";

export const themes: Theme[] = [
  {
    id: "ruby",
    name: "Ruby Midnight",
    description: "Bold reds on deep black, with golden highlights.",
  },
  {
    id: "ember",
    name: "Terracotta Ember",
    description: "Fiery elegance",
  },
  {
    id: "moss",
    name: "Midnight Moss",
    description: "Dark forest greens with warm amber accents.",
  },
  {
    id: "breeze",
    name: "Azure Breeze",
    description: "Oceanic serenity",
  },
  {
    id: "honey",
    name: "Honey Horizon",
    description: "Soft cream base with honey gold and playful lavender.",
  },
  {
    id: "mocha",
    name: "Mocha Sophisticate",
    description: "Warm sophistication",
  },
];

export const getThemeById = (id: string) => {
  return themes.find(theme => theme.id === id);
};