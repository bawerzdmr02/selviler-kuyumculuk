import type { ComponentPropsWithoutRef } from "react";

type GoldLineProps = ComponentPropsWithoutRef<"svg"> & {
  orientation?: "horizontal" | "vertical";
};

/**
 * İnce altın çizgi — kuyumcu vitrin / çerçeve detayı.
 */
export function GoldLine({
  orientation = "horizontal",
  className = "",
  ...props
}: GoldLineProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <svg
      aria-hidden
      viewBox={isHorizontal ? "0 0 100 2" : "0 0 2 100"}
      preserveAspectRatio="none"
      className={
        isHorizontal
          ? `h-px w-full text-gold ${className}`
          : `h-full w-px text-gold ${className}`
      }
      {...props}
    >
      <defs>
        <linearGradient
          id={isHorizontal ? "gold-line-h" : "gold-line-v"}
          x1="0%"
          y1="0%"
          x2={isHorizontal ? "100%" : "0%"}
          y2={isHorizontal ? "0%" : "100%"}
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="20%" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#E5C97B" stopOpacity="1" />
          <stop offset="80%" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect
        width={isHorizontal ? 100 : 2}
        height={isHorizontal ? 2 : 100}
        fill={`url(#${isHorizontal ? "gold-line-h" : "gold-line-v"})`}
      />
    </svg>
  );
}
