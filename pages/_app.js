import { useState, useMemo } from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'

import { useApollo } from '../lib/apolloClient'
import Footer from '../components/Footer'
import UserContext from '../context/UserContext'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState()
  const apolloClient = useApollo()

  const userContextValue = useMemo(() => {
    return { user, setUser }
  }, [user])

  return (
    <UserContext.Provider value={userContextValue}>
      <ApolloProvider client={apolloClient}>
        <div className="container">
          <Head>
            <title>Github Challenge</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Component {...pageProps} />
          </main>

          <Footer />
        </div>
      </ApolloProvider>
    </UserContext.Provider>
  )
}
