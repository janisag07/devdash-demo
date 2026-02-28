// =============================================
// DEVDASH — Dynamic Site Generator v2
// EVERY prompt → truly unique, visually distinct result
// =============================================

// RNG seeded by prompt + timestamp — ensures uniqueness
function makeRng(prompt) {
    let seed = Date.now() ^ (Math.random() * 0xFFFFFFFF >>> 0);
    for (let i = 0; i < prompt.length; i++) seed = ((seed << 5) - seed + prompt.charCodeAt(i)) | 0;
    return function() { seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF; return (seed >>> 0) / 0xFFFFFFFF; };
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function pickN(rng, arr, n) {
    const copy = [...arr];
    const out = [];
    for (let i = 0; i < Math.min(n, copy.length); i++) {
        const idx = Math.floor(rng() * copy.length);
        out.push(copy.splice(idx, 1)[0]);
    }
    return out;
}
function shuffle(rng, arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function hsl(h, s, l) { return `hsl(${h},${s}%,${l}%)`; }

// ===== DETECTION =====
function detectCategory(prompt) {
    const p = prompt.toLowerCase();
    const cats = [
        ['fitness', /fitness|gym|sport|training|kraft|studio|yoga|crossfit|boxen|kampfsport/],
        ['restaurant', /restaurant|essen|food|küche|bistro|speise|gastro|sushi|pizza|burger|grill|koch/],
        ['portfolio', /portfolio|kreativ|designer|fotograf|künstler|freelanc|persön|lebenslauf|cv/],
        ['saas', /saas|app|startup|platform|software|tool|dashboard|analytics|api/],
        ['realestate', /immobilie|real.?estate|haus|wohnung|makler|property/],
        ['beauty', /beauty|salon|kosmetik|friseur|nail|spa|wellness|massage/],
        ['agency', /agentur|agency|kreativ.*agentur|marketing|brand|werbe/],
        ['shop', /shop|store|ecommerce|produkt|verkauf|online.?shop|laden|mode|fashion/],
        ['cafe', /café|cafe|coffee|kaffee|bäcker|bakery/],
        ['medical', /arzt|praxis|doctor|medical|gesundheit|klinik|dental|zahnarzt|therapeut|physio/],
        ['education', /kurs|schule|education|learn|akademie|coach|seminar|nachhilfe|online.?kurs/],
        ['music', /musik|band|artist|album|song|concert|tour|dj|producer/],
        ['law', /anwalt|kanzlei|recht|law|jurist|notar|rechtsanwalt|steuerberater/],
        ['event', /bar|cocktail|club|lounge|nachtleben|event|party|hochzeit|wedding/],
        ['pet', /tier|pet|hund|katze|tierarzt|hundesalon/],
        ['auto', /auto|car|werkstatt|kfz|garage|fahrzeug/],
        ['travel', /reise|travel|hotel|booking|urlaub|flug/],
        ['tech', /tech|it|cyber|security|cloud|server|hosting|netzwerk/],
        ['photo', /foto|photo|studio|shooting|bild|galerie/],
    ];
    for (const [cat, rx] of cats) if (rx.test(p)) return cat;
    return 'generic';
}

function extractName(prompt) {
    const q = prompt.match(/["'„"]([^"'""]+)["'""]/);
    if (q) return q[1];
    const fur = prompt.match(/(?:für|for|namens?|called?|named?|heißt)\s+(?:mein[en]?\s+)?(?:\w+\s+)?["']?([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ&][a-zäöüß&]*)*)/i);
    if (fur) return fur[1];
    return null;
}

function detectMood(prompt) {
    const p = prompt.toLowerCase();
    if (p.match(/dunkel|dark|schwarz|nacht|night|elegant|luxus|premium|edel/)) return 'dark';
    if (p.match(/hell|light|weiß|bright|freundlich|warm|gemütlich/)) return 'light';
    if (p.match(/bunt|colorful|farb|lebendig|vibrant|kreativ/)) return 'colorful';
    if (p.match(/minimal|clean|schlicht|einfach|modern/)) return 'minimal';
    if (p.match(/retro|vintage|old.?school|nostalgisch/)) return 'retro';
    if (p.match(/neon|cyber|futurist|zukunft|tech/)) return 'neon';
    return null;
}

// ===== MASSIVE COLOR PALETTES =====
function generatePalette(rng, mood, cat) {
    // 30+ distinct palettes
    const palettes = [
        // Darks
        {bg:'#0a0a0a',card:'#141414',border:'#222',text:'#fff',muted:'#888',accent:'#e63946'},
        {bg:'#0f0f14',card:'#16161e',border:'#1e1e2a',text:'#f0f0f5',muted:'#7a7a90',accent:'#7c3aed'},
        {bg:'#0c1117',card:'#151d27',border:'#1e2a38',text:'#e8ecf0',muted:'#6b7c93',accent:'#2b7de9'},
        {bg:'#0a0c0a',card:'#121612',border:'#1a201a',text:'#e8f0e8',muted:'#6b8a6b',accent:'#16a34a'},
        {bg:'#100c14',card:'#1a1420',border:'#241e2e',text:'#f0e8f5',muted:'#9080a0',accent:'#c026d3'},
        {bg:'#14100a',card:'#1e1810',border:'#2a2218',text:'#f5f0e8',muted:'#a09070',accent:'#f97316'},
        {bg:'#0c0c0c',card:'#111',border:'#1a1a1a',text:'#fff',muted:'#666',accent:'#06b6d4'},
        {bg:'#0a0a14',card:'#10101e',border:'#1a1a2e',text:'#e0e0ff',muted:'#8888bb',accent:'#6366f1'},
        // Lights
        {bg:'#fafaf8',card:'#fff',border:'#eee',text:'#1a1a1a',muted:'#888',accent:'#e63946'},
        {bg:'#f7fbfe',card:'#fff',border:'#e8f0f8',text:'#1a2942',muted:'#6b7c93',accent:'#2b7de9'},
        {bg:'#fdf8f4',card:'#fff',border:'#f0e6db',text:'#2a2a2a',muted:'#999',accent:'#f97316'},
        {bg:'#f8f9fc',card:'#fff',border:'#e8eaf0',text:'#111',muted:'#777',accent:'#7c3aed'},
        {bg:'#f5faf5',card:'#fff',border:'#e0f0e0',text:'#1a2a1a',muted:'#6a8a6a',accent:'#16a34a'},
        {bg:'#faf5ff',card:'#fff',border:'#f0e0ff',text:'#2a1a3a',muted:'#8a6aa0',accent:'#9333ea'},
        {bg:'#fff8f0',card:'#fff',border:'#ffe8d0',text:'#2a1a0a',muted:'#a08060',accent:'#d97706'},
        {bg:'#f0faff',card:'#fff',border:'#d0f0ff',text:'#0a2a3a',muted:'#5090a0',accent:'#0891b2'},
        // Bold / neon
        {bg:'#0a0014',card:'#140020',border:'#2a003e',text:'#fff',muted:'#c080ff',accent:'#ff00ff'},
        {bg:'#000a14',card:'#001020',border:'#002040',text:'#e0f0ff',muted:'#60a0d0',accent:'#00d4ff'},
        {bg:'#140a00',card:'#201400',border:'#3a2200',text:'#ffe8c0',muted:'#c09050',accent:'#ff6600'},
        // Muted / earthy
        {bg:'#f5f0eb',card:'#fff',border:'#e0d8d0',text:'#3a3028',muted:'#8a7868',accent:'#b45309'},
        {bg:'#ebf0f0',card:'#fff',border:'#d0dede',text:'#283a3a',muted:'#688a8a',accent:'#059669'},
        // Pastel
        {bg:'#fef0f5',card:'#fff',border:'#ffd0e0',text:'#3a1028',muted:'#c06090',accent:'#ec4899'},
        {bg:'#f0f5fe',card:'#fff',border:'#d0e0ff',text:'#102840',muted:'#6080c0',accent:'#3b82f6'},
    ];

    let pool = palettes;
    if (mood === 'dark' || mood === 'neon') pool = palettes.filter(p => p.bg.match(/^#[01]/));
    else if (mood === 'light' || mood === 'minimal') pool = palettes.filter(p => p.bg.match(/^#[ef]/));
    if (pool.length === 0) pool = palettes;

    return pick(rng, pool);
}

// ===== FONTS =====
const allFonts = [
    {family:"'Segoe UI',system-ui,sans-serif",headWeight:900,bodySize:'16px'},
    {family:"-apple-system,BlinkMacSystemFont,sans-serif",headWeight:800,bodySize:'15px'},
    {family:"Georgia,'Times New Roman',serif",headWeight:700,bodySize:'17px'},
    {family:"'Trebuchet MS',sans-serif",headWeight:900,bodySize:'15px'},
    {family:"'Courier New',monospace",headWeight:700,bodySize:'14px'},
    {family:"system-ui,-apple-system,sans-serif",headWeight:800,bodySize:'16px'},
    {family:"'Palatino Linotype',serif",headWeight:700,bodySize:'17px'},
    {family:"'Gill Sans','Gill Sans MT',sans-serif",headWeight:800,bodySize:'16px'},
    {family:"Verdana,Geneva,sans-serif",headWeight:900,bodySize:'15px'},
    {family:"'Lucida Grande',sans-serif",headWeight:700,bodySize:'16px'},
];

// ===== LAYOUT TEMPLATES =====
// Each is a completely different page structure

function layoutCentered(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const bgEffect = pick(rng, [
        `background:linear-gradient(135deg,${pal.accent}15,transparent);`,
        `background:radial-gradient(ellipse at 50% 30%,${pal.accent}18,transparent 70%);`,
        `background:conic-gradient(from ${Math.floor(rng()*360)}deg at 50% 50%,${pal.accent}10,transparent,${pal.accent}06);`,
        `background:linear-gradient(${Math.floor(rng()*360)}deg,${pal.accent}12,transparent 60%);`,
        ``,
    ]);
    return `${navHtml}<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;${bgEffect}"><div style="max-width:700px"><h1 style="font-size:clamp(36px,8vw,80px);font-weight:${font.headWeight};letter-spacing:-2px;line-height:1.05">${heroTitle}</h1><p style="font-size:18px;color:${pal.muted};margin:20px auto 36px;max-width:520px;line-height:1.6">${heroSub}</p>${ctaHtml}</div></div>${sections}`;
}

function layoutLeftHero(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const padding = pick(rng, ['80px 8vw','100px 10vw','60px 6vw']);
    const bgEffect = pick(rng, [
        `background:linear-gradient(to right,${pal.accent}10,transparent 50%);`,
        `background:linear-gradient(135deg,${pal.accent}08,transparent);`,
        ``,
    ]);
    return `${navHtml}<div style="min-height:92vh;display:flex;align-items:center;padding:${padding};${bgEffect}"><div style="max-width:600px"><h1 style="font-size:clamp(32px,6vw,64px);font-weight:${font.headWeight};letter-spacing:-1.5px;line-height:1.08">${heroTitle}</h1><p style="font-size:17px;color:${pal.muted};margin:18px 0 32px;line-height:1.6">${heroSub}</p>${ctaHtml}</div></div>${sections}`;
}

function layoutSplit(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml, emoji) {
    const reverse = rng() > 0.5;
    const visual = pick(rng, [
        `<div style="flex:1;min-width:280px;aspect-ratio:1;background:linear-gradient(${Math.floor(rng()*360)}deg,${pal.accent}20,${pal.accent}05);border-radius:${pick(rng,['24px','50%','16px'])};display:flex;align-items:center;justify-content:center;font-size:${pick(rng,['96px','120px','80px'])}">${emoji}</div>`,
        `<div style="flex:1;min-width:280px;aspect-ratio:4/3;background:linear-gradient(135deg,${pal.card},${pal.accent}10);border:1px solid ${pal.border};border-radius:20px;display:flex;align-items:center;justify-content:center"><div style="text-align:center"><div style="font-size:64px;margin-bottom:12px">${emoji}</div><div style="font-size:14px;color:${pal.muted}">Live Preview</div></div></div>`,
        `<div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:8px">${[1,2,3,4].map(() => `<div style="aspect-ratio:1;background:${pal.accent}${pick(rng,['08','12','18','06'])};border-radius:12px"></div>`).join('')}</div>`,
    ]);
    return `${navHtml}<div style="min-height:92vh;display:flex;align-items:center;padding:60px 8vw;gap:60px;flex-wrap:wrap;${reverse?'flex-direction:row-reverse':''}"><div style="flex:1;min-width:300px"><h1 style="font-size:clamp(30px,5vw,56px);font-weight:${font.headWeight};letter-spacing:-1.5px;line-height:1.08">${heroTitle}</h1><p style="font-size:16px;color:${pal.muted};margin:18px 0 30px;line-height:1.6">${heroSub}</p>${ctaHtml}</div>${visual}</div>${sections}`;
}

function layoutFullImage(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const overlay = pick(rng, [
        `background:linear-gradient(to bottom,${pal.bg}ee,${pal.bg}cc,${pal.bg});`,
        `background:linear-gradient(135deg,${pal.bg}f0,${pal.accent}30);`,
        `background:radial-gradient(ellipse at center,${pal.bg}dd,${pal.bg});`,
    ]);
    return `${navHtml}<div style="min-height:100vh;position:relative;display:flex;align-items:flex-end;padding:80px 8vw;${overlay}"><div style="max-width:600px;padding-bottom:60px"><h1 style="font-size:clamp(36px,7vw,72px);font-weight:${font.headWeight};letter-spacing:-2px;line-height:1.05">${heroTitle}</h1><p style="font-size:17px;color:${pal.muted};margin:18px 0 32px;line-height:1.6">${heroSub}</p>${ctaHtml}</div></div>${sections}`;
}

function layoutCards(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    return `${navHtml}<div style="padding:120px 8vw 60px;text-align:center"><h1 style="font-size:clamp(32px,6vw,60px);font-weight:${font.headWeight};letter-spacing:-1.5px;line-height:1.08">${heroTitle}</h1><p style="font-size:17px;color:${pal.muted};margin:20px auto 36px;max-width:500px;line-height:1.6">${heroSub}</p>${ctaHtml}</div>${sections}`;
}

function layoutMinimal(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    return `${navHtml}<div style="min-height:100vh;display:flex;align-items:center;padding:60px 12vw"><div><div style="width:48px;height:4px;background:${pal.accent};margin-bottom:32px;border-radius:2px"></div><h1 style="font-size:clamp(28px,5vw,52px);font-weight:${font.headWeight};letter-spacing:-1px;line-height:1.15">${heroTitle}</h1><p style="font-size:16px;color:${pal.muted};margin:24px 0 40px;max-width:480px;line-height:1.7">${heroSub}</p>${ctaHtml}</div></div>${sections}`;
}

const layoutFns = [layoutCentered, layoutLeftHero, layoutSplit, layoutFullImage, layoutCards, layoutMinimal];

// ===== NAV STYLES =====
function buildNav(rng, pal, font, siteName) {
    const navStyle = pick(rng, [
        // Floating
        `position:fixed;top:16px;left:16px;right:16px;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:${pal.card}dd;backdrop-filter:blur(20px);border-radius:16px;border:1px solid ${pal.border}`,
        // Full width top
        `position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:16px 32px;background:${pal.bg}ee;backdrop-filter:blur(12px);border-bottom:1px solid ${pal.border}`,
        // Minimal
        `position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:20px 8vw;`,
        // No nav
        `display:none`,
        // Centered
        `position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:100;display:flex;align-items:center;gap:24px;padding:10px 28px;background:${pal.card}cc;backdrop-filter:blur(20px);border-radius:99px;border:1px solid ${pal.border}`,
    ]);
    const logoStyle = pick(rng, [
        `font-weight:${font.headWeight};font-size:18px;letter-spacing:-0.5px`,
        `font-weight:700;font-size:14px;letter-spacing:3px;text-transform:uppercase`,
        `font-weight:${font.headWeight};font-size:20px;letter-spacing:-1px;color:${pal.accent}`,
    ]);
    return `<nav style="${navStyle}"><div style="${logoStyle}">${siteName}</div><div style="font-size:13px;color:${pal.muted};display:flex;gap:20px"><span>Home</span><span>Über</span><span>Kontakt</span></div></nav>`;
}

// ===== CTA BUTTONS =====
function buildCTA(rng, pal, cat) {
    const label = pick(rng, getCTALabels(cat));
    const style = pick(rng, [
        `display:inline-block;background:${pal.accent};color:#fff;padding:16px 40px;border-radius:99px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.5px`,
        `display:inline-block;background:${pal.accent};color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px`,
        `display:inline-block;background:transparent;color:${pal.accent};padding:14px 32px;border:2px solid ${pal.accent};border-radius:99px;text-decoration:none;font-weight:700;font-size:15px`,
        `display:inline-block;background:${pal.text};color:${pal.bg};padding:16px 40px;border-radius:6px;text-decoration:none;font-weight:700;font-size:15px`,
        `display:inline-block;background:linear-gradient(135deg,${pal.accent},${pal.accent}cc);color:#fff;padding:16px 44px;border-radius:14px;text-decoration:none;font-weight:700;font-size:15px;box-shadow:0 4px 20px ${pal.accent}40`,
        `display:inline-block;background:${pal.accent};color:#fff;padding:14px 36px;border-radius:0;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:2px;text-transform:uppercase`,
    ]);

    // Sometimes add second button
    if (rng() > 0.6) {
        const label2 = pick(rng, ['Mehr erfahren','Learn More','Details →','Ansehen']);
        return `<div style="display:flex;gap:14px;flex-wrap:wrap;${rng()>0.5?'justify-content:center':''}"><a href="#" style="${style}">${label}</a><a href="#" style="display:inline-block;padding:14px 28px;color:${pal.muted};text-decoration:none;font-weight:600;font-size:15px">${label2}</a></div>`;
    }
    return `<a href="#" style="${style}">${label}</a>`;
}

function getCTALabels(cat) {
    const map = {
        fitness:['JETZT STARTEN →','Probetraining buchen','Mitglied werden','Gratis testen','JOIN NOW','Los geht\'s'],
        restaurant:['Tisch reservieren →','Speisekarte ansehen','Jetzt reservieren','Reserve a Table'],
        portfolio:['Projekte ansehen →','Let\'s talk →','Kontakt','Zusammenarbeiten'],
        saas:['Get Started Free →','Start Trial','Try it Now →','Start Building','Sign Up Free'],
        shop:['Shop Now →','Kollektion entdecken','Jetzt shoppen','Neue Arrivals'],
        beauty:['Termin buchen ✨','Jetzt buchen →','Termin vereinbaren','Book Now'],
        medical:['Termin vereinbaren →','Online buchen','Jetzt anfragen'],
        music:['Stream Now 🎵','Tour Tickets →','Jetzt hören','Listen Now'],
        education:['Kurs starten →','Jetzt anmelden','Kostenlos testen'],
        event:['Tickets sichern →','Jetzt buchen','Event ansehen'],
    };
    return map[cat] || ['Mehr erfahren →','Jetzt starten →','Kontakt aufnehmen →','Loslegen →','Entdecken','Get Started'];
}

// ===== HERO TITLES — huge variety =====
function getHeroTitle(rng, cat, name, pal) {
    const ac = pal.accent;
    const allTitles = {
        fitness: [
            `PUSH YOUR <span style="color:${ac}">LIMITS</span>`,
            `<span style="color:${ac}">${name}</span> — Dein Gym`,
            `Stärker.<br><span style="color:${ac}">Jeden Tag.</span>`,
            `Train Hard.<br><span style="color:${ac}">Stay Humble.</span>`,
            `Your Body.<br><span style="color:${ac}">Your Rules.</span>`,
            `NO <span style="color:${ac}">EXCUSES</span>`,
            `Werde zur besten<br>Version von <span style="color:${ac}">DIR</span>`,
            `<span style="color:${ac}">POWER</span><br>beginnt hier`,
            `${name}<br><span style="color:${ac}">UNLEASHED</span>`,
            `Dein Körper.<br>Dein <span style="color:${ac}">Tempel</span>.`,
        ],
        restaurant: [
            `Willkommen bei<br><span style="color:${ac}">${name}</span>`,
            `Kulinarische<br><span style="color:${ac}">Exzellenz</span>`,
            `Genuss.<br><span style="color:${ac}">Neu definiert.</span>`,
            `<span style="color:${ac}">${name}</span>`,
            `Wo jeder<br>Bissen <span style="color:${ac}">zählt</span>`,
            `Fine <span style="color:${ac}">Dining</span><br>seit 2010`,
            `<span style="color:${ac}">Geschmack</span>,<br>der bleibt`,
            `${name} —<br>Mehr als <span style="color:${ac}">Essen</span>`,
        ],
        portfolio: [
            `Hi, ich bin<br><span style="color:${ac}">${name}</span>`,
            `Creative<br><span style="color:${ac}">Developer</span>`,
            `Design &<br><span style="color:${ac}">Development</span>`,
            `<span style="color:${ac}">${name}</span><br>Digital Creator`,
            `Code.<br>Design.<br><span style="color:${ac}">Impact.</span>`,
            `<span style="color:${ac}">Ideen</span>,<br>die leben`,
            `Building<br><span style="color:${ac}">the future</span>`,
        ],
        saas: [
            `Ship faster with<br><span style="color:${ac}">${name}</span>`,
            `<span style="color:${ac}">${name}</span> — Build Better`,
            `The future of<br><span style="color:${ac}">development</span>`,
            `Scale with<br><span style="color:${ac}">${name}</span>`,
            `Build.<br>Deploy.<br><span style="color:${ac}">Scale.</span>`,
            `<span style="color:${ac}">10x</span> your<br>workflow`,
            `One platform.<br><span style="color:${ac}">Infinite</span> power.`,
        ],
        shop: [
            `<span style="color:${ac}">${name}</span>`,
            `Curated.<br><span style="color:${ac}">For You.</span>`,
            `New Collection<br><span style="color:${ac}">2026</span>`,
            `Premium <span style="color:${ac}">Quality</span>`,
            `Discover<br><span style="color:${ac}">${name}</span>`,
            `Style meets<br><span style="color:${ac}">Substance</span>`,
        ],
        beauty: [
            `Deine Auszeit.<br><span style="color:${ac}">Dein Moment.</span>`,
            `<span style="color:${ac}">${name}</span><br>Beauty Studio`,
            `Schönheit.<br><span style="color:${ac}">Natürlich.</span>`,
            `Glow<br><span style="color:${ac}">Different</span>`,
            `<span style="color:${ac}">Beauty</span><br>beginnt hier`,
        ],
        medical: [
            `Ihre Gesundheit.<br><span style="color:${ac}">In besten Händen.</span>`,
            `<span style="color:${ac}">${name}</span>`,
            `Moderne Medizin.<br><span style="color:${ac}">Persönlich.</span>`,
            `Vertrauen.<br><span style="color:${ac}">Kompetenz.</span>`,
        ],
        music: [
            `<span style="color:${ac}">${name.toUpperCase()}</span>`,
            `NEW ALBUM<br><span style="color:${ac}">OUT NOW</span>`,
            `<span style="color:${ac}">WORLD TOUR</span><br>2026`,
            `Feel the<br><span style="color:${ac}">Sound</span>`,
        ],
    };
    const list = allTitles[cat] || [
        `${name}.<br><span style="color:${ac}">Neu gedacht.</span>`,
        `Willkommen bei<br><span style="color:${ac}">${name}</span>`,
        `<span style="color:${ac}">${name}</span> — Your Partner`,
        `Innovation.<br><span style="color:${ac}">Einfach.</span>`,
        `Wir machen<br><span style="color:${ac}">den Unterschied</span>`,
        `<span style="color:${ac}">Qualität</span>,<br>die überzeugt`,
        `Dein Partner<br>für <span style="color:${ac}">alles</span>`,
        `<span style="color:${ac}">${name}</span><br>since Day One`,
    ];
    return pick(rng, list);
}

function getHeroSub(rng, cat) {
    const subs = {
        fitness:['Werde die beste Version von dir. Modernste Geräte, erfahrene Trainer, grenzenlose Motivation.','Dein Körper verdient das Beste. Starte jetzt deine Transformation.','Kein Limit. Kein Aufgeben. Nur Ergebnisse.','Das Studio, das dich wirklich weiterbringt.','Trainiere smart. Lebe stark. Erreiche mehr.','Von Anfängern bis Profis — wir holen das Maximum aus dir raus.'],
        restaurant:['Kulinarische Erlebnisse, die in Erinnerung bleiben.','Frische Zutaten, leidenschaftliche Küche, unvergessliche Momente.','Wo Tradition auf Innovation trifft.','Genuss für alle Sinne — seit über 10 Jahren.','Jeder Teller erzählt eine Geschichte. Willkommen in unserer.','Saisonale Küche mit Liebe zum Detail.'],
        portfolio:['Ich gestalte digitale Erlebnisse die begeistern.','Design, Code und Kreativität — alles aus einer Hand.','Websites & Apps die nicht nur gut aussehen, sondern funktionieren.','Ich verwandle Ideen in digitale Realität.','Freelancer mit Leidenschaft für pixel-perfektes Design.'],
        saas:['The all-in-one platform to build, deploy, and scale.','Automate your workflow. Focus on what matters.','From idea to production in minutes, not months.','Developer tools that just work. No config, no hassle.','Built for teams who ship fast and break nothing.'],
        shop:['Kuratierte Produkte für den modernen Lifestyle.','Qualität, die man spürt. Design, das man sieht.','Entdecke unsere handverlesene Kollektion.','Premium-Qualität trifft zeitloses Design.'],
        beauty:['Professionelle Beauty-Treatments in entspannter Atmosphäre.','Weil du es dir wert bist. Premium-Pflege für jeden Hauttyp.','Entspannung, Pflege und ein strahlendes Ergebnis.','Dein Moment der Ruhe. Dein Moment des Glücks.'],
        medical:['Moderne Medizin mit persönlicher Betreuung. Jetzt online Termin buchen.','Ihre Gesundheit ist unsere Priorität. Kompetent und fürsorglich.','Vorsorge, Diagnostik und Behandlung — alles unter einem Dach.'],
        music:['New Album Out Now — Stream on all platforms.','Die Tour des Jahres — sichere dir jetzt deine Tickets.','Music that moves. Sounds that stay.'],
    };
    const list = subs[cat] || ['Professionell, zuverlässig und immer für Sie da.','Wir bringen Ihre Vision zum Leben.','Qualität und Innovation — seit Tag eins.','Ihr Partner für die digitale Zukunft.','Einfach. Schnell. Professionell.','Wir kümmern uns, damit Sie sich auf Wichtiges konzentrieren können.'];
    return pick(rng, list);
}

// ===== NAMES =====
function getDefaultName(rng, cat) {
    const names = {
        fitness:['FitZone','PowerGym','IronForge','FlexArena','PeakFit','CrossBase','BodyLab','GRIND','Titan Fitness','BeastMode'],
        restaurant:['La Maison','Gustavo','Saveurs','Zum Goldenen Hirsch','Fuego','Sakura','Olive & Thyme','Rosmarino','Casa Bella','Feuerstein'],
        portfolio:['Alex Meyer','Sarah Design','Studio Noir','Jonas Creative','Lena Works','Max Portfolio','Mia Digital','Erik Code'],
        saas:['LaunchPad','CloudSync','DataFlow','Nexus','Amplify','Orion','Vertex','Shipfast','BuildKit','CodePilot'],
        realestate:['Luxe Immobilien','Heimwert','Prime Estate','Stadtblick','NobleLiving','DreamHaus'],
        beauty:['Bloom Beauty','Glow Studio','Pure Skin','Serenity Spa','Radiance','Velvet Touch','Aura'],
        agency:['Neon Studio','Pixel Forge','Bold Agency','Orbit Creative','Signal Studio','BLVCK Agency'],
        shop:['MONO Store','Curated','Artisan','Maison','Thread & Co','Minimal Goods','NOIR','Elevate'],
        cafe:['Brew & Bean','The Roastery','Café Morgen','Daily Grind','Kaffeeklatsch','Bohne & Zeit'],
        medical:['Dr. Schmidt Praxis','MediCare Plus','Gesund & Fit','Praxis am Park','VitaDoc'],
        education:['LearnHub','SkillForge','Akademie Plus','EduPath','BrainBoost','WissenWert'],
        music:['NOVA','Echo Chamber','Midnight Pulse','Voltage','Drift','AXIOM','Zero Gravity'],
        law:['Weber & Partner','Kanzlei Stern','Recht & Rat','Justice Group','Lexikon Recht'],
        event:['Neon Nights','Eventful','Starlight Events','The Venue','EPIC Events'],
        pet:['Happy Paws','Tierliebe','Fellnase','PetCare Plus','Pfötchen'],
        auto:['AutoHaus Schmidt','SpeedWerk','Garage 42','CarCare Pro','MotorWelt'],
        travel:['Wanderlust','TravelWise','FernReise','Horizon Tours','Globe & Go'],
        tech:['ByteForce','CyberShield','CloudNine','NexTech','DigitalPulse'],
        photo:['LensCraft','FrameWork','Studio Licht','PixelPerfect','Moment Studio'],
        generic:['Starter Co','NexGen','Bright Solutions','Quantum','Elevate','Zenith','Pulse','Vanguard','Apex','Prism'],
    };
    return pick(rng, names[cat] || names.generic);
}

function getCatEmoji(rng, cat) {
    const emojis = {
        fitness:['🏋️','💪','🥊','🏃','🔥','⚡'],
        restaurant:['🍽️','👨‍🍳','🍷','🥘','🍕','🌿'],
        portfolio:['💻','🎨','✨','🖥️','📐','🎯'],
        saas:['🚀','⚡','📊','☁️','🔧','💡'],
        shop:['👜','🛍️','✨','📦','💎','🏷️'],
        beauty:['💅','✨','🌸','💆','🧖','🌺'],
        medical:['🏥','🩺','💊','❤️','🫀','🌡️'],
        music:['🎵','🎸','🎤','🎹','🥁','🎧'],
        education:['📚','🎓','💡','🧠','✏️','🏫'],
        event:['🎉','🥂','✨','🎊','🪩','🎭'],
    };
    return pick(rng, emojis[cat] || ['🚀','⚡','💡','✨','🌟','💫']);
}

// ===== SECTION BUILDERS =====
function buildGridSection(rng, pal, font, items, title) {
    const cardStyle = pick(rng, [
        `background:${pal.card};border:1px solid ${pal.border};border-radius:16px;padding:28px`,
        `background:${pal.card};border-left:3px solid ${pal.accent};border-radius:4px;padding:24px 28px`,
        `background:linear-gradient(135deg,${pal.card},${pal.accent}08);border:1px solid ${pal.border};border-radius:20px;padding:32px`,
        `background:${pal.card};border:1px solid ${pal.border};border-radius:8px;padding:24px;border-top:3px solid ${pal.accent}`,
        `background:transparent;border:1px solid ${pal.border};border-radius:12px;padding:24px`,
        `background:${pal.accent}08;border:none;border-radius:16px;padding:28px`,
    ]);
    const cols = pick(rng, ['repeat(auto-fit,minmax(220px,1fr))','repeat(auto-fit,minmax(260px,1fr))','repeat(auto-fit,minmax(200px,1fr))']);
    const gap = pick(rng, ['16px','20px','12px','24px']);
    return `<div style="padding:80px 24px;max-width:1100px;margin:0 auto"><h2 style="font-size:${pick(rng,['28px','32px','24px'])};font-weight:${font.headWeight};text-align:center;margin-bottom:${pick(rng,['32px','40px','24px'])};letter-spacing:-0.5px">${title}</h2><div style="display:grid;grid-template-columns:${cols};gap:${gap}">${items.map(it => `<div style="${cardStyle};transition:transform 0.3s"><div style="font-size:${pick(rng,['32px','28px','36px'])};margin-bottom:12px">${it.icon}</div><h3 style="font-size:17px;font-weight:700;margin-bottom:6px">${it.title}</h3><p style="font-size:13px;color:${pal.muted};line-height:1.5">${it.desc}</p>${it.price?`<div style="margin-top:12px;font-weight:700;color:${pal.accent}">${it.price}</div>`:''}</div>`).join('')}</div></div>`;
}

function buildPricingSection(rng, pal, font, plans, title) {
    const cardStyle = pick(rng, [
        (featured) => `background:${featured?pal.accent+'10':pal.card};border:${featured?'2px':'1px'} solid ${featured?pal.accent:pal.border};border-radius:16px;padding:32px;text-align:center;${featured?'transform:scale(1.03);':''}`,
        (featured) => `background:${pal.card};border:1px solid ${pal.border};border-radius:8px;padding:28px;text-align:center;${featured?'border-top:4px solid '+pal.accent:''}`,
        (featured) => `background:${featured?'linear-gradient(135deg,'+pal.accent+'15,'+pal.accent+'05)':pal.card};border:1px solid ${pal.border};border-radius:20px;padding:36px;text-align:center`,
    ]);
    return `<div style="padding:80px 24px;max-width:1000px;margin:0 auto"><h2 style="font-size:28px;font-weight:${font.headWeight};text-align:center;margin-bottom:36px">${title}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">${plans.map((p,i) => `<div style="${cardStyle(i===1)}"><div style="font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${pal.muted};margin-bottom:12px">${p.name}</div><div style="font-size:36px;font-weight:${font.headWeight};margin-bottom:16px">${p.price}<span style="font-size:14px;color:${pal.muted}">${p.period||'/mo'}</span></div><ul style="list-style:none;margin-bottom:24px;font-size:14px;color:${pal.muted};line-height:2">${p.features.map(f=>`<li>✓ ${f}</li>`).join('')}</ul><a href="#" style="display:block;padding:12px;background:${i===1?pal.accent:pal.card};color:${i===1?'#fff':pal.text};border:1px solid ${i===1?pal.accent:pal.border};border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">${p.cta}</a></div>`).join('')}</div></div>`;
}

function buildStatsSection(rng, pal, stats) {
    const style = pick(rng, [
        `display:flex;justify-content:center;gap:48px;flex-wrap:wrap;padding:60px 24px;text-align:center`,
        `display:flex;justify-content:center;gap:32px;flex-wrap:wrap;padding:60px 24px;text-align:center;background:${pal.accent}08;border-radius:20px;margin:0 24px`,
        `display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:24px;padding:60px 24px;max-width:900px;margin:0 auto;text-align:center`,
    ]);
    return `<div style="${style}">${stats.map(s => `<div><div style="font-size:${pick(rng,['36px','42px','32px'])};font-weight:${pick(rng,[900,800,700])};color:${rng()>0.5?pal.accent:pal.text}">${s.val}</div><div style="font-size:13px;color:${pal.muted};margin-top:4px">${s.label}</div></div>`).join('')}</div>`;
}

function buildTestimonialsSection(rng, pal, font, testimonials, title) {
    return `<div style="padding:80px 24px;max-width:900px;margin:0 auto"><h2 style="font-size:28px;font-weight:${font.headWeight};text-align:center;margin-bottom:36px">${title}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px">${testimonials.map(t => `<div style="background:${pal.card};border:1px solid ${pal.border};border-radius:${pick(rng,['16px','12px','8px'])};padding:28px"><p style="font-size:15px;line-height:1.6;color:${pal.muted};font-style:italic;margin-bottom:16px">"${t.text}"</p><div style="font-weight:700;font-size:14px">${t.author}</div></div>`).join('')}</div></div>`;
}

function buildContactSection(rng, pal, font, title) {
    const formStyle = pick(rng, [
        // Centered form
        `<div style="max-width:480px;margin:0 auto"><div style="display:grid;gap:12px"><input placeholder="Name" style="padding:14px 18px;background:${pal.card};border:1px solid ${pal.border};border-radius:10px;color:${pal.text};font-size:15px;outline:none"><input placeholder="E-Mail" style="padding:14px 18px;background:${pal.card};border:1px solid ${pal.border};border-radius:10px;color:${pal.text};font-size:15px;outline:none"><textarea placeholder="Nachricht" rows="4" style="padding:14px 18px;background:${pal.card};border:1px solid ${pal.border};border-radius:10px;color:${pal.text};font-size:15px;outline:none;resize:vertical"></textarea><button style="padding:14px;background:${pal.accent};color:#fff;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer">Absenden</button></div></div>`,
        // Split layout
        `<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;max-width:800px;margin:0 auto"><div><h3 style="font-size:18px;font-weight:700;margin-bottom:12px">Schreib uns</h3><p style="font-size:14px;color:${pal.muted};line-height:1.7">Wir melden uns innerhalb von 24 Stunden.</p><div style="margin-top:20px;font-size:14px;color:${pal.muted};line-height:2">📧 hello@example.com<br>📞 +49 123 456 789<br>📍 Musterstraße 1, Berlin</div></div><div style="display:grid;gap:12px"><input placeholder="Name" style="padding:12px 16px;background:${pal.card};border:1px solid ${pal.border};border-radius:8px;color:${pal.text};font-size:14px;outline:none"><input placeholder="E-Mail" style="padding:12px 16px;background:${pal.card};border:1px solid ${pal.border};border-radius:8px;color:${pal.text};font-size:14px;outline:none"><textarea placeholder="Nachricht" rows="3" style="padding:12px 16px;background:${pal.card};border:1px solid ${pal.border};border-radius:8px;color:${pal.text};font-size:14px;outline:none;resize:vertical"></textarea><button style="padding:12px;background:${pal.accent};color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer">Senden</button></div></div>`,
    ]);
    return `<div style="padding:80px 24px"><h2 style="font-size:28px;font-weight:${font.headWeight};text-align:center;margin-bottom:36px">${title}</h2>${formStyle}</div>`;
}

function buildCTABanner(rng, pal, font, cat) {
    const text = pick(rng, [
        'Bereit loszulegen?','Jetzt anfangen','Worauf wartest du?','Lass uns starten','Ready to go?','Don\'t wait','Überzeugt?',
    ]);
    const sub = pick(rng, [
        'Kontaktiere uns noch heute.','Starte jetzt — kostenlos.','Wir freuen uns auf dich.','Der erste Schritt ist der wichtigste.','Keine Verpflichtungen.',
    ]);
    const style = pick(rng, [
        `text-align:center;padding:80px 24px;background:linear-gradient(135deg,${pal.accent}12,${pal.accent}05);border-radius:20px;margin:40px 24px`,
        `text-align:center;padding:80px 24px;border-top:1px solid ${pal.border};border-bottom:1px solid ${pal.border}`,
        `text-align:center;padding:80px 24px;background:${pal.accent};color:#fff;margin:40px 0`,
    ]);
    return `<div style="${style}"><h2 style="font-size:32px;font-weight:${font.headWeight};margin-bottom:12px">${text}</h2><p style="font-size:16px;opacity:0.7;margin-bottom:28px">${sub}</p>${buildCTA(rng, pal, cat)}</div>`;
}

function buildFAQSection(rng, pal, font) {
    const faqs = shuffle(rng, [
        {q:'Wie lange dauert es?',a:'In der Regel sind Projekte innerhalb von 1-3 Werktagen fertig.'},
        {q:'Was kostet das?',a:'Individuelle Preise je nach Umfang. Fordern Sie ein kostenloses Angebot an.'},
        {q:'Gibt es eine Garantie?',a:'Ja, wir bieten 30 Tage Zufriedenheitsgarantie auf alle Projekte.'},
        {q:'Kann ich Änderungen anfordern?',a:'Selbstverständlich. 3 Revisionsrunden sind im Preis inbegriffen.'},
        {q:'Welche Zahlungsmethoden gibt es?',a:'Kreditkarte, PayPal, Überweisung — alles möglich.'},
        {q:'Brauche ich technische Vorkenntnisse?',a:'Nein, wir kümmern uns um alles. Sie beschreiben, wir liefern.'},
    ]).slice(0, 3 + Math.floor(rng() * 3));
    return `<div style="padding:80px 24px;max-width:700px;margin:0 auto"><h2 style="font-size:28px;font-weight:${font.headWeight};text-align:center;margin-bottom:36px">${pick(rng,['Häufige Fragen','FAQ','Fragen & Antworten'])}</h2>${faqs.map(f => `<div style="border-bottom:1px solid ${pal.border};padding:20px 0"><div style="font-weight:700;font-size:16px;margin-bottom:8px">${f.q}</div><div style="font-size:14px;color:${pal.muted};line-height:1.6">${f.a}</div></div>`).join('')}</div>`;
}

// ===== CONTENT DATA =====
function getServices(rng, cat) {
    const all = {
        fitness: [
            {icon:'🏋️',title:'Krafttraining',desc:'Freie Gewichte & modernste Geräte'},
            {icon:'🏃',title:'Cardio',desc:'Laufbänder, Crosstrainer, Rudern'},
            {icon:'🧘',title:'Yoga & Stretch',desc:'Flexibilität und innere Ruhe'},
            {icon:'🥊',title:'Kampfsport',desc:'Boxen, Kickboxen, MMA'},
            {icon:'💪',title:'Personal Training',desc:'1-on-1 mit zertifizierten Trainern'},
            {icon:'🏃‍♀️',title:'Gruppenkurse',desc:'HIIT, Spinning, Zumba & mehr'},
            {icon:'🥗',title:'Ernährungsberatung',desc:'Individuelle Ernährungspläne'},
            {icon:'🧖',title:'Wellness',desc:'Sauna, Dampfbad, Recovery'},
            {icon:'⚡',title:'HIIT Training',desc:'Hochintensiv, effektiv, kurz'},
            {icon:'🏊',title:'Schwimmen',desc:'25m Pool, Aqua-Fitness'},
            {icon:'🧗',title:'Bouldern',desc:'Indoor-Kletterwand für alle Level'},
            {icon:'🤸',title:'Funktional',desc:'TRX, Kettlebells, Mobility'},
        ],
        restaurant: [
            {icon:'🥘',title:'Vorspeisen',desc:'Tatar, Carpaccio, Suppen'},
            {icon:'🥩',title:'Hauptgerichte',desc:'Fleisch, Fisch, Vegetarisch'},
            {icon:'🍰',title:'Desserts',desc:'Hausgemachte Süßspeisen'},
            {icon:'🍷',title:'Weinkarte',desc:'Über 200 ausgewählte Weine'},
            {icon:'🌿',title:'Farm to Table',desc:'Regionale Zutaten, saisonal'},
            {icon:'👨‍🍳',title:'Chef\'s Table',desc:'Exklusives 7-Gänge-Menü'},
            {icon:'🎉',title:'Events',desc:'Private Dining & Feiern'},
            {icon:'🚚',title:'Lieferservice',desc:'Genuss direkt zu dir'},
        ],
        saas: [
            {icon:'🚀',title:'Lightning Deploy',desc:'Ship in seconds, not hours.'},
            {icon:'🔒',title:'Secure by Default',desc:'Enterprise-grade security.'},
            {icon:'📊',title:'Analytics',desc:'Real-time insights & dashboards.'},
            {icon:'🔄',title:'Auto-Scaling',desc:'Grows with your traffic.'},
            {icon:'⚡',title:'API First',desc:'Powerful REST & GraphQL APIs.'},
            {icon:'🧩',title:'Integrations',desc:'Connect 500+ tools.'},
            {icon:'👥',title:'Team Collab',desc:'Real-time multiplayer editing.'},
            {icon:'🌍',title:'Global CDN',desc:'Fast everywhere.'},
        ],
        shop: [
            {icon:'⌚',title:'Uhren',desc:'Minimalistische Timepieces',price:'ab €189'},
            {icon:'🎧',title:'Audio',desc:'Premium Headphones',price:'ab €129'},
            {icon:'🕶️',title:'Eyewear',desc:'Zeitlose Sonnenbrillen',price:'ab €79'},
            {icon:'👟',title:'Sneaker',desc:'Urban Streetwear',price:'ab €159'},
            {icon:'👜',title:'Taschen',desc:'Handgefertigtes Leder',price:'ab €249'},
            {icon:'💍',title:'Schmuck',desc:'Minimalistisch & elegant',price:'ab €89'},
            {icon:'🧥',title:'Outerwear',desc:'Premium Jacken & Mäntel',price:'ab €349'},
            {icon:'🎁',title:'Gift Sets',desc:'Kuratierte Geschenkboxen',price:'ab €69'},
        ],
        beauty: [
            {icon:'💇',title:'Haarschnitt',desc:'Schnitt, Styling & Beratung'},
            {icon:'💅',title:'Maniküre',desc:'Nagelpflege & Gel-Design'},
            {icon:'💆',title:'Gesichtsbehandlung',desc:'Reinigung, Peeling, Maske'},
            {icon:'🧖',title:'Massage',desc:'Entspannung pur'},
            {icon:'✨',title:'Microblading',desc:'Perfekte Augenbrauen'},
            {icon:'🌸',title:'Waxing',desc:'Sanft und gründlich'},
        ],
        medical: [
            {icon:'🩺',title:'Allgemeinmedizin',desc:'Vorsorge & Diagnostik'},
            {icon:'💉',title:'Impfungen',desc:'Reise- & Standardimpfungen'},
            {icon:'🫀',title:'Kardiologie',desc:'Herz-Kreislauf Checkup'},
            {icon:'🧠',title:'Neurologie',desc:'Kopfschmerz & Migräne'},
            {icon:'🦴',title:'Orthopädie',desc:'Gelenke & Bewegung'},
            {icon:'👁️',title:'Augenheilkunde',desc:'Sehtest & Behandlung'},
        ],
    };
    const pool = all[cat] || [
        {icon:'⚡',title:'Schnell',desc:'Blitzschnelle Ergebnisse.'},
        {icon:'💎',title:'Qualität',desc:'Premium auf ganzer Linie.'},
        {icon:'🤝',title:'Persönlich',desc:'Individuell für Sie.'},
        {icon:'🔒',title:'Sicher',desc:'Datenschutz hat Priorität.'},
        {icon:'📞',title:'Support',desc:'24/7 erreichbar.'},
        {icon:'🌍',title:'Global',desc:'Weltweit verfügbar.'},
        {icon:'🔧',title:'Flexibel',desc:'Anpassbar an Ihre Bedürfnisse.'},
        {icon:'💡',title:'Innovation',desc:'Immer einen Schritt voraus.'},
    ];
    return pickN(rng, pool, 3 + Math.floor(rng() * 3));
}

function getServiceTitle(rng, cat) {
    const titles = {
        fitness:['Unser Angebot','Trainingsmöglichkeiten','Was wir bieten','Deine Möglichkeiten','Trainiere wie ein Profi'],
        restaurant:['Unsere Küche','Kulinarische Highlights','Das erwartet Sie','Speisekarte','Unser Angebot'],
        saas:['Features','What\'s included','Powerful Features','Core Capabilities','Built for Speed'],
        shop:['Bestseller','Unsere Kollektion','Trending Now','Neue Arrivals','Top Picks'],
        beauty:['Treatments','Unsere Leistungen','Verwöhnprogramm','Beauty Menu'],
        medical:['Unsere Fachbereiche','Leistungsspektrum','Medizinische Services'],
    };
    return pick(rng, titles[cat] || ['Unsere Leistungen','Was wir bieten','Services','Unser Angebot','Das können wir','Leistungen']);
}

function getPricing(rng, cat) {
    const all = {
        fitness: [
            [{name:'Starter',price:'29€',period:'/mo',features:['Mo-Fr 8-20 Uhr','Gerätetraining','Duschen'],cta:'Auswählen'},{name:'Pro',price:'49€',period:'/mo',features:['24/7 Zugang','Alle Kurse','1x Personal/Mo','Sauna'],cta:'Beliebteste'},{name:'Elite',price:'89€',period:'/mo',features:['VIP 24/7','Unlimited Personal','Recovery Zone','Gästekarte'],cta:'Premium'}],
            [{name:'Basic',price:'19€',period:'/mo',features:['10x Zutritt/Mo','Gerätetraining','App-Zugang'],cta:'Starten'},{name:'Unlimited',price:'39€',period:'/mo',features:['Unbegrenzter Zutritt','Alle Kurse','Körperanalyse'],cta:'Am beliebtesten'},{name:'VIP',price:'79€',period:'/mo',features:['Alles in Unlimited','Personal Training','Spa-Bereich'],cta:'VIP werden'}],
        ],
        saas: [
            [{name:'Starter',price:'$0',period:'/mo',features:['1 Project','1GB Storage','Community'],cta:'Start Free'},{name:'Pro',price:'$29',period:'/mo',features:['Unlimited Projects','50GB','Priority Support'],cta:'Go Pro'},{name:'Enterprise',price:'$99',period:'/mo',features:['Everything in Pro','SSO','SLA 99.99%'],cta:'Contact Sales'}],
            [{name:'Hobby',price:'$0',period:'/mo',features:['3 Projects','5GB Storage','Email Support'],cta:'Get Started'},{name:'Team',price:'$49',period:'/mo',features:['Unlimited Projects','100GB','Team Management'],cta:'Most Popular'},{name:'Business',price:'$149',period:'/mo',features:['Dedicated Infra','Custom Domain','24/7 Support'],cta:'Talk to Sales'}],
        ],
    };
    const list = all[cat];
    return list ? pick(rng, list) : [
        {name:'Basic',price:'€49',period:'/mo',features:['Grundpaket','E-Mail Support','1 Nutzer'],cta:'Starten'},
        {name:'Pro',price:'€99',period:'/mo',features:['Alles in Basic','Priorität','5 Nutzer'],cta:'Empfohlen'},
        {name:'Enterprise',price:'€249',period:'/mo',features:['Unlimited','Dedicated Support','Custom'],cta:'Kontakt'},
    ];
}

function getStats(rng, cat) {
    const all = {
        fitness:[
            [{val:'5.000+',label:'Mitglieder'},{val:'50+',label:'Kurse/Woche'},{val:'4.9★',label:'Bewertung'},{val:'15+',label:'Trainer'}],
            [{val:'12.000+',label:'Workouts/Mo'},{val:'98%',label:'Zufriedenheit'},{val:'3',label:'Standorte'},{val:'24/7',label:'Geöffnet'}],
        ],
        restaurant:[
            [{val:'15+',label:'Jahre'},{val:'50.000+',label:'Gäste/Jahr'},{val:'4.8★',label:'Google'},{val:'200+',label:'Weine'}],
            [{val:'3',label:'Michelin ★'},{val:'120',label:'Sitzplätze'},{val:'25',label:'im Team'},{val:'100%',label:'Frisch'}],
        ],
        saas:[
            [{val:'50K+',label:'Users'},{val:'99.9%',label:'Uptime'},{val:'150+',label:'Countries'},{val:'4.9★',label:'G2'}],
            [{val:'1M+',label:'API Calls/Day'},{val:'500+',label:'Integrations'},{val:'<50ms',label:'Latency'},{val:'SOC2',label:'Certified'}],
        ],
    };
    const list = all[cat];
    return list ? pick(rng, list) : [{val:'1.000+',label:'Kunden'},{val:'10+',label:'Jahre Erfahrung'},{val:'4.8★',label:'Bewertung'},{val:'99%',label:'Zufriedenheit'}];
}

function getTestimonials(rng) {
    const all = [
        {text:'Absolut professionell und zuverlässig. Kann ich nur empfehlen!',author:'Marie K.'},
        {text:'Bester Service den ich je hatte. Schnell, freundlich, kompetent.',author:'Thomas S.'},
        {text:'Seit 3 Jahren Stammkunde. Qualität stimmt einfach immer.',author:'Lisa M.'},
        {text:'Top Preis-Leistung! Werde definitiv wiederkommen.',author:'Jan B.'},
        {text:'Übertrifft jede Erwartung. Absolut empfehlenswert.',author:'Sarah H.'},
        {text:'Professionell von A bis Z. Genau das was ich gesucht habe.',author:'Michael R.'},
        {text:'Hat meine Erwartungen komplett übertroffen. Mega!',author:'Anna W.'},
        {text:'Einfach nur wow. Kann man nicht besser machen.',author:'David L.'},
        {text:'Von Anfang an super betreut. Danke!',author:'Nina F.'},
        {text:'Schnell, unkompliziert, top Ergebnis.',author:'Felix P.'},
    ];
    return pickN(rng, all, 2 + Math.floor(rng() * 2));
}

// ===== MAIN GENERATOR =====
function getExampleForPrompt(prompt) {
    const rng = makeRng(prompt);
    const cat = detectCategory(prompt);
    const mood = detectMood(prompt);
    const pal = generatePalette(rng, mood, cat);
    const font = pick(rng, allFonts);
    const siteName = extractName(prompt) || getDefaultName(rng, cat);
    const emoji = getCatEmoji(rng, cat);

    // Build nav
    const navHtml = buildNav(rng, pal, font, siteName);

    // Build hero content
    const heroTitle = getHeroTitle(rng, cat, siteName, pal);
    const heroSub = getHeroSub(rng, cat);
    const ctaHtml = buildCTA(rng, pal, cat);

    // Pick sections to include (randomized)
    const sectionBuilders = [];

    // Services — almost always
    if (rng() > 0.1) {
        sectionBuilders.push(() => buildGridSection(rng, pal, font, getServices(rng, cat), getServiceTitle(rng, cat)));
    }

    // Stats
    if (rng() > 0.4) {
        sectionBuilders.push(() => buildStatsSection(rng, pal, getStats(rng, cat)));
    }

    // Pricing
    if (rng() > 0.35) {
        sectionBuilders.push(() => buildPricingSection(rng, pal, font, getPricing(rng, cat), pick(rng, ['Unsere Pakete','Preise','Pricing','Tarife'])));
    }

    // Testimonials
    if (rng() > 0.45) {
        sectionBuilders.push(() => buildTestimonialsSection(rng, pal, font, getTestimonials(rng), pick(rng, ['Kundenstimmen','Das sagen unsere Kunden','Bewertungen','Feedback'])));
    }

    // FAQ
    if (rng() > 0.55) {
        sectionBuilders.push(() => buildFAQSection(rng, pal, font));
    }

    // CTA Banner
    if (rng() > 0.4) {
        sectionBuilders.push(() => buildCTABanner(rng, pal, font, cat));
    }

    // Contact
    if (rng() > 0.3) {
        sectionBuilders.push(() => buildContactSection(rng, pal, font, pick(rng, ['Kontakt','Schreib uns','Get in Touch','Nachricht senden'])));
    }

    // Ensure at least 2 sections
    if (sectionBuilders.length < 2) {
        sectionBuilders.push(() => buildGridSection(rng, pal, font, getServices(rng, cat), getServiceTitle(rng, cat)));
        sectionBuilders.push(() => buildContactSection(rng, pal, font, 'Kontakt'));
    }

    // Shuffle section order
    const shuffled = shuffle(rng, sectionBuilders);
    const sectionsHtml = shuffled.map(fn => fn()).join('');

    // Footer
    const footer = `<footer style="text-align:center;padding:40px;border-top:1px solid ${pal.border};color:${pal.muted};font-size:12px">© 2026 ${siteName}. Alle Rechte vorbehalten.</footer>`;

    // Pick layout
    const layoutFn = pick(rng, layoutFns);
    const body = layoutFn(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sectionsHtml + footer, navHtml, emoji);

    // Build full HTML
    const isDark = pal.bg.match(/^#[012]/);
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:${font.family};background:${pal.bg};color:${pal.text};-webkit-font-smoothing:antialiased;font-size:${font.bodySize}}a{transition:opacity 0.2s;text-decoration:none}a:hover{opacity:0.85}input,textarea,button{font-family:inherit}@media(max-width:640px){h1{font-size:32px!important}nav{padding:12px 16px!important}[style*="grid-template-columns"]{grid-template-columns:1fr!important}[style*="flex-direction:row-reverse"]{flex-direction:column!important}[style*="gap:60px"]{gap:32px!important}[style*="padding:60px 8vw"],[style*="padding:80px 8vw"],[style*="padding:100px 10vw"]{padding:40px 16px!important}}</style></head><body>${body}</body></html>`;
}
