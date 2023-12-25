import React from 'react'
import './RepoCard.scss'
import { Link } from 'react-router-dom'

const RepoCard = ({ profileName, repoName }) => {
  return (
    <Link to = {`/${profileName}/${repoName}`}>
      <span className='repocard'>
        <div className="header">
          <h3 className='name'>{repoName}</h3>
          <span className="type-container">
            <span className='type'>Public</span>
          </span>
        </div>
        <div className="language-container">
          <span className="dot-container">
            <div className="dot"></div>
          </span>
          <span className='language'>JavaScript</span>
        </div>
      </span>
    </Link>
  )
}

export default RepoCard