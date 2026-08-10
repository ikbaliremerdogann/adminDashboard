import { Zap, BarChart3, Calendar, CreditCard, FileText, LayoutDashboard, MessageSquare, Package, Settings, ShoppingBag, Users, ChevronDown } from "lucide-react";
import profilFoto from '../../assets/profil.jpeg';
import React, { useState } from 'react';

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", active: true, badge: "New" },
  { id: "analytics", icon: BarChart3, label: "Analytics", submenu: [{ id: "overview", label: "Overview" }, { id: "reports", label: "Reports" }, { id: "insights", label: "Insights" }] },
  { id: "users", icon: Users, label: "Users", count: "2.4k", submenu: [{ id: "users", label: "All Users" }, { id: "roles", label: "Roles & Permissions" }, { id: "activity", label: "User Activity" }] },
  { id: "ecommerse", icon: ShoppingBag, label: "E-commerce", submenu: [{ id: "products", label: "Products" }, { id: "orders", label: "Orders" }, { id: "customers", label: "Customers" }] },
  { id: "inventory", icon: Package, label: "Inventory", count: "847" },
  { id: "transactions", icon: CreditCard, label: "Transactions" },
  { id: "messages", icon: MessageSquare, label: "Messages", badge: "12" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

  const toggleExpended = (itemid) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemid)) newExpanded.delete(itemid);
    else newExpanded.add(itemid);
    setExpandedItems(newExpanded);
  };

  return (
    // Sidebar her zaman flex-col olarak render edilir.
    // Görünürlük kararı tamamen App.jsx'teki wrapper div'lere bırakıldı.
    <div
      className={`
        ${collapsed ? "w-20" : "w-72"}
        h-full flex flex-col
        transition-all duration-300 ease-in-out
        bg-white dark:bg-slate-900
        border-r border-slate-200 dark:border-slate-800
      `}
    >
      {/* Logo Alanı */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">Nexus</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigasyon Menüsü */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                currentPage === item.id || item.active
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
              onClick={() => {
                if (item.submenu) toggleExpended(item.id);
                else onPageChange(item.id);
              }}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="font-medium truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full shrink-0">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="px-2 py-0.5 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full shrink-0">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!collapsed && item.submenu && (
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    expandedItems.has(item.id) ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Alt Menü */}
            {!collapsed && item.submenu && expandedItems.has(item.id) && (
              <div className="ml-8 mt-2 space-y-1">
                {item.submenu.map((subitem) => (
                  <button
                    key={subitem.id}
                    onClick={() => onPageChange(subitem.id)}
                    className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all"
                  >
                    {subitem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Kullanıcı Profili */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 shrink-0">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img src={profilFoto} alt="user" className="w-10 h-10 rounded-full ring-2 ring-blue-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">İkbal İrem Erdoğan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;