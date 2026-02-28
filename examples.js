// =============================================
// DEVDASH — Dynamic Site Generator
// Each prompt → truly unique result
// =============================================

// ===== STYLE SYSTEMS =====
const styles = {
    dark1: {bg:'#0a0a0a',card:'#141414',border:'#222',text:'#fff',muted:'#888'},
    dark2: {bg:'#0f0f14',card:'#16161e',border:'#1e1e2a',text:'#f0f0f5',muted:'#7a7a90'},
    dark3: {bg:'#0c0c0c',card:'#111',border:'#1a1a1a',text:'#fff',muted:'#666'},
    light1: {bg:'#fafaf8',card:'#fff',border:'#eee',text:'#1a1a1a',muted:'#888'},
    light2: {bg:'#f7fbfe',card:'#fff',border:'#e8f0f8',text:'#1a2942',muted:'#6b7c93'},
    light3: {bg:'#fdf8f4',card:'#fff',border:'#f0e6db',text:'#2a2a2a',muted:'#999'},
    light4: {bg:'#f8f9fc',card:'#fff',border:'#e8eaf0',text:'#111',muted:'#777'},
};

const fonts = [
    "'Segoe UI',sans-serif",
    "-apple-system,BlinkMacSystemFont,sans-serif",
    "Georgia,serif",
    "'Trebuchet MS',sans-serif",
];

const layouts = {
    heroCenter: (title,sub,cta,bgStyle) => `<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;${bgStyle}"><div><h1 style="font-size:clamp(36px,7vw,72px);font-weight:900;letter-spacing:-2px;line-height:1.05">${title}</h1><p style="font-size:17px;opacity:0.7;margin:16px auto 32px;max-width:500px">${sub}</p>${cta}</div></div>`,
    heroLeft: (title,sub,cta,bgStyle) => `<div style="min-height:90vh;display:flex;align-items:center;padding:80px 8vw;${bgStyle}"><div style="max-width:560px"><h1 style="font-size:clamp(32px,5vw,56px);font-weight:800;letter-spacing:-1.5px;line-height:1.1">${title}</h1><p style="font-size:16px;opacity:0.7;margin:16px 0 28px;max-width:480px">${sub}</p>${cta}</div></div>`,
    heroSplit: (title,sub,cta,bgStyle,emoji) => `<div style="min-height:90vh;display:flex;align-items:center;padding:60px 8vw;gap:48px;flex-wrap:wrap;${bgStyle}"><div style="flex:1;min-width:280px"><h1 style="font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-1.5px;line-height:1.1">${title}</h1><p style="font-size:16px;opacity:0.7;margin:16px 0 28px">${sub}</p>${cta}</div><div style="flex:1;min-width:280px;aspect-ratio:1;background:linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02));border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:96px">${emoji||'🚀'}</div></div>`,
};

// ===== SECTION BUILDERS =====
function buildGrid(items, accent, style) {
    // Vary card style each time
    const v = Date.now() % 4;
    const cardStyles = [
        `background:${style.card};border:1px solid ${style.border};border-radius:16px;padding:28px`,
        `background:${style.card};border-left:3px solid ${accent};border-radius:4px;padding:24px 28px`,
        `background:linear-gradient(135deg,${style.card},${accent}05);border:1px solid ${style.border};border-radius:20px;padding:32px`,
        `background:${style.card};border:1px solid ${style.border};border-radius:8px;padding:24px;border-top:3px solid ${accent}`,
    ];
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${items.length>3?'220px':'260px'},1fr));gap:16px">${items.map(it => 
        `<div style="${cardStyles[v]};transition:all 0.3s">
        <div style="font-size:32px;margin-bottom:12px">${it.icon}</div>
        <h3 style="font-size:17px;font-weight:700;margin-bottom:6px">${it.title}</h3>
        <p style="font-size:13px;color:${style.muted};line-height:1.5">${it.desc}</p>
        ${it.price?`<div style="margin-top:12px;font-weight:700;color:${accent}">${it.price}</div>`:''}
        </div>`).join('')}</div>`;
}

function buildPricing(plans, accent, style) {
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">${plans.map((p,i) => 
        `<div style="background:${style.card};border:${i===1?'2px':'1px'} solid ${i===1?accent:style.border};border-radius:18px;padding:32px;text-align:center${i===1?';transform:scale(1.02)':''}">
        <div style="font-size:13px;text-transform:uppercase;letter-spacing:2px;color:${accent};font-weight:600">${p.name}</div>
        <div style="font-size:48px;font-weight:900;margin:12px 0">${p.price}<span style="font-size:15px;opacity:0.5;font-weight:400">${p.period||'/Mo'}</span></div>
        <ul style="list-style:none;margin:20px 0;text-align:left">${p.features.map(f=>`<li style="padding:7px 0;border-bottom:1px solid ${style.border};font-size:14px;color:${style.muted}">✓ ${f}</li>`).join('')}</ul>
        <a href="#" style="display:block;background:${i===1?accent:'transparent'};color:${i===1?'#fff':accent};border:1px solid ${accent};padding:12px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px">${p.cta||'Auswählen'}</a>
        </div>`).join('')}</div>`;
}

