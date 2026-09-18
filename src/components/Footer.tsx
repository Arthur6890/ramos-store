import Image from 'next/image'
import Link from 'next/link'

import styles from './Footer.module.scss'

export function Footer() {
  const year = new Date().getFullYear()
  const whatsappNumber = process.env.NEXT_PUBLIC_SELLER_WHATSAPP_NUMBER
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Image src="/logo-oficial.png" alt="Ramos Store" width={56} height={56} style={{ height: 48, width: 'auto' }} />

        <nav className={styles.links}>
          {whatsappNumber && (
            <a
              className={styles.link}
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}
          {instagramUrl && (
            <a className={styles.link} href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          <Link className={styles.link} href="/catalogo">
            Catálogo
          </Link>
        </nav>

        <hr className={styles.divider} />

        <div className={styles.meta}>
          <p className={styles.copyright}>© {year} Ramos Store</p>
          <a
            className={styles.credit}
            href="https://forgesoftwarebrasil.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/forge-icon.png" alt="" width={16} height={16} />
            Powered by Forge Software
          </a>
        </div>
      </div>
    </footer>
  )
}
