import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingHero',
  title: 'Landing Hero',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'titleLine1', title: 'Title — first word', type: 'string'}),
    defineField({name: 'titleLine2', title: 'Title — second word', type: 'string'}),
    defineField({name: 'intro', title: 'Intro paragraph', type: 'text', rows: 4}),
    defineField({name: 'primaryCta', title: 'Primary CTA label', type: 'string'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA label', type: 'string'}),
    defineField({
      name: 'backgroundImage',
      title: 'Background image (full-bleed, shown while video loads)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background video (silent MP4, autoplays behind the hero)',
      description: 'Drop an MP4 here to replace the still image with looping video. Keep under 15 MB.',
      type: 'file',
      options: {accept: 'video/mp4'},
    }),
    defineField({name: 'photoCredit', title: 'Photo credit line', type: 'string'}),
  ],
  preview: {select: {title: 'titleLine1'}},
})
