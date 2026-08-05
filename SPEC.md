# Everything Bros — Website Spec

This is the source-of-truth spec for rebuilding the Everything Bros website. Built with Next.js, styled to feel like a premium local service business, deployed on Vercel.

Use this doc as the primary context file in Cursor. Build in the phases listed at the bottom — don't try to generate the whole site in one shot.

---

## 1. Project overview

**Business:** Everything Bros — a seasonal (May–September) exterior cleaning and home services business run by two college students, serving the Edmonds / Lynnwood / Mountlake Terrace, WA area (Snohomish County).

**Goal of the rebuild:** Replace a Canva link-in-bio site with a real, professional website that:
- Establishes trust (this looks like a real, insured-feeling local business, not a side hustle — even though it's run by two college students)
- Makes it dead simple to request a quote
- Clearly presents services and starting prices
- Is fast, mobile-first, and easy for the founders to update themselves later (or hand to someone else)

**Primary viewing target:** iPhone (mobile Safari). Design, layout, spacing, touch targets, and scroll behavior should be optimized for phone-first use. Desktop is a secondary target — the site must still look polished on larger screens, but mobile is the priority for every design decision.

**Non-goals for v1:** No online payments, no scheduling/booking calendar integration, no blog/CMS. Keep scope tight — a great single-purpose marketing site with a working contact form.

---

## 2. Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Forms:** Native form → Next.js Route Handler (`/app/api/contact/route.ts`) → email via [Resend](https://resend.com) (free tier is plenty). Fallback: mailto if Resend isn't set up yet.
- **Icons:** `lucide-react`
- **Fonts:** Google Fonts via `next/font` (see Design System)
- **Deployment:** Vercel, connected to a GitHub repo
- **Analytics:** Vercel Analytics (free, one-line install) — worth adding so your friend can see if the site is even getting traffic

---

## 3. Design system

**Direction:** "Modern trust" — deep navy base with an electric blue accent. Confident, clean, slightly tech-forward — reads as a real company, not a template.

### Colors (Tailwind config)
```
--color-navy-950: #0B1220   /* primary background, footer */
--color-navy-900: #0F1729   /* section alt background */
--color-navy-800: #16213A   /* card background on dark */
--color-blue-500: #3B82F6   /* primary accent — CTAs, links, highlights */
--color-blue-400: #60A5FA   /* accent hover/lighter */
--color-white:    #FFFFFF   /* light section background */
--color-slate-50: #F8FAFC   /* light section alt background */
--color-slate-600:#475569   /* body text on light */
--color-slate-300:#CBD5E1   /* body text on dark */
--color-slate-400:#94A3B8   /* muted text on dark */
```
Rule of thumb: alternate light (white/slate-50) and dark (navy-950/900) sections down the page for rhythm — don't make the whole site one giant dark page.

### Typography
- Headings: **Inter** (or "Geist" if available), weight 600–700
- Body: **Inter**, weight 400
- Scale: h1 40–56px, h2 32–36px, h3 20–24px, body 16–18px, small 14px
- Sentence case for headings (not Title Case), tight line-height on headings (1.1–1.2), relaxed on body (1.6–1.7)

### Components / patterns
- Buttons: solid blue-500 primary (`Get a free quote`), outline/ghost secondary (`Call now`, `See our work`)
- Cards: navy-800 on dark sections / white with subtle border+shadow on light sections, rounded-xl (12–16px)
- Section spacing: generous — py-20 to py-28 desktop, py-12 to py-16 mobile
- Icons paired with each service category (use lucide-react: e.g. `Droplets` for pressure washing, `Sparkles` for window cleaning, `Trash2` for junk removal, `Leaf` for moss removal, `HeartHandshake` for home assistance)

### Mobile / iPhone (primary target)
- **Design for iPhone first**, then scale up for tablet and desktop — test at 375px width (iPhone SE/mini) and 390–430px (standard iPhones).
- Use `viewport-fit: cover` and respect safe areas (`env(safe-area-inset-*)`) for notch and home indicator.
- Touch targets: minimum 44×44px for buttons, links, and form controls.
- Form inputs: at least 16px font size to prevent iOS zoom-on-focus.
- Single-column layouts on mobile; avoid horizontal scroll.
- Scroll behavior: soft section snapping (`scroll-snap-type: proximity`) on main content sections. The contact section and footer are **not** snap targets — users must be able to scroll freely into the footer without being pulled back to the quote form.

### Scroll / page rhythm
- Every snap section uses the same **panel** size as the hero: exactly one viewport (`100dvh`), with padding reserved for the fixed header/nav, a **top gap** (`--panel-top-gap`) below the nav, and iPhone safe areas. Content must fit inside the panel without internal scrolling.
- Scroll snapping uses `mandatory` + `snap-always` on each panel (similar to full-page portfolio / product landing sites) so each scroll lands on a full section.
- Implement via shared `PagePart` + `PANEL_CLASS` — do not one-off height styles per section.
- **Service area + testimonials** are one combined panel: map and neighborhoods on top, "What customers say" below (`#reviews` anchor for nav).
- Contact + footer use free scroll (`panel={false}`) — no snap-lock at the bottom of the page.

---

## 4. Site structure (single page, sectioned — with anchor nav)

Given the content volume, a well-organized single-page site (like the original) with a sticky nav that jumps to sections is the right call — not a multi-page site. Sections, in order:

1. **Header/Nav** — logo, sticky, links to sections (Services, Pricing, About, Reviews, Contact), phone number visible, "Get a quote" button always visible
2. **Hero** — headline, subhead, primary CTA, service area line, trust signals (e.g. "Serving Edmonds & Lynnwood" / "Free quotes"), placeholder for a hero image (real exterior-cleaning photo once available)
3. **Services overview** — two groups: "Exterior Services" and "Home Assistance Services", presented as icon cards, not a bare bullet dump like the original. Include the painting partner referral as a smaller callout, not a full section.
4. **Why choose us** — reframe from the original's competitive claims (see Content Notes below) into value-focused bullets
5. **Pricing** — clean table/card layout of starting prices with the disclaimer clearly visible directly beneath it, not buried
6. **About** — founders' story + two founder cards (photo, name, role, short bio)
7. **Testimonials** — quote card(s), with a "leave a review" CTA linking out
8. **Service area** — map + list of neighborhoods served + seasonal availability note
9. **Contact / quote form** — the main conversion point. Fields: name, phone, email, address/neighborhood, service(s) interested in (checkboxes), message, optional photo upload (nice-to-have, can be v2). On submit: email to `everythingbros23@gmail.com` via Resend, show a success state, no page reload.
10. **Footer** — logo, tagline, quick links, contact info, social icons, seasonal availability note, copyright

---

## 5. Content (verbatim from the current site — use as-is, refine only where noted)

### Hero
- Headline: "Everything Bros"
- Subhead: "Premium Home Services"
- Body: "Professional exterior cleaning and home services for homeowners who want reliable, high-quality work."
- Service tags: Window Cleaning • Pressure Washing • Gutter Cleaning • Junk Removal • Concierge Services • And Everything in Between

### Exterior Services
- **Pressure washing** — Driveways, Patios/Decks, Sidewalks/Walkways, Siding, Fences
- **Soft washing** — House Wash, Fence, Deck
- **Gutter cleaning** — Gutter Cleanouts, Downspout Clearing
- **Junk removal**
- **Garbage bin cleaning**
- **Window Cleaning** — Interior & Exterior, Screens, Tracks, Skylights, Sliding Glass Doors
- **Moss Removal** — Roof Moss Removal (Moss Treatment, Moss Removal, Roof Cleanup), Ground Moss Removal
- **Lawn Mowing**

### Home Assistance Services
Grocery/Pharmacy Runs, Senior Companionship, Dog Walking, Store Returns, Tech Support, House Cleaning, House Sitting, Garage Cleaning, Donation Pickup/Delivery

### Painting partner callout
"Need painting? We partner with JC Painting Pro, a trusted local painting company. Contact us and we'll connect you with them for a free estimate."

### Why choose us
Reliable communication, high-quality work, friendly local service, flexible scheduling, fast response times, great for busy homeowners and seniors, we treat every job like it matters.

> ⚠️ **Content note:** Drop "Cheaper than all local competitors" — it's a claim that ages badly, invites price-matching arguments, and undercuts the "premium" positioning the rest of the site is going for. Suggest replacing with something like "Transparent, upfront pricing" instead. Flag this to your friend rather than deciding unilaterally.

### Pricing (starting prices)
| Service | Starting price |
|---|---|
| Driveway Cleaning | $79 |
| Gutter Cleaning | $99 |
| Window Cleaning | $119 |
| House Washing | $199 |
| Moss Treatment | $149 |
| Junk Removal | $75 |
| Garbage Bin Cleaning | $25 |
| Home Assistance | $20 |

Disclaimer: "Prices shown are starting prices and may vary based on property size, accessibility, condition, project scope, and travel requirements. Contact us for a free personalized quote."

### About
"The Everything Bros" — Founded by two best friends with a simple goal: to deliver quality work homeowners can trust.

**Cavan Schillinger, Co-founder** — 2025 graduate of Edmonds-Woodway High School, studying Finance at Washington State University. Played basketball and tennis all four years of high school while developing a strong interest in business, marketing, and entrepreneurship. At WSU, involved with the Women's Basketball Scout Team, campus business clubs, and founder of a marketing agency (@cavancreativeco) focused on helping local businesses grow through content creation and social media strategy.

**Kaiden Davies, Co-founder** — 2025 graduate of Edmonds-Woodway High School, studying Business at Santa Clara University. Competed in basketball, cross country, and track all four years while building a strong work ethic through athletics and business experience. Previously ran a lawn care business in Edmonds that supported Washington Kids in Transition, a local charity organization. Enjoys golf, basketball, and entrepreneurship outside of school and business.

*(Placeholder photos until real ones are supplied — use simple initials avatars, not stock photos of strangers.)*

### Testimonial
"Cavan did an excellent job! He is hardworking and will get the job done right. I highly recommend Cavan for your service needs." — Gwen R., Lynnwood

> ⚠️ **Content note:** One testimonial is thin for a "would you pay for this" site. Worth asking your friend to collect 2–3 more before launch — even short ones. Build the section to support 3+ from the start so it doesn't look sparse.

### Service area / contact
- Phone: (408) 840-8299
- Email: everythingbros23@gmail.com
- Instagram + Facebook (need actual handles/links — placeholder for now)
- Neighborhoods: Edmonds, The Bowl of Edmonds, Pine Park, Woodway, Esperance, Perrinville, Lynnwood, Cedar Valley, Alderwood, Mountlake Terrace, Brier
- Seasonal note: "Everything Bros operates seasonally from May–September. Summer 2026 availability."

---

## 6. Open items to get from your friend before/while building

- [ ] Real Instagram and Facebook page URLs (currently just icons with no confirmed links)
- [ ] 3–6 real photos: before/afters, the guys on a job, truck/equipment — even phone photos are far better than stock or placeholders
- [ ] 2–3 more testimonials if possible
- [ ] A domain name (e.g. everythingbros.com or similar) to connect in Vercel
- [ ] Decision on the "cheaper than competitors" line (see content note above)
- [ ] Confirm whether Resend (or another email provider) account should be set up, or if a simple mailto fallback is fine for launch

---

## 7. Build plan (do this in order in Cursor — one phase per session/commit)

1. **Scaffold** — `create-next-app` (TypeScript, Tailwind, App Router, no src dir needed), set up folder structure, install `lucide-react`, configure fonts and Tailwind theme from Section 3
2. **Layout shell** — header/nav (sticky, mobile menu), footer, base page wrapper with section anchors
3. **Static sections** — Hero → Services → Why Choose Us → Pricing → About → Testimonials → Service Area, using the content in Section 5. Build with placeholder images (simple colored blocks or icon-based illustrations, not stock photos of random people)
4. **Contact form** — form UI, client-side validation, `/api/contact` route handler, Resend integration (or mailto fallback), success/error states
5. **Polish pass** — responsive check at 375px / 768px / 1440px, scroll-to-section nav behavior, hover/focus states, meta tags + Open Graph image, favicon
6. **Deploy** — push to GitHub, connect to Vercel, set environment variables (Resend API key), verify production build, connect custom domain once your friend has one

Each phase should be a working, viewable state — don't move to the next phase with a broken build.
