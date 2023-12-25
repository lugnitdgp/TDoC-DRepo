import React, { useEffect, useState } from "react";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Navbar from "../../Components/NavBar/Navbar";
import "./ProfilePage.scss";
import RepoCreation from "../../Components/RepoCreation/RepoCreation";
import RepoCard from "../../Components/RepoCard/RepoCard";
import { useParams, useNavigate } from "react-router-dom";
import { getAccounts, isOwner, getAllRepositories, object } from '../../serviceFile.js';



const ProfilePage = () => {

  const navigate = useNavigate();
  const { profileName } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProfileOwner, setProfileOwner] = useState(false);
  const [repositories, setRepositories] = useState([]);

  window.ethereum.on('accountsChanged', async (acc) => {
    await getAccounts();
    setProfileOwner(await isOwner(profileName));
  });

  const fetchRepositories = async () => {
    try {
      setProfileOwner(await isOwner(profileName));
      if(isProfileOwner){
        setRepositories(object.allRepos);
      }
      else{
        setRepositories(await getAllRepositories(profileName));
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRepositories();
  }, [profileName])

  return (
    <div>
      <Navbar />
      <div className="box">
        <ProfileCard profilename={profileName} />
        <div className="user-content">
          <div className="repo-area">
            <div className="search-and-button-container">
              <div className="reposearch-container">
                <input
                  type="text"
                  placeholder="Find a Repository"
                  className="reposearch-bar"
                />
              </div>
              {isProfileOwner && (
                <div>
                  <button className="button" onClick={() => setModalOpen(true)}>New</button>
                </div>
              )
              }
            </div>
            <div className="repo-card-container">
              {
                repositories.map((repoName, index) =>
                (<RepoCard
                  key={index}
                  profileName={profileName}
                  repoName={repoName}
                />
                ))
              }
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RepoCreation
          profilename={profileName}
          onClose={() => setModalOpen(false)}
          setRepositories={setRepositories}
        />
      )}
    </div>
  );
};

export default ProfilePage;