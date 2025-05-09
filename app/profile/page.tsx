"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    university: "",
    github: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(true); // Loading state for authentication
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login"); // Redirect if not authenticated
      } else {
        setLoading(false); // Stop loading once the user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as typeof profile);
        }
      }
    };

    if (!loading) {
      fetchProfile();
    }
  }, [loading]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("User not logged in.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), profile);
      alert("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      router.push("/login");
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>; // Show a loading message while determining auth state

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-bold">Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            className="border p-2 rounded w-80"
          />
        </div>
        <div>
          <label className="block font-bold">University</label>
          <input
            type="text"
            value={profile.university}
            onChange={(e) => setProfile({ ...profile, university: e.target.value })}
            className="border p-2 rounded w-80"
          />
        </div>
        <div>
          <label className="block font-bold">GitHub</label>
          <input
            type="text"
            value={profile.github}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            className="border p-2 rounded w-80"
          />
        </div>
        <div>
          <label className="block font-bold">LinkedIn</label>
          <input
            type="text"
            value={profile.linkedin}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            className="border p-2 rounded w-80"
          />
        </div>
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
        <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
          Log Out
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}