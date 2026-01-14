export const publicationTemplates = {
  envato: {
    title: (artist: string, type: string) => `[CINEMATIC] ${artist} - ${type} DNA Color Grade Pack for DaVinci & Premiere`,
    description: (hash: string, artist: string, type: string) => `✨ Achieve professional cinematic film grade in just a few clicks!\n\n` +
      `[THE ART OF THE MASTERS]\n` +
      `This exclusive pack is generated from the unique ${type} DNA metrics of ${artist}. Our proprietary technology translates the aesthetic characteristics of history's greatest painters into high-precision color science.\n\n` +
      `🎨 ARTIST FOCUS: ${artist}\n` +
      `🧬 DNA TYPE: ${type}\n\n` +
      `🎬 BÉNÉFICES :\n` +
      `• ${artist}-inspired cinematic look for your projects\n` +
      `• 1-Click color grading - save hours of work\n` +
      `• Non-destructive workflow - keeps original footage pristine\n` +
      `• Validated Integrity Hash: ${hash}\n\n` +
      `📦 WHAT YOU RECEIVE :\n` +
      `• High-resolution .CUBE LUTs (Mac & Windows)\n` +
      `• Compatible with Premiere Pro, DaVinci Resolve, FCPX, Photoshop\n` +
      `• Commercial License included for client work\n` +
      `• Installation Guide (PDF) included`,
    price: "29€",
    metadata: (artist: string, type: string) => `${artist.toLowerCase()}, ${type.toLowerCase()}, cinematic, film look, professional, color grading, hollywood-style, davinci resolve, luts`
  },
  creative_market: {
    title: (artist: string, type: string) => `${artist} DNA Presets - ${type} Professional Color Matrix`,
    description: (hash: string, artist: string, type: string) => `✨ Elevate your photography with DNA-based color science inspired by ${artist}.\n\n` +
      `[THE SCIENCE OF ART]\n` +
      `Unlike standard presets, this tactical pack uses an advanced color matrix derived from ${artist}'s ${type} DNA sequences. Perfect for high-end photography requiring the touch of a master.\n\n` +
      `🔥 KEY FEATURES :\n` +
      `• Derived from ${artist}'s signature ${type} style\n` +
      `• Bold, creative color grading for maximum energy\n` +
      `• Preserves texture and detail in high-resolution shots\n` +
      `• Integrity Verified: ${hash}\n\n` +
      `📦 INCLUDED ASSETS :\n` +
      `• Adobe Lightroom Presets (.XMP)\n` +
      `• Professional 3D LUTs (.CUBE)\n` +
      `• Full Commercial Use Rights\n` +
      `• Quick Start Documentation`,
    price: "35€",
    metadata: (artist: string, type: string) => `${artist.toLowerCase()}, ${type.toLowerCase()}, photography, presets, lightroom, editing, dna, high-end, master-painter`
  },
  adobe: {
    title: (artist: string, type: string) => `${artist} DNA Look - ${type} Premium CC Edition`,
    description: (hash: string, artist: string, type: string) => `✨ Professional results directly in Adobe Creative Cloud, inspired by ${artist}.\n\n` +
      `This DNA-driven look translates ${artist}'s ${type} into dazzling cinematic visuals. Optimized for Premiere Pro and Photoshop with high-resolution matrix mapping.\n\n` +
      `✅ HIGHLIGHTS :\n` +
      `• Native integration for Adobe CC 2026+\n` +
      `• Based on ${artist} aesthetic metrics\n` +
      `• Optimized for skin tone preservation\n` +
      `• Secure Hash: ${hash}\n\n` +
      `📦 PACKAGE CONTENTS :\n` +
      `• Premium .CUBE and .LOOK files\n` +
      `• Photoshop Camera Raw presets\n` +
      `• Technical support included`,
    price: "39€",
    metadata: (artist: string, type: string) => `adobe, ${artist.toLowerCase()}, ${type.toLowerCase()}, premiere, photoshop, lut, dna, cinematic`
  },
  etsy: {
    title: (artist: string, type: string) => `${artist} DNA Preset - ${type} Cinematic Digital Download`,
    description: (hash: string, artist: string, type: string) => `✨ Handcrafted digital assets inspired by ${artist}.\n\n` +
      `Give your content a magical, cinematic feel with presets generated from ${artist}'s ${type} DNA. Ideal for creators looking for a historical artistic signature.\n\n` +
      `🌟 WHY CHOOSE THIS PACK :\n` +
      `• ${artist}'s unique visual signature\n` +
      `• Instant digital download - start editing now\n` +
      `• Easy to use - 1-click application\n` +
      `• Unique ID: ${hash}\n\n` +
      `📦 WHAT'S INSIDE :\n` +
      `• Lightroom Desktop & Mobile presets\n` +
      `• Video LUTs for mobile editing apps\n` +
      `• Step-by-step PDF instructions`,
    price: "19€",
    metadata: (artist: string, type: string) => `etsy, ${artist.toLowerCase()}, ${type.toLowerCase()}, digital, preset, lut, creator, instagram, vlogger`
  },
  gumroad: {
    title: (artist: string, type: string) => `${artist} DNA Sequence - ${type} Full Professional Pipeline`,
    description: (hash: string, artist: string, type: string) => `✨ Complete control over your color grading pipeline with ${artist}'s ${type} style.\n\n` +
      `Spend less time editing and more time telling stories like ${artist}. This DNA-based tactical pack is built for speed and visual impact.\n\n` +
      `⚙️ TECHNICAL SPECS :\n` +
      `• ${artist} aesthetic mapping v2.4\n` +
      `• 64-bit High-Precision Matrix\n` +
      `• Lifetime free updates included\n` +
      `• Secure Hash: ${hash}\n\n` +
      `📦 DOWNLOAD INCLUDES :\n` +
      `• Multi-format LUTs (.CUBE, .3DL, .XMP)\n` +
      `• Full documentation & workflow guide`,
    price: "25€+",
    metadata: (artist: string, type: string) => `gumroad, ${artist.toLowerCase()}, ${type.toLowerCase()}, creator, color, dna, filmmaking`
  },
  sellfy: {
    title: (artist: string, type: string) => `${artist} DNA Tactical Look - ${type} Pro Colorist Series`,
    description: (hash: string, artist: string, type: string) => `✨ Professional series presets for serious editors, based on ${artist}.\n\n` +
      `Make your content impossible to ignore with bold, creative color grading derived from ${artist}'s ${type}.\n\n` +
      `🎯 TARGET USE CASES :\n` +
      `• Fashion & Editorial photography\n` +
      `• Urban & Gritty city vibes\n` +
      `• Corporate high-end production\n` +
      `• Verified Hash: ${hash}\n\n` +
      `📦 PROFESSIONAL PACK :\n` +
      `• Studio-grade 3D LUTs\n` +
      `• Krita & Photoshop bundles\n` +
      `• Priority technical support`,
    price: "29€",
    metadata: (artist: string, type: string) => `sellfy, ${artist.toLowerCase()}, ${type.toLowerCase()}, pro, preset, lut, fashion`
  },
  cined: {
    title: (artist: string, type: string) => `${artist} Cinema Grade DNA - ${type} Tactical Edition`,
    description: (hash: string, artist: string, type: string) => `✨ Advanced cinema-grade LUTs based on ${artist}'s ${type} DNA metrics.\n\n` +
      `Tell stories with the colors of ${artist}. This pack helps you convey deep emotions through subtle desaturation and warm palettes.\n\n` +
      `🎥 CINEMA SPECS :\n` +
      `• Optimized for ARRI, RED, and Sony cameras\n` +
      `• Preserves maximum dynamic range\n` +
      `• Hollywood-style color science\n` +
      `• Integrity: ${hash}\n\n` +
      `📦 BOX CONTENT :\n` +
      `• Precision .CUBE LUTs (32x32 & 64x64)\n` +
      `• Technical white paper on DNA mapping`,
    price: "49€",
    metadata: (artist: string, type: string) => `cinema, ${artist.toLowerCase()}, ${type.toLowerCase()}, pro, lut, dna, filmmaking`
  },
  filtergrade: {
    title: (artist: string, type: string) => `${artist} DNA Tactical Presets - ${type} Ultimate Creative Collection`,
    description: (hash: string, artist: string, type: string) => `✨ The ultimate collection of ${artist}-driven looks.\n\n` +
      `Inspired by the ${type} of ${artist}, these presets enhance outdoor photos and travel footage with beautiful, natural colors.\n\n` +
      `🌿 IDEAL FOR :\n` +
      `• Landscape & Nature photography\n` +
      `• Outdoor adventure vlogs\n` +
      `• Travel & Lifestyle content\n` +
      `• Hash: ${hash}\n\n` +
      `📦 ULTIMATE BUNDLE :\n` +
      `• Master-painter aesthetic mapping\n` +
      `• Multi-software compatibility list\n` +
      `• FilterGrade verified license`,
    price: "39€",
    metadata: (artist: string, type: string) => `filtergrade, ${artist.toLowerCase()}, ${type.toLowerCase()}, preset, dna, nature`
  },
  own3d: {
    title: (artist: string, type: string) => `Streamer ${artist} DNA Look - ${type} Pro Tactical Grade`,
    description: (hash: string, artist: string, type: string) => `✨ Boost your stream visual quality with ${artist}-based presets.\n\n` +
      `Make your live content stand out with vibrant, high-impact colors inspired by ${artist}'s ${type}.\n\n` +
      `🎮 STREAMER PERKS :\n` +
      `• Optimized for OBS, Streamlabs, and Twitch Studio\n` +
      `• Enhances face-cam lighting & clarity\n` +
      `• Low-latency LUT processing\n` +
      `• Hash: ${hash}\n\n` +
      `📦 STREAMER PACK :\n` +
      `• Live-optimized .CUBE filters\n` +
      `• Setup guide for OBS/Streamlabs`,
    price: "24€",
    metadata: (artist: string, type: string) => `stream, ${artist.toLowerCase()}, ${type.toLowerCase()}, gaming, dna, obs`
  },
  shopify: {
    title: (artist: string, type: string) => `${artist} DNA Collection - ${type} Exclusive Professional Bundle`,
    description: (hash: string, artist: string, type: string) => `✨ Exclusive ${artist}-driven presets for your professional store.\n\n` +
      `The pinnacle of our DNA color science, mapping ${artist}'s ${type}. A complete bundle for agencies looking for a consistent, high-end visual signature.\n\n` +
      `💎 EXCLUSIVE FEATURES :\n` +
      `• Full multi-platform compatibility\n` +
      `• White-label license availability\n` +
      `• Advanced 64-bit color matrix\n` +
      `• Hash: ${hash}\n\n` +
      `📦 EXCLUSIVE BUNDLE :\n` +
      `• All formats included (.CUBE, .XMP, .LOOK)\n` +
      `• Premium video demo & tutorials\n` +
      `• Dedicated success manager`,
    price: "49€",
    metadata: (artist: string, type: string) => `shopify, ${artist.toLowerCase()}, ${type.toLowerCase()}, pro, dna, agency`
  }
};
