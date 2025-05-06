"use client" // ensure it is a client component

import { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth" // firebase hook  to handle login
import { auth } from '@/app/firebase/config' // import the firebase API's auth instance

import { signIn } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

import sidePanel from "@/assets/images/side_panel.png";

export default function LoginPage() {
  {/* React state hooks that track the user input: email and password */ }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  {/* Firebase authentication hook relevant to handling signin */ }
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  {/* Defining the Login handler function that is triggered on form submission */ }
  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Ensure page isn't reloaded by default

    if (!email || !password) return;

    try {
      const userCredentials = await signInWithEmailAndPassword(email, password);

      // Verify if authentication is successful
      if (userCredentials?.user) {
        // Successful login - get Firebase ID token
        console.log({ userCredentials });
        const idToken = await userCredentials.user.getIdToken();

        // Pass the token to NextAuth for session creation
        const res = await fetch("/api/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
          credentials: 'include'
        });

        if (res.ok) {
          // Reset input fields upon successful login completion
          setEmail("");
          setPassword("");

          // Redirect user to dashboard after login
          window.location.href = "/dashboard" // Reload page to get access to newly set cookies
        } else {
          throw new Error("Failed to create session. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Left Section */}
      <div className="hidden w-1/2 bg-blue-600 lg:block">
        <div className="flex h-full items-center justify-center p-12">
          <Image
            src={sidePanel}
            alt="Trading chart illustration"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-600">Login to your trading account</p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
              style={{ flexGrow: 1 }} id="googleButton">
              <Image src="/google-icon.svg" alt="Google logo" width={24} height={24} />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>

            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-300 text-black hover:bg-gray-400 transition"
              style={{ flexGrow: 1 }} id="githubButton"
            >
              <Image src="/github-icon.svg" alt="GitHub logo" width={24} height={24} />
              <span className="font-medium">Sign in with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <p className="text-gray-500 text-sm">or</p>
            <div className="h-px w-full bg-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogIn} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state when user types input
                required
              />
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error?.message}</p>}

            {/* Login Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading} id="loginButton"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          {/* Redirect new users to Signup page */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}