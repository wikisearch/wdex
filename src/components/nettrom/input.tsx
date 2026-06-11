import { omit } from "lodash";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: React.ReactNode;
};

export default function Input(props: Props) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
        <div className="h-4 w-4 text-muted-foreground/50" aria-hidden="true">
          {props.icon}
        </div>
      </div>
      <input
        className={twMerge(
          "block w-full rounded-lg border border-border/30 bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 shadow-soft outline-none transition-all duration-200 focus:border-accent/50 focus:shadow-soft-md focus:ring-2 focus:ring-accent/20",
          props.icon && "ps-11",
        )}
        {...omit(props, "icon")}
      />
    </div>
  );
}
