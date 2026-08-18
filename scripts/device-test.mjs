// Load the live site at every common mobile/tablet viewport and screenshot it.
// Also runs some structural sanity checks and flags obvious layout issues.

import {chromium, devices} from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'

const URL = process.env.SITE_URL || 'https://abtpaper-website.pages.dev'
const OUT = path.resolve('./scripts/device-screenshots')
await fs.mkdir(OUT, {recursive: true})

// Two categories: phones and tablets. Both landscape and portrait for tablets.
const suite = [
  // ---- Phones (portrait) ----
  {name: '01_iphone-se',        device: devices['iPhone SE']},        // 375×667
  {name: '02_iphone-13',        device: devices['iPhone 13']},        // 390×844
  {name: '03_iphone-14-pro-max',device: devices['iPhone 14 Pro Max']},// 430×932
  {name: '04_pixel-7',          device: devices['Pixel 7']},          // 412×915
  {name: '05_galaxy-s9',        device: devices['Galaxy S9+']},       // 320×658
  // ---- Tablets ----
  {name: '06_ipad-mini',        device: devices['iPad Mini']},        // 768×1024
  {name: '07_ipad-pro-11',      device: devices['iPad Pro 11']},      // 834×1194
  {name: '08_ipad-landscape',   device: devices['iPad (gen 7) landscape']},
  // ---- Desktop for reference ----
  {name: '09_desktop-1440',     viewport: {width: 1440, height: 900}, deviceScaleFactor: 2, userAgent: undefined},
  {name: '10_desktop-1920',     viewport: {width: 1920, height: 1080}, deviceScaleFactor: 2, userAgent: undefined},
]

const browser = await chromium.launch()
const results = []

for (const {name, device, viewport, deviceScaleFactor, userAgent} of suite) {
  const contextOpts = device
    ? {...device}
    : {viewport, deviceScaleFactor, userAgent}
  const ctx = await browser.newContext(contextOpts)
  const page = await ctx.newPage()

  await page.goto(URL, {waitUntil: 'networkidle', timeout: 30000})
  // Ensure fonts + images render
  await page.waitForTimeout(1500)

  // ---- Sanity checks ----
  const h = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth
    const clientWidth = document.documentElement.clientWidth
    const horizontallyScrolls = scrollWidth > clientWidth + 1
    const headerH = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0
    const landingH = document.querySelector('.landing')?.getBoundingClientRect().height ?? 0
    // Find any element sticking out horizontally
    const overflowers = []
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.right > clientWidth + 1 && r.width > 0) {
        overflowers.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.baseVal ?? el.className ?? '',
          right: Math.round(r.right),
          width: Math.round(r.width),
        })
      }
    })
    return {
      viewport: {w: clientWidth, h: window.innerHeight},
      scrollWidth,
      horizontallyScrolls,
      headerH,
      landingH,
      overflowers: overflowers.slice(0, 5),
    }
  })

  // ---- Full-page screenshot ----
  const shot = `${OUT}/${name}.jpg`
  await page.screenshot({path: shot, fullPage: true, type: 'jpeg', quality: 70})
  const size = (await fs.stat(shot)).size

  results.push({name, ...h, screenshot: shot, kb: Math.round(size / 1024)})
  await ctx.close()
  console.log(
    `${name.padEnd(28)} ${String(h.viewport.w).padStart(4)}×${String(h.viewport.h).padEnd(4)}  ` +
    `scrollW ${String(h.scrollWidth).padStart(4)}  ` +
    (h.horizontallyScrolls ? '⚠️  HORIZONTAL SCROLL' : '✓ ok') +
    `  ${Math.round(size / 1024)}KB`,
  )
  if (h.overflowers.length > 0) {
    for (const o of h.overflowers) {
      console.log(`    ↳ overflow: <${o.tag}.${o.cls}> right=${o.right} width=${o.width}`)
    }
  }
}

await browser.close()
console.log(`\nScreenshots: ${OUT}`)
