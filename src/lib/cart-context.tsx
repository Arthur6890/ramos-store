'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { CartItem } from './types'

const STORAGE_KEY = 'ramos-store-cart'

type CartContextValue = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (jerseyId: string, size: string) => void
  updateQuantity: (jerseyId: string, size: string, quantity: number) => void
  clear: () => void
  totalPrice: number
  totalQuantity: number
}

const CartContext = createContext<CartContextValue | null>(null)

function lineKey(jerseyId: string, size: string) {
  return `${jerseyId}::${size}`
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore malformed/blocked storage, cart just starts empty
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode, quota) — cart still works for this session
    }
  }, [items, hydrated])

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const key = lineKey(item.jerseyId, item.size)
      const existing = current.find((i) => lineKey(i.jerseyId, i.size) === key)
      if (existing) {
        return current.map((i) =>
          lineKey(i.jerseyId, i.size) === key ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      }
      return [...current, item]
    })
  }

  const removeItem = (jerseyId: string, size: string) => {
    setItems((current) => current.filter((i) => lineKey(i.jerseyId, i.size) !== lineKey(jerseyId, size)))
  }

  const updateQuantity = (jerseyId: string, size: string, quantity: number) => {
    setItems((current) =>
      current.map((i) =>
        lineKey(i.jerseyId, i.size) === lineKey(jerseyId, size) ? { ...i, quantity } : i,
      ),
    )
  }

  const clear = () => setItems([])

  const { totalPrice, totalQuantity } = useMemo(
    () =>
      items.reduce(
        (acc, item) => ({
          totalPrice: acc.totalPrice + item.unitPrice * item.quantity,
          totalQuantity: acc.totalQuantity + item.quantity,
        }),
        { totalPrice: 0, totalQuantity: 0 },
      ),
    [items],
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clear, totalPrice, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
