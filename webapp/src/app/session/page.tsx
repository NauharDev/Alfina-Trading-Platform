"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const { data: session, status } = useSession(); // NextAuth session
  const [firebaseSession, setFirebaseSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Debug: Log NextAuth session data
  useEffect(() => {
    console.log("🌍 NextAuth Session Data:", session);
  }, [session]);

  // ✅ Helper function to retrieve Firebase token from cookies
  const getFirebaseTokenFromCookie = () => {
    const match = document.cookie.match(/(^|;\s*)firebaseAuthToken=([^;]*)/);
    const token = match ? match[2] : null;
    console.log("🔥 Firebase Token from Cookie:", token || "Not found"); // Debugging
    return token;
  };

  useEffect(() => {
    const fetchFirebaseSession = async () => {
      try {
        const firebaseAuthToken = getFirebaseTokenFromCookie();
        if (!firebaseAuthToken) {
          console.warn("❌ No Firebase token found in cookies.");
          setLoading(false);
          return;
        }

        console.log("🔄 Fetching session from Firebase...");

        const res = await fetch("/api/auth/firebase-session", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("🔥 Firebase session API error:", errorText);
          setLoading(false);
          return;
        }

        const userData = await res.json();
        console.log("✅ Firebase Session Data:", userData);
        setFirebaseSession(userData.user);
      } catch (err) {
        console.error("🔥 Error fetching Firebase session:", err);
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


// "use client";
// import { useSession } from "next-auth/react";

// export default function SessionPage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p className="text-center text-gray-500">Loading session...</p>;
//   }

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold text-center">Session Info</h1>
//       {session ? (
//         <div className="mt-4">
//           <p><strong>Name:</strong> {session.user?.name}</p>
//           <p><strong>Email:</strong> {session.user?.email}</p>
//           <p className="text-green-600 mt-4">✅ User is logged in</p>
//         </div>
//       ) : (
//         <p className="text-red-500 text-center mt-4">❌ No active session</p>
//       )}
//     </div>
//   );
// }
