import type { CartItem } from './types'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function buildOrderMessage(customerName: string, items: CartItem[], totalPrice: number) {
  const lines = items.map(
    (item) => `- ${item.quantity}x ${item.name} (${item.size}) - ${formatBRL(item.unitPrice * item.quantity)}`,
  )

  return [
    `Olá! Gostaria de confirmar meu pedido, ${customerName}:`,
    ...lines,
    `Total: ${formatBRL(totalPrice)}`,
  ].join('\n')
}

export function buildWhatsAppUrl(message: string) {
  const sellerNumber = process.env.NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER
  if (!sellerNumber) {
    throw new Error('NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER não está configurado.')
  }
  return `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`
}
