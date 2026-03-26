import { useNavigate } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { icons } from "../../constants/icons";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../ui/Avatar";   // On va le créer juste après
import Dropdown from "../ui/Dropdown";
import Breadcrumbs from "../ui/Breadcrumbs";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/settings");
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <header
      className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 sticky top-0 z-50"
    >
      <div className="flex-1 flex items-center gap-6">
        {/* Toggle Sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:bg-gray-50 transition-all flex-shrink-0"
        >
          {sidebarOpen ? icons.chevronLeft : icons.chevronRight}
        </button>

        {/* Breadcrumbs */}
        <div className="flex-1">
          <Breadcrumbs />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications Dropdown */}
        <Dropdown
          trigger={
            <div className="relative w-9 h-9 flex items-center justify-center text-[#64748b] hover:text-[#0f172a] hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
              {icons.bell}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>
          }
        >
          <div className="px-4 py-3 border-b border-[#e2e8f0]">
            <p className="font-semibold text-[#0f172a]">Notifications</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {[
              { id: 1, message: "Nouvel utilisateur inscrit", time: "Il y a 5 min" },
              { id: 2, message: "Commande #3948 a été validée", time: "Il y a 27 min" },
              { id: 3, message: "Rapport mensuel disponible", time: "Il y a 2h" },
            ].map((notif) => (
              <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 border-b border-[#e2e8f0] last:border-none">
                <p className="text-sm text-[#0f172a]">{notif.message}</p>
                <p className="text-xs text-[#64748b] mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 text-center text-sm text-[#1a56db] hover:bg-gray-50 cursor-pointer">
            Voir toutes les notifications
          </div>
        </Dropdown>

        {/* User Dropdown */}
        <Dropdown
          trigger={
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar initials={user?.avatar || "AN"} index={0} size={36} />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[#0f172a]">{user?.name || "Alice Martin"}</p>
                <p className="text-xs text-[#64748b] -mt-0.5">{user?.role || "Administrateur"}</p>
              </div>
            </div>
          }
        >
          <div className="px-4 py-3 border-b border-[#e2e8f0]">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-[#64748b]">{user?.email}</p>
          </div>

          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
            >
              👤 Voir mon profil
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
            >
              ⚙️ Paramètres
            </button>
          </div>

          <div className="border-t border-[#e2e8f0] py-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 text-sm"
            >
              {icons.logout} Déconnexion
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}