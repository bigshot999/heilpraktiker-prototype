# Heilpraktiker Website — Design Spec
**Date:** 2026-05-28  
**Project:** General prototype for a German Heilpraktiker practice  
**Fictional practitioner:** Anna Berger, Heilpraktikerin — Naturheilkunde & Ganzheitsmedizin, München  
**Stack:** Next.js + Tailwind CSS + Framer Motion

---

## 1. Goals

- Patient-centred conversion prototype showcasing the ideal Heilpraktiker website
- Primary conversion: "Kostenlose Erstberatung" booking modal (frontend-only, no backend)
- Secondary conversion: phone number (visible in nav and footer)
- Adaptable template — real clients swap content, CTA method, and brand assets

### Patient-Centred Copy Principle
**Every section must follow the Pain → Empathy → Solution arc.** Patients don't arrive looking for "Phytotherapie" — they arrive exhausted, frustrated, and often having already tried conventional medicine without lasting results. The site must first make them feel *seen and understood*, then offer a credible path forward.

- Lead with the patient's lived experience, not the practitioner's credentials
- Use "Sie" language throughout — the patient is always the subject
- Avoid clinical jargon; use plain, warm language
- Each section should answer the implicit patient question: *"But will this actually help ME?"*

---

## 2. Site Architecture

```
/                          Landing page (main conversion page)
/ueber-mich                About: Anna's story, credentials, philosophy
/leistungen/phytotherapie  Treatment detail page
/leistungen/homoeopathie
/leistungen/akupunktur
/leistungen/ernaehrungsberatung
/leistungen/stressmedizin
/faq                       Common patient questions
/impressum                 Legal (required in Germany)
/datenschutz               Privacy policy (required in Germany)
```

**Shared layout:** Sticky nav + footer on all pages. Booking modal available site-wide.

---

## 3. Design System

### Visual Direction
**Organic Warmth** — earthy botanicals meet warm, practitioner-forward personality. Old-world elegance, natural textures, intimate and trustworthy.

### Colors
| Role | Hex | Name |
|------|-----|------|
| Primary | `#3D6B4F` | Forest Green |
| Secondary | `#8FAF7E` | Soft Sage |
| CTA / Accent | `#C17B2D` | Warm Amber |
| Background | `#FAF7F2` | Warm Cream |
| Surface | `#F0EAE0` | Linen |
| Text | `#2C2418` | Dark Earth |
| Muted text | `#7a6e64` | Warm Grey |

**Section rhythm:** Cream → Linen → Cream → Linen → Forest Green (final CTA section)

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings | Cormorant Garamond | 400 italic / 600 |
| Body | Raleway | 300 / 400 / 500 / 600 |

- Body size: 16px min, line-height 1.65–1.75
- Heading line-height: 1.15
- Max line length: 65ch

### Animations (Framer Motion)
- **Page load:** Staggered fade-up (0.1s increments) for hero elements
- **Scroll-triggered:** `whileInView` fade-up for all sections (once, threshold 0.15)
- **Treatment cards:** `whileHover` translateY(-6px) + shadow deepens
- **CTA button:** `whileHover` translateY(-2px) + shadow intensifies
- **Booking modal:** Spring scale entrance (0.92→1) + backdrop blur fade
- **Testimonials slider:** Smooth slide with opacity cross-fade
- **Trust bar numbers:** Count-up animation on scroll-into-view
- **Hero cycling headline:** JS interval swap with fade-out/fade-in (2.5s)
- **Trust pills:** Gentle float loop (translateY 0→-5px, 3s ease-in-out)
- **Scroll indicator:** Line draws downward, loops, disappears on first scroll
- All animations respect `prefers-reduced-motion`

---

## 4. Navigation

**Desktop:** Sticky top nav, transparent on hero → solid `#FAF7F2` + shadow on scroll.
- Left: Logo (wordmark "Anna Berger" in Cormorant Garamond + "Heilpraktikerin" subtitle in Raleway)
- Center: Über mich · Leistungen (dropdown showing all 5 treatment names with links to /leistungen/[slug]) · FAQ
- Right: Phone number + primary CTA button "Termin buchen" (amber, rounded)

**Mobile:** Hamburger menu, full-screen overlay slide-in, same links stacked vertically.

---

## 5. Landing Page Sections

### 5.1 Hero
**Layout:** Split — text left (55%), practitioner photo right (45%)

