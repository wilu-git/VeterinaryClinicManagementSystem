import { useState } from 'react';
import { type Navigate, appointments, getPet } from '../data';
import Badge from '../components/Badge';

interface Props { navigate: Navigate; }

const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const statusColors: Record<string, string> = {
  'Scheduled': 'bg-slate-100 border-l-slate-400 text-slate-700',
  'Confirmed': 'bg-blue-50 border-l-blue-500 text-blue-800',
  'In Progress': 'bg-amber-50 border-l-amber-500 text-amber-800',
  'Completed': 'bg-emerald-50 border-l-emerald-500 text-emerald-800',
  'Cancelled': 'bg-red-50 border-l-red-400 text-red-700 opacity-60',
  'No Show': 'bg-orange-50 border-l-orange-400 text-orange-700 opacity-60',
};

export default function Calendar({ navigate }: Props) {
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [currentDate] = useState(new Date(2026, 7, 18)); // Aug 18 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const getApptForDayTime = (date: Date, hour: string) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return appointments.filter((a) => a.date === dateStr && a.time === hour);
  };

  // Month calendar grid
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calDays = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, i) =>
    i < firstDayOfMonth ? null : i - firstDayOfMonth + 1
  );

  return (
    <div className="p-6 min-h-full bg-slate-50 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 cursor-pointer">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-600"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
            <span className="text-sm font-semibold text-slate-900 px-3">{MONTHS[month]} {year}</span>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 cursor-pointer">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-600"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
            <button className="ml-1 text-xs border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-50 cursor-pointer font-medium">Today</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs font-medium capitalize cursor-pointer ${view === v ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>{v}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg cursor-pointer">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            New
          </button>
        </div>
      </div>

      {/* Week view */}
      {view === 'week' && (
        <div className="bg-white rounded-xl border border-slate-200 flex-1 overflow-auto">
          {/* Day headers */}
          <div className="grid border-b border-slate-200 sticky top-0 bg-white z-10" style={{ gridTemplateColumns: '64px repeat(7, 1fr)' }}>
            <div className="border-r border-slate-100" />
            {weekDays.map((d, i) => {
              const isToday = d.getDate() === 18 && d.getMonth() === 7;
              return (
                <div key={i} className={`text-center py-3 border-r border-slate-100 last:border-r-0 ${isToday ? 'bg-blue-50' : ''}`}>
                  <div className="text-xs text-slate-500">{DAYS[d.getDay()]}</div>
                  <div className={`text-lg font-bold mt-0.5 ${isToday ? 'text-blue-600' : 'text-slate-900'}`}>{d.getDate()}</div>
                </div>
              );
            })}
          </div>
          {/* Time slots */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid border-b border-slate-100 last:border-b-0" style={{ gridTemplateColumns: '64px repeat(7, 1fr)', minHeight: 64 }}>
              <div className="text-xs text-slate-400 px-2 pt-2 border-r border-slate-100 shrink-0">{hour}</div>
              {weekDays.map((d, i) => {
                const dayAppts = getApptForDayTime(d, hour);
                const isToday = d.getDate() === 18 && d.getMonth() === 7;
                return (
                  <div key={i} className={`border-r border-slate-100 last:border-r-0 p-1 ${isToday ? 'bg-blue-50/30' : ''}`}>
                    {dayAppts.map((a) => {
                      const pet = getPet(a.petId);
                      const cls = statusColors[a.status] ?? 'bg-slate-50 border-l-slate-300 text-slate-700';
                      return (
                        <div
                          key={a.id}
                          onClick={() => navigate('appointment-detail', { id: a.id })}
                          className={`border-l-4 rounded-r-lg px-2 py-1.5 mb-1 cursor-pointer hover:opacity-80 transition-opacity ${cls}`}
                        >
                          <div className="text-xs font-semibold truncate">{pet?.name}</div>
                          <div className="text-xs truncate opacity-80">{a.type}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Month view */}
      {view === 'month' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-200">
            {DAYS.map((d) => <div key={d} className="text-center text-xs font-semibold text-slate-500 py-3">{d}</div>)}
          </div>
          <div className="grid grid-cols-7">
            {calDays.map((day, i) => {
              const dateStr = day ? `2026-08-${String(day).padStart(2, '0')}` : '';
              const dayAppts = day ? appointments.filter((a) => a.date === dateStr) : [];
              const isToday = day === 18;
              return (
                <div key={i} className={`min-h-24 border-b border-r border-slate-100 p-2 ${isToday ? 'bg-blue-50' : ''} ${!day ? 'bg-slate-50' : ''}`}>
                  {day && (
                    <>
                      <div className={`text-sm font-semibold mb-1 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>{day}</div>
                      {dayAppts.slice(0, 3).map((a) => {
                        const pet = getPet(a.petId);
                        return (
                          <div key={a.id} onClick={() => navigate('appointment-detail', { id: a.id })} className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 truncate mb-0.5 cursor-pointer hover:bg-blue-200">
                            {a.time} {pet?.name}
                          </div>
                        );
                      })}
                      {dayAppts.length > 3 && <div className="text-xs text-slate-400">+{dayAppts.length - 3} more</div>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day view */}
      {view === 'day' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-auto">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="text-lg font-bold text-blue-600">Tuesday, August 18, 2026</div>
          </div>
          {HOURS.map((hour) => {
            const dayAppts = appointments.filter((a) => a.date === '2026-08-18' && a.time === hour);
            return (
              <div key={hour} className="flex border-b border-slate-100 last:border-b-0 min-h-16">
                <div className="w-16 shrink-0 text-xs text-slate-400 px-3 pt-3 border-r border-slate-100">{hour}</div>
                <div className="flex-1 p-2">
                  {dayAppts.map((a) => {
                    const pet = getPet(a.petId);
                    return (
                      <div key={a.id} onClick={() => navigate('appointment-detail', { id: a.id })} className={`border-l-4 rounded-r-xl px-3 py-2 mb-1 cursor-pointer ${statusColors[a.status]}`}>
                        <div className="font-semibold text-sm">{a.time} — {pet?.name} · {a.type}</div>
                        <div className="text-xs opacity-70">{a.veterinarian}</div>
                        <Badge label={a.status} />
                      </div>
                    );
                  })}
                  {dayAppts.length === 0 && (
                    <div className="h-full flex items-center">
                      <span className="text-xs text-slate-200">Available</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
