export default function TurkeyMapSVG() {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMinYMin"
      style={{ backgroundColor: 'rgb(255, 255, 250)' }}
      className="w-full h-full"
    >
      <path
        d="M 500,300 L 600,300 L 600,400 L 500,400 Z"
        fill="none"
        stroke="black"
        strokeWidth="1"
        className="hover:fill-blue-200 cursor-pointer transition-colors"
      />
      {/* Diğer il path'leri buraya eklenecek */}
    </svg>
  );
} 