**Left column (top → bottom):**
1. Location badge pill (dark dot + "Naturheilpraxis München", forest green bg tint)
2. Headline (Cormorant Garamond italic, 56px desktop): "Ihre Gesundheit," + cycling line rotating through: *natürlich geheilt. / ganzheitlich betreut. / neu gedacht.*
3. Body text (Raleway 16px, max 340px wide) — copy speaks directly to the patient's frustration: *"Viele meiner Patientinnen und Patienten kommen zu mir, weil sie das Gefühl haben, nicht wirklich gehört zu werden. Das ändert sich hier."*
4. CTAs: Primary amber button "Kostenlos kennenlernen →" + secondary text link "Leistungen entdecken"
5. Scroll indicator: animated line + "Weiter entdecken"

**Right column:**
- Practitioner photo in organic frame (border-radius: 32px 32px 32px 8px), soft green/earth gradient placeholder
- Name + title centred below photo
- Two trust pills side by side, floating (gentle loop animation): "150+ Patienten" + "12 Jahre Erfahrung"

**Background:** Warm Cream with two soft radial blob elements (sage green top-right, amber tint bottom-left)

### 5.2 Trust Bar
Full-width band (Linen background), 4 stat counters with count-up animation:
- `150+` Zufriedene Patienten
- `12` Jahre Erfahrung
- `5` Behandlungsmethoden
- `★ 4.9` Bewertung

Each stat: large number in Cormorant Garamond + label in Raleway small caps.

### 5.3 Pain Point Section — "Kennen Sie das?"
**Position:** Between Trust Bar and About Teaser. Linen background.
**Purpose:** Make the patient feel seen before introducing the solution. This is the highest-empathy section on the page — it names the patient's frustration explicitly.

**Layout:** Centred heading + 3 pain point cards side by side.

**Heading (Cormorant Garamond italic, large):** *"Kennen Sie das Gefühl?"*
**Subheading (Raleway, muted):** "Viele meiner Patientinnen und Patienten kommen mit genau diesen Erfahrungen zu mir."

**3 Pain point cards** (warm white, soft border, subtle icon):
1. *"Ich war beim Arzt, aber meine Beschwerden bleiben — niemand findet eine Ursache."*
2. *"Ich fühle mich erschöpft, gestresst und nicht mehr wie ich selbst."*
3. *"Ich möchte nicht einfach Tabletten nehmen — ich will verstehen, was mit mir nicht stimmt."*

Each card ends with a soft forest green resolution line:
→ *"Genau dafür bin ich da."*

**Below the cards:** A single amber CTA — "Ich helfe Ihnen weiter →" that opens the booking modal.

### 5.4 About Teaser
Split section — photo left (organic frame, different corner radius), text right.
- Eyebrow: "Über mich"
- Heading: "Medizin, die den Menschen sieht."
- Copy frames Anna's approach around the patient's experience, not her qualifications: *"Ich nehme mir die Zeit, die Sie verdienen. Nicht 7 Minuten — sondern so lange, bis wir gemeinsam verstehen, was Ihnen wirklich fehlt."*
- Secondary CTA: "Meine Geschichte →" linking to /ueber-mich

### 5.5 Treatments Grid
Eyebrow: "Meine Leistungen" — section intro reframes treatments as solutions to problems, not a service menu:

> *"Jede meiner Behandlungsmethoden zielt auf eine Sache ab: dass Sie sich wieder wohlfühlen — in Ihrem Körper, in Ihrem Alltag, in Ihrem Leben."*

5-column card grid on desktop, 2-col on tablet, 1-col on mobile. Cards stagger-animate in.

Each card:
- Coloured icon area (unique gradient per treatment, custom SVG icon)
- Treatment name (Raleway 700)
- One-line description (Raleway 400, muted)
- Benefit tag (sage green pill with checkmark + patient outcome — what the patient gains)
- "Mehr erfahren →" link

Treatments: Phytotherapie · Homöopathie · Akupunktur · Ernährungsberatung · Stressmedizin

### 5.6 How It Works
3-step horizontal flow (Cream background):
1. **Erstgespräch** — "Wir lernen uns kennen" (15 min, kostenlos, per Telefon oder vor Ort)
2. **Diagnose** — "Ich höre wirklich zu" (ganzheitliche Befunderhebung, ca. 60 min)
3. **Behandlung** — "Ihr individueller Heilplan" (auf Sie zugeschnitten)

Each step: large number (Cormorant Garamond, muted), icon, title, description. Connected by subtle dashed line on desktop.

### 5.6a Erstgespräch Explainer (patient certainty)
Directly below the "How It Works" steps, a soft linen callout box explains exactly what happens in the free consultation — patients need to know what they're committing to before they click. Content:

