# Deploy — Sriram V Portfolio

```text
GitHub → Vercel → Custom Domain → Analytics
```

## 1. Push

```powershell
git init; git add -A; git commit -m "feat: editorial black/red/ivory portfolio"
gh repo create developer-portfolio --public --source=. --push
```

## 2. Vercel

- Import repo at vercel.com → framework preset Next.js → deploy.
- Preview deployments on every PR; production on `main`.

## 3. Environment

| Var | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL for sitemap/OG |
| `OPENAI_API_KEY` | deferred | AI Lab stays mocked until set |
| `GITHUB_TOKEN` | deferred | GitHub Lab stays mocked until set |
| `RESEND_API_KEY` | for contact delivery | Server-only key from Resend |
| `CONTACT_FROM_EMAIL` | for contact delivery | Sender address verified in Resend, e.g. `Sriram Portfolio <hello@your-verified-domain.com>` |
| `DATABASE_URL` | deferred | No DB in v1 |

Only `NEXT_PUBLIC_*` reaches the browser. Phone number stays out of SEO metadata
and API responses (`mailto:`/`tel:` links only).

### Contact delivery

The recipient is **sriram.efx@gmail.com**, fixed in `app/api/contact/route.ts`.
The visitor’s email is used as Reply-To, not as the sender.

1. Create a Resend API key and verify a sending domain in your Resend account.
2. Add `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to `.env.local` for local testing,
   and to the production host's environment settings for deployment.
3. Redeploy or restart the server after changing environment variables.
4. Send a test from the contact form and check your inbox and spam folder.

The Resend `onboarding@resend.dev` sender is restricted to the email associated
with the Resend account. Use a verified sender for normal production delivery.
Do not put an API key in a `NEXT_PUBLIC_*` variable or commit `.env.local`.

Without both settings, the form returns an honest unavailable message and keeps
the visitor's text. It never displays a mock delivery success. API success means
the provider accepted the email; final delivery can be checked in Resend's logs.

Run `npm run test:contact` to test recipient/reply-to handling, validation,
configuration failures, provider failures and throttling with a mocked provider.
The test does not send real email.

## 4. Post-deploy

- `npm run build` green locally first (31+ routes).
- Lighthouse: LCP < 2.5s (hero portrait `priority`), CLS < 0.1, INP < 200ms.
- 3D + games lazy-loaded; verify 390px touch path + reduced-motion fallback.
- Optional: Vercel Analytics / error monitoring hookup.
