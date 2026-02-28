// =============================================
// DEVDASH — Dynamic Example Generator
// Every prompt → unique result
// =============================================

const templates = {

// ===== FITNESS =====
fitness: (p) => {
    const name = extractName(p) || 'FitZone';
    const colors = extractColors(p) || {primary:'#e63946',dark:'#0a0a0a',accent:'#ff6b6b'};
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:${colors.dark};color:#fff}
.hero{min-height:100vh;background:linear-gradient(135deg,${colors.primary}33,transparent),url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80') center/cover;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px}
.hero h1{font-size:clamp(36px,7vw,80px);font-weight:900;text-transform:uppercase;letter-spacing:-2px}
.hero h1 span{color:${colors.primary}}
.hero p{font-size:18px;opacity:0.7;margin:16px 0 32px;max-width:500px}
.cta{display:inline-block;background:${colors.primary};color:#fff;padding:16px 40px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px}
section{padding:80px 24px;max-width:1000px;margin:0 auto}
h2{font-size:36px;font-weight:800;margin-bottom:32px;text-align:center}
h2 span{color:${colors.primary}}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.card{background:#141414;border:1px solid #222;border-radius:16px;padding:32px;text-align:center;transition:all 0.3s}
.card:hover{transform:translateY(-4px);border-color:${colors.primary}}
.card.feat{border-color:${colors.primary};background:${colors.primary}11}
.price{font-size:48px;font-weight:900;margin:12px 0}.price span{font-size:16px;opacity:0.5}
.name{font-size:14px;text-transform:uppercase;letter-spacing:2px;color:${colors.primary}}
ul{list-style:none;margin:20px 0;text-align:left}li{padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:14px;color:#aaa}li::before{content:'✓ ';color:${colors.primary}}
footer{text-align:center;padding:40px;border-top:1px solid #151515;color:#555;font-size:13px}
</style></head><body>
<div class="hero"><div><h1>PUSH YOUR <span>LIMITS</span></h1><p>Werde die beste Version von dir. Modernste Geräte, erfahrene Trainer.</p><a href="#" class="cta">JETZT STARTEN →</a></div></div>
<section><h2>Unsere <span>Pakete</span></h2><div class="grid">
<div class="card"><div class="name">Starter</div><div class="price">29€<span>/Mo</span></div><ul><li>Mo-Fr 8-20 Uhr</li><li>Gerätetraining</li><li>Duschen</li></ul></div>
<div class="card feat"><div class="name">Pro</div><div class="price">49€<span>/Mo</span></div><ul><li>24/7 Zugang</li><li>Alle Kurse</li><li>1x Personal Training</li><li>Sauna</li></ul></div>
<div class="card"><div class="name">Elite</div><div class="price">89€<span>/Mo</span></div><ul><li>VIP 24/7</li><li>Unlimited Training</li><li>Ernährungsplan</li><li>Recovery Zone</li></ul></div>
</div></section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== RESTAURANT =====
restaurant: (p) => {
    const name = extractName(p) || 'La Maison';
    const colors = extractColors(p) || {primary:'#c8a97e',dark:'#0c0c0c'};
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;background:${colors.dark};color:#fff}
.hero{min-height:100vh;background:linear-gradient(to bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80') center/cover;display:flex;align-items:center;justify-content:center;text-align:center}
.hero h1{font-size:clamp(36px,6vw,64px);letter-spacing:8px;text-transform:uppercase;font-weight:400}
.line{width:60px;height:1px;background:${colors.primary};margin:20px auto}
.sub{color:${colors.primary};letter-spacing:4px;text-transform:uppercase;font-size:14px}
.cta{display:inline-block;margin-top:28px;border:1px solid ${colors.primary};color:${colors.primary};padding:12px 36px;text-decoration:none;letter-spacing:3px;font-size:13px;text-transform:uppercase;transition:all 0.3s}
.cta:hover{background:${colors.primary};color:#000}
section{padding:80px 24px;max-width:900px;margin:0 auto;text-align:center}
h2{font-size:32px;letter-spacing:4px;font-weight:400;margin-bottom:8px}
.gold{color:${colors.primary}}
.menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;text-align:left;margin-top:32px}
.item{padding-bottom:16px;border-bottom:1px solid #1a1a1a}
.item-top{display:flex;justify-content:space-between}.item h3{font-weight:400;font-size:18px}.item .pr{color:${colors.primary}}
.item p{color:#666;font-size:14px;font-style:italic;margin-top:4px}
footer{text-align:center;padding:40px;color:#333;font-size:13px;letter-spacing:2px}
</style></head><body>
<div class="hero"><div><div class="sub">Fine Dining</div><div class="line"></div><h1>${name}</h1><div class="line"></div><a href="#" class="cta">Speisekarte</a></div></div>
<section><h2>Unsere <span class="gold">Karte</span></h2><div class="line"></div><div class="menu">
<div class="item"><div class="item-top"><h3>Tatar vom Rind</h3><span class="pr">€18</span></div><p>Klassisch mit Eigelb und Kapern</p></div>
<div class="item"><div class="item-top"><h3>Trüffel Risotto</h3><span class="pr">€24</span></div><p>Schwarzer Trüffel, Parmesan</p></div>
<div class="item"><div class="item-top"><h3>Wagyu Filet</h3><span class="pr">€52</span></div><p>A5 Wagyu, Rotwein-Jus</p></div>
<div class="item"><div class="item-top"><h3>Wolfsbarsch</h3><span class="pr">€34</span></div><p>Gegrillt, Zitrus-Beurre Blanc</p></div>
</div></section>
<footer>© 2026 ${name} — Friedrichstraße 42, Berlin</footer></body></html>`;
},

// ===== PORTFOLIO =====
portfolio: (p) => {
    const name = extractName(p) || 'Alex Meyer';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#000;color:#fff}
nav{position:fixed;top:0;width:100%;padding:20px 40px;display:flex;justify-content:space-between;z-index:100;mix-blend-mode:difference}
nav a{color:#fff;text-decoration:none;font-size:13px;letter-spacing:1px}
.hero{height:100vh;display:flex;align-items:center;padding:0 10vw}
.hero h1{font-size:clamp(48px,8vw,110px);font-weight:200;line-height:1;letter-spacing:-4px}
.hero h1 strong{font-weight:800;background:linear-gradient(135deg,#00f0ff,#7b2ff7,#ff006e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#555;margin-top:20px;max-width:400px}
section{padding:100px 10vw}
.label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#555;margin-bottom:32px}
.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.proj{aspect-ratio:4/3;border-radius:16px;overflow:hidden;cursor:pointer;position:relative}
.proj>div{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:56px;transition:transform 0.5s}
.proj:hover>div{transform:scale(1.05)}
.proj-info{position:absolute;bottom:20px;left:20px;opacity:0;transition:opacity 0.3s}
.proj:hover .proj-info{opacity:1}
.proj-info h3{font-size:18px}.proj-info p{color:#999;font-size:13px}
.c1{background:linear-gradient(135deg,#667eea,#764ba2)}.c2{background:linear-gradient(135deg,#f093fb,#f5576c)}
.c3{background:linear-gradient(135deg,#4facfe,#00f2fe)}.c4{background:linear-gradient(135deg,#43e97b,#38f9d7)}
.contact{text-align:center;padding:100px 24px}
.contact h2{font-size:clamp(32px,5vw,56px);font-weight:200}.contact strong{font-weight:800}
.contact a{display:inline-block;margin-top:20px;color:#fff;text-decoration:none;border-bottom:1px solid #333;padding-bottom:4px}
footer{text-align:center;padding:40px;color:#333;font-size:12px}
</style></head><body>
<nav><a>${name.toUpperCase()}</a><a href="#">KONTAKT</a></nav>
<section class="hero"><div><h1>Creative<br><strong>Developer</strong></h1><p>Digitale Erlebnisse die begeistern.</p></div></section>
<section><div class="label">Projekte</div><div class="projects">
<div class="proj"><div class="c1">🎨</div><div class="proj-info"><h3>Arthaus</h3><p>React, Three.js</p></div></div>
<div class="proj"><div class="c2">🎵</div><div class="proj-info"><h3>SoundWave</h3><p>Next.js</p></div></div>
<div class="proj"><div class="c3">🏗️</div><div class="proj-info"><h3>ArchVision</h3><p>GSAP, WebGL</p></div></div>
<div class="proj"><div class="c4">🛍️</div><div class="proj-info"><h3>Luxe Store</h3><p>Shopify</p></div></div>
</div></section>
<div class="contact"><h2>Let's work<br><strong>together.</strong></h2><a href="#">hello@${name.toLowerCase().replace(/\s/g,'')}dev →</a></div>
<footer>© 2026 ${name.toUpperCase()}</footer></body></html>`;
},

// ===== SAAS / TECH =====
saas: (p) => {
    const name = extractName(p) || 'LaunchPad';
    const colors = extractColors(p) || {primary:'#6366f1'};
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0a0a0f;color:#fff}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;background:radial-gradient(ellipse at 50% 30%,${colors.primary}15,transparent 70%)}
h1{font-size:clamp(36px,6vw,64px);font-weight:800;line-height:1.1;margin-bottom:16px;letter-spacing:-2px}
h1 span{background:linear-gradient(135deg,${colors.primary},#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{color:#666;font-size:18px;max-width:500px;margin:0 auto 32px}
.cta-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn{padding:14px 32px;border-radius:12px;font-weight:600;font-size:15px;text-decoration:none;transition:all 0.2s}
.btn-p{background:${colors.primary};color:#fff}.btn-s{border:1px solid #222;color:#aaa}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;max-width:900px;margin:0 auto;padding:80px 24px}
.feat{background:#111;border:1px solid #1a1a1a;border-radius:16px;padding:28px;transition:border-color 0.3s}
.feat:hover{border-color:${colors.primary}}
.feat .icon{font-size:28px;margin-bottom:12px}.feat h3{font-size:16px;font-weight:700;margin-bottom:6px}.feat p{color:#555;font-size:13px;line-height:1.5}
.pricing{text-align:center;padding:80px 24px;max-width:600px;margin:0 auto}
.pricing h2{font-size:32px;font-weight:800;margin-bottom:32px;letter-spacing:-1px}
.plan{background:#111;border:2px solid ${colors.primary};border-radius:20px;padding:40px;margin-bottom:16px}
.plan .amount{font-size:56px;font-weight:900}.plan .amount span{font-size:16px;color:#666;font-weight:400}
.plan ul{list-style:none;margin:24px 0;text-align:left}
.plan li{padding:8px 0;font-size:14px;color:#aaa}.plan li::before{content:'✓ ';color:${colors.primary};font-weight:700}
.plan .btn{display:block;text-align:center;margin-top:16px}
footer{text-align:center;padding:40px;color:#333;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>Ship faster with<br><span>${name}</span></h1><p>The all-in-one platform to build, deploy, and scale your next project.</p><div class="cta-row"><a class="btn btn-p" href="#">Get Started Free</a><a class="btn btn-s" href="#">Live Demo →</a></div></div></div>
<div class="features">
<div class="feat"><div class="icon">🚀</div><h3>Lightning Fast</h3><p>Deploy in seconds, not hours. Zero config needed.</p></div>
<div class="feat"><div class="icon">🔒</div><h3>Secure by Default</h3><p>Enterprise-grade security out of the box.</p></div>
<div class="feat"><div class="icon">📊</div><h3>Real-time Analytics</h3><p>See what matters. Built-in dashboards.</p></div>
</div>
<div class="pricing"><h2>Simple Pricing</h2>
<div class="plan"><div class="amount">$29<span>/month</span></div><ul><li>Unlimited projects</li><li>Custom domains</li><li>Team collaboration</li><li>Priority support</li></ul><a class="btn btn-p" href="#">Start Free Trial</a></div>
</div>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== REAL ESTATE =====
realestate: (p) => {
    const name = extractName(p) || 'Luxe Immobilien';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#fafaf8;color:#1a1a1a}
.hero{min-height:100vh;background:linear-gradient(to right,rgba(0,0,0,0.6),transparent),url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80') center/cover;display:flex;align-items:center;padding:0 8vw;color:#fff}
.hero h1{font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.2;letter-spacing:-1px}.hero h1 strong{font-weight:800}
.hero p{font-size:16px;opacity:0.8;margin:16px 0 28px;max-width:450px}
.cta{display:inline-block;background:#1a1a1a;color:#fff;padding:14px 32px;text-decoration:none;font-weight:600;font-size:14px;transition:background 0.3s}
.cta:hover{background:#333}
section{padding:80px 8vw;max-width:1200px;margin:0 auto}
h2{font-size:28px;font-weight:300;margin-bottom:8px}h2 strong{font-weight:800}
.sub{color:#888;font-size:14px;margin-bottom:32px}
.props{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.prop{border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 2px 16px rgba(0,0,0,0.06)}
.prop-img{height:200px;background:linear-gradient(135deg,#e8e4df,#d4cfc8);display:flex;align-items:center;justify-content:center;font-size:48px}
.prop-body{padding:20px}
.prop-body h3{font-size:18px;font-weight:700;margin-bottom:4px}
.prop-body .loc{font-size:13px;color:#888;margin-bottom:12px}
.prop-body .price{font-size:24px;font-weight:800;color:#1a1a1a}
.prop-body .details{display:flex;gap:16px;margin-top:12px;font-size:12px;color:#888}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;text-align:center}
.stat-val{font-size:36px;font-weight:800}.stat-lbl{font-size:13px;color:#888;margin-top:4px}
footer{text-align:center;padding:40px;color:#bbb;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>Finden Sie Ihr<br><strong>Traumhaus</strong></h1><p>Exklusive Immobilien in bester Lage. Persönliche Beratung, erstklassiger Service.</p><a href="#" class="cta">Objekte ansehen →</a></div></div>
<section><h2>Aktuelle <strong>Angebote</strong></h2><p class="sub">Handverlesene Premium-Immobilien</p><div class="props">
<div class="prop"><div class="prop-img">🏡</div><div class="prop-body"><h3>Villa am See</h3><div class="loc">📍 Starnberg</div><div class="price">€1.850.000</div><div class="details"><span>5 Zimmer</span><span>280m²</span><span>Garten</span></div></div></div>
<div class="prop"><div class="prop-img">🏢</div><div class="prop-body"><h3>Penthouse City</h3><div class="loc">📍 München-Maxvorstadt</div><div class="price">€2.200.000</div><div class="details"><span>4 Zimmer</span><span>190m²</span><span>Dachterrasse</span></div></div></div>
<div class="prop"><div class="prop-img">🏠</div><div class="prop-body"><h3>Altbau-Juwel</h3><div class="loc">📍 Berlin-Charlottenburg</div><div class="price">€890.000</div><div class="details"><span>3 Zimmer</span><span>120m²</span><span>Stuck</span></div></div></div>
</div>
<div class="stats"><div><div class="stat-val">250+</div><div class="stat-lbl">Objekte verkauft</div></div><div><div class="stat-val">15</div><div class="stat-lbl">Jahre Erfahrung</div></div><div><div class="stat-val">98%</div><div class="stat-lbl">Zufriedenheit</div></div></div>
</section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== BEAUTY / SALON =====
beauty: (p) => {
    const name = extractName(p) || 'Bloom Beauty';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#fdf8f4;color:#2a2a2a}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;background:linear-gradient(135deg,#fdf8f4,#f8e8dd)}
.hero h1{font-size:clamp(36px,6vw,60px);font-weight:300;letter-spacing:-1px;line-height:1.1}.hero h1 strong{font-weight:800;color:#c17f5a}
.hero p{color:#888;font-size:16px;margin:16px 0 28px;max-width:440px}
.cta{display:inline-block;background:#c17f5a;color:#fff;padding:14px 36px;border-radius:99px;text-decoration:none;font-weight:600}
section{padding:80px 24px;max-width:900px;margin:0 auto}
h2{font-size:28px;font-weight:300;text-align:center;margin-bottom:32px}h2 strong{font-weight:800}
.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.svc{background:#fff;border-radius:16px;padding:28px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.04)}
.svc .emoji{font-size:36px;margin-bottom:12px}.svc h3{font-size:16px;font-weight:700;margin-bottom:4px}
.svc .price{color:#c17f5a;font-weight:700;font-size:18px;margin-top:8px}
.svc p{font-size:13px;color:#888}
.testimonial{background:#fff;border-radius:16px;padding:32px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.04);margin-top:48px}
.testimonial p{font-style:italic;font-size:16px;color:#555;margin-bottom:12px}
.testimonial .author{font-weight:700;font-size:14px}
footer{text-align:center;padding:40px;color:#ccc;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>Deine Auszeit.<br><strong>Dein Moment.</strong></h1><p>Professionelle Beauty-Treatments in entspannter Atmosphäre.</p><a href="#" class="cta">Termin buchen ✨</a></div></div>
<section><h2>Unsere <strong>Treatments</strong></h2><div class="services">
<div class="svc"><div class="emoji">💆‍♀️</div><h3>Gesichtsbehandlung</h3><p>60 Minuten Luxus-Pflege</p><div class="price">€89</div></div>
<div class="svc"><div class="emoji">💅</div><h3>Maniküre</h3><p>Klassisch oder Gel</p><div class="price">€45</div></div>
<div class="svc"><div class="emoji">✂️</div><h3>Haarstyling</h3><p>Schnitt, Farbe, Styling</p><div class="price">€65</div></div>
<div class="svc"><div class="emoji">🧖</div><h3>Wellness-Paket</h3><p>Massage + Gesicht + Mani</p><div class="price">€169</div></div>
</div>
<div class="testimonial"><p>"Bester Salon in der Stadt! Ich komme seit 3 Jahren hierher."</p><div class="author">— Marie K. ⭐⭐⭐⭐⭐</div></div>
</section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== AGENCY =====
agency: (p) => {
    const name = extractName(p) || 'Neon Studio';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff}
.hero{min-height:100vh;display:flex;align-items:center;padding:0 8vw;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(236,72,153,0.05))}
.hero h1{font-size:clamp(40px,7vw,80px);font-weight:900;line-height:1.05;letter-spacing:-3px}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,#818cf8,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:17px;color:#666;margin:20px 0 32px;max-width:500px}
.cta{display:inline-block;background:#fff;color:#000;padding:14px 32px;border-radius:99px;text-decoration:none;font-weight:700}
section{padding:100px 8vw}
.clients{display:flex;gap:48px;flex-wrap:wrap;justify-content:center;opacity:0.3;font-size:18px;font-weight:700;letter-spacing:2px}
.work-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:48px}
.work{aspect-ratio:16/10;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:48px;transition:transform 0.4s}
.work:hover{transform:scale(1.03)}
.w1{background:linear-gradient(135deg,#1e1b4b,#312e81)}.w2{background:linear-gradient(135deg,#4c1d95,#7c3aed)}
.w3{background:linear-gradient(135deg,#831843,#ec4899)}.w4{background:linear-gradient(135deg,#0c4a6e,#0ea5e9)}
.label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#444;margin-bottom:28px}
footer{text-align:center;padding:48px;color:#333;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>We build<br><em>digital experiences</em><br>that matter.</h1><p>Strategy, Design & Development für Marken die auffallen wollen.</p><a href="#" class="cta">Projekt starten →</a></div></div>
<section style="text-align:center"><div class="clients"><span>NIKE</span><span>SPOTIFY</span><span>AIRBNB</span><span>STRIPE</span><span>NOTION</span></div></section>
<section><div class="label">Ausgewählte Arbeiten</div><div class="work-grid">
<div class="work w1">🎨</div><div class="work w2">📱</div><div class="work w3">🎬</div><div class="work w4">🌐</div>
</div></section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== SHOP / ECOMMERCE =====
shop: (p) => {
    const name = extractName(p) || 'MONO Store';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#fff;color:#111}
nav{display:flex;justify-content:space-between;align-items:center;padding:20px 40px;border-bottom:1px solid #eee}
.logo{font-size:18px;font-weight:800;letter-spacing:2px}
nav a{color:#888;text-decoration:none;font-size:13px}
.hero{display:flex;align-items:center;min-height:80vh;padding:0 8vw;gap:48px;flex-wrap:wrap}
.hero-text{flex:1;min-width:300px}
.hero-text h1{font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-1px;line-height:1.1}
.hero-text p{color:#888;font-size:16px;margin:16px 0 28px}
.cta{display:inline-block;background:#111;color:#fff;padding:14px 32px;text-decoration:none;font-weight:600;border-radius:8px}
.hero-img{flex:1;min-width:300px;aspect-ratio:1;background:linear-gradient(135deg,#f5f5f5,#e8e8e8);border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:96px}
.products{padding:80px 8vw}
.products h2{font-size:24px;font-weight:800;margin-bottom:32px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
.product{border-radius:12px;overflow:hidden;cursor:pointer}
.product-img{aspect-ratio:1;background:#f5f5f5;display:flex;align-items:center;justify-content:center;font-size:56px;transition:transform 0.4s}
.product:hover .product-img{transform:scale(1.05)}
.product-info{padding:16px 0}
.product-info h3{font-size:15px;font-weight:600}.product-info .price{font-size:16px;font-weight:800;margin-top:4px}
.product-info .old{text-decoration:line-through;color:#bbb;font-size:13px;margin-left:8px;font-weight:400}
footer{text-align:center;padding:40px;color:#ccc;font-size:12px;border-top:1px solid #eee}
</style></head><body>
<nav><div class="logo">${name.toUpperCase()}</div><a href="#">Shop</a></nav>
<div class="hero"><div class="hero-text"><h1>Minimalism.<br>Redefined.</h1><p>Kuratierte Produkte für den modernen Lifestyle.</p><a href="#" class="cta">Shop Now →</a></div><div class="hero-img">👜</div></div>
<div class="products"><h2>Bestseller</h2><div class="grid">
<div class="product"><div class="product-img">⌚</div><div class="product-info"><h3>Minimal Watch</h3><div class="price">€189 <span class="old">€249</span></div></div></div>
<div class="product"><div class="product-img">🎧</div><div class="product-info"><h3>Studio Headphones</h3><div class="price">€129</div></div></div>
<div class="product"><div class="product-img">🕶️</div><div class="product-info"><h3>Classic Shades</h3><div class="price">€79</div></div></div>
<div class="product"><div class="product-img">👟</div><div class="product-info"><h3>Urban Sneaker</h3><div class="price">€159</div></div></div>
</div></div>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== CAFE =====
cafe: (p) => {
    const name = extractName(p) || 'Brew & Bean';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,sans-serif;background:#f9f5f0;color:#3a2e28}
.hero{min-height:100vh;background:url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80') center/cover;display:flex;align-items:center;justify-content:center;text-align:center}
.hero-box{background:rgba(249,245,240,0.92);backdrop-filter:blur(8px);padding:48px;border-radius:20px;max-width:500px}
.hero-box h1{font-size:42px;font-weight:400;letter-spacing:-1px}.hero-box h1 strong{color:#8b6914}
.hero-box p{color:#888;font-size:15px;margin:12px 0 24px}
.cta{display:inline-block;background:#3a2e28;color:#f9f5f0;padding:12px 28px;border-radius:99px;text-decoration:none;font-weight:600;font-size:14px}
section{padding:64px 24px;max-width:800px;margin:0 auto;text-align:center}
h2{font-size:28px;font-weight:400;margin-bottom:28px}h2 strong{color:#8b6914}
.menu{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;text-align:left}
.item{background:#fff;border-radius:12px;padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.04)}
.item h3{font-size:16px;margin-bottom:4px}.item .price{color:#8b6914;font-weight:700}
.item p{font-size:12px;color:#999;margin-top:4px}
.hours{background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,0.04);margin-top:32px;font-size:15px}
.hours p{margin:4px 0;color:#666}
footer{text-align:center;padding:40px;color:#ccc;font-size:12px}
</style></head><body>
<div class="hero"><div class="hero-box"><h1>${name.split(' ')[0]}<br><strong>&amp; ${name.split(' ').slice(1).join(' ') || 'Bean'}</strong></h1><p>Handgerösteter Kaffee. Hausgemachte Kuchen. Dein zweites Wohnzimmer.</p><a href="#" class="cta">Speisekarte ☕</a></div></div>
<section><h2>Unsere <strong>Klassiker</strong></h2><div class="menu">
<div class="item"><h3>Flat White</h3><p>Doppelter Espresso, cremige Milch</p><div class="price">€4,20</div></div>
<div class="item"><h3>Chai Latte</h3><p>Gewürztee mit aufgeschäumter Milch</p><div class="price">€4,50</div></div>
<div class="item"><h3>Croissant</h3><p>Frisch gebacken, Butter</p><div class="price">€3,80</div></div>
<div class="item"><h3>Carrot Cake</h3><p>Hausgemacht, Frischkäse-Topping</p><div class="price">€5,20</div></div>
</div>
<div class="hours"><strong>Öffnungszeiten</strong><p>Mo–Fr: 7:30 – 19:00</p><p>Sa–So: 9:00 – 18:00</p></div>
</section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== MEDICAL =====
medical: (p) => {
    const name = extractName(p) || 'Dr. Schmidt Praxis';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#f7fbfe;color:#1a2942}
.hero{min-height:70vh;display:flex;align-items:center;padding:80px 8vw;background:linear-gradient(135deg,#e8f4fd,#f7fbfe)}
.hero h1{font-size:clamp(32px,4vw,48px);font-weight:800;letter-spacing:-1px;line-height:1.2}
.hero h1 span{color:#2b7de9}
.hero p{color:#6b7c93;font-size:16px;margin:16px 0 28px;max-width:480px}
.cta{display:inline-block;background:#2b7de9;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600}
section{padding:64px 8vw;max-width:1000px;margin:0 auto}
h2{font-size:28px;font-weight:800;margin-bottom:24px;letter-spacing:-0.5px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.card{background:#fff;border-radius:14px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.04)}
.card .icon{font-size:32px;margin-bottom:12px}.card h3{font-size:16px;font-weight:700;margin-bottom:6px}.card p{font-size:13px;color:#6b7c93;line-height:1.5}
.info-bar{display:flex;gap:20px;flex-wrap:wrap;margin-top:32px}
.info{flex:1;min-width:200px;background:#fff;border-radius:14px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.04);text-align:center}
.info .val{font-size:28px;font-weight:800;color:#2b7de9}.info .lbl{font-size:13px;color:#6b7c93;margin-top:4px}
footer{text-align:center;padding:40px;color:#bbb;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>Ihre Gesundheit.<br><span>In besten Händen.</span></h1><p>Moderne Medizin mit persönlicher Betreuung. Jetzt online Termin buchen.</p><a href="#" class="cta">Termin vereinbaren →</a></div></div>
<section><h2>Unsere Leistungen</h2><div class="grid">
<div class="card"><div class="icon">🩺</div><h3>Allgemeinmedizin</h3><p>Umfassende Vorsorge und Behandlung.</p></div>
<div class="card"><div class="icon">💉</div><h3>Impfungen</h3><p>Reise- und Standardimpfungen.</p></div>
<div class="card"><div class="icon">🫀</div><h3>Kardiologie</h3><p>EKG, Belastungstests, Beratung.</p></div>
<div class="card"><div class="icon">🧬</div><h3>Labordiagnostik</h3><p>Blutuntersuchungen und mehr.</p></div>
</div>
<div class="info-bar">
<div class="info"><div class="val">20+</div><div class="lbl">Jahre Erfahrung</div></div>
<div class="info"><div class="val">5.000+</div><div class="lbl">Patienten</div></div>
<div class="info"><div class="val">4.9★</div><div class="lbl">Google Bewertung</div></div>
</div></section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== EDUCATION =====
education: (p) => {
    const name = extractName(p) || 'LearnHub';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#fff;color:#1a1a2e}
.hero{min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;background:linear-gradient(135deg,#eff6ff,#fdf2f8)}
h1{font-size:clamp(36px,5vw,56px);font-weight:800;letter-spacing:-2px;line-height:1.1;margin-bottom:16px}
h1 span{color:#7c3aed}
.hero p{color:#666;font-size:17px;max-width:500px;margin:0 auto 32px}
.cta{display:inline-block;background:#7c3aed;color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px}
.stats{display:flex;gap:40px;justify-content:center;margin-top:48px;flex-wrap:wrap}
.stat{text-align:center}.stat .n{font-size:32px;font-weight:800;color:#7c3aed}.stat .l{font-size:13px;color:#888}
section{padding:80px 24px;max-width:1000px;margin:0 auto}
h2{font-size:28px;font-weight:800;text-align:center;margin-bottom:32px}
.courses{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
.course{border:1px solid #eee;border-radius:16px;overflow:hidden;transition:box-shadow 0.3s}
.course:hover{box-shadow:0 8px 24px rgba(0,0,0,0.06)}
.course-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:48px}
.ci1{background:linear-gradient(135deg,#ddd6fe,#c4b5fd)}.ci2{background:linear-gradient(135deg,#fce7f3,#fbcfe8)}
.ci3{background:linear-gradient(135deg,#cffafe,#a5f3fc)}
.course-body{padding:20px}
.course-body h3{font-size:16px;font-weight:700;margin-bottom:4px}
.course-body p{font-size:13px;color:#888;margin-bottom:12px}
.course-body .meta{display:flex;justify-content:space-between;font-size:12px}
.course-body .price{font-weight:700;color:#7c3aed}
footer{text-align:center;padding:40px;color:#ccc;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>Lerne alles.<br><span>Von überall.</span></h1><p>Online-Kurse von Experten. Lerne in deinem Tempo, wann immer du willst.</p><a href="#" class="cta">Kurse entdecken →</a>
<div class="stats"><div class="stat"><div class="n">50K+</div><div class="l">Studierende</div></div><div class="stat"><div class="n">200+</div><div class="l">Kurse</div></div><div class="stat"><div class="n">4.8★</div><div class="l">Bewertung</div></div></div>
</div></div>
<section><h2>Beliebte Kurse</h2><div class="courses">
<div class="course"><div class="course-img ci1">💻</div><div class="course-body"><h3>Web Development</h3><p>HTML, CSS, JavaScript — von Grund auf.</p><div class="meta"><span>12 Wochen</span><span class="price">€149</span></div></div></div>
<div class="course"><div class="course-img ci2">🎨</div><div class="course-body"><h3>UI/UX Design</h3><p>Figma, Prototyping, Design Thinking.</p><div class="meta"><span>8 Wochen</span><span class="price">€129</span></div></div></div>
<div class="course"><div class="course-img ci3">📊</div><div class="course-body"><h3>Data Science</h3><p>Python, Pandas, Machine Learning.</p><div class="meta"><span>16 Wochen</span><span class="price">€199</span></div></div></div>
</div></section>
<footer>© 2026 ${name}</footer></body></html>`;
},

// ===== MUSIC / BAND =====
music: (p) => {
    const name = extractName(p) || 'NOVA';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#000;color:#fff;overflow-x:hidden}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(to bottom,#0a0010,#000);position:relative}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(139,92,246,0.15),transparent 60%)}
.hero h1{font-size:clamp(60px,12vw,140px);font-weight:900;letter-spacing:-6px;line-height:0.9;background:linear-gradient(to bottom,#fff,#666);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{color:#555;font-size:16px;margin:20px 0 32px;letter-spacing:4px;text-transform:uppercase}
.btn-row{display:flex;gap:12px;justify-content:center}
.btn{padding:14px 28px;border-radius:99px;font-weight:600;font-size:14px;text-decoration:none;transition:all 0.3s}
.btn-w{background:#fff;color:#000}.btn-o{border:1px solid #333;color:#fff}
section{padding:80px 24px;max-width:800px;margin:0 auto}
.label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#444;margin-bottom:24px;text-align:center}
.tour{list-style:none}
.tour li{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid #111;font-size:15px}
.tour .date{color:#8b5cf6;font-weight:700;min-width:100px}.tour .venue{color:#888;flex:1;margin:0 16px}
.tour .tickets{color:#fff;text-decoration:none;font-weight:600;font-size:13px;border:1px solid #333;padding:6px 16px;border-radius:99px}
footer{text-align:center;padding:48px;color:#222;font-size:12px;letter-spacing:2px}
</style></head><body>
<div class="hero"><div><h1>${name.toUpperCase()}</h1><p>New Album Out Now</p><div class="btn-row"><a class="btn btn-w" href="#">Stream Now 🎵</a><a class="btn btn-o" href="#">Tour Dates</a></div></div></div>
<section><div class="label">Tour 2026</div><ul class="tour">
<li><span class="date">15. MAR</span><span class="venue">Berlin — Tempodrom</span><a class="tickets" href="#">Tickets</a></li>
<li><span class="date">22. MAR</span><span class="venue">München — Zenith</span><a class="tickets" href="#">Tickets</a></li>
<li><span class="date">05. APR</span><span class="venue">Hamburg — Docks</span><a class="tickets" href="#">Tickets</a></li>
<li><span class="date">12. APR</span><span class="venue">Köln — E-Werk</span><a class="tickets" href="#">Tickets</a></li>
</ul></section>
<footer>© 2026 ${name.toUpperCase()} — ALL RIGHTS RESERVED</footer></body></html>`;
},

// ===== LAW FIRM =====
law: (p) => {
    const name = extractName(p) || 'Kanzlei Weber & Partner';
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#fafafa;color:#1a1a2e}
.hero{min-height:70vh;display:flex;align-items:center;padding:80px 8vw;background:linear-gradient(135deg,#1a1a2e,#2d2b55);color:#fff}
.hero h1{font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.3}
.hero h1 span{color:#c9a96e}
.hero p{color:#8888aa;font-size:15px;margin:16px 0 28px;max-width:480px}
.cta{display:inline-block;background:#c9a96e;color:#1a1a2e;padding:14px 32px;text-decoration:none;font-weight:700;font-size:14px}
section{padding:64px 8vw;max-width:1000px;margin:0 auto}
h2{font-size:24px;font-weight:700;margin-bottom:24px}
.areas{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.area{background:#fff;border-left:3px solid #c9a96e;padding:24px;box-shadow:0 1px 8px rgba(0,0,0,0.04)}
.area h3{font-size:16px;font-weight:700;margin-bottom:6px}.area p{font-size:13px;color:#666;line-height:1.5}
.team{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:32px}
.member{text-align:center;background:#fff;padding:24px;border-radius:12px;box-shadow:0 1px 8px rgba(0,0,0,0.04)}
.member .avatar{width:80px;height:80px;border-radius:50%;background:#1a1a2e;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:32px;color:#c9a96e}
.member h3{font-size:15px;font-weight:700}.member p{font-size:12px;color:#888}
footer{text-align:center;padding:40px;color:#ccc;font-size:12px}
</style></head><body>
<div class="hero"><div><h1>Kompetente Rechtsberatung.<br><span>Auf Ihrer Seite.</span></h1><p>Seit über 20 Jahren vertreten wir Ihre Interessen — zuverlässig und diskret.</p><a href="#" class="cta">Erstberatung buchen →</a></div></div>
<section><h2>Rechtsgebiete</h2><div class="areas">
<div class="area"><h3>Arbeitsrecht</h3><p>Kündigungsschutz, Verträge, Abfindungen.</p></div>
<div class="area"><h3>Familienrecht</h3><p>Scheidung, Unterhalt, Sorgerecht.</p></div>
<div class="area"><h3>Wirtschaftsrecht</h3><p>Vertragsrecht, Gesellschaftsrecht, M&A.</p></div>
<div class="area"><h3>Strafrecht</h3><p>Strafverteidigung und Nebenklage.</p></div>
</div></section>
<section><h2>Unser Team</h2><div class="team">
<div class="member"><div class="avatar">⚖️</div><h3>Dr. Weber</h3><p>Seniorpartner</p></div>
<div class="member"><div class="avatar">⚖️</div><h3>K. Müller</h3><p>Arbeitsrecht</p></div>
<div class="member"><div class="avatar">⚖️</div><h3>S. Fischer</h3><p>Familienrecht</p></div>
</div></section>
<footer>© 2026 ${name}</footer></body></html>`;
},

}; // end templates

// ===== HELPERS =====
function extractName(prompt) {
    // Try to find quoted names or names after "für" / "for"
    const q = prompt.match(/["'„"]([^"'""]+)["'""]/);
    if (q) return q[1];
    const fur = prompt.match(/(?:für|for|namens?|called?|named?)\s+(?:mein[en]?\s+)?(?:\w+\s+)?["']?([A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ&][a-zäöüß&]*)*)/i);
    if (fur) return fur[1];
    return null;
}

function extractColors(prompt) {
    const p = prompt.toLowerCase();
    if (p.match(/rot|red/)) return {primary:'#e63946',dark:'#0a0a0a',accent:'#ff6b6b'};
    if (p.match(/blau|blue/)) return {primary:'#2b7de9',dark:'#0a0a14',accent:'#60a5fa'};
    if (p.match(/grün|green/)) return {primary:'#16a34a',dark:'#0a0f0a',accent:'#4ade80'};
    if (p.match(/lila|purple|violet/)) return {primary:'#7c3aed',dark:'#0a0814',accent:'#a78bfa'};
    if (p.match(/pink|rosa/)) return {primary:'#ec4899',dark:'#0f0a0d',accent:'#f472b6'};
    if (p.match(/gold|gelb|yellow/)) return {primary:'#c9a96e',dark:'#0c0c0c',accent:'#fbbf24'};
    if (p.match(/orange/)) return {primary:'#f97316',dark:'#0f0a05',accent:'#fb923c'};
    if (p.match(/türkis|teal|cyan/)) return {primary:'#06b6d4',dark:'#050f14',accent:'#22d3ee'};
    return null;
}

function getExampleForPrompt(prompt) {
    const p = prompt.toLowerCase();
    
    // Match to templates
    if (p.match(/fitness|gym|sport|training|kraft|studio/)) return templates.fitness(prompt);
    if (p.match(/restaurant|essen|food|küche|bistro|speise|gastro/)) return templates.restaurant(prompt);
    if (p.match(/portfolio|kreativ|designer|fotograf|künstler|freelanc|persön/)) return templates.portfolio(prompt);
    if (p.match(/saas|app|startup|platform|software|tool|dashboard|analytics/)) return templates.saas(prompt);
    if (p.match(/immobilie|real.?estate|haus|wohnung|makler|property/)) return templates.realestate(prompt);
    if (p.match(/beauty|salon|kosmetik|friseur|nail|spa|wellness|massage/)) return templates.beauty(prompt);
    if (p.match(/agentur|agency|studio|kreativ|marketing|brand/)) return templates.agency(prompt);
    if (p.match(/shop|store|ecommerce|produkt|verkauf|online.?shop|laden/)) return templates.shop(prompt);
    if (p.match(/café|cafe|coffee|kaffee|bäcker|bakery/)) return templates.cafe(prompt);
    if (p.match(/arzt|praxis|doctor|medical|gesundheit|klinik|dental|zahnarzt|therapeut/)) return templates.medical(prompt);
    if (p.match(/kurs|schule|education|learn|akademie|training|coach|seminar|nachhilfe/)) return templates.education(prompt);
    if (p.match(/musik|band|artist|album|song|concert|tour|dj/)) return templates.music(prompt);
    if (p.match(/anwalt|kanzlei|recht|law|jurist|notar|rechtsanwalt/)) return templates.law(prompt);
    if (p.match(/bar|cocktail|club|lounge|nachtleben/)) return templates.restaurant(prompt);
    
    // Fallback — rotate through templates based on prompt hash
    const hash = prompt.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const fallbacks = [templates.saas, templates.agency, templates.shop, templates.education, templates.beauty, templates.realestate];
    return fallbacks[hash % fallbacks.length](prompt);
}
