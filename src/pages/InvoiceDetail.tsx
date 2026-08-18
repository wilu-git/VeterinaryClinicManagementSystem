import { useState } from 'react';
import { type Navigate, invoices, getPet, getOwner } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; params?: Record<string, string>; }

export default function InvoiceDetail({ navigate, params }: Props) {
  const invoice = invoices.find((i) => i.id === params?.id) ?? invoices[0];
  const pet = getPet(invoice.petId)!;
  const owner = getOwner(invoice.ownerId)!;
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <div className="p-6 min-h-full bg-slate-50">
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-600 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={() => navigate('invoices')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-2 cursor-pointer">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            Back to Invoices
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Invoice {invoice.id}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast('Invoice printed.')} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Print</button>
          <button onClick={() => showToast('Invoice downloaded.')} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Download PDF</button>
          {invoice.paymentStatus !== 'Paid' && (
            <button onClick={() => showToast('Payment recorded successfully.')} className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer">Record Payment</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          {/* Invoice document */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Invoice header */}
            <div className="bg-slate-900 px-6 py-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                    </div>
                    <span className="font-bold text-lg">PetDex Veterinary Clinic</span>
                  </div>
                  <p className="text-slate-400 text-sm">123 Veterinary Ave, Quezon City · +63 2 8123 4567</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{invoice.id}</div>
                  <div className="text-slate-400 text-sm mt-1">Date: {invoice.date}</div>
                  <div className="mt-2"><Badge label={invoice.paymentStatus} /></div>
                </div>
              </div>
            </div>

            {/* Bill to */}
            <div className="px-6 py-5 border-b border-slate-100 grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Bill To</div>
                <div className="font-semibold text-slate-900">{owner.name}</div>
                <div className="text-sm text-slate-500">{owner.phone}</div>
                <div className="text-sm text-slate-500">{owner.email}</div>
                <div className="text-sm text-slate-500">{owner.address}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Patient</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{pet.species === 'Cat' ? '🐈' : '🐕'}</span>
                  <div>
                    <div className="font-semibold text-slate-900">{pet.name}</div>
                    <div className="text-sm text-slate-500">{pet.breed} · {pet.id}</div>
                  </div>
                </div>
                {invoice.appointmentId && (
                  <div className="text-sm text-slate-500 mt-1">Appointment: {invoice.appointmentId}</div>
                )}
              </div>
            </div>

            {/* Line items */}
            <div className="px-6 py-5">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold text-slate-500 border-b border-slate-200">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Unit Price</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {invoice.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-3 text-sm text-slate-800">{item.description}</td>
                      <td className="py-3 text-sm text-slate-600 text-right">{item.quantity}</td>
                      <td className="py-3 text-sm text-slate-600 text-right">₱{item.unitPrice.toLocaleString()}</td>
                      <td className="py-3 text-sm font-medium text-slate-900 text-right">₱{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="px-6 py-5 border-t border-slate-100 bg-slate-50">
              <div className="ml-auto max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-900">₱{invoice.subtotal.toLocaleString()}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Discount</span>
                    <span className="text-emerald-600">-₱{invoice.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">₱{invoice.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Payment Status</h3>
            <div className="mb-4"><Badge label={invoice.paymentStatus} size="md" /></div>
            {invoice.paymentStatus !== 'Paid' && (
              <button onClick={() => showToast('Payment recorded successfully.')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg cursor-pointer">Record Payment</button>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Items</span>
                <span className="font-medium text-slate-900">{invoice.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-900">₱{invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Discount</span>
                <span className="font-medium text-slate-900">₱{invoice.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 font-bold">
                <span className="text-slate-900">Total</span>
                <span className="text-slate-900">₱{invoice.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
