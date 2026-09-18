'use client'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useState } from 'react'

import { useCart } from '@/lib/cart-context'
import { buildOrderMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, totalPrice, clear } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCompleteOrder() {
    if (!customerName.trim() || items.length === 0) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/order-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          items: items.map((item) => ({
            jersey: item.jerseyId,
            size: item.size,
            quantity: item.quantity,
            priceAtOrder: item.unitPrice,
          })),
          totalPrice,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        console.error('Falha ao registrar o pedido:', res.status, body)
        throw new Error('Falha ao registrar o pedido')
      }

      const message = buildOrderMessage(customerName, items, totalPrice)
      const whatsappUrl = buildWhatsAppUrl(message)
      clear()
      window.location.href = whatsappUrl
    } catch (err) {
      console.error('Falha ao completar pedido:', err)
      setError('Não foi possível completar o pedido. Tente novamente.')
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrinho
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Seu carrinho está vazio.
        </Typography>
        <Button component={Link} href="/catalogo" variant="contained">
          Ver catálogo
        </Button>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 6, maxWidth: 720 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Carrinho
      </Typography>

      <Stack spacing={2} sx={{ mb: 4 }}>
        {items.map((item) => (
          <Stack
            key={`${item.jerseyId}-${item.size}`}
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'divider',
              pb: 2,
            }}
          >
            <Stack>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.clubName} · Tamanho {item.size}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <TextField
                type="number"
                size="small"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.jerseyId, item.size, Math.max(1, Number(e.target.value)))
                }
                sx={{ width: 80 }}
                slotProps={{ htmlInput: { min: 1 } }}
              />
              <Typography sx={{ minWidth: 100, textAlign: 'right' }}>
                {formatBRL(item.unitPrice * item.quantity)}
              </Typography>
              <IconButton
                aria-label="Remover"
                onClick={() => removeItem(item.jerseyId, item.size)}
              >
                ✕
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{formatBRL(totalPrice)}</Typography>
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="Seu nome"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          size="large"
          onClick={handleCompleteOrder}
          disabled={submitting || !customerName.trim()}
        >
          Completar pedido via WhatsApp
        </Button>
      </Stack>
    </Container>
  )
}
