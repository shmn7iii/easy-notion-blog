import ExtLink from './ext-link'

import styles from '../styles/footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <span>©️2022 shmn7iii | Powered by </span>
      <ExtLink href="https://github.com/otoyo/easy-notion-blog">
        easy-notion-blog
      </ExtLink>
    </div>
  </footer>
)

export default Footer
