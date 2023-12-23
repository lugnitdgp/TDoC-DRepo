import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import "./Repo.scss";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import JSZip, { file } from "jszip";
import Web3 from "web3";
import { useStorage } from "@thirdweb-dev/react";
import { contractABI, contractAddress } from "../../contractConfig";
// import { rejects } from "assert";

const Repo = () => {
  const [commits, setCommits] = useState([]);
  const { profileName, repoName } = useParams();
  const [ipfspath, setIpfsPath] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [profileOwner, setProfileOwner] = useState();
  const [latestCommit, setLatestCommit] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [path, setPath] = useState([]);
  const [url, setDownloadUrl] = useState("");

  const FileChange = () => {
    const fileList = event.target.value
    const files = [];
    const webkitdirectory = [];

    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      files.push((element));
      webkitdirectory.push((element.webkitRelativePath));
      
    }

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
      const pathComponents = path.split("/");
      let currentFile = zip;
      for (let i = 0; i < pathComponents.length - 1; i++) {
        const folderName = pathComponents[i];
        currentFile = currentFile.folder(folderName);
      }
      currentFile.file(pathComponents[pathComponents.length - 1], content);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipFile = new File([zipBlob], "file.zip");
    const uri = await storage.upload({
      data: zipFile,
      fs: ipfspath.map((filePath, index) => ({
        name: `file${index - 1}`,
        path: filePath,
      })),
    });
    console.log("URI", uri);
    const data = await storage.download(uri);

    console.log(data.uri);

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      try {
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods
          .commit(repoName, inputValue, data.url)
          .send({ from: accounts[0] });

        if (result) {
          window.location.reload();
        }
      } catch {
        alert("Something going wrong", error);
      }
    }
  };

  const fetchCommits = async () =>{
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      try {
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();
        const commits = await contract.methods.getAllCommits(repoName).call({from: accounts[0]});

        const owner = await contract.methods.isOwner(profileName).call({from: accounts[0]});
        setProfileOwner= owner;

        const latestCommit = commits.length > 0 ? commits[commits.length-1] : null;
        setLatestCommit(latestCommit.commitMassage);

        if(latestCommit){
          const response = await fetch(latestCommit.ipfsURI)
          console.log(response);
          const {data, fs} = await response.json()
          console.log(data)

          const formattedUrl = data.replace('ipfs://', 'https://ipfs.io/ipfs/')
          setDownloadUrl(formattedUrl);

          const commitPaths = fs.map((file) => {
            const pathComponents = file.path.split('/');
            return pathComponents.length > 2 ? pathComponents[1] : file.path;
          })
          const uniquePath = [...new Set(commitPaths)];
          console.log(Array.isArray(uniquePath));

          setPath(uniquePath);
        }

      }catch{
        alert("Something going wrong", error);
      }
    }
  }

  const readFileAsync = (file) => {
    return new Promise ((resolve, reject) => {
      const reader = new FileReader();
      reader.onload =(event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    })
  }

  return (
    <div>
      <Navbar />
      <div className="repo-container">
        <div className="repo-main">
          <div className="repo-header">
            <h2>Repo</h2>
            <div className="publc-badge">Public</div>
          </div>
          <div className="branch-dropdown">
            <div className="branch">
              <select className="dropdown">
                <option value="main">main</option>
                <option value="master">master</option>
              </select>
            </div>
            <div className="Code">
              <button className="code-btn">Code</button>
            </div>
          </div>
          <div className="files-list">
            <table>
              <thead>
                <tr>
                  <th>Profile Name</th>
                  <th></th>
                  <th>commits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>path</td>
                  <td>commit</td>
                  <td>2 days ago</td>
                </tr>
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
                explicabo qui vero voluptatibus ipsum. Saepe nesciunt laudantium
                laboriosam eligendi, numquam iste, odio aut quasi, minima alias
                est velit sunt culpa!
              </p>
            </div>
          </div>
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
                    style={{ display: "none" }}
                  />
                  <button className="select-files">Select Directory</button>
                </div>
              </div>
              <div className="commit-section">
                <input
                  type="text"
                  name=""
                  id="commitMessage"
                  value={inputValue}
                  placeholder="Commit Message"
                />
                <button onClick={handleSubmit} id="submitBtn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="repo-sidebar">
          <div className="about">
            <h3>About</h3>
            <p>
              This project is an implementation of a basic blockchain in
              JavaScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repo;
