import ExtLink from './ext-link'

import styles from '../styles/footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <span>©︎2022 </span>
      <a href="https://www.shmn7iii.net"> shmn7iii </a>
      <span> | Powered by </span>
      <a href="https://github.com/shmn7iii/easy-notion-blog">
        {' '}
        easy-notion-blog{' '}
      </a>
    </div>
  </footer>
)

export default Footer
