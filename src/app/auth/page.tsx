"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";

export default function AuthLoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState([
    { id: "1", name: "Gluten", selected: false },
    { id: "2", name: "Lactose", selected: false },
    { id: "3", name: "Eggs", selected: false },
    { id: "4", name: "Nuts", selected: false },
    { id: "5", name: "Soy", selected: false },
    { id: "6", name: "Shellfish", selected: false },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAllergy = (id: string) => {
    setAllergies(
      allergies.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

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
      // Sign up flow (only email and password are used for authentication)
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
      // Reset fields and switch to sign in mode
      setEmail("");
      setPassword("");
      setAge("");
      setWeight("");
      setAllergies(allergies.map((item) => ({ ...item, selected: false })));
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

      toast.success("Sign in successful!", {
        style: { color: "#000" },
      });
      router.push("/onboarding");
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80')",
        }}
      >
        {/* Overlay */}
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
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          {isSignUp && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block mb-1 font-medium text-gray-400"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled={isLoading}
                  placeholder="Enter your age"
                  className="w-full px-3 py-2 border rounded-lg text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block mb-1 font-medium text-gray-400"
                >
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  disabled={isLoading}
                  placeholder="Enter your weight"
                  className="w-full px-3 py-2 border rounded-lg text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium text-gray-400">
                  Allergies
                </label>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy) => (
                    <button
                      key={allergy.id}
                      type="button"
                      onClick={() => toggleAllergy(allergy.id)}
                      className={`px-3 py-1 rounded-full border transition-colors text-sm flex items-center gap-1 ${
                        allergy.selected
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-gray-100 text-gray-600 border-gray-300 hover:border-purple-600"
                      }`}
                    >
                      {allergy.name}
                      {allergy.selected && <X className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
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