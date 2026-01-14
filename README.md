# ADN Converter - Professional DNA to LUT Pipeline

## Overview
ADN Converter is a high-precision, tactical-grade software designed to transform DNA sequence data into professional color grading assets. Specifically engineered for artists and production houses, the system analyzes the biological metrics of "Master Painters" (Vermeer, Rembrandt, etc.) to generate industry-standard LUTs and presets.

## Key Features
- **Master Painter Identification**: Automatic detection of artists (Vermeer, Rembrandt, Da Vinci, etc.) through DNA content analysis.
- **5-Dimension DNA Analysis**: Specialized processing for:
  - **Composition**: Structural mapping of the sequence.
  - **Couleurs (Colors)**: Advanced color matrix translation.
  - **Finitions (Finishes)**: Texture and grain synthesis.
  - **Lumières (Lights)**: Contrast and dynamic range optimization.
  - **Sujet et Iconographie**: Symbolic and subject-matter data mapping.
- **Multi-Platform Output**: Generates `.CUBE`, `.3DL`, and `.XMP` formats compatible with:
  - DaVinci Resolve
  - Adobe Premiere Pro
  - Final Cut Pro
  - Adobe Lightroom & Photoshop
- **Automated Publication Pipeline**: Generates ready-to-use marketing descriptions and metadata for 10+ marketplaces (Envato, Creative Market, Etsy, etc.).

## Technical Architecture
- **Frontend**: React 18 with TypeScript, Vite, and TailwindCSS (Tactical UI).
- **Backend**: Express.js with a military-grade conversion engine.
- **DNA Parser**: Real-time analysis of base frequencies (A, C, T, G, N), entropy, and GC-content.
- **Integrity System**: SHA-256 based integrity hashing to ensure preset uniqueness.

## Getting Started
### Prerequisites
- Node.js (Latest LTS)
- PostgreSQL Database

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database URL in the environment variables.
4. Push the database schema:
   ```bash
   npm run db:push
   ```

### Running the Application
```bash
npm run dev
```
The application will be available at `http://0.0.0.0:5000`.

## Publication Ecosystem
The system generates optimized listing documentation for:
- **Professional Markets**: Envato, Creative Market, Adobe Exchange.
- **Direct-to-Consumer**: Gumroad, Sellfy, Shopify, Etsy.
- **Specialized Communities**: CineD, Filtergrade, Own3d (Streaming).

## License
Professional Commercial License - Developed for elite digital creators and colorists.
