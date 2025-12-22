import { Cross } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ variant = "dark", size = "md" }: LogoProps) => {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    md: { icon: 28, text: "text-xl" },
    lg: { icon: 36, text: "text-2xl" },
  };

  const colors = {
    light: "text-primary-foreground",
    dark: "text-primary",
  };

  return (
    <div className={`flex items-center gap-2 ${colors[variant]}`}>
      <div className="relative">
        <div className={`gradient-gold rounded-lg p-1.5 ${size === "lg" ? "p-2" : ""}`}>
          <Cross size={sizes[size].icon} className="text-accent-foreground" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-bold ${sizes[size].text} tracking-tight`}>EHIC</span>
        <span className="text-[10px] font-medium opacity-70 tracking-wider uppercase">Examination Portal</span>
      </div>
    </div>
  );
};
