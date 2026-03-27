import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);   // false par défaut sur mobile

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-[#0f172a] transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-auto
      `}>
        <Sidebar 
          sidebarOpen={true}           // Toujours "ouverte" visuellement sur desktop
          setSidebarOpen={setSidebarOpen}
          isMobile={window.innerWidth < 768} // On peut améliorer ça plus tard
        />
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        <main className="flex-1 p-4 md:p-7 max-w-275 mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}