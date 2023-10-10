import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'
import styles from '@/styles/Header.module.css'

function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Header
        title={title}
        keywords={keywords}
        description={description}
      />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout

Layout.defaultProps = {
  title: 'NJS-BLOX - Infoblox DDI Reports',
  description: 'Friendly Infoblox DDI Reporting Tool',
  keywords: 'infoblox, ddi',
}
