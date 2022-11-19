import { useRouter } from 'next/router';

import {
  HeaderLinks,
  Logo,
} from './blog-parts'
import styles from '../styles/header.module.css'

const Header = () => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <header className={styles.header}>
      <Logo subTitle={path.split('/')[1]} />
      <HeaderLinks />
    </header>
  )
}

export default Header
