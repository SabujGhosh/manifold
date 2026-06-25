/**
 * The Manifold mark: three fanned, overlapping rounded sheets — the overlapping
 * coordinate charts of a manifold (and a nod to "many-fold" / the five levels) —
 * with the ƒ⁵ wordmark seated on the front sheet. Kept in sync with
 * public/favicon.svg. Decorative by default (aria-hidden); give it a label only
 * when it stands alone as a link/button.
 */
export function LogoMark({
  size = 26,
  className,
  title,
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <rect width="32" height="32" rx="7" fill="#0b0d12" />
      <g stroke="#e8c170" strokeLinejoin="round" strokeWidth="1.4">
        {/* back chart */}
        <rect x="6.5" y="6.5" width="13" height="13" rx="3" fill="#e8c170" fillOpacity="0.10" strokeOpacity="0.45" />
        {/* middle chart */}
        <rect x="9.5" y="9.5" width="13" height="13" rx="3" fill="#e8c170" fillOpacity="0.18" strokeOpacity="0.70" />
        {/* front sheet (solid) */}
        <rect x="12.5" y="12.5" width="13" height="13" rx="3" fill="#e8c170" strokeWidth="0" />
      </g>
      <text
        x="17.6"
        y="23.4"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        textAnchor="middle"
        fill="#0b0d12"
      >
        <tspan fontSize="12" fontWeight="600">ƒ</tspan>
        <tspan fontSize="7" dy="-5">5</tspan>
      </text>
    </svg>
  );
}
