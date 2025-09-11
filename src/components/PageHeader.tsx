//! File: src/components/PageHeader.tsx
"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const renderTitle = (title: string) => {
  const words = title.split(" ");
  if (words.length === 1) return title;

  const lastWord = words.pop()!;
  const restOfTitle = words.join(" ");

  return (
    <h1 className="text-4xl md:text-5xl font-bold text-theme-text mb-4 font-montserrat">
      {restOfTitle}{" "}
      <span className="bg-gradient-to-r from-theme-accent to-theme-highlight bg-clip-text text-transparent">
        {lastWord}
      </span>
    </h1>
  );
};

interface PageHeaderProps {
  title: string;
  description: string;
  showSearch: boolean;
  showFilter?: boolean;
  onSearch?: (query: string) => void;
  onFilter?: (filter: string) => void;
  searchPlaceholder?: string;
  icon?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  showSearch = false,
  showFilter = true,
  onSearch,
  onFilter,
  searchPlaceholder = "Search posts...",
  icon,
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-theme-bg via-theme-secondary-bg to-theme-bg border-b border-theme-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto">
          {icon && <div className="mb-6">{icon}</div>}
          {renderTitle(title)}
          <p className="text-lg text-theme-muted mb-8 max-w-2xl mx-auto font-subheading">
            {description}
          </p>

          {showSearch && (
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-muted h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  className="pl-10 bg-theme-secondary-bg border-theme-border text-theme-text placeholder:text-theme-muted"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>

              {showFilter && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 bg-theme-secondary-bg border-theme-border text-theme-text hover:bg-theme-accent hover:text-theme-accent-text"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-theme-secondary-bg border-theme-border"
                  >
                    <DropdownMenuItem
                      onClick={() => onFilter?.("latest")}
                      className="text-theme-text hover:bg-theme-accent hover:text-theme-accent-text cursor-pointer"
                    >
                      Latest
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onFilter?.("relevant")}
                      className="text-theme-text hover:bg-theme-accent hover:text-theme-accent-text cursor-pointer"
                    >
                      Most Relevant
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onFilter?.("popular")}
                      className="text-theme-text hover:bg-theme-accent hover:text-theme-accent-text cursor-pointer"
                    >
                      Most Popular
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
