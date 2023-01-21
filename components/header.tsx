'use client'

import { usePathname } from "next/navigation"
import styles from '../styles/header.module.css'
import {
  HeaderNavis,
  HeaderLinks,
  Logo,
} from './blog-parts'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <Logo subTitle={pathname.split('/')[1]} />
      <HeaderNavis />
      <HeaderLinks />
    </header>
  )
}

export default Header
