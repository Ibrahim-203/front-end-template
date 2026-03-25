import { COLORS } from "../constants/colors";
// import { icons } from "../constants/icons.jsx";
import KpiCard from "../components/ui/KpiCard";
import MiniBarChart from "../components/ui/MiniBarChart";
import Avatar from "../components/ui/Avatar";

export default function DashboardPage() {
  const revenueData = [32, 45, 38, 60, 55, 72, 68, 80, 74, 90, 85, 98];
  const usersData = [10, 18, 14, 22, 19, 28, 25, 35, 30, 40, 38, 45];

  const activities = [
    { user: "Alice Martin", action: "a créé un nouvel article", time: "il y a 2 min", avatar: "AM", idx: 0 },
    { user: "Bruno Leclerc", action: "a mis à jour les paramètres", time: "il y a 15 min", avatar: "BL", idx: 1 },
    { user: "David Nguyen", action: "a ajouté un utilisateur", time: "il y a 1h", avatar: "DN", idx: 3 },
    { user: "Emma Petit", action: "a exporté un rapport", time: "il y a 3h", avatar: "EP", idx: 4 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
        <p className="text-[#64748b] mt-1">Vue d'ensemble de votre activité</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KpiCard label="Revenus totaux" value="€84,250" sub="+12.5% ce mois" up={true} />
        <KpiCard label="Utilisateurs actifs" value="2,341" sub="+8.2% ce mois" up={true} />
        <KpiCard label="Taux de conversion" value="3.6%" sub="-0.4% ce mois" up={false} />
        <KpiCard label="Tickets ouverts" value="18" sub="+3 aujourd'hui" up={false} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-[#64748b] font-medium">Revenus</p>
              <p className="text-2xl font-bold text-[#0f172a] mt-1">€84,250</p>
            </div>
            <span className="text-xs font-semibold bg-[#eff6ff] text-[#1a56db] px-3 py-1 rounded-lg">12 derniers mois</span>
          </div>
          <MiniBarChart data={revenueData} color={COLORS.primary} />
          <div className="flex justify-between mt-3 text-xs text-[#94a3b8]">
            {["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-[#64748b] font-medium">Nouveaux utilisateurs</p>
              <p className="text-2xl font-bold text-[#0f172a] mt-1">+2,341</p>
            </div>
            <span className="text-xs font-semibold bg-[#ecfdf5] text-[#059669] px-3 py-1 rounded-lg">12 derniers mois</span>
          </div>
          <MiniBarChart data={usersData} color={COLORS.success} />
          <div className="flex justify-between mt-3 text-xs text-[#94a3b8]">
            {["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-[#0f172a] mb-5">Dernières activités</h2>
        
        {activities.map((item, i) => (
          <div 
            key={i}
            className={`flex items-center gap-4 py-4 ${i < activities.length - 1 ? "border-b border-[#e2e8f0]" : ""}`}
          >
            <Avatar initials={item.avatar} index={item.idx} size={40} />
            <div className="flex-1">
              <span className="font-semibold text-[#0f172a]">{item.user}</span>
              <span className="text-[#64748b]"> {item.action}</span>
            </div>
            <span className="text-sm text-[#94a3b8] whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}