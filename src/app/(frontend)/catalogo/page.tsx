import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import type { Where } from 'payload'

import { CatalogFilters } from '@/components/CatalogFilters'
import { JerseyCard } from '@/components/JerseyCard'
import { getPayloadClient } from '@/lib/payload'
import type { Club, Jersey, Media } from '@/payload-types'

import styles from './catalogo.module.scss'

type CatalogoPageProps = {
  searchParams: Promise<{ club?: string; fitLine?: string; league?: string; q?: string }>
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams
  const payload = await getPayloadClient()

  const { docs: allClubs } = await payload.find({
    collection: 'clubs',
    pagination: false,
    sort: 'name',
  })

  const leagues = Array.from(new Set(allClubs.map((c) => c.league))).sort()

  const selectedFitLines = params.fitLine?.split(',').filter(Boolean) ?? []
  const selectedLeagues = params.league?.split(',').filter(Boolean) ?? []
  const selectedClubIds = params.club?.split(',').filter(Boolean) ?? []
  const q = params.q?.trim()

  let clubIdsInScope = allClubs.map((c) => String(c.id))
  if (selectedLeagues.length) {
    clubIdsInScope = allClubs.filter((c) => selectedLeagues.includes(c.league)).map((c) => String(c.id))
  }
  if (selectedClubIds.length) {
    clubIdsInScope = clubIdsInScope.filter((id) => selectedClubIds.includes(id))
  }

  const and: Where[] = [{ club: { in: clubIdsInScope } }]
  if (selectedFitLines.length) and.push({ fitLine: { in: selectedFitLines } })

  if (q) {
    const matchingClubIds = allClubs
      .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
      .map((c) => String(c.id))
    and.push({
      or: [{ name: { contains: q } }, { club: { in: matchingClubIds } }],
    })
  }

  const { docs: jerseys } = await payload.find({
    collection: 'jerseys',
    where: { and },
    depth: 2,
    pagination: false,
    sort: '-createdAt',
  })

  const cards = jerseys.map((jersey: Jersey) => {
    const club = jersey.club as Club
    const firstImage = jersey.images?.[0]?.image as Media | undefined
    return {
      id: String(jersey.id),
      name: jersey.name,
      clubName: club?.name ?? '',
      price: jersey.price,
      imageUrl: firstImage?.url ?? undefined,
    }
  })

  return (
    <Container sx={{ py: 6 }}>
      <h1 className={styles.heading}>Catálogo</h1>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <CatalogFilters leagues={leagues} clubs={allClubs.map((c) => ({ id: String(c.id), name: c.name, league: c.league }))} />
        </Grid>
        <Grid size={{ xs: 12, sm: 9 }}>
          {cards.length === 0 ? (
            <Typography color="text.secondary">
              Nenhuma Jersey encontrada com esses filtros. Tente remover um filtro ou buscar por
              outro nome.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 3,
              }}
            >
              {cards.map((jersey) => (
                <JerseyCard key={jersey.id} jersey={jersey} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
