import { type Navigate, getOwner, getOwnerPets, getOwnerAppointments, getOwnerInvoices } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; params?: Record<string, string>; }

export default function OwnerProfile({ navigate, params }: Props) {
  const owner = getOwner(params?.id ?? 'OWN-001') ?? getOwner('OWN-001')!;
  const ownerPets = getOwnerPets(owner.id);
  const ownerAppts = getOwnerAppointments(owner.id);
  const ownerInvoices = getOwnerInvoices(owner.id);
  const totalSpent = ownerInvoices.filter((i) => i.paymentStatus === 'Paid').reduce((s, i) => s + i.total, 0);

  return (
    <div className="min-h-full bg-slate-50">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <button onClick={() => navigate('owners')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
          Back to Owners
        </button>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 shrink-0">
            {owner.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">{owner.name}</h1>
              <Badge label={owner.status} size="md" />
            </div>
            <p className="text-slate-400 text-sm mt-0.5">Owner ID: {owner.id} · Member since {owner.registeredDate}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Edit Owner</button>
            <button onClick={() => navigate('appointments')} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">New Appointment</button>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left */}
        <div className="xl:col-span-2 space-y-4">
          {/* Registered Pets */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Registered Pets ({ownerPets.length})</h2>
              <button onClick={() => navigate('pet-patients')} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">Add Pet</button>
            </div>
            {ownerPets.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">No pets registered for this owner</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ownerPets.map((p) => (
                  <div key={p.id} onClick={() => navigate('pet-profile', { id: p.id })} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                      {p.species === 'Cat' ? '🐈' : '🐕'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-sm">{p.name}</div>
                      <div className="text-xs text-slate-500 truncate">{p.breed} · {p.sex} · {p.age}</div>
                    </div>
                    <Badge label={p.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointment History */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Appointment History ({ownerAppts.length})</h2>
            </div>
            {ownerAppts.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-400">No appointment history</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3">Date</th>
                    <th className="text-left px-5 py-3">Pet</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Type</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-left px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ownerAppts.map((a) => {
                    const pet = ownerPets.find((p) => p.id === a.petId);
                    return (
                      <tr key={a.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3 text-sm text-slate-600">{a.date} {a.time}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{pet?.name}</td>
                        <td className="px-5 py-3 text-sm text-slate-500 hidden md:table-cell">{a.type}</td>
                        <td className="px-5 py-3"><Badge label={a.status} /></td>
                        <td className="px-5 py-3">
                          <button onClick={() => navigate('appointment-detail', { id: a.id })} className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer text-slate-600 font-medium">View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Invoices */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Invoices ({ownerInvoices.length})</h2>
            </div>
            {ownerInvoices.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-400">No invoices</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3">Invoice #</th>
                    <th className="text-left px-5 py-3 hidden sm:table-cell">Date</th>
                    <th className="text-right px-5 py-3">Total</th>
                    <th className="text-left px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ownerInvoices.map((inv) => (
                    <tr key={inv.id} onClick={() => navigate('invoice-detail', { id: inv.id })} className="hover:bg-slate-50 cursor-pointer">
                      <td className="px-5 py-3 text-sm font-medium text-blue-600">{inv.id}</td>
                      <td className="px-5 py-3 text-sm text-slate-500 hidden sm:table-cell">{inv.date}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-slate-900 text-right">₱{inv.total.toLocaleString()}</td>
                      <td className="px-5 py-3"><Badge label={inv.paymentStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Contact Information</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Phone', icon: '📞', value: owner.phone },
                { label: 'Email', icon: '✉️', value: owner.email },
                { label: 'Address', icon: '📍', value: owner.address },
              ].map((f) => (
                <div key={f.label}>
                  <div className="text-xs text-slate-500 mb-1">{f.label}</div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span>{f.icon}</span>
                    <span className="text-sm">{f.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900 mb-4">Account Summary</h2>
            <div className="space-y-3">
              {[
                { label: 'Total Pets', value: ownerPets.length.toString() },
                { label: 'Total Visits', value: ownerAppts.length.toString() },
                { label: 'Total Spent', value: `₱${totalSpent.toLocaleString()}` },
                { label: 'Outstanding', value: `₱${ownerInvoices.filter((i) => i.paymentStatus !== 'Paid').reduce((s, i) => s + i.total, 0).toLocaleString()}` },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">{s.label}</span>
                  <span className="text-sm font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
