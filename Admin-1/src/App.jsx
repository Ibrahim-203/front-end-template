import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider} from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";

import AdminLayout from "./components/layout/AdminLayout";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
import ToastContainer from "./components/ui/ToastContainer";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Route publique : Login */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Route de fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}