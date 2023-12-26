import Web3 from 'web3';
import { contractABI, contractAddress } from './contractConfig.js';

let object = {
    result: undefined,
    allRepos: undefined,
    isRegistered: undefined,
    profileName: undefined,
    allCommits: undefined,
};

let accounts = null;

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

const getAccounts = async () => {
    await window.eth_requestAccounts;
    accounts = await web3.eth.getAccounts();
}

const isOwner = async (profileName) => {

    if (!window.ethereum) return;

    if(accounts==null) await getAccounts();

    return (await contract.methods.isOwner(profileName).call({ from: accounts[0] }));
}

const getAllRepositories = async (profileName) => {

    if (!window.ethereum) return;

    if(accounts==null) await getAccounts();

    return (await contract.methods.getAllRepositories(profileName).call({ from: accounts[0] }));
}

const getAllCommits = async (repoName) => {

    if (!window.ethereum) return;

    if(accounts==null) await getAccounts();

    return (await contract.methods.getAllCommits(repoName).call({ from: accounts[0] }));
}

const CreateProject = async (repoName) => {

    if (!window.ethereum) return;

    if(accounts==null) await getAccounts();

    await contract.methods.CreateProject(repoName).send({ from: accounts[0] });
}

const commit = async (project_name, commitMsg, ipfsURI) => {

    if (!window.ethereum) return;

    if(accounts==null) await getAccounts();

    await contract.methods.commit(project_name, commitMsg, ipfsURI).send({ from: accounts[0] });
}

const data_fetch = async (profileName) => {

    if (!window.ethereum) return;

    try {

        if(accounts==null) await getAccounts();

        object.isRegistered = await contract.methods.authenticateUser().call({ from: accounts[0] });

        if (object.isRegistered) {
            object.result = false;
            object.profileName = await contract.methods.getProfileName(accounts[0]).call({ from: accounts[0] });
        }
        else {
            object.result = await contract.methods.registerUser(profileName).send({ from: accounts[0] });
            object.profileName = profileName;
        }
        object.isOwner = await contract.methods.isOwner(object.profileName).call({ from: accounts[0] });

        object.allRepos = await contract.methods.getAllRepositories(object.profileName).call({ from: accounts[0] });

        object.allCommits = await contract.methods.getAllCommits(object.profileName).call({ from: accounts[0] });
    }
    catch (error) {
        console.log(error);
    }
}

export { data_fetch, isOwner, getAllRepositories, getAllCommits, CreateProject, getAccounts, object };
