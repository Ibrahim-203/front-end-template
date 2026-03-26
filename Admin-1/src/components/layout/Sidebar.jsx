import { NavLink } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { icons } from "../../constants/icons";
import { NAV_ITEMS } from "../../constants/navItems";
import Avatar from "../ui/Avatar";
import { useAuth } from "../../contexts/AuthContext";



export default function Sidebar({ sidebarOpen }) {
    const {logout, user} = useAuth()
    return (
        <aside
            style={{
                width: sidebarOpen ? "220px" : "64px",
                background: COLORS.sidebar,
                transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="fixed top-0 left-0 bottom-0 z-100 flex flex-col overflow-hidden shrink-0"
        >
            {/* Logo */}
            <div
                className="flex items-center gap-3 px-4 py-4.5 border-b border-white/10 min-h-16"
            >
                <div className="w-8 h-8 rounded-lg bg-[#1a56db] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </div>
                {sidebarOpen && (
                    <span className="text-white font-bold text-[15px] whitespace-nowrap">AdminPanel</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.id === "dashboard" ? "/" : `/${item.id}`}
                        className={({ isActive }) =>
                            `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${isActive
                                ? "bg-[#1e40af] text-white"
                                : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
                            } ${!sidebarOpen ? "justify-center" : ""}`
                        }
                        title={!sidebarOpen ? item.label : undefined}
                    >
                        <span className="shrink-0">{item.icon}</span>
                        {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* User section */}
            <div className="p-3 border-t border-white/10">
                <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${sidebarOpen ? "" : "justify-center"}`}>
                    <Avatar initials="AM" index={0} size={32} />
                    {sidebarOpen && (
                        <div className="flex-1 overflow-hidden">
                            <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
                            <p className="text-[#64748b] text-xs">{user?.role}</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={logout}
                    className={`flex items-center gap-3 w-full px-3 py-2.25 text-[#64748b] hover:text-white rounded-xl mt-1 transition-all ${sidebarOpen ? "" : "justify-center"}`}
                >
                    {icons.logout}
                    {sidebarOpen && <span className="text-sm" >Déconnexion</span>}
                </button>
            </div>
        </aside>
    );
}

