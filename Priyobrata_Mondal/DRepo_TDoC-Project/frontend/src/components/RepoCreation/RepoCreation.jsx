import React, { useState } from "react";
import "./RepoCreation.scss";

import Web3 from "Web3";
import { contractABI,contractAddress } from "../../../contractConfig";

const RepoCreation = ({profilename, onClose,setRepositories}) => {

    const [repoName, setRepoName] = useState('');

    const handleCreateRepo = async () => {
        if(window.ethereum){
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(contractABI,contractAddress);

            try{
              await window.eth_requestAccounts;
              const accounts = await web3.eth.getAccounts();
              await contract.methods.CreateProject(repoName).send({from:accounts[0]})
              setRepositories((repo) => [...repo,repoName])

              onClose();

            }catch(error){
              console.log(error);
            }
          }
    }

    return (
        <div className="modal-overlay">
            <div className="repo-creation-modal">
                <h2>Create a new Repository</h2>
                <div className="input-container">
                    <label>Owner</label>
                    <input type="text" value={profilename} readOnly />
                </div>
                <div className="input-container">
                    <label>Repository Name</label>
                    <input
                        type="text"
                        placeholder="Enter Repository Name"
                        className="text-white"
                        value = {repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                </div>
                {/* <div className="input-container">
                    <label>Description (Optional)</label>
                    <input
                        type="text"
                        placeholder="Brief Description of Repository"
                        className="text-white"
                        value = {repoDescription}
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                </div> */}
                <div className="button-container">
                    <button onClick={handleCreateRepo}>Create Repository</button>
                    <button className="cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>


    );
}

export default RepoCreation;