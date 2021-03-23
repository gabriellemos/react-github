import React, { useMemo } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import styles from './RepositoryCard.module.scss'

const RepositoryCard = ({ data }) => {
  const mainLanguage = useMemo(() => {
    if (data.languages.nodes.length > 0) {
      return data.languages.nodes[0].name
    }
  }, [])

  return (
    <Card>
      <CardContent>
        <div className={styles.header}>
          <p className={styles.name}>{data.name}</p>
        </div>
        <div className={styles.content}>
          {data.description && (
            <p className={styles.description}>{data.description}</p>
          )}
          <div className={styles.more_info}>
            {mainLanguage && (
              <div>
                <FiberManualRecordIcon fontSize="small" />
                <p>{mainLanguage}</p>
              </div>
            )}
            {data.stargazers.totalCount > 0 && (
              <div>
                <StarOutlineIcon fontSize="small" />
                <p>{data.stargazers.totalCount}</p>
              </div>
            )}
            {data.forks.totalCount > 0 && (
              <div>
                <DeviceHubIcon
                  fontSize="small"
                  style={{ transform: 'rotate(180deg)' }}
                />
                <p>{data.forks.totalCount}</p>
              </div>
            )}
            {data.licenseInfo && (
              <div>
                <DeviceHubIcon fontSize="small" />
                <p>{data.licenseInfo.name}</p>
              </div>
            )}
            <div>
              <p>Updated on {new Date(data.updatedAt).toDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RepositoryCard
