# Swing Path Pro — Website Design Brief & Build Specification

**Version:** 1.0 — June 2026
**Status:** LOCKED — ready for Claude Code implementation
**Repo:** github.com/LT-17-LT/SPPBuild
**Deploy target:** Vercel
**Framework:** Next.js 16 + React 19 + Tailwind v4 + shadcn/ui
**Animation stack:** GSAP ScrollTrigger (install `freshtechbro/claudedesignskills`)
**Design reference sites:**
- indigo-laboratory.it (hero, chapter reveals, premium feel)
- wolverineworldwide.com (floating images, footer bar)
- sohub.digital (overlapping stacking cards)
- apple.com/macbook-pro (scroll-scrubbed video)

---

## Brand Tokens

### Colour Palette (locked)

| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Ink | `#11140f` | `--ink` | Darkest text |
| Green Deep | `#09140b` | `--green-deep` | Hero bg, dark sections |
| Green | `#173f22` | `--green` | Primary accent, headings |
| Green 2 | `#355534` | `--green2` | Secondary green |
| Moss | `#748466` | `--moss` | Body text on dark |
| Moss Light | `#b8caa6` | `--moss-lt` | Captions, muted text |
| Gold | `#C9A84C` | `--gold` | Premium accent, CTAs, highlights |
| Gold Muted | `#a8893a` | `--gold-muted` | Hover states |
| Paper | `#f3f1ec` | `--paper` | Primary background (warm cream) |
| Warm | `#e2d6c2` | `--warm` | Secondary warm tone |
| White | `#ffffff` | `--white` | Cards, inputs |
| Line | `rgba(17,20,15,.12)` | `--line` | Borders on light |
| Line Light | `rgba(255,255,255,.08)` | `--line-light` | Borders on dark |

### Typography

| Role | Family | Weight | Tracking | Usage |
|------|--------|--------|----------|-------|
| Display | Playfair Display | 400, 600 | -0.03em | Section titles, hero subtitle, quotes |
| Display italic | Playfair Display Italic | 400 | normal | Positioning line, testimonial quotes |
| Body / UI | Inter | 300–800 | normal | Body text, nav, buttons, labels, cards |
| Hero words | Inter | 800 | -0.04em | "LET'S GET THAT PERFECT SWING TOGETHER" |
| Eyebrow | Inter | 700 | 0.2em | Section labels (uppercase) |

Font source: Google Fonts. Preconnect to fonts.googleapis.com.

### Spacing & Layout

- Max content width: 1200px
- Section vertical padding: clamp(5rem, 9vw, 8rem)
- Border radius on cards: 16px (premium, not sharp)
- No border radius on full-bleed sections (edge-to-edge)

---

## Navigation

### Top Nav (fixed, transparent → opaque on scroll)
- Left: SPP logo (Playfair Display italic "Swing Path *Pro*" — Pro in gold)
- Right: Minimal links — `System` | `For You` | `Proof` | `Enquire` (gold button)
- Mobile: Hamburger → slide-out

### Progress Indicator (left side)
- Thin vertical line, fixed to left edge (~24px from edge)
- Small dots at each section position
- Active dot: gold, rest: muted moss
- Labels fade in on hover: Hero · Problem · System · For You · Proof · End
- Disappears on mobile

### Footer Bar (Wolverine-style)
- Full-width, dark green-deep background
- Full-bleed background image: putting green texture or gradient
- Horizontal nav layout:
  `[SPP machine silhouette + logo]` | `Friends of SPP` | `Seen in the Field` | `Contact` | `Patents` | `Privacy` | `© SPP 2026`
- Each link opens a full premium page (not a modal)
- Feels like top navigation placed at the bottom — not an afterthought

---

## Section-by-Section Specification

### SECTION 1 — HERO

**Reference:** indigo-laboratory.it hero + apple.com/macbook-pro scroll-scrub
**Height:** 300vh (3× viewport for scroll room)
**Position:** sticky inner container (100vh)

**Video layer:**
- Edge-to-edge Seedance video of SPP machine (scroll-scrubbed)
- Video plays forward as user scrolls, scrubs backward on scroll-up
- Pure black/dark background behind video
- Opacity 0.85 to allow text readability

