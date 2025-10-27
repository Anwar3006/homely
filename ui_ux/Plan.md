# Real Estate Website Design Guide

This guide translates the provided CSS variables and style definitions into actionable recommendations for branding, layout design in Figma, and final CSS implementation.

---

## 1. Brand Colors & Theming

The provided CSS uses **`oklch`** for color space, which is excellent for perceptual uniformity and contrast. Since the current values are mostly placeholders (all set to near-black/white, except for `destructive` and chart colors), you need to select meaningful colors for **`--primary`**, **`--accent`**, and potentially use the supporting colors.

### Primary & Accent Color Selection

For a real-estate site, the **primary color** often conveys **trust, stability, and professionalism**, while the **accent color** is great for **Calls to Action (CTAs)** and drawing attention.

| Variable                 | Suggested Role                         | Recommended Action                                                                                                                                                                                    |
| :----------------------- | :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`--primary`**          | **Main Branding/CTAs**                 | **Select a deep, professional color.** For a real estate site, consider a deep **Navy Blue** or a sophisticated **Dark Green** (e.g., a color similar to `--color-green` but optimized for contrast). |
| **--primary-foreground** | Text/Icons on Primary                  | Should be very light (e.g., White or near-White) for high contrast against `--primary`.                                                                                                               |
| **`--accent`**           | Secondary CTAs, Highlights             | **Select a contrasting, attention-grabbing color.** Perhaps a warm **Gold/Yellow** or a clean **Teal** that complements the primary color.                                                            |
| **--accent-foreground**  | Text/Icons on Accent                   | Should be light or dark based on the chosen accent color's lightness.                                                                                                                                 |
| **`--secondary`**        | Subtle backgrounds, secondary elements | A very light grey or a highly desaturated tint of the primary color.                                                                                                                                  |
| **`--destructive`**      | Error messages, removal buttons        | Keep the provided **`oklch(0.577 0.245 27.325)`** (which is a muted red/brown) or choose a clearer **Red**.                                                                                           |

### Backgrounds & Surfaces

| Variable                      | Suggested Role             | Value Guidance                                                                                                                                                                 |
| :---------------------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`--background`**            | Main Page Background       | In **Light Mode**, aim for a very light, off-white (like `--color-light-200`). In **Dark Mode**, aim for a deep, non-pure black (like `--color-dark-900` or slightly lighter). |
| **`--foreground`**            | Main Body Text Color       | The main text color. Should be dark in light mode and light in dark mode for readability against `--background`.                                                               |
| **`--card`**, **`--popover`** | Component Backgrounds      | Should be _slightly_ different from `--background` for visual depth (e.g., 1-2 lightness steps lighter in light mode, darker in dark mode).                                    |
| **`--border`**                | Separators, input outlines | A subtle color, usually a light grey in light mode and a desaturated dark color in dark mode.                                                                                  |

---

## 2. Layout & Component Styling in Figma

Use the color definitions to establish your **local styles in Figma** _before_ designing layouts. This ensures consistency.

### Backgrounds

#### Main Page Background

- **Light Mode:** Use the color defined by **`--background`** (e.g., a soft white).
- **Dark Mode:** Use the color defined by the `.dark` **`--background`** variable (e.g., a deep charcoal).

### Cards (Property Listings, Testimonials, etc.)

- **Background:** Use **`--card`** for the surface color.
- **Text on Card:** Use **`--card-foreground`** for the main text elements.
- **Corner Radius:** The global **`--radius`** is set to **`0.625rem` (10px)**. Use this radius for **all** card corners in Figma for consistency.
- **Shadow/Elevation:** Since no shadow variable is defined, rely on Figma's standard drop shadows, but aim for **subtle, soft shadows** that suggest elevation without being distracting, especially for property cards.

---

## 3. Typography & Fonts

### Font Selection

The CSS hints at **`--font-bevellier`**. You should choose a **Primary Font** for headings and a highly readable **Body Font**.

1.  **Select Your Fonts:** Choose your actual font files (e.g., Inter, Roboto, or a custom one like Bevellier if available) and establish them in your design system/Figma library.
2.  **Map Variables:** Link the defined size variables to your text styles in Figma.

### Font Mapping Guide

