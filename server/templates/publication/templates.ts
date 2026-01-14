export const publicationTemplates = {
  envato: {
    title: (id: string) => `[CINEMATIC] Tactical DNA Preset - ${id} for DaVinci & Premiere`,
    description: (hash: string) => `✨ Transform your projects with DNA-driven precision.\n\nHash: ${hash}\n\nIdeal for professional filmmakers looking for Hollywood-grade results.`,
    price: "29€",
    metadata: "LUTs, Presets, Cinematic, DNA, Professional, DaVinci Resolve, Premiere Pro"
  },
  creative_market: {
    title: (id: string) => `Professional DNA Color Grading Pack - ${id}`,
    description: (hash: string) => `A unique preset generated from DNA sequence metrics.\n\nConsistency: 100%\nIntegrity: ${hash}`,
    price: "35€",
    metadata: "Photography, Presets, Lightroom, Editing, DNA, High-End"
  },
  adobe: {
    title: (id: string) => `Tactical DNA Look - Premium Edition`,
    description: (hash: string) => `Direct integration for Adobe Creative Cloud.\n\nValidated Integrity: ${hash}`,
    price: "39€",
    metadata: "Adobe, Premiere, Photoshop, LUT, DNA"
  },
  etsy: {
    title: (id: string) => `DNA Preset Pack - Digital Download`,
    description: (hash: string) => `Handcrafted digital assets for independent creators.\n\nUnique ID: ${hash}`,
    price: "19€",
    metadata: "Etsy, Digital, Preset, LUT, Creator"
  },
  gumroad: {
    title: (id: string) => `Tactical DNA Sequence - Full Access`,
    description: (hash: string) => `Complete control over your color grading pipeline.\n\nSecure Hash: ${hash}`,
    price: "25€+",
    metadata: "Gumroad, Creator, Color, DNA"
  },
  sellfy: {
    title: (id: string) => `DNA Tactical Look - Pro Series`,
    description: (hash: string) => `Professional series presets for serious editors.\n\nHash: ${hash}`,
    price: "29€",
    metadata: "Sellfy, Pro, Preset, LUT"
  },
  cined: {
    title: (id: string) => `Cinema Grade DNA - Tactical Edition`,
    description: (hash: string) => `Advanced cinema-grade LUTs based on DNA metrics.\n\nIntegrity: ${hash}`,
    price: "49€",
    metadata: "Cinema, Pro, LUT, DNA"
  },
  filtergrade: {
    title: (id: string) => `DNA Tactical Presets - Ultimate Pack`,
    description: (hash: string) => `The ultimate collection of DNA-driven looks.\n\nHash: ${hash}`,
    price: "39€",
    metadata: "Filtergrade, Ultimate, Preset, DNA"
  },
  own3d: {
    title: (id: string) => `Streamer DNA Look - Tactical Overlay`,
    description: (hash: string) => `Boost your stream visual quality with DNA-based presets.\n\nHash: ${hash}`,
    price: "24€",
    metadata: "Stream, Gaming, Overlay, DNA"
  },
  shopify: {
    title: (id: string) => `DNA Tactical Collection - Exclusive`,
    description: (hash: string) => `Exclusive DNA-driven presets for your professional store.\n\nHash: ${hash}`,
    price: "49€",
    metadata: "Shopify, Exclusive, Pro, DNA"
  }
};
