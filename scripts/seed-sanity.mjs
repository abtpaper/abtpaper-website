// One-shot seed script: uploads all existing content + images from the current
// homeData.ts + public/photos + public/certs into the Sanity project so the
// Studio has real content the moment the user logs in.
//
// Usage:
//   SANITY_WRITE_TOKEN=<token>  node scripts/seed-sanity.mjs
//
// Idempotent: running it twice replaces the same singleton documents and
// re-uploads product series with the same IDs (createOrReplace).

import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error(
    'Missing SANITY_WRITE_TOKEN. Get one from https://www.sanity.io/manage/personal/project/wox2571x/api → Tokens → Add API token → Editor permission → copy the token and run:\n  SANITY_WRITE_TOKEN=<token> node scripts/seed-sanity.mjs',
  )
  process.exit(1)
}

const client = createClient({
  projectId: 'wox2571x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function uploadImage(relPath, filename) {
  const abs = path.join(ROOT, relPath)
  const bytes = await fs.readFile(abs)
  console.log(`  ↑ uploading ${filename} (${(bytes.length / 1024).toFixed(0)}KB)…`)
  const asset = await client.assets.upload('image', bytes, {filename})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function main() {
  console.log('Seeding Sanity project wox2571x / production…\n')

  // ---------- Upload all photos + cert marks ----------
  console.log('Uploading assets…')
  const A = {}
  const photoFiles = [
    'aerial', 'paper_line', 'craned_roll', 'pe_rollers', 'coating', 'roll',
    'machine', 'lab', 'warehouse', 'warehouse_pano', 'coating_line',
  ]
  for (const p of photoFiles) {
    A[p] = await uploadImage(`public/photos/${p}.jpg`, `${p}.jpg`)
  }
  const certFiles = ['sgs_iso9001', 'sgs_iso14001', 'fsc', 'sgs_coc', 'ukas', 'iaf']
  for (const c of certFiles) {
    A[`cert_${c}`] = await uploadImage(`public/certs/${c}.jpg`, `cert_${c}.jpg`)
  }
  console.log('All assets uploaded.\n')

  // ---------- Singleton documents ----------
  console.log('Writing singleton documents…')

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'ABT Digital Paper — paper reimagined',
    metaDescription:
      'ABT Digital Paper — paper manufacturer in Jiangmen, Guangdong. Base paper, PE-laminated, food-grade, and RC photo paper.',
    tel: '+86 (0)750 6419777',
    fax: '+86 (0)750 6418777',
    email: 'overseas@abtpaper.com',
    factoryAddress: [
      'B-2 Yinzhou Lake Paper Base',
      'Shuangshui Town, Xinhui District',
      'Jiangmen, Guangdong',
    ],
    salesAddress: [
      'Unit 701, No. 10 Jinju Rd',
      'Haizhu District, Guangzhou',
      'Guangdong',
    ],
    footerTagline:
      'Paper manufacturer since 2008. Base paper, RC-coated photo paper, and specialty coated substrates — engineered and finished in Jiangmen, Guangdong.',
  })

  await client.createOrReplace({
    _id: 'landingHero',
    _type: 'landingHero',
    eyebrow: 'Paper Manufacturer · Jiangmen, Guangdong · Since 2008',
    titleLine1: 'Paper',
    titleLine2: 'Reimagined',
    intro:
      "ABT is a paper manufacturer in Jiangmen, Guangdong. Paper making, laminating, and coating since 2013. Our base paper and coated substrates become premium retail packaging, food-service wrappers, greeting cards, photo prints, and dozens of other finished forms.",
    primaryCta: 'Explore our products',
    secondaryCta: 'Talk to us',
    backgroundImage: A.aerial,
    photoCredit: 'ABT Digital Paper · Jiangmen site',
  })

  await client.createOrReplace({
    _id: 'pageHero',
    _type: 'pageHero',
    eyebrow: 'Our production',
    title: 'One paper machine.',
    titleEm: 'Every paper we make.',
    body:
      'The 3.6-metre wet-end machine that runs every ABT roll — offset, kraft, PE-laminated, food-grade, and RC photo paper base. One line, one team, one furnish.',
    credit: 'Paper making line · Jiangmen plant',
    backgroundImage: A.paper_line,
  })

  await client.createOrReplace({
    _id: 'capabilities',
    _type: 'capabilities',
    eyebrow: 'Capabilities',
    title: 'A working coating line — and the pilot machine to prove it.',
    lede:
      'Production lines running six days a week at our Jiangmen plant. A dedicated pilot line for customer R&D — where we take a new coating from concept, through wet-end trial, to converted, packed, and shipped sample.',
    caps: [
      {num: '5,000', em: 't', unit: 'Per month · production capacity', desc: '60,000 tonnes of paper a year, on our own machine.'},
      {num: '3.6', em: 'm', unit: 'Paper machine width', desc: 'A full-scale wet-end paper machine, not a coating-only line.'},
      {num: '45', em: 'ac', unit: 'Facility · Jiangmen site', desc: 'Paper making, coating, converting, finishing, and warehousing — one site.'},
      {num: '17', em: 'yr', unit: 'In paper', desc: 'Founded 2008. Production since 2013. ISO-certified since 2014.'},
    ],
  })

  await client.createOrReplace({
    _id: 'manufBand',
    _type: 'manufBand',
    eyebrow: 'Manufacturing',
    title: 'Made in Jiangmen.',
    lede:
      'Wet-end paper making, extrusion coating, calendar finishing, and slitting — all under one roof in our Jiangmen plant. What we ship is what we made.',
    tiles: [
      {image: A.machine, imageAlt: 'Wet-end paper machine on the Jiangmen line', title: 'Wet-end paper making', sub: 'Our own furnish · in-house'},
      {image: A.lab, imageAlt: 'ABT quality-control and R&D lab', title: 'QC & R&D lab', sub: 'Every batch tested'},
      {image: A.warehouse_pano, imageAlt: 'Finished-roll warehouse panorama', title: 'Finished roll warehouse', sub: 'Slit, packed, ready to ship'},
    ],
  })

  await client.createOrReplace({
    _id: 'heritage',
    _type: 'heritage',
    eyebrow: 'Heritage',
    title: 'A paper manufacturer, not a converter.',
    large:
      'We make base paper on-site at our Jiangmen plant, coat and finish it in-house, and convert to any format your line requires — full size range of sheets and rolls, OEM/ODM packaging to your spec.',
    paragraphs: [
      "That vertical integration is why the base paper and the coating on top of it match: they were made for each other, in the same building, by the same people. Nothing about a roll of ABT paper is outsourced or someone else's problem.",
      "The result is coating consistency across four-year production runs, food-contact grades that don't require a separate supplier's certificate, and pilot-line development that goes from concept to converted sample in weeks, not quarters.",
    ],
    image: A.warehouse,
    imageAlt: 'Finished-roll warehouse at the Jiangmen site',
  })

  await client.createOrReplace({
    _id: 'certBand',
    _type: 'certBand',
    headingSub: 'Compliance & certifications',
    heading: 'Filed, current, and reviewed annually by SGS.',
    marks: [
      {image: A.cert_sgs_iso9001, alt: 'SGS System Certification — ISO 9001:2015', title: 'SGS System Certification · ISO 9001:2015 · Cert CN14/31465 · Valid Dec 2023 – Dec 2026'},
      {image: A.cert_sgs_iso14001, alt: 'SGS System Certification — ISO 14001:2015', title: 'SGS System Certification · ISO 14001:2015 · Cert CN14/31156 · Valid Jan 2024 – Oct 2026'},
      {image: A.cert_fsc, alt: 'FSC® — the mark of responsible forestry', title: 'FSC® Chain-of-Custody · Cert SGSHK-COC-011695 · Valid Jan 2025 – Jan 2030 · FSC® A000523'},
      {image: A.cert_sgs_coc, alt: 'SGS Chain-of-Custody Certification', title: 'SGS Chain-of-Custody Certification · Cert SGSHK-COC-011695 · Certified since 22 Jan 2015'},
      {image: A.cert_ukas, alt: 'UKAS Management Systems 0005', title: 'UKAS Management Systems accreditation 0005'},
      {image: A.cert_iaf, alt: 'IAF Member of Multilateral Recognition Arrangement', title: 'IAF Member of Multilateral Recognition Arrangement'},
    ],
    decTitle: 'Compliance declarations',
    declarations: [
      {key: 'REACH', value: 'Regulation (EC) 1907/2006 · Article 3(3) article · no SVHC substances at ≥ 0.1 % w/w'},
      {key: 'EUDR', value: 'Regulation (EU) 2023/1115 · signed statement available on request'},
      {key: 'Food-contact', value: 'Grade available · EU 1935/2004 & EU 10/2011 declarations on request'},
      {key: 'SDS', value: 'Full 16-section Safety Data Sheet · English + Simplified Chinese · on request'},
    ],
  })

  await client.createOrReplace({
    _id: 'contactSection',
    _type: 'contactSection',
    title: "Send us the finished form. We'll make the paper.",
    body: 'Sample requests, technical questions, food-grade certifications, OEM coating projects. Answered by the coating team in Jiangmen — not a distant sales office.',
    sideTitle: 'Direct to the factory',
    telLabel: 'Tel',
    faxLabel: 'Fax',
    emailLabel: 'Email',
    ctaLabel: 'Request a sample',
  })

  // ---------- Product Series (4 documents) ----------
  console.log('\nWriting product series…')
  const series = [
    {
      order: 1, category: 'Base Paper', title: 'Uncoated base paper.',
      lede: 'Offset and kraft base paper made on our own paper machine. Offset for premium print, publishing, and greeting cards; kraft for retail bags, gift boxes, and industrial converting. Wound to your core, packed to your spec.',
      info: [
        {k: 'Types', v: 'Offset · Kraft'},
        {k: 'Weight range', v: '80 – 400 g/m²'},
        {k: 'Formats', v: 'Rolls · sheets · OEM packaging'},
      ],
      uses: ['Retail packaging', 'Gift boxes & bags', 'Publishing & hardcover', 'Greeting cards', 'Industrial converting'],
      image: A.craned_roll,
      imageAlt: 'Finished paper roll being craned onto the winder at the Jiangmen plant',
      altBg: false, reverse: false,
    },
    {
      order: 2, category: 'PE-Laminated Base Paper', title: 'PE-laminated base paper.',
      lede: 'Double-sided PE-laminated base paper for silver-halide converters and inkjet RC coating houses. The substrate our own RC photo paper is built on — and the one many external coating partners buy from us to build theirs.',
      info: [
        {k: 'Sub-lines', v: 'Silver-halide base · Inkjet RC base'},
        {k: 'Weight range', v: '150 – 270 g/m²'},
        {k: 'Coating', v: 'LDPE + HDPE, both sides'},
      ],
      uses: ['Silver-halide photo paper', 'Inkjet RC photo paper', 'OEM coating projects', 'Specialty converting'],
      image: A.pe_rollers,
      imageAlt: 'PE laminating rollers at the Jiangmen plant',
      altBg: true, reverse: true,
    },
    {
      order: 3, category: 'Food-Grade Paper', title: 'Food-grade paper.',
      lede: 'Food-contact paper for converters producing paper straws, food-service wrappers, cup and cone paper, and packaged-food liners. Compliant with food-contact material requirements; documentation on request.',
      info: [
        {k: 'Weight range', v: '80 – 100 g/m²'},
        {k: 'Compliance', v: 'Food-contact grade'},
        {k: 'Formats', v: 'Rolls · custom width'},
      ],
      uses: ['Paper straws', 'Ice cream cone paper', 'Food-service wrappers', 'Cup & tray liners', 'Packaged-food inserts'],
      image: A.coating,
      imageAlt: 'Calendar rollers with paper webbing',
      altBg: false, reverse: false,
    },
    {
      order: 4, category: 'RC Photo Paper', title: 'RC-coated photo paper.',
      lede: 'Resin-coated photo paper for high-speed inkjet, photo-lab, and pro-imaging print. Six finishes, single or double-sided, converted to any commercial roll or sheet format — OEM/ODM packaging per client spec.',
      info: [
        {k: 'Weight range', v: '170 – 300 g/m²'},
        {k: 'Finishes', v: 'Glossy · Satin · Lustre · Silky · Canvas · Metallic'},
        {k: 'Formats', v: 'Rolls 610 – 1,830 mm · Sheets A4, 3R, 4R, 5R'},
      ],
      uses: [
        'Photo books & albums', 'Photo prints', 'Greeting cards', 'Photo-lab minilab',
        'High-speed inkjet press', 'Indigo digital press',
        'Water-based inkjet', 'Eco-solvent inkjet', 'Latex inkjet',
        'Aqueous inkjet', 'Solvent inkjet', 'UV inkjet',
      ],
      image: A.roll,
      imageAlt: 'Finished RC photo paper roll on the winder',
      altBg: true, reverse: true,
    },
  ]
  for (const s of series) {
    await client.createOrReplace({
      _id: `series-${String(s.order).padStart(2, '0')}`,
      _type: 'productSeries',
      ...s,
    })
    console.log(`  ✓ series-${String(s.order).padStart(2, '0')} · ${s.title}`)
  }

  console.log('\n✅ Seed complete.')
  console.log('Log in at https://wox2571x.sanity.studio (once deployed) or the local studio at http://localhost:3333')
}

main().catch((err) => {
  console.error('\n❌ Seed failed:', err.message)
  process.exit(1)
})
