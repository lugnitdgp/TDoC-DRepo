import React, { useState } from 'react'
import Navbar from '../../Components/NavBar/Navbar';
import "./Home.scss";
// import Web3 from "web3";
// import { contractABI, contractAddress } from '../../contractConfig.js';
import { useNavigate } from 'react-router-dom'
import { data_fetch, getAccounts, object } from '../../serviceFile.js';

const Home = () => {

  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('')

  window.ethereum.on('accountsChanged', (acc) => {
    getAccounts();
  });

  const registerUser = async () => {

    try {
      await data_fetch(profileName);

      if (object.result) {
        navigate(`/${profileName}`);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      await data_fetch();

      if (object.isRegistered) {
        navigate(`/${object.profileName}`);
      }
      else{
        alert("User Account is not Registered");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <div className="left-content">
          <h1 className='maintext'>Your code is in <span className="subtext">Blockchain</span></h1>
          <p className="description">Start your journey towards the <br />Decentralized World</p>
          <div className="btn-container">
            <input type="text" placeholder="Profile Name is mandatory!!" className="input-field"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <button className="btn" onClick={registerUser}>Register</button>
          <div className="signin-text">Already Have an Account,
            <a href='#' className='sign-in' onClick={handleSignIn}>Sign In</a>
          </div>
        </div>
        <div className="right-content">
          <img className='img' src="hero.jpg" alt="hero" />
        </div>
      </div>
    </div>
  );
};


export default Home;