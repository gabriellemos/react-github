import React from 'react'

import SearchIcon from '@material-ui/icons/Search'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import styles from './Search.module.scss'

const Search = ({ activeTab, setActiveTab, triggerSearch }) => {
  const [search, setSearch] = React.useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      triggerSearch(search)
    }
  }

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <SearchIcon />
        <input
          value={search}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        onChange={handleTabChange}
      >
        <Tab label="Users" />
        <Tab label="Repositories" disabled />
      </Tabs>
    </div>
  )
}

export default Search
