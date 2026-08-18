import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Section title', type: 'text', rows: 2}),
    defineField({name: 'body', title: 'Body text', type: 'text', rows: 3}),
    defineField({name: 'sideTitle', title: 'Side card title', type: 'string'}),
    defineField({name: 'telLabel', title: 'Tel label', type: 'string', initialValue: 'Tel'}),
    defineField({name: 'faxLabel', title: 'Fax label', type: 'string', initialValue: 'Fax'}),
    defineField({name: 'emailLabel', title: 'Email label', type: 'string', initialValue: 'Email'}),
    defineField({name: 'ctaLabel', title: 'CTA button label', type: 'string'}),
  ],
  preview: {select: {title: 'title'}},
})
