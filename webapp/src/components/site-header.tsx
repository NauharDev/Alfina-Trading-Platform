"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export function SiteHeader() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevents NextAuth from handling the redirect
    router.push("/"); // Manually redirect to the homepage
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Alfina
        </Link>
        <div className="ml-8 hidden space-x-6 md:flex">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
          <Link href="/manage-subscription" className="text-gray-600 hover:text-gray-900">
            Manage Subscription
          </Link>
        </div>
      </div>

      <div className="space-x-4">
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
            <Button
            className="text-white"
            onClick={handleSignOut}
            >
            Sign Out
            </Button>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" id="headerLoginButton">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="text-white">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
