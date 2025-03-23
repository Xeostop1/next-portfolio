'use client';

type Props = {
  sortOrder: 'newest' | 'oldest';
  onChange: (value: 'newest' | 'oldest') => void;
};

export default function SortControls({ sortOrder, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <span>정렬:</span>
      <button
        onClick={() => onChange('newest')}
        style={{ fontWeight: sortOrder === 'newest' ? 'bold' : 'normal' }}
      >
        최신순
      </button>
      <button
        onClick={() => onChange('oldest')}
        style={{ fontWeight: sortOrder === 'oldest' ? 'bold' : 'normal' }}
      >
        오래된순
      </button>
    </div>
  );
}