> **Was Sie im Erstgespräch erwartet:**
> - Ich höre Ihnen zu — ohne Zeitdruck, ohne Vorwürfe
> - Sie schildern, was Sie beschäftigt — ob körperlich, emotional oder beides
> - Ich erkläre, wie ich Ihnen helfen kann und welche Methoden passen könnten
> - Kein Verkaufsdruck. Kein Behandlungsvertrag. Nur ein offenes Gespräch.
> - **Dauer:** ca. 15 Minuten · **Kosten:** kostenlos · **Per Telefon oder vor Ort**

This block uses a soft forest green left border, cream background, Raleway 14px, and ends with a small amber CTA: "Jetzt Platz sichern →".

### 5.7 Testimonials Slider
Linen background. 4–5 fictional but HWG-compliant testimonials.
- Auto-advancing slider (4s interval), manual dot navigation
- Each slide: quote in Cormorant Garamond italic, patient first name + age, ★★★★★
- Smooth slide + opacity cross-fade transition

Example testimonials:
- *"Ich fühle mich bei Frau Berger wirklich verstanden. Das kannte ich so nicht."* — Sabine K., 47
- *"Nach Jahren habe ich endlich das Gefühl, dass jemand den ganzen Menschen sieht."* — Thomas M., 39
- *"Die Beratung war einfühlsam und hat mir geholfen, meinen Alltag besser zu gestalten."* — Maria L., 52

### 5.8 FAQ Teaser
3 top questions with accordion expand/collapse. Link to full /faq page.
- Für wen ist die Naturheilkunde geeignet?
- Übernimmt meine Krankenkasse die Kosten?
- Wie läuft das kostenlose Erstgespräch ab?

### 5.9 Booking CTA Section
Forest Green background, centred layout:
- Heading (Cormorant Garamond, cream): "Bereit für den ersten Schritt?"
- Subtext (Raleway, sage): "15 Minuten. Kostenlos. Unverbindlich."
- Primary CTA button (amber): "Jetzt Erstgespräch buchen"
- Secondary: phone number in cream

---

## 6. Booking Modal

Triggered by any CTA button. Backdrop: `rgba(44,36,24,0.55)` + `backdrop-filter: blur(4px)`.

**Modal box:** Warm Cream, border-radius 24px, spring scale entrance animation.

**Fields:**
- Name (text)
- E-Mail (email)
- Telefon (tel, optional)
- Anliegen (select dropdown with all 5 treatments + "Allgemeines Kennenlernen")
- Submit button (amber, full width): "Termin anfragen →"

**Reassurance note** below submit button (Raleway 11px, muted): "Was Sie erwartet: 15 Minuten, kostenlos, kein Verkaufsdruck — einfach ein offenes Gespräch."

**Success state:** Replaces form with green checkmark circle, "Vielen Dank!" heading, "Ich melde mich innerhalb von 24 Stunden bei Ihnen — per Telefon oder E-Mail, ganz wie es Ihnen lieber ist." message, practitioner sign-off.

---

## 7. Treatment Detail Pages (`/leistungen/[slug]`)

Shared template, content swapped per treatment:
- **Hero:** Treatment name + one-sentence patient benefit (no booking CTA yet — lower in page)
- **What is it:** 2–3 paragraphs explaining the treatment in plain language
- **Who is it for:** Bulleted list of conditions/situations it helps with
- **What to expect:** Step-by-step of a typical session
- **Booking CTA:** Full-width amber CTA to open booking modal
- **Related treatments:** 2–3 cards linking to other /leistungen pages

---

## 8. About Page (`/ueber-mich`)

- Large hero photo of practitioner
- Personal story (3–4 paragraphs): why she became a Heilpraktikerin
- Credentials section: qualifications, certifications, memberships
- Philosophy quote (Cormorant Garamond italic, large)
- Booking CTA at bottom

---

## 9. FAQ Page (`/faq`)

Full accordion list (~10 questions). Categories: Allgemein · Kosten & Versicherung · Behandlung · Erste Schritte. Booking CTA at bottom.

---

## 10. Legal Pages

`/impressum` and `/datenschutz` — standard German legal text, minimal layout, no CTA.

---

## 11. Footer

3-column layout (Linen background):
- Col 1: Logo + tagline + social icons (if applicable)
- Col 2: Schnelllinks (Über mich, Leistungen, FAQ, Kontakt)
- Col 3: Kontakt (address, phone, email, opening hours)

Bottom bar: Copyright + Impressum link + Datenschutz link

---

## 12. Accessibility & Performance

- WCAG AA contrast on all text (4.5:1 minimum)
- All images have alt text
- All form inputs have labels
- Focus states visible (forest green outline)
- `prefers-reduced-motion` disables all Framer Motion animations
- Next.js `Image` component for all photos (WebP, lazy loading, srcset)
- Google Fonts loaded via `next/font` for zero layout shift
- `z-index` scale: nav 50, modal 100
