import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Web3 from "Web3";
import { useParams } from 'react-router-dom';
import { contractABI, contractAddress } from '../../../contractConfig.js';
import "./Commit.scss";


// const commitData = [
//   { id: 1, message: "Initial commit", author: "John Doe", date: "2023-01-01" },
//   { id: 2, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
//   { id: 3, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
//   { id: 4, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
//   { id: 5, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
//   { id: 6, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
//   { id: 7, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
//   // Add more commit data as needed
// ];

const Commit = () => {
  const [commits, setCommits] = useState([]);
  const { profileName, repoName } = useParams();

  const fetchCommits = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      try {
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();
        const Commits = await contract.methods.getAllCommits(repoName).call({ from: accounts[0] });

        
        const reversedCommits = Commits.reverse();

        setCommits(reversedCommits);

      } catch (error) {
        console.error('Error fetching commits from smart contract:', error);
      }
    }
  }

  useEffect(() => {
    fetchCommits();
  }, []);

  return (
    // <Link to={`/${profileName}/${repoName}/commit`}>
        
    // </Link>
    <div className="commit-history">
          <Navbar />
          <div className="commit-history-page">
            <h1>Commit History</h1>
            <ul className="commit-list">
          {commits.map((commit) => (
            <li key={commit.id} className="commit-item">
              <div className="commit-info">
                <div className="commit-message">{commit.CommitMsg}</div>
                <div className="profile-name"> @{profileName} committed few time ago</div>
              </div>
            </li>
          ))}
        </ul>
          </div>
        </div>
  );
};

export default Commit;