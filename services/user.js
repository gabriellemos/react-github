import { useState, useMemo, useCallback } from 'react'
import { gql, useQuery } from '@apollo/client'

const SEARCH_USER_QUERY = gql`
  query searchUser($query: String!, $cursor: String) {
    search(first: 10, type: USER, query: $query, after: $cursor) {
      userCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on User {
            login
            name
            bio
            email
            location
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories {
              totalCount
            }
            starredRepositories {
              totalCount
            }
          }
        }
      }
    }
  }
`

const SEARCH_USER_REPOSITORY_QUERY = gql`
  query searchUserRepository($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(first: 10, after: $cursor) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            name
            description
            languages(first: 1) {
              nodes {
                name
              }
            }
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            licenseInfo {
              name
            }
            updatedAt
          }
        }
      }
    }
  }
`

const SEARCH_USER_STARRED_REPOSITORY_QUERY = gql`
  query searchUserStarredRepository($login: String!, $cursor: String) {
    user(login: $login) {
      starredRepositories(first: 10, after: $cursor) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            name
            description
            languages(first: 1) {
              nodes {
                name
              }
            }
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            licenseInfo {
              name
            }
            updatedAt
          }
        }
      }
    }
  }
`

function searchUser(initialSearchVariables) {
  return useSearch(
    SEARCH_USER_QUERY,
    initialSearchVariables,
    (result) => result.search
  )
}

function searchUserRepository(initialSearchVariables) {
  return useSearch(
    SEARCH_USER_REPOSITORY_QUERY,
    initialSearchVariables,
    (result) => result.user.repositories
  )
}

function searchUserStarredRepository(initialSearchVariables) {
  return useSearch(
    SEARCH_USER_STARRED_REPOSITORY_QUERY,
    initialSearchVariables,
    (result) => result.user.starredRepositories
  )
}

function useSearch(
  searchQuery,
  initialSearchVariables = {},
  extractResult = () => {}
) {
  const [variables, setVariables] = useState(initialSearchVariables)

  const [cursor, setCursor] = useState()
  const [cursorList, setCursorList] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [lastPage, setLastPage] = useState(true)

  const { fetchMore } = useQuery(searchQuery, {
    variables: initialSearchVariables,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true
  })

  const updateQuery = (_, { fetchMoreResult, variables }) => {
    const { edges, pageInfo } = extractResult(fetchMoreResult)
    setSearchResult(edges.map((item) => item.node))
    setLastPage(!pageInfo.hasNextPage)
    setCursor(pageInfo.endCursor)
    setVariables(variables)
  }

  const triggerSearch = (query) => {
    const _cursor = undefined
    setCursorList([_cursor])

    const _variables = { ...variables, query, cursor: _cursor }

    fetchMore({
      variables: _variables,
      updateQuery
    })
  }

  const nextPage = useCallback(() => {
    if (!lastPage) {
      // Updating cursorList to insert next page (cursor)
      const _variables = { ...variables, cursor }
      setCursorList([...cursorList, cursor])

      fetchMore({
        variables: _variables,
        updateQuery
      })
    }
  }, [variables, cursor, lastPage])

  const previousPage = useCallback(() => {
    // Cursor list represents the following
    // [..., (previous page), (current page)]
    if (cursorList.length > 0) {
      // Updating cursorList to remove current page (cursor)
      const _cursorList = cursorList.slice(0, cursorList.length - 1)
      setCursorList(_cursorList)

      // Getting cursor equivalent for previous page
      const _cursor = _cursorList[_cursorList.length - 1]
      const _variables = { ...variables, cursor: _cursor }

      fetchMore({
        variables: _variables,
        updateQuery
      })
    }
  }, [variables, cursorList])

  const hasPrevious = useMemo(() => cursorList.length > 1, [cursorList])
  const hasNext = useMemo(() => !lastPage, [lastPage])

  return [
    searchResult,
    triggerSearch,
    nextPage,
    previousPage,
    hasPrevious,
    hasNext
  ]
}

export default {
  searchUser,
  searchUserRepository,
  searchUserStarredRepository
}
