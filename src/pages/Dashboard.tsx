import { type Navigate, appointments, pets, medicalRecords, invoices, owners, getPet, getOwner } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

const DonutChart = () => {
  const data = [
    { label: 'Completed', value: 12, color: '#10b981' },
    { label: 'Confirmed', value: 6, color: '#3b82f6' },
    { label: 'In Progress', value: 2, color: '#f59e0b' },
    { label: 'Scheduled', value: 3, color: '#94a3b8' },
    { label: 'Cancelled', value: 1, color: '#ef4444' },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 52, ir = 34, cx = 64, cy = 64;
  let cum = 0;
  const slices = data.map((d) => {
    const start = (cum / total) * 2 * Math.PI - Math.PI / 2;
    cum += d.value;
    const end = (cum / total) * 2 * Math.PI - Math.PI / 2;
    const la = end - start > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const ix1 = cx + ir * Math.cos(start), iy1 = cy + ir * Math.sin(start);
    const ix2 = cx + ir * Math.cos(end), iy2 = cy + ir * Math.sin(end);
    return { ...d, path: `M${x1},${y1} A${r},${r} 0 ${la},1 ${x2},${y2} L${ix2},${iy2} A${ir},${ir} 0 ${la},0 ${ix1},${iy1}Z` };
  });
  return (
    <div className="flex items-center gap-4">
      <svg width="128" height="128" viewBox="0 0 128 128">
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <text x="64" y="60" textAnchor="middle" className="text-slate-900" style={{ fontSize: 20, fontWeight: 700, fill: '#0f172a' }}>24</text>
        <text x="64" y="76" textAnchor="middle" style={{ fontSize: 9, fill: '#64748b' }}>total</text>
      </svg>
      <div className="space-y-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="text-slate-600">{d.label}</span>
            <span className="text-slate-900 font-semibold ml-auto pl-2">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard({ navigate }: Props) {
  const todayAppts = appointments.filter((a) => a.date === '2026-08-18');
  const pendingAppts = appointments.filter((a) => a.status === 'Scheduled' || a.status === 'Confirmed');
  const outstanding = invoices.filter((i) => i.paymentStatus === 'Unpaid' || i.paymentStatus === 'Overdue' || i.paymentStatus === 'Partially Paid');
  const outstandingTotal = outstanding.reduce((s, i) => s + i.total, 0);

  const statCards = [
    {
      label: "Today's Appointments",
      value: '24',
      trend: '+4 from yesterday',
      trendUp: true,
      color: 'bg-blue-600',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-blue-600">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: 'Pending Appointments',
      value: pendingAppts.length.toString(),
      trend: 'Require confirmation',
      trendUp: false,
      color: 'bg-amber-500',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-amber-500">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: 'Active Pet Patients',
      value: '128',
      trend: '+12 this month',
      trendUp: true,
      color: 'bg-emerald-500',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-emerald-500">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      label: 'Outstanding Balance',
      value: `₱${outstandingTotal.toLocaleString()}`,
      trend: `${outstanding.length} unpaid invoices`,
      trendUp: false,
      color: 'bg-red-500',
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-red-500">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    { label: 'New Appointment', page: 'appointments' as const, color: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { label: 'Register Pet', page: 'pet-patients' as const, color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
    { label: 'Register Owner', page: 'owners' as const, color: 'bg-violet-600 hover:bg-violet-700 text-white' },
    { label: 'Medical Record', page: 'medical-records' as const, color: 'bg-amber-600 hover:bg-amber-700 text-white' },
    { label: 'Prescription', page: 'prescriptions' as const, color: 'bg-cyan-600 hover:bg-cyan-700 text-white' },
    { label: 'Create Invoice', page: 'invoices' as const, color: 'bg-rose-600 hover:bg-rose-700 text-white' },
  ];

  return (
    <div className="p-6 min-h-full bg-slate-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Good morning, Dr. Jane Smith — here is today's clinic overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{card.icon}</div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{card.value}</div>
            <div className="text-sm text-slate-500">{card.label}</div>
            <div className={`text-xs mt-2 font-medium ${card.trendUp ? 'text-emerald-600' : 'text-slate-400'}`}>{card.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">{"Today's Schedule"}</h2>
            <button onClick={() => navigate('appointments')} className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 font-medium border-b border-slate-100">
                  <th className="text-left px-5 py-3">Time</th>
                  <th className="text-left px-5 py-3">Pet</th>
                  <th className="text-left px-5 py-3 hidden sm:table-cell">Owner</th>
                  <th className="text-left px-5 py-3 hidden md:table-cell">Veterinarian</th>
                  <th className="text-left px-5 py-3">Type</th>
                  <th className="text-left px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppts.map((a) => {
                  const pet = getPet(a.petId);
                  const owner = getOwner(a.ownerId);
                  return (
                    <tr
                      key={a.id}
                      onClick={() => navigate('appointment-detail', { id: a.id })}
                      className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3 text-sm font-medium text-slate-900">{a.time}</td>
                      <td className="px-5 py-3 text-sm text-slate-700">{pet?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell">{owner?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-500 hidden md:table-cell">{a.veterinarian}</td>
                      <td className="px-5 py-3 text-sm text-slate-600">{a.type}</td>
                      <td className="px-5 py-3"><Badge label={a.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Appointment Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Appointment Status</h2>
            <DonutChart />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.page)}
                  className={`text-xs font-medium px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-center ${a.color}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Medical Records */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Recent Medical Records</h2>
            <button onClick={() => navigate('medical-records')} className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">View all</button>
          </div>
          <div className="divide-y divide-slate-50">
            {medicalRecords.map((r) => {
              const pet = getPet(r.petId);
              return (
                <div
                  key={r.id}
                  onClick={() => navigate('medical-record-detail', { id: r.id })}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg shrink-0">
                    {pet?.species === 'Cat' ? '🐈' : '🐕'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900">{pet?.name} <span className="text-slate-400 font-normal">— {r.id}</span></div>
                    <div className="text-xs text-slate-500 truncate">{r.chiefComplaint}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-500">{r.date}</div>
                    <div className="text-xs text-slate-400">{r.veterinarian}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Recent Patients</h2>
            <button onClick={() => navigate('pet-patients')} className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">View all</button>
          </div>
          <div className="space-y-3">
            {pets.slice(0, 4).map((p) => {
              const owner = owners.find((o) => o.id === p.ownerId);
              return (
                <div
                  key={p.id}
                  onClick={() => navigate('pet-profile', { id: p.id })}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-xl shrink-0">
                    {p.species === 'Cat' ? '🐈' : '🐕'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-500 truncate">{p.breed} · {owner?.name}</div>
                  </div>
                  <Badge label={p.status} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Recent Invoices</h2>
            <button onClick={() => navigate('invoices')} className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 font-medium border-b border-slate-100">
                  <th className="text-left px-5 py-3">Invoice</th>
                  <th className="text-left px-5 py-3 hidden sm:table-cell">Owner</th>
                  <th className="text-left px-5 py-3 hidden sm:table-cell">Pet</th>
                  <th className="text-right px-5 py-3">Amount</th>
                  <th className="text-left px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => {
                  const owner = getOwner(inv.ownerId);
                  const pet = getPet(inv.petId);
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => navigate('invoice-detail', { id: inv.id })}
                      className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer"
                    >
                      <td className="px-5 py-3 text-sm font-medium text-blue-600">{inv.id}</td>
                      <td className="px-5 py-3 text-sm text-slate-600 hidden sm:table-cell">{owner?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell">{pet?.name}</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-semibold text-right">₱{inv.total.toLocaleString()}</td>
                      <td className="px-5 py-3"><Badge label={inv.paymentStatus} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
