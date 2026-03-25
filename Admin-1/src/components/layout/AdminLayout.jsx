import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans" 
         style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? "220px" : "64px" }}
      >
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        <main className="p-7 max-w-275 mx-auto">
          <Outlet />   {/* C'est ici que les pages (Dashboard, Users, Settings...) vont s'afficher */}
        </main>
      </div>
    </div>
  );
}