import { appointments, pets, medicalRecords, invoices } from '../data';

const BarChart = ({ data, color = '#3b82f6' }: { data: { label: string; value: number }[]; color?: string }) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-1.5 h-32">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500 font-medium">{d.value}</span>
          <div className="w-full rounded-t-md transition-all" style={{ height: `${(d.value / max) * 96}px`, background: color }} />
          <span className="text-xs text-slate-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const DonutSmall = ({ segments }: { segments: { label: string; value: number; color: string }[] }) => {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const r = 40, ir = 26, cx = 48, cy = 48;
  let cum = 0;
  const slices = segments.map((d) => {
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
      <svg width="96" height="96" viewBox="0 0 96 96">
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <text x="48" y="52" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: '#0f172a' }}>{total}</text>
      </svg>
      <div className="space-y-1">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-slate-600">{s.label}</span>
            <span className="font-semibold text-slate-900 ml-auto">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Reports() {
  const totalRevenue = invoices.filter((i) => i.paymentStatus === 'Paid').reduce((s, i) => s + i.total, 0);
  const outstanding = invoices.filter((i) => i.paymentStatus !== 'Paid').reduce((s, i) => s + i.total, 0);
  const completedAppts = appointments.filter((a) => a.status === 'Completed').length;
  const newPatients = pets.filter((p) => p.status === 'Active').length;

  const apptsByDay = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 6 },
    { label: 'Thu', value: 9 },
    { label: 'Fri', value: 7 },
    { label: 'Sat', value: 3 },
  ];

  const revenueByMonth = [
    { label: 'Mar', value: 32000 },
    { label: 'Apr', value: 41000 },
    { label: 'May', value: 38000 },
    { label: 'Jun', value: 45000 },
    { label: 'Jul', value: 52000 },
    { label: 'Aug', value: 34000 },
  ];

  const apptStatusSegs = [
    { label: 'Completed', value: 12, color: '#10b981' },
    { label: 'Confirmed', value: 6, color: '#3b82f6' },
    { label: 'In Progress', value: 2, color: '#f59e0b' },
    { label: 'Cancelled', value: 2, color: '#ef4444' },
    { label: 'No Show', value: 2, color: '#f97316' },
  ];

  const speciesSegs = [
    { label: 'Dog', value: 85, color: '#3b82f6' },
    { label: 'Cat', value: 35, color: '#8b5cf6' },
    { label: 'Bird', value: 5, color: '#06b6d4' },
    { label: 'Other', value: 3, color: '#64748b' },
  ];

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-500 text-sm mt-0.5">Clinic performance overview</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none cursor-pointer">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Export PDF</button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">Export Excel</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: `₱${totalRevenue.toLocaleString()}`, sub: 'Paid invoices', change: '+12%', up: true },
          { label: 'Outstanding', value: `₱${outstanding.toLocaleString()}`, sub: 'Unpaid invoices', change: '-5%', up: false },
          { label: 'Appointments', value: completedAppts.toString(), sub: 'Completed', change: '+8%', up: true },
          { label: 'Active Patients', value: newPatients.toString(), sub: 'Registered', change: '+3', up: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs font-medium text-slate-500 mb-2">{kpi.label}</div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{kpi.value}</div>
            <div className="text-xs text-slate-400">{kpi.sub}</div>
            <div className={`text-xs font-medium mt-2 ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>{kpi.change} vs last period</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
        {/* Appointments by day */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Appointments by Day of Week</h2>
          <BarChart data={apptsByDay} color="#3b82f6" />
        </div>

        {/* Revenue by month */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Monthly Revenue (₱)</h2>
          <BarChart data={revenueByMonth.map((d) => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#10b981" />
          <p className="text-xs text-slate-400 mt-2 text-center">Values in thousands (₱000)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        {/* Appointment status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Appointment Status</h2>
          <DonutSmall segments={apptStatusSegs} />
        </div>

        {/* Species breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Patients by Species</h2>
          <DonutSmall segments={speciesSegs} />
        </div>

        {/* Common diagnoses */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900 mb-4">Top Diagnoses</h2>
          <div className="space-y-3">
            {[
              { label: 'Otitis Externa', count: 18, pct: 72 },
              { label: 'GI Issues', count: 14, pct: 56 },
              { label: 'Skin Conditions', count: 11, pct: 44 },
              { label: 'Respiratory', count: 8, pct: 32 },
              { label: 'Wellness Exam', count: 45, pct: 100 },
            ].sort((a, b) => b.count - a.count).slice(0, 5).map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">{d.label}</span>
                  <span className="text-slate-500 font-medium">{d.count}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medical records by month */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="font-semibold text-slate-900 mb-4">Medical Records Created (Last 6 Months)</h2>
        <BarChart data={[
          { label: 'Mar', value: 28 },
          { label: 'Apr', value: 35 },
          { label: 'May', value: 31 },
          { label: 'Jun', value: 42 },
          { label: 'Jul', value: 38 },
          { label: 'Aug', value: medicalRecords.length },
        ]} color="#8b5cf6" />
      </div>
    </div>
  );
}
