import { useState } from "react";
import Avatar from "../components/ui/Avatar";
import StatusBadge from "../components/ui/StatusBadge";
import DataTable from "../components/ui/DataTable";

import { USERS } from "../constants/usersMockData.js";
import EyeIcon from "../components/icons/EyeIcon.jsx";
import EditIcon from "../components/icons/EditIcon.jsx";
import TrashIcon from "../components/icons/TrashIcon.jsx";
import PlusIcon from "../components/icons/PlusIcon.jsx";
import Modal from "../components/ui/Modal.jsx";
import ConfirmModal from "../components/ui/ConfirmModal.jsx";
import { useToast } from "../contexts/ToastContext.jsx";

export default function UsersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { success } = useToast()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const columns = [
    {
      key: "name",
      label: "Utilisateur",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar initials={row.avatar} index={row.id - 1} size={42} />
          <div>
            <p className="font-semibold text-gray-900">{row.name}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Rôle",
      render: (row) => (
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
          {row.role}
        </span>
      ),
    },
    {
      key: "status",
      label: "Statut",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "joined",
      label: "Date d'inscription",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg text-[#64748b] hover:text-[#0f172a]"><EyeIcon size={14} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-lg text-[#64748b] hover:text-[#0f172a]"><EditIcon size={14} /></button>
          <button
            onClick={() => {
              setUserToDelete(row);
              setIsDeleteModalOpen(true);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg text-red-500 hover:text-red-600"><TrashIcon size={14} /></button>
        </div>
      ),
    },
  ];


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

        <DataTable
          columns={columns}
          data={USERS}
          keyField="id"
          itemsPerPage={5}
          searchable={true}
          searchPlaceholder="Rechercher par nom, email ou rôle..."
          onRowClick={(row) => console.log("Ligne cliquée :", row)}
        />

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
                success("Utilisateur ajouté avec succès ! (simulation)");
                setIsAddModalOpen(false);
              }}
              className="flex-1 py-3 bg-[#1a56db] hover:bg-[#1e40af] text-white rounded-2xl font-medium transition-colors"
            >
              Créer l'utilisateur
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={() => {
          console.log("Suppression de l'utilisateur :", userToDelete?.name);
          // Ici tu feras plus tard l'appel API
          alert(`Utilisateur ${userToDelete?.name} supprimé !`);
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        title="Supprimer l'utilisateur"
        message={`Êtes-vous sûr de vouloir supprimer ${userToDelete?.name} ? Cette action est irréversible.`}
        confirmText="Oui, supprimer"
        type="danger"
      />

    </div>
  );
}