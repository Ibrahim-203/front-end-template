import { COLORS } from "../../constants/colors";

const avatarColors = ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#ec4899"];

export default function Avatar({ initials, index = 0, size = 32 }) {
  const bg = avatarColors[index % avatarColors.length];

  return (
    <div 
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        fontSize: Math.floor(size * 0.36),
        fontWeight: 600,
      }}
      className="rounded-full flex items-center justify-center text-white flex-shrink-0"
    >
      {initials}
    </div>
  );
}