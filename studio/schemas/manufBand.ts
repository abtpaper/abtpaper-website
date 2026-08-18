import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'manufBand',
  title: 'Manufacturing Band',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({name: 'lede', title: 'Section lede', type: 'text', rows: 3}),
    defineField({
      name: 'tiles',
      title: 'Photo tiles (3 or 6)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'image', type: 'image', title: 'Photo', options: {hotspot: true}},
            {name: 'imageAlt', type: 'string', title: 'Alt-text'},
            {name: 'title', type: 'string', title: 'Tile title'},
            {name: 'sub', type: 'string', title: 'Tile subtitle'},
          ],
          preview: {select: {title: 'title', subtitle: 'sub', media: 'image'}},
        },
      ],
      validation: (Rule) => Rule.min(3).max(6),
    }),
  ],
  preview: {select: {title: 'title'}},
})
