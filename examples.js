// =============================================
// DEVDASH — Dynamic Site Generator v3
// PREMIUM quality — every prompt → unique, professional result
// =============================================

function makeRng(prompt) {
    let seed = Date.now() ^ (Math.random() * 0xFFFFFFFF >>> 0);
    for (let i = 0; i < prompt.length; i++) seed = ((seed << 5) - seed + prompt.charCodeAt(i)) | 0;
    return function() { seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF; return (seed >>> 0) / 0xFFFFFFFF; };
}
function rPick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function pickN(rng, arr, n) { const c=[...arr]; const o=[]; for(let i=0;i<Math.min(n,c.length);i++){const j=Math.floor(rng()*c.length);o.push(c.splice(j,1)[0]);}return o; }
function shuffle(rng, arr) { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }

// ===== CATEGORY DETECTION =====
function detectCategory(prompt) {
    const p = prompt.toLowerCase();
    const cats = [
        ['fitness',/fitness|gym|sport|training|kraft|studio|yoga|crossfit|boxen|kampfsport/],
        ['restaurant',/restaurant|essen|food|küche|bistro|speise|gastro|sushi|pizza|burger|grill|koch/],
        ['portfolio',/portfolio|kreativ|designer|fotograf|künstler|freelanc|persön|lebenslauf|cv/],
        ['saas',/saas|app|startup|platform|software|tool|dashboard|analytics|api/],
        ['realestate',/immobilie|real.?estate|haus|wohnung|makler|property/],
        ['beauty',/beauty|salon|kosmetik|friseur|nail|spa|wellness|massage/],
        ['agency',/agentur|agency|kreativ.*agentur|marketing|brand|werbe/],
        ['shop',/shop|store|ecommerce|produkt|verkauf|online.?shop|laden|mode|fashion/],
        ['cafe',/café|cafe|coffee|kaffee|bäcker|bakery/],
        ['medical',/arzt|praxis|doctor|medical|gesundheit|klinik|dental|zahnarzt|therapeut|physio/],
        ['education',/kurs|schule|education|learn|akademie|coach|seminar|nachhilfe|online.?kurs/],
        ['music',/musik|band|artist|album|song|concert|tour|dj|producer/],
        ['law',/anwalt|kanzlei|recht|law|jurist|notar|rechtsanwalt|steuerberater/],
        ['event',/bar|cocktail|club|lounge|nachtleben|event|party|hochzeit|wedding/],
        ['pet',/tier|pet|hund|katze|tierarzt|hundesalon/],
        ['auto',/auto|car|werkstatt|kfz|garage|fahrzeug/],
        ['travel',/reise|travel|hotel|booking|urlaub|flug/],
        ['tech',/tech|it|cyber|security|cloud|server|hosting|netzwerk/],
        ['photo',/foto|photo|studio|shooting|bild|galerie/],
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
    if (p.match(/neon|cyber|futurist|zukunft|tech/)) return 'neon';
    return null;
}

// ===== UNSPLASH IMAGES — real photos =====
function getHeroImage(rng, cat) {
    const images = {
        fitness: [
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
            'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80',
            'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80',
        ],
        restaurant: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
            'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80',
        ],
        portfolio: [
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
        ],
        saas: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
        ],
        shop: [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80',
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80',
        ],
        beauty: [
            'https://images.unsplash.com/photo-1560750588-73b555dce5f8?w=1200&q=80',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80',
        ],
        medical: [
            'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
            'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
        ],
        music: [
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80',
        ],
        cafe: [
            'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
        ],
        travel: [
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
        ],
        realestate: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        ],
        education: [
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
        ],
        event: [
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
            'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
        ],
        auto: [
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
        ],
        agency: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
            'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80',
        ],
        tech: [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
        ],
        photo: [
            'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1200&q=80',
            'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&q=80',
        ],
    };
    const pool = images[cat] || [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
    ];
    return rPick(rng, pool);
}

function getCardImages(rng, cat) {
    const images = {
        fitness: [
            'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
        ],
        restaurant: [
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
            'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80',
        ],
        shop: [
            'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80',
            'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
        ],
        beauty: [
            'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
            'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80',
            'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80',
        ],
    };
    return images[cat] || [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
        'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80',
    ];
}

