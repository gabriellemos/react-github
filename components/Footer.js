import React from 'react'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        Source code at
        <img src="/GitHub_Logo.png" alt="Github Logo" />
      </a>
    </footer>
  )
}

export default Footer
