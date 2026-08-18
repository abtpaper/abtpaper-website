import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heritage',
  title: 'Heritage Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({name: 'large', title: 'Large pull-quote paragraph', type: 'text', rows: 3}),
    defineField({
      name: 'paragraphs',
      title: 'Body paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({
      name: 'image',
      title: 'Section photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'imageAlt', title: 'Photo alt-text', type: 'string'}),
  ],
  preview: {select: {title: 'title'}},
})
