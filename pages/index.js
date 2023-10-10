import Layout from '../components/Layout'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Layout className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* Welcome to <a href='https://nextjs.org'>Next.js!</a> */}
          <div className={styles.grid}>
            <Link
              href='/subnet'
              legacyBehavior
            >
              <a
                href='#'
                className={styles.card}
              >
                <h2>
                  Subnet Information <FaArrowRight />
                </h2>
                <p>Retrieve IP subnet data</p>
              </a>
            </Link>
            <Link
              href='/location'
              legacyBehavior
            >
              <a
                href='#'
                className={styles.card}
              >
                <h2>
                  Location Information <FaArrowRight />
                </h2>
                <p>Retrieve IP data for location</p>
              </a>
            </Link>
          </div>
        </h1>
      </main>
    </Layout>
  )
}
