import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        bg-[#2F5D50]
        hover:bg-[#23463B]
        text-white
        px-7
        py-4
        rounded-full
        font-semibold
        transition
        duration-300
        shadow-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}