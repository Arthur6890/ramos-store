'use client'

import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'

import { useCart } from '@/lib/cart-context'

export function Header() {
  const { totalQuantity } = useCart()

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Box
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Image src="/logo-oficial.png" alt="" width={36} height={36} style={{ height: 36, width: 'auto' }} />
          <Typography
            sx={{
              fontFamily: 'var(--font-archivo-black), sans-serif',
              fontSize: '1.15rem',
            }}
          >
            Ramos Store
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button component={Link} href="/catalogo">
            Catálogo
          </Button>
          <Button component={Link} href="/carrinho">
            <Badge badgeContent={totalQuantity} color="primary">
              Carrinho
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
