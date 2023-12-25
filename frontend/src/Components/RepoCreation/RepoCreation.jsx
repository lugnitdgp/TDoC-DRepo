import React, { useState } from "react";
import "./RepoCreation.scss";
import { CreateProject, object } from '../../serviceFile.js';

const RepoCreation = ({ profilename, onClose, setRepositories }) => {

    const [repoName, setRepoName] = useState('');

    const handleCreateRepo = async () => {

        try {
            await CreateProject(repoName);
            setRepositories((repo) => [...repo, repoName]);
            onClose();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="repo-creation-modal">
                <h2>Create a new Repository</h2>
                <br />
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
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <button disabled={repoName.trim().length==0} onClick={handleCreateRepo} id="createBtn">Create Repository</button>
                    <button className="cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>


    );
}

export default RepoCreation;