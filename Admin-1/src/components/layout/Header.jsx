import { COLORS } from "../../constants/colors";
import { icons } from "../../constants/icons";
import Avatar from "../ui/Avatar";   // On va le créer juste après

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header 
      className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 sticky top-0 z-50"
    >
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] transition-colors"
      >
        {sidebarOpen ? icons.chevronLeft : icons.chevronRight}
      </button>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a]">
          {icons.bell}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#dc2626] border-2 border-white"></span>
        </button>

        {/* User info */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar initials="AM" index={0} size={34} />
          <div>
            <p className="text-sm font-semibold text-[#0f172a]">Alice M.</p>
          </div>
        </div>
      </div>
    </header>
  );
}