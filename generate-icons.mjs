import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../public/icons')

function crc32(buf) {
  let crc = ~0
  for (const byte of buf) {
    crc ^= byte
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  return ~crc >>> 0
}

function chunk(tag, data) {
  const tagBuf = Buffer.from(tag)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tagBuf, data])))
  return Buffer.concat([len, tagBuf, data, crcBuf])
}

function png(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1)
    raw[rowStart] = 0
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4)
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function draw(size) {
  const pixels = Buffer.alloc(size * size * 4)
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.42
  const eyeR = Math.max(1.2, size * 0.07)
  const mouthY = cy + size * 0.12
  const mouthR = size * 0.22

  const setPx = (x, y, r, g, b, a) => {
    const i = (y * size + x) * 4
    pixels[i] = r
    pixels[i + 1] = g
    pixels[i + 2] = b
    pixels[i + 3] = a
  }

  const fillCircle = (fx, fy, r, color) => {
    const r2 = r * r
    const xmin = Math.max(0, Math.floor(fx - r - 1))
    const xmax = Math.min(size, Math.ceil(fx + r + 2))
    const ymin = Math.max(0, Math.floor(fy - r - 1))
    const ymax = Math.min(size, Math.ceil(fy + r + 2))
    for (let y = ymin; y < ymax; y += 1) {
      for (let x = xmin; x < xmax; x += 1) {
        const dx = x + 0.5 - fx
        const dy = y + 0.5 - fy
        if (dx * dx + dy * dy <= r2) {
          setPx(x, y, color[0], color[1], color[2], color[3])
        }
      }
    }
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      const d = Math.hypot(dx, dy)
      if (d <= radius) {
        setPx(x, y, 255, 184, 48, 255)
      } else {
        setPx(x, y, 0, 0, 0, 0)
      }
    }
  }

  fillCircle(cx - size * 0.14, cy - size * 0.08, eyeR, [61, 36, 8, 255])
  fillCircle(cx + size * 0.14, cy - size * 0.08, eyeR, [61, 36, 8, 255])

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - mouthY
      const d = Math.hypot(dx, dy)
      if (Math.abs(d - mouthR) < Math.max(1.2, size * 0.045) && dy > 0) {
        setPx(x, y, 196, 72, 18, 255)
      }
    }
  }

  return png(size, size, pixels)
}

mkdirSync(outDir, { recursive: true })
for (const size of [16, 32, 48, 128]) {
  const dest = join(outDir, `icon${size}.png`)
  writeFileSync(dest, draw(size))
  console.log('wrote', dest)
}
