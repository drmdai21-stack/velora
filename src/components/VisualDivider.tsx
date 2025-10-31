export function VisualDivider() {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D3B8A1]" />
        <div className="w-2 h-2 rounded-full bg-[#E2A79A]" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D3B8A1]" />
      </div>
    </div>
  );
}
