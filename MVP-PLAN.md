# MVP-Plan — "Fast Food Dev" (Arbeitstitel)

## Konzept
Vollautomatische IT-Dienstleistungsplattform. Kunde wählt Kategorie, schreibt einen Prompt, kriegt in Minuten sein Produkt. Preis wird nach Aufwand berechnet. Kein Mensch involviert.

## Ablauf (Kundenreise)
1. Kunde besucht Website
2. Wählt Kategorie (Website, Bot, Bugfix, Automatisierung, etc.)
3. Sieht **Anleitung** wie der Prompt geschrieben werden muss (Beispiele, Pflichtfelder)
4. Schreibt EINEN Prompt mit allen Anforderungen
5. System bestätigt Eingang → KI arbeitet
6. Kunde kriegt Ergebnis in Minuten (Preview + Download/Link)
7. Bis zu **3 kostenlose Revisionen** (jeweils per Prompt)
8. Wenn zufrieden → **automatische Preisberechnung** (API-Kosten × Marge)
9. Kunde zahlt (Stripe) → kriegt finales Produkt

## Kategorien (V1)
| Kategorie | Beschreibung | Geschätzte Lieferzeit |
|---|---|---|
| 🌐 Website | Landing Pages, Portfolios, einfache Shops | 5-15 Min |
| 🤖 Bot | Discord, Telegram, WhatsApp Bots | 10-20 Min |
| 🔧 Bugfix | Kunde schickt Code + Fehlerbeschreibung | 5-10 Min |
| ⚡ Automatisierung | Scripts, Workflows, Integrationen | 10-30 Min |

## Preismodell
- **Kein Festpreis** — dynamisch nach Aufwand
- Formel: `(API-Kosten + Compute) × Marge + Basisgebühr`
- Beispiel: Website mit 1 Revision = ~$3 API → Kunde zahlt ~€15-25
- Marge: 5x-10x auf API-Kosten (Branchenstandard für AI-SaaS)
- Basisgebühr pro Kategorie (deckt Infrastruktur)
- **Transparent:** Kunde sieht Aufschlüsselung vor dem Zahlen

## Tech-Stack (MVP)
- **Frontend:** Next.js oder statisches HTML (schnell, SEO)
- **Backend:** Node.js API
- **KI-Engine:** Claude API (Sonnet für Standard, Opus für Komplex)
- **Code-Execution:** Sandboxed Container (E2B, CodeSandbox API, oder eigene Docker)
- **Hosting für Kunden-Websites:** Vercel/Netlify Auto-Deploy ODER ZIP-Download
- **Payment:** Stripe (Pay-per-use, kein Abo)
- **Queue:** Redis/BullMQ für Auftragsmanagement

## Kosten für uns (Aufbau)
| Posten | Kosten |
|---|---|
| Domain | ~€12/Jahr |
| Hosting (Vercel) | Free Tier reicht für MVP |
| Claude API | Pay-per-use (~$3/Sonnet-Auftrag) |
| Stripe | 1.4% + €0.25 pro Transaktion |
| Sandbox (E2B) | ~$0.10/Ausführung |
| **Gesamt Fixkosten** | **~€15/Monat** |

## Risiken & Lösungen
| Risiko | Lösung |
|---|---|
| KI liefert schlechte Qualität | Automatische QA-Checks vor Auslieferung |
| Kunde missbraucht Revisionen | Max 3, danach neuer Auftrag |
| Zu wenig Kunden | Marketing über Social Media, Reddit, ProductHunt |
| Konkurrenz (Bolt, Lovable) | Breiter (nicht nur Websites) + günstiger (kein Abo) |
| Rechtlich (Haftung) | AGB: "as-is", keine Garantie auf Fehlerfreiheit |

## Differenzierung vs. Konkurrenz
- **Bolt.new:** Nur Websites, $20/Monat Abo → Wir: breiter, pay-per-use
- **Fiverr:** Menschen, dauert Tage, unvorhersehbar → Wir: Minuten, automatisch
- **Upwork:** Teuer, langwierig → Wir: sofort, transparent

## Roadmap
### Phase 1 — MVP (2-4 Wochen)
- Landing Page mit Kategorie-Auswahl
- Prompt-Interface mit Anleitung
- Website-Generator (erste Kategorie)
- Stripe Integration
- Basis-QA (automatisch)

### Phase 2 — Erweiterung (Monat 2-3)
- Bots & Automatisierung als Kategorien
- Bugfix-Service (Code-Upload)
- Kunden-Dashboard (Bestellhistorie)
- Bewertungssystem

### Phase 3 — Skalierung (Monat 4+)
- API für Entwickler
- White-Label für Agenturen
- Affiliate-Programm
- Mobile App
