"use client"; // makes it a client component

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useVerifyBeforeUpdateEmail } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config' // importing the auth instance 


import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import sidePanel from "@/assets/images/side_panel.png";

export default function SignupPage() {
  // Set up States to track user email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setName] = useState("");

  // Use Firebase hooks to create a new user with email and password
  const [createUserWithEmailAndPassword, user, is_loading, error] = useCreateUserWithEmailAndPassword(auth);

  // set up Signup Handler for form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page from reloading (which it usually does by default upon form submission)

    if (!email || !password || !fullName) return; // Make sure email and password are entered

    try {
      // Store the response of the firebase signup function
      const userCredentials = await createUserWithEmailAndPassword(email, password);

      // Verify if a valid user has been created
      if (userCredentials?.user) {
        // Successful signup occurs
        console.log("User Signed up successfully:", userCredentials.user);
        const idToken = await userCredentials.user.getIdToken();

        // Send the ID Token to the backed for creation of session cookies
        const res = await fetch("/api/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
          credentials: "include"
        });

        if (!res.ok) {
          console.error("Failed to set session:", await res.json());
          return;
        }

        // Reset input fields before redirecting upon successful signup
        setEmail("");
        setPassword("");

        // Redirect user to dashboard after signup
        window.location.href = "/dashboard" // Reload page to get access to newly set cookies
      }

    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Left Section (Same as Login) */}
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
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {/* Google Sign-Up Button */}
          <div className="flex justify-center space-x-3 mb-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
              style={{ flexGrow: 1 }}>
              <Image src="/google-icon.svg" alt="Google logo" width={24} height={24} />
              <span className="text-gray-700 font-medium">Sign up with Google</span>
            </button>

            {/* GitHub Sign-Up Button */}
            <button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-300 text-black hover:bg-gray-400 transition"
              style={{ flexGrow: 1 }}
            >
              <Image src="/github-icon.svg" alt="GitHub logo" width={24} height={24} />
              <span className="font-medium">Sign up with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-300"></div>
            <p className="text-gray-500 text-sm">or</p>
            <div className="h-px w-full bg-gray-300"></div>
          </div>

          {/* Manual Signup Form */}
          <form onSubmit={handleSignup} className='space-y-6'>
            {/* This is the Name fields input */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
              <Input id='fullName' type='fullName' value={fullName} onChange={(e) => setName(e.target.value)} required />
            </div>
            {/* This is the email input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            {/* This is the Password input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {/* Error Message for unsuccessful signup */}
            {error && <p className='text-red-500 text-sm'>{error.message}</p>}

            {/* Signup form Submit button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={is_loading}>
              {is_loading ? "Signing up..." : "Sign up"}
              {/* Sign up */}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}