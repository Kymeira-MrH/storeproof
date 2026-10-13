import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Only the authenticated surfaces — keeps the public funnel (/, /api/scan) overhead-free.
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/auth/:path*"],
};
