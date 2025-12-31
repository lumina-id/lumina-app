export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f8f9fa]" />

      {/* City skyline SVG */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[40%] md:h-[50%]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        {/* Far background buildings - lightest */}
        <g opacity="0.15">
          <rect x="50" y="200" width="60" height="200" fill="#9ca3af" />
          <rect x="130" y="150" width="80" height="250" fill="#9ca3af" />
          <rect x="230" y="180" width="50" height="220" fill="#9ca3af" />
          <rect x="300" y="120" width="70" height="280" fill="#9ca3af" />
          <rect x="390" y="160" width="55" height="240" fill="#9ca3af" />
          <rect x="460" y="200" width="45" height="200" fill="#9ca3af" />
          <rect x="520" y="140" width="65" height="260" fill="#9ca3af" />
          <rect x="600" y="180" width="50" height="220" fill="#9ca3af" />
          <rect x="670" y="130" width="80" height="270" fill="#9ca3af" />
          <rect x="770" y="170" width="55" height="230" fill="#9ca3af" />
          <rect x="840" y="200" width="60" height="200" fill="#9ca3af" />
          <rect x="920" y="150" width="70" height="250" fill="#9ca3af" />
          <rect x="1010" y="180" width="50" height="220" fill="#9ca3af" />
          <rect x="1080" y="140" width="65" height="260" fill="#9ca3af" />
          <rect x="1160" y="160" width="55" height="240" fill="#9ca3af" />
          <rect x="1230" y="190" width="70" height="210" fill="#9ca3af" />
          <rect x="1320" y="130" width="80" height="270" fill="#9ca3af" />
        </g>

        {/* Mid background buildings - medium */}
        <g opacity="0.12">
          <rect x="80" y="220" width="70" height="180" fill="#6b7280" />
          <rect x="170" y="170" width="90" height="230" fill="#6b7280" />
          <rect x="280" y="200" width="60" height="200" fill="#6b7280" />
          <rect x="360" y="150" width="75" height="250" fill="#6b7280" />
          <rect x="450" y="190" width="55" height="210" fill="#6b7280" />
          <rect x="520" y="160" width="65" height="240" fill="#6b7280" />
          <rect x="600" y="200" width="50" height="200" fill="#6b7280" />
          <rect x="670" y="170" width="80" height="230" fill="#6b7280" />
          <rect x="770" y="190" width="60" height="210" fill="#6b7280" />
          <rect x="850" y="160" width="70" height="240" fill="#6b7280" />
          <rect x="940" y="180" width="55" height="220" fill="#6b7280" />
          <rect x="1010" y="200" width="65" height="200" fill="#6b7280" />
          <rect x="1090" y="170" width="75" height="230" fill="#6b7280" />
          <rect x="1180" y="190" width="60" height="210" fill="#6b7280" />
          <rect x="1260" y="160" width="70" height="240" fill="#6b7280" />
          <rect x="1350" y="180" width="55" height="220" fill="#6b7280" />
        </g>

        {/* Foreground buildings - darkest */}
        <g opacity="0.08">
          <rect x="0" y="280" width="80" height="120" fill="#4b5563" />
          <rect x="100" y="250" width="100" height="150" fill="#4b5563" />
          <rect x="220" y="270" width="70" height="130" fill="#4b5563" />
          <rect x="310" y="240" width="85" height="160" fill="#4b5563" />
          <rect x="410" y="260" width="65" height="140" fill="#4b5563" />
          <rect x="490" y="280" width="75" height="120" fill="#4b5563" />
          <rect x="580" y="250" width="60" height="150" fill="#4b5563" />
          <rect x="660" y="270" width="90" height="130" fill="#4b5563" />
          <rect x="770" y="260" width="70" height="140" fill="#4b5563" />
          <rect x="860" y="280" width="80" height="120" fill="#4b5563" />
          <rect x="960" y="250" width="65" height="150" fill="#4b5563" />
          <rect x="1040" y="270" width="75" height="130" fill="#4b5563" />
          <rect x="1130" y="260" width="85" height="140" fill="#4b5563" />
          <rect x="1230" y="280" width="70" height="120" fill="#4b5563" />
          <rect x="1320" y="250" width="80" height="150" fill="#4b5563" />
        </g>
      </svg>
    </div>
  );
}
