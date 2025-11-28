# Design Guidelines: Shizensui India Water Purification Website

## Design Approach
**Reference-Based Approach**: Modern tech product showcase inspired by premium technology websites like DJI, Apple's product pages, and high-end SaaS platforms. This design prioritizes visual storytelling through dramatic imagery, clean typography, and strategic content reveals.

## Core Design Principles
1. **Premium Minimalism**: Let imagery breathe with generous whitespace
2. **Content Hierarchy**: Each section tells one clear story
3. **Visual Impact**: Photography drives engagement and credibility
4. **Restrained Sophistication**: Modern without being flashy

---

## Typography System

**Font Stack**: 
- Primary: Inter or 'SF Pro Display' via Google Fonts CDN
- Monospace: 'JetBrains Mono' for technical specifications

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- Section Headlines: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsection Titles: text-2xl md:text-3xl, font-semibold
- Feature Headlines: text-xl md:text-2xl, font-semibold
- Body Copy: text-base md:text-lg, font-normal, leading-relaxed
- Small Text/Captions: text-sm, font-medium
- Statistics: text-4xl md:text-5xl lg:text-6xl, font-bold, tabular-nums

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Section padding: py-20 md:py-32
- Component spacing: space-y-8 to space-y-16
- Card padding: p-6 md:p-8
- Button padding: px-6 py-3 to px-8 py-4

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy content: max-w-4xl mx-auto

**Grid Systems**:
- Partner logos: grid-cols-2 md:grid-cols-4 lg:grid-cols-6
- Services: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Features: grid-cols-1 lg:grid-cols-2
- Statistics: grid-cols-2 lg:grid-cols-4

---

## Component Library

### Navigation
- Fixed top navigation with backdrop blur
- Logo left-aligned, navigation links right-aligned
- CTA button in navigation (px-6 py-2, rounded-full)
- Mobile: Hamburger menu with slide-in panel

### Hero Section
- Full viewport height (min-h-screen)
- Centered headline and subheadline with CTA button
- Large hero image as background with dark overlay (opacity-40 to opacity-60)
- CTA button with backdrop blur background (bg-white/10 backdrop-blur-md)

### Partner Logos Section
- Grid layout with centered logos
- Each logo in grayscale filter, hover reveals color
- Even spacing between logos (gap-8 to gap-12)

### Technology Features (Dark Section)
- Full-width dark section
- 3-column grid showcasing AI, Bluetooth, WiFi icons
- Icon size: w-12 h-12 md:w-16 h-16
- White text on dark background

### Scenic Imagery Section
- Full-width landscape photography
- No overlays, pure imagery showcase
- Aspect ratio: aspect-video or aspect-[21/9]

### Services Grid
- 5 service cards in responsive grid
- Each card: Icon top, title, brief description
- Cards with subtle borders or background treatment
- Hover: subtle elevation change

### Dual Feature Section
- Two-column split layout (50/50 on desktop)
- Left: Image of drone capabilities
- Right: Thermal imaging visual
- Stack vertically on mobile
- Images: rounded corners (rounded-lg to rounded-xl)

### Statistics Showcase
- 4-column grid (2x2 on mobile)
- Large numbers with descriptions below
- Centered alignment
- Ample spacing between stats (gap-12 to gap-16)

### Contact Form Section
- Centered layout, max-w-2xl
- "Check back soon" messaging with subtext
- Form fields: Full-width inputs with consistent styling
- Input styling: border, rounded corners, padding py-3 px-4
- Submit button: Full-width or centered, prominent

### Footer
- Multi-column layout (3-4 columns on desktop, stack on mobile)
- Navigation links organized by category
- Social media icons
- Copyright and legal links
- Subtle top border

---

## Images

**Hero Section**:
- Large, dramatic aerial shot of landscape or drone in flight
- High resolution, professionally shot
- Placement: Full background with overlay
- Suggested: Drone flying over mountains, coastline, or urban landscape at golden hour

**Technology Section**:
- Icons for AI, Bluetooth, WiFi (use Heroicons CDN)
- Clean, minimal icon style

**Scenic Section**:
- Stunning aerial photography showcasing drone capabilities
- Examples: Forest canopy, coastal formations, agricultural fields
- Full-width, high-impact imagery

**Dual Feature Images**:
- Left: Drone in action or close-up of drone technology
- Right: Thermal imaging capture or specialized camera view
- Both images: Equal height, professional quality

**Partner Logos**:
- Use recognizable brand logos or placeholder logos
- SVG format preferred
- Maintain brand guidelines for each logo

---

## Accessibility & Interactions

- Maintain WCAG AA contrast ratios throughout
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Smooth scroll behavior between sections
- Images have descriptive alt text
- Form labels properly associated with inputs
- Button states: Default, hover (subtle brightness/shadow change), active (slight scale)
- Backdrop blur buttons: bg-white/10 backdrop-blur-md border border-white/20

---

## Animation Strategy

**Minimal, Purposeful Motion**:
- Smooth scroll transitions between sections
- Subtle hover states on cards (transform: translateY(-4px))
- Logo grayscale to color transition on hover
- Navigation backdrop blur on scroll
- No complex animations or parallax effects