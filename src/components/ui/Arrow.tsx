export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" className={`size-5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}
