/** Use the production domain during Vercel builds, never localhost metadata. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const deployed = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return deployed ? `https://${deployed}` : "http://localhost:4000";
}
