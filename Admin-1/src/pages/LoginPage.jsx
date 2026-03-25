import { useState } from "react";
import { COLORS } from "../constants/colors";
import { useAuth } from "../contexts/AuthContext.jsx";
import { icons } from "../constants/icons.jsx";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const {login} = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de connexion (tu pourras remplacer par un vrai appel API plus tard)
    setTimeout(() => {
      const fakeUser = {
        id: 1,
        name: "Alice Martin",
        email: email || "alice@example.com",
        role: "Administrateur",
        avatar: "AM"
      };

      login(fakeUser);
      navigate("/");        // Redirige vers le dashboard
      setLoading(false);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Logo + Titre */}
        <div className="text-center mb-10">
          <div className="mx-auto w-14 h-14 bg-[#1a56db] rounded-2xl flex items-center justify-center mb-5">
            {icons.logo}
          </div>
          <h1 className="text-3xl font-bold text-[#0f172a]">AdminPanel</h1>
          <p className="text-[#64748b] mt-2">Accédez à votre espace d'administration</p>
        </div>

        {/* Card de connexion */}
        <div className="bg-white border border-[#e2e8f0] rounded-3xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#64748b] mb-2">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#1a56db] bg-[#f8fafc] text-[#0f172a]"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-[#64748b]">
                  Mot de passe
                </label>
                <a href="#" className="text-sm text-[#1a56db] hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#1a56db] bg-[#f8fafc] text-[#0f172a]"
              />
            </div>

            {/* Bouton Connexion */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-[#1a56db] hover:bg-[#1e40af] transition-colors text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center disabled:opacity-70"
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>
        </div>

        {/* Lien en bas */}
        <p className="text-center text-sm text-[#64748b] mt-8">
          Pas encore de compte ?{" "}
          <a href="#" className="text-[#1a56db] font-medium hover:underline">
            Contacter l'administrateur
          </a>
        </p>
      </div>
    </div>
  );
}