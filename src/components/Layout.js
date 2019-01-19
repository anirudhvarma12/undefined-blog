import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
require('prismjs/themes/prism-tomorrow.css')

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.25),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <a href="https://github.com/anirudhvarma12">GitHub</a> &bull;{' '}
            <a href="https://twitter.com/aniketvarma12">Twitter</a> &bull;{' '}
            <a href="/rss.xml">RSS</a>
          </div>
          <div>
            {' '}
            Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
