"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const { data: session, status } = useSession(); // NextAuth session
  const [firebaseSession, setFirebaseSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get Firebase token from cookies
  const getFirebaseTokenFromCookie = () => {
    const match = document.cookie.match(/(^|;\s*)firebaseAuthToken=([^;]*)/);
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchFirebaseSession = async () => {
      try {
        const firebaseAuthToken = getFirebaseTokenFromCookie();
        console.log("🔥 Firebase Token from Cookie:", firebaseAuthToken || "Not found");

        if (!firebaseAuthToken) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: firebaseAuthToken }),
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Firebase session API returned error:", await res.text());
          setLoading(false);
          return;
        }

        const userData = await res.json();
        setFirebaseSession(userData.user);
      } catch (err) {
        console.error("Error fetching Firebase session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirebaseSession();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading session...</p>;

  const user = session?.user || firebaseSession;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center">Session Info</h1>
      {user ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {user.name || "No Name Provided"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="text-green-600 mt-4">✅ User is logged in</p>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">❌ No active session</p>
      )}
    </div>
  );
}