**Word animation (lower-left corner):**
- Words replace each other tied to scroll position
- Sequence: LET'S → GET → THAT → PERFECT → SWING → TOGETHER
- Font: Inter 800, clamp(3.5rem, 10vw, 8rem)
- Position: bottom-left, ~8% from left edge, ~15% from bottom
- Each word fades in with slight upward translate (10px)
- TOGETHER renders in gold (`--gold`)
- After TOGETHER lands: positioning subtitle fades in beneath:
  *"Launch monitors show what happened. We help you feel and correct why."*
  Font: Playfair Display italic, gold, ~1.1rem

**Scroll hint:** Small "Scroll" label + animated vertical line, bottom-centre. Fades out after 5% scroll.

**Asset required:** Seedance video (MP4, 1920×1080). Until ready, use dark gradient placeholder with subtle product silhouette.

---

### SECTION 2 — THE PROBLEM

**Reference:** wolverineworldwide.com floating product images section
**Background:** Paper (`--paper`)

**Floating golf balls layer:**
- Behind the text, depth-layered
- Multiple golf balls at varying sizes and opacities
- Animated: slow falling/drifting motion, randomised speeds
- Some balls near-miss a hole (visible cup in the background)
- Creates a feeling of "close but not quite" — data can show you the problem but can't fix the feel
- Parallax: balls move at different rates on scroll for depth

**Text overlay (centred):**
- Eyebrow: "THE PROBLEM" (Inter 700, uppercase, `--green`, 0.2em tracking)
- Title: "Golf coaching is data-rich but physically feel-poor." (Playfair Display 400, `--ink`, clamp 2.2–3.5rem)
- Body: "Launch monitors tell the coach the number. Swing Path Pro gives the coach the tool to change the movement that creates the number." (Inter 300, `--moss`, 1rem)

**Transition out:** One golf ball separates from the group, begins its descent. The rest fade. This single ball becomes the scroll-driven visual thread.

**Asset required:** Golf ball 3D render (PNG with transparency, multiple sizes: 80px, 120px, 200px). Golf hole/cup image. Or: CSS/WebGL generated.

---

### SECTION 3 — ↓ BALL FALLS ↓

**Visual thread transition:**
- Single golf ball, scroll-position driven
- Falls vertically as user scrolls
- Subtle rotation on the ball
- Travels through empty space (paper background, generous whitespace)
- Distance: approximately 50–80vh of scroll travel
- Ball enters the next section and disappears behind the first System card

---

### SECTION 4 — THE SYSTEM (horizontal side-scrolling cards)

**Reference:** Premium horizontal scroll section (like Apple feature cards)
**Background:** Paper (`--paper`) or subtle gradient shift to white
**Scroll behaviour:** Horizontal scroll driven by vertical scrolling (GSAP ScrollTrigger pin + horizontal translate)

**Section header (before cards begin scrolling):**
- Eyebrow: "THE SYSTEM"
- Title: "Built around feel, not screen time."
- Subtitle: "No batteries. No screens. No software. Pure mechanical feedback that changes your game."

**Cards (4–5):**

Each card:
- Width: ~70vw on desktop, ~85vw on mobile
- Height: ~65vh
- Background: dark green gradient (radial-gradient from `--green-deep` to `--green`)
- Border: 1px solid rgba(255,255,255,0.08)
- Border radius: 16px
- Layout: image left/right (alternating), text opposite side
- Image area: product detail render or photo (placeholder until assets ready)
- Card number: large faded number in background (01, 02, 03, 04, 05)

Card 1 — SWING PATH CORRECTION
- "Physical resistance guides the club through the correct arc. Incorrect paths meet immediate mechanical feedback."

Card 2 — WRIST ROTATION
- "Feel the correct wrist rotation at every point of the swing. Building muscle memory that transfers to the course."

Card 3 — POSTURE & RESISTANCE
- "The system introduces physical resistance when posture drifts. Correct alignment feels free. Incorrect feels wrong."

