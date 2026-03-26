import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slug = process.argv[2] || 'gregoire';
const txtPath = path.join(__dirname, '..', 'content', 'analyses', `${slug}-analyse.txt`);
const outputPath = path.join(__dirname, '..', 'public', 'rapports', `${slug}-analyse.pdf`);

const rawText = fs.readFileSync(txtPath, 'utf-8');

// Pre-process: expand inline " - " lists into proper bullet points
function preprocessText(text) {
  const lines = text.split('\n');
  const result = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect lines with inline dash lists like "Points forts : - item1 - item2"
    // Pattern: some label followed by " : - " then items separated by " - "
    const inlineMatch = trimmed.match(/^(.+?)\s*:\s*-\s+(.+)/);
    if (inlineMatch && trimmed.split(' - ').length >= 3) {
      const label = inlineMatch[1].trim();
      const rest = inlineMatch[2];
      // Split on " - " pattern
      const items = rest.split(/\s+-\s+/);
      result.push(label + ' :');
      for (const item of items) {
        if (item.trim()) result.push('• ' + item.trim());
      }
      continue;
    }

    result.push(trimmed);
  }

  return result.join('\n');
}

const text = preprocessText(rawText);

function textToHtml(text) {
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  let skipToc = false;
  let lineIndex = 0;

  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  const openList = () => { if (!inList) { html += '<ul>'; inList = true; } };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    lineIndex++;

    // Skip empty, page breaks, standalone page numbers
    if (line === '' || line === '\f') {
      closeList();
      continue;
    }
    if (line.match(/^\d{1,2}$/) && !line.match(/^\d+\./)) continue;

    // Skip repeated headers
    if (line === 'Analyse Programme E. Grégoire' || line === 'Paris 2026') continue;

    // Skip TOC lines (with dots)
    if (line.includes('. . . .')) continue;

    // === TITLE (line 1) ===
    if (lineIndex <= 1) {
      html += `<h1>${line}</h1>`;
      continue;
    }
    // Subtitle lines (2-4)
    if (lineIndex <= 4 && !line.startsWith('•') && !line.startsWith('Table')) {
      html += `<p class="subtitle">${line}</p>`;
      continue;
    }
    // Skip "Table des matières" header
    if (line === 'Table des matières') {
      skipToc = true;
      continue;
    }
    // Skip TOC entries until next real content
    if (skipToc) {
      if (line.match(/^(Résumé|Analyse du Programme|Note Globale)/)) {
        skipToc = false;
        // Fall through to handle as real content
      } else {
        continue;
      }
    }

    // === H2: Major sections ===
    if (line.match(/^(Résumé Exécutif|Analyse par Critère|Analyse Thématique|Points d'Attention Critiques|Comparaison Contexte Municipal|Conclusion|Synthèse Finale)/)) {
      closeList();
      html += `<h2>${line}</h2>`;
      continue;
    }

    // === H2: Annexes ===
    if (line.match(/^Annexe \d/)) {
      closeList();
      html += `<h2>${line}</h2>`;
      continue;
    }

    // === H3: Numbered criteria ("1. Cohérence Interne : 8/10") ===
    if (line.match(/^\d+\.\s+[A-ZÀ-Ü].*:\s*\d/)) {
      closeList();
      html += `<h3>${line}</h3>`;
      continue;
    }

    // === H3: Theme names ===
    if (line.match(/^(Logement|Transport|Sécurité|Écologie|Budget\/Fiscalité|Commerce|Culture|Espace Public|Éducation|Services Publics|Mobilités)/)) {
      closeList();
      html += `<h3>${line}</h3>`;
      continue;
    }

    // === H3: Key analysis subsections ===
    if (line.match(/^(La transformation du périphérique|Les 300 hectares|Le financement|Faisabilité Élevée|Faisabilité Moyenne|Faisabilité Faible)/)) {
      closeList();
      html += `<h3>${line}</h3>`;
      continue;
    }

    // === H4: Labels ending with ":" ===
    if (line.match(/^(Note Globale|3 Forces|3 Faiblesses|Verdict|Forces d'|Faiblesses du|Cohérence avec|Points forts|Points de vigilance|Points positifs|Faiblesses majeures|Manques|Forces techniques|Risques budgétaires|Réalisable|Approche|Nécessite|Obstacles|Estimations|Corrections|Propositions|Angles morts|Contradictions|Précision|Avec l'État|Avec la Région|Avec la Métropole|Coûts|Total|Comparaisons|Analyse technique|Contexte|Sources|Important|Défis)/i)) {
      closeList();
      // Check if it's a label with content after ":"
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx < line.length - 2) {
        const label = line.substring(0, colonIdx + 1);
        const content = line.substring(colonIdx + 1).trim();
        html += `<p><strong>${label}</strong> ${content}</p>`;
      } else {
        html += `<h4>${line}</h4>`;
      }
      continue;
    }

    // === Bullet points (•, -, ◦) ===
    if (line.match(/^[•◦]\s/) || (line.startsWith('- ') && line.length > 5)) {
      openList();
      html += `<li>${line.replace(/^[•◦\-]\s*/, '')}</li>`;
      continue;
    }

    // === Numbered items (e.g., "1. Construction de 60 000...") ===
    if (line.match(/^\d+\.\s+[A-ZÀ-Üa-zà-ü]/) && line.length < 300) {
      openList();
      html += `<li>${line}</li>`;
      continue;
    }

    // === Tags [OUI], [NON], [PARTIEL], [PLURI-MANDATURE], etc. ===
    if (line.match(/^\[/)) {
      openList();
      const tagMatch = line.match(/^\[([^\]]+)\]/);
      const tag = tagMatch ? tagMatch[1] : '';
      const rest = line.replace(/^\[[^\]]+\]\s*/, '');
      const tagClass = (tag.includes('OUI') || tag.includes('FAISABLE')) ? 'tag-green' :
                       tag.includes('NON') ? 'tag-red' : 'tag-orange';
      html += `<li><span class="${tagClass}">[${tag}]</span> ${rest}</li>`;
      continue;
    }

    // === Regular paragraph ===
    closeList();
    html += `<p>${line}</p>`;
  }

  closeList();
  return html;
}

