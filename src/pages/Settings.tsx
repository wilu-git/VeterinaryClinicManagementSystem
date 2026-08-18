import { useState } from 'react';

const sections = [
  { id: 'clinic', label: 'Clinic Information', icon: '🏥' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'appointments', label: 'Appointment Settings', icon: '📅' },
  { id: 'medical', label: 'Medical Settings', icon: '🩺' },
  { id: 'billing', label: 'Billing Settings', icon: '💳' },
  { id: 'security', label: 'Security', icon: '🔒' },
];

const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors bg-white';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('clinic');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-6 min-h-full bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage clinic configuration and preferences</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Settings saved
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {/* Sidebar nav */}
        <div className="w-52 shrink-0">
          <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-slate-100 last:border-b-0 transition-colors cursor-pointer ${activeSection === s.id ? 'bg-blue-50 text-blue-700 border-l-2 border-l-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === 'clinic' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-5">Clinic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Clinic Name', value: 'PetDex Veterinary Clinic', required: true },
                  { label: 'License Number', value: 'VET-PH-2024-00123' },
                  { label: 'Phone Number', value: '+63 2 8123 4567', required: true },
                  { label: 'Email Address', value: 'info@petdex.vet', required: true },
                  { label: 'Website', value: 'www.petdex.vet' },
                  { label: 'Tax ID', value: '123-456-789-000' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    <input defaultValue={f.value} className={inputCls} />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Address</label>
                  <textarea defaultValue="123 Veterinary Ave, Quezon City, Metro Manila 1100" className={`${inputCls} resize-none h-20`} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="block text-xs font-medium text-slate-600 mb-2">Clinic Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">PD</div>
                  <button className="text-sm border border-slate-200 rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer">Upload Logo</button>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg cursor-pointer">Save Changes</button>
                <button className="px-6 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 cursor-pointer">Discard</button>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900 text-lg">User Management</h2>
                <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-700">Add User</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Role</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Dr. Jane Smith', role: 'Veterinarian', email: 'jane.smith@petdex.vet', status: 'Active' },
                    { name: 'Dr. Ramon Cruz', role: 'Veterinarian', email: 'ramon.cruz@petdex.vet', status: 'Active' },
                    { name: 'Dr. Elena Reyes', role: 'Veterinarian', email: 'elena.reyes@petdex.vet', status: 'Active' },
                    { name: 'Maria Dela Cruz', role: 'Receptionist', email: 'maria.dc@petdex.vet', status: 'Active' },
                    { name: 'Jose Santos', role: 'Vet Assistant', email: 'jose.santos@petdex.vet', status: 'Inactive' },
                  ].map((u) => (
                    <tr key={u.email} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-sm font-medium text-slate-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{u.role}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{u.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer text-slate-600 font-medium">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'appointments' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-5">Appointment Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Working Hours</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <div key={day} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 cursor-pointer" />
                        <span className="text-sm text-slate-700 w-24">{day}</span>
                        <input defaultValue="08:00" className="border border-slate-200 rounded px-2 py-1 text-xs w-20 outline-none" />
                        <span className="text-xs text-slate-400">to</span>
                        <input defaultValue="17:00" className="border border-slate-200 rounded px-2 py-1 text-xs w-20 outline-none" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Default Appointment Duration</label>
                  <select className={inputCls} style={{ maxWidth: 200 }}>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Appointment Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Routine Checkup', 'Vaccination', 'Follow-up', 'Surgery', 'Dental', 'Emergency', 'Grooming'].map((t) => (
                      <span key={t} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200">
                        {t}
                        <button className="text-blue-400 hover:text-blue-600 cursor-pointer">×</button>
                      </span>
                    ))}
                    <button className="text-xs border border-dashed border-slate-300 text-slate-500 px-3 py-1.5 rounded-full hover:border-blue-400 hover:text-blue-600 cursor-pointer">+ Add Type</button>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg cursor-pointer">Save Changes</button>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900 text-lg">Services & Pricing</h2>
                <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-700">Add Service</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 font-semibold bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3">Service</th>
                    <th className="text-right px-4 py-3">Price (₱)</th>
                    <th className="text-left px-4 py-3">Category</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Consultation Fee', price: 500, cat: 'Consultation' },
                    { name: 'Emergency Consultation', price: 800, cat: 'Consultation' },
                    { name: 'Rabies Vaccine', price: 350, cat: 'Vaccines' },
                    { name: 'DA2PP Vaccine', price: 800, cat: 'Vaccines' },
                    { name: 'Full Grooming (Small)', price: 800, cat: 'Grooming' },
                    { name: 'Full Grooming (Large)', price: 1200, cat: 'Grooming' },
                    { name: 'CBC & Chemistry Panel', price: 1500, cat: 'Laboratory' },
                    { name: 'IV Fluid Administration', price: 1200, cat: 'Procedures' },
                  ].map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{s.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-700 text-right font-semibold">₱{s.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{s.cat}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="text-xs border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer text-slate-600">Edit</button>
                          <button className="text-xs border border-red-200 px-2.5 py-1.5 rounded-md hover:bg-red-50 cursor-pointer text-red-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-5">Security Settings</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Change Password</h3>
                  <div className="space-y-3 max-w-sm">
                    {['Current Password', 'New Password', 'Confirm New Password'].map((f) => (
                      <div key={f}>
                        <label className="block text-xs font-medium text-slate-600 mb-1.5">{f}</label>
                        <input type="password" className={inputCls} />
                      </div>
                    ))}
                    <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg cursor-pointer">Update Password</button>
                  </div>
                </div>
                <div className="pt-5 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Session Settings</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Auto-logout after inactivity', sub: 'Session expires after 30 minutes of inactivity', active: true },
                      { label: 'Two-factor authentication', sub: 'Add an extra layer of security to your account', active: false },
                      { label: 'Login notifications', sub: 'Receive email alerts for new login sessions', active: true },
                    ].map((setting) => (
                      <div key={setting.label} className="flex items-start justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="text-sm font-medium text-slate-900">{setting.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{setting.sub}</div>
                        </div>
                        <button className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${setting.active ? 'bg-blue-600' : 'bg-slate-300'}`}>
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform m-0.5 ${setting.active ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'medical') && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 text-lg mb-5">Medical Settings</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Species</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Guinea Pig', 'Reptile', 'Other'].map((s) => (
                      <span key={s} className="flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full">
                        {s}
                        <button className="text-slate-400 hover:text-slate-600 cursor-pointer">×</button>
                      </span>
                    ))}
                    <button className="text-xs border border-dashed border-slate-300 text-slate-500 px-3 py-1.5 rounded-full cursor-pointer">+ Add Species</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Diagnosis Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Dermatology', 'Orthopedics', 'Internal Medicine', 'Ophthalmology', 'Cardiology', 'Oncology', 'Neurology'].map((c) => (
                      <span key={c} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200">
                        {c}
                        <button className="text-blue-400 hover:text-blue-600 cursor-pointer">×</button>
                      </span>
                    ))}
                    <button className="text-xs border border-dashed border-blue-300 text-blue-500 px-3 py-1.5 rounded-full cursor-pointer">+ Add Category</button>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={handleSave} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg cursor-pointer">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
