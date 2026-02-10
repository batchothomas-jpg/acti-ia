import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }
function handleLogout() {
  setIsSidebarOpen(false);
}

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar onMenuClick={toggleSidebar} />

      <div className="flex h-[calc(100vh-56px)] relative">
        {isSidebarOpen && (
          <Sidebar
            onClose={closeSidebar}
            onLogout={handleLogout}
          />
        )}


        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
