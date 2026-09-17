import type { CollectionConfig } from 'payload'

export const Jerseys: CollectionConfig = {
  slug: 'jerseys',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'club', 'fitLine', 'season', 'price'],
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
      admin: {
        description: 'Ex: "Brasil Home 2024"',
      },
    },
    {
      name: 'club',
      type: 'relationship',
      relationTo: 'clubs',
      required: true,
    },
    {
      name: 'fitLine',
      type: 'select',
      required: true,
      options: [
        { label: "Men's", value: 'mens' },
        { label: "Women's", value: 'womens' },
        { label: "Kids'", value: 'kids' },
      ],
    },
    {
      name: 'edition',
      type: 'select',
      required: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Away', value: 'away' },
        { label: 'Third / Alternate', value: 'third' },
      ],
    },
    {
      name: 'season',
      type: 'text',
      required: true,
      admin: {
        description: 'Ex: "2024/25"',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Preço em R$, fixo para todos os tamanhos.',
      },
    },
    {
      name: 'sizes',
      type: 'select',
      hasMany: true,
      required: true,
      options: ['PP', 'P', 'M', 'G', 'GG', 'XG'].map((size) => ({ label: size, value: size })),
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
