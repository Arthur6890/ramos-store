import { JerseyCard, type JerseyCardData } from './JerseyCard'
import styles from './FeaturedJerseys.module.scss'

export function FeaturedJerseys({ jerseys }: { jerseys: JerseyCardData[] }) {
  if (jerseys.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Novidades</h2>
        <div className={styles.grid}>
          {jerseys.map((jersey) => (
            <JerseyCard key={jersey.id} jersey={jersey} />
          ))}
        </div>
      </div>
    </section>
  )
}
