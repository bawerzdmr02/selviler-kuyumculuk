import type { HTMLAttributes } from "react";
import { GoldLine } from "./GoldLine";

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  /** Ortada küçük bir elmas / nokta motifi */
  ornate?: boolean;
};

export function Divider({
  ornate = true,
  className = "",
  ...props
}: DividerProps) {
  return (
    <div
      role="separator"
      className={["flex w-full items-center gap-3", className].join(" ")}
      {...props}
    >
      <GoldLine className="flex-1" />
      {ornate && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rotate-45 border border-gold bg-gold/40"
        />
      )}
      <GoldLine className="flex-1" />
    </div>
  );
}
