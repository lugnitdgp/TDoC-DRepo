import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import "./Home.scss";


import Web3 from 'Web3';
import { contractABI,contractAddress } from "../../../contractConfig.js";

export default function Home() {

  const [profileName,setProfileName]=useState(``)
  const navigate=useNavigate()

  const registerUser=async()=>{
    if (window.ethereum) {
      const web3=new Web3(window.ethereum)
      const contract=new web3.eth.Contract(contractABI,contractAddress)

      try {
        await window.eth_requestAccounts
        const accounts=await web3.eth.getAccounts()
        // console.log(accounts);
        const result=await contract.methods.registerUser(profileName).send({from:accounts[0]})
        if (result) {
          navigate(`/${profileName}`)
        }
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const signInExistingUser=async(e)=>{
    e.preventDefault()
    if (window.ethereum) {
      const web3=new Web3(window.ethereum)
      const contract=new web3.eth.Contract(contractABI,contractAddress)

      try {
        await window.eth_requestAccounts
        const accounts=await web3.eth.getAccounts()
        // console.log(accounts);
        const result=await contract.methods.authenticateUser().call({from:accounts[0]})
        if (result) {
          const profileName=await contract.methods.getProfileName(accounts[0]).call({from:accounts[0]})
          navigate(`/${profileName}`)
        }
      } catch (error) {
        console.log(error);
      }
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
          <input type="text" placeholder="Enter Username" className="input-field"
          value={profileName}
          onChange={(ev)=>{setProfileName(ev.target.value)}}/>
        </div>
        <button className="btn" disabled={profileName.length===0} onClick={registerUser}>Register</button>
        <div className="signin-text">Already have an Account?<br />
         <a href='#' className='sign-in' onClick={(ev)=>signInExistingUser(ev)}>Sign In</a>
        </div>
      </div>
      <div className="right-content">
        <img className='img' src="../../../public/images/blockchain.png" alt="Blockchain image" />
      </div>
    </div>
  </div>
  )
}

{//     <>
//         <nav>Drepo</nav>
//         <div className='main-container'>
//             <div className='landing-text'>
//                 <h1>Your Code is in</h1><h1 className='header-Blockchain'>Blockchain</h1>
// <p>Start your journey towards decentralized world</p>
// <input type="text" value="" placeholder='Enter your Username'/>
// <button type="button"></button>
// <p>Already have an Account? <br /> <a href="">Sign in</a></p>
//             </div>
//         </div>
//     </>
}