Card 4 — MUSCLE MEMORY
- "Repetition builds unconscious competence. Every swing on the system encodes the correct movement pattern."

Card 5 (optional) — ZERO TECH, PURE FEEL
- "No batteries. No screens. No subscriptions. No software updates. Just engineered mechanical precision."

**Transition out:** After the last card scrolls away, the golf ball reappears from behind it and continues falling.

---

### SECTION 5 — WHO IT'S FOR (Indigo chapter-shift reveal)

**Reference:** indigo-laboratory.it chapter reveals
**Background:** Full-bleed, dark. Background image/colour shifts per audience segment.
**Scroll behaviour:** Pinned section. As user scrolls, the content transforms — background, text, and context shift between audiences. Each feels like its own chapter.

**Segment 1: Fitting Studios**
- Background: dark with subtle green tint
- Eyebrow: "FOR FITTING STUDIOS"
- Title: "Separate movement problems from equipment problems."
- Body: "Use before or after the fitting. The diagnostic tool your analysis is missing."

**Segment 2: Indoor Centres**
- Background shifts (slightly different dark tone or accent)
- Eyebrow: "FOR INDOOR CENTRES"
- Title: "The station between the simulator and the lesson."
- Body: "Physical coaching hardware alongside your simulator bays. Winter training programmes with real movement feedback."

**Segment 3: Academies**
- Eyebrow: "FOR ACADEMIES"
- Title: "Create premium lesson packages that justify higher fees."
- Body: "Visible coaching station that differentiates your programme from every other range lesson."

**Segment 4: Serious Players**
- Eyebrow: "FOR PLAYERS"
- Title: "Feel the swing. Correct the cause."
- Body: "Whether you're breaking 75 or building your first consistent follow-through — the system adapts."

**Ends with:** A clean contact sheet / CTA embedded in the section:
- "Ready to feel the difference?"
- Email input + "Enquire" button, or simple "Book a Demo →" gold button
- This contact sheet can also be pulled up by the footer bar's Contact tab

---

### SECTION 6 — TESTIMONIALS (SOHub overlapping stacking cards)

**Reference:** sohub.digital services section (Brand Identities / Smart Development cards)
**Background:** Paper (`--paper`)
**Scroll behaviour:** Cards stack and overlap as user scrolls. Each new card slides up and overlaps the previous one. The ball (from earlier) vanishes behind the first card.

**Card design:**
- Dark background (`--green-deep` or `--green`)
- Large serif italic quote (Playfair Display, gold or white)
- Author name + facility (Inter, `--moss-lt`)
- Subtle gold accent line at top or side
- Border radius: 16px
- Generous padding

**Cards (4):**

1. "I recommend the Swing Path Pro to build up muscle memory and feel, for all types of golfers."
   — Kalvin van Rensburg · Scratch Player, Amanzimtoti Golf Club

2. "The apparatus resisted when I swayed on the ball and I felt the difference when instructed to stand firm in my stance."
   — Ina van Zyl · Ernie Els Silver Lakes Autism Event

3. "The machine allowed the club to glide on the correct path and would be good for aspiring golfers."
   — Carla Pinheiro · Ernie Els Silver Lakes Autism Event

4. "After playing 9 holes I felt a positive difference in my swing and it showed in my score."
   — Bevan Du Preez · Ernie Els Silver Lakes Autism Event

---

### SECTION 7 — ↓ BALL REAPPEARS ↓

- Golf ball drops back in from behind the last testimonial card
- Falls through empty space (paper background)
- Transitions into the putting green visual

---

### SECTION 8 — THE PUTT (scroll-tied finale)

**Background:** Transitions from paper to a top-down view of a putting green
**Ball behaviour:**
- Ball lands on the green surface
- Rolls toward the hole (scroll-driven)
- Sinks into the cup at the bottom of scroll travel
- Satisfying visual payoff — the entire site journey resolves

**Asset required:** Putting green texture/image (top-down). Golf ball. Hole/cup. Can be 2D illustrated, 3D rendered, or CSS/SVG. The simpler the better initially — this can be enhanced later.

---

### SECTION 9 — FOOTER BAR

