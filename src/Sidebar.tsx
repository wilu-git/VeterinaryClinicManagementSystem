import { type PageName } from './data';

interface SidebarProps {
  currentPage: PageName;
  navigate: (page: PageName) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M2 4a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm0 9a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3zm9-9a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V4zm0 9a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3z" />
    </svg>
  )},
  { id: 'appointments', label: 'Appointments', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  )},
  { id: 'calendar', label: 'Calendar', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6zm-1 4a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  )},
  { id: 'pet-patients', label: 'Pet Patients', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  )},
  { id: 'owners', label: 'Owners', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  )},
  { id: 'medical-records', label: 'Medical Records', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  )},
  { id: 'prescriptions', label: 'Prescriptions', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
    </svg>
  )},
  { id: 'invoices', label: 'Invoices', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  )},
  { id: 'reports', label: 'Reports', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  )},
  { id: 'settings', label: 'Settings', icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  )},
] as const;

const speciesEmoji: Record<string, string> = {
  Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐇', Hamster: '🐹', Other: '🐾',
};
export { speciesEmoji };

export default function Sidebar({ currentPage, navigate, collapsed }: SidebarProps) {
  const rootPage = (page: PageName): PageName => {
    if (page === 'appointment-detail') return 'appointments';
    if (page === 'pet-profile') return 'pet-patients';
    if (page === 'owner-profile') return 'owners';
    if (page === 'medical-record-detail') return 'medical-records';
    if (page === 'invoice-detail') return 'invoices';
    return page;
  };

  const activePage = rootPage(currentPage);

  return (
    <aside
      className="flex flex-col h-full transition-all duration-200"
      style={{ width: collapsed ? 64 : 240, background: '#0f172a', flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 shrink-0">
          <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div className="text-white font-bold text-base leading-tight">PetDex</div>
            <div className="text-blue-400 text-xs font-medium">Veterinary Clinic</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id as PageName)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-white/8 hover:text-slate-100'
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-2 pb-4 pt-2 border-t border-white/10">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            JS
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">Dr. Jane Smith</div>
              <div className="text-slate-400 text-xs truncate">Veterinarian</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
