import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'capabilities',
  title: 'Capabilities',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Section title', type: 'string'}),
    defineField({name: 'lede', title: 'Section lede', type: 'text', rows: 3}),
    defineField({
      name: 'caps',
      title: 'Capability numbers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'num', type: 'string', title: 'Number', description: 'e.g. "5,000"'},
            {name: 'em', type: 'string', title: 'Unit suffix (small gold text)', description: 'e.g. "t" or "m"'},
            {name: 'unit', type: 'string', title: 'Unit label (small caps)', description: 'e.g. "Per month · production capacity"'},
            {name: 'desc', type: 'string', title: 'One-line description'},
          ],
          preview: {select: {title: 'num', subtitle: 'unit'}},
        },
      ],
      validation: (Rule) => Rule.length(4),
    }),
  ],
  preview: {select: {title: 'title'}},
})
