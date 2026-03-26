import { useEffect, useState } from "react";
import { AlertTriangle, X } from "../icons";   // On utilisera ces deux icônes

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Êtes-vous sûr ?",
  message = "Cette action est irréversible.",
  confirmText = "Supprimer",
  cancelText = "Annuler",
  type = "danger",           // "danger" | "warning" | "info"
  loading = false,
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Gestion animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  // Fermeture avec Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const typeStyles = {
    danger: {
      iconColor: "text-red-600",
      buttonColor: "bg-red-600 hover:bg-red-700",
      icon: <AlertTriangle size={28} />,
    },
    warning: {
      iconColor: "text-amber-600",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      icon: <AlertTriangle size={28} />,
    },
    info: {
      iconColor: "text-blue-600",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      icon: <AlertTriangle size={28} />,
    },
  };

  const style = typeStyles[type] || typeStyles.danger;

  return (
    <div 
      className={`fixed inset-0 z-70 flex items-center justify-center p-4 transition-all duration-300
        ${isVisible ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300
          ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={style.iconColor}>
              {style.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-8 text-center">
          <p className="text-gray-600 text-[15px] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer avec boutons */}
        <div className="px-6 py-5 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3.5 border border-gray-300 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-70"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3.5 text-white font-medium rounded-2xl transition-all active:scale-[0.985] ${style.buttonColor} disabled:opacity-70 flex items-center justify-center gap-2`}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}