import React, { useState, useMemo } from 'react'

import _ from 'lodash'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Divider from '@material-ui/core/Divider'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import StarOutlineIcon from '@material-ui/icons/StarOutline'

import UserService from '../services/user'
import SearchableRepositoryList from './SearchableRepositoryList'
import styles from './UserProfileContent.module.scss'

const TabMap = {
  REPOSITORIES: 0,
  STARRED: 1
}

const UserProfileContent = ({ login, user }) => {
  const [activeTab, setActiveTab] = useState(TabMap.REPOSITORIES)

  const hasUser = useMemo(() => {
    return !_.isEmpty(user)
  }, [user])

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div className={styles.user_content}>
      <div className={styles.header}>
        <Tabs
          value={activeTab}
          indicatorColor="primary"
          onChange={handleTabChange}
        >
          <Tab
            icon={
              <CustomTabIcon Icon={BookOutlinedIcon} label="Repositories" />
            }
          />
          <Tab
            icon={<CustomTabIcon Icon={StarOutlineIcon} label="Starred" />}
          />
        </Tabs>
        <Divider className={styles.divider} />
      </div>
      <br />
      {hasUser && (
        <React.Fragment>
          <div
            style={activeTab === TabMap.REPOSITORIES ? {} : { display: 'none' }}
          >
            <SearchableRepositoryList
              variables={{ login }}
              useSearch={UserService.searchUserRepository}
            />
          </div>
          <div style={activeTab === TabMap.STARRED ? {} : { display: 'none' }}>
            <SearchableRepositoryList
              variables={{ login }}
              useSearch={UserService.searchUserStarredRepository}
            />
          </div>
        </React.Fragment>
      )}
      <br />
    </div>
  )
}

const CustomTabIcon = ({ Icon, label }) => {
  return (
    <div className={styles.tab_container}>
      <Icon fontSize="small" />
      <p>{label}</p>
    </div>
  )
}

export default UserProfileContent
