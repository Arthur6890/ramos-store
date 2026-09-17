import Button from '@mui/material/Button'
import Link from 'next/link'

import styles from './home.module.scss'

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.plate}>
        <span className={styles.number}>10</span>
        <h1 className={styles.name}>RAMOS STORE</h1>
      </div>
      <hr className={styles.rule} />
      <p className={styles.tagline}>
        Camisas de time, direto pro seu carrinho — e pro nosso WhatsApp pra fechar o pedido.
      </p>
      <Link href="/catalogo" style={{ textDecoration: 'none' }}>
        <Button component="span" variant="contained" size="large">
          Ver catálogo
        </Button>
      </Link>
    </section>
  )
}
