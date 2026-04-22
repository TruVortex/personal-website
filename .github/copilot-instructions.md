# AGENTS.md

## Project Vision: Personal Website
This project is a personal website for Henry Bao.

## 1. Technical Philosophy
*   **Simplicity is superior:** Aim for a minimalist design. Rather than a typical website with gradients and flashy scroll functions, go for a strict theme using specific off-white and off-black tones.
*   **Consistency is key:** Do not implement a feature if its styling does not match the rest of the website. The design must be cohesive across pages and within the pages themselves.
*   **Responsive:** The website should have the exact same theming on mobile, mapped to a readable, easy-to-use single-column format.
*   **Performance-First:** Avoid using slow libraries for CDN or related services. Prevent cumulative layout shift at all costs; when the web page is served, there should be no resizing of elements as text/images load. Always define dimensions.
*   **Subtle Interactions:** The only allowed animation on the website is a smooth, fast color transition when switching between light and dark themes.

## 2. Tech Stack
*   **Framework:** Next.js
*   **Styling:** Tailwind CSS
*   **Theme Management:** `next-themes` (MUST be used to prevent a Flash of Unstyled Content on page load)
*   **Hosting/Deployment:** Vercel
*   **Package Management:** pnpm

## 3. Design Tokens
Strictly enforce these exact colors by modifying the `tailwind.config` file. Do not use default Tailwind colors (e.g., `text-black` or `bg-white`). Never use pure black (`#000000`) or pure white (`#FFFFFF`).

The website must feature a theme toggle button. The transition between themes must be smooth (e.g., using Tailwind's `transition-colors duration-300`). Moreover, any buttons should use SVG icons (e.g., from lucide-react) rather thank bulky buttons. 

**Light Theme (Default):**
*   **Background:** `#FAFAFA`
*   **Utility/Borders:** `#EEEEEE` (Use for 1px borders, subtle dividers, secondary backgrounds like cards/code blocks, and hover states)
*   **Body Text:** `#333333` (For high readability)
*   **Headings:** `#1A1A1A` (For sharp emphasis)

**Dark Theme (Complementary):**
*   **Background:** `#1A1A1A`
*   **Utility/Borders:** `#333333` (Use for 1px borders, subtle dividers, secondary backgrounds, and hover states)
*   **Body Text:** `#EEEEEE` (For high readability, avoids eye strain)
*   **Headings:** `#FAFAFA` (For sharp emphasis)

## 4. Next.js Specific Rules
*   **Theme Provider:** Implement `<ThemeProvider attribute="class">` from `next-themes` at the root layout to seamlessly handle system preference and manual toggles.
*   **Images:** ALWAYS use the Next.js `<Image />` component with explicit `width` and `height` properties to prevent Cumulative Layout Shift (CLS).
*   **Components:** Use React Server Components by default. Only use `'use client'` when interactivity (like the theme toggle button) is strictly necessary.
*   **Code Style:** Write clean, modular code.