function buildTestimonials(items, style) {
    return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px">${items.map(t =>
        `<div style="background:${style.card};border:1px solid ${style.border};border-radius:16px;padding:28px">
        <p style="font-size:15px;line-height:1.6;color:${style.muted};font-style:italic;margin-bottom:12px">"${t.text}"</p>
        <div style="font-weight:700;font-size:14px">${t.author}</div>
        <div style="font-size:12px;color:${style.muted};margin-top:2px">${t.role||'⭐⭐⭐⭐⭐'}</div>
        </div>`).join('')}</div>`;
}

function buildContact(accent, style) {
    return `<div style="max-width:500px;margin:0 auto;background:${style.card};border:1px solid ${style.border};border-radius:18px;padding:36px">
    <input placeholder="Name" style="width:100%;padding:12px;background:${style.bg};border:1px solid ${style.border};border-radius:8px;color:${style.text};margin-bottom:10px;font-size:14px;outline:none">
    <input placeholder="E-Mail" style="width:100%;padding:12px;background:${style.bg};border:1px solid ${style.border};border-radius:8px;color:${style.text};margin-bottom:10px;font-size:14px;outline:none">
    <textarea placeholder="Nachricht" style="width:100%;padding:12px;background:${style.bg};border:1px solid ${style.border};border-radius:8px;color:${style.text};margin-bottom:10px;font-size:14px;min-height:100px;resize:vertical;outline:none"></textarea>
    <button style="width:100%;padding:14px;background:${accent};color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer">Nachricht senden</button></div>`;
}

function buildStats(items, accent) {
    return `<div style="display:flex;gap:32px;flex-wrap:wrap;justify-content:center">${items.map(s =>
        `<div style="text-align:center"><div style="font-size:36px;font-weight:900;color:${accent}">${s.val}</div><div style="font-size:13px;color:#888;margin-top:4px">${s.label}</div></div>`
    ).join('')}</div>`;
}

// ===== PROMPT PARSER =====
function extractName(prompt) {
    const q = prompt.match(/["'„"]([^"'""]+)["'""]/);
    if (q) return q[1];
    const fur = prompt.match(/(?:für|for|namens?|called?|named?|heißt)\s+(?:mein[en]?\s+)?(?:\w+\s+)?["']?([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ&][a-zäöüß&]*)*)/i);
    if (fur) return fur[1];
    return null;
}

function extractColors(prompt) {
    const p = prompt.toLowerCase();
    if (p.match(/rot|red/)) return {primary:'#e63946',secondary:'#ff6b6b'};
    if (p.match(/blau|blue/)) return {primary:'#2b7de9',secondary:'#60a5fa'};
    if (p.match(/grün|green/)) return {primary:'#16a34a',secondary:'#4ade80'};
    if (p.match(/lila|purple|violet/)) return {primary:'#7c3aed',secondary:'#a78bfa'};
    if (p.match(/pink|rosa/)) return {primary:'#ec4899',secondary:'#f472b6'};
    if (p.match(/gold|gelb|yellow/)) return {primary:'#d4a017',secondary:'#fbbf24'};
    if (p.match(/orange/)) return {primary:'#f97316',secondary:'#fb923c'};
    if (p.match(/türkis|teal|cyan/)) return {primary:'#06b6d4',secondary:'#22d3ee'};
    if (p.match(/schwarz.*weiß|weiß.*schwarz|monochrom|minimalist/)) return {primary:'#1a1a1a',secondary:'#555'};
    return null;
}

function extractSections(prompt) {
    const p = prompt.toLowerCase();
    const sections = [];
    if (p.match(/hero|banner|header|kopf|start/)) sections.push('hero');
    if (p.match(/preis|pricing|paket|plan|tarif/)) sections.push('pricing');
    if (p.match(/team|trainer|mitarbeiter|über uns|about/)) sections.push('team');
    if (p.match(/kontakt|contact|formular|anfrage/)) sections.push('contact');
    if (p.match(/referenz|testimonial|bewertung|kund/)) sections.push('testimonials');
    if (p.match(/galerie|portfolio|projekte|arbeiten|fotos/)) sections.push('gallery');
    if (p.match(/faq|fragen/)) sections.push('faq');
    if (p.match(/partner|klient|client|marke|brand/)) sections.push('partners');
    if (p.match(/kurs|plan|zeitplan|schedule|öffnung/)) sections.push('schedule');
    if (p.match(/statistik|zahlen|number|erfolg/)) sections.push('stats');
    return sections.length ? sections : ['hero','pricing','contact'];
}

// Better hash: combines prompt content + timestamp so even identical prompts differ each time
function promptHash(s) {
    const time = Date.now();
    const base = s.split('').reduce((a,c,i) => ((a << 5) - a + c.charCodeAt(0) * (i+1)) | 0, 0);
    return Math.abs(base ^ time) >>> 0; // unsigned 32-bit, unique every ms
}

// ===== MAIN GENERATOR =====
function getExampleForPrompt(prompt) {
    const name = extractName(prompt) || null;
    const colors = extractColors(prompt);
    const sections = extractSections(prompt);
    const hash = promptHash(prompt);
    const p = prompt.toLowerCase();

    // Determine category
    let cat = 'generic';
    if (p.match(/fitness|gym|sport|training|kraft|studio|yoga|crossfit|boxen|kampfsport/)) cat = 'fitness';
    else if (p.match(/restaurant|essen|food|küche|bistro|speise|gastro|sushi|pizza|burger|grill/)) cat = 'restaurant';
    else if (p.match(/portfolio|kreativ|designer|fotograf|künstler|freelanc|persön|lebenslauf/)) cat = 'portfolio';
    else if (p.match(/saas|app|startup|platform|software|tool|dashboard|analytics|api/)) cat = 'saas';
    else if (p.match(/immobilie|real.?estate|haus|wohnung|makler|property/)) cat = 'realestate';
    else if (p.match(/beauty|salon|kosmetik|friseur|nail|spa|wellness|massage/)) cat = 'beauty';
    else if (p.match(/agentur|agency|kreativ.*agentur|marketing|brand|werbe/)) cat = 'agency';
    else if (p.match(/shop|store|ecommerce|produkt|verkauf|online.?shop|laden|mode|fashion/)) cat = 'shop';
    else if (p.match(/café|cafe|coffee|kaffee|bäcker|bakery/)) cat = 'cafe';
    else if (p.match(/arzt|praxis|doctor|medical|gesundheit|klinik|dental|zahnarzt|therapeut|physio/)) cat = 'medical';
    else if (p.match(/kurs|schule|education|learn|akademie|coach|seminar|nachhilfe|online.?kurs/)) cat = 'education';
    else if (p.match(/musik|band|artist|album|song|concert|tour|dj|producer/)) cat = 'music';
    else if (p.match(/anwalt|kanzlei|recht|law|jurist|notar|rechtsanwalt|steuerberater/)) cat = 'law';
    else if (p.match(/bar|cocktail|club|lounge|nachtleben|event|party|hochzeit|wedding/)) cat = 'event';
    else if (p.match(/tier|pet|hund|katze|tierarzt|hundesalon/)) cat = 'pet';
    else if (p.match(/auto|car|werkstatt|kfz|garage|fahrzeug/)) cat = 'auto';
    else if (p.match(/reise|travel|hotel|booking|urlaub|flug/)) cat = 'travel';

    // Pick style variation based on hash
    const isDark = p.match(/dunkel|dark|schwarz|nacht|night/) || ['fitness','music','agency','saas'].includes(cat);
    const isLight = p.match(/hell|light|weiß|bright|freundlich/) || ['beauty','cafe','medical','education','realestate','light1'].includes(cat);
    
    let style;
    if (isDark && !isLight) style = [styles.dark1, styles.dark2, styles.dark3][hash % 3];
    else if (isLight && !isDark) style = [styles.light1, styles.light2, styles.light3, styles.light4][hash % 4];
    else style = [styles.dark1, styles.light1, styles.dark2, styles.light2][hash % 4];

    const accentPool = ['#e63946','#2b7de9','#7c3aed','#16a34a','#f97316','#ec4899','#06b6d4','#d4a017','#6366f1','#0891b2','#be185d','#4f46e5','#b45309','#059669','#9333ea','#dc2626','#0284c7','#c026d3'];
    const accent = colors?.primary || accentPool[hash % accentPool.length];
    const font = fonts[hash % fonts.length];
    const siteName = name || getDefaultName(cat, hash);
    const heroLayout = hash % 3;

    return generateSite(cat, siteName, accent, style, font, sections, heroLayout, hash, prompt);
}

function getDefaultName(cat, hash) {
    const names = {
        fitness: ['FitZone','PowerGym','IronForge','FlexArena','PeakFit','CrossBase','BodyLab'],
        restaurant: ['La Maison','Gustavo','Saveurs','Zum Goldenen Hirsch','Fuego','Sakura','Olive & Thyme'],
        portfolio: ['Alex Meyer','Sarah Design','Studio Noir','Jonas Creative','Lena Works','Max Portfolio'],
        saas: ['LaunchPad','CloudSync','DataFlow','Nexus','Amplify','Orion','Vertex'],
        realestate: ['Luxe Immobilien','Heimwert','Prime Estate','Stadtblick','NobleLiving'],
        beauty: ['Bloom Beauty','Glow Studio','Pure Skin','Serenity Spa','Radiance'],
        agency: ['Neon Studio','Pixel Forge','Bold Agency','Orbit Creative','Signal Studio'],
        shop: ['MONO Store','Curated','Artisan','Maison','Thread & Co','Minimal Goods'],
        cafe: ['Brew & Bean','The Roastery','Café Morgen','Daily Grind','Kaffeeklatsch'],
        medical: ['Dr. Schmidt Praxis','MediCare Plus','Gesund & Fit','Praxis am Park'],
        education: ['LearnHub','SkillForge','Akademie Plus','EduPath','BrainBoost'],
        music: ['NOVA','Echo Chamber','Midnight Pulse','Voltage','Drift'],
        law: ['Weber & Partner','Kanzlei Stern','Recht & Rat','Justice Group'],
        event: ['Neon Nights','Eventful','Starlight Events','The Venue'],
        pet: ['Happy Paws','Tierliebe','Fellnase','PetCare Plus'],
        auto: ['AutoHaus Schmidt','SpeedWerk','Garage 42','CarCare Pro'],
        travel: ['Wanderlust','TravelWise','FernReise','Horizon Tours'],
        generic: ['Starter Co','NexGen','Bright Solutions','Quantum','Elevate','Zenith','Pulse'],
    };
    const list = names[cat] || names.generic;
    return list[hash % list.length];
}

function generateSite(cat, name, accent, style, font, sections, heroLayout, hash, prompt) {
    const isDark = style.bg.startsWith('#0') || style.bg.startsWith('#1');
    const textCol = style.text;
    const mutedCol = style.muted;
    const bgCol = style.bg;
    const cardCol = style.card;
    const borderCol = style.border;

    // Build CTA button
    const radii = ['99px','10px','6px','14px','0'];
    const ctaPads = ['14px 32px','16px 40px','12px 28px','14px 36px'];
    const ctaStyle = `display:inline-block;background:${accent};color:#fff;padding:${ctaPads[hash%ctaPads.length]};border-radius:${radii[hash%radii.length]};text-decoration:none;font-weight:700;font-size:15px;transition:all 0.3s;letter-spacing:${hash%3===0?'1px':'0'}`;
    const cta = `<a href="#" style="${ctaStyle}">${getCTA(cat, hash)}</a>`;
    
    // Hero background variation
    const heroBg = getHeroBg(cat, accent, style, hash);
    
    // Build hero
    const heroTitle = getHeroTitle(cat, name, accent, hash);
    const heroSub = getHeroSub(cat, hash);
    let hero;
    if (heroLayout === 0) hero = layouts.heroCenter(heroTitle, heroSub, cta, heroBg);
    else if (heroLayout === 1) hero = layouts.heroLeft(heroTitle, heroSub, cta, heroBg);
    else hero = layouts.heroSplit(heroTitle, heroSub, cta, heroBg, getCatEmoji(cat, hash));

    // Build sections
    let body = hero;
    const sectionWrap = (content, title) => `<div style="padding:80px 24px;max-width:1000px;margin:0 auto"><h2 style="font-size:28px;font-weight:800;text-align:center;margin-bottom:32px;letter-spacing:-0.5px">${title}</h2>${content}</div>`;

    // Build section pool and shuffle based on hash
    const sectionPool = [];
    
    // Services always included
    sectionPool.push(() => sectionWrap(buildGrid(getServices(cat, hash), accent, style), getServiceTitle(cat, hash)));

    // Pricing - vary inclusion
    if (sections.includes('pricing') || hash % 5 < 3) {
        sectionPool.push(() => sectionWrap(buildPricing(getPricing(cat, hash), accent, style), getPricingTitle(hash)));
    }

    // Stats
    if (sections.includes('stats') || hash % 7 < 3) {
        sectionPool.push(() => `<div style="padding:60px 24px">${buildStats(getStats(cat, hash), accent)}</div>`);
    }

    // Testimonials
    if (sections.includes('testimonials') || hash % 6 < 2) {
        sectionPool.push(() => sectionWrap(buildTestimonials(getTestimonials(cat, hash), style), getTestTitle(hash)));
    }

    // Contact
    if (sections.includes('contact') || hash % 4 < 3) {
        sectionPool.push(() => sectionWrap(buildContact(accent, style), getContactTitle(hash)));
    }

    // Shuffle sections (except first = services) based on hash
    const rest = sectionPool.slice(1);
    for (let i = rest.length - 1; i > 0; i--) {
        const j = (hash + i * 7) % (i + 1);
        [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    [sectionPool[0], ...rest].forEach(fn => body += fn());

    // Footer
    body += `<footer style="text-align:center;padding:40px;border-top:1px solid ${borderCol};color:${mutedCol};font-size:12px">© 2026 ${name}</footer>`;

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:${font};background:${bgCol};color:${textCol};-webkit-font-smoothing:antialiased}a{transition:opacity 0.2s}a:hover{opacity:0.85}img{max-width:100%}@media(max-width:640px){h1{font-size:32px!important}}</style></head><body>${body}</body></html>`;
}

// ===== CONTENT GENERATORS =====
function getCTA(cat, h) {
    const ctas = {
        fitness: ['JETZT STARTEN →','Probetraining buchen','Mitglied werden','Gratis testen'],
        restaurant: ['Tisch reservieren →','Speisekarte ansehen','Jetzt reservieren'],
        portfolio: ['Projekte ansehen →','Let\'s talk →','Kontakt aufnehmen'],
        saas: ['Get Started Free →','Start Free Trial','Try it Now →'],
        shop: ['Shop Now →','Kollektion entdecken','Jetzt shoppen →'],
        beauty: ['Termin buchen ✨','Jetzt buchen →','Termin vereinbaren'],
        medical: ['Termin vereinbaren →','Online buchen →','Jetzt Termin sichern'],
        music: ['Stream Now 🎵','Tour Tickets →','Jetzt hören'],
    };
    const list = ctas[cat] || ['Mehr erfahren →','Jetzt starten →','Kontakt aufnehmen →','Loslegen →'];
    return list[h % list.length];
}

function getHeroBg(cat, accent, style, h) {
    const bgs = [
        `background:linear-gradient(135deg,${accent}15,transparent);`,
        `background:linear-gradient(to bottom,${style.bg},${accent}08);`,
        `background:radial-gradient(ellipse at 50% 30%,${accent}12,transparent 70%);`,
        `background:linear-gradient(135deg,${accent}10,${style.bg});`,
        `background:linear-gradient(160deg,${style.bg},${accent}06);`,
        `background:linear-gradient(to right,${accent}10,transparent 60%);`,
        `background:radial-gradient(circle at 80% 50%,${accent}15,transparent 50%);`,
        `background:linear-gradient(45deg,${accent}08,transparent,${accent}05);`,
        `background:conic-gradient(from 180deg at 50% 50%,${accent}06,transparent,${accent}04);`,
    ];
    return bgs[h % bgs.length];
}

function getHeroTitle(cat, name, accent, h) {
    const titles = {
        fitness: [
            `PUSH YOUR <span style="color:${accent}">LIMITS</span>`,
            `<span style="color:${accent}">${name}</span> — Dein Gym`,
            `Stärker.<br><span style="color:${accent}">Jeden Tag.</span>`,
            `Train Hard.<br><span style="color:${accent}">Stay Humble.</span>`,
            `Your Body.<br><span style="color:${accent}">Your Rules.</span>`,
        ],
        restaurant: [
            `Willkommen bei<br><span style="color:${accent}">${name}</span>`,
            `Kulinarische<br><span style="color:${accent}">Exzellenz</span>`,
            `Genuss.<br><span style="color:${accent}">Neu definiert.</span>`,
            `<span style="color:${accent}">${name}</span>`,
        ],
        portfolio: [
            `Creative<br><span style="color:${accent}">Developer</span>`,
            `Hi, ich bin<br><span style="color:${accent}">${name}</span>`,
            `Design &<br><span style="color:${accent}">Development</span>`,
            `<span style="color:${accent}">${name}</span><br>Digital Creator`,
        ],
        saas: [
            `Ship faster with<br><span style="color:${accent}">${name}</span>`,
            `<span style="color:${accent}">${name}</span> — Build Better`,
            `The future of<br><span style="color:${accent}">development</span>`,
            `Scale with<br><span style="color:${accent}">${name}</span>`,
        ],
        shop: [
            `<span style="color:${accent}">${name}</span>`,
            `Curated.<br><span style="color:${accent}">For You.</span>`,
            `New Collection<br><span style="color:${accent}">2026</span>`,
        ],
        beauty: [
            `Deine Auszeit.<br><span style="color:${accent}">Dein Moment.</span>`,
            `<span style="color:${accent}">${name}</span><br>Beauty Studio`,
            `Schönheit.<br><span style="color:${accent}">Natürlich.</span>`,
        ],
        medical: [
            `Ihre Gesundheit.<br><span style="color:${accent}">In besten Händen.</span>`,
            `<span style="color:${accent}">${name}</span>`,
            `Moderne Medizin.<br><span style="color:${accent}">Persönlich.</span>`,
        ],
        music: [
            `<span style="color:${accent}">${name.toUpperCase()}</span>`,
            `${name.toUpperCase()}<br><span style="color:${accent}">WORLD TOUR 2026</span>`,
            `NEW ALBUM<br><span style="color:${accent}">OUT NOW</span>`,
        ],
    };
    const list = titles[cat] || [
        `${name}.<br><span style="color:${accent}">Neu gedacht.</span>`,
        `Willkommen bei<br><span style="color:${accent}">${name}</span>`,
        `<span style="color:${accent}">${name}</span> — Your Partner`,
        `Innovation.<br><span style="color:${accent}">Einfach.</span>`,
    ];
    return list[h % list.length];
}

function getHeroSub(cat, h) {
    const subs = {
        fitness: ['Werde die beste Version von dir. Modernste Geräte, erfahrene Trainer, grenzenlose Motivation.','Dein Körper verdient das Beste. Starte jetzt deine Transformation.','Kein Limit. Kein Aufgeben. Nur Ergebnisse.','Das Studio, das dich wirklich weiterbringt.'],
        restaurant: ['Kulinarische Erlebnisse, die in Erinnerung bleiben.','Frische Zutaten, leidenschaftliche Küche, unvergessliche Momente.','Wo Tradition auf Innovation trifft.','Genuss für alle Sinne — seit über 10 Jahren.'],
        portfolio: ['Ich gestalte digitale Erlebnisse die begeistern.','Design, Code und Kreativität — alles aus einer Hand.','Websites & Apps die nicht nur gut aussehen, sondern funktionieren.'],
        saas: ['The all-in-one platform to build, deploy, and scale.','Automate your workflow. Focus on what matters.','From idea to production in minutes, not months.'],
        shop: ['Kuratierte Produkte für den modernen Lifestyle.','Qualität, die man spürt. Design, das man sieht.','Entdecke unsere handverlesene Kollektion.'],
        beauty: ['Professionelle Beauty-Treatments in entspannter Atmosphäre.','Weil du es dir wert bist. Premium-Pflege für jeden Hauttyp.','Entspannung, Pflege und ein strahlendes Ergebnis.'],
        medical: ['Moderne Medizin mit persönlicher Betreuung. Jetzt online Termin buchen.','Ihre Gesundheit ist unsere Priorität. Kompetent und fürsorglich.','Vorsorge, Diagnostik und Behandlung — alles unter einem Dach.'],
        music: ['New Album Out Now — Stream on all platforms.','Die Tour des Jahres — sichere dir jetzt deine Tickets.','Music that moves. Sounds that stay.'],
    };
    const list = subs[cat] || ['Professionell, zuverlässig und immer für Sie da.','Wir bringen Ihre Vision zum Leben.','Qualität und Innovation — seit Tag eins.','Ihr Partner für die digitale Zukunft.'];
    return list[h % list.length];
}

function getCatEmoji(cat, h) {
    const emojis = {
        fitness: ['🏋️','💪','🥊','🏃'],
        restaurant: ['🍽️','👨‍🍳','🍷','🥘'],
        portfolio: ['💻','🎨','✨','🖥️'],
        saas: ['🚀','⚡','📊','☁️'],
        shop: ['👜','🛍️','✨','📦'],
        beauty: ['💅','✨','🌸','💆'],
        medical: ['🏥','🩺','💊','❤️'],
        music: ['🎵','🎸','🎤','🎹'],
    };
    const list = emojis[cat] || ['🚀','⚡','💡','✨'];
    return list[h % list.length];
}

function getServices(cat, h) {
    const services = {
        fitness: [
            [{icon:'🏋️',title:'Krafttraining',desc:'Freie Gewichte & modernste Geräte'},{icon:'🏃',title:'Cardio',desc:'Laufbänder, Crosstrainer, Rudern'},{icon:'🧘',title:'Yoga & Stretch',desc:'Flexibilität und innere Ruhe'},{icon:'🥊',title:'Kampfsport',desc:'Boxen, Kickboxen, MMA'}],
            [{icon:'💪',title:'Personal Training',desc:'1-on-1 mit zertifizierten Trainern'},{icon:'🏃‍♀️',title:'Gruppenkurse',desc:'HIIT, Spinning, Zumba & mehr'},{icon:'🥗',title:'Ernährungsberatung',desc:'Individuelle Ernährungspläne'},{icon:'🧖',title:'Wellness',desc:'Sauna, Dampfbad, Recovery'}],
            [{icon:'⚡',title:'HIIT Training',desc:'Hochintensiv, effektiv, kurz'},{icon:'🏊',title:'Schwimmen',desc:'25m Pool, Aqua-Fitness'},{icon:'🧗',title:'Bouldern',desc:'Indoor-Kletterwand für alle Level'},{icon:'🤸',title:'Funktional',desc:'TRX, Kettlebells, Mobility'}],
        ],
        restaurant: [
            [{icon:'🥘',title:'Vorspeisen',desc:'Tatar, Carpaccio, Suppen'},{icon:'🥩',title:'Hauptgerichte',desc:'Fleisch, Fisch, Vegetarisch'},{icon:'🍰',title:'Desserts',desc:'Hausgemachte Süßspeisen'},{icon:'🍷',title:'Weinkarte',desc:'Über 200 ausgewählte Weine'}],
            [{icon:'🌿',title:'Farm to Table',desc:'Regionale Zutaten, saisonal'},{icon:'👨‍🍳',title:'Chef\'s Table',desc:'Exklusives 7-Gänge-Menü'},{icon:'🎉',title:'Events',desc:'Private Dining & Feiern'},{icon:'🚚',title:'Lieferservice',desc:'Genuss direkt zu dir'}],
        ],
        saas: [
            [{icon:'🚀',title:'Lightning Deploy',desc:'Ship in seconds, not hours.'},{icon:'🔒',title:'Secure by Default',desc:'Enterprise-grade security.'},{icon:'📊',title:'Analytics',desc:'Real-time insights & dashboards.'},{icon:'🔄',title:'Auto-Scaling',desc:'Grows with your traffic.'}],
            [{icon:'⚡',title:'API First',desc:'Powerful REST & GraphQL APIs.'},{icon:'🧩',title:'Integrations',desc:'Connect 500+ tools.'},{icon:'👥',title:'Team Collab',desc:'Real-time multiplayer editing.'},{icon:'🌍',title:'Global CDN',desc:'Fast everywhere.'}],
        ],
        shop: [
            [{icon:'⌚',title:'Uhren',desc:'Minimalistische Timepieces',price:'ab €189'},{icon:'🎧',title:'Audio',desc:'Premium Headphones',price:'ab €129'},{icon:'🕶️',title:'Eyewear',desc:'Zeitlose Sonnenbrillen',price:'ab €79'},{icon:'👟',title:'Sneaker',desc:'Urban Streetwear',price:'ab €159'}],
            [{icon:'👜',title:'Taschen',desc:'Handgefertigtes Leder',price:'ab €249'},{icon:'💍',title:'Schmuck',desc:'Minimalistisch & elegant',price:'ab €89'},{icon:'🧥',title:'Outerwear',desc:'Premium Jacken & Mäntel',price:'ab €349'},{icon:'🎁',title:'Gift Sets',desc:'Kuratierte Geschenkboxen',price:'ab €69'}],
        ],
    };
    const list = services[cat];
    if (list) return list[h % list.length];
    // Generic
    return [{icon:'⚡',title:'Schnell',desc:'Blitzschnelle Ergebnisse.'},{icon:'💎',title:'Qualität',desc:'Premium auf ganzer Linie.'},{icon:'🤝',title:'Persönlich',desc:'Individuell für Sie.'},{icon:'🔒',title:'Sicher',desc:'Datenschutz hat Priorität.'}];
}

function getServiceTitle(cat, h) {
    const titles = {
        fitness: ['Unser Angebot','Trainingsmöglichkeiten','Was wir bieten','Deine Möglichkeiten'],
        restaurant: ['Unsere Küche','Kulinarische Highlights','Das erwartet Sie'],
        saas: ['Features','What\'s included','Powerful Features'],
        shop: ['Bestseller','Unsere Kollektion','Trending Now'],
    };
    const list = titles[cat] || ['Unsere Leistungen','Was wir bieten','Services','Unser Angebot'];
    return list[h % list.length];
}

function getPricing(cat, h) {
    const pricing = {
        fitness: [
            [{name:'Starter',price:'29€',features:['Mo-Fr 8-20 Uhr','Gerätetraining','Duschen','Wasserflatrate'],cta:'Auswählen'},{name:'Pro',price:'49€',features:['24/7 Zugang','Alle Kurse','1x Personal/Mo','Sauna','Ernährungsplan'],cta:'Beliebteste'},{name:'Elite',price:'89€',features:['VIP 24/7','Unlimited Personal','Individueller Plan','Recovery Zone','Gästekarte'],cta:'Premium'}],
            [{name:'Basic',price:'19€',features:['10x Zutritt/Mo','Gerätetraining','App-Zugang'],cta:'Starten'},{name:'Unlimited',price:'39€',features:['Unbegrenzter Zutritt','Alle Kurse','Körperanalyse'],cta:'Am beliebtesten'},{name:'VIP',price:'79€',features:['Alles in Unlimited','Personal Training','Spa-Bereich','Priority Support'],cta:'VIP werden'}],
        ],
        saas: [
            [{name:'Starter',price:'$0',period:'/mo',features:['1 Project','1GB Storage','Community Support'],cta:'Start Free'},{name:'Pro',price:'$29',period:'/mo',features:['Unlimited Projects','50GB Storage','Priority Support','Custom Domains'],cta:'Go Pro'},{name:'Enterprise',price:'$99',period:'/mo',features:['Everything in Pro','SSO & SAML','Dedicated Support','SLA 99.99%'],cta:'Contact Sales'}],
        ],
    };
    const list = pricing[cat];
    if (list) return list[h % list.length];
    return [{name:'Basic',price:'€49',features:['Grundpaket','E-Mail Support','1 Nutzer'],cta:'Starten'},{name:'Pro',price:'€99',features:['Alles in Basic','Priorität','5 Nutzer','Analytics'],cta:'Empfohlen'},{name:'Enterprise',price:'€249',features:['Alles in Pro','Unlimited','Dedicated Support','Custom'],cta:'Kontakt'}];
}

function getPricingTitle(h) { return ['Unsere Pakete','Preise','Pricing','Tarife & Pakete'][h%4]; }

function getStats(cat, h) {
    const stats = {
        fitness: [{val:'5.000+',label:'Mitglieder'},{val:'50+',label:'Kurse/Woche'},{val:'4.9★',label:'Bewertung'}],
        restaurant: [{val:'15+',label:'Jahre'},{val:'50.000+',label:'Gäste/Jahr'},{val:'4.8★',label:'Google'}],
        saas: [{val:'50K+',label:'Users'},{val:'99.9%',label:'Uptime'},{val:'150+',label:'Countries'}],
        shop: [{val:'10K+',label:'Kunden'},{val:'500+',label:'Produkte'},{val:'4.9★',label:'Trusted'}],
        medical: [{val:'20+',label:'Jahre'},{val:'5.000+',label:'Patienten'},{val:'4.9★',label:'Google'}],
    };
    return stats[cat] || [{val:'1.000+',label:'Kunden'},{val:'10+',label:'Jahre'},{val:'4.8★',label:'Bewertung'}];
}

function getTestimonials(cat, h) {
    const all = [
        {text:'Absolut professionell und zuverlässig. Kann ich nur empfehlen!',author:'Marie K.'},
        {text:'Bester Service den ich je hatte. Schnell, freundlich, kompetent.',author:'Thomas S.'},
        {text:'Seit 3 Jahren Stammkunde. Qualität stimmt einfach immer.',author:'Lisa M.'},
        {text:'Top Preis-Leistung! Werde definitiv wiederkommen.',author:'Jan B.'},
        {text:'Übertrifft jede Erwartung. Absolut empfehlenswert.',author:'Sarah H.'},
        {text:'Professionell von A bis Z. Genau das was ich gesucht habe.',author:'Michael R.'},
    ];
    const start = h % all.length;
    return [all[start], all[(start+1)%all.length], all[(start+2)%all.length]].slice(0, h%2===0 ? 3 : 2);
}

function getTestTitle(h) { return ['Das sagen unsere Kunden','Kundenstimmen','Bewertungen','Feedback'][h%4]; }
function getContactTitle(h) { return ['Kontakt','Schreib uns','Get in Touch','Nachricht senden'][h%4]; }
