import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              marginBottom: rhythm(2.5),
            }}
          >
            <p>
              Written by <strong>{author}</strong>. Loves to code, leading
              frontend at{' '}
              <a href="https://twitter.com/SpotdraftHQ">SpotDraft.</a> <br />
              <a href={`https://twitter.com/${social.twitter}`}>
                Follow me on Twitter
              </a>
            </p>
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
