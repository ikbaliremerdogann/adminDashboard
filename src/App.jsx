import React, { useState, useEffect } from 'react';
import Sidebar from "./components/layout/Sidebar";
import Header from "./Header.jsx";
import Dashboard from './components/layout/Dashboard.jsx';

function App() {
  
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      
      setMobileSidebarOpen(prev => !prev);
    } else {
      
      setSideBarCollapsed(prev => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">

        
        <div className="hidden md:block h-full shrink-0">
          <Sidebar
            collapsed={sideBarCollapsed}
            onToggle={handleToggleSidebar}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

       
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            
            <div className="relative z-10 h-full">
              <Sidebar
                collapsed={false}
                onToggle={() => setMobileSidebarOpen(false)}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  setMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header
            sideBarCollapsed={sideBarCollapsed}
            onToggleSidebar={handleToggleSidebar}
          />

          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard />}
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

export default App;