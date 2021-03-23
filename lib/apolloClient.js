import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

function createApolloClient() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GITHUB_API_URL,
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`
    },
    cache: new InMemoryCache()
  })
}

function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient()
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo() {
  const store = useMemo(() => initializeApollo(), [])
  return store
}
