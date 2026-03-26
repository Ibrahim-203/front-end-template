import { useState } from "react";
import { COLORS } from "../constants/colors";
import { icons } from "../constants/icons.jsx";
import Avatar from "../components/ui/Avatar";
import StatusBadge from "../components/ui/StatusBadge";

import { USERS } from "../constants/usersMockData.js";
import EyeIcon from "../components/icons/EyeIcon.jsx";
import EditIcon from "../components/icons/EditIcon.jsx";
import TrashIcon from "../components/icons/TrashIcon.jsx";
import PlusIcon from "../components/icons/PlusIcon.jsx";
import Modal from "../components/ui/Modal.jsx";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filtered = USERS.filter(u =>
    (filter === "All" || u.status === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Utilisateurs</h1>
          <p className="text-[#64748b] mt-1">{USERS.length} utilisateurs au total</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#1a56db] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#1e40af] transition-colors">
          <PlusIcon /> Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
        {/* Search & Filters */}
        <div className="flex items-center gap-4 p-5 border-b border-[#e2e8f0]">
          <div className="relative flex-1 max-w-xs">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]">
              {icons.search}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-11 pr-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:outline-none focus:border-[#1a56db]"
            />
          </div>

          <div className="flex gap-2">
            {["All", "Active", "Inactive", "Pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${filter === f
                    ? "bg-[#eff6ff] text-[#1a56db] border border-[#1a56db]"
                    : "bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-gray-50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc]">
                {["Utilisateur", "Rôle", "Statut", "Inscription", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className="border-t border-[#e2e8f0] hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar initials={u.avatar} index={i} size={38} />
                      <div>
                        <p className="font-semibold text-[#0f172a]">{u.name}</p>
                        <p className="text-sm text-[#64748b]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm px-3 py-1 bg-white border border-[#e2e8f0] rounded-lg text-[#64748b]">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#64748b]">{u.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-[#64748b] hover:text-[#0f172a]"><EyeIcon size={14} /></button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-[#64748b] hover:text-[#0f172a]"><EditIcon size={14} /></button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500 hover:text-red-600"><TrashIcon size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-[#64748b]">Aucun utilisateur trouvé</div>
        )}

        <div className="px-6 py-4 border-t border-[#e2e8f0] flex justify-between items-center text-sm text-[#64748b]">
          <span>{filtered.length} résultat(s)</span>
          <div className="flex gap-2">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg ${p === 1 ? "bg-[#1a56db] text-white" : "border border-[#e2e8f0] hover:bg-gray-50"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un nouvel utilisateur"
        size="md"
      >
        <div className="space-y-6 py-2">
          <div>
            <label className="block text-sm font-medium text-[#64748b] mb-2">Nom complet</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#1a56db] focus:ring-1 focus:ring-[#1a56db]"
              placeholder="Ex: Sophie Bernard"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#64748b] mb-2">Adresse email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#1a56db]"
              placeholder="sophie.bernard@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#64748b] mb-2">Rôle</label>
              <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#1a56db]">
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#64748b] mb-2">Statut</label>
              <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-2xl focus:outline-none focus:border-[#1a56db]">
                <option>Active</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 py-3 border border-[#e2e8f0] rounded-2xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                alert("Utilisateur ajouté avec succès ! (simulation)");
                setIsAddModalOpen(false);
              }}
              className="flex-1 py-3 bg-[#1a56db] hover:bg-[#1e40af] text-white rounded-2xl font-medium transition-colors"
            >
              Créer l'utilisateur
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}