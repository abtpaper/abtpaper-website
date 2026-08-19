import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['Company', 'Product', 'R&D', 'Compliance', 'Press']).default('Company'),
    heroImage: z.string().optional(),
    excerpt: z.string(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = { news }
