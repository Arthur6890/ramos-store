import type { CollectionConfig } from 'payload'

export const OrderRequests: CollectionConfig = {
  slug: 'order-requests',
  labels: {
    singular: 'Order Request',
    plural: 'Order Requests',
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'status', 'totalPrice', 'createdAt'],
  },
  access: {
    // Customers submit an Order Request anonymously from the storefront.
    create: () => true,
    // Only the seller can see and manage Order Requests.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'jersey',
          type: 'relationship',
          relationTo: 'jerseys',
          required: true,
        },
        {
          name: 'size',
          type: 'text',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'priceAtOrder',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Preço da Jersey no momento do pedido (snapshot).',
          },
        },
      ],
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
}
