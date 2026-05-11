# personal-site

My personal site at **https://nirajjd.com** — React + Vite + Tailwind, hosted on GitHub Pages.

## Stack

- React 18 + TypeScript
- Vite 5 (build tool + dev server)
- Tailwind CSS 3
- Deployed via GitHub Pages (Actions workflow), domain DNS managed at Cloudflare

## Local development

```bash
npm install
npm run dev      # http://localhost:5173 with HMR
npm run build    # tsc + vite build → dist/
npm run preview  # serve the prod build locally
```

## Hosting — GitHub Pages

Project is wired to GitHub Actions: every push to `main` auto-builds and deploys
via `.github/workflows/deploy.yml`.

- **Host:** GitHub Pages (free)
- **Repo:** `niraj2587/personal-site`
- **Production branch:** `main`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **CNAME file:** `CNAME` (contains `nirajjd.com`)

### Custom domain

`nirajjd.com` is registered at Squarespace (registrar only). Nameservers point
to Cloudflare (used as DNS-only, no proxy needed). DNS records in Cloudflare:

| Type  | Host | Value                    | Proxy   |
|-------|------|--------------------------|---------|
| A     | @    | `185.199.108.153`        | DNS only|
| A     | @    | `185.199.109.153`        | DNS only|
| A     | @    | `185.199.110.153`        | DNS only|
| A     | @    | `185.199.111.153`        | DNS only|
| CNAME | www  | `niraj2587.github.io`    | DNS only|

These are GitHub Pages' IPs. Records must be **DNS only** (grey cloud), not
proxied — GitHub issues and renews the TLS cert itself.

Enable the custom domain in GitHub: Repo → Settings → Pages → Custom domain →
enter `nirajjd.com` → Save. GitHub will verify DNS and issue a cert.

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
3. Commit and push — GitHub Pages redeploys

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
