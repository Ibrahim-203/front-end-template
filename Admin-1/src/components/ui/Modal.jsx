import { useEffect, useState } from "react";
import { X } from "../icons";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",           // sm, md, lg, xl
  showCloseButton = true,
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Gestion de l'animation d'ouverture/fermeture
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Petit délai pour permettre le rendu avant l'animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Attendre la fin de l'animation avant de démonter le composant
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fermeture avec la touche Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Bloquer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div 
      className={`fixed inset-0 z-60 flex items-center justify-center p-4 transition-all duration-300
        ${isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${sizeClasses[size]} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out
          ${isVisible 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          
          {showCloseButton && (
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all active:scale-95"
            >
              <X size={22} />
            </button>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}