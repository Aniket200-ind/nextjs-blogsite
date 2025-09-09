'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/components/context/ThemeContext';
import { themes } from '@/lib/themes';

export function ThemeDropdown() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-theme-secondary-bg border-theme-border text-theme-text hover:bg-theme-accent hover:text-theme-accent-text"
        >
          <Palette className="w-4 h-4 mr-2" />
          Themes
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-theme-secondary-bg border-theme-border"
      >
        <DropdownMenuLabel className="text-theme-text">Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-theme-border" />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme)}
            className="cursor-pointer text-theme-secondary-text hover:bg-theme-accent transition-all hover:text-theme-accent-text"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="font-medium">{theme.name}</span>
                <span className="text-xs text-theme-muted">{theme.description}</span>
              </div>
              {currentTheme.id === theme.id && (
                <Check className="w-4 h-4 text-theme-accent" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}