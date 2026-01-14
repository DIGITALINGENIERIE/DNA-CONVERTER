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
  _meta: {
    fileCount: number;
    totalLength: number;
    integrity_hash: string;
  };
}

export function parseADNFiles(files: ADNFile[]): ParsedMetrics {
  let totalContent = "";
  files.forEach(f => {
    // Nettoyage militaire : on ne garde que les bases et on passe en majuscules
    const cleanContent = f.content.toUpperCase().replace(/[^ACTGN]/g, "");
    totalContent += cleanContent;
  });

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

  // Calcul d'une entropie simplifiée pour le contraste
  const entropy = Object.values(frequencies).reduce((acc, f) => {
    return f > 0 ? acc - f * Math.log2(f) : acc;
  }, 0);

  // Mapping tactique : 
  // - GC content -> Saturation (plus de GC = plus vibrant)
  // - Entropie -> Contraste (plus de désordre = plus de contraste)
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
      contraste: { mean: Math.round((entropy / 2.32) * 100) }, // 2.32 est l'entropie max pour 5 bases
    },
    finitions: {
      grain: { type: entropy > 1.5 ? "coarse" : "fine", intensity: Math.round(entropy * 10) },
    },
    _meta: {
      fileCount: files.length,
      totalLength: length,
      integrity_hash: Buffer.from(totalContent).slice(0, 16).toString("hex"),
    }
  };
}
