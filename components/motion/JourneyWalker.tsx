/** A small articulated ink traveller. Face is cropped from the supplied no-glasses model.
 * The body is a stylized segmented illustration, not a claimed full-body source pose. */
export function JourneyWalker() {
  return <svg className="journey-walker" viewBox="0 0 180 320" aria-hidden="true">
    <defs><pattern id="traveller-ink" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><path d="M0 0V5" stroke="#eee9db" strokeWidth=".6" opacity=".25" /></pattern></defs>
    <ellipse className="walker-shadow" cx="92" cy="305" rx="48" ry="5" fill="#2a2820" opacity=".15" />
    <g className="walker-leg walker-leg-back"><path d="M78 177l-4 58 18 4 10-59z" fill="#373832" stroke="#191c17" strokeWidth="2" /><g className="walker-knee walker-knee-back"><path d="M74 232l-8 63 18 1 10-59z" fill="#292d26" stroke="#191c17" strokeWidth="2" /><path d="M65 291l-5 13 39 1 1-8-17-7z" fill="#191c17" /></g></g>
    <g className="walker-torso"><path d="M56 89l-20 20-1 68 27 12 20-77z" fill="#242a22" stroke="#121910" strokeWidth="2" /><path d="M49 111l-4 54m7-46l-1 38" stroke="#8d9180" strokeWidth="1.5" />
      <g className="walker-arm walker-arm-back"><path d="M105 99q19-2 22 17l7 42-13 5-19-49z" fill="#393e32" stroke="#1b2116" strokeWidth="2" /><g className="walker-elbow walker-elbow-back"><path d="M121 156l7 38 12 13 6-7-8-15-4-30z" fill="#d8d3c1" stroke="#282c21" strokeWidth="2" /></g></g>
      <path d="M67 86l40 5 15 30-10 66-49 2-9-67z" fill="#20271e" stroke="#151d12" strokeWidth="2" /><path d="M67 86l40 5 15 30-10 66-49 2-9-67z" fill="url(#traveller-ink)" />
      <path d="M65 93l25 37 8-2-22-39z" fill="#8a8b76" stroke="#252c1f" strokeWidth="2" /><path d="M80 76v18q12 13 24 0l-1-20" fill="#d4cfbb" stroke="#2b3023" strokeWidth="2" />
      <image className="walker-head" href="/images/journey/traveller-head.webp" x="49" y="10" width="79" height="84" preserveAspectRatio="xMidYMid meet" />
      <g className="walker-arm walker-arm-front"><path d="M61 103q-13 0-14 17l-1 44 16 2 12-48z" fill="#363d2f" stroke="#1b2416" strokeWidth="2" /><g className="walker-elbow walker-elbow-front"><path d="M46 159l2 39 13 11 8-8-9-14 3-25z" fill="#d8d3c1" stroke="#282c21" strokeWidth="2" /><path d="M55 197l8 5m-9-1l7 5" stroke="#5d5e4c" /></g></g>
    </g>
    <g className="walker-leg walker-leg-front"><path d="M93 178l7 61 20-3-5-58z" fill="#494d40" stroke="#191c17" strokeWidth="2" /><g className="walker-knee walker-knee-front"><path d="M100 234l13 62 17-4-10-57z" fill="#393e32" stroke="#191c17" strokeWidth="2" /><path d="M113 289l-1 14 39 1 2-8-22-7z" fill="#1c2518" /></g></g>
  </svg>;
}
