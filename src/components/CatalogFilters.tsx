'use client'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import styles from './CatalogFilters.module.scss'

const FIT_LINES = [
  { label: "Men's", value: 'mens' },
  { label: "Women's", value: 'womens' },
  { label: "Kids'", value: 'kids' },
]

type ClubOption = { id: string; name: string; league: string }

export function CatalogFilters({ leagues, clubs }: { leagues: string[]; clubs: ClubOption[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const selectedFitLines = searchParams.get('fitLine')?.split(',').filter(Boolean) ?? []
  const selectedLeagues = searchParams.get('league')?.split(',').filter(Boolean) ?? []
  const selectedClubIds = searchParams.get('club')?.split(',').filter(Boolean) ?? []
  const q = searchParams.get('q') ?? ''

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <Box component="aside" className={styles.aside}>
      <h2 className={styles.heading}>Filtrar</h2>

      <TextField
        label="Buscar"
        placeholder="Ex: Brasil, Flamengo..."
        defaultValue={q}
        onChange={(e) => updateParam('q', e.target.value)}
        fullWidth
        size="small"
      />

      <Box className={styles.group}>
        <span className={styles.groupLabel}>Fit Line</span>
        <FormGroup>
          {FIT_LINES.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  size="small"
                  checked={selectedFitLines.includes(option.value)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selectedFitLines, option.value]
                      : selectedFitLines.filter((v) => v !== option.value)
                    updateParam('fitLine', next.join(','))
                  }}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      </Box>

      <Autocomplete
        multiple
        size="small"
        options={leagues}
        value={selectedLeagues}
        onChange={(_, next) => updateParam('league', next.join(','))}
        renderInput={(params) => <TextField {...params} label="Liga" placeholder="Liga" />}
      />

      <Autocomplete
        multiple
        size="small"
        options={clubs}
        getOptionLabel={(option) => option.name}
        value={clubs.filter((c) => selectedClubIds.includes(c.id))}
        onChange={(_, next) => updateParam('club', next.map((c) => c.id).join(','))}
        renderInput={(params) => <TextField {...params} label="Club" placeholder="Club" />}
      />
    </Box>
  )
}