| Element                           | CSS Size Variable    | Recommended Figma Style | Color Guidance (Light Mode)                                                           |
| :-------------------------------- | :------------------- | :---------------------- | :------------------------------------------------------------------------------------ |
| **H1 (Main Page Title)**          | `--text-heading-1`   | Heading 1               | Use **`--foreground`** for high impact.                                               |
| **H2 (Section Titles)**           | `--text-heading-2`   | Heading 2               | Use **`--foreground`** or **`--primary`** for high importance sections.               |
| **H3 (Card Titles, Subsections)** | `--text-heading-3`   | Heading 3               | Use **`--foreground`** or **`--primary`**.                                            |
| **Lead Text (Key Info)**          | `--text-lead`        | Lead/Intro Text         | Use **`--foreground`** or **`--muted-foreground`** if it's introductory context.      |
| **Paragraph (`<p>`)**             | **`--text-body`**    | Body Text               | Use **`--foreground`**. This color is the primary readable text color.                |
| **Medium Body Text**              | `--text-body-medium` | Body Medium             | Useful for text that needs slight emphasis, like property features.                   |
| **Captions/Labels**               | `--text-caption`     | Caption                 | Use **`--muted-foreground`** for secondary information (e.g., location, date posted). |
| **Footnotes/Disclaimers**         | `--text-footnote`    | Footnote                | Use **`--muted-foreground`** or a lighter shade of gray.                              |

### CTA Button Text

- For buttons using **`--primary`** as the background, use **`--primary-foreground`** for the text.
- For buttons using **`--accent`** as the background, use **`--accent-foreground`** for the text.

---

## 4. Sitemap & Layout Influence

The **Sitemap** (structure) should influence the **CSS variable definitions**, not the other way around.

1.  **Sitemap First:** Define the structure (e.g., Header, Main Content, Sidebar/Filters, Footer).
2.  **Identify Key Areas:** Determine which areas need special styling:
    - **Filters/Navigation:** These areas often benefit from the secondary/muted colors, or perhaps the **`--sidebar`** theme variables if you have a distinct sidebar structure.
    - **Primary Property Card:** This needs to use **`--card`** background and showcase key information using **`--primary`** for the price or status.
3.  **Figma First:** Design the layouts in Figma using the styles you defined based on the colors above.
4.  **CSS Last:** Use the finalized Figma designs to guide you when you _implement_ these styles in your HTML/CSS, potentially adjusting the variable values in your `globals.css` based on how they look in the high-fidelity mockups (e.g., tweaking the contrast on `--muted-foreground` until it looks perfect next to `--background`).

**In short: Brand identity (colors/fonts) informs the Figma styles, and Figma styles inform the final, specific CSS implementation.**

## Inspiration

1. https://dribbble.com/shots/19220148-Mobile-House-Website-Animation

## Frontend Setup

1. cd into the frontend folder or create a folder and cd into it then:

```bash
# create a next app
$ npx create-next-app@latest . --typescript --tailwind --eslint --app
# for animation the original tutorial uses framer-motion but we want to use gsap
$ npm i lucide-react dotenv date-fns react-filepond filepond filepond-plugin-image-exif-orientation filepond-plugin-image-preview mapbox-gl lodash react-hook-form zod @hookform/resolvers gsap
# then
$ npm i -D @types/node @types/uuid
#then
npx shadcn@latest init -d
#after installation, we add all the components we will need
$ npx shadcn@latest add avatar badge button card checkbox command dialog dropdown-menu form input label navigation-menu radio-group select separator sheet sidebar skeleton slider sonner switch table tabs textarea tooltip
#then for state management he install react-redux @reduxjs/toolkit but we will use react-query
$ npm i @tanstack/react-query
#then use the eslint plugin to catch bugs
$ npm i -D @tanstack/eslint-plugin-query
#React countUp for number animation
$ npm i react-countup
```

We need filepond and it's adapters for this reason:

```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
function App() {
  const [files, setFiles] = useState([]);
  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server="/api"
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}
```

## Backend Setup

```bash
#To initialize the project
$ npm init -y
#Then install packages, multer for file uploads, helmet for security, @terraformer/wkt for postgis to create locations,
$ npm i express cors body-parser morgan dayjs dotenv helmet jsonwebtoken multer uuid axios @terraformer/wkt @aws-sdk/client-s3 @aws-sdk/lib-storage
#Then some devDependencies, rimraf to easily delete the dist folder, concurrently to , shx to copy some types defined in the backend to the frontend for consistency, replace ts-node with tsx because it doesn't work well with "module": "nodenext"
$ npm i -D rimraf concurrently nodemon shx tsx typescript @types/cors @types/morgan @types/node @types/jsonwebtoken @types/multer @types/terraformer__wkt @types/uuid
#Then we install and initialize typescript compiler
$ npx tsc --init
#Then let us install drizzle
$ npm i drizzle-orm pg dotenv
$ npm i -D drizzle-kit tsx @types/pg
#Then to generate zod schemas from the tables so we can send them to the frontend for type consistency
$ npm i drizzle-zod zod
```

- Then we modify our package.json

```json
  "scripts": {
    "build": "rimraf dist && npx tsc",
    "start": "npm run build && node dist/server.js",
    "dev": "npm run build && concurrently \"npx tsc -w\" \"nodemon --exec tsx src/server.ts\"",
    "db:studio": "npx drizzle-kit studio",
    "db:push": "npx drizzle-kit push",
    "db:migrate": "npx drizzle-kit migrate",
    "db:generate": "npx drizzle-kit generate"
  },
```
