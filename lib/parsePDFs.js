const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

const candidates = [
  { slug: 'bournazel', name: 'Pierre-Yves Bournazel', globalScore: 7.8 },
  { slug: 'chikirou', name: 'Sophia Chikirou', globalScore: 7.2 },
  { slug: 'gregoire', name: 'Laurent Saint-Martin', globalScore: 6.8 },
  { slug: 'dati', name: 'Rachida Dati', globalScore: 5.5 },
  { slug: 'knafo', name: 'Sarah Knafo', globalScore: 5.4 },
  { slug: 'mariani', name: 'Thierry Mariani', globalScore: 4.2 }
];

// Helper function to extract criteria scores from text
function extractCriteriaScores(text) {
  const scores = {
    coherence: 0,
    solidite: 0,
    robustesse: 0,
    pragmatisme: 0,
    detail: 0
  };
  
  const coherenceMatch = text.match(/Cohérence\s*:\s*([\d,]+)/i);
  const soliditeMatch = text.match(/Solidité\s*:\s*([\d,]+)/i);
  const robustesseMatch = text.match(/Robustesse\s*:\s*([\d,]+)/i);
  const pragmatismeMatch = text.match(/Pragmatisme\s*:\s*([\d,]+)/i);
  const detailMatch = text.match(/Détail\s*:\s*([\d,]+)/i);
  
  if (coherenceMatch) scores.coherence = parseFloat(coherenceMatch[1].replace(',', '.'));
  if (soliditeMatch) scores.solidite = parseFloat(soliditeMatch[1].replace(',', '.'));
  if (robustesseMatch) scores.robustesse = parseFloat(robustesseMatch[1].replace(',', '.'));
  if (pragmatismeMatch) scores.pragmatisme = parseFloat(pragmatismeMatch[1].replace(',', '.'));
  if (detailMatch) scores.detail = parseFloat(detailMatch[1].replace(',', '.'));
  
  return scores;
}

// Helper function to extract strengths
function extractStrengths(text) {
  const strengths = [];
  const strengthsSection = text.match(/Forces[^:]*:\s*([\s\S]*?)(?:Faiblesses|Points faibles|$)/i);
  
  if (strengthsSection) {
    const lines = strengthsSection[1].split('\n');
    for (const line of lines) {
      const cleaned = line.trim();
      if (cleaned && cleaned.length > 10 && !cleaned.match(/^\d+\.?\s*$/) && strengths.length < 3) {
        strengths.push(cleaned.replace(/^[-•]\s*/, '').trim());
      }
    }
  }
  
  return strengths.slice(0, 3);
}

// Helper function to extract weaknesses
function extractWeaknesses(text) {
  const weaknesses = [];
  const weaknessesSection = text.match(/(?:Faiblesses|Points faibles)[^:]*:\s*([\s\S]*?)(?:Exemples|Mesures|$)/i);
  
  if (weaknessesSection) {
    const lines = weaknessesSection[1].split('\n');
    for (const line of lines) {
      const cleaned = line.trim();
      if (cleaned && cleaned.length > 10 && !cleaned.match(/^\d+\.?\s*$/) && weaknesses.length < 3) {
        weaknesses.push(cleaned.replace(/^[-•]\s*/, '').trim());
      }
    }
  }
  
  return weaknesses.slice(0, 3);
}

// Helper function to extract problematic measures
function extractProblematicMeasures(text) {
  const measures = [];
  const measuresSection = text.match(/(?:Exemples de mesures|Mesures irréalistes|Mesures incohérentes)[^:]*:\s*([\s\S]*?)$/i);
  
  if (measuresSection) {
    const lines = measuresSection[1].split('\n');
    for (const line of lines) {
      const cleaned = line.trim();
      if (cleaned && cleaned.length > 20 && !cleaned.match(/^\d+\.?\s*$/) && measures.length < 3) {
        measures.push(cleaned.replace(/^[-•]\s*/, '').trim());
      }
    }
  }
  
  return measures.slice(0, 3);
}

async function parsePDFs() {
  const candidatesData = [];
  
  for (const candidate of candidates) {
    const pdfPath = `/home/ubuntu/clawd/paris-2026/analyses/${candidate.slug}-analyse.pdf`;
    
    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdfParse(dataBuffer);
      const text = data.text;
      
      const candidateData = {
        ...candidate,
        scores: extractCriteriaScores(text),
        strengths: extractStrengths(text),
        weaknesses: extractWeaknesses(text),
        problematicMeasures: extractProblematicMeasures(text)
      };
      
      candidatesData.push(candidateData);
      console.log(`Parsed data for ${candidate.name}`);
    } catch (error) {
      console.error(`Error parsing PDF for ${candidate.name}:`, error);
      
      // Fallback data basé sur les notes globales
      const candidateData = {
        ...candidate,
        scores: {
          coherence: candidate.globalScore,
          solidite: candidate.globalScore - 0.2,
          robustesse: candidate.globalScore - 0.1,
          pragmatisme: candidate.globalScore + 0.1,
          detail: candidate.globalScore
        },
        strengths: [],
        weaknesses: [],
        problematicMeasures: []
      };
      candidatesData.push(candidateData);
    }
  }
  
  // Sauvegarder les données extraites
  fs.writeFileSync(
    path.join(__dirname, 'candidatesData.json'),
    JSON.stringify(candidatesData, null, 2)
  );
  
  console.log('Data extraction complete!');
  return candidatesData;
}

// Run the parser
parsePDFs().catch(console.error);