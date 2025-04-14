"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";

export default function AuthLoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      // Sign up flow
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      toast.success("Sign up successful! Please try logging in.", {
        style: { color: "#000" },
      });
      setIsLoading(false);
      // Reset the fields and switch to sign in mode
      setEmail("");
      setPassword("");
      setIsSignUp(false);
    } else {
      // Sign in flow
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      router.push("/onboarding");
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          // Use a fixed Unsplash food image url
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80')",
        }}
      >
        {/* Overlay with blur */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-sm p-6 bg-white rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isLoading
              ? isSignUp
                ? "Signing Up..."
                : "Signing In..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
          <div className="mt-4 text-center">
            {isSignUp ? (
              <p className="text-base text-gray-400">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-purple-600 hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p className="text-base text-gray-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-purple-600 hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}