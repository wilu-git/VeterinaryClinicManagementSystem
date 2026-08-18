import { useState } from 'react';
import { type Navigate, getPet, getOwner, getPetAppointments, getPetMedicalRecords, getPetPrescriptions } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; params?: Record<string, string>; }

export default function PetProfile({ navigate, params }: Props) {
  const [activeTab, setActiveTab] = useState('info');
  const pet = getPet(params?.id ?? 'PET-245') ?? getPet('PET-245')!;
  const owner = getOwner(pet.ownerId)!;
  const appointments = getPetAppointments(pet.id);
  const records = getPetMedicalRecords(pet.id);
  const prescriptions = getPetPrescriptions(pet.id);

  const tabs = [
    { id: 'info', label: 'Basic Info' },
    { id: 'medical', label: `Medical History (${records.length})` },
    { id: 'appointments', label: `Appointments (${appointments.length})` },
    { id: 'prescriptions', label: `Prescriptions (${prescriptions.length})` },
  ];

  return (
    <div className="min-h-full bg-slate-50">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 px-6 py-6">
        <button onClick={() => navigate('pet-patients')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
          Back to Pet Patients
        </button>
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-5xl shrink-0">
            {pet.species === 'Cat' ? '🐈' : pet.species === 'Bird' ? '🦜' : '🐕'}
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-3 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{pet.name}</h1>
                <p className="text-slate-500 text-sm mt-0.5">{pet.breed} · {pet.sex} · {pet.age} · {pet.weight} kg</p>
                <p className="text-xs text-slate-400 mt-0.5">Pet ID: {pet.id}</p>
              </div>
              <Badge label={pet.status} size="md" />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Edit</button>
            <button onClick={() => navigate('appointments')} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">New Appointment</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-5 border-b border-slate-200 -mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Basic Info */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Name', value: pet.name },
                    { label: 'Species', value: pet.species },
                    { label: 'Breed', value: pet.breed },
                    { label: 'Sex', value: pet.sex },
                    { label: 'Date of Birth', value: pet.dateOfBirth },
                    { label: 'Age', value: pet.age },
                    { label: 'Weight', value: `${pet.weight} kg` },
                    { label: 'Color', value: pet.color },
                    { label: 'Microchip ID', value: pet.microchipId ?? 'Not registered' },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-xs font-medium text-slate-500 mb-1">{f.label}</div>
                      <div className="text-sm text-slate-900">{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900 mb-4">Vaccination Summary</h2>
                <div className="space-y-3">
                  {[
                    { vaccine: 'DA2PP (Distemper/Parvo)', date: '2026-08-10', nextDue: '2027-08-10', status: 'Current' },
                    { vaccine: 'Rabies', date: '2026-08-10', nextDue: '2027-08-10', status: 'Current' },
                    { vaccine: 'Bordetella', date: '2025-12-15', nextDue: '2026-12-15', status: 'Current' },
                  ].map((v) => (
                    <div key={v.vaccine} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{v.vaccine}</div>
                        <div className="text-xs text-slate-500">Last: {v.date} · Next due: {v.nextDue}</div>
                      </div>
                      <Badge label={v.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900 mb-4">Owner Information</h2>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 shrink-0">
                    {owner.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{owner.name}</div>
                    <div className="text-xs text-slate-400">{owner.id}</div>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2"><span>📞</span><span>{owner.phone}</span></div>
                  <div className="flex items-center gap-2"><span>✉️</span><span className="truncate">{owner.email}</span></div>
                  <div className="flex items-center gap-2"><span>📍</span><span>{owner.address}</span></div>
                </div>
                <button onClick={() => navigate('owner-profile', { id: owner.id })} className="w-full text-xs border border-slate-200 rounded-lg py-2 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium">View Owner Profile</button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-slate-900 mb-3">Quick Stats</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Total Visits', value: appointments.length.toString() },
                    { label: 'Medical Records', value: records.length.toString() },
                    { label: 'Prescriptions', value: prescriptions.length.toString() },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{s.label}</span>
                      <span className="text-sm font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical History */}
        {activeTab === 'medical' && (
          <div className="bg-white rounded-xl border border-slate-200">
            {records.length === 0 ? (
              <div className="py-20 text-center">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-sm font-medium text-slate-600">No medical records yet</p>
                <p className="text-xs text-slate-400 mt-1">This patient does not have any medical records.</p>
                <button onClick={() => navigate('medical-records')} className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">Create Medical Record</button>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3.5">Date</th>
                    <th className="text-left px-5 py-3.5">Record #</th>
                    <th className="text-left px-5 py-3.5">Chief Complaint</th>
                    <th className="text-left px-5 py-3.5 hidden md:table-cell">Assessment</th>
                    <th className="text-left px-5 py-3.5">Vet</th>
                    <th className="text-left px-5 py-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 text-sm text-slate-600">{r.date}</td>
                      <td className="px-5 py-4 text-sm font-medium text-blue-600">{r.id}</td>
                      <td className="px-5 py-4 text-sm text-slate-700 max-w-xs truncate">{r.chiefComplaint}</td>
                      <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell max-w-xs truncate">{r.assessment}</td>
                      <td className="px-5 py-4 text-sm text-slate-500">{r.veterinarian}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => navigate('medical-record-detail', { id: r.id })} className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium text-slate-600">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Appointments tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3.5">Date & Time</th>
                  <th className="text-left px-5 py-3.5">Type</th>
                  <th className="text-left px-5 py-3.5 hidden md:table-cell">Veterinarian</th>
                  <th className="text-left px-5 py-3.5">Status</th>
                  <th className="text-left px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-900">{a.date}</div>
                      <div className="text-xs text-slate-500">{a.time}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{a.type}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden md:table-cell">{a.veterinarian}</td>
                    <td className="px-5 py-4"><Badge label={a.status} /></td>
                    <td className="px-5 py-4">
                      <button onClick={() => navigate('appointment-detail', { id: a.id })} className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer font-medium text-slate-600">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Prescriptions tab */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-xl border border-slate-200">
            {prescriptions.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-sm font-medium text-slate-600">No prescriptions yet</p>
                <button onClick={() => navigate('prescriptions')} className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">Add Prescription</button>
              </div>
            ) : prescriptions.map((rx) => (
              <div key={rx.id} className="p-5 border-b border-slate-100 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-slate-900">{rx.id}</div>
                    <div className="text-xs text-slate-500">{rx.date} · {rx.veterinarian}</div>
                  </div>
                  <Badge label={rx.status} />
                </div>
                <div className="space-y-2">
                  {rx.medications.map((med, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3 text-xs">
                      <div className="font-semibold text-slate-900">{med.name} — {med.dosage}</div>
                      <div className="text-slate-500 mt-0.5">{med.route} · {med.frequency} · {med.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
