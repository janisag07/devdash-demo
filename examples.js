// Pre-built example websites that render in iframe
const exampleSites = {
  fitness: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0a0a0a;color:#fff}
.hero{min-height:100vh;background:linear-gradient(135deg,rgba(220,20,20,0.3),transparent),url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80') center/cover;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px}
.hero-content h1{font-size:clamp(32px,6vw,72px);font-weight:900;text-transform:uppercase;letter-spacing:-2px;text-shadow:0 4px 30px rgba(0,0,0,0.5)}
.hero-content h1 span{color:#ff2020}
.hero-content p{font-size:18px;opacity:0.8;margin:16px 0 32px;max-width:500px}
.cta{display:inline-block;background:#ff2020;color:#fff;padding:16px 40px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;transition:transform 0.3s}
.cta:hover{transform:scale(1.05)}
section{padding:80px 24px;max-width:1000px;margin:0 auto}
h2{font-size:36px;font-weight:800;margin-bottom:32px;text-align:center}
h2 span{color:#ff2020}
.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.plan{background:#141414;border:1px solid #222;border-radius:16px;padding:32px;text-align:center;transition:transform 0.3s,border-color 0.3s}
.plan:hover{transform:translateY(-4px);border-color:#ff2020}
.plan.featured{border-color:#ff2020;background:linear-gradient(to bottom,rgba(255,32,32,0.1),transparent)}
.plan-price{font-size:48px;font-weight:900;margin:16px 0}
.plan-price span{font-size:16px;opacity:0.5;font-weight:400}
.plan-name{font-size:14px;text-transform:uppercase;letter-spacing:2px;color:#ff2020}
.plan ul{list-style:none;margin:24px 0;text-align:left}
.plan li{padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:14px;color:#aaa}
.plan li::before{content:'✓ ';color:#ff2020}
.plan .cta{display:block;margin-top:16px;padding:12px;font-size:14px}
.trainers{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px}
.trainer{text-align:center}
.trainer-img{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#ff2020,#ff6b00);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:48px}
.trainer h3{font-size:18px;margin-bottom:4px}
.trainer p{color:#888;font-size:14px}
.contact{background:#141414;border-radius:16px;padding:40px;max-width:600px;margin:0 auto}
input,textarea{width:100%;background:#0a0a0a;border:1px solid #222;border-radius:8px;padding:14px;color:#fff;font-size:14px;margin-bottom:12px;outline:none}
input:focus,textarea:focus{border-color:#ff2020}
textarea{min-height:100px;resize:vertical}
.submit{width:100%;background:#ff2020;color:#fff;border:none;padding:16px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer}
footer{text-align:center;padding:40px;border-top:1px solid #151515;color:#555;font-size:13px}
</style></head><body>
<div class="hero"><div class="hero-content"><h1>PUSH YOUR <span>LIMITS</span></h1><p>Werde die beste Version von dir selbst. Modernste Geräte, erfahrene Trainer, unbegrenzte Motivation.</p><a href="#plans" class="cta">JETZT STARTEN →</a></div></div>
<section id="plans"><h2>Unsere <span>Pakete</span></h2><div class="plans">
<div class="plan"><div class="plan-name">Starter</div><div class="plan-price">29€<span>/Monat</span></div><ul><li>Zugang Mo-Fr 8-20 Uhr</li><li>Gerätetraining</li><li>Umkleide & Duschen</li><li>Kostenlose Wasserflatrate</li></ul><a href="#" class="cta" style="background:transparent;border:1px solid #ff2020;color:#ff2020">Auswählen</a></div>
<div class="plan featured"><div class="plan-name">Pro</div><div class="plan-price">49€<span>/Monat</span></div><ul><li>24/7 Zugang</li><li>Alle Kurse inklusive</li><li>1x Personal Training/Monat</li><li>Sauna & Wellness</li><li>Ernährungsplan</li></ul><a href="#" class="cta">Auswählen</a></div>
<div class="plan"><div class="plan-name">Elite</div><div class="plan-price">89€<span>/Monat</span></div><ul><li>24/7 VIP Zugang</li><li>Unlimited Personal Training</li><li>Individuelle Ernährungsberatung</li><li>Recovery Zone</li><li>Gästekarte inklusive</li></ul><a href="#" class="cta" style="background:transparent;border:1px solid #ff2020;color:#ff2020">Auswählen</a></div>
</div></section>
<section><h2>Unsere <span>Trainer</span></h2><div class="trainers">
<div class="trainer"><div class="trainer-img">💪</div><h3>Max Weber</h3><p>Kraft & Conditioning</p></div>
<div class="trainer"><div class="trainer-img">🥊</div><h3>Sarah Klein</h3><p>Boxing & HIIT</p></div>
<div class="trainer"><div class="trainer-img">🧘</div><h3>Lisa Chen</h3><p>Yoga & Mobility</p></div>
</div></section>
<section><h2>Kontakt</h2><div class="contact"><input placeholder="Name"><input placeholder="E-Mail"><textarea placeholder="Deine Nachricht..."></textarea><button class="submit">NACHRICHT SENDEN</button></div></section>
<footer>© 2026 PowerGym — All rights reserved.</footer>
</body></html>`,

  restaurant: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Georgia','Times New Roman',serif;background:#0c0c0c;color:#fff}
.hero{min-height:100vh;background:linear-gradient(to bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80') center/cover;display:flex;align-items:center;justify-content:center;text-align:center}
.hero h1{font-size:clamp(36px,6vw,64px);font-weight:400;letter-spacing:8px;text-transform:uppercase}
.hero .line{width:60px;height:1px;background:#c8a97e;margin:24px auto}
.hero p{font-size:16px;color:#c8a97e;letter-spacing:4px;text-transform:uppercase}
.hero .cta{display:inline-block;margin-top:32px;border:1px solid #c8a97e;color:#c8a97e;padding:14px 40px;text-decoration:none;letter-spacing:3px;font-size:13px;text-transform:uppercase;transition:all 0.3s}
.hero .cta:hover{background:#c8a97e;color:#0c0c0c}
section{padding:80px 24px;max-width:900px;margin:0 auto;text-align:center}
h2{font-size:36px;font-weight:400;letter-spacing:4px;margin-bottom:8px}
.gold{color:#c8a97e}
.divider{width:40px;height:1px;background:#c8a97e;margin:16px auto 32px}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;text-align:left}
.menu-item{padding-bottom:16px;border-bottom:1px solid #1a1a1a}
.menu-item-header{display:flex;justify-content:space-between;margin-bottom:4px}
.menu-item h3{font-size:18px;font-weight:400}
.menu-item .price{color:#c8a97e;font-size:18px}
.menu-item p{color:#666;font-size:14px;font-style:italic}
.hours{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
.hours div{background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:24px}
.hours h3{color:#c8a97e;font-size:14px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
.hours p{font-size:16px}
.reservation{max-width:500px;margin:0 auto}
input,textarea,select{width:100%;background:#111;border:1px solid #222;padding:14px;color:#fff;font-family:inherit;font-size:14px;margin-bottom:12px;outline:none}
input:focus,textarea:focus{border-color:#c8a97e}
.reserve-btn{width:100%;background:#c8a97e;color:#0c0c0c;border:none;padding:16px;font-family:inherit;font-size:14px;letter-spacing:3px;text-transform:uppercase;cursor:pointer}
footer{text-align:center;padding:40px;color:#333;font-size:13px;letter-spacing:2px}
</style></head><body>
<div class="hero"><div><p>Fine Dining Experience</p><div class="line"></div><h1>La Maison</h1><div class="line"></div><a href="#menu" class="cta">Speisekarte entdecken</a></div></div>
<section id="menu"><h2>Unsere <span class="gold">Karte</span></h2><div class="divider"></div><div class="menu-grid">
<div class="menu-item"><div class="menu-item-header"><h3>Tatar vom Rind</h3><span class="price">€18</span></div><p>Klassisch angerichtet mit Eigelb, Kapern und Croutons</p></div>
<div class="menu-item"><div class="menu-item-header"><h3>Trüffel Risotto</h3><span class="price">€24</span></div><p>Arborio Reis, schwarzer Trüffel, Parmigiano 36 Monate</p></div>
<div class="menu-item"><div class="menu-item-header"><h3>Wagyu Filet</h3><span class="price">€52</span></div><p>A5 Wagyu, Rotwein-Jus, saisonales Gemüse</p></div>
<div class="menu-item"><div class="menu-item-header"><h3>Wolfsbarsch</h3><span class="price">€34</span></div><p>Gegrillter Wolfsbarsch, Fenchel, Zitrus-Beurre Blanc</p></div>
<div class="menu-item"><div class="menu-item-header"><h3>Crème Brûlée</h3><span class="price">€12</span></div><p>Tahiti-Vanille, karamellisiert, frische Beeren</p></div>
<div class="menu-item"><div class="menu-item-header"><h3>Cheese Selection</h3><span class="price">€16</span></div><p>Auswahl französischer Käse, Feigensenf, Walnussbrot</p></div>
</div></section>
<section><h2>Öffnungszeiten</h2><div class="divider"></div><div class="hours">
<div><h3>Montag – Freitag</h3><p>12:00 – 14:30</p><p>18:00 – 23:00</p></div>
<div><h3>Samstag</h3><p>18:00 – 23:30</p></div>
<div><h3>Sonntag</h3><p>12:00 – 15:00</p><p style="color:#666;font-size:13px">Brunch Special</p></div>
</div></section>
<section><h2>Reservierung</h2><div class="divider"></div><div class="reservation"><input placeholder="Name"><input type="email" placeholder="E-Mail"><input type="date"><select><option>2 Personen</option><option>3 Personen</option><option>4 Personen</option><option>5+ Personen</option></select><textarea placeholder="Besondere Wünsche..."></textarea><button class="reserve-btn">Tisch reservieren</button></div></section>
<footer>© 2026 La Maison — Friedrichstraße 42, Berlin</footer>
</body></html>`,

  portfolio: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#000;color:#fff;overflow-x:hidden}
.cursor{position:fixed;width:20px;height:20px;border:1px solid rgba(255,255,255,0.3);border-radius:50%;pointer-events:none;z-index:9999;transition:transform 0.1s}
nav{position:fixed;top:0;width:100%;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;z-index:100;mix-blend-mode:difference}
nav a{color:#fff;text-decoration:none;font-size:13px;letter-spacing:1px}
.hero{height:100vh;display:flex;align-items:center;padding:0 10vw}
.hero h1{font-size:clamp(48px,8vw,120px);font-weight:200;line-height:1;letter-spacing:-4px}
.hero h1 strong{font-weight:800;background:linear-gradient(135deg,#00f0ff,#7b2ff7,#ff006e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;color:#555;margin-top:24px;max-width:400px}
.scroll-hint{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);font-size:12px;color:#333;letter-spacing:4px;text-transform:uppercase;animation:bob 2s infinite}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
section{padding:120px 10vw}
.section-label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#555;margin-bottom:40px}
.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px}
.project{position:relative;aspect-ratio:4/3;border-radius:16px;overflow:hidden;cursor:pointer;background:#111}
.project::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.8),transparent);opacity:0;transition:opacity 0.4s}
.project:hover::after{opacity:1}
.project img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s}
.project:hover img{transform:scale(1.05)}
.project-info{position:absolute;bottom:24px;left:24px;z-index:1;opacity:0;transform:translateY(10px);transition:all 0.4s}
.project:hover .project-info{opacity:1;transform:translateY(0)}
.project-info h3{font-size:20px;font-weight:600}
.project-info p{color:#888;font-size:13px;margin-top:4px}
.p-color-1{background:linear-gradient(135deg,#667eea,#764ba2)}
.p-color-2{background:linear-gradient(135deg,#f093fb,#f5576c)}
.p-color-3{background:linear-gradient(135deg,#4facfe,#00f2fe)}
.p-color-4{background:linear-gradient(135deg,#43e97b,#38f9d7)}
.skills-grid{display:flex;flex-wrap:wrap;gap:12px}
.skill-tag{padding:8px 20px;border:1px solid #222;border-radius:99px;font-size:13px;color:#888;transition:all 0.3s}
.skill-tag:hover{border-color:#fff;color:#fff}
.contact-section{text-align:center}
.contact-section h2{font-size:clamp(32px,5vw,64px);font-weight:200;margin-bottom:16px}
.contact-section h2 strong{font-weight:800}
.contact-link{display:inline-block;margin-top:24px;color:#fff;font-size:18px;text-decoration:none;border-bottom:1px solid #333;padding-bottom:4px;transition:border-color 0.3s}
.contact-link:hover{border-color:#fff}
footer{text-align:center;padding:40px;color:#333;font-size:12px;letter-spacing:2px}
</style></head><body>
<nav><a href="#">ALEX MEYER</a><a href="#contact">KONTAKT</a></nav>
<section class="hero"><div><h1>Creative<br><strong>Developer</strong></h1><p>Ich gestalte digitale Erlebnisse die begeistern. UI/UX Design, Frontend Development, Creative Coding.</p></div><div class="scroll-hint">Scroll ↓</div></section>
<section><div class="section-label">Ausgewählte Projekte</div><div class="projects">
<div class="project"><div class="p-color-1" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px">🎨</div><div class="project-info"><h3>Arthaus Gallery</h3><p>Digitale Kunstgalerie — React, Three.js</p></div></div>
<div class="project"><div class="p-color-2" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px">🎵</div><div class="project-info"><h3>SoundWave</h3><p>Musik-Streaming UI — Next.js, Framer</p></div></div>
<div class="project"><div class="p-color-3" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px">🏗️</div><div class="project-info"><h3>ArchVision</h3><p>Architektur Portfolio — GSAP, WebGL</p></div></div>
<div class="project"><div class="p-color-4" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px">🛍️</div><div class="project-info"><h3>Luxe Store</h3><p>E-Commerce Redesign — Shopify, Liquid</p></div></div>
</div></section>
<section><div class="section-label">Skills</div><div class="skills-grid">
<span class="skill-tag">React</span><span class="skill-tag">Next.js</span><span class="skill-tag">TypeScript</span><span class="skill-tag">Three.js</span><span class="skill-tag">GSAP</span><span class="skill-tag">Figma</span><span class="skill-tag">Node.js</span><span class="skill-tag">Python</span><span class="skill-tag">Tailwind</span><span class="skill-tag">Framer Motion</span>
</div></section>
<section class="contact-section" id="contact"><h2>Let's work<br><strong>together.</strong></h2><a href="mailto:hello@alexmeyer.dev" class="contact-link">hello@alexmeyer.dev →</a></section>
<footer>© 2026 ALEX MEYER</footer>
</body></html>`,

  default: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#0a0a0a;color:#fff}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;background:radial-gradient(ellipse at 50% 50%,rgba(99,102,241,0.15),transparent 70%)}
h1{font-size:clamp(36px,6vw,64px);font-weight:800;line-height:1.1;margin-bottom:16px}
h1 span{background:linear-gradient(135deg,#6366f1,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
p{color:#888;font-size:18px;max-width:500px;margin:0 auto 32px}
.btn{display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;transition:transform 0.2s}
.btn:hover{transform:translateY(-2px)}
section{padding:80px 24px;max-width:1000px;margin:0 auto}
h2{font-size:36px;font-weight:800;margin-bottom:32px;text-align:center}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.card{background:#141414;border:1px solid #222;border-radius:16px;padding:32px;transition:border-color 0.3s}
.card:hover{border-color:#6366f1}
.card h3{font-size:20px;margin-bottom:8px}
.card p{color:#666;font-size:14px}
.card .icon{font-size:32px;margin-bottom:12px}
footer{text-align:center;padding:40px;color:#444;font-size:13px}
</style></head><body>
<div class="hero"><div><h1>Deine Idee.<br><span>Unsere Lösung.</span></h1><p>Wir bauen was du brauchst — schnell, modern und auf den Punkt.</p><a href="#features" class="btn">Mehr erfahren →</a></div></div>
<section id="features"><h2>Was wir bieten</h2><div class="grid">
<div class="card"><div class="icon">🚀</div><h3>Schnell</h3><p>Von der Idee zum fertigen Produkt in Rekordzeit.</p></div>
<div class="card"><div class="icon">🎨</div><h3>Modern</h3><p>Aktuelle Technologien und zeitgemäßes Design.</p></div>
<div class="card"><div class="icon">💡</div><h3>Smart</h3><p>Durchdachte Lösungen die wirklich funktionieren.</p></div>
</div></section>
<footer>© 2026 — Erstellt mit DevDash</footer>
</body></html>`
};

function getExampleForPrompt(prompt) {
  const p = prompt.toLowerCase();
  if (p.match(/fitness|gym|sport|training|kraft/)) return exampleSites.fitness;
  if (p.match(/restaurant|essen|food|küche|bistro|café|bar|speise/)) return exampleSites.restaurant;
  if (p.match(/portfolio|kreativ|designer|fotograf|künstler|freelanc/)) return exampleSites.portfolio;
  return exampleSites.default;
}
