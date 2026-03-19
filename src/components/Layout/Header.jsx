export default function Header() {
  return (
    <header className="bg-blue-900 text-white px-4 py-3 flex items-center gap-3 shadow-md flex-shrink-0">
      <span className="text-2xl">🎣</span>
      <div>
        <h1 className="text-lg font-bold leading-tight">PA Fishing — NW Pennsylvania</h1>
        <p className="text-blue-200 text-xs">
          Erie · Warren · Crawford Counties &nbsp;|&nbsp; Public Waterways &amp; 2026 Regulations
        </p>
      </div>
      <a
        href="https://www.pa.gov/agencies/fishandboat/fishing/regulations"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto text-xs bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded-full whitespace-nowrap transition-colors"
      >
        PFBC Official Regs ↗
      </a>
    </header>
  );
}
