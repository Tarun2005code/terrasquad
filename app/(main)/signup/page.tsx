"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.error ||
            "Signup failed"
        );
        return;
      }

      toast.success(
        "OTP sent to your email."
      );

      router.push(
        `/verify-otp?email=${encodeURIComponent(
          email
        )}`
      );
    } catch {
      toast.error(
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-black text-center">
          Create Account
        </h1>

        <p className="mt-3 text-center text-sm text-gray-600">
          A verification OTP will be
          sent to your email address.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          className="mt-8 w-full rounded-2xl border p-4"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="mt-4 w-full rounded-2xl border p-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="tel"
          placeholder="Phone"
          className="mt-4 w-full rounded-2xl border p-4"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <div className="relative mt-4">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            className="w-full rounded-2xl border p-4 pr-12"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#2F5D50] py-4 text-white font-bold disabled:opacity-50"
        >
          {loading
            ? "Sending OTP..."
            : "Create Account"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          Check your Inbox and Spam
          folder for the OTP email.
        </p>
      </form>
    </div>
  );
}