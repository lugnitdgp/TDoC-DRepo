import React, { useEffect, useState } from "react";
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Navbar from '../../components/Navbar/Navbar';
import RepoCard from "../../components/RepoCard/RepoCard";
import RepoCreation from "../../components/RepoCreation/RepoCreation";
import "./ProfilePage.scss";

import { useParams } from "react-router-dom";
import Web3 from "Web3";
import { contractABI,contractAddress } from "../../../contractConfig";

const ProfilePage = () => {

  const { profileName } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProfileOwner, setProfileOwner] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const fetchRepositories = async () => {
    if(window.ethereum){
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI,contractAddress);

      try{
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();

        const isOwner = await contract.methods.isOwner(profileName).call({from: accounts[0]});
        console.log(isOwner);
        setProfileOwner(isOwner);

        const result = await contract.methods.getAllRepositories(profileName).call({from:accounts[0]});
        console.log(result);

        setRepositories(result);

      }catch(error){
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchRepositories();
  },[profileName])

  return (
    <div>
      <Navbar />
      <div className="box">
      <ProfileCard profileName={profileName} />
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
              {isProfileOwner && (<div>
                <button className="button" onClick={()=>setModalOpen(true)}>New Repository</button>
              </div>)}
            </div>
            <div className="repo-card-container">
                {/* <RepoCard name={"D-Repo-TDOC"} description={""} type={"public"} language={"JavaScript"}/>
                <RepoCard name={"Web3_Sample-TDOC"} description={""} type={"public"} language={"Solidity"}/>
            
                {
                
                } */}
                {repositories.map((repoName,index) =>
                ( <RepoCard 
                  key = {index}
                  repoName = {repoName}
                  profileName = {profileName}
                  description={"*Brief description of repository*"}
                  type={"public"}
                  language={"JavaScript"}
                   />
                   ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
      <RepoCreation
      profilename = {profileName}
      onClose = {() => setModalOpen(false)}
      setRepositories = {setRepositories}
       />
      )}
    </div>
  );
};

export default ProfilePage;