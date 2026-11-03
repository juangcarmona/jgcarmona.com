// Generates the site icons and the default social image in public/ from the portrait.
// Run with `npm run brand` after changing src/assets/portrait.jpg; the outputs are committed.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const PORTRAIT = 'src/assets/portrait.jpg';

// Lighthouse palette (tokens.css): night canvas, slate boundaries and signal blue.
const NIGHT = '#0d0f17';
const SLATE = '#26344b';
const BLUE = '#4da3ff';
const ICE = '#f8faff';
const MUTED = '#aab6c9';

// Head and shoulders on the dark studio background. The face is recognisable at 48px and up and
// the glasses and beard still show at 32px; at 16px no crop is recognisable, so this one is kept for
// consistency across sizes, not for legibility. Coordinates are for the 1200x1200 portrait.
const HEAD = { left: 330, top: 150, width: 620, height: 620 };

const head = (size) => sharp(PORTRAIT).extract(HEAD).resize(size, size).png().toBuffer();

// An ICO container holding one PNG image per size.
function toIco(images) {
	const header = Buffer.alloc(6 + 16 * images.length);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(images.length, 4);
	let offset = header.length;
	images.forEach(({ size, png }, i) => {
		const entry = 6 + 16 * i;
		header.writeUInt8(size % 256, entry);
		header.writeUInt8(size % 256, entry + 1);
		header.writeUInt16LE(1, entry + 4);
		header.writeUInt16LE(32, entry + 6);
		header.writeUInt32LE(png.length, entry + 8);
		header.writeUInt32LE(offset, entry + 12);
		offset += png.length;
	});
	return Buffer.concat([header, ...images.map(({ png }) => png)]);
}

// Open Graph: the name and the photo on the night canvas, with the site grid and a blue offset frame.
const grid = Array.from({ length: 31 }, (_, i) => `<path d="M${i * 40} 0V630" />`).join('') +
	Array.from({ length: 16 }, (_, i) => `<path d="M0 ${i * 40}H1200" />`).join('');

const ogBackground = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${NIGHT}"/>
<g stroke="${BLUE}" stroke-opacity="0.07" stroke-width="1">${grid}</g>
<rect x="0" y="0" width="1200" height="4" fill="${BLUE}"/>
<rect x="752" y="107" width="400" height="440" fill="${BLUE}" fill-opacity="0.22"/>
<rect x="738.5" y="93.5" width="401" height="441" fill="none" stroke="${SLATE}" stroke-width="1"/>
<text x="80" y="268" font-family="DejaVu Sans, sans-serif" font-size="62" font-weight="700" fill="${ICE}" letter-spacing="-1.5">Juan G. Carmona</text>
<rect x="80" y="296" width="96" height="4" fill="${BLUE}"/>
<text x="80" y="360" font-family="DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">Software Architect · AI Strategist</text>
<text x="80" y="404" font-family="DejaVu Sans, sans-serif" font-size="30" fill="${MUTED}">Critical &amp; Secure Systems</text>
<text x="80" y="520" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="${BLUE}">jgcarmona.com</text>
</svg>`;

const photo = await sharp(PORTRAIT).extract({ left: 150, top: 60, width: 900, height: 990 }).resize(400, 440).png().toBuffer();
const og = await sharp(Buffer.from(ogBackground))
	.composite([{ input: photo, left: 739, top: 94 }])
	.png()
	.toBuffer();

const sizes = [16, 32, 48];
await writeFile('public/favicon.ico', toIco(await Promise.all(sizes.map(async (size) => ({ size, png: await head(size) })))));
await writeFile('public/favicon-32.png', await head(32));
await writeFile('public/apple-touch-icon.png', await head(180));
await writeFile('public/og-default.png', og);
console.log('Icons and social image written to public/.');
