import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ABT Digital Paper',

  projectId: 'wox2571x',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Landing Hero')
              .child(S.document().schemaType('landingHero').documentId('landingHero')),
            S.listItem()
              .title('Page Hero (Products page)')
              .child(S.document().schemaType('pageHero').documentId('pageHero')),
            S.listItem()
              .title('Capabilities')
              .child(S.document().schemaType('capabilities').documentId('capabilities')),
            S.listItem()
              .title('Manufacturing Band')
              .child(S.document().schemaType('manufBand').documentId('manufBand')),
            S.listItem()
              .title('Heritage Section')
              .child(S.document().schemaType('heritage').documentId('heritage')),
            S.listItem()
              .title('Certifications & Compliance')
              .child(S.document().schemaType('certBand').documentId('certBand')),
            S.listItem()
              .title('Contact Section')
              .child(S.document().schemaType('contactSection').documentId('contactSection')),
            S.divider(),
            S.documentTypeListItem('productSeries').title('Product Series'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
