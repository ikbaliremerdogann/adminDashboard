import React, { useState } from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const stats = [
  {title:'Toplam Kullanıcı',value:'12,847',icon:Users ,bg:'bg-blue-50 dark:bg-blue-900/20',color:'text-blue-500'},
  {title:'Aktif Kullanıcılar',value:'9,214',icon: UserCheck,bg: 'bg-emerald-50 dark:bg-emerald-900/20',color: 'text-emerald-500'},
  {title:'Bu ay ',value:'1,543',icon:TrendingUp, bg:'bg-purple-50 dark:bg-purple-900/20',color:'text-purple-500'},
  {title:'Banlı',value: '312',icon: UserX,bg: 'bg-red-50 dark:bg-red-900/20',       color:'text-red-500' },
];

const allUsers = [
  {id: 1,name:'İkbal İrem Erdoğan',email: 'ikbaliremerdogan@gmail.com',role: 'Yönetici',status: 'Aktif'},
  {id: 2,name: 'Ceren Demirci',email: 'cerendemirci@gmail.com',role: 'Yazılımcı', status: 'Aktif' },
  {id: 3,name:'Ahsen Eylül Demirkan',email:'ahseneylul@gmail.com',role: 'Editör',status: 'Aktif' },
  {id: 4,name: 'İdil Salihoğulları',email: 'idilsaliogullari@gmail.com',role: 'Görüntüleyici',status:'Aktif Değil' },
  {id: 5,name:'Esra Demir', email:'esrademir@gmail.com',role: 'Müdür',status: 'Aktif' },
  {id: 6,name: 'Nazlı Yiğit',email: 'nazliyigit@gmail.com',role: 'Yazılımcı', status:'Aktif' },
  {id: 7,name: 'İklim Dinçdemir', email: 'iklimdincdemir@gmail.com',role: 'Editör',status: 'Banlı' },
  {id: 8,name: 'Ayşe Naz Fırat',email: 'aysenazfirat@gmail.com',role: 'Yönetici',status:'Aktif' },
  {id: 9,name: 'Serra Koca',email: 'serrakoca@gmail.com',role: 'Görüntüleyici',    status: 'Aktif' },
  {id: 10,name:'Ebrar Erpulat',email:'ebrarerpulat@gmail.com',role: 'Müdür',status:'Aktif Değil' },
];

function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const statusClass = (status) => {
    if (status === 'Aktif')   return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    if (status === 'Banlı')   return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
  };

  const initials = (name) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Kullanıcılar</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Platform kullanıcılarını yönet</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <input
            type="text"
            placeholder="İsim, e-posta veya rol ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {['Kullanıcı', 'E-posta', 'Rol', 'Durum'].map((h, i) => (
                  <th key={i} className="px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {initials(user.name)}
                      </div>
                      <span className="text-sm font-medium text-slate-800 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-500 dark:text-slate-400">{user.email}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-300">{user.role}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-slate-400 dark:text-slate-500 text-sm">
                    Kullanıcı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default UsersPage;
