"use client";

export default function LoadingPopup() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-2xl bg-white px-8 py-6 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2F5D50] border-t-transparent" />

          <p className="font-semibold text-[#2F5D50]">
            Please wait...
          </p>
        </div>
      </div>
    </div>
  );
}