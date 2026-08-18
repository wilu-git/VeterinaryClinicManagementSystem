import { useState } from 'react';
import { type Navigate, invoices, getPet, getOwner } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

export default function Invoices({ navigate }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = invoices.filter((inv) => {
    const pet = getPet(inv.petId);
    const owner = getOwner(inv.ownerId);
    const q = search.toLowerCase();
    const matchSearch = !q || inv.id.toLowerCase().includes(q) || pet?.name.toLowerCase().includes(q) || owner?.name.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || inv.paymentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = invoices.filter((i) => i.paymentStatus === 'Paid').reduce((s, i) => s + i.total, 0);
  const totalOutstanding = invoices.filter((i) => i.paymentStatus !== 'Paid' && i.paymentStatus !== 'Cancelled').reduce((s, i) => s + i.total, 0);

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} invoices</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          New Invoice
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Total Revenue', value: `₱${totalRevenue.toLocaleString()}`, color: 'text-emerald-600' },
          { label: 'Outstanding', value: `₱${totalOutstanding.toLocaleString()}`, color: 'text-red-600' },
          { label: 'Paid Invoices', value: invoices.filter((i) => i.paymentStatus === 'Paid').length.toString(), color: 'text-slate-900' },
          { label: 'Overdue', value: invoices.filter((i) => i.paymentStatus === 'Overdue').length.toString(), color: 'text-red-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-xs text-slate-500 mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex gap-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex-1">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..." className="bg-transparent text-sm outline-none flex-1 text-slate-700 placeholder-slate-400" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white outline-none cursor-pointer">
          {['All', 'Draft', 'Unpaid', 'Partially Paid', 'Paid', 'Overdue', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-3.5">Invoice #</th>
                <th className="text-left px-5 py-3.5">Date</th>
                <th className="text-left px-5 py-3.5">Owner</th>
                <th className="text-left px-5 py-3.5 hidden md:table-cell">Pet</th>
                <th className="text-right px-5 py-3.5 hidden sm:table-cell">Subtotal</th>
                <th className="text-right px-5 py-3.5 hidden sm:table-cell">Discount</th>
                <th className="text-right px-5 py-3.5">Total</th>
                <th className="text-left px-5 py-3.5">Status</th>
                <th className="text-left px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => {
                const pet = getPet(inv.petId);
                const owner = getOwner(inv.ownerId);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <button onClick={() => navigate('invoice-detail', { id: inv.id })} className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">{inv.id}</button>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{inv.date}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{owner?.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">{pet?.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600 text-right hidden sm:table-cell">₱{inv.subtotal.toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 text-right hidden sm:table-cell">{inv.discount > 0 ? `-₱${inv.discount}` : '—'}</td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-900 text-right">₱{inv.total.toLocaleString()}</td>
                    <td className="px-5 py-4"><Badge label={inv.paymentStatus} /></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button onClick={() => navigate('invoice-detail', { id: inv.id })} className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer text-slate-600 font-medium">View</button>
                        {inv.paymentStatus !== 'Paid' && <button className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-md cursor-pointer font-medium">Pay</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
