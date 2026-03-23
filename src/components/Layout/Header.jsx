export default function Header() {
  return (
    <header className="bg-blue-900 text-white px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-md flex-shrink-0">
      <span className="text-xl sm:text-2xl flex-shrink-0">🎣</span>
      <div className="min-w-0 flex-1">
        <h1 className="text-base sm:text-lg font-bold leading-tight truncate">PA Fishing — NW Pennsylvania</h1>
        <p className="text-blue-200 text-xs hidden sm:block">
          Erie · Warren · Crawford Counties &nbsp;|&nbsp; Public Waterways &amp; 2026 Regulations
        </p>
        <p className="text-blue-200 text-xs sm:hidden">
          Erie · Warren · Crawford
        </p>
      </div>
      <a
        href="https://www.pa.gov/agencies/fishandboat/fishing/regulations"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-xs bg-blue-700 hover:bg-blue-600 px-2 py-1 sm:px-3 rounded-full transition-colors"
      >
        <span className="hidden sm:inline">PFBC Official Regs ↗</span>
        <span className="sm:hidden">Regs ↗</span>
      </a>
    </header>
  );
}
