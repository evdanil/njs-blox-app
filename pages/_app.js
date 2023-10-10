import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    router.prefetch = async () => {}
  }, [router])
  return <Component {...pageProps} />
}

export default MyApp
