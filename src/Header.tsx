import { useState } from 'react';
import { type PageName, type Navigate, owners, pets, appointments, medicalRecords, invoices } from './data';

interface HeaderProps {
  currentPage: PageName;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  navigate: Navigate;
}

const pageTitles: Record<string, string[]> = {
  'dashboard': ['Home', 'Dashboard'],
  'appointments': ['Home', 'Appointments'],
  'appointment-detail': ['Home', 'Appointments', 'Appointment Details'],
  'calendar': ['Home', 'Calendar'],
  'pet-patients': ['Home', 'Pet Patients'],
  'pet-profile': ['Home', 'Pet Patients', 'Pet Profile'],
  'owners': ['Home', 'Owners'],
  'owner-profile': ['Home', 'Owners', 'Owner Profile'],
  'medical-records': ['Home', 'Medical Records'],
  'medical-record-detail': ['Home', 'Medical Records', 'Record Details'],
  'prescriptions': ['Home', 'Prescriptions'],
  'invoices': ['Home', 'Invoices'],
  'invoice-detail': ['Home', 'Invoices', 'Invoice Details'],
  'reports': ['Home', 'Reports'],
  'settings': ['Home', 'Settings'],
};

const allSearchResults = [
  ...pets.map((p) => ({ type: 'Pet', label: `${p.name} — ${p.id}`, id: p.id, page: 'pet-profile' as PageName })),
  ...owners.map((o) => ({ type: 'Owner', label: `${o.name} — ${o.id}`, id: o.id, page: 'owner-profile' as PageName })),
  ...appointments.map((a) => ({ type: 'Appointment', label: `${a.id} — ${a.type}`, id: a.id, page: 'appointment-detail' as PageName })),
  ...medicalRecords.map((r) => ({ type: 'Medical Record', label: `${r.id} — ${r.chiefComplaint.slice(0, 30)}`, id: r.id, page: 'medical-record-detail' as PageName })),
  ...invoices.map((i) => ({ type: 'Invoice', label: `${i.id}`, id: i.id, page: 'invoice-detail' as PageName })),
];

export default function Header({ currentPage, onToggleSidebar, navigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const breadcrumbs = pageTitles[currentPage] ?? ['Home'];

  const filtered = searchQuery.length > 1
    ? allSearchResults.filter((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  const notifications = [
    { id: 1, text: 'Appointment APT-2026-001 starting in 30 minutes', time: '8:30 AM', read: false },
    { id: 2, text: 'Invoice INV-2026-447 is overdue', time: 'Yesterday', read: false },
    { id: 3, text: "Buddy's follow-up appointment is tomorrow", time: 'Yesterday', read: true },
    { id: 4, text: 'New medical record MR-2026-003 created', time: '2 days ago', read: true },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4 z-40 relative">
      {/* Toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-300">/</span>}
            <span className={i === breadcrumbs.length - 1 ? 'text-slate-900 font-medium truncate' : 'text-slate-500 hidden sm:block'}>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Search */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-64">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
            placeholder="Search PetDex..."
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
          />
        </div>
        {searchOpen && searchQuery.length > 1 && filtered.length > 0 && (
          <div className="absolute top-full mt-1 right-0 w-80 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
            {['Pet', 'Owner', 'Appointment', 'Medical Record', 'Invoice'].map((type) => {
              const group = filtered.filter((r) => r.type === type);
              if (!group.length) return null;
              return (
                <div key={type}>
                  <div className="px-3 py-1.5 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wide">{type}s</div>
                  {group.map((item) => (
                    <button
                      key={item.id}
                      onMouseDown={() => { navigate(item.page, { id: item.id }); setSearchQuery(''); setSearchOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-slate-400">#</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-2.83-2h5.66A3 3 0 0110 18z" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
        {notifOpen && (
          <div className="absolute top-full mt-1 right-0 w-80 bg-white rounded-xl border border-slate-200 shadow-lg z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-900">Notifications</span>
              <button className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer">Mark all read</button>
            </div>
            {notifications.map((n) => (
              <div key={n.id} className={`px-4 py-3 border-b border-slate-50 ${n.read ? '' : 'bg-blue-50/50'}`}>
                <p className="text-sm text-slate-700 leading-snug">{n.text}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            ))}
            <div className="px-4 py-2">
              <button className="text-xs text-blue-600 hover:text-blue-700 w-full text-center cursor-pointer">View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
          JS
        </div>
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium text-slate-900 leading-tight">Dr. Jane Smith</div>
          <div className="text-xs text-slate-500 leading-tight">Veterinarian</div>
        </div>
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 hidden md:block">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </header>
  );
}
