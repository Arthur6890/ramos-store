import type { CollectionConfig } from 'payload'

export const Clubs: CollectionConfig = {
  slug: 'clubs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'league'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'league',
      type: 'text',
      required: true,
      admin: {
        description: 'Competição do Club (ex: Serie A, Premier League, Brasileirão).',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
