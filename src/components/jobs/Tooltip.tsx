'use client';
import { useState, ReactNode } from "react";

interface TooltipProps {
  tooltipText: string;
  size?: number;
  rightAlign?: boolean;
  children: ReactNode;
}

export default function Tooltip({ tooltipText, size, rightAlign, children }: TooltipProps) {
  const [tooltip, setTooltip] = useState(false);

  const handleTooltip = (value: boolean) => {
    setTooltip(value);
  };

  return (
    <div
      role="button"
      className="relative"
      onMouseOver={() => handleTooltip(true)}
      onMouseLeave={() => handleTooltip(false)}
    >
      {children}
      {tooltip && (
        <div
          style={{ fontSize: size ? `${size}px` : "inherit", zIndex: 1000 }}
          className={`text-nowrap font-normal absolute ${rightAlign ? "end-0" : ""} bg-slate-600 mt-1 py-1 px-2 rounded-lg text-white`}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
}
