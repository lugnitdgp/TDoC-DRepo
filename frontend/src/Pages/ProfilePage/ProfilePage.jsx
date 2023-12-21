import React, { useEffect, useState } from "react";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import Navbar from "../../Components/NavBar/Navbar";
import "./ProfilePage.scss";



const ProfilePage = () => {



  return (
    <div>
      <Navbar />
      <div className="box">
      <ProfileCard  />
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
            </div>
            <div className="repo-card-container">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;