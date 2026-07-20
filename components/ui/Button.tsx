type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  className = "",
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
        ${className}
      `}
    >
      {children}
    </button>
  );
}