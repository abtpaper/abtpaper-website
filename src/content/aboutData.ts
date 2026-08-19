// About page content. Draft copy in the ABT voice — user reviews + edits.
// Same fallback pattern as homeData.ts; will move to Sanity later.

export const about = {
  hero: {
    eyebrow: "About ABT Digital Paper",
    title: "Since 2008.",
    titleEm: "Every roll from Jiangmen.",
    body: "A paper manufacturer that makes its own base paper, coats it in-house, and converts it to whatever your line needs. One site. One team. One furnish.",
    credit: "ABT Digital Paper · Jiangmen site",
    bg: "/photos/aerial.jpg",
  },

  story: {
    eyebrow: "Company",
    title: "A paper manufacturer, end to end.",
    paragraphs: [
      "ABT Digital Paper was founded in 2008 with a straightforward premise: too much of the specialty paper market runs on base paper from one supplier, coating from another, and finishing from a third. When something goes wrong — whitepoint drift, coating adhesion failure, blistering on press — nobody owns the problem. It always seems to have started somewhere else.",
      "We spent five years building the alternative before shipping our first roll. Our own wet-end paper machine came online at our Jiangmen plant in 2013. Every roll ABT has ever shipped was made on it. The furnish is our furnish. The base paper and the coating on top of it were made for each other, in the same building, by the same team.",
      "That vertical integration is what our customers pay us for. It's why the base paper and the coating layer match on the first sample. It's why food-contact grades don't require a separate supplier's certificate. It's why pilot-line development goes from concept to converted sample in weeks, not quarters. And it's why coating consistency holds across four-year production runs — because we're not chasing a moving substrate.",
      "Today ABT ships 5,000 tonnes a month from the same 45-acre site in Xinhui District. Base paper for luxury retail packaging, PE-laminated base for silver-halide and inkjet RC coaters, food-grade paper for the paper-straw and packaging sector, and RC-coated photo paper for high-speed inkjet and photo-lab print. Certified by SGS since 2014 (ISO 9001) and 2015 (FSC Chain-of-Custody). No shortcuts. No middlemen.",
    ],
  },

  tour: {
    eyebrow: "Factory tour",
    title: "Made in Jiangmen. Every step, in view.",
    lede: "45 acres. Wet-end paper making, extrusion coating, calendar finishing, converting, QC, and warehousing — all under one roof.",
    tiles: [
      { image: "/photos/aerial.jpg",        title: "The site",              sub: "45 acres · Xinhui District, Jiangmen" },
      { image: "/photos/paper_line.jpg",    title: "3.6 m paper machine",    sub: "The wet-end line that runs every ABT roll" },
      { image: "/photos/machine.jpg",       title: "Wet-end forming",         sub: "Our own furnish · in-house" },
      { image: "/photos/coating.jpg",       title: "Calendar rollers",        sub: "Where the surface is set" },
      { image: "/photos/coating_line.jpg",  title: "Coating line",            sub: "Extrusion coating · applied in-house" },
      { image: "/photos/pe_rollers.jpg",    title: "PE laminating",           sub: "LDPE + HDPE, both sides · to spec" },
      { image: "/photos/craned_roll.jpg",   title: "Winding",                 sub: "Finished roll onto the winder" },
      { image: "/photos/roll.jpg",          title: "Finished RC photo paper", sub: "Cut, wound, ready to slit" },
      { image: "/photos/lab.jpg",           title: "QC & R&D lab",            sub: "Every batch tested" },
      { image: "/photos/warehouse.jpg",     title: "Roll warehouse",          sub: "Slit, packed, ready to ship" },
      { image: "/photos/warehouse_pano.jpg",title: "Finished-roll floor",     sub: "Full panorama, one shift's output" },
    ],
  },

  milestones: {
    eyebrow: "Milestones",
    title: "Seventeen years of paper.",
    items: [
      { year: "2008", label: "Founded",           desc: "ABT Digital Paper established in Guangdong Province." },
      { year: "2013", label: "Production begins",  desc: "Paper making, laminating, and coating start at the Jiangmen plant." },
      { year: "2014", label: "ISO 9001",           desc: "Quality management certified by SGS (Cert CN14/31465)." },
      { year: "2014", label: "ISO 14001",          desc: "Environmental management certified by SGS (Cert CN14/31156)." },
      { year: "2015", label: "FSC Chain-of-Custody", desc: "Certified by SGS Hong Kong (Cert SGSHK-COC-011695). FSC® A000523." },
      { year: "2026", label: "PPWR alignment",      desc: "PFAS-free food-contact grades in production ahead of EU 2025/40 enforcement." },
    ],
  },
}
