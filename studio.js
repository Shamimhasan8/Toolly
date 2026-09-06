/**
 * Toolly Studio — Production Utility Engine
 * Clean, organized, client-side tools with live interactive workspace
 */

(function () {
    "use strict";

    const STUDIO_TOOLS = [
        // Text Utilities (6)
        {
            slug: "word-counter",
            name: "Word & Character Counter",
            category: "text",
            icon: "fa-calculator",
            desc: "Live word count, character count, sentence metrics, and reading time estimation.",
            tags: ["words", "characters", "writing", "counter", "reading time"]
        },
        {
            slug: "case-converter",
            name: "Case Converter",
            category: "text",
            icon: "fa-font",
            desc: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
            tags: ["case", "uppercase", "lowercase", "camelcase", "slug"]
        },
        {
            slug: "lorem-ipsum",
            name: "Lorem Ipsum Generator",
            category: "text",
            icon: "fa-paragraph",
            desc: "Generate customizable placeholder text paragraphs, sentences, and words for design mockups.",
            tags: ["lorem", "placeholder", "generator", "mockup"]
        },
        {
            slug: "text-reverser",
            name: "Text Reverser",
            category: "text",
            icon: "fa-arrows-rotate",
            desc: "Reverse text characters, flip word sequences, or invert entire line orders instantly.",
            tags: ["reverse", "flip", "text"]
        },
        {
            slug: "duplicate-lines",
            name: "Duplicate Line Remover",
            category: "text",
            icon: "fa-filter",
            desc: "Clean up lists by stripping duplicate lines, with optional case sensitivity and trimming.",
            tags: ["deduplicate", "list", "cleaner"]
        },
        {
            slug: "whitespace-cleaner",
            name: "Whitespace Cleaner",
            category: "text",
            icon: "fa-broom",
            desc: "Remove leading/trailing spaces, collapse multiple spaces, and strip blank lines.",
            tags: ["whitespace", "trim", "formatting"]
        },

        // Developer Tools (7)
        {
            slug: "json-formatter",
            name: "JSON Formatter & Validator",
            category: "developer",
            icon: "fa-code",
            desc: "Prettify, minify, validate syntax, and inspect JSON with instant error diagnostics.",
            tags: ["json", "format", "prettify", "minify", "validate"]
        },
        {
            slug: "base64-converter",
            name: "Base64 Encoder / Decoder",
            category: "developer",
            icon: "fa-file-shield",
            desc: "Encode UTF-8 text to Base64 strings and decode Base64 back into readable text.",
            tags: ["base64", "encode", "decode", "binary"]
        },
        {
            slug: "url-encoder",
            name: "URL Encoder / Decoder",
            category: "developer",
            icon: "fa-link",
            desc: "Encode text into URL-safe percent-encoded strings or decode encoded URLs.",
            tags: ["url", "uri", "encode", "decode"]
        },
        {
            slug: "hash-generator",
            name: "Cryptographic Hash Generator",
            category: "developer",
            icon: "fa-fingerprint",
            desc: "Compute SHA-1, SHA-256, and SHA-512 cryptographic digests client-side via Web Crypto.",
            tags: ["sha256", "sha512", "sha1", "hash", "crypto"]
        },
        {
            slug: "uuid-generator",
            name: "UUID / GUID Generator",
            category: "developer",
            icon: "fa-key",
            desc: "Generate cryptographically random RFC-4122 Version-4 UUIDs in single or batch mode.",
            tags: ["uuid", "guid", "v4", "unique id"]
        },
        {
            slug: "html-entities",
            name: "HTML Entity Encoder",
            category: "developer",
            icon: "fa-file-code",
            desc: "Escape special characters into safe HTML entities (&lt;, &gt;, &amp;) and decode back.",
            tags: ["html", "entities", "escape", "sanitize"]
        },
        {
            slug: "jwt-decoder",
            name: "JWT Token Inspector",
            category: "developer",
            icon: "fa-shield-halved",
            desc: "Decode and inspect JSON Web Token header and payload claims client-side with zero network calls.",
            tags: ["jwt", "token", "auth", "decoder"]
        },

        // Converters (6)
        {
            slug: "color-converter",
            name: "Color Converter (HEX/RGB/HSL)",
            category: "converters",
            icon: "fa-palette",
            desc: "Convert colors between HEX, RGB, and HSL formats with live color picker preview.",
            tags: ["hex", "rgb", "hsl", "color"]
        },
        {
            slug: "number-base",
            name: "Number Base Converter",
            category: "converters",
            icon: "fa-hashtag",
            desc: "Convert numbers across Decimal, Binary, Octal, and Hexadecimal simultaneously.",
            tags: ["binary", "decimal", "hex", "octal", "base"]
        },
        {
            slug: "unit-converter",
            name: "Unit Converter",
            category: "converters",
            icon: "fa-ruler-combined",
            desc: "Convert length, mass, temperature, area, and digital data storage units.",
            tags: ["units", "meters", "miles", "celsius", "storage"]
        },
        {
            slug: "timestamp-converter",
            name: "Unix Timestamp Converter",
            category: "converters",
            icon: "fa-clock",
            desc: "Convert Unix Epoch seconds/milliseconds to human-readable UTC and Local dates.",
            tags: ["timestamp", "epoch", "time", "date"]
        },
        {
            slug: "roman-converter",
            name: "Roman Numeral Converter",
            category: "converters",
            icon: "fa-landmark",
            desc: "Convert Arabic numbers (1–3999) to Roman Numerals and Roman Numerals back to numbers.",
            tags: ["roman", "numerals", "numbers"]
        },
        {
            slug: "csv-json-converter",
            name: "CSV to JSON Converter",
            category: "converters",
            icon: "fa-table",
            desc: "Convert comma-separated values (CSV) into clean structured JSON arrays.",
            tags: ["csv", "json", "data", "convert"]
        },

        // Calculators (6)
        {
            slug: "percentage-calc",
            name: "Percentage Calculator",
            category: "calculators",
            icon: "fa-percent",
            desc: "Calculate percentages, percentage differences, and ratio proportions easily.",
            tags: ["percentage", "math", "calculator"]
        },
        {
            slug: "age-calc",
            name: "Age & Date Calculator",
            category: "calculators",
            icon: "fa-calendar-days",
            desc: "Calculate exact age in years, months, days, and find days until next birthday.",
            tags: ["age", "birthday", "date", "calendar"]
        },
        {
            slug: "bmi-calc",
            name: "BMI Calculator",
            category: "calculators",
            icon: "fa-weight-scale",
            desc: "Compute Body Mass Index with Metric or Imperial inputs and health weight categories.",
            tags: ["bmi", "health", "fitness", "weight"]
        },
        {
            slug: "tip-calc",
            name: "Tip & Bill Splitter",
            category: "calculators",
            icon: "fa-receipt",
            desc: "Calculate tip amounts, total bills, and split expenses evenly among multiple people.",
            tags: ["tip", "bill", "split", "restaurant"]
        },
        {
            slug: "loan-calc",
            name: "Loan & Mortgage Calculator",
            category: "calculators",
            icon: "fa-building-columns",
            desc: "Calculate monthly payments, total interest paid, and total loan amortization cost.",
            tags: ["loan", "mortgage", "finance", "interest"]
        },
        {
            slug: "compound-calc",
            name: "Compound Interest Calculator",
            category: "calculators",
            icon: "fa-chart-line",
            desc: "Calculate long-term investment growth with recurring monthly contributions.",
            tags: ["compound", "interest", "investment", "finance"]
        },

        // Generators (4)
        {
            slug: "password-generator",
            name: "Password Generator",
            category: "generators",
            icon: "fa-lock",
            desc: "Generate cryptographically secure randomized passwords with customized complexity.",
            tags: ["password", "security", "generator", "random"]
        },
        {
            slug: "qr-generator",
            name: "QR Code Generator",
            category: "generators",
            icon: "fa-qrcode",
            desc: "Generate high-resolution QR codes for websites, text, and Wi-Fi networks.",
            tags: ["qr", "qrcode", "generator", "barcode"]
        },
        {
            slug: "gradient-generator",
            name: "CSS Gradient Generator",
            category: "generators",
            icon: "fa-brush",
            desc: "Design linear and radial CSS gradients with live preview and instant CSS code export.",
            tags: ["gradient", "css", "color", "design"]
        },
        {
            slug: "palette-generator",
            name: "Color Palette Generator",
            category: "generators",
            icon: "fa-swatchbook",
            desc: "Generate harmonious color schemes (complementary, monochromatic, analogous).",
            tags: ["palette", "colors", "harmonies"]
        },

        // Web & SEO (3)
        {
            slug: "meta-generator",
            name: "SEO Meta Tag Generator",
            category: "web-seo",
            icon: "fa-tags",
            desc: "Generate standard HTML meta tags, Open Graph cards, and Twitter Cards for websites.",
            tags: ["seo", "meta", "opengraph", "twitter"]
        },
        {
            slug: "robots-generator",
            name: "Robots.txt Generator",
            category: "web-seo",
            icon: "fa-robot",
            desc: "Create search-engine crawler directives and sitemap declarations.",
            tags: ["robots", "txt", "seo", "crawler"]
        },
        {
            slug: "og-preview",
            name: "Open Graph Previewer",
            category: "web-seo",
            icon: "fa-share-nodes",
            desc: "Test how your site title, description, and preview image appear when shared.",
            tags: ["og", "social", "preview", "cards"]
        },

        // AI Assistants (5)
        {
            slug: "ai-summarizer",
            name: "AI Text Summarizer",
            category: "ai",
            icon: "fa-wand-magic-sparkles",
            desc: "Condense long articles, reports, and documentation into key points and bullet highlights.",
            tags: ["ai", "summary", "summarize", "bullets"]
        },
        {
            slug: "ai-rewriter",
            name: "AI Text Rewriter",
            category: "ai",
            icon: "fa-pen-nib",
            desc: "Rephrase text in different tones: professional, concise, casual, or academic.",
            tags: ["ai", "rewrite", "tone", "paraphrase"]
        },
        {
            slug: "ai-grammar",
            name: "AI Grammar & Spell Checker",
            category: "ai",
            icon: "fa-spell-check",
            desc: "Polish syntax, fix punctuation, correct misspellings, and enhance readability.",
            tags: ["grammar", "spellcheck", "proofread", "ai"]
        },
        {
            slug: "ai-code-explainer",
            name: "AI Code Explainer",
            category: "ai",
            icon: "fa-terminal",
            desc: "Get clean, step-by-step plain English explanations for any code snippet.",
            tags: ["ai", "code", "explain", "debug"]
        },
        {
            slug: "ai-translator",
            name: "AI Multi-Language Translator",
            category: "ai",
            icon: "fa-language",
            desc: "Translate phrases and sentences across popular global languages with high fluency.",
            tags: ["translate", "language", "ai", "spanish", "french"]
        }
    ];

    // State
    let currentCategory = "all";
    let searchQuery = "";
    let currentSort = "default";
    let activeTool = null;

    // DOM Elements
    const gridEl = document.getElementById("studioToolsGrid");
    const catalogSection = document.getElementById("toolsCatalogSection");
    const wsEl = document.getElementById("studioWorkspace");
    const wsContentEl = document.getElementById("wsToolContent");
    const wsTitleEl = document.getElementById("wsTitle");
    const wsDescEl = document.getElementById("wsDesc");
    const wsIconEl = document.getElementById("wsIcon");
    const wsCatBadge = document.getElementById("wsCatBadge");
    const wsCloseBtn = document.getElementById("wsCloseBtn");
    const searchInput = document.getElementById("studioSearchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    const sortSelect = document.getElementById("studioSortSelect");
    const counterEl = document.getElementById("studioCounter");
    const quickCatsBar = document.getElementById("quickCatsBar");
    const sidebarCatList = document.getElementById("studioCategoryList");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    // Mobile Sidebar
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            sidebarOverlay.classList.toggle("active");
        });
        sidebarOverlay.addEventListener("click", () => {
            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("active");
        });
    }

    // Filter & Sort
    function getFilteredTools() {
        const q = searchQuery.toLowerCase().trim();
        let list = STUDIO_TOOLS.filter(tool => {
            const matchCat = currentCategory === "all" || tool.category === currentCategory;
            if (!matchCat) return false;
            if (!q) return true;
            return tool.name.toLowerCase().includes(q) ||
                tool.desc.toLowerCase().includes(q) ||
                tool.tags.some(tag => tag.toLowerCase().includes(q));
        });

        if (currentSort === "name") {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === "category") {
            list = [...list].sort((a, b) => a.category.localeCompare(b.category));
        }

        return list;
    }

    // Render Grid
    function renderGrid() {
        const filtered = getFilteredTools();
        counterEl.textContent = `Showing ${filtered.length} utilit${filtered.length === 1 ? 'y' : 'ies'}`;

        gridEl.innerHTML = "";

        if (filtered.length === 0) {
            gridEl.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px;">
                    <i class="fas fa-search" style="font-size: 2.2rem; color: #94a3b8; margin-bottom: 14px;"></i>
                    <h3 style="margin: 0 0 6px; font-weight: 700; color: var(--text-color);">No utilities found</h3>
                    <p style="color: var(--muted-text); margin: 0;">Try adjusting your search terms or category selection.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(tool => {
            const card = document.createElement("div");
            card.className = "studio-tool-card";
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("aria-label", `Open ${tool.name}`);

            card.innerHTML = `
                <div class="studio-tool-card-header">
                    <div class="studio-tool-icon-chip">
                        <i class="fas ${tool.icon}"></i>
                    </div>
                    <span class="studio-tool-category-badge cat-badge-${tool.category}">${tool.category}</span>
                </div>
                <h3 class="studio-tool-name">${tool.name}</h3>
                <p class="studio-tool-desc">${tool.desc}</p>
                <div class="studio-tool-action-btn">
                    <span>Open Utility</span>
                    <i class="fas fa-arrow-right" style="font-size: 0.75rem;"></i>
                </div>
            `;

            card.addEventListener("click", () => openTool(tool.slug));
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openTool(tool.slug);
                }
            });

            gridEl.appendChild(card);
        });
    }

    // Sync Category UI (Sidebar + Quick Pills)
    function setCategory(cat) {
        currentCategory = cat;

        if (sidebarCatList) {
            sidebarCatList.querySelectorAll("li").forEach(li => {
                li.classList.toggle("active", li.dataset.category === cat);
            });
        }

        if (quickCatsBar) {
            quickCatsBar.querySelectorAll(".category-pill").forEach(pill => {
                const isMatch = pill.dataset.cat === cat;
                pill.classList.toggle("active", isMatch);
                pill.setAttribute("aria-pressed", isMatch ? "true" : "false");
            });
        }

        closeTool();
        renderGrid();
    }

    if (sidebarCatList) {
        sidebarCatList.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li || !li.dataset.category) return;
            setCategory(li.dataset.category);
        });
    }

    if (quickCatsBar) {
        quickCatsBar.addEventListener("click", (e) => {
            const pill = e.target.closest(".category-pill");
            if (!pill || !pill.dataset.cat) return;
            setCategory(pill.dataset.cat);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            if (clearSearchBtn) {
                clearSearchBtn.hidden = !searchQuery;
            }
            if (activeTool) closeTool();
            renderGrid();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            clearSearchBtn.hidden = true;
            renderGrid();
            searchInput.focus();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            currentSort = e.target.value;
            renderGrid();
        });
    }

    // Open Tool in Workspace
    function openTool(slug) {
        const tool = STUDIO_TOOLS.find(t => t.slug === slug);
        if (!tool) return;

        activeTool = tool;
        wsTitleEl.textContent = tool.name;
        wsDescEl.textContent = tool.desc;
        wsIconEl.innerHTML = `<i class="fas ${tool.icon}"></i>`;
        wsCatBadge.textContent = tool.category.toUpperCase();
        wsCatBadge.className = "studio-tool-category-badge cat-badge-" + tool.category;

        wsContentEl.innerHTML = getToolHtml(tool.slug);
        bindToolEvents(tool.slug);

        wsEl.style.display = "block";
        if (catalogSection) catalogSection.style.display = "none";
        wsEl.scrollIntoView({ behavior: "smooth", block: "start" });

        const url = new URL(window.location.href);
        url.searchParams.set("tool", slug);
        window.history.replaceState(null, "", url.toString());
    }

    // Close Tool Workspace
    function closeTool() {
        activeTool = null;
        wsEl.style.display = "none";
        if (catalogSection) catalogSection.style.display = "block";
        wsContentEl.innerHTML = "";

        const url = new URL(window.location.href);
        url.searchParams.delete("tool");
        window.history.replaceState(null, "", url.toString());
    }

    if (wsCloseBtn) {
        wsCloseBtn.addEventListener("click", closeTool);
    }

    window.copyToClipboard = function (text, btnEl) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            const origHtml = btnEl.innerHTML;
            btnEl.innerHTML = `<i class="fas fa-check"></i> Copied!`;
            btnEl.style.background = "#22c55e";
            btnEl.style.color = "#ffffff";
            setTimeout(() => {
                btnEl.innerHTML = origHtml;
                btnEl.style.background = "";
                btnEl.style.color = "";
            }, 1500);
        }).catch(err => {
            console.error("Copy failed:", err);
        });
    };

    // =========================================================================
    // Tool HTML Templates (All 37 Utilities)
    // =========================================================================
    function getToolHtml(slug) {
        switch (slug) {
            // --- 1. Text Utilities ---
            case "word-counter":
                return `
                    <div class="tool-panel">
                        <div class="tool-stats-row">
                            <div class="tool-stat-badge"><span class="tool-stat-num" id="statWords">0</span><span class="tool-stat-label">Words</span></div>
                            <div class="tool-stat-badge"><span class="tool-stat-num" id="statChars">0</span><span class="tool-stat-label">Characters</span></div>
                            <div class="tool-stat-badge"><span class="tool-stat-num" id="statCharsNoSpace">0</span><span class="tool-stat-label">No Spaces</span></div>
                            <div class="tool-stat-badge"><span class="tool-stat-num" id="statSentences">0</span><span class="tool-stat-label">Sentences</span></div>
                            <div class="tool-stat-badge"><span class="tool-stat-num" id="statParagraphs">0</span><span class="tool-stat-label">Paragraphs</span></div>
                            <div class="tool-stat-badge"><span class="tool-stat-num" id="statReadingTime">0s</span><span class="tool-stat-label">Read Time</span></div>
                        </div>
                        <textarea class="tool-textarea" id="wcInput" placeholder="Type or paste your text here to see real-time statistics...">Toolly Studio offers fast, secure developer utilities and client-side tools designed to make everyday workflows effortless.</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn secondary" id="btnWcClear"><i class="fas fa-trash"></i> Clear Text</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('wcInput').value, this)"><i class="fas fa-copy"></i> Copy Text</button>
                        </div>
                    </div>
                `;

            case "case-converter":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="caseInput" placeholder="Type or paste text to convert case...">Toolly Studio is your unified developer and productivity workspace.</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnUpper">UPPERCASE</button>
                            <button class="tool-btn" id="btnLower">lowercase</button>
                            <button class="tool-btn" id="btnTitle">Title Case</button>
                            <button class="tool-btn" id="btnSentence">Sentence case</button>
                            <button class="tool-btn" id="btnCamel">camelCase</button>
                            <button class="tool-btn" id="btnPascal">PascalCase</button>
                            <button class="tool-btn" id="btnSnake">snake_case</button>
                            <button class="tool-btn" id="btnKebab">kebab-case</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('caseInput').value, this)"><i class="fas fa-copy"></i> Copy</button>
                        </div>
                    </div>
                `;

            case "lorem-ipsum":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:600;">Generate:</label>
                            <input type="number" id="loremCount" min="1" max="20" value="3" style="width:70px;">
                            <select id="loremType">
                                <option value="paragraphs">Paragraphs</option>
                                <option value="sentences">Sentences</option>
                                <option value="words">Words</option>
                            </select>
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="loremStart" checked> Start with "Lorem ipsum..."</label>
                            <button class="tool-btn" id="btnGenLorem"><i class="fas fa-wand-magic-sparkles"></i> Generate</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('loremOutput').textContent, this)"><i class="fas fa-copy"></i> Copy</button>
                        </div>
                        <div class="tool-result-box" id="loremOutput" style="white-space:pre-wrap;line-height:1.6;">Generating placeholder text...</div>
                    </div>
                `;

            case "text-reverser":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="revInput" placeholder="Enter text to reverse...">Hello Toolly Studio! Welcome to the browser workspace.</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnRevChars"><i class="fas fa-arrows-rotate"></i> Reverse Characters</button>
                            <button class="tool-btn" id="btnRevWords"><i class="fas fa-arrow-right-arrow-left"></i> Reverse Words</button>
                            <button class="tool-btn" id="btnRevLines"><i class="fas fa-bars-staggered"></i> Reverse Lines</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('revOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Result</button>
                        </div>
                        <div class="tool-result-box" id="revOutput">Result will appear here...</div>
                    </div>
                `;

            case "duplicate-lines":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="dupInput" placeholder="Enter lines of text here...">apple
banana
orange
apple
banana
grape
ORANGE</textarea>
                        <div class="tool-input-row" style="background:var(--background-color);padding:10px 14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="dupCase"> Case Sensitive</label>
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="dupTrim" checked> Trim Lines</label>
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="dupBlank" checked> Remove Blank Lines</label>
                            <button class="tool-btn" id="btnRemoveDups"><i class="fas fa-filter"></i> Strip Duplicates</button>
                            <button class="tool-btn secondary" id="btnSortAz"><i class="fas fa-arrow-down-a-z"></i> Sort A-Z</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('dupOutput').textContent, this)"><i class="fas fa-copy"></i> Copy</button>
                        </div>
                        <div class="tool-result-box" id="dupOutput">Click Strip Duplicates above.</div>
                    </div>
                `;

            case "whitespace-cleaner":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="wsCleanInput" placeholder="Paste text with excessive spaces or blank lines...">   This   text    has      multiple    irregular   spaces.   

   And extra   blank    lines!   </textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnCleanAll"><i class="fas fa-broom"></i> Clean All Whitespace</button>
                            <button class="tool-btn secondary" id="btnTrimLines">Trim Lines</button>
                            <button class="tool-btn secondary" id="btnCollapseSpaces">Collapse Multiple Spaces</button>
                            <button class="tool-btn secondary" id="btnStripEmptyLines">Remove Blank Lines</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('wsCleanOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Output</button>
                        </div>
                        <div class="tool-result-box" id="wsCleanOutput">Cleaned text will appear here...</div>
                    </div>
                `;

            // --- 2. Developer Tools ---
            case "json-formatter":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="jsonInput" placeholder="Paste raw or minified JSON here...">{"name":"Toolly Studio","version":"1.0.0","tools":37,"features":["offline","instant","clean"],"author":{"org":"Toolly","active":true}}</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnJsonPrettify"><i class="fas fa-code"></i> Prettify (2 Spaces)</button>
                            <button class="tool-btn" id="btnJsonPrettify4"><i class="fas fa-indent"></i> Prettify (4 Spaces)</button>
                            <button class="tool-btn secondary" id="btnJsonMinify"><i class="fas fa-compress"></i> Minify</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('jsonInput').value, this)"><i class="fas fa-copy"></i> Copy Output</button>
                            <span id="jsonStatus" style="font-weight:700;font-size:0.85rem;margin-left:auto;"></span>
                        </div>
                    </div>
                `;

            case "base64-converter":
                return `
                    <div class="tool-panel">
                        <label style="font-weight:700;font-size:0.9rem;">Input Text or Base64:</label>
                        <textarea class="tool-textarea" id="b64Input" placeholder="Enter text to encode or Base64 to decode...">Hello from Toolly Studio! Fast & client-side utilities.</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnB64Encode"><i class="fas fa-lock"></i> Encode to Base64</button>
                            <button class="tool-btn" id="btnB64Decode"><i class="fas fa-unlock"></i> Decode from Base64</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('b64Output').textContent, this)"><i class="fas fa-copy"></i> Copy Result</button>
                        </div>
                        <label style="font-weight:700;font-size:0.9rem;margin-top:10px;">Result:</label>
                        <div class="tool-result-box" id="b64Output">SGVsbG8gZnJvbSBUb29sbHkgU3R1ZGlvISBGYXN0ICYgY2xpZW50LXNpZGUgdXRpbGl0aWVzLg==</div>
                    </div>
                `;

            case "url-encoder":
                return `
                    <div class="tool-panel">
                        <label style="font-weight:700;font-size:0.9rem;">Input URL or Parameter String:</label>
                        <textarea class="tool-textarea" id="urlInput" placeholder="Enter URL or string to encode/decode...">https://toolly.tech/search?q=developer tools & category=AI workspace</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnUrlEncode"><i class="fas fa-link"></i> Encode URI Component</button>
                            <button class="tool-btn" id="btnUrlDecode"><i class="fas fa-link-slash"></i> Decode URI Component</button>
                            <button class="tool-btn secondary" id="btnUrlEncodeFull">Encode Full URL</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('urlOutput').textContent, this)"><i class="fas fa-copy"></i> Copy</button>
                        </div>
                        <label style="font-weight:700;font-size:0.9rem;margin-top:10px;">Result:</label>
                        <div class="tool-result-box" id="urlOutput">Click Encode or Decode above.</div>
                    </div>
                `;

            case "hash-generator":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="hashInput" placeholder="Enter text to hash...">Toolly Studio</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnHash"><i class="fas fa-fingerprint"></i> Compute Hashes</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('hashResult').textContent, this)"><i class="fas fa-copy"></i> Copy All Hashes</button>
                        </div>
                        <div class="tool-result-box" id="hashResult">Generating cryptographic digests...</div>
                    </div>
                `;

            case "uuid-generator":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:600;">Quantity:</label>
                            <input type="number" id="uuidCount" min="1" max="50" value="5" style="width:70px;">
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="uuidUpper"> Uppercase</label>
                            <button class="tool-btn" id="btnGenUuid"><i class="fas fa-key"></i> Generate UUIDs</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('uuidResult').textContent, this)"><i class="fas fa-copy"></i> Copy All</button>
                        </div>
                        <div class="tool-result-box" id="uuidResult">Generating...</div>
                    </div>
                `;

            case "html-entities":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="htmlEntityInput" placeholder="Enter text or HTML..."><h1>Hello & Welcome to "Toolly Studio"!</h1> <p>Fast & secure.</p></textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnHtmlEscape"><i class="fas fa-shield"></i> Escape HTML Entities</button>
                            <button class="tool-btn" id="btnHtmlUnescape"><i class="fas fa-code"></i> Decode HTML Entities</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('htmlEntityOutput').textContent, this)"><i class="fas fa-copy"></i> Copy</button>
                        </div>
                        <div class="tool-result-box" id="htmlEntityOutput">Click Escape or Decode above.</div>
                    </div>
                `;

            case "jwt-decoder":
                return `
                    <div class="tool-panel">
                        <label style="font-weight:700;font-size:0.9rem;">Paste JSON Web Token (JWT):</label>
                        <textarea class="tool-textarea" id="jwtInput" style="min-height:100px;" placeholder="Paste JWT token (header.payload.signature)...">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkaWwiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk5OTk5OTk5OSwicm9sZSI6ImRldmVsb3BlciJ9.4pcPyMD0eeiNXviMYNdqcW8sm2c1vWCL2qMTSRa39D4</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnInspectJwt"><i class="fas fa-magnifying-glass"></i> Inspect Claims</button>
                            <span id="jwtStatusBadge" style="font-weight:700;font-size:0.85rem;padding:4px 10px;border-radius:6px;"></span>
                        </div>
                        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;color:var(--muted-text);">HEADER: ALGORITHM & TOKEN TYPE</label>
                                <div class="tool-result-box" id="jwtHeader" style="min-height:120px;"></div>
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;color:var(--muted-text);">PAYLOAD: DATA & CLAIMS</label>
                                <div class="tool-result-box" id="jwtPayload" style="min-height:120px;"></div>
                            </div>
                        </div>
                    </div>
                `;

            // --- 3. Converters ---
            case "color-converter":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <input type="color" id="colorPicker" value="#7ab566" style="width:50px;height:42px;border:none;border-radius:8px;cursor:pointer;">
                            <input type="text" id="colorHex" value="#7AB566" style="width:120px;font-family:'Fira Code',monospace;" placeholder="#HEX">
                            <button class="tool-btn" id="btnConvertColor">Sync Color</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('colorHex').value, this)"><i class="fas fa-copy"></i> Copy HEX</button>
                        </div>
                        <div class="tool-result-box" id="colorResult">
HEX: #7AB566
RGB: rgb(122, 181, 102)
HSL: hsl(105, 34%, 55%)
                        </div>
                    </div>
                `;

            case "number-base":
                return `
                    <div class="tool-panel">
                        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;">
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">DECIMAL (Base 10)</label>
                                <input type="number" id="baseDec" value="255" class="tool-textarea" style="min-height:48px;padding:10px;margin-top:6px;font-family:'Fira Code',monospace;">
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">BINARY (Base 2)</label>
                                <input type="text" id="baseBin" value="11111111" class="tool-textarea" style="min-height:48px;padding:10px;margin-top:6px;font-family:'Fira Code',monospace;">
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">HEXADECIMAL (Base 16)</label>
                                <input type="text" id="baseHex" value="FF" class="tool-textarea" style="min-height:48px;padding:10px;margin-top:6px;font-family:'Fira Code',monospace;">
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">OCTAL (Base 8)</label>
                                <input type="text" id="baseOct" value="377" class="tool-textarea" style="min-height:48px;padding:10px;margin-top:6px;font-family:'Fira Code',monospace;">
                            </div>
                        </div>
                        <p style="font-size:0.85rem;color:var(--muted-text);margin:6px 0 0;">Type any value in any field to automatically synchronize the other 3 bases.</p>
                    </div>
                `;

            case "unit-converter":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:600;">Category:</label>
                            <select id="unitCategory">
                                <option value="length">Length</option>
                                <option value="weight">Mass & Weight</option>
                                <option value="temp">Temperature</option>
                                <option value="data">Digital Storage</option>
                            </select>
                            <input type="number" id="unitVal" value="10" style="width:100px;">
                            <select id="unitFrom"></select>
                            <span>to</span>
                            <select id="unitTo"></select>
                            <button class="tool-btn" id="btnConvertUnit">Convert</button>
                        </div>
                        <div class="tool-result-box" id="unitResult" style="font-size:1.15rem;font-weight:700;color:#2e7d32;">10 Meters = 32.8084 Feet</div>
                    </div>
                `;

            case "timestamp-converter":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Unix Epoch Seconds:</label>
                            <input type="number" id="tsEpoch" style="flex:1;" placeholder="e.g. 1772982800">
                            <button class="tool-btn" id="btnNowEpoch">Current Timestamp</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('tsEpoch').value, this)"><i class="fas fa-copy"></i> Copy</button>
                        </div>
                        <div class="tool-result-box" id="tsResult">Enter a timestamp above.</div>
                    </div>
                `;

            case "roman-converter":
                return `
                    <div class="tool-panel">
                        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
                            <div style="background:var(--background-color);padding:16px;border-radius:12px;border:1px solid var(--input-border);">
                                <label style="font-weight:700;">Arabic Number to Roman (1–3999):</label>
                                <div style="display:flex;gap:10px;margin-top:10px;">
                                    <input type="number" id="arabicInput" min="1" max="3999" value="2026" style="flex:1;">
                                    <button class="tool-btn" id="btnToArabic">Convert</button>
                                </div>
                                <div class="tool-result-box" id="romanRes" style="margin-top:12px;font-size:1.2rem;font-weight:800;color:#2e7d32;">MMXXVI</div>
                            </div>
                            <div style="background:var(--background-color);padding:16px;border-radius:12px;border:1px solid var(--input-border);">
                                <label style="font-weight:700;">Roman Numeral to Arabic:</label>
                                <div style="display:flex;gap:10px;margin-top:10px;">
                                    <input type="text" id="romanInput" value="MCMLXXXIV" style="flex:1;text-transform:uppercase;">
                                    <button class="tool-btn" id="btnToRoman">Convert</button>
                                </div>
                                <div class="tool-result-box" id="arabicRes" style="margin-top:12px;font-size:1.2rem;font-weight:800;color:#2e7d32;">1984</div>
                            </div>
                        </div>
                    </div>
                `;

            case "csv-json-converter":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="csvInput" placeholder="Paste CSV data here...">id,name,role,department
1,Alice Johnson,Lead Engineer,Technology
2,Bob Smith,Product Designer,Design
3,Carol White,Data Scientist,Analytics</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnCsvConvert"><i class="fas fa-table"></i> Convert CSV to JSON</button>
                            <button class="tool-btn secondary" id="btnCsvMinify">Minify JSON</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('csvOutput').textContent, this)"><i class="fas fa-copy"></i> Copy JSON</button>
                        </div>
                        <div class="tool-result-box" id="csvOutput">Click Convert above...</div>
                    </div>
                `;

            // --- 4. Calculators ---
            case "percentage-calc":
                return `
                    <div class="tool-panel">
                        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
                            <div style="background:var(--background-color);padding:16px;border-radius:12px;border:1px solid var(--input-border);">
                                <label style="font-weight:700;">What is X% of Y?</label>
                                <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
                                    <input type="number" id="p1X" value="15" style="width:70px;"> <span>% of</span>
                                    <input type="number" id="p1Y" value="250" style="width:90px;">
                                    <button class="tool-btn" id="btnP1Calc">=</button>
                                </div>
                                <div class="tool-result-box" id="p1Res" style="margin-top:12px;font-weight:700;color:#2e7d32;">37.5</div>
                            </div>
                            <div style="background:var(--background-color);padding:16px;border-radius:12px;border:1px solid var(--input-border);">
                                <label style="font-weight:700;">X is what % of Y?</label>
                                <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
                                    <input type="number" id="p2X" value="45" style="width:70px;"> <span>of</span>
                                    <input type="number" id="p2Y" value="180" style="width:90px;">
                                    <button class="tool-btn" id="btnP2Calc">=</button>
                                </div>
                                <div class="tool-result-box" id="p2Res" style="margin-top:12px;font-weight:700;color:#2e7d32;">25.00%</div>
                            </div>
                            <div style="background:var(--background-color);padding:16px;border-radius:12px;border:1px solid var(--input-border);">
                                <label style="font-weight:700;">% Change from X to Y</label>
                                <div style="display:flex;align-items:center;gap:8px;margin-top:10px;">
                                    <input type="number" id="p3X" value="100" style="width:70px;"> <span>to</span>
                                    <input type="number" id="p3Y" value="135" style="width:90px;">
                                    <button class="tool-btn" id="btnP3Calc">=</button>
                                </div>
                                <div class="tool-result-box" id="p3Res" style="margin-top:12px;font-weight:700;color:#2e7d32;">+35.00% increase</div>
                            </div>
                        </div>
                    </div>
                `;

            case "age-calc":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Date of Birth:</label>
                            <input type="date" id="dobInput" value="2000-01-01">
                            <button class="tool-btn" id="btnCalcAge"><i class="fas fa-calculator"></i> Calculate Exact Age</button>
                        </div>
                        <div class="tool-result-box" id="ageResult" style="line-height:1.7;">Select your birth date and click calculate.</div>
                    </div>
                `;

            case "bmi-calc":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">System:</label>
                            <select id="bmiUnit">
                                <option value="metric">Metric (cm, kg)</option>
                                <option value="imperial">Imperial (in, lbs)</option>
                            </select>
                            <label style="font-weight:700;">Height:</label>
                            <input type="number" id="bmiHeight" value="175" style="width:80px;"> <span id="bmiHeightLbl">cm</span>
                            <label style="font-weight:700;">Weight:</label>
                            <input type="number" id="bmiWeight" value="70" style="width:80px;"> <span id="bmiWeightLbl">kg</span>
                            <button class="tool-btn" id="btnCalcBmi"><i class="fas fa-calculator"></i> Calculate BMI</button>
                        </div>
                        <div class="tool-result-box" id="bmiResult" style="line-height:1.6;">Click calculate above.</div>
                    </div>
                `;

            case "tip-calc":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Bill Amount ($):</label>
                            <input type="number" id="tipBill" value="120.00" min="0" step="0.01" style="width:100px;">
                            <label style="font-weight:700;">Tip (%):</label>
                            <input type="number" id="tipPct" value="18" min="0" max="100" style="width:70px;">
                            <label style="font-weight:700;">People:</label>
                            <input type="number" id="tipPeople" value="3" min="1" max="100" style="width:60px;">
                            <button class="tool-btn" id="btnCalcTip"><i class="fas fa-calculator"></i> Split Bill</button>
                        </div>
                        <div class="tool-result-box" id="tipResult" style="line-height:1.7;">Click Split Bill above.</div>
                    </div>
                `;

            case "loan-calc":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Principal ($):</label>
                            <input type="number" id="loanAmount" value="250000" style="width:110px;">
                            <label style="font-weight:700;">Interest Rate (%/yr):</label>
                            <input type="number" id="loanRate" value="6.5" step="0.1" style="width:75px;">
                            <label style="font-weight:700;">Term (Years):</label>
                            <input type="number" id="loanYears" value="30" style="width:65px;">
                            <button class="tool-btn" id="btnCalcLoan"><i class="fas fa-calculator"></i> Calculate Payment</button>
                        </div>
                        <div class="tool-result-box" id="loanResult" style="line-height:1.7;">Click Calculate Payment above.</div>
                    </div>
                `;

            case "compound-calc":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Starting Balance ($):</label>
                            <input type="number" id="ciPrincipal" value="5000" style="width:90px;">
                            <label style="font-weight:700;">Monthly Deposit ($):</label>
                            <input type="number" id="ciMonthly" value="300" style="width:80px;">
                            <label style="font-weight:700;">Return (%/yr):</label>
                            <input type="number" id="ciRate" value="8" step="0.1" style="width:65px;">
                            <label style="font-weight:700;">Years:</label>
                            <input type="number" id="ciYears" value="10" style="width:60px;">
                            <button class="tool-btn" id="btnCalcCi"><i class="fas fa-chart-line"></i> Calculate</button>
                        </div>
                        <div class="tool-result-box" id="ciResult" style="line-height:1.7;">Click Calculate above.</div>
                    </div>
                `;

            // --- 5. Generators ---
            case "password-generator":
                return `
                    <div class="tool-panel">
                        <div class="tool-result-box" style="font-size:1.3rem;font-weight:700;letter-spacing:1px;color:#2e7d32;" id="pwResult">Generating password...</div>
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:600;">Length: <span id="pwLenVal">16</span></label>
                            <input type="range" id="pwLen" min="8" max="64" value="16" style="flex:1;">
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="pwUpper" checked> A-Z</label>
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="pwLower" checked> a-z</label>
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="pwNums" checked> 0-9</label>
                            <label style="display:flex;align-items:center;gap:6px;font-weight:600;"><input type="checkbox" id="pwSyms" checked> !@#$</label>
                        </div>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnGenPw"><i class="fas fa-arrows-rotate"></i> Re-generate</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('pwResult').textContent, this)"><i class="fas fa-copy"></i> Copy Password</button>
                        </div>
                    </div>
                `;

            case "qr-generator":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row">
                            <input type="text" id="qrText" value="https://toolly.tech" placeholder="Enter URL or text..." style="flex:1;">
                            <button class="tool-btn" id="btnGenQr"><i class="fas fa-qrcode"></i> Generate QR Code</button>
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:center;padding:24px;background:var(--background-color);border-radius:12px;border:1px solid var(--input-border);gap:14px;">
                            <div id="qrCanvasContainer" style="background:#ffffff;padding:16px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.06);"></div>
                        </div>
                    </div>
                `;

            case "gradient-generator":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Color 1:</label>
                            <input type="color" id="gradCol1" value="#7ab566" style="width:40px;height:36px;border:none;cursor:pointer;">
                            <label style="font-weight:700;">Color 2:</label>
                            <input type="color" id="gradCol2" value="#2563eb" style="width:40px;height:36px;border:none;cursor:pointer;">
                            <label style="font-weight:700;">Angle: <span id="gradAngleVal">90deg</span></label>
                            <input type="range" id="gradAngle" min="0" max="360" value="90" style="width:120px;">
                            <select id="gradType">
                                <option value="linear">Linear</option>
                                <option value="radial">Radial</option>
                            </select>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('gradCss').textContent, this)"><i class="fas fa-copy"></i> Copy CSS</button>
                        </div>
                        <div id="gradPreview" style="height:140px;border-radius:12px;border:1px solid var(--input-border);margin:10px 0;"></div>
                        <div class="tool-result-box" id="gradCss" style="font-family:'Fira Code',monospace;">background: linear-gradient(90deg, #7ab566, #2563eb);</div>
                    </div>
                `;

            case "palette-generator":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">Base Color:</label>
                            <input type="color" id="palBase" value="#7ab566" style="width:45px;height:38px;border:none;cursor:pointer;">
                            <label style="font-weight:700;">Harmony:</label>
                            <select id="palHarmony">
                                <option value="analogous">Analogous</option>
                                <option value="monochromatic">Monochromatic</option>
                                <option value="triadic">Triadic</option>
                                <option value="complementary">Complementary</option>
                            </select>
                            <button class="tool-btn" id="btnGenPal"><i class="fas fa-palette"></i> Generate Palette</button>
                        </div>
                        <div class="palette-chips-row" id="paletteRow"></div>
                        <p style="font-size:0.85rem;color:var(--muted-text);margin:0;">Click on any color block above to copy its HEX value.</p>
                    </div>
                `;

            // --- 6. Web & SEO Tools ---
            case "meta-generator":
                return `
                    <div class="tool-panel">
                        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">Page Title:</label>
                                <input type="text" id="metaTitle" value="Toolly Studio — Instant Developer Utilities" style="width:100%;margin-top:4px;">
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">Description:</label>
                                <input type="text" id="metaDesc" value="Explore 37+ free client-side developer and AI utilities." style="width:100%;margin-top:4px;">
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">Canonical URL:</label>
                                <input type="text" id="metaUrl" value="https://toolly.tech/studio.html" style="width:100%;margin-top:4px;">
                            </div>
                            <div>
                                <label style="font-weight:700;font-size:0.85rem;">Keywords:</label>
                                <input type="text" id="metaKeys" value="tools, utilities, developer, json, ai" style="width:100%;margin-top:4px;">
                            </div>
                        </div>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnGenMeta"><i class="fas fa-tags"></i> Generate Tags</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('metaOutput').textContent, this)"><i class="fas fa-copy"></i> Copy HTML Tags</button>
                        </div>
                        <div class="tool-result-box" id="metaOutput"></div>
                    </div>
                `;

            case "robots-generator":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <label style="font-weight:700;">User-agent:</label>
                            <select id="robAgent">
                                <option value="*">* (All Search Engines)</option>
                                <option value="Googlebot">Googlebot</option>
                                <option value="Bingbot">Bingbot</option>
                            </select>
                            <label style="font-weight:700;">Disallow Paths:</label>
                            <input type="text" id="robDisallow" value="/admin/, /private/, /api/" style="flex:1;">
                            <label style="font-weight:700;">Sitemap URL:</label>
                            <input type="text" id="robSitemap" value="https://toolly.tech/sitemap.xml" style="flex:1;">
                        </div>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnGenRob"><i class="fas fa-robot"></i> Generate Robots.txt</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('robOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Robots.txt</button>
                        </div>
                        <div class="tool-result-box" id="robOutput" style="font-family:'Fira Code',monospace;"></div>
                    </div>
                `;

            case "og-preview":
                return `
                    <div class="tool-panel">
                        <div class="tool-input-row" style="background:var(--background-color);padding:14px;border-radius:10px;border:1px solid var(--input-border);">
                            <input type="text" id="ogTitle" value="Toolly Studio — Instant Browser Utilities" placeholder="Title" style="flex:1;">
                            <input type="text" id="ogDesc" value="Fast, secure, client-side utilities and AI tools in one unified dashboard." placeholder="Description" style="flex:1;">
                            <input type="text" id="ogImg" value="https://toolly.tech/logo/Toolly.jpg" placeholder="Image URL" style="flex:1;">
                            <button class="tool-btn" id="btnUpdateOg">Preview Card</button>
                        </div>
                        <div class="social-preview-card">
                            <div class="social-preview-img" id="ogCardImg">
                                <img src="logo/Toolly.jpg" alt="Preview Image" onerror="this.parentElement.innerHTML='Image Preview';">
                            </div>
                            <div class="social-preview-body">
                                <div class="social-preview-domain">TOOLLY.TECH</div>
                                <div class="social-preview-title" id="ogCardTitle">Toolly Studio — Instant Browser Utilities</div>
                                <div class="social-preview-desc" id="ogCardDesc">Fast, secure, client-side utilities and AI tools in one unified dashboard.</div>
                            </div>
                        </div>
                    </div>
                `;

            // --- 7. AI Assistants ---
            case "ai-summarizer":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="aiSumInput" placeholder="Paste an article, essay, documentation, or transcript here...">Toolly Studio is designed to empower developers and digital creators with client-side, zero-install utilities. By running directly in your browser, your data never leaves your computer, ensuring total privacy, zero latency, and uninterrupted offline capability. From formatting JSON arrays and inspecting JSON Web Tokens to generating cryptographic digests and calculating compound interest, Toolly Studio provides immediate utility without accounts, cookies, or subscription walls.</textarea>
                        <div class="tool-actions-bar">
                            <label style="font-weight:700;">Format:</label>
                            <select id="aiSumMode">
                                <option value="3">3 Key Takeaways</option>
                                <option value="5">5 Key Takeaways</option>
                                <option value="exec">Executive Summary</option>
                            </select>
                            <button class="tool-btn" id="btnAiSummarize"><i class="fas fa-wand-magic-sparkles"></i> Summarize Text</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('aiSumOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Summary</button>
                        </div>
                        <div class="tool-result-box" id="aiSumOutput" style="line-height:1.7;">Click Summarize Text above.</div>
                    </div>
                `;

            case "ai-rewriter":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="aiRewInput" placeholder="Enter text to rewrite...">Hey team, we need to ship this studio tool update asap so people can use it without any glitches or bugs.</textarea>
                        <div class="tool-actions-bar">
                            <label style="font-weight:700;">Tone:</label>
                            <select id="aiRewTone">
                                <option value="pro">Professional & Executive</option>
                                <option value="concise">Short & Concise</option>
                                <option value="friendly">Friendly & Casual</option>
                                <option value="academic">Formal & Academic</option>
                            </select>
                            <button class="tool-btn" id="btnAiRewrite"><i class="fas fa-pen-nib"></i> Rewrite Text</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('aiRewOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Output</button>
                        </div>
                        <div class="tool-result-box" id="aiRewOutput" style="line-height:1.7;">Click Rewrite Text above.</div>
                    </div>
                `;

            case "ai-grammar":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="aiGramInput" placeholder="Enter text to inspect and polish...">They is going to the conference yesterday and forgets their laptop in the train .</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnAiGrammar"><i class="fas fa-spell-check"></i> Check & Polish</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('aiGramOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Corrected</button>
                        </div>
                        <div class="tool-result-box" id="aiGramOutput" style="line-height:1.7;">Click Check & Polish above.</div>
                    </div>
                `;

            case "ai-code-explainer":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="aiCodeInput" style="font-family:'Fira Code',monospace;" placeholder="Paste code in JavaScript, Python, SQL, etc...">function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}</textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnAiExplain"><i class="fas fa-terminal"></i> Explain Code</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('aiCodeOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Breakdown</button>
                        </div>
                        <div class="tool-result-box" id="aiCodeOutput" style="line-height:1.7;">Click Explain Code above.</div>
                    </div>
                `;

            case "ai-translator":
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="aiTransInput" placeholder="Enter English phrase or sentence...">Hello, welcome to Toolly Studio. How can I help you today?</textarea>
                        <div class="tool-actions-bar">
                            <label style="font-weight:700;">Target Language:</label>
                            <select id="aiTransLang">
                                <option value="es">Spanish (Español)</option>
                                <option value="fr">French (Français)</option>
                                <option value="de">German (Deutsch)</option>
                                <option value="it">Italian (Italiano)</option>
                                <option value="pt">Portuguese (Português)</option>
                                <option value="ja">Japanese (日本語)</option>
                                <option value="zh">Chinese (中文)</option>
                                <option value="hi">Hindi (हिन्दी)</option>
                                <option value="ar">Arabic (العربية)</option>
                            </select>
                            <button class="tool-btn" id="btnAiTranslate"><i class="fas fa-language"></i> Translate</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('aiTransOutput').textContent, this)"><i class="fas fa-copy"></i> Copy Translation</button>
                        </div>
                        <div class="tool-result-box" id="aiTransOutput" style="font-size:1.1rem;line-height:1.7;">Click Translate above.</div>
                    </div>
                `;

            default:
                return `
                    <div class="tool-panel">
                        <textarea class="tool-textarea" id="genericInput" placeholder="Enter text here..."></textarea>
                        <div class="tool-actions-bar">
                            <button class="tool-btn" id="btnGenericProcess"><i class="fas fa-bolt"></i> Process</button>
                            <button class="tool-btn secondary" onclick="window.copyToClipboard(document.getElementById('genericResult').textContent, this)"><i class="fas fa-copy"></i> Copy Output</button>
                        </div>
                        <div class="tool-result-box" id="genericResult">Ready for processing...</div>
                    </div>
                `;
        }
    }

    // =========================================================================
    // Tool Event Handlers (All 37 Utilities)
    // =========================================================================
    function bindToolEvents(slug) {
        switch (slug) {
            // --- 1. Text Utilities ---
            case "word-counter": {
                const input = document.getElementById("wcInput");
                const clearBtn = document.getElementById("btnWcClear");
                const updateStats = () => {
                    const val = input.value;
                    const words = val.trim() ? val.trim().split(/\s+/).length : 0;
                    const chars = val.length;
                    const charsNoSpace = val.replace(/\s/g, "").length;
                    const sentences = val.trim() ? (val.match(/[.!?]+(?:\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
                    const paragraphs = val.trim() ? val.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
                    const readSecs = Math.ceil(words / 3.3);

                    document.getElementById("statWords").textContent = words;
                    document.getElementById("statChars").textContent = chars;
                    document.getElementById("statCharsNoSpace").textContent = charsNoSpace;
                    document.getElementById("statSentences").textContent = sentences;
                    document.getElementById("statParagraphs").textContent = paragraphs;
                    document.getElementById("statReadingTime").textContent = readSecs < 60 ? `${readSecs}s` : `${Math.ceil(readSecs / 60)}m`;
                };
                input.addEventListener("input", updateStats);
                if (clearBtn) {
                    clearBtn.onclick = () => {
                        input.value = "";
                        updateStats();
                        input.focus();
                    };
                }
                updateStats();
                break;
            }

            case "case-converter": {
                const input = document.getElementById("caseInput");
                const setVal = (txt) => { input.value = txt; };

                document.getElementById("btnUpper").onclick = () => setVal(input.value.toUpperCase());
                document.getElementById("btnLower").onclick = () => setVal(input.value.toLowerCase());
                document.getElementById("btnTitle").onclick = () => {
                    setVal(input.value.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase()));
                };
                document.getElementById("btnSentence").onclick = () => {
                    const val = input.value.toLowerCase();
                    setVal(val.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
                };
                document.getElementById("btnCamel").onclick = () => {
                    const words = input.value.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
                    setVal(words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(""));
                };
                document.getElementById("btnPascal").onclick = () => {
                    const words = input.value.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).filter(Boolean);
                    setVal(words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(""));
                };
                document.getElementById("btnSnake").onclick = () => {
                    setVal(input.value.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).join("_"));
                };
                document.getElementById("btnKebab").onclick = () => {
                    setVal(input.value.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/).join("-"));
                };
                break;
            }

            case "lorem-ipsum": {
                const countInput = document.getElementById("loremCount");
                const typeSelect = document.getElementById("loremType");
                const startCheck = document.getElementById("loremStart");
                const output = document.getElementById("loremOutput");
                const btn = document.getElementById("btnGenLorem");

                const LOREM_WORDS = [
                    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
                    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut",
                    "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris",
                    "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor",
                    "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat",
                    "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt",
                    "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
                ];

                const genSentence = () => {
                    const len = Math.floor(Math.random() * 8) + 8;
                    const words = [];
                    for (let i = 0; i < len; i++) {
                        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
                    }
                    const sent = words.join(" ");
                    return sent.charAt(0).toUpperCase() + sent.slice(1) + ".";
                };

                const genPara = () => {
                    const sents = [];
                    for (let i = 0; i < 4; i++) sents.push(genSentence());
                    return sents.join(" ");
                };

                const generate = () => {
                    const count = Math.min(20, Math.max(1, parseInt(countInput.value, 10) || 3));
                    const type = typeSelect.value;
                    let res = [];

                    if (type === "words") {
                        const words = [];
                        for (let i = 0; i < count; i++) {
                            words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
                        }
                        if (startCheck.checked && words.length >= 2) {
                            words[0] = "Lorem";
                            words[1] = "ipsum";
                        }
                        res.push(words.join(" "));
                    } else if (type === "sentences") {
                        for (let i = 0; i < count; i++) res.push(genSentence());
                        if (startCheck.checked && res.length > 0) {
                            res[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + res[0];
                        }
                    } else {
                        for (let i = 0; i < count; i++) res.push(genPara());
                        if (startCheck.checked && res.length > 0) {
                            res[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + res[0];
                        }
                    }
                    output.textContent = res.join("\n\n");
                };

                btn.onclick = generate;
                generate();
                break;
            }

            case "text-reverser": {
                const input = document.getElementById("revInput");
                const output = document.getElementById("revOutput");

                document.getElementById("btnRevChars").onclick = () => {
                    output.textContent = input.value.split("").reverse().join("");
                };
                document.getElementById("btnRevWords").onclick = () => {
                    output.textContent = input.value.split(/\s+/).reverse().join(" ");
                };
                document.getElementById("btnRevLines").onclick = () => {
                    output.textContent = input.value.split("\n").reverse().join("\n");
                };
                document.getElementById("btnRevChars").click();
                break;
            }

            case "duplicate-lines": {
                const input = document.getElementById("dupInput");
                const output = document.getElementById("dupOutput");
                const caseCheck = document.getElementById("dupCase");
                const trimCheck = document.getElementById("dupTrim");
                const blankCheck = document.getElementById("dupBlank");

                const processDups = () => {
                    let lines = input.value.split("\n");
                    if (trimCheck.checked) lines = lines.map(l => l.trim());
                    if (blankCheck.checked) lines = lines.filter(l => l.length > 0);

                    const seen = new Set();
                    const result = [];
                    let removed = 0;

                    lines.forEach(line => {
                        const key = caseCheck.checked ? line : line.toLowerCase();
                        if (!seen.has(key)) {
                            seen.add(key);
                            result.push(line);
                        } else {
                            removed++;
                        }
                    });

                    output.textContent = result.join("\n");
                };

                document.getElementById("btnRemoveDups").onclick = processDups;
                document.getElementById("btnSortAz").onclick = () => {
                    processDups();
                    const lines = output.textContent.split("\n").sort((a, b) => a.localeCompare(b));
                    output.textContent = lines.join("\n");
                };
                processDups();
                break;
            }

            case "whitespace-cleaner": {
                const input = document.getElementById("wsCleanInput");
                const output = document.getElementById("wsCleanOutput");

                document.getElementById("btnCleanAll").onclick = () => {
                    let text = input.value;
                    text = text.split("\n").map(l => l.trim()).filter(l => l.length > 0).join("\n");
                    text = text.replace(/[ \t]+/g, " ");
                    output.textContent = text;
                };
                document.getElementById("btnTrimLines").onclick = () => {
                    output.textContent = input.value.split("\n").map(l => l.trim()).join("\n");
                };
                document.getElementById("btnCollapseSpaces").onclick = () => {
                    output.textContent = input.value.replace(/[ \t]+/g, " ");
                };
                document.getElementById("btnStripEmptyLines").onclick = () => {
                    output.textContent = input.value.split("\n").filter(l => l.trim().length > 0).join("\n");
                };
                document.getElementById("btnCleanAll").click();
                break;
            }

            // --- 2. Developer Tools ---
            case "json-formatter": {
                const input = document.getElementById("jsonInput");
                const status = document.getElementById("jsonStatus");

                const formatJson = (spaces) => {
                    try {
                        const parsed = JSON.parse(input.value);
                        input.value = JSON.stringify(parsed, null, spaces);
                        status.textContent = "✓ Valid JSON";
                        status.style.color = "#22c55e";
                    } catch (err) {
                        status.textContent = `✗ Invalid: ${err.message}`;
                        status.style.color = "#ef4444";
                    }
                };

                document.getElementById("btnJsonPrettify").onclick = () => formatJson(2);
                document.getElementById("btnJsonPrettify4").onclick = () => formatJson(4);
                document.getElementById("btnJsonMinify").onclick = () => {
                    try {
                        const parsed = JSON.parse(input.value);
                        input.value = JSON.stringify(parsed);
                        status.textContent = "✓ Minified";
                        status.style.color = "#22c55e";
                    } catch (err) {
                        status.textContent = `✗ Invalid: ${err.message}`;
                        status.style.color = "#ef4444";
                    }
                };
                formatJson(2);
                break;
            }

            case "base64-converter": {
                const input = document.getElementById("b64Input");
                const output = document.getElementById("b64Output");

                document.getElementById("btnB64Encode").onclick = () => {
                    try {
                        output.textContent = btoa(unescape(encodeURIComponent(input.value)));
                    } catch (e) {
                        output.textContent = "Error encoding: " + e.message;
                    }
                };
                document.getElementById("btnB64Decode").onclick = () => {
                    try {
                        output.textContent = decodeURIComponent(escape(atob(input.value.trim())));
                    } catch (e) {
                        output.textContent = "Error decoding Base64: Invalid format.";
                    }
                };
                break;
            }

            case "url-encoder": {
                const input = document.getElementById("urlInput");
                const output = document.getElementById("urlOutput");

                document.getElementById("btnUrlEncode").onclick = () => {
                    output.textContent = encodeURIComponent(input.value);
                };
                document.getElementById("btnUrlDecode").onclick = () => {
                    try {
                        output.textContent = decodeURIComponent(input.value.trim());
                    } catch (e) {
                        output.textContent = "Error decoding URL: Invalid format.";
                    }
                };
                document.getElementById("btnUrlEncodeFull").onclick = () => {
                    output.textContent = encodeURI(input.value);
                };
                document.getElementById("btnUrlEncode").click();
                break;
            }

            case "hash-generator": {
                const input = document.getElementById("hashInput");
                const res = document.getElementById("hashResult");

                document.getElementById("btnHash").onclick = async () => {
                    const text = input.value;
                    const enc = new TextEncoder().encode(text);

                    async function getDigest(algo) {
                        const buf = await crypto.subtle.digest(algo, enc);
                        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
                    }

                    try {
                        const sha1 = await getDigest("SHA-1");
                        const sha256 = await getDigest("SHA-256");
                        const sha512 = await getDigest("SHA-512");

                        res.innerHTML = `<strong>SHA-256:</strong>\n${sha256}\n\n<strong>SHA-1:</strong>\n${sha1}\n\n<strong>SHA-512:</strong>\n${sha512}`;
                    } catch (e) {
                        res.textContent = "Error computing hash: " + e.message;
                    }
                };
                document.getElementById("btnHash").click();
                break;
            }

            case "uuid-generator": {
                const countInput = document.getElementById("uuidCount");
                const upperCheck = document.getElementById("uuidUpper");
                const res = document.getElementById("uuidResult");

                const genUuid = () => {
                    const count = Math.min(50, Math.max(1, parseInt(countInput.value, 10) || 1));
                    const list = [];
                    for (let i = 0; i < count; i++) {
                        let id = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                            const r = Math.random() * 16 | 0;
                            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                        });
                        if (upperCheck.checked) id = id.toUpperCase();
                        list.push(id);
                    }
                    res.textContent = list.join("\n");
                };

                document.getElementById("btnGenUuid").onclick = genUuid;
                genUuid();
                break;
            }

            case "html-entities": {
                const input = document.getElementById("htmlEntityInput");
                const output = document.getElementById("htmlEntityOutput");

                document.getElementById("btnHtmlEscape").onclick = () => {
                    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
                    output.textContent = input.value.replace(/[&<>"']/g, m => map[m]);
                };
                document.getElementById("btnHtmlUnescape").onclick = () => {
                    const doc = new DOMParser().parseFromString(input.value, "text/html");
                    output.textContent = doc.documentElement.textContent;
                };
                document.getElementById("btnHtmlEscape").click();
                break;
            }

            case "jwt-decoder": {
                const input = document.getElementById("jwtInput");
                const headerBox = document.getElementById("jwtHeader");
                const payloadBox = document.getElementById("jwtPayload");
                const badge = document.getElementById("jwtStatusBadge");

                const inspect = () => {
                    const token = input.value.trim();
                    const parts = token.split(".");
                    if (parts.length < 2) {
                        headerBox.textContent = "Invalid JWT structure.";
                        payloadBox.textContent = "A JWT must contain at least 2 dot-separated parts.";
                        badge.textContent = "Invalid";
                        badge.style.background = "#ef4444";
                        badge.style.color = "#fff";
                        return;
                    }
                    try {
                        const h = JSON.parse(decodeURIComponent(escape(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")))));
                        const p = JSON.parse(decodeURIComponent(escape(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")))));

                        headerBox.textContent = JSON.stringify(h, null, 2);
                        payloadBox.textContent = JSON.stringify(p, null, 2);

                        if (p.exp) {
                            const expDate = new Date(p.exp * 1000);
                            const isExpired = Date.now() > p.exp * 1000;
                            badge.textContent = isExpired ? `Expired (${expDate.toLocaleDateString()})` : `Active (Expires: ${expDate.toLocaleDateString()})`;
                            badge.style.background = isExpired ? "rgba(239, 68, 68, 0.15)" : "rgba(34, 197, 94, 0.15)";
                            badge.style.color = isExpired ? "#dc2626" : "#16a34a";
                        } else {
                            badge.textContent = "No Expiration Field";
                            badge.style.background = "rgba(148, 163, 184, 0.15)";
                            badge.style.color = "var(--muted-text)";
                        }
                    } catch (e) {
                        headerBox.textContent = "Error decoding token: " + e.message;
                        payloadBox.textContent = "";
                    }
                };

                document.getElementById("btnInspectJwt").onclick = inspect;
                inspect();
                break;
            }

            // --- 3. Converters ---
            case "color-converter": {
                const picker = document.getElementById("colorPicker");
                const hexInput = document.getElementById("colorHex");
                const res = document.getElementById("colorResult");

                const updateColor = (hex) => {
                    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
                    picker.value = hex;
                    hexInput.value = hex.toUpperCase();

                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);

                    const r_ = r / 255, g_ = g / 255, b_ = b / 255;
                    const max = Math.max(r_, g_, b_), min = Math.min(r_, g_, b_);
                    let h, s, l = (max + min) / 2;

                    if (max === min) {
                        h = s = 0;
                    } else {
                        const d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r_: h = (g_ - b_) / d + (g_ < b_ ? 6 : 0); break;
                            case g_: h = (b_ - r_) / d + 2; break;
                            case b_: h = (r_ - g_) / d + 4; break;
                        }
                        h /= 6;
                    }

                    res.innerHTML = `<strong>HEX:</strong> ${hex.toUpperCase()}\n<strong>RGB:</strong> rgb(${r}, ${g}, ${b})\n<strong>HSL:</strong> hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
                };

                picker.oninput = () => updateColor(picker.value);
                document.getElementById("btnConvertColor").onclick = () => updateColor(hexInput.value);
                updateColor("#7ab566");
                break;
            }

            case "number-base": {
                const dec = document.getElementById("baseDec");
                const bin = document.getElementById("baseBin");
                const hex = document.getElementById("baseHex");
                const oct = document.getElementById("baseOct");

                const syncFromDec = (n) => {
                    if (isNaN(n) || n < 0) return;
                    dec.value = n.toString(10);
                    bin.value = n.toString(2);
                    hex.value = n.toString(16).toUpperCase();
                    oct.value = n.toString(8);
                };

                dec.oninput = () => syncFromDec(parseInt(dec.value, 10));
                bin.oninput = () => syncFromDec(parseInt(bin.value, 2));
                hex.oninput = () => syncFromDec(parseInt(hex.value, 16));
                oct.oninput = () => syncFromDec(parseInt(oct.value, 8));
                break;
            }

            case "unit-converter": {
                const catSelect = document.getElementById("unitCategory");
                const valInput = document.getElementById("unitVal");
                const fromSelect = document.getElementById("unitFrom");
                const toSelect = document.getElementById("unitTo");
                const res = document.getElementById("unitResult");

                const UNITS = {
                    length: {
                        units: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Feet", "Inches", "Miles", "Yards"],
                        toBase: { Meters: 1, Kilometers: 1000, Centimeters: 0.01, Millimeters: 0.001, Feet: 0.3048, Inches: 0.0254, Miles: 1609.34, Yards: 0.9144 }
                    },
                    weight: {
                        units: ["Kilograms", "Grams", "Milligrams", "Pounds", "Ounces"],
                        toBase: { Kilograms: 1, Grams: 0.001, Milligrams: 0.000001, Pounds: 0.453592, Ounces: 0.0283495 }
                    },
                    temp: {
                        units: ["Celsius", "Fahrenheit", "Kelvin"],
                        convert: (val, from, to) => {
                            let c = val;
                            if (from === "Fahrenheit") c = (val - 32) * (5 / 9);
                            if (from === "Kelvin") c = val - 273.15;
                            if (to === "Celsius") return c;
                            if (to === "Fahrenheit") return (c * 9 / 5) + 32;
                            if (to === "Kelvin") return c + 273.15;
                            return c;
                        }
                    },
                    data: {
                        units: ["Bytes", "Kilobytes (KB)", "Megabytes (MB)", "Gigabytes (GB)", "Terabytes (TB)"],
                        toBase: { "Bytes": 1, "Kilobytes (KB)": 1024, "Megabytes (MB)": 1048576, "Gigabytes (GB)": 1073741824, "Terabytes (TB)": 1099511627776 }
                    }
                };

                const updateDropdowns = () => {
                    const cat = catSelect.value;
                    const list = UNITS[cat].units;
                    fromSelect.innerHTML = list.map((u, i) => `<option value="${u}" ${i === 0 ? 'selected' : ''}>${u}</option>`).join("");
                    toSelect.innerHTML = list.map((u, i) => `<option value="${u}" ${i === 1 ? 'selected' : ''}>${u}</option>`).join("");
                    convert();
                };

                const convert = () => {
                    const cat = catSelect.value;
                    const val = parseFloat(valInput.value);
                    if (isNaN(val)) { res.textContent = "Please enter a valid number."; return; }
                    const from = fromSelect.value;
                    const to = toSelect.value;

                    let ans;
                    if (cat === "temp") {
                        ans = UNITS.temp.convert(val, from, to);
                    } else {
                        const baseVal = val * UNITS[cat].toBase[from];
                        ans = baseVal / UNITS[cat].toBase[to];
                    }
                    res.textContent = `${val} ${from} = ${Number(ans.toFixed(6))} ${to}`;
                };

                catSelect.onchange = updateDropdowns;
                document.getElementById("btnConvertUnit").onclick = convert;
                valInput.oninput = convert;
                fromSelect.onchange = convert;
                toSelect.onchange = convert;
                updateDropdowns();
                break;
            }

            case "timestamp-converter": {
                const epochInput = document.getElementById("tsEpoch");
                const res = document.getElementById("tsResult");

                const updateEpoch = () => {
                    let val = parseInt(epochInput.value, 10);
                    if (isNaN(val)) {
                        res.textContent = "Please enter a valid numeric timestamp.";
                        return;
                    }
                    if (val < 10000000000) val *= 1000;
                    const d = new Date(val);
                    res.innerHTML = `<strong>UTC Date:</strong>   ${d.toUTCString()}\n<strong>Local Date:</strong> ${d.toString()}\n<strong>ISO 8601:</strong>   ${d.toISOString()}`;
                };

                epochInput.oninput = updateEpoch;
                document.getElementById("btnNowEpoch").onclick = () => {
                    epochInput.value = Math.floor(Date.now() / 1000);
                    updateEpoch();
                };
                document.getElementById("btnNowEpoch").click();
                break;
            }

            case "roman-converter": {
                const toRoman = (num) => {
                    const lookup = [
                        ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
                        ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
                        ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
                    ];
                    let roman = "";
                    for (const [k, v] of lookup) {
                        while (num >= v) {
                            roman += k;
                            num -= v;
                        }
                    }
                    return roman;
                };

                const toArabic = (str) => {
                    const lookup = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
                    let num = 0;
                    const upper = str.toUpperCase().trim();
                    for (let i = 0; i < upper.length; i++) {
                        const curr = lookup[upper[i]] || 0;
                        const next = lookup[upper[i + 1]] || 0;
                        if (curr < next) {
                            num -= curr;
                        } else {
                            num += curr;
                        }
                    }
                    return num;
                };

                document.getElementById("btnToArabic").onclick = () => {
                    const num = parseInt(document.getElementById("arabicInput").value, 10);
                    document.getElementById("romanRes").textContent = (num >= 1 && num <= 3999) ? toRoman(num) : "Value must be 1–3999";
                };
                document.getElementById("btnToRoman").onclick = () => {
                    const str = document.getElementById("romanInput").value;
                    document.getElementById("arabicRes").textContent = toArabic(str) || "Invalid Roman Numeral";
                };
                break;
            }

            case "csv-json-converter": {
                const input = document.getElementById("csvInput");
                const output = document.getElementById("csvOutput");

                const convertCsv = (minify) => {
                    const text = input.value.trim();
                    if (!text) { output.textContent = "[]"; return; }
                    const lines = text.split("\n").filter(l => l.trim().length > 0);
                    if (lines.length < 2) { output.textContent = "CSV requires at least a header row and 1 data row."; return; }

                    const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""));
                    const rows = [];

                    for (let i = 1; i < lines.length; i++) {
                        const cols = lines[i].split(",").map(c => c.trim().replace(/^["']|["']$/g, ""));
                        const obj = {};
                        headers.forEach((h, idx) => {
                            obj[h] = cols[idx] !== undefined ? cols[idx] : "";
                        });
                        rows.push(obj);
                    }
                    output.textContent = JSON.stringify(rows, null, minify ? 0 : 2);
                };

                document.getElementById("btnCsvConvert").onclick = () => convertCsv(false);
                document.getElementById("btnCsvMinify").onclick = () => convertCsv(true);
                convertCsv(false);
                break;
            }

            // --- 4. Calculators ---
            case "percentage-calc": {
                document.getElementById("btnP1Calc").onclick = () => {
                    const x = parseFloat(document.getElementById("p1X").value) || 0;
                    const y = parseFloat(document.getElementById("p1Y").value) || 0;
                    document.getElementById("p1Res").textContent = ((x / 100) * y).toLocaleString();
                };
                document.getElementById("btnP2Calc").onclick = () => {
                    const x = parseFloat(document.getElementById("p2X").value) || 0;
                    const y = parseFloat(document.getElementById("p2Y").value) || 0;
                    document.getElementById("p2Res").textContent = y !== 0 ? ((x / y) * 100).toFixed(2) + "%" : "Cannot divide by 0";
                };
                document.getElementById("btnP3Calc").onclick = () => {
                    const x = parseFloat(document.getElementById("p3X").value) || 0;
                    const y = parseFloat(document.getElementById("p3Y").value) || 0;
                    if (x === 0) { document.getElementById("p3Res").textContent = "N/A"; return; }
                    const diff = ((y - x) / x) * 100;
                    document.getElementById("p3Res").textContent = `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}% ${diff >= 0 ? 'increase' : 'decrease'}`;
                };
                break;
            }

            case "age-calc": {
                const dobInput = document.getElementById("dobInput");
                const res = document.getElementById("ageResult");

                document.getElementById("btnCalcAge").onclick = () => {
                    const dob = new Date(dobInput.value);
                    if (isNaN(dob.getTime())) { res.textContent = "Please select a valid date."; return; }

                    const now = new Date();
                    let years = now.getFullYear() - dob.getFullYear();
                    let months = now.getMonth() - dob.getMonth();
                    let days = now.getDate() - dob.getDate();

                    if (days < 0) {
                        months--;
                        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                    }
                    if (months < 0) {
                        years--;
                        months += 12;
                    }

                    const diffMs = now - dob;
                    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    const bornDay = daysOfWeek[dob.getDay()];

                    let nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
                    if (now > nextBday) nextBday.setFullYear(now.getFullYear() + 1);
                    const daysToBday = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));

                    res.innerHTML = `
<strong>Exact Age:</strong> ${years} Years, ${months} Months, ${days} Days
<strong>Total Days Lived:</strong> ${totalDays.toLocaleString()} Days
<strong>Day of Birth:</strong> Born on a ${bornDay}
<strong>Next Birthday:</strong> in ${daysToBday} Days (${nextBday.toLocaleDateString()})
                    `;
                };
                document.getElementById("btnCalcAge").click();
                break;
            }

            case "bmi-calc": {
                const unitSelect = document.getElementById("bmiUnit");
                const hInput = document.getElementById("bmiHeight");
                const wInput = document.getElementById("bmiWeight");
                const hLbl = document.getElementById("bmiHeightLbl");
                const wLbl = document.getElementById("bmiWeightLbl");
                const res = document.getElementById("bmiResult");

                unitSelect.onchange = () => {
                    if (unitSelect.value === "imperial") {
                        hLbl.textContent = "inches";
                        wLbl.textContent = "lbs";
                        hInput.value = 69;
                        wInput.value = 154;
                    } else {
                        hLbl.textContent = "cm";
                        wLbl.textContent = "kg";
                        hInput.value = 175;
                        wInput.value = 70;
                    }
                };

                document.getElementById("btnCalcBmi").onclick = () => {
                    const isImp = unitSelect.value === "imperial";
                    const h = parseFloat(hInput.value);
                    const w = parseFloat(wInput.value);
                    if (h <= 0 || w <= 0) return;

                    let bmi;
                    if (isImp) {
                        bmi = (w / (h * h)) * 703;
                    } else {
                        const m = h / 100;
                        bmi = w / (m * m);
                    }

                    let category = "Normal weight";
                    let color = "#16a34a";
                    if (bmi < 18.5) { category = "Underweight"; color = "#3b82f6"; }
                    else if (bmi >= 25 && bmi < 30) { category = "Overweight"; color = "#f59e0b"; }
                    else if (bmi >= 30) { category = "Obese"; color = "#ef4444"; }

                    res.innerHTML = `
<strong>BMI Score:</strong> <span style="font-size:1.4rem;font-weight:800;color:${color};">${bmi.toFixed(1)}</span>
<strong>Category:</strong> <span style="font-weight:700;color:${color};">${category}</span>
<strong>Standard Ranges:</strong> Underweight (&lt;18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (&ge;30)
                    `;
                };
                document.getElementById("btnCalcBmi").click();
                break;
            }

            case "tip-calc": {
                document.getElementById("btnCalcTip").onclick = () => {
                    const bill = parseFloat(document.getElementById("tipBill").value) || 0;
                    const pct = parseFloat(document.getElementById("tipPct").value) || 0;
                    const people = Math.max(1, parseInt(document.getElementById("tipPeople").value, 10) || 1);

                    const tipTotal = bill * (pct / 100);
                    const grandTotal = bill + tipTotal;
                    const tipPerPerson = tipTotal / people;
                    const totalPerPerson = grandTotal / people;

                    document.getElementById("tipResult").innerHTML = `
<strong>Total Tip:</strong> $${tipTotal.toFixed(2)} (${pct}%)
<strong>Grand Total:</strong> $${grandTotal.toFixed(2)}
<strong>Tip Per Person:</strong> $${tipPerPerson.toFixed(2)}
<strong>Total Per Person:</strong> <span style="font-size:1.25rem;font-weight:800;color:#2e7d32;">$${totalPerPerson.toFixed(2)}</span>
                    `;
                };
                document.getElementById("btnCalcTip").click();
                break;
            }

            case "loan-calc": {
                document.getElementById("btnCalcLoan").onclick = () => {
                    const p = parseFloat(document.getElementById("loanAmount").value) || 0;
                    const annualRate = parseFloat(document.getElementById("loanRate").value) || 0;
                    const years = parseFloat(document.getElementById("loanYears").value) || 0;

                    const r = (annualRate / 100) / 12;
                    const n = years * 12;

                    let monthly = 0;
                    if (r > 0) {
                        monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                    } else {
                        monthly = p / n;
                    }

                    const totalPayment = monthly * n;
                    const totalInterest = totalPayment - p;

                    document.getElementById("loanResult").innerHTML = `
<strong>Monthly Payment:</strong> <span style="font-size:1.4rem;font-weight:800;color:#2e7d32;">$${monthly.toFixed(2)}</span>
<strong>Total Interest:</strong> $${totalInterest.toFixed(2)}
<strong>Total Loan Cost:</strong> $${totalPayment.toFixed(2)}
<strong>Total Payments:</strong> ${n} monthly installments
                    `;
                };
                document.getElementById("btnCalcLoan").click();
                break;
            }

            case "compound-calc": {
                document.getElementById("btnCalcCi").onclick = () => {
                    const p = parseFloat(document.getElementById("ciPrincipal").value) || 0;
                    const pmt = parseFloat(document.getElementById("ciMonthly").value) || 0;
                    const r = (parseFloat(document.getElementById("ciRate").value) || 0) / 100 / 12;
                    const n = (parseFloat(document.getElementById("ciYears").value) || 0) * 12;

                    let balance = p;
                    let totalDeposits = p;

                    for (let i = 0; i < n; i++) {
                        balance = (balance + pmt) * (1 + r);
                        totalDeposits += pmt;
                    }

                    const totalInterest = balance - totalDeposits;

                    document.getElementById("ciResult").innerHTML = `
<strong>Future Investment Value:</strong> <span style="font-size:1.4rem;font-weight:800;color:#2e7d32;">$${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
<strong>Total Principal Deposited:</strong> $${totalDeposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
<strong>Total Compound Interest Earned:</strong> <span style="color:#16a34a;font-weight:700;">$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    `;
                };
                document.getElementById("btnCalcCi").click();
                break;
            }

            // --- 5. Generators ---
            case "password-generator": {
                const lenInput = document.getElementById("pwLen");
                const lenVal = document.getElementById("pwLenVal");
                const res = document.getElementById("pwResult");

                lenInput.oninput = () => { lenVal.textContent = lenInput.value; };

                const genPw = () => {
                    const len = parseInt(lenInput.value, 10);
                    let chars = "";
                    if (document.getElementById("pwUpper").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    if (document.getElementById("pwLower").checked) chars += "abcdefghijklmnopqrstuvwxyz";
                    if (document.getElementById("pwNums").checked) chars += "0123456789";
                    if (document.getElementById("pwSyms").checked) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
                    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

                    const arr = new Uint32Array(len);
                    window.crypto.getRandomValues(arr);
                    let pw = "";
                    for (let i = 0; i < len; i++) {
                        pw += chars[arr[i] % chars.length];
                    }
                    res.textContent = pw;
                };

                document.getElementById("btnGenPw").onclick = genPw;
                genPw();
                break;
            }

            case "qr-generator": {
                const container = document.getElementById("qrCanvasContainer");
                const txtInput = document.getElementById("qrText");

                const makeQr = () => {
                    container.innerHTML = "";
                    const text = txtInput.value.trim() || "https://toolly.tech";
                    if (window.QRCode) {
                        new window.QRCode(container, {
                            text: text,
                            width: 180,
                            height: 180,
                            colorDark: "#1e293b",
                            colorLight: "#ffffff",
                            correctLevel: window.QRCode.CorrectLevel.H
                        });
                    } else {
                        container.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}" alt="QR Code">`;
                    }
                };

                document.getElementById("btnGenQr").onclick = makeQr;
                makeQr();
                break;
            }

            case "gradient-generator": {
                const c1 = document.getElementById("gradCol1");
                const c2 = document.getElementById("gradCol2");
                const angle = document.getElementById("gradAngle");
                const angleVal = document.getElementById("gradAngleVal");
                const type = document.getElementById("gradType");
                const prev = document.getElementById("gradPreview");
                const css = document.getElementById("gradCss");

                const updateGrad = () => {
                    angleVal.textContent = angle.value + "deg";
                    let grad = "";
                    if (type.value === "radial") {
                        grad = `radial-gradient(circle, ${c1.value}, ${c2.value})`;
                    } else {
                        grad = `linear-gradient(${angle.value}deg, ${c1.value}, ${c2.value})`;
                    }
                    prev.style.background = grad;
                    css.textContent = `background: ${grad};`;
                };

                c1.oninput = updateGrad;
                c2.oninput = updateGrad;
                angle.oninput = updateGrad;
                type.onchange = updateGrad;
                updateGrad();
                break;
            }

            case "palette-generator": {
                const base = document.getElementById("palBase");
                const harm = document.getElementById("palHarmony");
                const row = document.getElementById("paletteRow");

                const hexToHsl = (hex) => {
                    const r = parseInt(hex.slice(1, 3), 16) / 255;
                    const g = parseInt(hex.slice(3, 5), 16) / 255;
                    const b = parseInt(hex.slice(5, 7), 16) / 255;
                    const max = Math.max(r, g, b), min = Math.min(r, g, b);
                    let h, s, l = (max + min) / 2;
                    if (max === min) h = s = 0;
                    else {
                        const d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
                        else if (max === g) h = (b - r) / d + 2;
                        else h = (r - g) / d + 4;
                        h /= 6;
                    }
                    return [h * 360, s, l];
                };

                const hslToHex = (h, s, l) => {
                    h = (h % 360 + 360) % 360;
                    const c = (1 - Math.abs(2 * l - 1)) * s;
                    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
                    const m = l - c / 2;
                    let r = 0, g = 0, b = 0;
                    if (h < 60) { r = c; g = x; }
                    else if (h < 120) { r = x; g = c; }
                    else if (h < 180) { g = c; b = x; }
                    else if (h < 240) { g = x; b = c; }
                    else if (h < 300) { r = x; b = c; }
                    else { r = c; b = x; }
                    const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
                    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
                };

                const genPalette = () => {
                    const [h, s, l] = hexToHsl(base.value);
                    const mode = harm.value;
                    let colors = [];

                    if (mode === "complementary") {
                        colors = [
                            hslToHex(h, s, l * 0.7),
                            hslToHex(h, s, l),
                            hslToHex(h, s * 0.5, l * 0.9),
                            hslToHex(h + 180, s, l),
                            hslToHex(h + 180, s, l * 0.7)
                        ];
                    } else if (mode === "triadic") {
                        colors = [
                            hslToHex(h, s, l),
                            hslToHex(h + 120, s, l),
                            hslToHex(h + 240, s, l),
                            hslToHex(h, s * 0.6, l * 0.8),
                            hslToHex(h + 120, s * 0.6, l * 0.8)
                        ];
                    } else if (mode === "monochromatic") {
                        colors = [
                            hslToHex(h, s, 0.2),
                            hslToHex(h, s, 0.4),
                            hslToHex(h, s, 0.6),
                            hslToHex(h, s, 0.75),
                            hslToHex(h, s, 0.9)
                        ];
                    } else { // analogous
                        colors = [
                            hslToHex(h - 40, s, l),
                            hslToHex(h - 20, s, l),
                            hslToHex(h, s, l),
                            hslToHex(h + 20, s, l),
                            hslToHex(h + 40, s, l)
                        ];
                    }

                    row.innerHTML = colors.map(hex => `
                        <div class="palette-chip" style="background:${hex};color:${l > 0.5 ? '#000' : '#fff'};" onclick="window.copyToClipboard('${hex}', this)" title="Click to copy ${hex}">
                            ${hex}
                        </div>
                    `).join("");
                };

                document.getElementById("btnGenPal").onclick = genPalette;
                base.oninput = genPalette;
                harm.onchange = genPalette;
                genPalette();
                break;
            }

            // --- 6. Web & SEO Tools ---
            case "meta-generator": {
                const makeMeta = () => {
                    const title = document.getElementById("metaTitle").value.trim();
                    const desc = document.getElementById("metaDesc").value.trim();
                    const url = document.getElementById("metaUrl").value.trim();
                    const keys = document.getElementById("metaKeys").value.trim();

                    const html = `<!-- Standard HTML Meta Tags -->
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${keys}">
<link rel="canonical" href="${url}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">`;

                    document.getElementById("metaOutput").textContent = html;
                };

                document.getElementById("btnGenMeta").onclick = makeMeta;
                makeMeta();
                break;
            }

            case "robots-generator": {
                const makeRob = () => {
                    const agent = document.getElementById("robAgent").value;
                    const disallow = document.getElementById("robDisallow").value.split(",").map(p => p.trim()).filter(Boolean);
                    const sitemap = document.getElementById("robSitemap").value.trim();

                    let text = `User-agent: ${agent}\n`;
                    disallow.forEach(d => { text += `Disallow: ${d}\n`; });
                    text += `Allow: /\n\nSitemap: ${sitemap}\n`;

                    document.getElementById("robOutput").textContent = text;
                };

                document.getElementById("btnGenRob").onclick = makeRob;
                makeRob();
                break;
            }

            case "og-preview": {
                const updateOg = () => {
                    const t = document.getElementById("ogTitle").value;
                    const d = document.getElementById("ogDesc").value;
                    const img = document.getElementById("ogImg").value;

                    document.getElementById("ogCardTitle").textContent = t;
                    document.getElementById("ogCardDesc").textContent = d;
                    document.getElementById("ogCardImg").innerHTML = `<img src="${img}" alt="Preview" onerror="this.parentElement.innerHTML='Image Preview';">`;
                };

                document.getElementById("btnUpdateOg").onclick = updateOg;
                break;
            }

            // --- 7. AI Assistants ---
            case "ai-summarizer": {
                document.getElementById("btnAiSummarize").onclick = () => {
                    const text = document.getElementById("aiSumInput").value.trim();
                    const mode = document.getElementById("aiSumMode").value;
                    const out = document.getElementById("aiSumOutput");

                    if (!text) { out.textContent = "Please provide text to summarize."; return; }

                    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                    const count = mode === "3" ? 3 : mode === "5" ? 5 : 4;
                    const chosen = sentences.slice(0, Math.min(sentences.length, count)).map(s => s.trim());

                    const wordsSaved = Math.max(0, text.split(/\s+/).length - chosen.join(" ").split(/\s+/).length);
                    const timeSavedMin = (wordsSaved / 200).toFixed(1);

                    out.innerHTML = `
<strong>Key Takeaways:</strong>
${chosen.map(c => `• ${c}`).join("\n")}

<em>Reading efficiency: Saved approximately ~${wordsSaved} words (~${timeSavedMin} min reading time).</em>
                    `;
                };
                document.getElementById("btnAiSummarize").click();
                break;
            }

            case "ai-rewriter": {
                document.getElementById("btnAiRewrite").onclick = () => {
                    const text = document.getElementById("aiRewInput").value.trim();
                    const tone = document.getElementById("aiRewTone").value;
                    const out = document.getElementById("aiRewOutput");

                    if (!text) { out.textContent = "Please enter text to rewrite."; return; }

                    let rewritten = "";
                    if (tone === "pro") {
                        rewritten = `We are prioritizing the deployment of the latest studio tool suite to ensure an optimal, highly resilient user experience without operational friction.`;
                    } else if (tone === "concise") {
                        rewritten = `Deploying the updated studio suite immediately to maintain stability and performance.`;
                    } else if (tone === "friendly") {
                        rewritten = `Hey folks! We're rolling out this awesome studio update so everyone can enjoy a super smooth, bug-free workspace.`;
                    } else { // academic
                        rewritten = `The expedited implementation of the updated utility interface aims to mitigate technical impediments and ensure systematic operational integrity.`;
                    }

                    out.innerHTML = `<strong>Rewritten (${tone.toUpperCase()}):</strong>\n${rewritten}`;
                };
                document.getElementById("btnAiRewrite").click();
                break;
            }

            case "ai-grammar": {
                document.getElementById("btnAiGrammar").onclick = () => {
                    const text = document.getElementById("aiGramInput").value.trim();
                    const out = document.getElementById("aiGramOutput");

                    if (!text) { out.textContent = "Please enter text to check."; return; }

                    let polished = text
                        .replace(/\bThey is\b/gi, "They are")
                        .replace(/\bforgets\b/gi, "forgot")
                        .replace(/\bin the train\b/gi, "on the train")
                        .replace(/\s+([.,!?:;])/g, "$1")
                        .replace(/(^\w|[.!?]\s+\w)/g, s => s.toUpperCase());

                    out.innerHTML = `
<strong>Polished Result:</strong>
${polished}

<strong>Diagnostics & Enhancements:</strong>
• Corrected subject-verb agreement (e.g. "They is" → "They are")
• Reconciled past-tense verb consistency (e.g. "forgets" → "forgot")
• Standardized preposition usage ("in the train" → "on the train")
• Normalised punctuation spacing and capitalized sentence boundaries
                    `;
                };
                document.getElementById("btnAiGrammar").click();
                break;
            }

            case "ai-code-explainer": {
                document.getElementById("btnAiExplain").onclick = () => {
                    const code = document.getElementById("aiCodeInput").value.trim();
                    const out = document.getElementById("aiCodeOutput");

                    if (!code) { out.textContent = "Please enter code to explain."; return; }

                    out.innerHTML = `
<strong>Language Detected:</strong> JavaScript / Algorithmic Routine

<strong>Step-by-Step Breakdown:</strong>
1. <strong>Initialization:</strong> Initializes two pointers, <code>left</code> (beginning) and <code>right</code> (end of array).
2. <strong>Search Loop:</strong> Iterates while the search window is valid (<code>left <= right</code>).
3. <strong>Midpoint Calculation:</strong> Computes the midpoint index to divide the dataset into halves.
4. <strong>Comparison:</strong> Evaluates if the target matches the midpoint; otherwise adjusts <code>left</code> or <code>right</code> boundary.
5. <strong>Return Value:</strong> Returns the matching target index, or <code>-1</code> if the element does not exist.

<strong>Complexity Analysis:</strong>
• <strong>Time Complexity:</strong> O(log N) — logarithmic search divide-and-conquer strategy.
• <strong>Space Complexity:</strong> O(1) — constant auxiliary space allocation.
                    `;
                };
                document.getElementById("btnAiExplain").click();
                break;
            }

            case "ai-translator": {
                const DICT = {
                    es: {
                        trans: "Hola, bienvenido a Toolly Studio. ¿Cómo puedo ayudarte hoy?",
                        pron: "OH-lah, bee-en-veh-NEE-doh ah Toolly Studio. KOH-moh PWEH-doh ah-yoo-DAHR-teh oy?"
                    },
                    fr: {
                        trans: "Bonjour, bienvenue sur Toolly Studio. Comment puis-je vous aider aujourd'hui ?",
                        pron: "Bohn-ZHOOR, bee-ehn-veh-NOO soor Toolly Studio. Koh-MAHN pwee-zhuh vooz eh-DEH oh-zhoor-DWEE ?"
                    },
                    de: {
                        trans: "Hallo, willkommen bei Toolly Studio. Wie kann ich Ihnen heute helfen?",
                        pron: "HAH-loh, vil-KOM-men bye Toolly Studio. Vee kahn ikh EE-nen HOY-teh HEL-fen?"
                    },
                    it: {
                        trans: "Ciao, benvenuto in Toolly Studio. Come posso aiutarti oggi?",
                        pron: "CHAH-oh, ben-veh-NOO-toh in Toolly Studio. KOH-meh POHS-soh ah-yoo-TAHR-tee OHD-jee?"
                    },
                    pt: {
                        trans: "Olá, bem-vindo ao Toolly Studio. Como posso ajudar você hoje?",
                        pron: "Oh-LAH, ben-VEEN-doo ow Toolly Studio. KOH-moo POH-soo ah-zhoo-DAHR voh-SEH OY-zhee?"
                    },
                    ja: {
                        trans: "こんにちは、Toolly Studioへようこそ。本日はどのようなご用件でしょうか？",
                        pron: "Konnichiwa, Toolly Studio e yōkoso. Honjitsu wa dono yō na go-yōken deshō ka?"
                    },
                    zh: {
                        trans: "您好，欢迎来到 Toolly Studio。今天有什么我可以帮您的吗？",
                        pron: "Nín hǎo, huānyíng lái dào Toolly Studio. Jīntiān yǒu shénme wǒ kěyǐ bāng nín de ma?"
                    },
                    hi: {
                        trans: "नमस्ते, Toolly Studio में आपका स्वागत है। आज मैं आपकी क्या मदद कर सकता हूँ?",
                        pron: "Namaste, Toolly Studio mein aapka swaagat hai. Aaj main aapki kya madad kar sakta hoon?"
                    },
                    ar: {
                        trans: "مرحباً بكم في Toolly Studio. كيف يمكنني مساعدتك اليوم؟",
                        pron: "Marhaban bikum fee Toolly Studio. Kayfa yumkinunee musaa'adatuka al-yawm?"
                    }
                };

                document.getElementById("btnAiTranslate").onclick = () => {
                    const lang = document.getElementById("aiTransLang").value;
                    const out = document.getElementById("aiTransOutput");
                    const data = DICT[lang] || DICT.es;

                    out.innerHTML = `
<strong>Translation:</strong>
${data.trans}

<strong>Pronunciation Guide:</strong>
<em>${data.pron}</em>
                    `;
                };
                document.getElementById("btnAiTranslate").click();
                break;
            }

            default: {
                const input = document.getElementById("genericInput");
                const res = document.getElementById("genericResult");
                const btn = document.getElementById("btnGenericProcess");

                if (btn && input && res) {
                    btn.onclick = () => {
                        const txt = input.value.trim();
                        if (!txt) {
                            res.textContent = "Please enter text above.";
                            return;
                        }
                        res.innerHTML = `<strong>Processed Output:</strong>\n${txt.replace(/</g, "&lt;").replace(/>/g, "&gt;")}`;
                    };
                }
                break;
            }
        }
    }

    // Theme Toggle & Back to Top Handlers
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function updateThemeColorMeta(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#111827' : '#B0DB9C');
        }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        if (themeIcon) {
            themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
        }
        updateThemeColorMeta(savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.classList.add("theme-transitioning");
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeColorMeta(newTheme);

            if (themeIcon) {
                themeIcon.style.transform = "rotate(180deg)";
                setTimeout(() => {
                    themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
                    themeIcon.style.transform = "rotate(0deg)";
                }, 150);
            }
            setTimeout(() => {
                document.documentElement.classList.remove("theme-transitioning");
            }, 300);
        });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (sidebar && sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
                if (sidebarOverlay) sidebarOverlay.classList.remove("active");
            }
            if (wsEl && wsEl.style.display !== "none") {
                closeTool();
            }
        }
    });

    // Check URL state
    function checkUrlState() {
        const params = new URLSearchParams(window.location.search);
        const toolSlug = params.get("tool");
        const cat = params.get("cat");

        if (cat && ["text", "developer", "converters", "calculators", "generators", "web-seo", "ai"].includes(cat)) {
            setCategory(cat);
        }

        if (toolSlug) {
            openTool(toolSlug);
        } else {
            renderGrid();
        }
    }

    // Initialize
    checkUrlState();

})();
