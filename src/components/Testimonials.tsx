import styles from './Testimonials.module.scss'

export type TestimonialData = {
  id: string
  quote: string
  customerName: string
}

export function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  if (testimonials.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Quem já comprou</h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div className={styles.card} key={testimonial.id}>
              <p className={styles.quote}>{testimonial.quote}</p>
              <p className={styles.customerName}>{testimonial.customerName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
