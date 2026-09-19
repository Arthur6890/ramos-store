import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { AddToCartForm } from '@/components/AddToCartForm'
import { getPayloadClient } from '@/lib/payload'
import type { Club, Media } from '@/payload-types'

import styles from './jersey.module.scss'

// Without this, each jersey ID gets rendered once on first visit and Next.js
// caches that render indefinitely — later edits in the admin (price,
// description, images) would never show up on an already-visited page.
export const dynamic = 'force-dynamic'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default async function JerseyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayloadClient()

  const jersey = await payload.findByID({ collection: 'jerseys', id, depth: 2 }).catch(() => null)
  if (!jersey) notFound()

  const club = jersey.club as Club
  const firstImage = jersey.images?.[0]?.image as Media | undefined

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ position: 'relative', aspectRatio: '4 / 5', width: '100%' }}>
            <Image
              src={firstImage?.url ?? '/jersey-placeholder.svg'}
              alt={jersey.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <p className={styles.club}>{club?.name}</p>
          <h1 className={styles.name}>{jersey.name}</h1>
          <p className={styles.price}>{formatBRL(jersey.price)}</p>
          {jersey.description && <p className={styles.description}>{jersey.description}</p>}

          <AddToCartForm
            jerseyId={String(jersey.id)}
            name={jersey.name}
            clubName={club?.name ?? ''}
            price={jersey.price}
            sizes={jersey.sizes ?? []}
            imageUrl={firstImage?.url ?? undefined}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
