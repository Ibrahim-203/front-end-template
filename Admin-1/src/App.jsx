import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth} from "./contexts/AuthContext";

import AdminLayout from "./components/layout/AdminLayout";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";

function AppRoutes(){
  const {isLoggedIn, loading} = useAuth();

  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-[#64748b]">Chargement...</div>
      </div>
    )
  }

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
}

export default function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
    </AuthProvider>
  );
}