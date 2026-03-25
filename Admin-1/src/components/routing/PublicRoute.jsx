import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PublicRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#1a56db] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#64748b]">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est déjà connecté → on le redirige vers le dashboard
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Sinon on affiche la page login (ou toute autre page publique)
  return <Outlet />;
}