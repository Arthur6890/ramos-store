import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Link from 'next/link'

import styles from './JerseyCard.module.scss'

export type JerseyCardData = {
  id: string
  name: string
  clubName: string
  price: number
  imageUrl?: string
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function JerseyCard({ jersey }: { jersey: JerseyCardData }) {
  return (
    <Card>
      <Link href={`/jerseys/${jersey.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea component="div">
          <div className={styles.media}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={jersey.imageUrl ?? '/jersey-placeholder.svg'}
              alt={jersey.name}
              style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover' }}
            />
            <span className={styles.priceBadge}>{formatBRL(jersey.price)}</span>
          </div>
          <div className={styles.body}>
            <p className={styles.club}>{jersey.clubName}</p>
            <h3 className={styles.name}>{jersey.name}</h3>
          </div>
        </CardActionArea>
      </Link>
    </Card>
  )
}
