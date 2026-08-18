import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageHero',
  title: 'Page Hero (Products page)',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title (main line)', type: 'string'}),
    defineField({name: 'titleEm', title: 'Title (highlighted line)', type: 'string'}),
    defineField({name: 'body', title: 'Body text', type: 'text', rows: 3}),
    defineField({name: 'credit', title: 'Photo credit', type: 'string'}),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {select: {title: 'title'}},
})
