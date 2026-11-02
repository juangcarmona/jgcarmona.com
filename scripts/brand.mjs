// Generates the JGC brand assets in public/ from the monogram geometry.
// Run with `node scripts/brand.mjs` after changing the monogram; the outputs are committed.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Lighthouse palette (tokens.css): night canvas and signal blue.
const NIGHT = '#0d0f17';
const NAVY = '#111b2b';
const BLUE = '#4da3ff';
const ICE = '#f8faff';
const MUTED = '#aab6c9';

// Stroke letterforms on a 64x64 grid, so the mark renders the same everywhere.
export const MONOGRAM_PATHS = [
	'M15 23.5V35.5A5 5 0 0 1 5 35.5', // J
	'M37 26A8.5 8.5 0 1 0 39.5 32H32.5', // G
	'M57 26A8.5 8.5 0 1 0 57 38', // C
];

const strokes = (color, width = 4.5) =>
	MONOGRAM_PATHS.map(
		(d) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`,
	).join('');

const icon = (size = 64) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
<rect width="64" height="64" rx="12" fill="${NIGHT}"/>${strokes(BLUE)}</svg>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${NIGHT}"/>
<rect x="80" y="80" width="1040" height="470" rx="10" fill="${NAVY}" stroke="#26344b" stroke-width="2"/>
<g transform="translate(128 175) scale(4.2)"><rect width="64" height="64" rx="12" fill="${NIGHT}"/>${strokes(BLUE)}</g>
<text x="460" y="285" font-family="DejaVu Sans, sans-serif" font-size="64" font-weight="700" fill="${ICE}">Juan G. Carmona</text>
<text x="460" y="350" font-family="DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">Software Architect · AI Strategist</text>
<text x="460" y="395" font-family="DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">Critical &amp; Secure Systems</text>
<text x="460" y="470" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="${BLUE}">jgcarmona.com</text>
</svg>`;

// An ICO container holding a single PNG image.
function toIco(png, size) {
	const header = Buffer.alloc(22);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(1, 4);
	header.writeUInt8(size, 6);
	header.writeUInt8(size, 7);
	header.writeUInt16LE(1, 10);
	header.writeUInt16LE(32, 12);
	header.writeUInt32LE(png.length, 14);
	header.writeUInt32LE(header.length, 18);
	return Buffer.concat([header, png]);
}

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

await writeFile('public/favicon.svg', icon());
await writeFile('public/favicon.ico', toIco(await png(icon(32), 32), 32));
await writeFile('public/apple-touch-icon.png', await png(icon(180), 180));
await writeFile('public/og-default.png', await sharp(Buffer.from(og)).png().toBuffer());
console.log('Brand assets written to public/.');
