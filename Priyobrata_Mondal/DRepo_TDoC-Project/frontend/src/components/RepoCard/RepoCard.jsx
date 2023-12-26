import React from 'react'
import './RepoCard.scss'
import { Link } from "react-router-dom";

const RepoCard = ({profileName,repoName, description, language, type}) => {
  return (
    <Link to={`/${profileName}/${repoName}`}>
      <div className='repocard'>
          <div className='header'>
              <h3>{repoName}</h3>
              <span className='type'>{type}</span>
              <p className='description'>{description}</p>
              <p>
                  <span className={`lang-colour ${language}`}></span>{language}</p>
          </div>
      </div>
    </Link>
  )
}

export default RepoCard