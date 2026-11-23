/**
 * Cláu — personagem ilustrada da assistente virtual da C&T.
 * Vetorial (SVG), leve e nítida em qualquer tamanho.
 */
export function ClauAvatar({ className = "size-12", title = "Cláu, assistente virtual da C&T" }: { className?: string; title?: string }) {
  const hair = "#2a1b17";
  const hairLight = "#3d2822";
  const skin = "#d39a74";
  const skinShade = "#bd8461";
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={title}>
      <defs>
        <clipPath id="clau-clip"><circle cx="60" cy="60" r="60" /></clipPath>
        <linearGradient id="clau-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f7fb" />
          <stop offset="1" stopColor="#bfe8f4" />
        </linearGradient>
        <linearGradient id="clau-blazer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#163a5c" />
          <stop offset="1" stopColor="#102a43" />
        </linearGradient>
      </defs>
      <g clipPath="url(#clau-clip)">
        <rect width="120" height="120" fill="url(#clau-bg)" />
        {/* Cabelo de trás (cachos) */}
        <g fill={hair}>
          <circle cx="38" cy="46" r="14" /><circle cx="82" cy="46" r="14" />
          <circle cx="34" cy="62" r="13" /><circle cx="86" cy="62" r="13" />
          <circle cx="36" cy="78" r="12" /><circle cx="84" cy="78" r="12" />
          <circle cx="44" cy="88" r="10" /><circle cx="76" cy="88" r="10" />
          <circle cx="60" cy="34" r="22" />
        </g>
        {/* Pescoço */}
        <path d="M52 70h16v16c0 4-16 4-16 0z" fill={skinShade} />
        {/* Blazer e blusa */}
        <path d="M18 120c2-20 14-30 30-33l12 10 12-10c16 3 28 13 30 33z" fill="url(#clau-blazer)" />
        <path d="M48 87l12 10 12-10 3 3-15 30-15-30z" fill="#17aed2" />
        <path d="M48 87l12 10-6 12-9-19z" fill="#0f93b4" opacity="0.5" />
        <path d="M45 90l9 20-12-4 2-6-4-4z" fill="#0d2238" />
        <path d="M75 90l-9 20 12-4-2-6 4-4z" fill="#0d2238" />
        <circle cx="38" cy="104" r="2.2" fill="#17aed2" />
        {/* Rosto */}
        <ellipse cx="60" cy="55" rx="17.5" ry="20.5" fill={skin} />
        <ellipse cx="42.5" cy="57" rx="3" ry="4.5" fill={skinShade} />
        <ellipse cx="77.5" cy="57" rx="3" ry="4.5" fill={skinShade} />
        {/* Brincos */}
        <circle cx="42.5" cy="63.5" r="2.4" fill="#17aed2" stroke="#fff" strokeWidth="0.8" />
        <circle cx="77.5" cy="63.5" r="2.4" fill="#17aed2" stroke="#fff" strokeWidth="0.8" />
        {/* Franja em cachos */}
        <g fill={hair}>
          <circle cx="47" cy="38" r="8" /><circle cx="56" cy="34" r="8.5" /><circle cx="66" cy="34" r="8.5" /><circle cx="74" cy="39" r="7.5" />
          <circle cx="43" cy="46" r="5.5" /><circle cx="78" cy="47" r="5" />
        </g>
        <g fill="none" stroke={hairLight} strokeWidth="1.3" strokeLinecap="round" opacity="0.9">
          <path d="M50 33c2-2 5-2 6 0" /><path d="M63 31c2-2 5-1 6 1" /><path d="M33 62c-2 3-1 6 1 8" /><path d="M87 62c2 3 1 6-1 8" />
        </g>
        {/* Sobrancelhas */}
        <path d="M49.5 49.5c2.2-1.6 5-1.8 7.2-.6" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M63.3 48.9c2.2-1.2 5-1 7.2.6" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* Olhos */}
        <ellipse cx="53.3" cy="55" rx="2.1" ry="2.5" fill="#1e1411" />
        <ellipse cx="66.7" cy="55" rx="2.1" ry="2.5" fill="#1e1411" />
        <circle cx="54" cy="54.2" r="0.7" fill="#fff" /><circle cx="67.4" cy="54.2" r="0.7" fill="#fff" />
        <path d="M50.5 53.2l-1.3-1M69.5 53.2l1.3-1" stroke="#1e1411" strokeWidth="1" strokeLinecap="round" />
        {/* Nariz, bochechas e sorriso */}
        <path d="M60 57.5c-.6 2.4-1.4 3.6-2.4 4.2.9.5 2.1.6 3.2.2" stroke={skinShade} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <ellipse cx="49.5" cy="62" rx="3.4" ry="2" fill="#e57f7f" opacity="0.35" />
        <ellipse cx="70.5" cy="62" rx="3.4" ry="2" fill="#e57f7f" opacity="0.35" />
        <path d="M54 65.2c3.6 3.6 8.4 3.6 12 0-3.6 1.4-8.4 1.4-12 0z" fill="#b8424f" />
        <path d="M55.6 66.4c2.8 1 6 1 8.8 0" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" opacity="0.9" />
        {/* Headset de atendimento */}
        <path d="M38 54c0-15 10-26 22-26s22 11 22 26" fill="none" stroke="#102a43" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="35" y="51" width="7" height="11" rx="3.5" fill="#102a43" />
        <rect x="78" y="51" width="7" height="11" rx="3.5" fill="#102a43" />
        <path d="M39 61c0 7 5 10.5 11 10.5" fill="none" stroke="#102a43" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="51" cy="71.5" r="2" fill="#17aed2" />
      </g>
    </svg>
  );
}
