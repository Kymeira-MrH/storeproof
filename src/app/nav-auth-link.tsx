"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

// Keeps marketing pages static while making the nav tie into the app: a
// logged-in visitor sees "Dashboard", everyone else sees "Sign in".
export function NavAuthLink({ className }: { className?: string }) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (active) setAuthed(Boolean(data.user));
      })
      .catch(() => {
        if (active) setAuthed(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (authed) {
    return (
      <a className={className} href="/dashboard">
        Dashboard
      </a>
    );
  }
  return (
    <a className={className} href="/login">
      Sign in
    </a>
  );
}
