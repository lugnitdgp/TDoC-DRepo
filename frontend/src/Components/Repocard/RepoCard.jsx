import React from 'react'

const RepoCard = ({name, description, language, type}) => {
  return (
    <div className='repocard'>
        <div className='header'>
            <h3>{name}</h3> <span>TDoC</span>
            <span>{type}</span>
            <p>{language}</p>
        </div>
    </div>
  )
}

export default RepoCard