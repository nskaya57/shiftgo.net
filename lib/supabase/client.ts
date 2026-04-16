"use client";

import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Set them in Vercel → Settings → Environment Variables (and .env.local for dev)."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Implicit (not PKCE) so email/magic-link confirmations work when the
      // link is opened in a different browser context than signup (e.g. Gmail
      // app → Safari). PKCE requires the code_verifier to live in the same
      // browser storage — on mobile that's almost never the case for email
      // flows. Tokens still travel via URL fragment (never in server logs).
      flowType: "implicit",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
