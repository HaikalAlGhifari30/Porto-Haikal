const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type);
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const body = Buffer.concat([typeBuf, data]);
    const crc = zlib.crc32(body);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([lenBuf, body, crcBuf]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  return Buffer.concat([
    header,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

function getLogoPixel(x, y, size) {
  const scale = size / 32;
  const px = x / scale;
  const py = y / scale;

  const inShadow = (px >= 5 && px <= 31 && py >= 5 && py <= 31);
  const inCard = (px >= 2 && px <= 28 && py >= 2 && py <= 28);
  const onBorder = inCard && (px <= 4 || px >= 26 || py <= 4 || py >= 26);

  const inHLeft = (px >= 7 && px <= 10 && py >= 8 && py <= 22);
  const inCrossbar = (px >= 7 && px <= 18 && py >= 13 && py <= 16);
  const inGDrop = (px >= 15 && px <= 18 && py >= 13 && py <= 22);
  const inGBottom = (px >= 15 && px <= 23 && py >= 19 && py <= 22);
  const inGRight = (px >= 20 && px <= 23 && py >= 14 && py <= 22);
  const inGShelf = (px >= 17 && px <= 23 && py >= 14 && py <= 17);
  const inAccentDot = (px >= 20 && px <= 23 && py >= 8 && py <= 11);

  const inGlyph = inHLeft || inCrossbar || inGDrop || inGBottom || inGRight || inGShelf || inAccentDot;

  if (inCard) {
    if (onBorder) return [0, 0, 0, 255];
    if (inGlyph) return [0, 0, 0, 255];
    return [250, 204, 21, 255]; // #FACC15
  }

  if (inShadow) {
    return [0, 0, 0, 180];
  }

  return [0, 0, 0, 0];
}

function createICO(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const dirEntries = [];

  for (const png of pngBuffers) {
    const entry = Buffer.alloc(16);
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

console.log('Generating PNG favicons and logos...');
const png32 = createPNG(32, 32, (x, y) => getLogoPixel(x, y, 32));
const png48 = createPNG(48, 48, (x, y) => getLogoPixel(x, y, 48));
const png180 = createPNG(180, 180, (x, y) => getLogoPixel(x, y, 180));
const png192 = createPNG(192, 192, (x, y) => getLogoPixel(x, y, 192));
const png512 = createPNG(512, 512, (x, y) => getLogoPixel(x, y, 512));

const icoBuffer = createICO([png32, png48]);

fs.writeFileSync('public/favicon.ico', icoBuffer);
fs.writeFileSync('public/favicon.png', png512);
fs.writeFileSync('public/apple-touch-icon.png', png180);
fs.writeFileSync('public/apple-touch-icon-precomposed.png', png180);
fs.writeFileSync('public/android-chrome-192x192.png', png192);
fs.writeFileSync('public/android-chrome-512x512.png', png512);
fs.writeFileSync('public/hag-logo.png', png512);
fs.writeFileSync('public/logo.png', png512);

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" shape-rendering="crispEdges">
  <!-- Retro Shadow -->
  <rect x="18" y="18" width="96" height="96" fill="#000000" opacity="0.35" />
  <!-- Main Badge Outer Border & Background -->
  <rect x="6" y="6" width="96" height="96" fill="#FACC15" stroke="#000000" stroke-width="8" />
  <!-- H Left Column -->
  <rect x="22" y="24" width="14" height="60" fill="#000000" />
  <!-- H Crossbar to G Path -->
  <path d="M 22 50 H 64 V 84 H 90 V 60 H 70" fill="none" stroke="#000000" stroke-width="14" stroke-linecap="square" stroke-linejoin="miter" />
  <!-- Accent Pixel Top Right -->
  <rect x="76" y="24" width="14" height="14" fill="#000000" />
</svg>
`;

fs.writeFileSync('public/icon.svg', svgContent);

console.log('All favicons, icons, and logos built successfully!');
