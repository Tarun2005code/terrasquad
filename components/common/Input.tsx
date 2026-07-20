import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#2F5D50] focus:ring-2 focus:ring-[#2F5D50]/20"
    />
  );
}