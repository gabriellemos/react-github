import React from 'react'

import Button from '@material-ui/core/Button'

import RepositoryCard from './RepositoryCard'
import styles from './SearchableRepositoryList.module.scss'

const SearchableRepositoryList = ({ variables, useSearch }) => {
  const [
    searchResult,
    triggerSearch,
    nextPage,
    previousPage,
    hasPrevious,
    hasNext
  ] = useSearch(variables)

  React.useMemo(() => {
    triggerSearch()
  }, [])

  return (
    <React.Fragment>
      <div className={styles.search_result}>
        {searchResult.map((result, index) => {
          return <RepositoryCard key={index} data={result} />
        })}
      </div>
      <br />
      <div className={styles.search_actions}>
        <Button variant="outlined" onClick={previousPage} disabled={!hasPrevious}>
          Previous
        </Button>
        <Button variant="outlined" onClick={nextPage} disabled={!hasNext}>
          Next
        </Button>
      </div>
    </React.Fragment>
  )
}

export default SearchableRepositoryList
