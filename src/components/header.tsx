import Link from 'next/link'
import styles from '../styles/header.module.css'

import Image from 'next/image'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <a>
          <Image src="/logo.png" width={174} height={53} alt="logo" />
        </a>
      </Link>
    </header>
  )
}

export default Header
