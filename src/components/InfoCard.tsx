export function InfoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`modern-card p-5 ${className}`}>
      {children}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-text text-[15px] leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
