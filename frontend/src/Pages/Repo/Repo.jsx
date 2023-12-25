import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import "./Repo.scss";
import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import JSZip from 'jszip';
import { getAccounts, getAllCommits, isOwner, commit } from "../../serviceFile.js";
import { useStorage } from '@thirdweb-dev/react';
// import { resolve } from "url";

const Repo = () => {

    const { profileName, repoName } = useParams();
    const [commit, setLatestCommit] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [ipfspath, setIpfsPath] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isProfileOwner, setProfileOwner] = useState(true);
    const [isDropDownOpen, setIsDropDownOpen] = useState(true);
    const [path, setPath] = useState([]);
    const [url, setDownloadUrl] = useState("");

    window.ethereum.on('accountsChanged', async (acc) => {
        await getAccounts();
        setProfileOwner(await isOwner(profileName));
    });

    const handleDropDownToggle = () => {
        setIsDropDownOpen(!isDropDownOpen);
    }

    const FileChange = (event) => {
        const fileList = event.target.files;
        const files = [];
        const webkitdirectory = [];

        for (let index = 0; index < fileList.length; index++) {
            const element = fileList[index];
            files.push((element));
            webkitdirectory.push((element.webkitRelativePath));
        }
        console.log(files);

        setIpfsPath(webkitdirectory);
        setSelectedFiles(files);
    }

    const storage = useStorage();
    const fileInputRef = useRef(null);

    const handleSubmit = async () => {
        const zip = new JSZip();
        for (const file of selectedFiles) {
            const path = file.webkitRelativePath;
            const content = await readFileAsync(file);
            const pathComponents = path.split('/');
            let currentFile = zip;
            for (let i = 0; i < pathComponents.length - 1; i++) {
                const folderName = pathComponents[i];
                currentFile = currentFile.folder(folderName);
            }
            currentFile.file(pathComponents[pathComponents.length - 1], content);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipFile = new File([zipBlob], 'file.zip');

        try {
            const uri = await storage.upload({
                data: zipFile,
                fs: ipfspath.map((filePath, index) => ({
                    name: `file${index + 1}`,
                    path: filePath,
                }))
            });
            console.log('URI', uri);
            const data = await storage.download(uri);

            console.log(data.uri);

            if (window.ethereum) {

                try {
                    const result = await commit(repoName, inputValue, data.url);

                    if (result) {
                        window.location.reload();
                    }
                }
                catch (error) {
                    alert("Something going wrong", error)
                }
            }
        }
        catch (error) {
            alert("Something going wrong in outer try", error)
        }
    }

    const fetchCommmits = async () => {
        if (window.ethereum) {

            try {
                const commits = await getAllCommits(repoName);
                const owner = await isOwner(profileName);
                console.log(owner);
                setProfileOwner(owner);

                const latestCommit = commits.length > 0 ? commits[commits.length - 1] : null;
                setLatestCommit(latestCommit.CommitMsg);

                if (latestCommit) {
                    const response = await fetch(latestCommit.ipfsURI);
                    console.log(response);
                    const { data, fs } = await response.json();
                    console.log(data);

                    const formattedUrl = data.replace('ipfs://', 'https://ipfs.io/ipfs/');
                    setDownloadUrl(formattedUrl);

                    const commitPaths = fs.map((file) => {
                        const pathComponents = file.path.split('/');
                        return pathComponents.length > 2 ? pathComponents[1] : file.path;
                    });
                    const uniquePath = [...new Set(commitPaths)];
                    console.log(Array.isArray(uniquePath));

                    setPath(uniquePath);
                }
            }
            catch (error) {
                // alert("Something going wrong", error)
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchCommmits();
    }, [])

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="repo-container">
                <div className="repo-main">
                    <div className="repo-header">
                        <div className="heading">DRepo</div>
                        <div className="access">Public</div>
                    </div>
                    <div className="branch-dropdown">
                        <div className="branch">
                            <select className="options">
                                <option value="main">main</option>
                                <option value="master">master</option>
                            </select>
                        </div>
                        <div className="code">
                            <button className="code-btn" onClick={handleDropDownToggle}>
                                Code
                            </button>
                            {isDropDownOpen && (
                                <div className="download">
                                    <a href={url} className="zip">
                                        Download ZIP
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="files-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>{profileName}</th>
                                    <th></th>
                                    <th>
                                        <Link
                                            to={{
                                                pathname: `/${profileName}/${repoName}/commits`
                                            }}
                                        >Commits</Link></th>
                                </tr>
                            </thead>
                            <tbody>
                                {path.map((path, index) => (
                                    <tr key={index}>
                                        <td>{path}</td>
                                        <td>{commit}</td>
                                        <td>2 days ago</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="readme-container">
                        <div className="readme-header">
                            <h3>README.md</h3>
                        </div>
                        <div className="readme-body">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                                explicabo qui vero voluptatibus ipsum. Saepe nesciunt
                                laudantium laboriosam eligendi, numquam iste, odio aut quasi,
                                minima alias est velit sunt culpa!
                            </p>
                        </div>
                    </div>
                    {isProfileOwner && (
                        <div className="add-commit">
                            <h2>Add new commit</h2>
                            <div className="file-upload-container">
                                <div className="file-upload">
                                    <div className="drag-drop-area" id="dropzone">
                                        <span>Drag and Drop your files</span>
                                        <input
                                            type="file"
                                            id="filepicker"
                                            name="fileList"
                                            webkitdirectory=""
                                            directory=""
                                            onChange={FileChange}
                                            ref={fileInputRef}

                                        />
                                        <div>
                                            <button
                                                className="select-files"
                                                onClick={() => fileInputRef.current.click()}
                                            >Select Directory</button>
                                        </div>
                                        <div className="file-list" id="fileList">
                                            <ul>
                                                {selectedFiles.map((file, index) => (
                                                    <li key={index}>
                                                        <span>{file.webkitRelativePath}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="commit-section">
                                    <input type="text" value={inputValue} id="commitMessage" placeholder="Commit Message" onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }} />
                                    <button id="submitBtn" onClick={handleSubmit} disabled={selectedFiles.length === 0 || !inputValue.trim()}>Submit</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="repo-sidebar">
                    <div className="about">
                        <h3>About</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, assumenda labore nihil, velit sed voluptatem molestias incidunt ut ea illo ipsum porro facilis magnam? Fugit deleniti debitis reprehenderit, fugiat ipsum provident officiis praesentium ipsam voluptatem corrupti.</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Repo;