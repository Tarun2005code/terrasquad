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
        w-full
        min-h-[56px]
        bg-[#2F5D50]
        hover:bg-[#23463B]
        text-white
        font-bold
        text-base
        sm:text-lg
        rounded-2xl
        px-6
        py-4
        shadow-lg
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-[#2F5D50]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}