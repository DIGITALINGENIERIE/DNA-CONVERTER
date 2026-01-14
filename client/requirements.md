## Packages
framer-motion | For complex UI transitions, scanning lines, and appearing text effects
lucide-react | Icon set (already in base, but emphasizing usage)
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility for merging Tailwind classes safely

## Notes
Tailwind Config:
- Add custom colors: terminal-black (#0d0d0d), terminal-green (#00ff41), terminal-dim (#003b00)
- Add custom font: 'Fira Code' for everything
- Add custom animations: 'scanline', 'blink'

API Integration:
- Uploads use POST /api/jobs (multipart/form-data inferred, but MVP might use JSON as per schema notes if simple text)
- Polling required on /api/jobs/:id for progress updates
- Download link at /api/jobs/:id/download
