import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'productSeries',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order on page (01, 02, 03, 04…)',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'category', title: 'Category label', type: 'string', description: 'e.g. "Base Paper"'}),
    defineField({name: 'title', title: 'Series title', type: 'string', description: 'e.g. "Uncoated base paper."'}),
    defineField({name: 'lede', title: 'Description paragraph', type: 'text', rows: 4}),
    defineField({
      name: 'info',
      title: 'Info rows (spec highlights)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'k', type: 'string', title: 'Key'},
            {name: 'v', type: 'string', title: 'Value'},
          ],
          preview: {select: {title: 'k', subtitle: 'v'}},
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'uses',
      title: 'Common applications',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Chips shown under the series description',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'imageAlt', title: 'Photo alt-text (for accessibility)', type: 'string'}),
    defineField({
      name: 'altBg',
      title: 'Use alternate background (slightly darker)',
      type: 'boolean',
      description: 'Alternate for visual rhythm — set true on Series 2 and 4',
      initialValue: false,
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse layout (photo right, copy left)',
      type: 'boolean',
      description: 'Alternate the photo/copy sides — set true on Series 2 and 4',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image', order: 'order'},
    prepare({title, subtitle, media, order}) {
      const orderStr = String(order ?? '').padStart(2, '0')
      return {title: `${orderStr} · ${title}`, subtitle, media}
    },
  },
})
