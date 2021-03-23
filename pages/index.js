import React from 'react'
import Button from '@material-ui/core/Button'

import Search from '../components/Search'
import UserCard from '../components/UserCard'
import UserService from '../services/user'

import style from '../styles/home.module.scss'

const TabMap = {
  USER: 0,
  REPOSITORY: 1
}

export default function Home() {
  const [activeTab, setActiveTab] = React.useState(TabMap.USER)

  const [
    searchResult,
    triggerSearch,
    nextPage,
    previousPage,
    hasPrevious,
    hasNext
  ] = UserService.searchUser()

  return (
    <React.Fragment>
      <div className={style.search_container}>
        <Search
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          triggerSearch={triggerSearch}
        />
      </div>
      <div className={style.search_result}>
        {searchResult.map((result) => {
          return <UserCard key={result.login} data={result} />
        })}
      </div>
      <div className={style.search_actions}>
        <Button
          variant="outlined"
          onClick={previousPage}
          disabled={!hasPrevious}
        >
          Previous
        </Button>
        <Button variant="outlined" onClick={nextPage} disabled={!hasNext}>
          Next
        </Button>
      </div>
    </React.Fragment>
  )
}
