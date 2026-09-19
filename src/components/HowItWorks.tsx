import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

import styles from './HowItWorks.module.scss'

const steps = [
  {
    icon: StorefrontOutlinedIcon,
    title: 'Escolha sua camisa',
    body: 'Navegue pelo catálogo e encontre a camisa do seu time.',
  },
  {
    icon: ShoppingCartOutlinedIcon,
    title: 'Adicione ao carrinho',
    body: 'Escolha o tamanho e a quantidade de cada camisa.',
  },
  {
    icon: WhatsAppIcon,
    title: 'Finalize pelo WhatsApp',
    body: 'Envie seu pedido e combine disponibilidade e entrega com a gente.',
  },
]

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Como funciona</h2>
        <div className={styles.steps}>
          {steps.map(({ icon: Icon, title, body }) => (
            <div className={styles.step} key={title}>
              <span className={styles.icon}>
                <Icon fontSize="medium" />
              </span>
              <p className={styles.stepTitle}>{title}</p>
              <p className={styles.stepBody}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
