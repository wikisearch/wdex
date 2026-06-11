import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps, Button as ShadcnButton } from "../shadcn/button";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    icon?: React.ReactNode;
    loading?: boolean;
  }
>((props, ref) => {
  return (
    <ShadcnButton
      ref={ref}
      {...props}
      className={twMerge(
        "flex h-auto items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
        "shadow-brutal-sm hover:shadow-brutal active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        "disabled:pointer-events-none disabled:opacity-50",
        props.variant === "default" &&
          "border-2 border-[#311B56] bg-[#311B56] text-[#FAF8F5] hover:-translate-x-0.5 hover:-translate-y-0.5",
        props.variant === "outline" &&
          "border-2 border-[#311B56]/20 bg-[#FAF8F5] text-[#311B56] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#311B56]",
        props.variant === "ghost" &&
          "border-2 border-transparent bg-transparent shadow-none hover:bg-[#311B56]/5",
        props.variant === "link" &&
          "text-[#A57CC6] underline-offset-4 hover:underline",
        props.className,
      )}
    >
      {props.loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        props.icon && <span className="shrink-0">{props.icon}</span>
      )}
      {props.children}
    </ShadcnButton>
  );
});
Button.displayName = "Button";