**Reference:** wolverineworldwide.com footer (annotated screenshot)
**Position:** Fixed or sticky at very bottom, appears after the putt animation
**Background:** `--green-deep` with subtle texture or solid

**Layout (horizontal, single row):**
```
[Machine silhouette + SPP wordmark] | Friends of SPP | Seen in the Field | Contact | Patents | Privacy | © SPP 2026
```

**Typography:** Inter 500, 0.65rem, uppercase, 0.12em tracking
**Link colour:** `--moss-lt`, hover: `--white`
**Active/hover:** Gold underline

**Each link opens a full page:**
- `/friends` — Friends of SPP (partners, Ernie Els Foundation, charity work). Premium gallery + story page. Indigo-level treatment.
- `/events` — Seen in the Field (event photos: Ebotse Links, Silver Lakes, etc.). Premium photo gallery.
- `/contact` — Full enquiry page (form + details). Can also be pulled up as a sheet from this bar.
- `/patents` — Patent information (Patent #1408632).
- `/privacy` — Privacy policy.

---

## Sub-Pages Design Notes

### Friends of SPP (`/friends`)
- Premium page, not an afterthought
- Ernie Els Foundation relationship, charity golf days
- Partner logos if applicable
- Same design language as homepage (paper background, green accents, Playfair headings)
- Photo gallery with scroll reveals

### Seen in the Field (`/events`)
- Premium photo gallery
- Ebotse Links, Silver Lakes, Nico van Rensburg events
- Real photos from the uploaded assets
- Caption style: venue, date, brief description
- Same design language

---

## Asset Checklist

### Must-have before build:
- [ ] SPP logo (SVG, white + gold version, dark + gold version)
- [ ] Golf ball render (PNG, transparent, multiple sizes)
- [ ] Putting green texture or illustration (for footer putt animation)
- [ ] Product system photo (from existing Wix assets or new 3D render)

### Must-have before launch:
- [ ] Seedance hero video (MP4, 1920×1080, 6–8 seconds)
- [ ] Product detail renders for System cards (4–5 images)
- [ ] Event photos (already have from Wix: Ebotse Links, Silver Lakes, caps, etc.)
- [ ] Nico demo photo (already have)
- [ ] Kalvin van Rensburg photo (already have from Wix)

### Nice-to-have:
- [ ] Product video (60-second explainer)
- [ ] Coach demo video (2–3 minutes)
- [ ] Additional testimonial photos

---

## Implementation Notes for Claude Code

### GSAP Skills Required:
Install before starting:
```bash
# In ~/.claude/skills/
git clone https://github.com/freshtechbro/claudedesignskills
git clone https://github.com/greensock/gsap-skills
```

### Key GSAP Patterns Needed:
1. **ScrollTrigger pin + scrub** — hero video, Who It's For chapter shifts
2. **Horizontal scroll** — The System cards (pin container, translate cards horizontally on vertical scroll)
3. **Scroll-driven element position** — golf ball thread (translate Y based on scroll progress)
4. **Stacking cards** — testimonials (each card pins and the next slides up over it)
5. **Fade/reveal on scroll** — general section reveals

### Performance:
- Use `will-change: transform` on animated elements
- GPU-accelerated transforms only (translate, scale, opacity)
- Preload hero video
- Lazy load below-fold images
- Respect `prefers-reduced-motion`

### Vercel Deployment:
- vercel.json already in repo
- Static export or SSR both work
- Image optimisation via Next.js Image component

---

## Copy Document

All section copy is provided above in each section specification. Key lines:

**Positioning line:** "Launch monitors show what happened. Swing Path Pro helps you physically feel and correct why it happened."

**Hero words:** LET'S · GET · THAT · PERFECT · SWING · TOGETHER

**Problem headline:** "Golf coaching is data-rich but physically feel-poor."

**System headline:** "Built around feel, not screen time."

**CTA:** "Ready to feel the difference?"

**Footer:** © 2025–2026 Swing Path Pro · Patent #1408632 · Designed in South Africa

---

*This document is the single source of truth for the SPP website build. All design decisions are locked. Implementation begins in Claude Code with this file in `docs/design-references/`.*
