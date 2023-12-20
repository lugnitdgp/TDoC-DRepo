import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import "./ProfilePage.scss";


const ProfilePage = () => {

  return (
    <div>
      <Navbar />
      <div className="box">
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
              <div>
                <button className="button">New</button>
              </div>
              {/* {isProfileOwner && (
              <div>
                <button className="button" onClick={() => setModalOpen(true)}>
                  New
                </button>
              </div>
              )} */}
            </div>
            <div className="repo-card-container">
              {/* {repositories.map((repoName, index) => (
                <RepoCard2
                  key={index}
                  repoName={repoName}
                  profileName={profileName}
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
      {/* {isModalOpen && (
        <RepoCreation
          profilename={profileName}
          onClose={() => setModalOpen(false)}
          setRepositories={setRepositories}
        />
      )} */}
    </div>
  );
};

export default ProfilePage;