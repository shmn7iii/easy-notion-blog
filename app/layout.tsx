import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/global.css'
import '../styles/syntax-coloring.css'
import styles from '../styles/shared.module.css'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <html lang="ja" prefix="og: https://ogp.me/ns#">
    <head>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      ></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap"
        rel="stylesheet"
      ></link>
    </head>

    <body>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    </body>
  </html>
)

export default RootLayout
