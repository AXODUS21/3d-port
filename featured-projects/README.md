# Featured Projects

This folder contains the Featured Projects section with a stunning card stacking animation.

## Features

- **Card Stacking Animation**: Each project card scales up and stacks on top of the previous one as you scroll
- **Smooth Transitions**: Uses Framer Motion for buttery-smooth animations
- **Glassmorphic Design**: Modern glass-effect cards with gradient backgrounds
- **Responsive**: Works beautifully on all screen sizes
- **Interactive Elements**: Hover effects and animated buttons

## How It Works

1. **Scroll-Based Animation**: The component uses Framer Motion's `useScroll` and `useTransform` hooks to create scroll-based animations
2. **Stacking Effect**: Each card:
   - Starts at 80% scale and grows to 100%
   - Moves from below the viewport to its stacked position
   - Fades in smoothly
   - Has a slight 3D rotation effect
3. **Sticky Container**: The cards are positioned in a sticky container that stays in view while scrolling
4. **Continue Scrolling**: After all cards are stacked, users can continue scrolling to the next section

## Usage

Import and use in your page:

\`\`\`tsx
import { FeaturedProjects } from "@/featured-projects";

export default function Page() {
  return (
    <main>
      <FeaturedProjects />
    </main>
  );
}
\`\`\`

## Customization

### Adding/Editing Projects

Edit `data.ts` to add or modify projects:

\`\`\`typescript
{
  id: 6,
  title: "Your Project",
  category: "Category",
  description: "Description...",
  tags: ["Tag1", "Tag2"],
  year: "2025",
  image: "/projects/your-image.png",
  bgColor: "from-color-900/40 to-color-900/40"
}
\`\`\`

### Styling

- **Card Height**: Adjust `h-[600px]` in FeaturedProjects.tsx
- **Stacking Offset**: Modify the `-index * 20` value in the `y` transform
- **Animation Speed**: Change the scroll progress ranges in `useTransform`
- **Colors**: Update gradient colors in `bgColor` property

## Animation Parameters

- **Scale**: 0.8 → 1.0
- **Y Position**: 100px → -index * 20px (stacking offset)
- **Opacity**: 0 → 1
- **Rotation X**: 10deg → 0deg

## Performance

The component is optimized for performance:
- Uses CSS transforms for animations (GPU-accelerated)
- Framer Motion handles animation frame optimization
- Sticky positioning reduces reflows
- Images are lazy-loaded via Next.js Image component (if implemented)
