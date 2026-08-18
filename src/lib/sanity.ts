import {createClient} from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'wox2571x',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  // A read token is only needed if the dataset is private.
  // In production (Cloudflare Pages / GitHub Actions), inject via env var
  // SANITY_READ_TOKEN. For local dev, put it in .env.local.
  token: import.meta.env.SANITY_READ_TOKEN,
  perspective: 'published',
})

const builder = createImageUrlBuilder(sanity)

export function urlFor(source: any) {
  return builder.image(source)
}

// Convenience: full URL for the image at a given width.
export function imgUrl(source: any, width = 1600): string | undefined {
  if (!source) return undefined
  return builder.image(source).width(width).auto('format').fit('max').url()
}
