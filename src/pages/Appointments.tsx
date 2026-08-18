import { useState } from 'react';
import { type Navigate, appointments, getPet, getOwner, type AppointmentStatus } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

const statuses: AppointmentStatus[] = ['Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show'];
const types = ['All Types', 'Routine Checkup', 'Vaccination', 'Follow-up', 'Surgery', 'Dental', 'Emergency', 'Grooming'];
const vets = ['All Vets', 'Dr. Jane Smith', 'Dr. Ramon Cruz', 'Dr. Elena Reyes'];

export default function Appointments({ navigate }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [vetFilter, setVetFilter] = useState('All Vets');

  const filtered = appointments.filter((a) => {
    const pet = getPet(a.petId);
    const owner = getOwner(a.ownerId);
    const q = search.toLowerCase();
    const matchSearch = !q || a.id.toLowerCase().includes(q) || (pet?.name.toLowerCase().includes(q)) || (owner?.name.toLowerCase().includes(q)) || a.type.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchType = typeFilter === 'All Types' || a.type === typeFilter;
    const matchVet = vetFilter === 'All Vets' || a.veterinarian === vetFilter;
    return matchSearch && matchStatus && matchType && matchVet;
  });

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} appointments found</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex-1 min-w-48">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search appointments..." className="bg-transparent text-sm outline-none flex-1 text-slate-700 placeholder-slate-400" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none cursor-pointer">
          <option value="All">All Statuses</option>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none cursor-pointer">
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={vetFilter} onChange={(e) => setVetFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none cursor-pointer">
          {vets.map((v) => <option key={v}>{v}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3.5">Appointment ID</th>
                <th className="text-left px-5 py-3.5">Date & Time</th>
                <th className="text-left px-5 py-3.5">Pet</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Owner</th>
                <th className="text-left px-5 py-3.5 hidden lg:table-cell">Veterinarian</th>
                <th className="text-left px-5 py-3.5 hidden sm:table-cell">Type</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="text-slate-400 mb-1">
                      <svg viewBox="0 0 40 40" fill="currentColor" className="w-10 h-10 mx-auto mb-3 text-slate-200">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600">No appointments found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : filtered.map((a) => {
                const pet = getPet(a.petId);
                const owner = getOwner(a.ownerId);
                return (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <button onClick={() => navigate('appointment-detail', { id: a.id })} className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">{a.id}</button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-900">{a.date}</div>
                      <div className="text-xs text-slate-500">{a.time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{pet?.species === 'Cat' ? '🐈' : '🐕'}</span>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{pet?.name}</div>
                          <div className="text-xs text-slate-500">{pet?.breed}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">{owner?.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden lg:table-cell">{a.veterinarian}</td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden sm:table-cell">{a.type}</td>
                    <td className="px-5 py-4"><Badge label={a.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => navigate('appointment-detail', { id: a.id })} className="text-xs text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer font-medium">View</button>
                        {a.status === 'Confirmed' && (
                          <button className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer font-medium">Start</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-sm text-slate-500">Showing {filtered.length} of {appointments.length} appointments</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-500 cursor-pointer hover:bg-slate-50">Previous</button>
            <button className="px-3 py-1.5 text-sm border border-blue-600 rounded-lg bg-blue-600 text-white cursor-pointer font-medium">1</button>
            <button className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-500 cursor-pointer hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
