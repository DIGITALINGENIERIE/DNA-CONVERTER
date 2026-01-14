import type { ADNFile } from "@shared/schema";

export interface ParsedMetrics {
  composition: {
    base_frequencies: Record<string, number>;
    entropy: number;
  };
  couleurs: {
    saturation_moyenne: { mean: number };
    palette: string[];
  };
  lumieres: {
    contraste: { mean: number };
  };
  finitions: {
    grain: { type: string; intensity: number };
  };
  artist_info: {
    name: string;
    dna_type: string;
    type_label: string;
  };
  _meta: {
    fileCount: number;
    totalLength: number;
    integrity_hash: string;
  };
}

export function parseADNFiles(files: ADNFile[]): ParsedMetrics {
  let totalContent = "";
  let artistName = "Unknown Master";
  let dnaType = "COMPOSITION";

  files.forEach(f => {
    const content = f.content.toUpperCase();
    
    // Identification de l'artiste via des marqueurs dans le contenu du fichier
    if (content.includes("VERMEER")) artistName = "Vermeer";
    else if (content.includes("REMBRANDT")) artistName = "Rembrandt";
    else if (content.includes("DA VINCI") || content.includes("VINCI")) artistName = "Da Vinci";
    else if (content.includes("CARAVAGGIO")) artistName = "Caravaggio";
    else if (content.includes("VELAZQUEZ")) artistName = "Velázquez";

    // Identification du type d'ADN via des marqueurs dans le contenu du fichier
    const typeMarkers = {
      "COMPOSITION": ["ADN COMPOSITION", "ADN_COMPOSITION", "DNA COMPOSITION"],
      "COULEURS": ["ADN COULEURS", "ADN_COULEURS", "DNA COLORS", "ADN COULEUR"],
      "FINITIONS": ["ADN FINITIONS", "ADN_FINITIONS", "DNA FINISHES", "ADN FINITION"],
      "LUMIERES": ["ADN LUMIERES", "ADN_LUMIERES", "DNA LIGHTS", "ADN LUMIERE"],
      "SUJET ET ICONOGRAPHIE": ["ADN SUJET ET ICONOGRAPHIE", "ADN_SUJET", "DNA SUBJECT"]
    };

    for (const [type, markers] of Object.entries(typeMarkers)) {
      if (markers.some(m => content.includes(m))) {
        dnaType = type;
        break;
      }
    }

    const cleanContent = content.replace(/[^ACTGN]/g, "");
    totalContent += cleanContent;
  });

  const typeLabels: Record<string, string> = {
    "COMPOSITION": "Composition Preset",
    "COULEURS": "Couleurs Preset",
    "FINITIONS": "Finitions Preset",
    "LUMIERES": "Lumières Preset",
    "SUJET ET ICONOGRAPHIE": "Sujet & Iconographie Preset"
  };

  const length = totalContent.length || 1;
  const counts: Record<string, number> = { A: 0, C: 0, T: 0, G: 0, N: 0 };
  
  for (const char of totalContent) {
    if (counts[char] !== undefined) counts[char]++;
  }

  const frequencies = {
    A: counts.A / length,
    C: counts.C / length,
    T: counts.T / length,
    G: counts.G / length,
    N: counts.N / length,
  };

  const entropy = Object.values(frequencies).reduce((acc, f) => {
    return f > 0 ? acc - f * Math.log2(f) : acc;
  }, 0);

  const gcContent = frequencies.G + frequencies.C;
  
  return {
    composition: {
      base_frequencies: frequencies,
      entropy: entropy
    },
    couleurs: {
      saturation_moyenne: { mean: Math.round(gcContent * 100) },
      palette: gcContent > 0.5 ? ["#ff0041", "#00ff41", "#0041ff"] : ["#003b00", "#00ff41", "#008f11"],
    },
    lumieres: {
      contraste: { mean: Math.round((entropy / 2.32) * 100) },
    },
    finitions: {
      grain: { type: entropy > 1.5 ? "coarse" : "fine", intensity: Math.round(entropy * 10) },
    },
    artist_info: {
      name: artistName,
      dna_type: dnaType,
      type_label: typeLabels[dnaType] || "General DNA Preset"
    },
    _meta: {
      fileCount: files.length,
      totalLength: length,
      integrity_hash: Buffer.from(totalContent).slice(0, 16).toString("hex"),
    }
  };
}
