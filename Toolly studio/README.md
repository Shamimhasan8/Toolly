# Toolly Studio

Toolly Studio is an all-in-one developer and productivity utility suite featuring **37 interactive browser tools** across 7 categories.

---

## 🛠️ Tool Catalog (37 Built-in Tools)

### 1. Text Utilities
- **Word & Character Counter** — Real-time word, character, sentence, and reading-time metrics
- **Case Converter** — UPPERCASE, lowercase, camelCase, PascalCase, snake_case, kebab-case, Title Case
- **Lorem Ipsum Generator** — Configurable paragraphs, sentences, and words generator
- **Text Reverser** — Reverse strings, words, and character orders
- **Duplicate Line Remover** — Deduplicate lines with case-sensitivity and trimming options
- **Whitespace Cleaner** — Strip trailing spaces, normalize tabs, and condense multi-newlines

### 2. Developer Tools
- **JSON Formatter & Validator** — Prettify, minify, validate syntax, and explore JSON trees
- **Base64 Encoder / Decoder** — Encode and decode text and binary payloads safely
- **URL Encoder / Decoder** — Encode URI components and parse query parameters
- **JWT Decoder** — Inspect headers, payloads, signatures, and expiration without secrets
- **Hash Generator** — MD5, SHA-1, SHA-256, and SHA-512 cryptographic digests
- **UUID / GUID Generator** — Version 4 RFC-compliant unique IDs (single or batch)
- **HTML Entity Encoder** — Convert special symbols into HTML entities and reverse

### 3. Converters
- **Color Converter** — Convert HEX, RGB, HSL, HSV, and CMYK formats
- **Number Base Converter** — Binary, Octal, Decimal, and Hexadecimal conversion
- **Unit Converter** — Length, weight, temperature, area, volume, and digital storage
- **Roman Numeral Converter** — Convert between Arabic numbers and Roman numerals
- **CSV to JSON Converter** — Parse tabular CSV data into structured JSON objects
- **Timestamp Converter** — Convert Unix timestamps (seconds/ms) to local & UTC datetimes

### 4. Calculators
- **Percentage Calculator** — X% of Y, percentage increase/decrease, ratios
- **Age Calculator** — Exact age in years, months, days, and next birthday countdown
- **BMI Calculator** — Body Mass Index calculator with health categories
- **Loan & Mortgage Calculator** — Monthly payments, total interest, and amortization
- **Tip Calculator** — Tip splits, service percentages, and per-person totals
- **Compound Interest Calculator** — Investment growth with monthly contribution tracking

### 5. Generators
- **QR Code Generator** — Generate high-resolution SVG and PNG QR codes with styling
- **Password Generator** — Cryptographically secure randomized passwords with rules
- **Color Palette Generator** — Harmonious color schemes (monochromatic, complementary, triadic)
- **CSS Gradient Generator** — Linear and radial CSS gradient builder with CSS export

### 6. Web & SEO Tools
- **Meta Tag Generator** — Title, description, viewport, robots, and canonical tags
- **Open Graph Generator** — Social media preview cards for Twitter, Facebook, and LinkedIn
- **Robots.txt Generator** — Generate crawler rules and sitemap directives

### 7. AI Assistants
- **AI Summarizer** — Concise, bulleted, and key-point summaries
- **AI Grammar & Spell Checker** — Polish syntax, punctuation, and wording
- **AI Rewriter** — Adjust tone (professional, casual, persuasive)
- **AI Translator** — Multi-language text translation
- **AI Code Explainer** — Structured, plain-English breakdown of code snippets

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun

### 1. Install Dependencies
```bash
npm install
# or
bun install
```

### 2. Environment Setup (Optional)
Create a `.env` file in this directory:
```env
# Optional: Connect OpenAI or compatible API for live LLM responses
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
```
*(Note: If no API key is provided, all 32 client-side tools run 100% locally, and AI tools operate in intelligent fallback mode)*

### 3. Run Development Server
```bash
npm run dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Directory Structure

```
Toolly studio/
├── src/
│   ├── app/                # Next.js App Router pages & API routes
│   │   ├── api/ai/         # AI endpoint handlers (summarize, grammar, etc.)
│   │   ├── globals.css     # Global theme & styling
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Studio workspace page
│   ├── components/
│   │   ├── home/           # Studio header, hero, search, and category filter
│   │   ├── layout/         # SiteHeader, SiteFooter
│   │   ├── tool/           # Tool workspace & preview wrapper
│   │   ├── tools/          # 37 Individual Tool Components
│   │   └── ui/             # Radix UI / Shadcn accessible design system
│   ├── hooks/              # Custom React hooks
│   └── lib/
│       ├── ai.ts           # Resilient AI helper with OpenAI & fallback
│       └── tools/          # Tool registry, metadata, and category definitions
├── public/                 # Static icons and assets
├── prisma/                 # Database schema
├── db/                     # Local SQLite database
├── next.config.ts          # Optimized Next.js configuration
├── package.json            # Project dependencies & scripts
└── tsconfig.json           # TypeScript configuration
```
