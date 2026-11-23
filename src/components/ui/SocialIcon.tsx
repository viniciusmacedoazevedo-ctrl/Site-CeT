import type { SocialNetwork } from "@/data/company";

/** Ícones de redes sociais em traço, no mesmo estilo dos ícones Lucide. */
export function SocialIcon({ network, className = "size-5" }: { network: SocialNetwork; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (network) {
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.5V16.5M8 7.5v.01M12 16.5v-3.5a2 2 0 0 1 4 0v3.5M12 10.5v6" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2z" />
          <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-.9.9c-1-.4-2-1.4-2.4-2.4l.9-.9-1-2L9.5 7.5" />
        </svg>
      );
  }
}
