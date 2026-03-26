import { useState } from "react";
import { COLORS } from "../constants/colors";
import Avatar from "../components/ui/Avatar";
import { icons } from "../constants/icons";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const {user} = useAuth()

  const tabs = [
    { id: "profile", label: "Profil" },
    { id: "security", label: "Sécurité" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Apparence" }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Paramètres</h1>
        <p className="text-[#64748b] mt-1">Gérez votre compte et vos préférences</p>
      </div>

      {/* Tabs */}
      <div className="inline-flex bg-[#e2e8f0] p-1 rounded-2xl mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? "bg-white shadow-sm text-[#0f172a]" 
                : "text-[#64748b] hover:bg-white/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Avatar initials="AN" index={0} size={80} />
              <button style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: COLORS.primary, border: "2px solid #fff", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                {icons.camera}
              </button>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: COLORS.text }}>Andry Nizwami Ibrahim</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.textMuted }}>Administrateur</p>
            </div>
            <div style={{ width: "100%", borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
              {[["Membre depuis", "Jan 2024"], ["Dernière connexion", "Aujourd'hui"], ["Projets actifs", "7"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: COLORS.textMuted }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 600, color: COLORS.text }}>Informations personnelles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[["Prénom", user.name.split(' ').slice(1,3).join(' ')], ["Nom", user.name.split(' ')[0]]].map(([label, val]) => (
                <div key={label}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: COLORS.textMuted, marginBottom: 6 }}>{label}</label>
                  <input defaultValue={val} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, color: COLORS.text, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            {[["Email", user.email], ["Poste", user.role], ["Entreprise", "Nada"]].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: COLORS.textMuted, marginBottom: 6 }}>{label}</label>
                <input defaultValue={val} style={{ width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, color: COLORS.text, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button style={{ padding: "10px 20px", background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Enregistrer</button>
              <button style={{ padding: "10px 20px", background: "transparent", color: COLORS.textMuted, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, cursor: "pointer" }}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, maxWidth: 520 }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 600, color: COLORS.text }}>Changer le mot de passe</h2>
          {["Mot de passe actuel", "Nouveau mot de passe", "Confirmer le nouveau mot de passe"].map(label => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: COLORS.textMuted, marginBottom: 6 }}>{label}</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "9px 12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <button style={{ padding: "10px 20px", background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 8 }}>Mettre à jour</button>
        </div>
      )}

      {activeTab === "notifications" && (
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, maxWidth: 520 }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 600, color: COLORS.text }}>Préférences de notifications</h2>
          {[
            ["Nouvelles inscriptions", "Notifier à chaque nouvel utilisateur"],
            ["Rapports hebdomadaires", "Résumé chaque lundi matin"],
            ["Alertes système", "Incidents et pannes"],
            ["Mises à jour produit", "Nouvelles fonctionnalités"],
          ].map(([title, desc], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: COLORS.text }}>{title}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: COLORS.textMuted }}>{desc}</p>
              </div>
              <ToggleSwitch defaultOn={i < 2} />
            </div>
          ))}
        </div>
      )}

      {activeTab === "appearance" && (
        <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, maxWidth: 520 }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 600, color: COLORS.text }}>Apparence</h2>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: COLORS.textMuted }}>Thème d'interface</p>
          <div style={{ display: "flex", gap: 12 }}>
            {["Light", "Dark", "Système"].map((t, i) => (
              <div key={t} style={{ flex: 1, border: `2px solid ${i === 0 ? COLORS.primary : COLORS.border}`, borderRadius: 10, padding: 12, cursor: "pointer", textAlign: "center" }}>
                <div style={{ height: 48, borderRadius: 6, background: i === 1 ? "#0f172a" : i === 2 ? "linear-gradient(135deg, #fff 50%, #0f172a 50%)" : "#f8fafc", border: `1px solid ${COLORS.border}`, marginBottom: 8 }} />
                <span style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? COLORS.primary : COLORS.textMuted }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}

function ToggleSwitch({ defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div onClick={() => setOn(!on)} style={{ width: 40, height: 22, borderRadius: 11, background: on ? COLORS.primary : COLORS.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
    </div>
  );
}