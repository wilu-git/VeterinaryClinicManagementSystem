import { useState } from 'react';
import { type Navigate, prescriptions, getPet, getOwner } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

export default function Prescriptions({ navigate }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = prescriptions.filter((rx) => {
    const pet = getPet(rx.petId);
    const owner = getOwner(rx.ownerId);
    const q = search.toLowerCase();
    const matchSearch = !q || rx.id.toLowerCase().includes(q) || pet?.name.toLowerCase().includes(q) || owner?.name.toLowerCase().includes(q) || rx.medications.some((m) => m.name.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'All' || rx.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prescriptions</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} prescriptions</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          New Prescription
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex-1">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prescriptions..." className="bg-transparent text-sm outline-none flex-1 text-slate-700 placeholder-slate-400" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none cursor-pointer">
          {['All', 'Draft', 'Active', 'Completed', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
            <div className="text-4xl mb-3">💊</div>
            <p className="text-sm font-medium text-slate-600">No prescriptions found</p>
          </div>
        ) : filtered.map((rx) => {
          const pet = getPet(rx.petId)!;
          const owner = getOwner(rx.ownerId)!;
          return (
            <div key={rx.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-start justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center text-xl shrink-0">
                    {pet.species === 'Cat' ? '🐈' : '🐕'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">{rx.id}</span>
                      <Badge label={rx.status} />
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {pet.name} ({pet.id}) · {owner.name} · {rx.veterinarian} · {rx.date}
                    </div>
                    {rx.followUpDate && <div className="text-xs text-amber-600 mt-0.5">Follow-up: {rx.followUpDate}</div>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => navigate('pet-profile', { id: pet.id })} className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer text-slate-600 font-medium">View Patient</button>
                  <button className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer text-slate-600 font-medium">Print</button>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rx.medications.map((med, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3">
                      <div className="text-sm font-semibold text-slate-900">{med.name}</div>
                      <div className="text-xs text-slate-600 mt-1">
                        <span className="inline-flex items-center gap-1 mr-2">💊 {med.dosage}</span>
                        <span className="inline-flex items-center gap-1 mr-2">🔄 {med.frequency}</span>
                        <span className="inline-flex items-center gap-1">⏱️ {med.duration}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Route: {med.route} · Qty: {med.quantity}</div>
                      {med.instructions && <div className="text-xs text-blue-600 mt-1 italic">{med.instructions}</div>}
                    </div>
                  ))}
                </div>
                {rx.specialInstructions && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="text-xs font-semibold text-amber-800 mb-1">Special Instructions</div>
                    <div className="text-xs text-amber-700">{rx.specialInstructions}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
