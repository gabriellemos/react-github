import React, { useMemo } from 'react'

import _ from 'lodash'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/lab/Skeleton'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

import styles from './UserProfileDetails.module.scss'

const UserProfileDetails = ({ login, user }) => {
  const isLoading = useMemo(() => {
    return _.isEmpty(user)
  }, [user])

  // TODO: Insert fetch user data here.

  return (
    <div className={styles.user_data}>
      <AvatarHolder
        isLoading={isLoading}
        getInfo={() => [user.avatarUrl, user.name]}
      />
      <div className={styles.container}>
        <div className={styles.user_name}>
          <InfoHolder isLoading={isLoading} getInfo={() => user.name} />
          <InfoHolder
            isLoading={isLoading}
            loadingWidth={60}
            getInfo={() => user.login}
          />
        </div>
        <Divider className={styles.divider} />
        <div className={styles.folower_info}>
          <PeopleOutlineIcon fontSize="small" className={styles.icon} />
          <InfoHolder
            isLoading={isLoading}
            loadingWidth={80}
            getInfo={() => `${user.followers.totalCount} followers`}
          />
          {'·'}
          <InfoHolder
            isLoading={isLoading}
            loadingWidth={80}
            getInfo={() => `${user.following.totalCount} following`}
          />
          {'·'}
          <StarOutlineIcon fontSize="small" className={styles.icon} />
          <InfoHolder
            isLoading={isLoading}
            loadingWidth={50}
            getInfo={() => user.starredRepositories.totalCount}
          />
        </div>
        <div
          className={styles.more_info}
          style={user.location ? {} : { display: 'none' }}
        >
          <RoomOutlinedIcon fontSize="small" className={styles.icon} />
          <InfoHolder isLoading={isLoading} getInfo={() => user.location} />
        </div>
        <div
          className={styles.more_info}
          style={user.email ? {} : { display: 'none' }}
        >
          <MailOutlineIcon fontSize="small" className={styles.icon} />
          <InfoHolder isLoading={isLoading} getInfo={() => user.email} />
        </div>
      </div>
    </div>
  )
}

const AvatarHolder = ({ isLoading, getInfo }) => {
  if (isLoading) {
    return (
      <Skeleton
        className={styles.user_avatar}
        variant="circle"
        width={200}
        height={200}
      />
    )
  }

  const [url, alt] = useMemo(() => {
    try {
      return getInfo()
    } catch (err) {
      return ['', '']
    }
  }, [getInfo])

  return <Avatar className={styles.user_avatar} src={url} alt={alt} />
}

const InfoHolder = ({ isLoading, loadingWidth = '100%', getInfo }) => {
  if (isLoading) {
    return <Skeleton animation="wave" height={10} width={loadingWidth} />
  }

  const info = useMemo(() => {
    try {
      return getInfo()
    } catch (err) {
      return ''
    }
  }, [getInfo])

  return <p>{info}</p>
}

export default UserProfileDetails
