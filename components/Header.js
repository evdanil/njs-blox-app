import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { useState } from 'react'
import Modal from './Modal'
import AuthData from './AuthData'

function Header({ title, keywords, description }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content={description}
        />
        <meta
          name='keywords'
          content={keywords}
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href='/'>NJS BLOX</Link>
        </div>
        {/* <Search /> */}
        <nav>
          <ul>
            <li>
              <Link
                href='#'
                legacyBehavior
              >
                <a
                  className='btn-secondary btn-icon'
                  onClick={() => setShowModal(true)}
                >
                  <FaSignInAlt />
                  AuthData
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <AuthData setShowModal={setShowModal} />
      </Modal>
    </>
  )
}

export default Header
