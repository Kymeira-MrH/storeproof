import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Request a password reset link for your StoreProof account.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/forgot-password" },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