const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
  @page { margin: 2cm 2cm; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1a1a1a;
    max-width: 100%;
  }
  h1 {
    font-size: 20pt;
    color: #111;
    border-bottom: 3px solid #2563eb;
    padding-bottom: 8px;
    margin-bottom: 4px;
  }
  .subtitle {
    font-size: 10pt;
    color: #555;
    margin: 2px 0;
  }
  h2 {
    font-size: 15pt;
    color: #1e40af;
    margin-top: 25px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
    page-break-after: avoid;
  }
  h3 {
    font-size: 12pt;
    color: #1e3a5f;
    margin-top: 18px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }
  h4 {
    font-size: 10.5pt;
    color: #333;
    font-weight: 600;
    margin-top: 12px;
    margin-bottom: 4px;
    page-break-after: avoid;
  }
  p { margin: 4px 0; }
  strong { color: #1e3a5f; }
  ul {
    margin: 4px 0;
    padding-left: 18px;
  }
  li {
    margin: 2px 0;
  }
  .tag-green {
    background: #dcfce7;
    color: #166534;
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: 600;
    font-size: 8.5pt;
  }
  .tag-red {
    background: #fee2e2;
    color: #991b1b;
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: 600;
    font-size: 8.5pt;
  }
  .tag-orange {
    background: #fef3c7;
    color: #92400e;
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: 600;
    font-size: 8.5pt;
  }
  footer {
    margin-top: 30px;
    padding-top: 12px;
    border-top: 1px solid #ddd;
    font-size: 8.5pt;
    color: #888;
    text-align: center;
  }
</style>
</head>
<body>
${textToHtml(text)}
<footer>
  Analyse réalisée par labo-paris.com — Dernière mise à jour : 13 février 2026<br/>
  Rapport généré automatiquement à partir de l'analyse non-partisane
</footer>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: false,
  margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' }
});
await browser.close();

console.log(`PDF generated: ${outputPath}`);
