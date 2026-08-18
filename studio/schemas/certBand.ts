import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'certBand',
  title: 'Certifications & Compliance',
  type: 'document',
  fields: [
    defineField({name: 'headingSub', title: 'Section sub-heading (uppercase)', type: 'string'}),
    defineField({name: 'heading', title: 'Main heading', type: 'string'}),
    defineField({
      name: 'marks',
      title: 'Certification marks (real logos)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'image', type: 'image', title: 'Mark image', options: {hotspot: true}},
            {name: 'alt', type: 'string', title: 'Alt-text'},
            {name: 'title', type: 'string', title: 'Tooltip (hover text)'},
          ],
          preview: {select: {title: 'alt', media: 'image'}},
        },
      ],
    }),
    defineField({name: 'decTitle', title: 'Compliance declarations title', type: 'string'}),
    defineField({
      name: 'declarations',
      title: 'Compliance declarations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'key', type: 'string', title: 'Label (e.g. REACH, EUDR)'},
            {name: 'value', type: 'text', title: 'Declaration statement', rows: 2},
          ],
          preview: {select: {title: 'key', subtitle: 'value'}},
        },
      ],
    }),
  ],
  preview: {select: {title: 'heading'}},
})
