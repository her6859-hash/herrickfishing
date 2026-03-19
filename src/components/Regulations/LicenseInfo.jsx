import { licenseInfo } from '../../data/regulations2026';

const licenseRows = [
  licenseInfo.residentAnnual,
  licenseInfo.nonResidentAnnual,
  licenseInfo.nonResidentStudent,
  licenseInfo.seniorLifetime,
  licenseInfo.troutStampResident,
  licenseInfo.troutStampNonResident,
  licenseInfo.lakeEriePermit,
  licenseInfo.combinationTroutLakeErie,
];

export default function LicenseInfo() {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-3 py-2 text-left font-semibold">License / Permit</th>
              <th className="px-3 py-2 text-center font-semibold">2026 Fee</th>
            </tr>
          </thead>
          <tbody>
            {licenseRows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 text-gray-800">
                  {row.label}
                  {row.note && (
                    <span className="block text-xs text-amber-700 mt-0.5">⚠️ {row.note}</span>
                  )}
                </td>
                <td className="px-3 py-2 text-center font-semibold text-blue-900">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-900">
        <strong>Lake Erie Permit Note:</strong> Required for all persons 16+ fishing in Lake Erie,
        Presque Isle Bay, and <em>all tributaries</em> flowing into Lake Erie (including Elk Creek,
        Walnut Creek, Conneaut Creek, and others in Erie County).
      </div>

      <a
        href={licenseInfo.purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Buy Your 2026 License at HuntFish.pa.gov ↗
      </a>

      <p className="text-xs text-gray-500">
        Licenses valid December 1, 2025 – December 31, 2026. Fees subject to change — verify at{' '}
        <a href="https://huntfish.pa.gov" target="_blank" rel="noopener" className="underline">
          huntfish.pa.gov
        </a>
        .
      </p>
    </div>
  );
}
