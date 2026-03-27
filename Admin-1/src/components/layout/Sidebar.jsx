import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navItems";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { icons } from "../../constants/icons";
import { X } from "../icons";

export default function Sidebar({setSidebarOpen, isMobile = false }) {
  const { logout, user } = useAuth();

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false); // Ferme automatiquement sur mobile
    }
  };

  return (
    <aside className={`
      w-56 bg-[#0f172a] 
      md:w-55 sticky top-0 left-0 bottom-0 z-100 h-screen flex flex-col justify-between overflow-hidden shrink-0
    `}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-[#1a56db] flex items-center justify-center shrink-0">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">AdminPanel</span>
        <span className="cursor-pointer md:hidden rounded-full text-white  transition-all" onClick={()=>setSidebarOpen(false)}>
        <X />
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.id === "dashboard" ? "/" : `/${item.id}`}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all
              ${isActive 
                ? "bg-[#1e40af] text-white" 
                : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
              }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Section utilisateur */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl">
          <Avatar initials={user?.avatar || "AN"} index={0} size={36} />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.name || "Andry Nizwami"}</p>
            <p className="text-[#64748b] text-xs">{user?.role || "Admin"}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full mt-4 px-4 py-3 text-[#94a3b8] hover:text-white hover:bg-[#1e293b] rounded-2xl transition-all"
        >
          {icons.logout}
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}