// ===== PREMIUM COLOR PALETTES =====
function generatePalette(rng, mood, cat) {
    const palettes = [
        // Premium darks
        {bg:'#09090b',card:'#18181b',border:'#27272a',text:'#fafafa',muted:'#a1a1aa',accent:'#8b5cf6'},
        {bg:'#0a0a0a',card:'#171717',border:'#262626',text:'#fafafa',muted:'#a3a3a3',accent:'#ef4444'},
        {bg:'#0c0a09',card:'#1c1917',border:'#292524',text:'#fafaf9',muted:'#a8a29e',accent:'#f97316'},
        {bg:'#020617',card:'#0f172a',border:'#1e293b',text:'#f8fafc',muted:'#94a3b8',accent:'#3b82f6'},
        {bg:'#030712',card:'#111827',border:'#1f2937',text:'#f9fafb',muted:'#9ca3af',accent:'#10b981'},
        {bg:'#0a0a0a',card:'#141414',border:'#222',text:'#fff',muted:'#888',accent:'#ec4899'},
        {bg:'#0f0b1a',card:'#1a1425',border:'#2a2040',text:'#f0e8ff',muted:'#9080b0',accent:'#a855f7'},
        {bg:'#0a1014',card:'#121c24',border:'#1c2c38',text:'#e8f4ff',muted:'#7090a8',accent:'#06b6d4'},
        // Premium lights
        {bg:'#ffffff',card:'#ffffff',border:'#e5e7eb',text:'#111827',muted:'#6b7280',accent:'#8b5cf6'},
        {bg:'#fafafa',card:'#ffffff',border:'#e4e4e7',text:'#09090b',muted:'#71717a',accent:'#ef4444'},
        {bg:'#f8fafc',card:'#ffffff',border:'#e2e8f0',text:'#0f172a',muted:'#64748b',accent:'#3b82f6'},
        {bg:'#faf5ff',card:'#ffffff',border:'#e9d5ff',text:'#1e1b4b',muted:'#7c3aed',accent:'#7c3aed'},
        {bg:'#f0fdf4',card:'#ffffff',border:'#bbf7d0',text:'#052e16',muted:'#16a34a',accent:'#16a34a'},
        {bg:'#fff7ed',card:'#ffffff',border:'#fed7aa',text:'#431407',muted:'#c2410c',accent:'#ea580c'},
        {bg:'#fefce8',card:'#ffffff',border:'#fde68a',text:'#422006',muted:'#a16207',accent:'#ca8a04'},
        {bg:'#f0f9ff',card:'#ffffff',border:'#bae6fd',text:'#0c4a6e',muted:'#0284c7',accent:'#0284c7'},
        // Warm neutrals
        {bg:'#fafaf9',card:'#ffffff',border:'#e7e5e4',text:'#1c1917',muted:'#78716c',accent:'#b45309'},
        {bg:'#f5f5f4',card:'#ffffff',border:'#d6d3d1',text:'#1c1917',muted:'#78716c',accent:'#dc2626'},
        // Bold
        {bg:'#000000',card:'#0a0a0a',border:'#1a1a1a',text:'#ffffff',muted:'#666',accent:'#ffffff'},
        {bg:'#18181b',card:'#27272a',border:'#3f3f46',text:'#fafafa',muted:'#a1a1aa',accent:'#fbbf24'},
    ];
    let pool = palettes;
    if (mood === 'dark' || mood === 'neon') pool = palettes.filter(p => p.bg.match(/^#[012]/));
    else if (mood === 'light' || mood === 'minimal') pool = palettes.filter(p => !p.bg.match(/^#[012]/));
    if (pool.length < 3) pool = palettes;
    return rPick(rng, pool);
}

// ===== PREMIUM FONTS (Google Fonts) =====
const allFonts = [
    {family:"'Inter',system-ui,sans-serif",headWeight:800,bodySize:'16px',import:'Inter:wght@400;500;600;700;800'},
    {family:"'DM Sans',system-ui,sans-serif",headWeight:700,bodySize:'16px',import:'DM+Sans:wght@400;500;700'},
    {family:"'Plus Jakarta Sans',sans-serif",headWeight:800,bodySize:'16px',import:'Plus+Jakarta+Sans:wght@400;500;600;700;800'},
    {family:"'Outfit',sans-serif",headWeight:700,bodySize:'16px',import:'Outfit:wght@400;500;600;700'},
    {family:"'Space Grotesk',sans-serif",headWeight:700,bodySize:'16px',import:'Space+Grotesk:wght@400;500;600;700'},
    {family:"'Sora',sans-serif",headWeight:800,bodySize:'16px',import:'Sora:wght@400;500;600;700;800'},
    {family:"'Manrope',sans-serif",headWeight:800,bodySize:'16px',import:'Manrope:wght@400;500;600;700;800'},
    {family:"'General Sans',system-ui,sans-serif",headWeight:700,bodySize:'16px',import:null},
    {family:"'Cabinet Grotesk',system-ui,sans-serif",headWeight:800,bodySize:'16px',import:null},
    {family:"'Satoshi',system-ui,sans-serif",headWeight:700,bodySize:'16px',import:null},
];

// ===== PREMIUM HERO VISUALS (no emojis!) =====
function buildHeroVisual(rng, pal, cat) {
    const img = getHeroImage(rng, cat);
    const isDark = pal.bg.match(/^#[012]/);
    
    return rPick(rng, [
        // Real photo with rounded corners
        `<div style="flex:1;min-width:300px;aspect-ratio:4/3;border-radius:20px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25)"><img src="${img}" style="width:100%;height:100%;object-fit:cover" alt=""></div>`,
        // Photo with accent border glow
        `<div style="flex:1;min-width:300px;aspect-ratio:4/3;border-radius:24px;overflow:hidden;box-shadow:0 0 0 1px ${pal.border},0 25px 80px ${pal.accent}20"><img src="${img}" style="width:100%;height:100%;object-fit:cover" alt=""></div>`,
        // Photo in a device mockup frame
        `<div style="flex:1;min-width:300px;padding:12px;background:${pal.card};border:1px solid ${pal.border};border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.2)"><div style="display:flex;gap:6px;margin-bottom:10px"><div style="width:8px;height:8px;border-radius:50%;background:${isDark?'#333':'#ddd'}"></div><div style="width:8px;height:8px;border-radius:50%;background:${isDark?'#333':'#ddd'}"></div><div style="width:8px;height:8px;border-radius:50%;background:${isDark?'#333':'#ddd'}"></div></div><div style="border-radius:8px;overflow:hidden;aspect-ratio:16/10"><img src="${img}" style="width:100%;height:100%;object-fit:cover" alt=""></div></div>`,
        // Abstract gradient mesh (no photo)
        `<div style="flex:1;min-width:300px;aspect-ratio:1;border-radius:24px;position:relative;overflow:hidden;background:${pal.card}"><div style="position:absolute;top:-20%;right:-20%;width:80%;height:80%;background:${pal.accent};border-radius:50%;filter:blur(80px);opacity:0.3"></div><div style="position:absolute;bottom:-10%;left:-10%;width:60%;height:60%;background:${pal.accent}80;border-radius:50%;filter:blur(60px);opacity:0.3"></div><div style="position:absolute;top:40%;left:40%;width:40%;height:40%;background:${isDark?'#fff':'#000'};border-radius:50%;filter:blur(50px);opacity:0.08"></div></div>`,
        // Floating cards/dashboard mockup
        `<div style="flex:1;min-width:300px;aspect-ratio:4/3;position:relative"><div style="position:absolute;top:10%;left:5%;right:15%;bottom:20%;background:${pal.card};border:1px solid ${pal.border};border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,0.1);padding:20px"><div style="height:8px;background:${pal.accent}30;border-radius:4px;margin-bottom:12px;width:60%"></div><div style="height:8px;background:${pal.border};border-radius:4px;margin-bottom:8px;width:90%"></div><div style="height:8px;background:${pal.border};border-radius:4px;margin-bottom:8px;width:75%"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:20px"><div style="height:60px;background:${pal.accent}15;border-radius:8px"></div><div style="height:60px;background:${pal.accent}10;border-radius:8px"></div></div></div><div style="position:absolute;bottom:5%;right:0;width:55%;background:${pal.card};border:1px solid ${pal.border};border-radius:12px;box-shadow:0 15px 30px rgba(0,0,0,0.1);padding:16px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><div style="width:32px;height:32px;border-radius:8px;background:${pal.accent}20"></div><div><div style="height:6px;background:${pal.border};border-radius:3px;width:80px;margin-bottom:4px"></div><div style="height:6px;background:${pal.border};border-radius:3px;width:50px"></div></div></div></div></div>`,
    ]);
}

// ===== NAV =====
function buildNav(rng, pal, font, siteName) {
    const isDark = pal.bg.match(/^#[012]/);
    const links = rPick(rng, [
        ['Home','Über uns','Leistungen','Kontakt'],
        ['Start','Services','Preise','Kontakt'],
        ['Home','About','Features','Contact'],
        ['Home','Angebot','Team','Kontakt'],
    ]);
    const linkHtml = links.map(l => `<a href="#" style="color:${pal.muted};text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s">${l}</a>`).join('');
    
    const style = rPick(rng, [
        `position:fixed;top:16px;left:16px;right:16px;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:14px 24px;background:${isDark?'rgba(0,0,0,0.6)':'rgba(255,255,255,0.8)'};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:16px;border:1px solid ${pal.border}`,
        `position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:18px 6vw;background:${isDark?'rgba(0,0,0,0.5)':'rgba(255,255,255,0.7)'};backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${pal.border}`,
        `position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:20px 8vw`,
        `position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:100;display:flex;align-items:center;gap:28px;padding:10px 28px;background:${isDark?'rgba(0,0,0,0.6)':'rgba(255,255,255,0.8)'};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:99px;border:1px solid ${pal.border}`,
    ]);
    const logoStyle = rPick(rng, [
        `font-weight:${font.headWeight};font-size:18px;letter-spacing:-0.5px;color:${pal.text}`,
        `font-weight:700;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:${pal.text}`,
        `font-weight:${font.headWeight};font-size:20px;letter-spacing:-1px;color:${pal.accent}`,
    ]);
    const ctaBtn = rng() > 0.4 ? `<a href="#" style="padding:8px 20px;background:${pal.accent};color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600">${rPick(rng,['Kontakt','Starten','Get Started','Buchen'])}</a>` : '';
    
    return `<nav style="${style}"><div style="${logoStyle}">${siteName}</div><div style="display:flex;align-items:center;gap:24px">${linkHtml}${ctaBtn}</div></nav>`;
}

// ===== CTA BUTTONS =====
function buildCTA(rng, pal, cat) {
    const label = rPick(rng, getCTALabels(cat));
    const style = rPick(rng, [
        `display:inline-flex;align-items:center;gap:8px;background:${pal.accent};color:#fff;padding:16px 36px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;transition:all 0.3s;box-shadow:0 4px 14px ${pal.accent}30`,
        `display:inline-flex;align-items:center;gap:8px;background:${pal.accent};color:#fff;padding:14px 32px;border-radius:99px;text-decoration:none;font-weight:600;font-size:15px;transition:all 0.3s`,
        `display:inline-flex;align-items:center;gap:8px;background:${pal.text};color:${pal.bg};padding:16px 36px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;transition:all 0.3s`,
        `display:inline-flex;align-items:center;gap:8px;background:transparent;color:${pal.text};padding:14px 32px;border:2px solid ${pal.accent};border-radius:12px;text-decoration:none;font-weight:600;font-size:15px`,
        `display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,${pal.accent},${pal.accent}bb);color:#fff;padding:16px 40px;border-radius:14px;text-decoration:none;font-weight:600;font-size:15px;box-shadow:0 8px 30px ${pal.accent}25`,
    ]);
    
    const hasSecond = rng() > 0.5;
    const secondLabel = rPick(rng, ['Mehr erfahren →','Demo ansehen','Tour starten','Kontakt']);
    const secondBtn = hasSecond ? `<a href="#" style="display:inline-flex;align-items:center;gap:6px;padding:16px 24px;color:${pal.muted};text-decoration:none;font-weight:500;font-size:15px">${secondLabel}</a>` : '';
    
    return `<div style="display:flex;gap:12px;flex-wrap:wrap;${rng()>0.5?'justify-content:center':''}"><a href="#" style="${style}">${label}</a>${secondBtn}</div>`;
}

function getCTALabels(cat) {
    const map = {
        fitness:['Jetzt starten','Probetraining buchen','Mitglied werden','Gratis testen','Join Now'],
        restaurant:['Tisch reservieren','Speisekarte ansehen','Jetzt reservieren','Menü entdecken'],
        portfolio:['Projekte ansehen','Let\'s talk','Zusammenarbeiten','Kontakt aufnehmen'],
        saas:['Get Started Free','Start Free Trial','Try it Now','Start Building','Sign Up'],
        shop:['Shop entdecken','Kollektion ansehen','Jetzt shoppen','Neue Arrivals'],
        beauty:['Termin buchen','Jetzt buchen','Termin vereinbaren','Verwöhnen lassen'],
        medical:['Termin vereinbaren','Online buchen','Jetzt anfragen'],
        music:['Jetzt streamen','Tour Tickets','Album hören'],
        education:['Kurs starten','Jetzt anmelden','Kostenlos testen'],
        event:['Tickets sichern','Jetzt buchen','Event entdecken'],
    };
    return map[cat] || ['Mehr erfahren','Jetzt starten','Kontakt aufnehmen','Entdecken','Loslegen'];
}

// ===== HERO TITLES =====
function getHeroTitle(rng, cat, name, pal) {
    const ac = pal.accent;
    const titles = {
        fitness: [
            `PUSH YOUR <span style="color:${ac}">LIMITS</span>`,
            `Stärker. Schneller.<br><span style="color:${ac}">Unaufhaltsam.</span>`,
            `Dein Training.<br>Deine <span style="color:${ac}">Regeln.</span>`,
            `<span style="color:${ac}">${name}</span> — Dein Weg zur Bestform`,
            `TRAIN <span style="color:${ac}">HARD</span><br>LIVE BOLD`,
            `Willkommen bei<br><span style="color:${ac}">${name}</span>`,
            `Grenzen existieren<br>nur im <span style="color:${ac}">Kopf</span>`,
            `<span style="color:${ac}">POWER</span> beginnt hier`,
        ],
        restaurant: [
            `Kulinarische<br><span style="color:${ac}">Exzellenz</span>`,
            `Genuss,<br><span style="color:${ac}">neu definiert</span>`,
            `Willkommen bei<br><span style="color:${ac}">${name}</span>`,
            `Wo jeder Bissen<br>eine <span style="color:${ac}">Geschichte</span> erzählt`,
            `<span style="color:${ac}">Fine Dining</span><br>in Perfektion`,
            `${name} —<br>Mehr als nur <span style="color:${ac}">Essen</span>`,
        ],
        portfolio: [
            `Hi, ich bin<br><span style="color:${ac}">${name}</span>`,
            `Design.<br>Code.<br><span style="color:${ac}">Impact.</span>`,
            `<span style="color:${ac}">Ideen</span> zum Leben erwecken`,
            `Kreativität trifft<br><span style="color:${ac}">Technologie</span>`,
            `<span style="color:${ac}">${name}</span><br>Digital Designer`,
            `Building<br><span style="color:${ac}">digital experiences</span>`,
        ],
        saas: [
            `Build. Ship.<br><span style="color:${ac}">Scale.</span>`,
            `The <span style="color:${ac}">developer</span><br>platform`,
            `<span style="color:${ac}">${name}</span> — Ship faster`,
            `Your stack,<br><span style="color:${ac}">supercharged</span>`,
            `One platform.<br><span style="color:${ac}">Infinite</span> possibilities.`,
            `Stop building<br>infrastructure.<br><span style="color:${ac}">Start building</span> products.`,
        ],
        shop: [
            `<span style="color:${ac}">${name}</span>`,
            `Curated for<br><span style="color:${ac}">you</span>`,
            `Premium <span style="color:${ac}">Quality</span>`,
            `Entdecke<br><span style="color:${ac}">${name}</span>`,
            `Style meets<br><span style="color:${ac}">Substance</span>`,
            `New Season.<br><span style="color:${ac}">New Standards.</span>`,
        ],
        beauty: [
            `Dein Moment.<br><span style="color:${ac}">Dein Glow.</span>`,
            `<span style="color:${ac}">${name}</span><br>Beauty Studio`,
            `Schönheit,<br><span style="color:${ac}">natürlich</span>`,
            `Glow<br><span style="color:${ac}">Different</span>`,
            `Weil du es<br><span style="color:${ac}">wert</span> bist`,
        ],
        medical: [
            `Ihre Gesundheit.<br><span style="color:${ac}">Unsere Priorität.</span>`,
            `<span style="color:${ac}">${name}</span>`,
            `Moderne Medizin,<br><span style="color:${ac}">persönlich</span>`,
            `Vertrauen durch<br><span style="color:${ac}">Kompetenz</span>`,
        ],
        music: [
            `<span style="color:${ac}">${name.toUpperCase()}</span>`,
            `NEW ALBUM<br><span style="color:${ac}">OUT NOW</span>`,
            `Feel the<br><span style="color:${ac}">Sound</span>`,
            `<span style="color:${ac}">LIVE</span><br>WORLD TOUR 2026`,
        ],
    };
    const list = titles[cat] || [
        `<span style="color:${ac}">${name}</span>`,
        `Willkommen bei<br><span style="color:${ac}">${name}</span>`,
        `${name}.<br><span style="color:${ac}">Neu gedacht.</span>`,
        `Innovation.<br><span style="color:${ac}">Einfach.</span>`,
        `Qualität,<br>die <span style="color:${ac}">überzeugt</span>`,
        `Dein Partner<br>für <span style="color:${ac}">Exzellenz</span>`,
    ];
    return rPick(rng, list);
}

function getHeroSub(rng, cat) {
    const subs = {
        fitness:['Werde die beste Version von dir. Modernste Geräte, erfahrene Trainer, grenzenlose Motivation.','Dein Körper verdient das Beste. Starte jetzt deine Transformation.','Kein Limit. Kein Aufgeben. Nur Ergebnisse.','Trainiere smart. Lebe stark. Erreiche mehr als du denkst.','Von Anfängern bis Profis — wir holen das Maximum aus dir raus.'],
        restaurant:['Kulinarische Erlebnisse, die in Erinnerung bleiben. Frische Zutaten, leidenschaftliche Küche.','Wo Tradition auf Innovation trifft — Genuss für alle Sinne.','Jeder Teller erzählt eine Geschichte. Willkommen in unserer.','Saisonale Küche mit Liebe zum Detail. Reservieren Sie jetzt.'],
        portfolio:['Ich gestalte digitale Erlebnisse die begeistern und Ergebnisse liefern.','Design, Code und Kreativität — alles aus einer Hand.','Websites & Apps die nicht nur gut aussehen, sondern konvertieren.','Ideen in digitale Realität verwandeln — seit über 5 Jahren.'],
        saas:['The all-in-one platform to build, deploy, and scale your applications.','Automate your workflow. Focus on what matters most.','From idea to production in minutes, not months. No config needed.','Developer tools that just work. Built for teams who ship fast.'],
        shop:['Kuratierte Produkte für den modernen Lifestyle. Handverlesen und premium.','Qualität, die man spürt. Design, das man sieht. Entdecke unsere Welt.','Premium-Produkte, die du nirgendwo anders findest.'],
        beauty:['Professionelle Beauty-Treatments in entspannter Atmosphäre. Weil du es verdienst.','Premium-Pflege für jeden Hauttyp. Entspannung, Pflege, strahlendes Ergebnis.','Dein Moment der Ruhe. Professionell, persönlich, perfekt.'],
        medical:['Moderne Medizin mit persönlicher Betreuung. Kompetent und fürsorglich.','Ihre Gesundheit ist unsere Priorität — Vorsorge, Diagnostik und Behandlung.','Vertrauen Sie auf jahrelange Erfahrung und modernste Technik.'],
        music:['New Album Out Now — Stream on all platforms worldwide.','Die Tour des Jahres — sichere dir jetzt deine Tickets.','Music that moves. Sounds that stay with you forever.'],
    };
    return rPick(rng, subs[cat] || ['Professionell, zuverlässig und immer für Sie da. Qualität ist unser Versprechen.','Wir bringen Ihre Vision zum Leben — mit Leidenschaft und Expertise.','Innovation trifft Erfahrung. Ihr Partner für nachhaltige Ergebnisse.','Einfach. Schnell. Professionell. Wir machen den Unterschied.']);
}

function getDefaultName(rng, cat) {
    const names = {
        fitness:['FitZone','PowerGym','IronForge','FlexArena','PeakFit','GRIND','Titan Fitness','Apex Athletics'],
        restaurant:['La Maison','Gustavo','Saveurs','Zum Goldenen Hirsch','Sakura','Olive & Thyme','Rosmarino','Feuerstein'],
        portfolio:['Alex Meyer','Sarah Design','Studio Noir','Jonas Creative','Lena Works','Mia Digital'],
        saas:['LaunchPad','CloudSync','Nexus','Amplify','Orion','Vertex','Shipfast','BuildKit'],
        shop:['MONO','Curated','Artisan','Maison','Thread & Co','NOIR','Elevate'],
        beauty:['Bloom Beauty','Glow Studio','Pure Skin','Serenity Spa','Radiance','Aura'],
        agency:['Neon Studio','Pixel Forge','Bold Agency','Orbit Creative','BLVCK Agency'],
        cafe:['Brew & Bean','The Roastery','Café Morgen','Daily Grind','Bohne & Zeit'],
        medical:['Dr. Schmidt Praxis','MediCare Plus','Praxis am Park','VitaDoc'],
        education:['LearnHub','SkillForge','Akademie Plus','BrainBoost'],
        music:['NOVA','Echo Chamber','Midnight Pulse','Voltage','AXIOM'],
        law:['Weber & Partner','Kanzlei Stern','Recht & Rat'],
        event:['Neon Nights','Starlight Events','EPIC Events'],
        realestate:['Luxe Immobilien','Prime Estate','DreamHaus'],
        travel:['Wanderlust','Horizon Tours','Globe & Go'],
        tech:['ByteForce','NexTech','DigitalPulse'],
        photo:['LensCraft','Moment Studio','PixelPerfect'],
        generic:['NexGen','Bright Solutions','Quantum','Elevate','Zenith','Pulse','Vanguard','Apex'],
    };
    return rPick(rng, names[cat] || names.generic);
}

// ===== LAYOUT TEMPLATES — all premium =====

function layoutHeroCentered(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const img = getHeroImage(rng, detectCategory._lastCat || 'generic');
    const isDark = pal.bg.match(/^#[012]/);
    const bgVariant = rPick(rng, [
        // Gradient overlay on image
        `position:relative;min-height:100vh;background:url('${img}') center/cover no-repeat`,
        // Pure gradient
        `min-height:100vh;background:radial-gradient(ellipse at 50% 0%,${pal.accent}15,transparent 70%)`,
        // Clean
        `min-height:100vh`,
    ]);
    const overlay = bgVariant.includes('url(') ? `<div style="position:absolute;inset:0;background:${isDark?'rgba(0,0,0,0.7)':'rgba(255,255,255,0.85)'};backdrop-filter:blur(2px)"></div>` : '';
    const content = `<div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:center;text-align:center;min-height:100vh;padding:24px"><div style="max-width:720px"><h1 style="font-size:clamp(36px,8vw,76px);font-weight:${font.headWeight};letter-spacing:-3px;line-height:1.05">${heroTitle}</h1><p style="font-size:18px;color:${pal.muted};margin:24px auto 40px;max-width:540px;line-height:1.7">${heroSub}</p>${ctaHtml}</div></div>`;
    return `${navHtml}<div style="${bgVariant}">${overlay}${content}</div>${sections}`;
}

function layoutHeroSplit(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const reverse = rng() > 0.5;
    const visual = buildHeroVisual(rng, pal, detectCategory._lastCat || 'generic');
    return `${navHtml}<div style="min-height:100vh;display:flex;align-items:center;padding:80px 6vw;gap:60px;flex-wrap:wrap;${reverse?'flex-direction:row-reverse':''}"><div style="flex:1;min-width:320px"><h1 style="font-size:clamp(30px,5vw,56px);font-weight:${font.headWeight};letter-spacing:-2px;line-height:1.08">${heroTitle}</h1><p style="font-size:17px;color:${pal.muted};margin:20px 0 36px;line-height:1.7;max-width:500px">${heroSub}</p>${ctaHtml}</div>${visual}</div>${sections}`;
}

function layoutHeroLeft(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const bgEffect = rPick(rng, [
        `background:linear-gradient(to right,${pal.accent}08,transparent 50%)`,
        `background:radial-gradient(ellipse at 0% 50%,${pal.accent}12,transparent 60%)`,
        ``,
    ]);
    return `${navHtml}<div style="min-height:100vh;display:flex;align-items:center;padding:80px 8vw;${bgEffect}"><div style="max-width:640px"><div style="display:inline-block;padding:6px 16px;background:${pal.accent}15;border-radius:99px;font-size:13px;font-weight:600;color:${pal.accent};margin-bottom:24px">${rPick(rng,['Neu','Premium','#1 in Deutschland','⭐ Top Rated','Seit 2020'])}</div><h1 style="font-size:clamp(36px,6vw,68px);font-weight:${font.headWeight};letter-spacing:-2.5px;line-height:1.05">${heroTitle}</h1><p style="font-size:18px;color:${pal.muted};margin:24px 0 40px;line-height:1.7;max-width:520px">${heroSub}</p>${ctaHtml}</div></div>${sections}`;
}

function layoutHeroFullImage(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    const img = getHeroImage(rng, detectCategory._lastCat || 'generic');
    const isDark = pal.bg.match(/^#[012]/);
    return `${navHtml}<div style="min-height:100vh;position:relative;background:url('${img}') center/cover no-repeat"><div style="position:absolute;inset:0;background:linear-gradient(to top,${pal.bg},${pal.bg}aa 40%,transparent)"></div><div style="position:relative;z-index:1;display:flex;align-items:flex-end;min-height:100vh;padding:80px 8vw"><div style="max-width:600px;padding-bottom:40px"><h1 style="font-size:clamp(36px,7vw,72px);font-weight:${font.headWeight};letter-spacing:-2.5px;line-height:1.05;color:#fff;text-shadow:0 2px 20px rgba(0,0,0,0.3)">${heroTitle}</h1><p style="font-size:17px;color:rgba(255,255,255,0.7);margin:20px 0 36px;line-height:1.7">${heroSub}</p>${ctaHtml}</div></div></div>${sections}`;
}

function layoutMinimal(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sections, navHtml) {
    return `${navHtml}<div style="min-height:100vh;display:flex;align-items:center;padding:80px 12vw"><div style="max-width:700px"><div style="width:48px;height:4px;background:${pal.accent};margin-bottom:40px;border-radius:2px"></div><h1 style="font-size:clamp(32px,5vw,56px);font-weight:${font.headWeight};letter-spacing:-1.5px;line-height:1.12">${heroTitle}</h1><p style="font-size:17px;color:${pal.muted};margin:28px 0 44px;max-width:500px;line-height:1.8">${heroSub}</p>${ctaHtml}</div></div>${sections}`;
}

const layoutFns = [layoutHeroCentered, layoutHeroSplit, layoutHeroLeft, layoutHeroFullImage, layoutMinimal];

// ===== SECTION BUILDERS — premium quality =====

function buildServicesSection(rng, pal, font, items, title) {
    const hasImages = rng() > 0.5;
    const cardImages = hasImages ? getCardImages(rng, detectCategory._lastCat || 'generic') : [];
    
    const cardVariant = rPick(rng, ['clean','bordered','gradient','minimal']);
    const cols = items.length <= 3 ? 'repeat(auto-fit,minmax(280px,1fr))' : 'repeat(auto-fit,minmax(240px,1fr))';
    
    return `<div style="padding:100px 6vw;max-width:1200px;margin:0 auto">
        <div style="text-align:center;margin-bottom:48px"><h2 style="font-size:clamp(24px,4vw,40px);font-weight:${font.headWeight};letter-spacing:-1px">${title}</h2></div>
        <div style="display:grid;grid-template-columns:${cols};gap:20px">
        ${items.map((it, i) => {
            const img = hasImages && cardImages[i % cardImages.length] ? `<div style="aspect-ratio:16/10;border-radius:12px;overflow:hidden;margin-bottom:16px"><img src="${cardImages[i % cardImages.length]}" style="width:100%;height:100%;object-fit:cover" alt=""></div>` : `<div style="width:48px;height:48px;border-radius:12px;background:${pal.accent}15;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px">${it.icon}</div>`;
            const card = {
                clean: `background:${pal.card};border:1px solid ${pal.border};border-radius:16px;padding:${hasImages?'0':'28px'};overflow:hidden;${hasImages?'':''}`,
                bordered: `background:${pal.card};border:1px solid ${pal.border};border-radius:12px;padding:${hasImages?'0':'24px'};overflow:hidden;border-top:3px solid ${pal.accent}`,
                gradient: `background:linear-gradient(145deg,${pal.card},${pal.accent}06);border:1px solid ${pal.border};border-radius:20px;padding:${hasImages?'0':'32px'};overflow:hidden`,
                minimal: `padding:${hasImages?'0':'24px'};border-bottom:1px solid ${pal.border}`,
            }[cardVariant];
            const innerPad = hasImages ? 'padding:20px' : '';
            return `<div style="${card};transition:transform 0.3s,box-shadow 0.3s">${hasImages?img:''}<div style="${innerPad}">${hasImages?'':img}<h3 style="font-size:17px;font-weight:700;margin-bottom:8px">${it.title}</h3><p style="font-size:14px;color:${pal.muted};line-height:1.6">${it.desc}</p>${it.price?`<div style="margin-top:12px;font-weight:700;color:${pal.accent};font-size:15px">${it.price}</div>`:''}</div></div>`;
        }).join('')}
        </div></div>`;
}

function buildPricingSection(rng, pal, font, plans, title) {
    return `<div style="padding:100px 6vw;max-width:1100px;margin:0 auto">
        <div style="text-align:center;margin-bottom:48px"><h2 style="font-size:clamp(24px,4vw,40px);font-weight:${font.headWeight};letter-spacing:-1px">${title}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px">
        ${plans.map((p, i) => {
            const featured = i === 1;
            return `<div style="background:${featured?pal.accent+'08':pal.card};border:${featured?'2px':'1px'} solid ${featured?pal.accent:pal.border};border-radius:20px;padding:36px;text-align:center;${featured?'transform:scale(1.02);box-shadow:0 20px 40px '+pal.accent+'15;':''}transition:all 0.3s">
                ${featured?`<div style="display:inline-block;padding:4px 14px;background:${pal.accent};color:#fff;border-radius:99px;font-size:12px;font-weight:700;margin-bottom:16px;letter-spacing:0.5px">BELIEBT</div>`:''}
                <div style="font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${pal.muted};margin-bottom:16px">${p.name}</div>
                <div style="font-size:42px;font-weight:${font.headWeight};margin-bottom:4px;letter-spacing:-1px">${p.price}</div>
                <div style="font-size:14px;color:${pal.muted};margin-bottom:24px">${p.period||'/Monat'}</div>
                <ul style="list-style:none;margin-bottom:28px;font-size:14px;line-height:2.2">${p.features.map(f=>`<li style="color:${pal.muted}"><span style="color:${pal.accent};margin-right:8px">✓</span>${f}</li>`).join('')}</ul>
                <a href="#" style="display:block;padding:14px;background:${featured?pal.accent:'transparent'};color:${featured?'#fff':pal.text};border:${featured?'none':'1px solid '+pal.border};border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;transition:all 0.3s">${p.cta}</a>
            </div>`;
        }).join('')}
        </div></div>`;
}

function buildStatsSection(rng, pal, font, stats) {
    const variant = rPick(rng, ['inline','cards','banner']);
    if (variant === 'cards') {
        return `<div style="padding:80px 6vw;max-width:1100px;margin:0 auto"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px">${stats.map(s => `<div style="background:${pal.card};border:1px solid ${pal.border};border-radius:16px;padding:28px;text-align:center"><div style="font-size:36px;font-weight:${font.headWeight};letter-spacing:-1px;color:${pal.accent}">${s.val}</div><div style="font-size:13px;color:${pal.muted};margin-top:6px;font-weight:500">${s.label}</div></div>`).join('')}</div></div>`;
    }
    if (variant === 'banner') {
        return `<div style="padding:60px 6vw;background:${pal.accent}08;border-top:1px solid ${pal.border};border-bottom:1px solid ${pal.border}"><div style="max-width:1100px;margin:0 auto;display:flex;justify-content:center;gap:64px;flex-wrap:wrap">${stats.map(s => `<div style="text-align:center"><div style="font-size:40px;font-weight:${font.headWeight};letter-spacing:-1px">${s.val}</div><div style="font-size:13px;color:${pal.muted};margin-top:4px">${s.label}</div></div>`).join('')}</div></div>`;
    }
    return `<div style="padding:80px 6vw"><div style="max-width:1100px;margin:0 auto;display:flex;justify-content:center;gap:56px;flex-wrap:wrap">${stats.map(s => `<div style="text-align:center"><div style="font-size:44px;font-weight:${font.headWeight};letter-spacing:-1px;color:${pal.accent}">${s.val}</div><div style="font-size:14px;color:${pal.muted};margin-top:6px">${s.label}</div></div>`).join('')}</div></div>`;
}

function buildTestimonialsSection(rng, pal, font, testimonials, title) {
    return `<div style="padding:100px 6vw;max-width:1100px;margin:0 auto">
        <div style="text-align:center;margin-bottom:48px"><h2 style="font-size:clamp(24px,4vw,40px);font-weight:${font.headWeight};letter-spacing:-1px">${title}</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
        ${testimonials.map(t => `<div style="background:${pal.card};border:1px solid ${pal.border};border-radius:16px;padding:28px">
            <div style="display:flex;gap:4px;margin-bottom:16px">${'⭐'.repeat(5)}</div>
            <p style="font-size:15px;line-height:1.7;color:${pal.muted};margin-bottom:20px">"${t.text}"</p>
            <div style="display:flex;align-items:center;gap:12px"><div style="width:40px;height:40px;border-radius:50%;background:${pal.accent}20;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:${pal.accent}">${t.author.charAt(0)}</div><div><div style="font-weight:700;font-size:14px">${t.author}</div><div style="font-size:12px;color:${pal.muted}">Verifizierter Kunde</div></div></div>
        </div>`).join('')}
        </div></div>`;
}

function buildContactSection(rng, pal, font, title) {
    return `<div style="padding:100px 6vw;max-width:900px;margin:0 auto">
        <div style="text-align:center;margin-bottom:48px"><h2 style="font-size:clamp(24px,4vw,40px);font-weight:${font.headWeight};letter-spacing:-1px">${title}</h2><p style="color:${pal.muted};margin-top:12px;font-size:16px">Wir melden uns innerhalb von 24 Stunden.</p></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:600px;margin:0 auto">
            <input placeholder="Vorname" style="padding:16px 20px;background:${pal.card};border:1px solid ${pal.border};border-radius:12px;color:${pal.text};font-size:15px;outline:none;font-family:inherit">
            <input placeholder="Nachname" style="padding:16px 20px;background:${pal.card};border:1px solid ${pal.border};border-radius:12px;color:${pal.text};font-size:15px;outline:none;font-family:inherit">
            <input placeholder="E-Mail" style="grid-column:span 2;padding:16px 20px;background:${pal.card};border:1px solid ${pal.border};border-radius:12px;color:${pal.text};font-size:15px;outline:none;font-family:inherit">
            <textarea placeholder="Ihre Nachricht..." rows="4" style="grid-column:span 2;padding:16px 20px;background:${pal.card};border:1px solid ${pal.border};border-radius:12px;color:${pal.text};font-size:15px;outline:none;font-family:inherit;resize:vertical"></textarea>
            <button style="grid-column:span 2;padding:16px;background:${pal.accent};color:#fff;border:none;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:opacity 0.2s">Nachricht senden</button>
        </div></div>`;
}

function buildCTABanner(rng, pal, font, cat) {
    const text = rPick(rng, ['Bereit loszulegen?','Überzeugt?','Let\'s do this','Starte jetzt','Worauf wartest du?']);
    const sub = rPick(rng, ['Kontaktiere uns noch heute — unverbindlich.','Starte jetzt und überzeuge dich selbst.','Der erste Schritt ist der wichtigste.','Keine versteckten Kosten. Keine Verpflichtungen.']);
    const isDark = pal.bg.match(/^#[012]/);
    return `<div style="padding:100px 6vw"><div style="max-width:900px;margin:0 auto;text-align:center;padding:60px 40px;background:linear-gradient(135deg,${pal.accent}12,${pal.accent}05);border:1px solid ${pal.accent}20;border-radius:24px">
        <h2 style="font-size:clamp(28px,5vw,44px);font-weight:${font.headWeight};letter-spacing:-1px;margin-bottom:16px">${text}</h2>
        <p style="font-size:16px;color:${pal.muted};margin-bottom:32px;max-width:400px;margin-left:auto;margin-right:auto">${sub}</p>
        ${buildCTA(rng, pal, cat)}
    </div></div>`;
}

function buildFAQSection(rng, pal, font) {
    const faqs = shuffle(rng, [
        {q:'Wie lange dauert die Umsetzung?',a:'In der Regel sind Projekte innerhalb von 1-3 Werktagen fertig. Bei komplexen Anforderungen kann es etwas länger dauern.'},
        {q:'Was kostet das?',a:'Individuelle Preise je nach Umfang und Komplexität. Fordern Sie ein kostenloses, unverbindliches Angebot an.'},
        {q:'Gibt es eine Zufriedenheitsgarantie?',a:'Ja, wir bieten 30 Tage Zufriedenheitsgarantie. Wenn Sie nicht zufrieden sind, bekommen Sie Ihr Geld zurück.'},
        {q:'Wie viele Revisionsrunden sind inklusive?',a:'3 Revisionsrunden sind im Preis inbegriffen. Weitere Änderungen sind gegen Aufpreis möglich.'},
        {q:'Welche Zahlungsmethoden akzeptieren Sie?',a:'Kreditkarte, PayPal, Banküberweisung — was für Sie am bequemsten ist.'},
        {q:'Brauche ich technische Vorkenntnisse?',a:'Nein, überhaupt nicht. Sie beschreiben was Sie möchten, wir kümmern uns um alles Technische.'},
    ]).slice(0, 3 + Math.floor(rng() * 2));
    
    return `<div style="padding:100px 6vw;max-width:750px;margin:0 auto">
        <div style="text-align:center;margin-bottom:48px"><h2 style="font-size:clamp(24px,4vw,40px);font-weight:${font.headWeight};letter-spacing:-1px">${rPick(rng,['Häufige Fragen','FAQ','Fragen & Antworten'])}</h2></div>
        ${faqs.map(f => `<div style="border-bottom:1px solid ${pal.border};padding:24px 0">
            <div style="font-weight:700;font-size:16px;margin-bottom:10px">${f.q}</div>
            <div style="font-size:15px;color:${pal.muted};line-height:1.7">${f.a}</div>
        </div>`).join('')}
    </div>`;
}

function buildLogoCloud(rng, pal) {
    const logos = shuffle(rng, ['Google','Microsoft','Apple','Amazon','Tesla','Stripe','Shopify','Slack','Notion','Figma','Vercel','Netflix']).slice(0, 5 + Math.floor(rng() * 3));
    return `<div style="padding:60px 6vw;border-top:1px solid ${pal.border}"><div style="max-width:1100px;margin:0 auto;text-align:center"><p style="font-size:13px;color:${pal.muted};text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:24px">Vertraut von führenden Unternehmen</p><div style="display:flex;justify-content:center;gap:40px;flex-wrap:wrap;opacity:0.4">${logos.map(l => `<span style="font-size:18px;font-weight:700;letter-spacing:-0.5px">${l}</span>`).join('')}</div></div></div>`;
}

// ===== CONTENT DATA =====
function getServices(rng, cat) {
    const all = {
        fitness:[
            {icon:'🏋️',title:'Krafttraining',desc:'Freie Gewichte, Maschinen & professionelle Anleitung für maximale Ergebnisse.'},
            {icon:'🏃',title:'Cardio Zone',desc:'Modernste Laufbänder, Crosstrainer und Rudergeräte mit Entertainment.'},
            {icon:'🧘',title:'Yoga & Pilates',desc:'Finde Balance und Flexibilität in unseren ruhigen Kursräumen.'},
            {icon:'🥊',title:'Kampfsport',desc:'Boxen, Kickboxen und MMA mit erfahrenen Trainern.'},
            {icon:'💪',title:'Personal Training',desc:'Individuelle 1-on-1 Betreuung für schnellere Resultate.'},
            {icon:'🏃‍♀️',title:'Gruppenkurse',desc:'HIIT, Spinning, Zumba und 30+ weitere Kurse pro Woche.'},
            {icon:'🥗',title:'Ernährungscoaching',desc:'Maßgeschneiderte Ernährungspläne für deine Ziele.'},
            {icon:'🧖',title:'Recovery & Wellness',desc:'Sauna, Dampfbad und Massageliegen für optimale Regeneration.'},
        ],
        restaurant:[
            {icon:'🥘',title:'Vorspeisen',desc:'Handgemachte Vorspeisen mit saisonalen Zutaten aus der Region.'},
            {icon:'🥩',title:'Hauptgerichte',desc:'Erstklassiges Fleisch, frischer Fisch und kreative vegetarische Optionen.'},
            {icon:'🍰',title:'Patisserie',desc:'Unsere hauseigene Konditorei kreiert unvergessliche Desserts.'},
            {icon:'🍷',title:'Sommelier-Auswahl',desc:'Über 200 erlesene Weine, kuratiert von unserem Sommelier.'},
            {icon:'🌿',title:'Farm to Table',desc:'Regionale, saisonale Zutaten direkt vom Bauernhof.'},
            {icon:'👨‍🍳',title:'Chef\'s Table',desc:'Exklusives 7-Gänge-Menü — ein unvergessliches Erlebnis.'},
        ],
        saas:[
            {icon:'⚡',title:'Lightning Fast',desc:'Deploy in seconds with zero-downtime. Built on edge infrastructure.'},
            {icon:'🔒',title:'Enterprise Security',desc:'SOC2, HIPAA compliant. Your data is encrypted at rest and in transit.'},
            {icon:'📊',title:'Real-time Analytics',desc:'Beautiful dashboards with actionable insights. No SQL required.'},
            {icon:'🔄',title:'Auto-Scaling',desc:'Automatically scales with demand. Pay only for what you use.'},
            {icon:'🧩',title:'500+ Integrations',desc:'Connect your favorite tools in minutes. No code required.'},
            {icon:'👥',title:'Team Collaboration',desc:'Real-time multiplayer editing with role-based permissions.'},
        ],
        shop:[
            {icon:'⌚',title:'Uhren',desc:'Minimalistische Timepieces für den modernen Stil.',price:'ab €189'},
            {icon:'🎧',title:'Audio',desc:'Premium Kopfhörer mit Studio-Qualität.',price:'ab €129'},
            {icon:'🕶️',title:'Eyewear',desc:'Handgefertigte Sonnenbrillen mit UV-Schutz.',price:'ab €79'},
            {icon:'👟',title:'Sneaker',desc:'Limited Edition Streetwear-Modelle.',price:'ab €159'},
            {icon:'👜',title:'Taschen',desc:'Handgenähte Ledertaschen, made in Italy.',price:'ab €249'},
            {icon:'💍',title:'Schmuck',desc:'Minimalistischer Schmuck aus recyceltem Gold.',price:'ab €89'},
        ],
        beauty:[
            {icon:'💇',title:'Haarschnitt & Styling',desc:'Modernste Techniken für deinen perfekten Look.'},
            {icon:'💅',title:'Maniküre & Pediküre',desc:'Nagelpflege und kreatives Nail Design.'},
            {icon:'💆',title:'Gesichtsbehandlung',desc:'Tiefenreinigung, Peeling und Anti-Aging Treatments.'},
            {icon:'🧖',title:'Massage & Spa',desc:'Ganzheitliche Entspannung für Körper und Seele.'},
            {icon:'✨',title:'Microblading',desc:'Perfekte Augenbrauen mit natürlichem Ergebnis.'},
        ],
        medical:[
            {icon:'🩺',title:'Allgemeinmedizin',desc:'Umfassende Vorsorgeuntersuchungen und Diagnostik.'},
            {icon:'💉',title:'Impfberatung',desc:'Reise- und Standardimpfungen mit ausführlicher Beratung.'},
            {icon:'🫀',title:'Kardiologie',desc:'Modernste Herz-Kreislauf-Diagnostik und Prävention.'},
            {icon:'🧠',title:'Neurologie',desc:'Spezialisiert auf Kopfschmerzen, Migräne und Schlafstörungen.'},
        ],
    };
    const pool = all[cat] || [
        {icon:'⚡',title:'Schnelle Umsetzung',desc:'Von der Idee zum fertigen Produkt in Rekordzeit.'},
        {icon:'💎',title:'Premium Qualität',desc:'Höchste Standards in jedem Detail. Keine Kompromisse.'},
        {icon:'🤝',title:'Persönliche Betreuung',desc:'Ein dedizierter Ansprechpartner für Ihr Projekt.'},
        {icon:'🔒',title:'100% Datenschutz',desc:'DSGVO-konform. Ihre Daten sind bei uns sicher.'},
        {icon:'📞',title:'24/7 Support',desc:'Immer erreichbar, wenn Sie uns brauchen.'},
        {icon:'💡',title:'Innovation',desc:'Neueste Technologien und bewährte Best Practices.'},
    ];
    return pickN(rng, pool, 3 + Math.floor(rng() * 3));
}

function getServiceTitle(rng, cat) {
    const titles = {
        fitness:['Unser Angebot','Was dich erwartet','Deine Möglichkeiten','Trainiere wie ein Profi'],
        restaurant:['Unsere Küche','Kulinarische Highlights','Das erwartet Sie'],
        saas:['Features','Core Features','Everything you need','Built for scale'],
        shop:['Bestseller','Unsere Kollektion','Trending Now','Top Picks'],
        beauty:['Unser Angebot','Beauty Menu','Treatments','Verwöhnprogramm'],
        medical:['Unsere Fachbereiche','Leistungsspektrum','Medizinische Services'],
    };
    return rPick(rng, titles[cat] || ['Unsere Leistungen','Was wir bieten','Services','So können wir helfen']);
}

function getPricing(rng, cat) {
    const all = {
        fitness:[
            [{name:'Starter',price:'29€',period:'/Monat',features:['Mo-Fr 8-20 Uhr','Gerätetraining','Umkleiden & Duschen'],cta:'Auswählen'},{name:'Pro',price:'49€',period:'/Monat',features:['24/7 Zugang','Alle Gruppenkurse','1x Personal Training/Mo','Sauna & Wellness'],cta:'Am beliebtesten'},{name:'Elite',price:'89€',period:'/Monat',features:['VIP 24/7 Zugang','Unlimited Personal Training','Recovery Zone','Gästekarte inklusive'],cta:'Elite werden'}],
            [{name:'Basic',price:'19€',period:'/Monat',features:['10x Zutritt/Monat','Gerätetraining','App-Tracking'],cta:'Starten'},{name:'Unlimited',price:'39€',period:'/Monat',features:['Unbegrenzter Zutritt','Alle Kurse','Körperanalyse'],cta:'Beliebteste Wahl'},{name:'VIP',price:'79€',period:'/Monat',features:['Alles in Unlimited','Personal Trainer','Spa-Zugang'],cta:'VIP werden'}],
        ],
        saas:[
            [{name:'Free',price:'$0',period:'/mo',features:['1 Project','1GB Storage','Community Support'],cta:'Start Free'},{name:'Pro',price:'$29',period:'/mo',features:['Unlimited Projects','50GB Storage','Priority Support','Custom Domains'],cta:'Most Popular'},{name:'Enterprise',price:'$99',period:'/mo',features:['Everything in Pro','SSO & SAML','SLA 99.99%','Dedicated CSM'],cta:'Contact Sales'}],
            [{name:'Hobby',price:'$0',period:'/mo',features:['3 Projects','5GB Storage','Email Support'],cta:'Get Started'},{name:'Team',price:'$49',period:'/mo',features:['Unlimited Projects','100GB','Team Management','API Access'],cta:'Best Value'},{name:'Business',price:'$149',period:'/mo',features:['Dedicated Infrastructure','Custom Domains','24/7 Phone Support','SLA'],cta:'Talk to Sales'}],
        ],
    };
    const list = all[cat];
    return list ? rPick(rng, list) : [
        {name:'Basic',price:'€49',period:'/Monat',features:['Grundpaket','E-Mail Support','1 Nutzer'],cta:'Starten'},
        {name:'Professional',price:'€99',period:'/Monat',features:['Alles in Basic','Prioritäts-Support','5 Nutzer','Analytics'],cta:'Am beliebtesten'},
        {name:'Enterprise',price:'€249',period:'/Monat',features:['Unlimited','Dedicated Support','Custom Integrationen','SLA'],cta:'Kontaktieren'},
    ];
}

function getStats(rng, cat) {
    const all = {
        fitness:[
            [{val:'5.000+',label:'Aktive Mitglieder'},{val:'50+',label:'Kurse pro Woche'},{val:'4.9',label:'Google Bewertung'},{val:'15+',label:'Erfahrene Trainer'}],
            [{val:'12K+',label:'Workouts/Monat'},{val:'98%',label:'Zufriedenheit'},{val:'3',label:'Standorte'},{val:'24/7',label:'Geöffnet'}],
        ],
        restaurant:[
            [{val:'15+',label:'Jahre Erfahrung'},{val:'50K+',label:'Zufriedene Gäste'},{val:'4.8',label:'Google Rating'},{val:'200+',label:'Erlesene Weine'}],
        ],
        saas:[
            [{val:'50K+',label:'Active Users'},{val:'99.9%',label:'Uptime'},{val:'150+',label:'Countries'},{val:'4.9',label:'G2 Rating'}],
            [{val:'1M+',label:'API Calls/Day'},{val:'500+',label:'Integrations'},{val:'<50ms',label:'Avg Latency'},{val:'SOC2',label:'Certified'}],
        ],
    };
    const list = all[cat];
    return list ? rPick(rng, list) : [{val:'1.000+',label:'Zufriedene Kunden'},{val:'10+',label:'Jahre Erfahrung'},{val:'4.8',label:'Durchschnittsbewertung'},{val:'99%',label:'Weiterempfehlung'}];
}

function getTestimonials(rng) {
    const all = [
        {text:'Absolut professionell und zuverlässig. Kann ich jedem nur weiterempfehlen!',author:'Marie K.'},
        {text:'Bester Service den ich je hatte. Schnell, freundlich, und die Ergebnisse sprechen für sich.',author:'Thomas S.'},
        {text:'Seit 3 Jahren Stammkunde. Die Qualität stimmt einfach jedes einzelne Mal.',author:'Lisa M.'},
        {text:'Hervorragendes Preis-Leistungs-Verhältnis. Komme definitiv wieder!',author:'Jan B.'},
        {text:'Hat meine Erwartungen komplett übertroffen. Absolute Empfehlung!',author:'Sarah H.'},
        {text:'Von der ersten Beratung bis zum Ergebnis — alles perfekt durchdacht.',author:'Michael R.'},
        {text:'Endlich jemand, der versteht was man will. Mega zufrieden!',author:'Anna W.'},
        {text:'Schnell, unkompliziert und ein Ergebnis das sich sehen lassen kann.',author:'Felix P.'},
    ];
    return pickN(rng, all, 2 + Math.floor(rng() * 2));
}

// ===== MAIN GENERATOR =====
function getExampleForPrompt(prompt) {
    const rng = makeRng(prompt);
    const cat = detectCategory(prompt);
    detectCategory._lastCat = cat; // Pass to visual builders
    const mood = detectMood(prompt);
    const pal = generatePalette(rng, mood, cat);
    const font = rPick(rng, allFonts);
    const siteName = extractName(prompt) || getDefaultName(rng, cat);

    // Build nav
    const navHtml = buildNav(rng, pal, font, siteName);
    const heroTitle = getHeroTitle(rng, cat, siteName, pal);
    const heroSub = getHeroSub(rng, cat);
    const ctaHtml = buildCTA(rng, pal, cat);

    // Randomize which sections appear
    const sectionBuilders = [];

    // Logo cloud (sometimes first)
    if (rng() > 0.55) sectionBuilders.push(() => buildLogoCloud(rng, pal));

    // Services — almost always
    if (rng() > 0.1) sectionBuilders.push(() => buildServicesSection(rng, pal, font, getServices(rng, cat), getServiceTitle(rng, cat)));

    // Stats
    if (rng() > 0.4) sectionBuilders.push(() => buildStatsSection(rng, pal, font, getStats(rng, cat)));

    // Pricing
    if (rng() > 0.35) sectionBuilders.push(() => buildPricingSection(rng, pal, font, getPricing(rng, cat), rPick(rng, ['Unsere Pakete','Preise','Pricing','Tarife & Pakete'])));

    // Testimonials
    if (rng() > 0.4) sectionBuilders.push(() => buildTestimonialsSection(rng, pal, font, getTestimonials(rng), rPick(rng, ['Kundenstimmen','Das sagen unsere Kunden','Bewertungen'])));

    // FAQ
    if (rng() > 0.5) sectionBuilders.push(() => buildFAQSection(rng, pal, font));

    // CTA Banner
    if (rng() > 0.35) sectionBuilders.push(() => buildCTABanner(rng, pal, font, cat));

    // Contact
    if (rng() > 0.3) sectionBuilders.push(() => buildContactSection(rng, pal, font, rPick(rng, ['Kontakt','Schreib uns','Get in Touch','Nachricht senden'])));

    // Ensure minimum sections
    if (sectionBuilders.length < 2) {
        sectionBuilders.push(() => buildServicesSection(rng, pal, font, getServices(rng, cat), getServiceTitle(rng, cat)));
        sectionBuilders.push(() => buildContactSection(rng, pal, font, 'Kontakt'));
    }

    const shuffled = shuffle(rng, sectionBuilders);
    const sectionsHtml = shuffled.map(fn => fn()).join('');

    // Footer
    const footer = `<footer style="text-align:center;padding:48px 24px;border-top:1px solid ${pal.border}"><div style="color:${pal.muted};font-size:13px">© 2026 ${siteName}. Alle Rechte vorbehalten.</div></footer>`;

    // Pick layout
    const layoutFn = rPick(rng, layoutFns);
    const body = layoutFn(rng, pal, font, siteName, heroTitle, heroSub, ctaHtml, sectionsHtml + footer, navHtml);

    // Google Font import
    const fontImport = font.import ? `<link href="https://fonts.googleapis.com/css2?family=${font.import}&display=swap" rel="stylesheet">` : '';

    return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">${fontImport}<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${font.family};background:${pal.bg};color:${pal.text};-webkit-font-smoothing:antialiased;font-size:${font.bodySize};overflow-x:hidden}
a{transition:all 0.2s;text-decoration:none;color:inherit}
a:hover{opacity:0.85}
img{max-width:100%;display:block}
input,textarea,button{font-family:inherit}
input::placeholder,textarea::placeholder{color:${pal.muted}}
::selection{background:${pal.accent}30;color:${pal.text}}
@media(max-width:768px){
  h1{font-size:36px!important;letter-spacing:-1px!important}
  h2{font-size:28px!important}
  nav{padding:12px 16px!important}
  nav>div:last-child a:not(:last-child){display:none}
  [style*="grid-template-columns:repeat"]{grid-template-columns:1fr!important}
  [style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}
  [style*="flex-direction:row-reverse"]{flex-direction:column!important}
  [style*="gap:60px"]{gap:32px!important}
  [style*="padding:80px 6vw"],[style*="padding:100px 6vw"],[style*="padding:80px 8vw"]{padding:48px 20px!important}
  [style*="padding:80px 12vw"]{padding:48px 20px!important}
  [style*="gap:64px"]{gap:24px!important}
  [style*="min-width:3"]{min-width:100%!important}
  [style*="flex:1;min-width:280px"],[style*="flex:1;min-width:300px"],[style*="flex:1;min-width:320px"]{min-width:100%!important;flex:unset!important}
  footer{padding:32px 16px!important}
}
</style></head><body>${body}</body></html>`;
}
