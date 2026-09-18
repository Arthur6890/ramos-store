import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'

import styles from './home.module.scss'

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <Image
        src="/marca-dagua.png"
        alt=""
        width={1024}
        height={1024}
        aria-hidden
        className={styles.watermark}
        priority
      />
      <div className={styles.content}>
        <Image
          src="/logo-oficial.png"
          alt="Ramos Store"
          width={220}
          height={220}
          className={styles.crest}
          priority
        />
        <p className={styles.tagline}>
          Camisas de time, direto pro seu carrinho — e pro nosso WhatsApp pra fechar o pedido.
        </p>
        <Link href="/catalogo" style={{ textDecoration: 'none' }}>
          <Button component="span" variant="contained" color="secondary" size="large">
            Ver catálogo
          </Button>
        </Link>
      </div>
    </section>
  )
}
