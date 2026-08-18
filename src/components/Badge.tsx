const colorMap: Record<string, string> = {
  'Scheduled': 'bg-slate-100 text-slate-700 border border-slate-200',
  'Confirmed': 'bg-blue-100 text-blue-700 border border-blue-200',
  'In Progress': 'bg-amber-100 text-amber-700 border border-amber-200',
  'Completed': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'Cancelled': 'bg-red-100 text-red-700 border border-red-200',
  'No Show': 'bg-orange-100 text-orange-700 border border-orange-200',
  'Draft': 'bg-slate-100 text-slate-600 border border-slate-200',
  'Active': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'Inactive': 'bg-slate-100 text-slate-500 border border-slate-200',
  'Paid': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'Unpaid': 'bg-red-100 text-red-700 border border-red-200',
  'Partially Paid': 'bg-amber-100 text-amber-700 border border-amber-200',
  'Overdue': 'bg-red-100 text-red-800 border border-red-200',
  'Final': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'Dog': 'bg-blue-50 text-blue-700 border border-blue-100',
  'Cat': 'bg-purple-50 text-purple-700 border border-purple-100',
  'Bird': 'bg-sky-50 text-sky-700 border border-sky-100',
  'Rabbit': 'bg-pink-50 text-pink-700 border border-pink-100',
};

interface BadgeProps {
  label: string;
  size?: 'sm' | 'md';
}

export default function Badge({ label, size = 'sm' }: BadgeProps) {
  const cls = colorMap[label] ?? 'bg-slate-100 text-slate-600 border border-slate-200';
  const sz = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${cls} ${sz}`}>
      {label}
    </span>
  );
}
