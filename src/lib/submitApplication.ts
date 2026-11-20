export type ApplicationData = Record<string, string | string[]>;

// TODO: send the application somewhere real (for example a Next.js route handler at
// /api/submit-application that emails the team and/or stores it in Supabase).
// Until then this only simulates a successful submit: NOTHING is sent or saved.
// Do not point this at another organization's endpoint.
export async function sendApplication(data: ApplicationData): Promise<void> {
  console.debug(`[application] collected ${Object.keys(data).length} fields (not sent anywhere yet)`);
  await new Promise((resolve) => setTimeout(resolve, 600));
}
