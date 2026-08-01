"use client";

import { useState } from "react";

export default function LoadingButton({
  children,
  loadingText = "Loading...",
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  loadingText?: string;
  onClick?: () => Promise<void> | void;
  className?: string;
  type?: "button" | "submit";
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      await onClick?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type={type}
      disabled={loading}
      onClick={handleClick}
      className={`${className} disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}