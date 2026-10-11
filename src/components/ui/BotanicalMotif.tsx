import React from "react";

interface BotanicalMotifProps {
  className?: string;
  variant?: "leaf-vein" | "root-mesh" | "canopy-burst" | "stem-junction";
}

export function BotanicalMotif({
  className = "",
  variant = "leaf-vein",
}: BotanicalMotifProps) {
  if (variant === "leaf-vein") {
    return (
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current opacity-25 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M10 60C50 60 90 20 190 20M10 60C50 60 90 100 190 100M10 60H190"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 4"
        />
        <circle cx="10" cy="60" r="3" fill="currentColor" fillOpacity="0.4" />
        <circle cx="90" cy="20" r="2.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="90" cy="100" r="2.5" fill="currentColor" fillOpacity="0.5" />
        <circle cx="190" cy="20" r="3" fill="currentColor" fillOpacity="0.6" />
        <circle cx="190" cy="60" r="3.5" fill="currentColor" fillOpacity="0.7" />
        <circle cx="190" cy="100" r="3" fill="currentColor" fillOpacity="0.6" />
      </svg>
    );
  }

  if (variant === "root-mesh") {
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current opacity-20 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <path
          d="M80 10V60M80 60C60 90 30 110 10 150M80 60C100 90 130 110 150 150M80 60C70 100 70 130 80 155M45 80C30 100 20 120 15 145M115 80C130 100 140 120 145 145"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="80" cy="60" r="3" fill="currentColor" />
        <circle cx="45" cy="80" r="2" fill="currentColor" />
        <circle cx="115" cy="80" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "canopy-burst") {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`stroke-current opacity-30 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="48" strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="28" strokeWidth="0.75" />
        <path d="M60 12V108M12 60H108M26 26L94 94M26 94L94 26" strokeWidth="0.75" />
        <circle cx="60" cy="60" r="3" fill="currentColor" />
        <circle cx="60" cy="12" r="2" fill="currentColor" />
        <circle cx="60" cy="108" r="2" fill="currentColor" />
        <circle cx="12" cy="60" r="2" fill="currentColor" />
        <circle cx="108" cy="60" r="2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-current opacity-25 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path d="M40 0V80M0 40H80" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="40" cy="40" r="4" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}
