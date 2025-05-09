"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard"); // Redirect logged-in users to the dashboard
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a new user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: "",
        email: user.email,
        university: "",
        github: "",
        linkedin: "",
      });

      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // Create a new user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName || "",
          email: user.email,
          university: "",
          github: "",
          linkedin: "",
        });
      }

      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">{isSignUp ? "Sign Up" : "Log In"}</h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="flex justify-center mb-4">
            <TabsTrigger value="login" onClick={() => setIsSignUp(false)}>
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup" onClick={() => setIsSignUp(true)}>
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleEmailLogin} className="w-full mb-4">
              Log In with Email
            </Button>
            <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
              Log In with Google
            </Button>
          </TabsContent>
          <TabsContent value="signup">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleEmailSignUp} className="w-full mb-4">
              Sign Up with Email
            </Button>
            <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
              Sign Up with Google
            </Button>
          </TabsContent>
        </Tabs>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}