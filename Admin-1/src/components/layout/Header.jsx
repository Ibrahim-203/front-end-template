import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "../icons";           // ← On aura besoin de ces deux icônes
import Avatar from "../ui/Avatar";
import Dropdown from "../ui/Dropdown";
import Breadcrumbs from "../ui/Breadcrumbs";
import { icons } from "../../constants/icons";

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
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 sticky top-0 z-40 flex items-center">
      <div className="flex items-center gap-4 flex-1">
        {/* Bouton Hamburger - Visible uniquement sur mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-2xl transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Breadcrumbs sur desktop */}
        <div className="hidden md:block flex-1">
          <Breadcrumbs />
        </div>

        {/* Titre sur mobile */}
        <div className="md:hidden">
          <h1 className="font-semibold text-lg text-gray-900">AdminPanel</h1>
        </div>
      </div>

      {/* Partie droite : Notifications + User */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <Dropdown trigger={
          <div className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-2xl cursor-pointer relative">
            {icons.bell}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        }>
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold">Notifications</p>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {[
              { message: "Nouvel utilisateur inscrit", time: "Il y a 5 min" },
              { message: "Commande #3948 validée", time: "Il y a 27 min" },
            ].map((notif, i) => (
              <div key={i} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-200 last:border-none">
                <p className="text-sm">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </Dropdown>

        {/* User Dropdown */}
        <Dropdown trigger={
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar initials={user?.avatar || "AN"} index={0} size={36} />
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        }>
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
            >
              👤 Voir mon profil
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
            >
              ⚙️ Paramètres
            </button>
          </div>

          <div className="border-t border-gray-200 py-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 text-sm"
            >
              {icons.logout} Déconnexion
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}