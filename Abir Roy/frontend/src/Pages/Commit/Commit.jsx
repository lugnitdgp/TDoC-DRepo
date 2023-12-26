import React, { useEffect } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import { useParams } from "react-router-dom";
import "./Commit.scss";
import { getAllCommits } from "../../serviceFile";

const Commit = () => {
  const { profileName, repoName } = useParams();

  let commitData = [];

  const getCommits = async () => {
    commitData = await getAllCommits(repoName);
  }

  useEffect(() => {
    getCommits();
  }, []);

return (
  <div className="commit-history">
    <Navbar />
    <div className="commit-history-page">
      <h1>Repository Name: {repoName}</h1>
      <h2>Commits</h2>
      <ul className="commit-list">
        {commitData.map((commit) => (
          <li key={commit.id} className="commit-item">
            <span className="commit-date">25-12-2023</span>
            <p className="commit-message">{commit.CommitMsg}</p>
            <p className="profile-name">Author: {profileName}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default Commit;