import { useState } from 'react';
import { type Navigate, medicalRecords, getPet, getOwner } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

export default function MedicalRecords({ navigate }: Props) {
  const [search, setSearch] = useState('');

  const filtered = medicalRecords.filter((r) => {
    const pet = getPet(r.petId);
    const owner = getOwner(r.ownerId);
    const q = search.toLowerCase();
    return !q || r.id.toLowerCase().includes(q) || pet?.name.toLowerCase().includes(q) || owner?.name.toLowerCase().includes(q) || r.chiefComplaint.toLowerCase().includes(q) || r.assessment.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Medical Records</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} records found</p>
        </div>
        <button onClick={() => navigate('medical-record-detail', { new: '1' })} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          New Medical Record
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex-1">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by pet, owner, diagnosis..." className="bg-transparent text-sm outline-none flex-1 text-slate-700 placeholder-slate-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3.5">Record #</th>
                <th className="text-left px-5 py-3.5">Date</th>
                <th className="text-left px-5 py-3.5">Pet</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Owner</th>
                <th className="text-left px-5 py-3.5 hidden sm:table-cell">Chief Complaint</th>
                <th className="text-left px-5 py-3.5 hidden xl:table-cell">Assessment</th>
                <th className="text-left px-5 py-3.5 hidden lg:table-cell">Veterinarian</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-16 text-center">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-sm font-medium text-slate-600">No medical records found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search or create a new record</p>
                  </td>
                </tr>
              ) : filtered.map((r) => {
                const pet = getPet(r.petId);
                const owner = getOwner(r.ownerId);
                return (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <button onClick={() => navigate('medical-record-detail', { id: r.id })} className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">{r.id}</button>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{r.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{pet?.species === 'Cat' ? '🐈' : '🐕'}</span>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{pet?.name}</div>
                          <div className="text-xs text-slate-400">{pet?.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">{owner?.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600 hidden sm:table-cell max-w-xs truncate">{r.chiefComplaint}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden xl:table-cell max-w-xs truncate">{r.assessment}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden lg:table-cell">{r.veterinarian}</td>
                    <td className="px-5 py-4"><Badge label={r.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button onClick={() => navigate('medical-record-detail', { id: r.id })} className="text-xs text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium">View</button>
                        <button className="text-xs text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium">Print</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
          <span className="text-sm text-slate-500">Showing {filtered.length} of {medicalRecords.length} records</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm border border-blue-600 rounded-lg bg-blue-600 text-white cursor-pointer font-medium">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
