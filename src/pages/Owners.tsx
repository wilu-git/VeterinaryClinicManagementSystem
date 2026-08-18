import { useState } from 'react';
import { type Navigate, owners, getOwnerPets } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

export default function Owners({ navigate }: Props) {
  const [search, setSearch] = useState('');

  const filtered = owners.filter((o) => {
    const q = search.toLowerCase();
    return !q || o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.phone.includes(q) || o.email.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Owners</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} owners registered</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Register New Owner
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex-1">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, phone, email..." className="bg-transparent text-sm outline-none flex-1 text-slate-700 placeholder-slate-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3.5">Owner</th>
                <th className="text-left px-5 py-3.5">Owner ID</th>
                <th className="text-left px-5 py-3.5 hidden sm:table-cell">Phone</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Email</th>
                <th className="text-left px-5 py-3.5">Pets</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((o) => {
                const ownerPets = getOwnerPets(o.id);
                return (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 shrink-0">
                          {o.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{o.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => navigate('owner-profile', { id: o.id })} className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">{o.id}</button>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden sm:table-cell">{o.phone}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">{o.email}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        {ownerPets.slice(0, 2).map((p) => (
                          <span key={p.id} className="text-base" title={p.name}>{p.species === 'Cat' ? '🐈' : '🐕'}</span>
                        ))}
                        {ownerPets.length > 2 && <span className="text-xs text-slate-400">+{ownerPets.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4"><Badge label={o.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button onClick={() => navigate('owner-profile', { id: o.id })} className="text-xs text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium">View</button>
                        <button className="text-xs text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium">Edit</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-sm text-slate-500">Showing {filtered.length} of {owners.length} owners</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm border border-blue-600 rounded-lg bg-blue-600 text-white cursor-pointer font-medium">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
