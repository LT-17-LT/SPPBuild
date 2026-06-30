@AGENTS.md

# Swing Path Pro — Website Build

## Project Context
This is a premium golf training product website for Swing Path Pro, a physical-feedback coaching station built in South Africa. The site must serve coaches, fitting studios, indoor golf centres, distributors, and serious players — without diluting the premium feel for any audience.

## Design Brief
The complete section-by-section specification is in:
`docs/design-references/SPP_Website_Design_Brief_v1.md`

READ THIS FILE IN FULL BEFORE WRITING ANY CODE. Every section, colour, font, animation, and content decision is locked in that document.

## Design Reference Sites
Study these for their specific patterns (noted in the brief):
- indigo-laboratory.it — hero treatment, chapter reveals, premium feel
- wolverineworldwide.com — floating images, footer bar style
- sohub.digital — overlapping stacking cards animation
- apple.com/macbook-pro — scroll-scrubbed video

## GSAP Skills
Ensure these are installed in ~/.claude/skills/ before building:
- freshtechbro/claudedesignskills (GSAP, ScrollTrigger, Three.js patterns)
- greensock/gsap-skills (official GSAP ScrollTrigger skill)

## Key Animation Patterns Required
1. Scroll-scrubbed video (hero)
2. Scroll-driven word replacement animation (hero)
3. Parallax floating elements (problem section — golf balls)
4. Scroll-driven element tracking (golf ball thread between sections)
5. Horizontal scroll cards (The System — pin + horizontal translate)
6. Pinned section with content transformation (Who It's For — chapter shifts)
7. Stacking/overlapping cards on scroll (Testimonials)
8. Scroll-driven finale animation (ball rolling into hole)

## Colour Palette
- Green Deep: #09140b (hero, dark sections)
- Green: #173f22 (primary accent)
- Green 2: #355534 (secondary)
- Moss: #748466 (body text on dark)
- Gold: #C9A84C (premium accent, CTAs, TOGETHER word)
- Paper: #f3f1ec (primary background — warm cream)
- Full palette in the design brief

## Typography
- Display: Playfair Display (Google Fonts) — titles, quotes
- Body/UI: Inter (Google Fonts) — everything else
- Hero words: Inter 800, massive scale

## Rules
- Do NOT use navy/teal. This is a green + gold + cream palette.
- Do NOT use border-radius on full-bleed sections.
- Do NOT add placeholder lorem ipsum — all copy is provided in the brief.
- Do NOT skip the golf ball visual thread — it connects the entire site narrative.
- DO respect prefers-reduced-motion.
- DO use GPU-accelerated transforms only (translate, scale, opacity).
- DO preload the hero video asset.
