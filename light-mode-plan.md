# Light Mode Implementation Plan

This document outlines the strategy for implementing a robust Light/Dark mode system for the RymeLabs website using `next-themes` and Tailwind CSS.

## Phase 1: Setup & Configuration

### 1. Install Dependencies
We will use `next-themes` to handle theme switching logic, persistence, and hydration mismatch prevention.

```bash
npm install next-themes
```

### 2. Configure Global Styles (`src/app/globals.css`)
We need to define semantic CSS variables that change based on the theme. This allows us to use classes like `bg-background` instead of hardcoded colors.

**Proposed Variables:**
```css
@layer base {
  :root {
    /* Light Mode Colors */
    --background: 255 255 255; /* White */
    --foreground: 24 24 27;    /* Zinc 950 */
    --card: 255 255 255;
    --card-foreground: 24 24 27;
    --popover: 255 255 255;
    --popover-foreground: 24 24 27;
    --primary: 24 24 27;       /* Zinc 950 */
    --primary-foreground: 250 250 250;
    --muted: 244 244 245;      /* Zinc 100 */
    --muted-foreground: 113 113 122; /* Zinc 500 */
    --border: 228 228 231;     /* Zinc 200 */
  }

  .dark {
    /* Dark Mode Colors (Current Look) */
    --background: 0 0 0;       /* Black */
    --foreground: 250 250 250; /* Zinc 50 */
    --card: 24 24 27;          /* Zinc 950 */
    --card-foreground: 250 250 250;
    --popover: 24 24 27;
    --popover-foreground: 250 250 250;
    --primary: 250 250 250;
    --primary-foreground: 24 24 27;
    --muted: 39 39 42;         /* Zinc 800 */
    --muted-foreground: 161 161 170; /* Zinc 400 */
    --border: 39 39 42;        /* Zinc 800 */
  }
}
```

## Phase 2: Infrastructure

### 1. Create Theme Provider (`src/components/ThemeProvider.tsx`)
A client component to wrap the application.

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 2. Update Root Layout (`src/app/layout.tsx`)
Wrap the application content in the provider and update the `body` class.

```tsx
// ... imports
import { ThemeProvider } from "@/components/ThemeProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* ... existing providers */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Phase 3: The Toggle Button

### 1. Create Toggle Component (`src/components/ThemeToggle.tsx`)
A button that cycles through Light, Dark, and System modes.

### 2. Integration
Place the toggle in:
- `MenuOverlay.tsx` (for mobile/menu access)
- Or as a standalone floating button next to the contact button.

## Phase 4: Component Refactoring

This is the most intensive phase. We must scan existing components and replace hardcoded colors with semantic classes or `dark:` modifiers.

**Key Areas to Update:**
1.  **Backgrounds:** Change `bg-black` to `bg-background` or `bg-white dark:bg-black`.
2.  **Text:** Change `text-white` to `text-foreground` or `text-zinc-900 dark:text-white`.
3.  **Borders:** Change `border-white/10` to `border-border` or `border-zinc-200 dark:border-white/10`.
4.  **Overlays:** Ensure glassmorphism effects work on white backgrounds (might need darker opacity in light mode).

**Example Refactor:**
*Before:*
```tsx
<div className="bg-black text-white border border-white/10">
```
*After:*
```tsx
<div className="bg-white dark:bg-black text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10">
```

## Execution Steps

1.  [ ] Install `next-themes`.
2.  [ ] Create `src/components/ThemeProvider.tsx`.
3.  [ ] Update `src/app/globals.css` with variables.
4.  [ ] Update `src/app/layout.tsx`.
5.  [ ] Create `src/components/ThemeToggle.tsx`.
6.  [ ] Refactor `src/app/page.tsx` (Hero section).
7.  [ ] Refactor `src/components/Header.tsx`.
8.  [ ] Refactor `src/components/MenuOverlay.tsx`.
9.  [ ] Refactor `src/components/FloatingContactButton.tsx`.
10. [ ] Test all pages in both modes.
