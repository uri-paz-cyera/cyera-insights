import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-[#1e2952] text-white">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#1e2952] font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-lg">Cyera Insights</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-gray-300 transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/sessions"
              className="text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
            >
              Sources
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-xs font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}
