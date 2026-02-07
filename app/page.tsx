'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CandidateCard from '@/components/CandidateCard';
import { CandidatesData } from '@/types';

export default function HomePage() {
  const [data, setData] = useState<CandidatesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/candidates_data.json')
      .then(res => res.json())
      .then((data: CandidatesData) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Chargement des données...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Erreur de chargement des données</div>
      </div>
    );
  }

  const sortedCandidates = [...data.candidates].sort((a, b) => b.score - a.score);

  return (
    <div>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Analyse Objective des Programmes Paris 2026
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une intelligence artificielle non-partisane a analysé les programmes 
            des 6 principaux candidats selon 5 critères objectifs. 
            Découvrez les forces, faiblesses et propositions irréalistes de chaque candidat.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent-green rounded-full"></div>
              <span className="text-sm text-gray-600">Excellent (≥7/10)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Bon (≥6/10)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent-orange rounded-full"></div>
              <span className="text-sm text-gray-600">Moyen (≥5/10)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Faible (<5/10)</span>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-blue-50 rounded-lg p-6 mb-12">
          <h3 className="font-semibold text-blue-900 mb-2">
            🤖 Analyse 100% IA - Transparence totale
          </h3>
          <p className="text-blue-800">
            Cette analyse a été réalisée par une intelligence artificielle selon une grille 
            de critères objectifs. L'IA n'a aucune préférence politique et évalue uniquement 
            la cohérence, la solidité technique, la robustesse budgétaire, le pragmatisme 
            et le niveau de détail des propositions.
          </p>
        </section>

        {/* Candidates Grid */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Classement des Candidats
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.slug}
                candidate={candidate}
                rank={index + 1}
              />
            ))}
          </div>
        </section>

        {/* Methodology Preview */}
        <section className="mt-16 bg-gray-100 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Comment l'IA a-t-elle analysé ?
          </h3>
          <p className="text-gray-700 mb-6">
            L'analyse se base sur 5 critères objectifs, chacun noté sur 10 :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(data.methodology.criteria).map(([key, description]) => (
              <div key={key} className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-primary capitalize mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="/methodologie"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              En savoir plus sur la méthodologie →
            </a>
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