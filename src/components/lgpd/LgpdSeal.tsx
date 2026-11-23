/**
 * Selo "Em conformidade com a LGPD". Não representa certificação de terceiros:
 * indica que a C&T adota as práticas exigidas pela Lei nº 13.709/2018.
 */
export function LgpdSeal({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const id = `lgpd-${tone}`;
  const dark = tone === "dark";
  const ring = dark ? "#5fd0ec" : "#075a91";
  const text = dark ? "#ffffff" : "#102a43";
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Em conformidade com a LGPD — Lei nº 13.709/2018" className={className}>
      <defs>
        <path id={`c-${id}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2bbde0" />
          <stop offset="1" stopColor="#075a91" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke={ring} strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="88" fill="none" stroke={ring} strokeWidth="1" strokeDasharray="2 5" strokeOpacity="0.7" />
      <text fill={text} fontSize="10.5" fontWeight="600" letterSpacing="2.1" style={{ fontFamily: "var(--font-display)" }}>
        <textPath href={`#c-${id}`} startOffset="0">EM CONFORMIDADE COM A LGPD • LEI 13.709/2018 •</textPath>
      </text>
      <circle cx="100" cy="100" r="56" fill={`url(#g-${id})`} />
      <circle cx="100" cy="100" r="56" fill="none" stroke="#fff" strokeOpacity="0.35" />
      <path d="M100 66 l24 9 v18 c0 16 -10 27 -24 33 c-14 -6 -24 -17 -24 -33 v-18 z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <path d="M89 97 l8 8 l15 -16" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="100" y="145" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" letterSpacing="2.5" style={{ fontFamily: "var(--font-display)" }}>LGPD</text>
    </svg>
  );
}
