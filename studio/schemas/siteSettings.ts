import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', title: 'Site title (browser tab)', type: 'string'}),
    defineField({name: 'metaDescription', title: 'SEO description', type: 'text', rows: 2}),
    defineField({name: 'tel', title: 'Phone', type: 'string'}),
    defineField({name: 'fax', title: 'Fax', type: 'string'}),
    defineField({name: 'email', title: 'Contact email', type: 'string'}),
    defineField({
      name: 'factoryAddress',
      title: 'Factory address (Jiangmen)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One line per row',
    }),
    defineField({
      name: 'salesAddress',
      title: 'Sales office address (Guangzhou)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One line per row',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {select: {title: 'siteTitle'}},
})
