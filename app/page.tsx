import CandidateCard from '@/components/CandidateCard'
import { candidatesData } from '@/lib/data'
import Link from 'next/link'

export default function HomePage() {
  // Sort candidates by global score descending
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Programmes Paris 2026 jugés par l'IA
            </h1>
            <Link 
              href="/methodologie"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Méthodologie
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-blue-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">
            Une analyse objective et transparente
          </h2>
          <p className="text-blue-800 leading-relaxed">
            L'intelligence artificielle a analysé les programmes des 6 principaux candidats à la mairie de Paris 
            selon 5 critères objectifs : cohérence, solidité, robustesse, pragmatisme et niveau de détail. 
            Cette approche garantit une évaluation neutre et rigoureuse, sans biais partisan.
          </p>
        </div>

        {/* Ranking Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sortedCandidates.map((candidate, index) => (
            <CandidateCard 
              key={candidate.slug} 
              candidate={candidate} 
              rank={index + 1} 
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Analyse réalisée par IA sur la base des programmes officiels des candidats.
            </p>
            <p>
              Aucune affiliation politique. Méthodologie transparente et reproductible.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}