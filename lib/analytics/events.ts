export type AnalyticsEvent =
  | "project_open"
  | "showreel_play"
  | "game_start"
  | "game_complete"
  | "ai_lab_used"
  | "resume_download"
  | "contact_submit"
  | "creative_mode"
  | "dev_mode";

/** Privacy-conscious stub: logs in dev, no PII, no cookies. Wire a provider in v2. */
export function track(event: AnalyticsEvent, data?: Record<string, string>) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, data ?? {});
  }
}
