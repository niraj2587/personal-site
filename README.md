# personal-site

My personal site at **https://nirajjd.com** — React + Vite + Tailwind, hosted on Vercel.

## Stack

- React 18 + TypeScript
- Vite 5 (build tool + dev server)
- Tailwind CSS 3
- Deployed via Vercel, domain managed at Squarespace

## Local development

```bash
npm install
npm run dev      # http://localhost:5173 with HMR
npm run build    # tsc + vite build → dist/
npm run preview  # serve the prod build locally
```

## Hosting — Vercel

Project is wired to GitHub: every push to `main` auto-builds and deploys.

- **Host:** Vercel (free tier)
- **Repo connected:** `niraj2587/personal-site`
- **Production branch:** `main`
- **Framework preset:** Vite (auto-detected)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

Preview deployments: every non-`main` branch and PR gets its own `*.vercel.app` URL.

### Custom domain

`nirajjd.com` is registered at Squarespace (registrar only — no Squarespace site
or builder subscription). DNS points at Vercel:

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | `76.76.21.21`          |
| CNAME | www  | `cname.vercel-dns.com` |

(Confirm exact values in Vercel → Project → Settings → Domains. They occasionally update the apex IP.)

TLS cert is issued and renewed automatically by Vercel. If the cert ever shows
"Invalid Configuration", check that the DNS records above still match what
Vercel shows on the Domains page.

## Where things live

- `src/data/resume.ts` — single source of truth for content (experience, skills, projects, achievements, education)
- `src/components/` — one file per section (Hero, About, Experience, Skills, Projects, Achievements, Contact, Footer, Nav)
- `index.html` — meta tags, OG / Twitter cards, JSON-LD person schema
- `public/` — static assets served at site root
  - `public/resume.pdf` — linked from Hero, Nav, Contact, Footer

## Updating the resume PDF

The site links to `/resume.pdf`. Source of truth is the `.docx` in the parent
directory (`../Niraj - Resume v2.docx`). To regenerate:

1. Edit the docx in Pages or Word
2. Export as PDF, replacing `public/resume.pdf`
3. Commit and push — Vercel redeploys

## SSH / git setup

This repo is cloned via the `github-personal` SSH host alias (see
`~/.ssh/config`). The dedicated key is `~/.ssh/id_ed25519_personal`. The remote
URL is `git@github-personal:niraj2587/personal-site.git`, so push/pull
automatically uses the right identity even though the same machine has another
key for work.

Per-repo git identity is set:

```
user.email = niraj2587@gmail.com
user.name  = Niraj Desai
```

## Asset placeholders to fill in eventually

- `public/favicon.svg` — referenced by `index.html`, currently 404s
- `public/apple-touch-icon.png` (180×180) — same
- `public/og-image.png` (1200×630) — for LinkedIn / Slack link unfurls

The site renders fine without these; missing assets just 404 silently.
