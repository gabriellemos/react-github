import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'
import Avatar from '@material-ui/core/Avatar'

import UserContext from '../context/UserContext'
import styles from './UserCard.module.scss'

const UserCard = ({ data }) => {
  return data ? <LoadedCard data={data} /> : <LoadingCard />
}

const LoadedCard = ({ data }) => {
  const { setUser } = useContext(UserContext)
  const router = useRouter()

  const openProfile = () => {
    setUser(data)
    router.push(`/user/${data.login}`)
  }

  return (
    <Card>
      <CardContent>
        <div className={styles.header}>
          <Avatar
            className={styles.user_avatar}
            src={data.avatarUrl}
            alt={data.name}
          />
          {data.name && (
            <p href="#" className={styles.user_name} onClick={openProfile}>
              {data.name}
            </p>
          )}
          <p href="#" className={styles.user_login} onClick={openProfile}>
            {data.login}
          </p>
        </div>
        <div className={styles.content}>
          {data.bio && <p className={styles.user_bio}>{data.bio}</p>}
          <div className={styles.more_info}>
            <p>{data.location}</p>
            {data.location ? ' ' : ''}
            <p>{data.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const LoadingCard = () => {
  return (
    <Card>
      <CardContent>
        <div className={styles.header}>
          <Skeleton animation="wave" variant="circle" width={20} height={20} />
          <Skeleton animation="wave" height={10} width="40%" />
        </div>
        <div className={styles.content}>
          <Skeleton animation="wave" height={10} />
          <Skeleton animation="wave" height={10} width="80%" />
        </div>
      </CardContent>
    </Card>
  )
}

export default UserCard
