import { useState } from 'react';
import { type PageName, type Navigate } from './data';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import AppointmentDetail from './pages/AppointmentDetail';
import Calendar from './pages/Calendar';
import PetPatients from './pages/PetPatients';
import PetProfile from './pages/PetProfile';
import Owners from './pages/Owners';
import OwnerProfile from './pages/OwnerProfile';
import MedicalRecords from './pages/MedicalRecords';
import MedicalRecordDetail from './pages/MedicalRecordDetail';
import Prescriptions from './pages/Prescriptions';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

interface Route {
  page: PageName;
  params?: Record<string, string>;
}

export default function App() {
  const [route, setRoute] = useState<Route>({ page: 'dashboard' });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate: Navigate = (page, params) => {
    setRoute({ page, params });
    // Scroll main content to top on navigation
    const main = document.getElementById('main-content');
    if (main) main.scrollTop = 0;
  };

  const renderPage = () => {
    switch (route.page) {
      case 'dashboard':
        return <Dashboard navigate={navigate} />;
      case 'appointments':
        return <Appointments navigate={navigate} />;
      case 'appointment-detail':
        return <AppointmentDetail navigate={navigate} params={route.params} />;
      case 'calendar':
        return <Calendar navigate={navigate} />;
      case 'pet-patients':
        return <PetPatients navigate={navigate} />;
      case 'pet-profile':
        return <PetProfile navigate={navigate} params={route.params} />;
      case 'owners':
        return <Owners navigate={navigate} />;
      case 'owner-profile':
        return <OwnerProfile navigate={navigate} params={route.params} />;
      case 'medical-records':
        return <MedicalRecords navigate={navigate} />;
      case 'medical-record-detail':
        return <MedicalRecordDetail navigate={navigate} params={route.params} />;
      case 'prescriptions':
        return <Prescriptions navigate={navigate} />;
      case 'invoices':
        return <Invoices navigate={navigate} />;
      case 'invoice-detail':
        return <InvoiceDetail navigate={navigate} params={route.params} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Fixed Header */}
      <Header
        currentPage={route.page}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        navigate={navigate}
      />

      {/* Body below header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentPage={route.page}
          navigate={navigate}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto"
          style={{ background: '#f8fafc' }}
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
