"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      toast.success(
        "Message sent successfully"
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      toast.error(
        "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-xl">

        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-black text-center">
          Contact Us
        </h1>

        <p className="text-center text-gray-500 mt-4">
          We'd love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-2xl p-4"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-2xl p-4"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-full border rounded-2xl p-4"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-2xl p-4"
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value,
              })
            }
          />

          <textarea
            rows={6}
            placeholder="Message"
            className="w-full border rounded-2xl p-4"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2F5D50] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition"
          >
            {loading
              ? "Sending..."
              : "Send Message"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4 text-base">

          <a
            href="mailto:terrasquad.in@gmail.com"
            className="hover:text-[#2F5D50] transition"
          >
            📧 terrasquad.in@gmail.com
          </a>

          <a
            href="https://instagram.com/terrasquad.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2F5D50] transition"
          >
            📸 Instagram: @terrasquad.in
          </a>

          <a
            href="https://wa.me/919713024303"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#2F5D50] transition"
          >
            📱 WhatsApp Support
          </a>

        </div>
      </div>
    </div>
  );
}