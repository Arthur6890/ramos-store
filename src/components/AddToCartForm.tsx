'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useCart } from '@/lib/cart-context'

type Props = {
  jerseyId: string
  name: string
  clubName: string
  price: number
  sizes: string[]
  imageUrl?: string
}

export function AddToCartForm({ jerseyId, name, clubName, price, sizes, imageUrl }: Props) {
  const { addItem } = useCart()
  const router = useRouter()
  const [size, setSize] = useState(sizes[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    if (!size) return
    addItem({ jerseyId, name, clubName, size, quantity, unitPrice: price, imageUrl })
    setAdded(true)
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 360 }}>
      <div>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Tamanho
        </Typography>
        <ToggleButtonGroup
          value={size}
          exclusive
          onChange={(_, next) => next && setSize(next)}
          sx={{ flexWrap: 'wrap' }}
        >
          {sizes.map((s) => (
            <ToggleButton key={s} value={s} sx={{ minWidth: 56 }}>
              {s}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <TextField
        type="number"
        label="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        slotProps={{ htmlInput: { min: 1 } }}
        sx={{ maxWidth: 140 }}
      />

      <Button variant="contained" size="large" onClick={handleAddToCart} disabled={!size}>
        Adicionar ao carrinho
      </Button>

      {added && (
        <Button variant="text" onClick={() => router.push('/carrinho')}>
          Ver carrinho
        </Button>
      )}
    </Stack>
  )
}
