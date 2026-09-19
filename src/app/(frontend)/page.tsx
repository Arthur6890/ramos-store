import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'

import { FeaturedJerseys } from '@/components/FeaturedJerseys'
import { HowItWorks } from '@/components/HowItWorks'
import { Testimonials } from '@/components/Testimonials'
import { getPayloadClient } from '@/lib/payload'
import type { Club, Jersey, Media } from '@/payload-types'

import styles from './home.module.scss'

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [{ docs: jerseys }, { docs: testimonials }] = await Promise.all([
    payload.find({
      collection: 'jerseys',
      depth: 2,
      limit: 4,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'testimonials',
      pagination: false,
    }),
  ])

  const featuredJerseys = jerseys.map((jersey: Jersey) => {
    const club = jersey.club as Club
    const firstImage = jersey.images?.[0]?.image as Media | undefined
    return {
      id: String(jersey.id),
      name: jersey.name,
      clubName: club?.name ?? '',
      price: jersey.price,
      imageUrl: firstImage?.url ?? undefined,
    }
  })

  return (
    <>
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

      <HowItWorks />
      <FeaturedJerseys jerseys={featuredJerseys} />
      <Testimonials
        testimonials={testimonials.map((testimonial) => ({
          id: String(testimonial.id),
          quote: testimonial.quote,
          customerName: testimonial.customerName,
        }))}
      />
    </>
  )
}
