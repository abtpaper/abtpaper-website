// Single query that pulls all homepage content from Sanity in one round-trip.
// Fallback: if Sanity is unreachable or returns null, use the static homeData.ts
// so a build never fails just because Sanity's slow or the token's missing.

import {sanity, imgUrl} from './sanity'
import {t as fallback, contact as fallbackContact} from '../content/homeData'

type MaybeImage = {asset?: {_ref?: string}} | undefined
const HOME_QUERY = `{
  "settings": *[_id == "siteSettings"][0],
  "landing": *[_id == "landingHero"][0]{
    ..., "backgroundImageUrl": backgroundImage.asset->url
  },
  "pageHero": *[_id == "pageHero"][0]{
    ..., "backgroundImageUrl": backgroundImage.asset->url
  },
  "series": *[_type == "productSeries"] | order(order asc){
    ..., "imageUrl": image.asset->url
  },
  "capabilities": *[_id == "capabilities"][0],
  "manuf": *[_id == "manufBand"][0]{
    ...,
    "tiles": tiles[]{ ..., "imageUrl": image.asset->url }
  },
  "heritage": *[_id == "heritage"][0]{
    ..., "imageUrl": image.asset->url
  },
  "cert": *[_id == "certBand"][0]{
    ...,
    "marks": marks[]{ ..., "imageUrl": image.asset->url }
  },
  "contactSection": *[_id == "contactSection"][0]
}`

export async function getHomeContent() {
  let data: any = null
  try {
    data = await sanity.fetch(HOME_QUERY)
  } catch (err) {
    console.warn('[sanity] fetch failed, using fallback:', (err as Error).message)
  }
  // If Sanity returned nothing (empty project, missing docs), use fallback.
  if (!data || !data.settings) {
    console.warn('[sanity] no data — using static fallback from homeData.ts')
    return {
      t: fallback,
      contact: fallbackContact,
      source: 'fallback' as const,
    }
  }

  // Map Sanity documents → the shape our components already consume.
  const t = {
    pageHero: {
      eyebrow: data.pageHero?.eyebrow ?? fallback.pageHero.eyebrow,
      title: data.pageHero?.title ?? fallback.pageHero.title,
      titleEm: data.pageHero?.titleEm ?? fallback.pageHero.titleEm,
      body: data.pageHero?.body ?? fallback.pageHero.body,
      credit: data.pageHero?.credit ?? fallback.pageHero.credit,
      backgroundImage: imgUrl(data.pageHero?.backgroundImage, 1920) ?? '/photos/paper_line.jpg',
    },
    landing: {
      eyebrow: data.landing?.eyebrow ?? fallback.pageHero.eyebrow,
      titleLine1: data.landing?.titleLine1 ?? 'Paper',
      titleLine2: data.landing?.titleLine2 ?? 'Reimagined',
      intro: data.landing?.intro ?? '',
      primaryCta: data.landing?.primaryCta ?? 'Explore our products',
      secondaryCta: data.landing?.secondaryCta ?? 'Talk to us',
      backgroundImage: imgUrl(data.landing?.backgroundImage, 2400) ?? '/photos/aerial.jpg',
      photoCredit: data.landing?.photoCredit ?? '',
    },
    series: (data.series ?? []).map((s: any) => ({
      num: String(s.order ?? 0).padStart(2, '0'),
      category: s.category ?? '',
      title: s.title ?? '',
      lede: s.lede ?? '',
      info: s.info ?? [],
      uses: s.uses ?? [],
      image: imgUrl(s.image, 1400) ?? '/photos/machine.jpg',
      imageAlt: s.imageAlt ?? '',
      altBg: !!s.altBg,
      reverse: !!s.reverse,
    })),
    usesLabel: fallback.usesLabel,
    ctaSample: fallback.ctaSample,
    ctaTalk: fallback.ctaTalk,
    capabilities: {
      eyebrow: data.capabilities?.eyebrow ?? fallback.capabilities.eyebrow,
      title: data.capabilities?.title ?? fallback.capabilities.title,
      lede: data.capabilities?.lede ?? fallback.capabilities.lede,
      caps: data.capabilities?.caps ?? fallback.capabilities.caps,
    },
    manuf: {
      eyebrow: data.manuf?.eyebrow ?? fallback.manuf.eyebrow,
      title: data.manuf?.title ?? fallback.manuf.title,
      lede: data.manuf?.lede ?? fallback.manuf.lede,
      tiles: (data.manuf?.tiles ?? []).map((t: any) => ({
        image: imgUrl(t.image, 1400) ?? '/photos/machine.jpg',
        imageAlt: t.imageAlt ?? '',
        title: t.title ?? '',
        sub: t.sub ?? '',
      })),
    },
    heritage: {
      eyebrow: data.heritage?.eyebrow ?? fallback.heritage.eyebrow,
      title: data.heritage?.title ?? fallback.heritage.title,
      large: data.heritage?.large ?? fallback.heritage.large,
      paragraphs: data.heritage?.paragraphs ?? fallback.heritage.paragraphs,
      image: imgUrl(data.heritage?.image, 1200) ?? '/photos/warehouse.jpg',
      imageAlt: data.heritage?.imageAlt ?? '',
    },
    cert: {
      heading: data.cert?.heading ?? fallback.cert.heading,
      headingSub: data.cert?.headingSub ?? fallback.cert.headingSub,
      marks: (data.cert?.marks ?? []).map((m: any) => ({
        image: imgUrl(m.image, 400) ?? '/certs/fsc.jpg',
        alt: m.alt ?? '',
        title: m.title ?? '',
      })),
      decTitle: data.cert?.decTitle ?? fallback.cert.decTitle,
      declarations: data.cert?.declarations ?? fallback.cert.declarations,
    },
    contactSection: {
      title: data.contactSection?.title ?? fallback.contactSection.title,
      body: data.contactSection?.body ?? fallback.contactSection.body,
      sideTitle: data.contactSection?.sideTitle ?? fallback.contactSection.sideTitle,
      telLabel: data.contactSection?.telLabel ?? 'Tel',
      faxLabel: data.contactSection?.faxLabel ?? 'Fax',
      emailLabel: data.contactSection?.emailLabel ?? 'Email',
      ctaLabel: data.contactSection?.ctaLabel ?? fallback.contactSection.ctaLabel,
    },
  }

  const contact = {
    tel: data.settings?.tel ?? fallbackContact.tel,
    fax: data.settings?.fax ?? fallbackContact.fax,
    email: data.settings?.email ?? fallbackContact.email,
  }

  return {t, contact, source: 'sanity' as const}
}
