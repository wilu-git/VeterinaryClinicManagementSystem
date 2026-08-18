import { useState } from 'react';
import { type Navigate, getAppointment, getPet, getOwner, getPetMedicalRecords } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; params?: Record<string, string>; }

export default function AppointmentDetail({ navigate, params }: Props) {
  const [cancelModal, setCancelModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const appt = getAppointment(params?.id ?? 'APT-2026-001') ?? getAppointment('APT-2026-001')!;
  const pet = getPet(appt.petId)!;
  const owner = getOwner(appt.ownerId)!;
  const records = getPetMedicalRecords(appt.petId);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const timelineSteps = [
    { label: 'Scheduled', done: true, time: appt.createdAt },
    { label: 'Confirmed', done: appt.status !== 'Scheduled', time: appt.status !== 'Scheduled' ? appt.date : null },
    { label: 'In Progress', done: appt.status === 'In Progress' || appt.status === 'Completed', time: null },
    { label: 'Completed', done: appt.status === 'Completed', time: appt.status === 'Completed' ? appt.date : null },
  ];

  return (
    <div className="p-6 min-h-full bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-600 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <button onClick={() => navigate('appointments')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-2 cursor-pointer">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            Back to Appointments
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Appointment Details</h1>
          <p className="text-slate-500 text-sm mt-0.5">{appt.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Edit</button>
          {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
            <button onClick={() => setCancelModal(true)} className="px-4 py-2 text-sm font-medium border border-red-200 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer">Cancel</button>
          )}
          {(appt.status === 'Confirmed' || appt.status === 'In Progress') && (
            <button onClick={() => setCompleteModal(true)} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
              {appt.status === 'In Progress' ? 'Complete' : 'Start Consultation'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-4">
          {/* Appointment Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Appointment Summary</h2>
              <Badge label={appt.status} size="md" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Appointment ID', value: appt.id },
                { label: 'Date', value: appt.date },
                { label: 'Time', value: appt.time },
                { label: 'Type', value: appt.type },
                { label: 'Veterinarian', value: appt.veterinarian },
                { label: 'Created', value: appt.createdAt },
              ].map((field) => (
                <div key={field.label}>
                  <div className="text-xs font-medium text-slate-500 mb-1">{field.label}</div>
                  <div className="text-sm text-slate-900 font-medium">{field.value}</div>
                </div>
              ))}
            </div>
            {appt.reason && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-1">Reason / Chief Complaint</div>
                <p className="text-sm text-slate-700">{appt.reason}</p>
              </div>
            )}
          </div>

          {/* Patient + Owner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Patient Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Patient</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-3xl shrink-0">
                  {pet.species === 'Cat' ? '🐈' : '🐕'}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{pet.name}</div>
                  <div className="text-sm text-slate-500">{pet.breed}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{pet.id}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                {[
                  { label: 'Sex', value: pet.sex },
                  { label: 'Species', value: pet.species },
                  { label: 'Age', value: pet.age },
                  { label: 'Weight', value: `${pet.weight} kg` },
                ].map((f) => (
                  <div key={f.label} className="bg-slate-50 rounded-lg p-2">
                    <div className="text-slate-500">{f.label}</div>
                    <div className="text-slate-900 font-semibold mt-0.5">{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate('pet-profile', { id: pet.id })} className="flex-1 text-xs border border-slate-200 rounded-lg py-2 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium">View Profile</button>
                <button onClick={() => navigate('medical-records')} className="flex-1 text-xs border border-blue-200 rounded-lg py-2 text-blue-600 hover:bg-blue-50 cursor-pointer font-medium">Medical History</button>
              </div>
            </div>

            {/* Owner Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Owner</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400 shrink-0">
                  {owner.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">{owner.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{owner.id}</div>
                </div>
              </div>
              <div className="space-y-2 text-xs mb-4">
                {[
                  { icon: '📞', value: owner.phone },
                  { icon: '✉️', value: owner.email },
                  { icon: '📍', value: owner.address },
                ].map((f) => (
                  <div key={f.value} className="flex items-center gap-2 text-slate-600">
                    <span className="shrink-0">{f.icon}</span>
                    <span className="truncate">{f.value}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('owner-profile', { id: owner.id })} className="w-full text-xs border border-slate-200 rounded-lg py-2 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium">View Owner Profile</button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Appointment Timeline</h3>
            <div className="relative">
              {timelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-start gap-4 mb-4 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${step.done ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}`}>
                      {step.done ? (
                        <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                      )}
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div className={`w-0.5 h-6 mt-1 ${step.done ? 'bg-blue-300' : 'bg-slate-200'}`} />
                    )}
                  </div>
                  <div className="pt-1">
                    <div className={`text-sm font-medium ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</div>
                    {step.time && <div className="text-xs text-slate-500 mt-0.5">{step.time}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Medical Records */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Previous Medical Records</h3>
              <button onClick={() => navigate('medical-records')} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">View All</button>
            </div>
            {records.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-400">No medical records found for this patient</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3">Date</th>
                    <th className="text-left px-5 py-3">Record #</th>
                    <th className="text-left px-5 py-3 hidden sm:table-cell">Chief Complaint</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Veterinarian</th>
                    <th className="text-left px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 text-sm text-slate-600">{r.date}</td>
                      <td className="px-5 py-3 text-sm font-medium text-blue-600">{r.id}</td>
                      <td className="px-5 py-3 text-sm text-slate-600 hidden sm:table-cell truncate max-w-xs">{r.chiefComplaint}</td>
                      <td className="px-5 py-3 text-sm text-slate-500 hidden md:table-cell">{r.veterinarian}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => navigate('medical-record-detail', { id: r.id })} className="text-xs text-slate-600 border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Notes */}
          {appt.notes && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Appointment Notes</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{appt.notes}</p>
            </div>
          )}

          {/* Attachments */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Attachments</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-300 transition-colors cursor-pointer">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-slate-300 mx-auto mb-2">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-slate-600">Drag and drop files here or click to upload</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG, PDF up to 20MB</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Create Medical Record', icon: '📋', action: () => navigate('medical-record-detail', { new: '1', apptId: appt.id }) },
                { label: 'Add Prescription', icon: '💊', action: () => navigate('prescriptions') },
                { label: 'Create Invoice', icon: '🧾', action: () => navigate('invoices') },
                { label: 'Print Appointment Slip', icon: '🖨️', action: () => showToast('Printing appointment slip...') },
              ].map((action) => (
                <button key={action.label} onClick={action.action} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-sm text-slate-700 transition-colors cursor-pointer text-left">
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Change */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Appointment Status</h3>
            <Badge label={appt.status} size="md" />
            <p className="text-xs text-slate-500 mt-3">Last updated: {appt.date} at {appt.time}</p>
          </div>

          {/* Pet Summary mini */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{pet.species === 'Cat' ? '🐈' : '🐕'}</span>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{pet.name}</div>
                <div className="text-xs text-slate-500">{pet.id}</div>
              </div>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>{pet.breed} · {pet.sex} · {pet.age}</div>
              <div>{pet.weight} kg</div>
              {pet.microchipId && <div className="text-slate-400">{pet.microchipId}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Cancel Appointment?</h3>
            <p className="text-sm text-slate-600 mb-4">Please provide a reason for cancellation.</p>
            <textarea className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-700 outline-none focus:border-blue-400 h-24 resize-none" placeholder="Cancellation reason..." />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setCancelModal(false)} className="flex-1 border border-slate-200 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">Keep Appointment</button>
              <button onClick={() => { setCancelModal(false); showToast('Appointment cancelled successfully.'); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer">Cancel Appointment</button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {completeModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Complete Appointment?</h3>
            <p className="text-sm text-slate-600 mb-6">This will mark the appointment as completed. Make sure you have saved all medical records.</p>
            <div className="flex gap-3">
              <button onClick={() => setCompleteModal(false)} className="flex-1 border border-slate-200 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button onClick={() => { setCompleteModal(false); showToast('Appointment marked as completed.'); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer">Complete Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
