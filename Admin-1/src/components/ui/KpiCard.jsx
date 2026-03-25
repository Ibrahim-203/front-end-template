import { icons } from "../../constants/icons.jsx";
import { COLORS } from "../../constants/colors";

export default function KpiCard({ label, value, sub, up }) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
      <p className="text-sm font-medium text-[#64748b]">{label}</p>
      <p className="text-3xl font-bold text-[#0f172a] mt-3 mb-1">{value}</p>
      
      <div className="flex items-center gap-2">
        <span className={up ? "text-[#059669]" : "text-[#dc2626]"}>
          {up ? icons.trendUp : icons.trendDown}
        </span>
        <span className={`text-sm font-medium ${up ? "text-[#059669]" : "text-[#dc2626]"}`}>
          {sub}
        </span>
      </div>
    </div>
  );
}