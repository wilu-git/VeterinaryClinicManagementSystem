import { useState } from 'react';
import { type Navigate, getMedicalRecord, getPet, getOwner, getPetMedicalRecords } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; params?: Record<string, string>; }

export default function MedicalRecordDetail({ navigate, params }: Props) {
  const isNew = params?.new === '1';
  const record = !isNew ? (getMedicalRecord(params?.id ?? 'MR-2026-001') ?? getMedicalRecord('MR-2026-001')!) : null;

  const petId = record?.petId ?? 'PET-245';
  const pet = getPet(petId)!;
  const owner = getOwner(record?.ownerId ?? 'OWN-001')!;
  const history = getPetMedicalRecords(petId).filter((r) => r.id !== record?.id);

  const [formData, setFormData] = useState({
    chiefComplaint: record?.chiefComplaint ?? '',
    subjective: record?.subjective ?? '',
    objective: record?.objective ?? '',
    temperature: record?.vitals.temperature ?? '',
    heartRate: record?.vitals.heartRate ?? '',
    respiratoryRate: record?.vitals.respiratoryRate ?? '',
    weight: record?.vitals.weight ?? '',
    assessment: record?.assessment ?? '',
    plan: record?.plan ?? '',
    notes: record?.notes ?? '',
  });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors bg-white';
  const textareaCls = `${inputCls} resize-none`;

  return (
    <div className="min-h-full bg-slate-50">
      {toast && (
        <div className="fixed top-20 right-6 bg-emerald-600 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <button onClick={() => navigate('medical-records')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-3 cursor-pointer">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
          Back to Medical Records
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{isNew ? 'Create Medical Record' : `Medical Record — ${record?.id}`}</h1>
            {!isNew && <p className="text-sm text-slate-500 mt-0.5">{record?.date} · {record?.veterinarian}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('medical-records')} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
            <button onClick={() => showToast('Medical record saved as draft.')} className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer">Save Draft</button>
            <button onClick={() => showToast('Medical record saved successfully.')} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">Save Record</button>
          </div>
        </div>
        {!isNew && (
          <div className="flex items-center gap-3 mt-3">
            <div className="text-xs text-slate-500">Appointment: <span className="font-medium text-slate-700">{record?.appointmentId}</span></div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <Badge label={record?.status ?? 'Draft'} />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* SOAP Form */}
          <div className="xl:col-span-2 space-y-4">
            {/* Chief Complaint */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Chief Complaint
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                value={formData.chiefComplaint}
                onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                className={inputCls}
                placeholder="Primary reason for the visit..."
              />
            </div>

            {/* Subjective */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">S</div>
                <label className="text-sm font-semibold text-slate-900">Subjective</label>
                <span className="text-xs text-slate-400">Owner-reported history & symptoms</span>
              </div>
              <textarea
                value={formData.subjective}
                onChange={(e) => setFormData({ ...formData, subjective: e.target.value })}
                className={textareaCls}
                rows={4}
                placeholder="Owner-reported symptoms, history, and observations..."
              />
            </div>

            {/* Objective */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">O</div>
                <label className="text-sm font-semibold text-slate-900">Objective</label>
                <span className="text-xs text-slate-400">Physical examination findings</span>
              </div>
              <textarea
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className={textareaCls}
                rows={4}
                placeholder="Physical examination findings, observations..."
              />

              {/* Vitals */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-sm font-semibold text-slate-900 mb-3">Vital Signs</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: 'temperature', label: 'Temperature', unit: '°C', placeholder: '38.5' },
                    { key: 'heartRate', label: 'Heart Rate', unit: 'bpm', placeholder: '88' },
                    { key: 'respiratoryRate', label: 'Resp. Rate', unit: 'bpm', placeholder: '22' },
                    { key: 'weight', label: 'Weight', unit: 'kg', placeholder: '28.5' },
                  ].map((vital) => (
                    <div key={vital.key}>
                      <label className="block text-xs font-medium text-slate-500 mb-1">{vital.label}</label>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100">
                        <input
                          value={(formData as any)[vital.key]}
                          onChange={(e) => setFormData({ ...formData, [vital.key]: e.target.value })}
                          className="flex-1 px-3 py-2 text-sm text-slate-800 outline-none bg-white"
                          placeholder={vital.placeholder}
                        />
                        <span className="px-2 text-xs text-slate-400 bg-slate-50 border-l border-slate-200 py-2">{vital.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assessment */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">A</div>
                <label className="text-sm font-semibold text-slate-900">Assessment</label>
                <span className="text-xs text-slate-400">Diagnosis / clinical impression</span>
              </div>
              <textarea
                value={formData.assessment}
                onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                className={textareaCls}
                rows={3}
                placeholder="Diagnosis, differential diagnoses, clinical impression..."
              />
            </div>

            {/* Plan */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">P</div>
                <label className="text-sm font-semibold text-slate-900">Plan</label>
                <span className="text-xs text-slate-400">Treatment and follow-up</span>
              </div>
              <textarea
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className={textareaCls}
                rows={3}
                placeholder="Treatment plan, medications, follow-up schedule..."
              />
              <div className="flex gap-2 mt-3">
                <button onClick={() => navigate('prescriptions')} className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer">
                  💊 Prescribe Medication
                </button>
                <button className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer">
                  🔬 Order Lab Test
                </button>
                <button onClick={() => navigate('appointments')} className="flex items-center gap-1.5 text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer">
                  📅 Schedule Follow-up
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-900 mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={textareaCls}
                rows={3}
                placeholder="Additional observations, instructions to client, etc..."
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Patient Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Patient</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  {pet.species === 'Cat' ? '🐈' : '🐕'}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{pet.name}</div>
                  <div className="text-xs text-slate-500">{pet.breed}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{pet.id}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Sex', value: pet.sex },
                  { label: 'Age', value: pet.age },
                  { label: 'Weight', value: `${pet.weight} kg` },
                  { label: 'Species', value: pet.species },
                ].map((f) => (
                  <div key={f.label} className="bg-slate-50 rounded-lg p-2">
                    <div className="text-slate-500">{f.label}</div>
                    <div className="text-slate-900 font-semibold mt-0.5">{f.value}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('pet-profile', { id: pet.id })} className="w-full mt-3 text-xs border border-slate-200 rounded-lg py-2 text-slate-700 hover:bg-slate-50 cursor-pointer font-medium">View Patient Profile</button>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Owner</h3>
              <div className="text-sm font-medium text-slate-900 mb-1">{owner.name}</div>
              <div className="text-xs text-slate-500 space-y-1.5">
                <div>{owner.phone}</div>
                <div>{owner.email}</div>
              </div>
            </div>

            {/* Medical History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Previous Records</h3>
                <div className="space-y-2">
                  {history.map((r) => (
                    <div key={r.id} onClick={() => navigate('medical-record-detail', { id: r.id })} className="p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 cursor-pointer">
                      <div className="text-xs font-medium text-blue-600">{r.id}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{r.date}</div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">{r.chiefComplaint}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-3">Attachments</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-blue-300 transition-colors cursor-pointer">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-300 mx-auto mb-2">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-xs text-slate-500">Drop files or click to upload</p>
                <p className="text-xs text-slate-400 mt-0.5">JPG, PNG, PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
