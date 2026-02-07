'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import ScoreBadge from '@/components/ScoreBadge';
import RadarChart from '@/components/RadarChart';
import { Candidate, CandidatesData } from '@/types';

export default function CandidatePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/candidates_data.json')
      .then(res => res.json())
      .then((data: CandidatesData) => {
        const foundCandidate = data.candidates.find(c => c.slug === slug);
        setCandidate(foundCandidate || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Candidat non trouvé</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link href="/" className="text-primary hover:underline">
            ← Retour au classement
          </Link>
        </nav>

        {/* Candidate Header */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {candidate.name}
              </h1>
              <p className="text-lg text-gray-600">{candidate.party}</p>
            </div>
            <ScoreBadge score={candidate.score} size="lg" />
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {Object.entries(candidate.scores).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-primary">{value}/10</div>
                <div className="text-sm text-gray-600 capitalize">
                  {key === 'solidite' ? 'Solidité' : key}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Radar Chart */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Analyse par Critères
              </h2>
              <RadarChart scores={candidate.scores} size={350} />
            </section>

            {/* Strengths */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">💪</span>
                Forces du Programme
              </h2>
              <ul className="space-y-3">
                {candidate.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent-green mr-2">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weaknesses */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Faiblesses du Programme
              </h2>
              <ul className="space-y-3">
                {candidate.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent-orange mr-2">•</span>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Unrealistic Measures */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🚫</span>
                Mesures Irréalistes ou Incohérentes
              </h2>
              <div className="space-y-4">
                {candidate.unrealistic_measures.map((measure, index) => (
                  <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <h3 className="font-semibold text-red-900 mb-2">
                      {measure.title}
                    </h3>
                    <p className="text-sm text-red-700">
                      {measure.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Section */}
        <section className="mt-12 bg-gray-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comment lire cette analyse ?
          </h2>
          <p className="text-gray-700 mb-4">
            Cette analyse évalue uniquement la <strong>qualité technique</strong> du programme, 
            pas son orientation politique. Un programme peut être techniquement solide mais 
            ne pas correspondre à vos valeurs, et inversement.
          </p>
          <p className="text-gray-700">
            Les "mesures irréalistes" sont celles qui présentent des contradictions internes, 
            des impossibilités juridiques, ou des hypothèses budgétaires très optimistes. 
            Cela ne signifie pas qu'elles sont mauvaises en soi, mais qu'elles nécessiteraient 
            des conditions exceptionnelles pour être réalisées.
          </p>
          <div className="mt-6">
            <Link
              href="/methodologie"
              className="text-primary hover:underline font-medium"
            >
              En savoir plus sur la méthodologie →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2026 - Analyse réalisée par une IA non-partisane
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Les données proviennent des programmes officiels des candidats
          </p>
        </div>
      </footer>
    </div>
  );
}