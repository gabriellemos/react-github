import React, { useMemo, useContext } from 'react'
import { useRouter } from 'next/router'

import _ from 'lodash'

import UserContext from '../../context/UserContext'
import UserProfileDetails from '../../components/UserProfileDetails'
import UserProfileContent from '../../components/UserProfileContent'
import styles from '../../styles/user.module.scss'

const UserProfile = ({ login }) => {
  const { user = {} } = useContext(UserContext)
  const router = useRouter()

  const noUser = useMemo(() => {
    return _.isEmpty(user)
  }, [user])

  if (process.browser) {
    if (noUser || user.login !== login) {
      router.replace('/')
    }
  }

  return (
    <div className={styles.container}>
      <UserProfileDetails login={login} user={user} />
      <UserProfileContent login={login} user={user} />
    </div>
  )
}

export function getServerSideProps(props) {
  return {
    props: props.params
  }
}

export default UserProfile
