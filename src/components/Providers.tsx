'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import React from 'react'

import { CartProvider } from '@/lib/cart-context'
import { theme } from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
