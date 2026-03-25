import { COLORS } from "../../constants/colors";

export default function MiniBarChart({ data, color }) {
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((value, index) => {
        const heightPercentage = (value / max) * 100;
        const opacity = index === data.length - 1 ? 1 : 0.4 + (index / data.length) * 0.6;

        return (
          <div
            key={index}
            style={{
              backgroundColor: color,
              height: `${heightPercentage}%`,
              opacity: opacity,
            }}
            className="flex-1 rounded-sm transition-all"
          />
        );
      })}
    </div>
  );
}