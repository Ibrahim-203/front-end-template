import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "../icons";

const toastTypes = {
  success: { icon: <CheckCircle size={20} />, bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", iconColor: "text-emerald-600" },
  error:   { icon: <AlertCircle size={20} />, bg: "bg-red-50 border-red-200",     text: "text-red-800",     iconColor: "text-red-600" },
  warning: { icon: <AlertTriangle size={20} />, bg: "bg-amber-50 border-amber-200", text: "text-amber-800",   iconColor: "text-amber-600" },
  info:    { icon: <Info size={20} />, bg: "bg-blue-50 border-blue-200",       text: "text-blue-800",    iconColor: "text-blue-600" },
};

export default function Toast({ message, type = "success", onClose, duration = 4500 }) {
  const style = toastTypes[type] || toastTypes.success;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-lg min-w-75 transition-all duration-300 ${style.bg}`}>
      <div className={style.iconColor}>{style.icon}</div>
      
      <div className="flex-1 pr-2">
        <p className={`text-sm font-medium ${style.text}`}>{message}</p>
      </div>

      <button 
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        <X size={18} />
      </button>
    </div>
  );
}