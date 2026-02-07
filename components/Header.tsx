import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🤖</span>
            </div>
            <h1 className="font-bold text-xl text-gray-900">
              Paris 2026 jugé par l'IA
            </h1>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Classement
            </Link>
            <Link
              href="/methodologie"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Méthodologie
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}