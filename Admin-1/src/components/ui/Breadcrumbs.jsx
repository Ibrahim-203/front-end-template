import { Link, useLocation } from "react-router-dom";
import { icons } from "../../constants/icons.jsx";

const routeNames = {
  "/": "Dashboard",
  "/users": "Utilisateurs",
  "/settings": "Paramètres",
  // Ajoute ici d'autres routes plus tard
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Si on est sur la page d'accueil (Dashboard)
  if (pathSegments.length === 0) {
    return (
      <div className="flex items-center text-sm text-[#64748b]">
        <span>Dashboard</span>
      </div>
    );
  }

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;
    const label = routeNames[path] || segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      label,
      path,
      isLast,
    };
  });

  return (
    <nav className="flex items-center text-sm text-[#64748b]">
      <Link to="/" className="hover:text-[#1a56db] transition-colors">
        Dashboard
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          <span className="mx-2">{icons.chevronRight}</span>
          {crumb.isLast ? (
            <span className="font-medium text-[#0f172a]">{crumb.label}</span>
          ) : (
            <Link 
              to={crumb.path} 
              className="hover:text-[#1a56db] transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}